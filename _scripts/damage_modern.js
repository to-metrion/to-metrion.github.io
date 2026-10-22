// used in primary calc
function CALCULATE_ALL_MOVES_MODERN(p1, p2, field) {
	checkAirLock(p1, field);
	checkAirLock(p2, field);
	checkForecast(p1, field.getWeather());
	checkForecast(p2, field.getWeather());
	checkKlutz(p1);
	checkKlutz(p2);
	checkMinimize(p1, p2);
	checkAngerShell(p1);
	checkAngerShell(p2);
	p1.stats[DF] = getModifiedStat(p1.rawStats[DF], p1.boosts[DF]);
	p1.stats[SD] = getModifiedStat(p1.rawStats[SD], p1.boosts[SD]);
	p2.stats[DF] = getModifiedStat(p2.rawStats[DF], p2.boosts[DF]);
	p2.stats[SD] = getModifiedStat(p2.rawStats[SD], p2.boosts[SD]);
	// So that ProtoQuark is correctly calculated, all stats must be calculated, and getFinalSpeed must be called last.
	p1.stats[AT] = getModifiedStat(p1.rawStats[AT], p1.boosts[AT]);
	p1.stats[SA] = getModifiedStat(p1.rawStats[SA], p1.boosts[SA]);
	p1.stats[SP] = getFinalSpeed(p1, p2, field);
	p2.stats[AT] = getModifiedStat(p2.rawStats[AT], p2.boosts[AT]);
	p2.stats[SA] = getModifiedStat(p2.rawStats[SA], p2.boosts[SA]);
	p2.stats[SP] = getFinalSpeed(p2, p1, field);
	var side1 = field.getSide(1);
	var side2 = field.getSide(0);
	var results = [[], []];
	for (var i = 0; i < 4; i++) {
		results[0][i] = getDamageResult(p1, p2, p1.moves[i], side1);
		p2.resetCurAbility();
		results[1][i] = getDamageResult(p2, p1, p2.moves[i], side2);
		p1.resetCurAbility();
	}
	return results;
}

// used in mass calc
function CALCULATE_MOVES_OF_ATTACKER_MODERN(attacker, defender, field) {
	checkAirLock(attacker, field);
	checkAirLock(defender, field);
	checkForecast(attacker, field.getWeather());
	checkForecast(defender, field.getWeather());
	checkKlutz(attacker);
	checkKlutz(defender);
	checkIntimidate(attacker, defender);
	checkIntimidate(defender, attacker);
	checkSeedsHonk(attacker, field.getTerrain());
	checkSeedsHonk(defender, field.getTerrain());
	checkAngerShell(attacker);
	checkAngerShell(defender);
	checkFieldBoosts(attacker, defender);
	massCalcStatAbilities(attacker, defender);
	attacker.stats[DF] = getModifiedStat(attacker.rawStats[DF], attacker.boosts[DF]);
	attacker.stats[SD] = getModifiedStat(attacker.rawStats[SD], attacker.boosts[SD]);
	defender.stats[DF] = getModifiedStat(defender.rawStats[DF], defender.boosts[DF]);
	defender.stats[SD] = getModifiedStat(defender.rawStats[SD], defender.boosts[SD]);
	checkDownload(attacker, defender);
	checkDownload(defender, attacker);
	// So that ProtoQuark is correctly calculated, all stats must be calculated, and getFinalSpeed must be called last.
	attacker.stats[AT] = getModifiedStat(attacker.rawStats[AT], attacker.boosts[AT]);
	attacker.stats[SA] = getModifiedStat(attacker.rawStats[SA], attacker.boosts[SA]);
	attacker.stats[SP] = getFinalSpeed(attacker, defender, field);
	defender.stats[AT] = getModifiedStat(defender.rawStats[AT], defender.boosts[AT]);
	defender.stats[SA] = getModifiedStat(defender.rawStats[SA], defender.boosts[SA]);
	defender.stats[SP] = getFinalSpeed(defender, attacker, field);
	var defenderSide = field.getSide(~~(mode === "one-vs-all"));
	var results = [];
	for (var i = 0; i < 4; i++) {
		results[i] = getDamageResult(attacker, defender, attacker.moves[i], defenderSide);
		defender.resetCurAbility();
	}
	return results;
}

var moveType, moveCategory, makesContact, isCritical;
var attackerGrounded, defenderGrounded;
var originalSABoost;
var isFirstHit = true;
function getDamageResult(attacker, defender, move, field) {
	var description = {
		"attackerName": getDescriptionPokemonName(attacker),
		"moveName": move.name,
		"defenderName": getDescriptionPokemonName(defender),
		"isDynamax": defender.isDynamax
	};

	// aside from what's in move_data, negateAbility is also applied to the Galar starters' Gmax moves
	if (defender.item !== "Ability Shield" && (["Mold Breaker", "Teravolt", "Turboblaze"].includes(attacker.curAbility) || move.negateAbility)) {
		// since Mold Breaker and Ability Shield don't actually change damage, I would prefer that they don't print in the description
		// a reason to revert this change and print Mold Breaker would be to better highlight to users when an ability is being negated
		defender.curAbility = "";
	}

	if (killsShedinja(attacker, defender, move, field)) {
		return {"damage": [1], "description": buildDescription(description)};
	}
	if (move.bp === 0) {
		return {"damage": [0], "description": buildDescription(description)};
	}
	if (["Grass Knot", "Low Kick", "Heat Crash", "Heavy Slam"].includes(move.name) && defender.isDynamax) {
		return {"damage": [0], "description": buildDescription(description)};
	}

	if (defender.isTerastal && defender.teraType !== "Stellar") {
		description.defenderTera = defender.teraType;
	}

	moveType = move.type;
	attackerGrounded = isGrounded(attacker, field);
	defenderGrounded = isGrounded(defender, field);

	switch (move.name) {
	case "Weather Ball":
		moveType = getWeatherBall(field.weather, attacker.item);
		if (moveType !== "Normal") {
			description.weather = field.weather;
		}
		break;

	case "Terrain Pulse":
		if (field.terrain && attackerGrounded) {
			moveType = getTerrainType(field.terrain);
		}
		break;

	case "Judgment":
		if (attacker.item.includes("Plate")) {
			moveType = getItemBoostType(attacker.item);
		}
		break;

	case "Multi-Attack":
		if (attacker.name.startsWith("Silvally-")) {
			moveType = attacker.name.substring(attacker.name.indexOf("-") + 1);
		}
		break;

	case "Techno Blast":
		if (attacker.item.includes("Drive")) {
			moveType = getTechnoBlast(attacker.item);
		}
		break;

	case "Natural Gift":
		if (attacker.item.includes("Berry")) {
			var gift = getNaturalGift(attacker.item);
			moveType = gift.t;
			move.bp = gift.p;
			description.attackerItem = attacker.item;
			description.moveBP = move.bp;
		}
		description.moveType = moveType; // for clarity, always print move type
		break;

	case "Nature Power":
		moveType = getTerrainType(field.terrain);
		break;

	case "Revelation Dance":
		moveType = attacker.type1; // always just takes on the first type, even in tera
		description.moveType = moveType; // for clarity, always print move type
		break;

	case "Meteor Beam":
	case "Electro Shot":
		originalSABoost = attacker.boosts[SA];
		attacker.boosts[SA] = attacker.curAbility === "Simple" ? Math.min(6, attacker.boosts[SA] + 2) :
			(attacker.curAbility === "Contrary" && attacker.item !== "White Herb" ? Math.max(-6, attacker.boosts[SA] - 1) :
				Math.min(6, attacker.boosts[SA] + 1));
		attacker.stats[SA] = getModifiedStat(attacker.rawStats[SA], attacker.boosts[SA]);
		// this boost gets reset after the attack stat is calc'd
		break;

	case "Tera Blast":
	case "Tera Starstorm":
		if (attacker.isTerastal) {
			moveType = attacker.teraType;
		}
		break;

	case "Raging Bull":
		moveType = attacker.name === "Tauros-Paldea" ? "Fighting" : attacker.name === "Tauros-Paldea-Aqua" ? "Water" : attacker.name === "Tauros-Paldea-Blaze" ? "Fire" : moveType;
		description.moveType = moveType; // for clarity, always print move type
		break;

	case "Ivy Cudgel":
		moveType = attacker.name === "Ogerpon-Wellspring" ? "Water" : attacker.name === "Ogerpon-Hearthflame" ? "Fire" : attacker.name === "Ogerpon-Cornerstone" ? "Rock" : moveType;
		break;
	}

	// If a move's type is different from its default type, print it. Move type is implied by printed ate/ize abilities, so do this check before ate/ize
	if (!move.isZ && !move.isMax && move.name in moves && move.name !== "Tera Blast") { // Tera Blast does not want to print the move type. It is implied by the attacker's tera type
		let moveDefaultDetails = moves[move.name];
		if (moveDefaultDetails.hasOwnProperty("type") && moveType !== moveDefaultDetails.type) {
			description.moveType = moveType;
		}
	}

	// Abilities that change move type
	let ateizeBoost = false;
	// If the move is a Max move, it already had its type changed in shared_calc (so that the move's name changes) and won't receive this boost. This is correct behavior.
	// Z-Moves don't receive -ate type changes
	if (!move.isZ && !move.isMax) {
		let applicableNormalMove = moveType === "Normal" && move.name !== "Revelation Dance" && !(move.name === "Tera Blast" && attacker.isTerastal);
		if (applicableNormalMove && attacker.curAbility === "Aerilate") {
			moveType = "Flying";
			ateizeBoost = true;
		} else if (applicableNormalMove && attacker.curAbility === "Pixilate") {
			moveType = "Fairy";
			ateizeBoost = true;
		} else if (applicableNormalMove && attacker.curAbility === "Refrigerate") {
			moveType = "Ice";
			ateizeBoost = true;
		} else if (applicableNormalMove && attacker.curAbility === "Galvanize") {
			moveType = "Electric";
			ateizeBoost = true;
		} else if (attacker.curAbility === "Normalize" && !(move.name === "Tera Blast" && attacker.isTerastal) &&
			!["Hidden Power", "Weather Ball", "Natural Gift", "Judgment", "Techno Blast", "Revelation Dance", "Multi-Attack", "Terrain Pulse"].includes(move.name)) {
			moveType = "Normal";
			description.attackerAbility = attacker.curAbility;
			ateizeBoost = gen >= 7;
		} else if (attacker.curAbility === "Liquid Voice" && move.isSound) {
			moveType = "Water";
			description.attackerAbility = attacker.curAbility;
		}
	}

	moveCategory = move.category;
	makesContact = move.makesContact;
	if (isShellSideArmPhysical(attacker, defender, move)) {
		moveCategory = "Physical";
		makesContact = true;
	}
	if (attacker.curAbility === "Long Reach" || attacker.item === "Punching Glove") {
		makesContact = false;
	}

	let isScrappy = ["Scrappy", "Mind's Eye"].includes(attacker.curAbility);
	let typeEffect1 = getMoveEffectiveness(move, moveType, defender.type1, isScrappy, field, field.weather === "Strong Winds", description);
	let typeEffect2 = defender.type2 ? getMoveEffectiveness(move, moveType, defender.type2, isScrappy, field, field.weather === "Strong Winds", description) : 1;
	let typeEffectiveness = typeEffect1 * typeEffect2;

	// A Flying-type holding an Iron Ball or hit by Thousand Arrows treats Ground attacks as neutral, regardless of the other type.
	// However, Gravity causes Ground attacks to calculate effectiveness as though Flying is 1x
	if (moveType === "Ground" && defender.hasType("Flying") && (defenderGrounded || move.name === "Thousand Arrows")) {
		if (field.isGravity) {
			description.gravity = true;
		} else if (move.name === "Thousand Arrows") {
			typeEffectiveness = 1;
		} else if (defender.item === "Iron Ball") {
			description.defenderItem = defender.item;
			typeEffectiveness = 1;
		}
	}
	if (defender.item === "Ring Target" && typeEffectiveness === 0) {
		description.defenderItem = defender.item;
		if (typeChart[moveType][defender.type1] === 0) {
			typeEffectiveness = typeEffect2;
		} else if (typeChart[moveType][defender.type2] === 0) {
			typeEffectiveness = typeEffect1;
		}
	}
	if (moveType === "Stellar" && attacker.isTerastal && defender.isTerastal) {
		typeEffectiveness = 2;
	}
	let otherHitsTypeEffectiveness = typeEffectiveness; // save the original type effectiveness for calculating non-first hits
	if (isTeraShell(defender, typeEffectiveness)) {
		typeEffectiveness = 0.5;
		description.defenderAbility = defender.curAbility;
		description.defenderAbilityFirstHit = getFirstHitText(ATTACK_TEXT, move.hits);
	}

	if (typeEffectiveness === 0) {
		return {"damage": [0], "description": buildDescription(description)};
	}
	if (defender.curAbility === "Wonder Guard" && typeEffectiveness <= 1 && move.name !== "Struggle" ||
		moveType === "Grass" && defender.curAbility === "Sap Sipper" ||
		moveType === "Fire" && ["Flash Fire", "Well-Baked Body"].includes(defender.curAbility) ||
		moveType === "Water" && ["Dry Skin", "Storm Drain", "Water Absorb"].includes(defender.curAbility) ||
		moveType === "Electric" && ["Lightning Rod", "Lightningrod", "Motor Drive", "Volt Absorb"].includes(defender.curAbility) ||
		moveType === "Ground" && move.name !== "Thousand Arrows" && defender.curAbility === "Levitate" && !defenderGrounded ||
		moveType === "Ground" && defender.curAbility === "Earth Eater" ||
		move.isBullet && defender.curAbility === "Bulletproof" ||
		move.isSound && defender.curAbility === "Soundproof" ||
		move.isWind && defender.curAbility === "Wind Rider" ||
		move.isMLG && defender.curAbility === "Sturdy") {
		description.defenderAbility = defender.curAbility;
		return {"damage": [0], "description": buildDescription(description)};
	}
	if (moveType === "Ground" && move.name !== "Thousand Arrows" && defender.item === "Air Balloon" && !defenderGrounded) {
		description.defenderItem = defender.item;
		return {"damage": [0], "description": buildDescription(description)};
	}
	if (field.weather === "Harsh Sun" && moveType === "Water" || field.weather === "Heavy Rain" && moveType === "Fire") {
		return {"damage": [0], "description": buildDescription(description)};
	}
	if (move.name === "Sky Drop" &&
        (defender.hasType("Flying") || getModdedWeight(defender) >= 200.0 || field.isGravity)) {
		if (field.isGravity) {
			description.gravity = true;
		}
		return {"damage": [0], "description": buildDescription(description)};
	}
	if (move.name === "Synchronoise" && !attacker.hasType(defender.type1) && !attacker.hasType(defender.type2)) {
		return {"damage": [0], "description": buildDescription(description)};
	}
	if (move.name === "Steel Roller" && !field.terrain) {
		return {"damage": [0], "description": buildDescription(description)};
	}
	if (hasPriority(move, attacker, field)) {
		if (field.terrain === "Psychic" && defenderGrounded) {
			description.terrain = field.terrain;
			return {"damage": [0], "description": buildDescription(description)};
		} else if (["Dazzling", "Queenly Majesty", "Armor Tail"].includes(defender.curAbility)) {
			description.defenderAbility = defender.curAbility;
			return {"damage": [0], "description": buildDescription(description)};
		}
	}
	if (["Burn Up", "Double Shock"].includes(move.name) && !attacker.hasType(moveType)) {
		return {"damage": [0], "description": buildDescription(description)};
	}
	let bypassProtect = move.bypassesProtect || (attacker.curAbility === "Unseen Fist" && makesContact);
	if (field.isProtect && !move.isZ && !move.isMax && !bypassProtect) {
		description.defenderAbility = "Protecting";
		return {"damage": [0], "description": buildDescription(description)};
	}

	description.HPEVs = defender.HPEVs + " HP";
	if (attacker.level != defender.level || (attacker.level != 50 && attacker.level != 100)) {
		description.attackerLevel = attacker.level;
		description.defenderLevel = defender.level;
	}

	let singletonDamageValue = getSingletonDamage(attacker, defender, move, field, description);
	if (singletonDamageValue) {
		return {"damage": [singletonDamageValue], "description": buildDescription(description)};
	}

	description.hits = move.hits;

	isCritical = move.isCrit && !["Battle Armor", "Shell Armor"].includes(defender.curAbility);

	let finalBasePower = calcBP(attacker, defender, move, field, description, ateizeBoost);

	let attack = calcAtk(attacker, defender, move, field, description);

	let defense = calcDef(attacker, defender, move, field, description);

	let baseDamage = modBaseDamage(calcBaseDamage(finalBasePower, attack, defense, attacker.level), attacker, defender, move, field, description);

	let stabMod = calcSTABMod(attacker, move, description);

	let finalMod = calcFinalMods(attacker, defender, move, field, description, typeEffectiveness, bypassProtect);

	let applyBurn = attacker.status === "Burned" && moveCategory === "Physical" && attacker.curAbility !== "Guts" && !(move.name === "Facade" && gen >= 6);
	description.isBurned = applyBurn;

	let damage = calcDamageRange(baseDamage, stabMod, typeEffectiveness, applyBurn, finalMod);

	let result = {"damage": damage};

	// Calculate for scenarios where the first hit does different damage from other hits.
	// Add these damage results to the result object. They are made sense of and set up for display by ap_calc
	let recalcDamage = recalcOtherHits(attacker, defender, move, field, description, result,
		typeEffectiveness, finalBasePower, attack, defense, baseDamage, stabMod, finalMod, applyBurn,
		otherHitsTypeEffectiveness, ateizeBoost, bypassProtect);
	if (recalcDamage) {
		result.firstHitDamage = damage;
		result.damage = recalcDamage;
	}

	result.description = buildDescription(description);
	return result;
}

function calcBP(attacker, defender, move, field, description, ateizeBoost) {
	let basePower = move.bp;
	let turnOrder = attacker.stats[SP] > defender.stats[SP] ? "FIRST" : "LAST";
	let attackerWeight = getModdedWeight(attacker);
	let defenderWeight = getModdedWeight(defender);
	switch (move.name) {
	case "Payback":
		basePower *= turnOrder === "LAST" ? 2 : 1;
		description.moveBP = basePower;
		break;
	case "Electro Ball":
		let r = Math.floor(attacker.stats[SP] / defender.stats[SP]);
		basePower = r >= 4 ? 150 : r >= 3 ? 120 : r >= 2 ? 80 : 60;
		description.moveBP = basePower;
		break;
	case "Gyro Ball":
		basePower = attacker.stats[SP] === 0 ? 1 : Math.min(150, Math.floor(25 * defender.stats[SP] / attacker.stats[SP]) + 1);
		description.moveBP = basePower;
		break;
	case "Punishment":
		basePower = Math.min(200, basePower + 20 * countBoosts(defender.boosts));
		description.moveBP = basePower;
		break;
	case "Low Kick":
	case "Grass Knot":
		basePower = defenderWeight >= 200 ? 120 : defenderWeight >= 100 ? 100 : defenderWeight >= 50 ? 80 : defenderWeight >= 25 ? 60 : defenderWeight >= 10 ? 40 : 20;
		description.moveBP = basePower;
		break;
	case "Crush Grip":
	case "Wring Out":
	case "Hard Press":
		basePower = move.name === "Hard Press" ? 100 : 120;
		// formula taken from DaWoblefet’s Damage Dissertation, based on the reverse-engineered gen 5 damage formula
		basePower = Math.max(1, Math.floor(pokeRound((basePower * 100 * Math.floor((defender.curHP * 4096) / defender.maxHP)) / 4096) / 100));
		description.moveBP = basePower;
		break;
	case "Hex":
	case "Infernal Parade":
		basePower *= (defender.status !== "Healthy" ? 2 : 1);
		description.moveBP = basePower;
		break;
	case "Heavy Slam":
	case "Heat Crash":
		let wr = attackerWeight / defenderWeight;
		basePower = wr >= 5 ? 120 : wr >= 4 ? 100 : wr >= 3 ? 80 : wr >= 2 ? 60 : 40;
		description.moveBP = basePower;
		break;
	case "Stored Power":
	case "Power Trip":
		basePower += 20 * countBoosts(attacker.boosts);
		description.moveBP = basePower;
		break;
	case "Acrobatics":
		let attackerEffectiveItem = getEffectiveItem(attacker, defender, field.terrain);
		basePower *= attackerEffectiveItem === "Flying Gem" || attackerEffectiveItem === "" ? 2 : 1;
		description.moveBP = basePower;
		break;
	case "Wake-Up Slap":
		basePower *= (defender.status === "Asleep" ? 2 : 1);
		description.moveBP = basePower;
		break;
	case "Weather Ball":
		basePower *= (field.weather !== "" && !((field.weather.endsWith("Sun") || field.weather.endsWith("Rain")) && attacker.item === "Utility Umbrella")) ? 2 : 1;
		description.moveBP = basePower;
		break;
	case "Terrain Pulse":
		basePower *= (field.terrain !== "" && attackerGrounded) ? 2 : 1;
		description.moveBP = basePower;
		break;
	case "Fling":
		basePower = getFlingPower(attacker.item);
		description.moveBP = basePower;
		description.attackerItem = attacker.item;
		break;
	case "Eruption":
	case "Dragon Energy":
	case "Water Spout":
		basePower = Math.max(1, Math.floor(150 * attacker.curHP / attacker.maxHP));
		description.moveBP = basePower;
		break;
	case "Flail":
	case "Reversal":
		let p = Math.floor(48 * attacker.curHP / attacker.maxHP);
		basePower = p <= 1 ? 200 : p <= 4 ? 150 : p <= 9 ? 100 : p <= 16 ? 80 : p <= 32 ? 40 : 20;
		description.moveBP = basePower;
		break;
	case "Nature Power":
		basePower = field.terrain === "Electric" || field.terrain === "Grassy" || field.terrain === "Psychic" ? 90 : field.terrain === "Misty" ? 95 : move.bp;
		description.moveBP = basePower;
		break;
	case "Water Shuriken":
		basePower = (attacker.name === "Ash-Greninja" && attacker.ability === "Battle Bond") ? 20 : move.bp;
		description.moveBP = basePower;
		break;
	case "Grav Apple":
		if (field.isGravity) {
			basePower *= 2;
			description.moveBP = basePower;
			description.gravity = true;
		}
		break;
	case "Misty Explosion":
		basePower *= (field.terrain === "Misty" && attackerGrounded ? 1.5 : 1);
		description.moveBP = basePower;
		break;
	case "Rising Voltage":
		basePower *= (field.terrain === "Electric" && defenderGrounded ? 2 : 1);
		description.moveBP = basePower;
		break;
	case "Expanding Force":
		basePower *= (field.terrain === "Psychic" && attackerGrounded ? 1.5 : 1);
		description.moveBP = basePower;
		break;
	case "Triple Kick":
	case "Triple Axel":
		basePower = move.bp;
		description.moveBP = basePower;
		for (let i = 2; i <= move.hits; i++) {
			description.moveBP += ", " + (basePower * i);
		}
		break;
	case "Last Respects":
		basePower += 50 * field.faintedCount;
		description.moveBP = basePower;
		break;
	case "Magnitude":
	case "Rage Fist":
		// always print these moves' power
		description.moveBP = basePower;
		break;
	case "Psyblade":
		basePower *= (field.terrain === "Electric" && attackerGrounded ? 1.5 : 1);
		description.moveBP = basePower;
		break;
	case "Tera Blast":
		if (attacker.isTerastal && attacker.teraType === "Stellar") {
			basePower = 100;
			description.moveBP = basePower;
		}
		break;
	}
	if ((move.isZ && !(move.name in EXCLUSIVE_ZMOVES)) ||
		(move.isMax && !move.name.includes("G-Max"))) {
		// show z and max move power in description
		description.moveBP = basePower;
	}

	var bpMods = [];
	// The location of Technician changed betweens gens 7 and 8 https://www.smogon.com/forums/threads/sword-shield-battle-mechanics-research.3655528/post-8433978
	if (gen >= 8 && attacker.curAbility === "Technician" && basePower <= 60) {
		bpMods.push(0x1800);
		description.attackerAbility = attacker.curAbility;
	}

	if (field.isSteelySpirit && moveType === "Steel") {
		bpMods.push(0x1800);
		description.isSteelySpirit = true;
	}

	// Do not apply Aura Break if the attacker has a Mold Breaker and the defender has the ability
	// curAbility is made empty if the attacker has a Mold Breaker, and defender.ability should retain the defender's base ability
	let isAuraActive = (field.isAuraFairy && moveType === "Fairy") || (field.isAuraDark && moveType === "Dark");
	if (isAuraActive && field.isAuraBreak && !(defender.curAbility === "" && defender.ability === "Aura Break")) {
		bpMods.push(0x0C00);
		description.aura = "Aura Break";
		isAuraActive = false; // Done this way so that a Mold Breaker attacker still receives an Aura boost against an Aura Break defender
	}

	if (attacker.curAbility === "Rivalry" && attacker.isAbilityActivated) {
		if (attacker.isAbilityActivated === true) {
			bpMods.push(0x1400);
			description.attackerAbility = attacker.curAbility + " (increasing)";
		} else if (attacker.isAbilityActivated === "indeterminate") {
			bpMods.push(0x0C00);
			description.attackerAbility = attacker.curAbility + " (decreasing)";
		} else {
			console.log("attacker.isAbilityActivated in a bad state for Rivalry: " + description.attackerAbility);
		}
	}

	if ((attacker.curAbility === "Reckless" && (typeof move.hasRecoil === "number" || move.hasRecoil === "crash")) ||
		attacker.curAbility === "Iron Fist" && move.isPunch ||
		gen >= 7 && !move.isZ && ateizeBoost) {
		bpMods.push(0x1333);
		description.attackerAbility = attacker.curAbility;
	}

	if (field.isBattery && moveCategory === "Special") {
		bpMods.push(0x14CD);
		description.isBattery = true;
	}
	if (field.isPowerSpot) {
		bpMods.push(0x14CD);
		description.isPowerSpot = true;
	}
	if (attacker.curAbility === "Sheer Force" && move.hasSecondaryEffect ||
		attacker.curAbility === "Analytic" && attacker.isAbilityActivated ||
		attacker.curAbility === "Tough Claws" && makesContact ||
		gen == 6 && ateizeBoost ||
		attacker.curAbility === "Punk Rock" && move.isSound ||
		attacker.curAbility === "Sand Force" && field.weather === "Sand" && ["Rock", "Ground", "Steel"].includes(moveType)) {
		bpMods.push(0x14CD);
		description.attackerAbility = attacker.curAbility;
	}

	if (attacker.curAbility === "Supreme Overlord" && field.faintedCount > 0) {
		// modifies the base power https://www.smogon.com/forums/threads/scarlet-violet-battle-mechanics-research.3709545/post-9421520
		let multiplier = [1.1, 1.2, 1.3, 1.4][field.faintedCount - 1];
		if (!multiplier) {
			multiplier = 1.5;
		}
		bpMods.push(Math.ceil(0x1000 * multiplier));
		description.attackerAbility = attacker.curAbility + " (" + multiplier + "x BP)";
	}

	// Do not apply the Aura boost if the attacker has a Mold Breaker and the defender is providing the Aura https://bulbapedia.bulbagarden.net/wiki/Mold_Breaker_(Ability)#Generation_VIII_onward
	// curAbility is made empty if the attacker has a Mold Breaker, and defender.ability should retain the defender's base ability
	if (isAuraActive && !(gen <= 7 && defender.curAbility === "" && defender.ability === moveType + " Aura")) {
		bpMods.push(0x1548);
		description.aura = moveType + " Aura";
	}

	// The location of Technician changed betweens gens 7 and 8 https://www.smogon.com/forums/threads/sword-shield-battle-mechanics-research.3655528/post-8433978
	if (gen <= 7 && attacker.curAbility === "Technician" && basePower <= 60 ||
		attacker.curAbility === "Flare Boost" && attacker.status === "Burned" && moveCategory === "Special" ||
		attacker.curAbility === "Toxic Boost" && (attacker.status === "Poisoned" || attacker.status === "Badly Poisoned") && moveCategory === "Physical" ||
		attacker.curAbility === "Strong Jaw" && move.isBite ||
		attacker.curAbility === "Mega Launcher" && move.isPulse ||
		attacker.curAbility === "Sharpness" && move.isSlicing) {
		bpMods.push(0x1800);
		description.attackerAbility = attacker.curAbility;
	}

	// Heatproof was a power mod until gen 9; it is currently an attack mod https://www.smogon.com/forums/threads/bug-reports-v4-read-original-post-before-posting.3663703/post-9780607
	if (defender.curAbility === "Heatproof" && moveType === "Fire" && gen <= 8) {
		bpMods.push(0x800);
		description.defenderAbility = defender.curAbility;
	} else if (defender.curAbility === "Dry Skin" && moveType === "Fire") {
		bpMods.push(0x1400);
		description.defenderAbility = defender.curAbility;
	}
	if (attacker.item === "Muscle Band" && moveCategory === "Physical" ||
		attacker.item === "Wise Glasses" && moveCategory === "Special") {
		bpMods.push(0x1199); // confirmed to be 0x1199 from gens 5-9 by https://www.smogon.com/bw/articles/bw_complete_damage_formula and OZY's Twitter
		description.attackerItem = attacker.item;
	} else if (attacker.item === "Punching Glove" && move.isPunch) {
		bpMods.push(0x119A); // it seems to be an ever-so-slightly-different multiplier from Band/Glasses https://twitter.com/OZY_Project97/status/1604385021439094784
		description.attackerItem = attacker.item;
	} else if (getItemBoostType(attacker.item) === moveType ||
		((attacker.dexType1 === moveType || attacker.dexType2 === moveType) && (
		attacker.item === "Adamant Orb" && attacker.name === "Dialga" ||
		attacker.item === "Adamant Crystal" && attacker.name === "Dialga-O" ||
		attacker.item === "Lustrous Orb" && attacker.name === "Palkia" ||
		attacker.item === "Lustrous Globe" && attacker.name === "Palkia-O" ||
		attacker.item === "Griseous Orb" && attacker.name === (gen <= 8 ? "Giratina-O" : "Giratina") ||
		attacker.item === "Griseous Core" && attacker.name === "Giratina-O" ||
		attacker.item === "Soul Dew" && gen >= 7 && (attacker.name === "Latios" || attacker.name === "Latias")))) {
		bpMods.push(0x1333);
		description.attackerItem = attacker.item;
	} else if (attacker.name.startsWith("Ogerpon-") && attacker.item == attacker.name.substring(attacker.name.indexOf("-") + 1) + " Mask") {
		bpMods.push(0x1333);
		description.attackerItem = attacker.item;
	} else if (isFirstHit && applyGem(attacker, move)) {
		bpMods.push(gen >= 6 ? 0x14CD : 0x1800);
		description.attackerItem = attacker.item;
		description.attackerItemFirstHit = getFirstHitText(ATTACK_TEXT, move.hits);
	}

	if (["Solar Beam", "SolarBeam", "Solar Blade"].includes(move.name) &&
		(["Sand", "Hail", "Snow"].includes(field.weather) || (field.weather.endsWith("Rain") && attacker.item !== "Utility Umbrella"))) {
		// Solar B power is still halved in non-rain bad weather regardless of Utility Umbrella https://github.com/smogon/pokemon-showdown/pull/6180
		bpMods.push(0x800);
		description.moveBP = move.bp / 2;
		description.weather = field.weather;
	}

	if (isFirstHit && applyKnockOffBoost(attacker, defender, move, field.terrain)) {
		bpMods.push(0x1800);
		description.moveBP = Math.floor(move.bp * 1.5);
	}

	if (field.isHelpingHand) {
		bpMods.push(0x1800);
		description.isHelpingHand = true;
	}

	let isChargeAbility = ["Electromorphosis", "Wind Power"].includes(attacker.curAbility);
	if (moveType === "Electric" && (field.isCharge || (isChargeAbility && attacker.isAbilityActivated))) {
		bpMods.push(0x2000);
		if (isChargeAbility) {
			description.attackerAbility = attacker.curAbility;
		} else {
			description.isCharge = true;
		}
	}

	if (move.name === "Facade" && ["Burned", "Paralyzed", "Poisoned", "Badly Poisoned"].includes(attacker.status) ||
		move.name === "Brine" && defender.curHP <= defender.maxHP / 2 ||
		(move.name === "Venoshock" || move.name === "Barb Barrage") && (defender.status === "Poisoned" || defender.status === "Badly Poisoned") ||
		move.name === "Smelling Salts" && defender.status === "Paralyzed") {
		bpMods.push(0x2000);
		description.moveBP = move.bp * 2;
	}

	if (defenderGrounded && (
		field.terrain === "Misty" && moveType === "Dragon" ||
		field.terrain === "Grassy" && ["Bulldoze", "Earthquake", "Magnitude"].includes(move.name))) {
		bpMods.push(0x800);
		description.terrain = field.terrain;
	}

	if (attackerGrounded && (
		field.terrain === "Electric" && moveType === "Electric" ||
		field.terrain === "Grassy" && moveType == "Grass" ||
		field.terrain === "Psychic" && moveType == "Psychic")) {
		bpMods.push(gen >= 8 ? 0x14CD : 0x1800);
		description.terrain = field.terrain;
	}

	let finalBasePower = Math.max(1, pokeRound((basePower * chainMods(bpMods)) / 4096));
	
	// if a move has 1 bp, then it bypasses damage calc or has variable power. Variable power moves do not receive this boost.
	if (attacker.isTerastal && (moveType === attacker.teraType || attacker.teraType === "Stellar") && finalBasePower < 60 && !hasPriority(move, attacker, field) && move.hits === 1 && move.bp != 1) {
		finalBasePower = 60; // https://www.smogon.com/forums/threads/scarlet-violet-battle-mechanics-research.3709545/post-9425737
		description.moveBP = 60;
	}
	return finalBasePower;
}

function calcAtk(attacker, defender, move, field, description) {
	let attack;
	let attackSource = move.name === "Foul Play" ? defender : attacker;
	if (move.usesHighestAttackStat || (move.name === "Tera Blast" && attacker.isTerastal)) {
		moveCategory = attackSource.stats[AT] > attackSource.stats[SA] ? "Physical" : "Special";
	}
	let attackStat = move.name === "Body Press" ? DF : (moveCategory === "Physical" ? AT : SA);
	description.attackEVs = attacker.evs[attackStat] +
		(NATURES[attacker.nature][0] === attackStat ? "+" : NATURES[attacker.nature][1] === attackStat ? "-" : "") + " " +
		toSmogonStat(attackStat);
	if (!isFirstHit && move.isSound && attacker.item === "Throat Spray") {
		// if isFirstHit is false then the attacker is already guaranteed to not be at +6 (or -6 Contrary)
		let moddedBoost = attacker.boosts[attackStat] + (attacker.curAbility === "Contrary" ? -1 : 1);
		attack = getModifiedStat(attacker.rawStats[attackStat], moddedBoost);
		description.attackerItem = attacker.item;
	} else if (attackSource.boosts[attackStat] === 0 || isCritical && attackSource.boosts[attackStat] < 0) {
		attack = attackSource.rawStats[attackStat];
	} else if (defender.curAbility === "Unaware") {
		attack = attackSource.rawStats[attackStat];
		description.defenderAbility = defender.curAbility;
	} else {
		attack = attackSource.stats[attackStat];
		description.attackBoost = attackSource.boosts[attackStat];
	}

	// reset the SpA boost from Meteor Beam
	if (move.name === "Meteor Beam" || move.name === "Electro Shot") {
		attacker.boosts[SA] = originalSABoost;
		attacker.stats[SA] = getModifiedStat(attacker.rawStats[SA], attacker.boosts[SA]);
	}

	// unlike all other attack modifiers, Hustle gets applied directly
	if (attacker.curAbility === "Hustle" && moveCategory === "Physical") {
		attack = pokeRound(attack * 3 / 2);
		description.attackerAbility = attacker.curAbility;
	}

	var atMods = [];
	if (attacker.curAbility === "Defeatist" && (attacker.curHP <= attacker.maxHP / 2 || attacker.isAbilityActivated) ||
		attacker.curAbility === "Slow Start" && moveCategory === "Physical" && attacker.isAbilityActivated) {
		atMods.push(0x800);
		description.attackerAbility = attacker.curAbility;
	}
	let attackerProtoQuark = checkProtoQuarkHighest(attacker, field.weather, field.terrain);
	if ((attackerProtoQuark === AT && moveCategory === "Physical") || (attackerProtoQuark === SA && moveCategory === "Special")) {
		atMods.push(0x14CD); // https://www.smogon.com/forums/threads/scarlet-violet-battle-mechanics-research.3709545/post-9423025
		description.attackerAbility = attacker.ability; // use base ability for ProtoQuark
	} else if (attacker.curAbility === "Transistor" && gen >= 9 && moveType === "Electric") {
		atMods.push(0x14CD); // https://www.smogon.com/forums/threads/scarlet-violet-battle-mechanics-research.3709545/post-9647211
		description.attackerAbility = attacker.curAbility;
	} else if (attacker.curAbility === "Flower Gift" && field.weather.endsWith("Sun") && moveCategory === "Physical" ||
		attacker.curAbility === "Solar Power" && field.weather.endsWith("Sun") && moveCategory === "Special") {
		atMods.push(0x1800);
		description.attackerAbility = attacker.curAbility;
		description.weather = field.weather;
	} else if (attacker.curAbility === "Guts" && moveCategory === "Physical" && (attacker.status !== "Healthy" || attacker.isAbilityActivated) ||
		((attacker.curAbility === "Overgrow" && moveType === "Grass" ||
		attacker.curAbility === "Blaze" && moveType === "Fire" ||
		attacker.curAbility === "Torrent" && moveType === "Water" ||
		attacker.curAbility === "Swarm" && moveType === "Bug") && (attacker.curHP <= attacker.maxHP / 3 || attacker.isAbilityActivated)) ||
		attacker.curAbility === "Steelworker" && moveType === "Steel" ||
		attacker.curAbility === "Gorilla Tactics" && moveCategory === "Physical" && !attacker.isDynamax ||
		attacker.curAbility === "Transistor" && gen <= 8 && moveType === "Electric" ||
		attacker.curAbility === "Dragon's Maw" && moveType === "Dragon" ||
		attacker.curAbility === "Rocky Payload" && moveType === "Rock") {
		atMods.push(0x1800);
		description.attackerAbility = attacker.curAbility;
	} else if (attacker.curAbility === "Flash Fire" && attacker.isAbilityActivated && moveType === "Fire" ||
		(moveCategory === "Special" && (attacker.ability === "Plus" || attacker.ability === "Minus") && attacker.isAbilityActivated)) {
		atMods.push(0x1800);
		description.attackerAbility = attacker.ability;
	} else if (attacker.curAbility === "Water Bubble" && moveType === "Water" ||
		(attacker.curAbility === "Huge Power" || attacker.curAbility === "Pure Power") && moveCategory === "Physical") {
		atMods.push(0x2000);
		description.attackerAbility = attacker.curAbility;
	} else if ((attacker.curAbility === "Hadron Engine" && field.terrain === "Electric" && moveCategory === "Special") ||
		(attacker.curAbility === "Orichalcum Pulse" && field.weather.endsWith("Sun") && moveCategory === "Physical")) {
		atMods.push(0x1555); // https://www.smogon.com/forums/threads/scarlet-violet-battle-mechanics-research.3709545/post-9423025
		description.attackerAbility = attacker.curAbility;
	}

	if ((field.isRuinTablets && moveCategory === "Physical" && attacker.curAbility !== "Tablets of Ruin") ||
		(field.isRuinVessel && moveCategory === "Special" && attacker.curAbility !== "Vessel of Ruin")) {
		atMods.push(0xC00);
		description.isRuinAtk = true;
	}

	// Heatproof was a power mod until gen 9 https://www.smogon.com/forums/threads/bug-reports-v4-read-original-post-before-posting.3663703/post-9780607
	if (defender.curAbility === "Thick Fat" && (moveType === "Fire" || moveType === "Ice") ||
		defender.curAbility === "Heatproof" && moveType === "Fire" && gen >= 9 ||
		defender.curAbility === "Water Bubble" && moveType === "Fire" ||
		defender.curAbility === "Purifying Salt" && moveType === "Ghost") {
		atMods.push(0x800);
		description.defenderAbility = defender.curAbility;
	}

	if (attacker.item === "Soul Dew" && gen <= 6 && (attacker.name === "Latios" || attacker.name === "Latias") && moveCategory === "Special" ||
		attacker.item === "Choice Band" && moveCategory === "Physical" && !move.isZ && !attacker.isDynamax ||
		attacker.item === "Choice Specs" && moveCategory === "Special" && !move.isZ && !attacker.isDynamax) {
		atMods.push(0x1800);
		description.attackerItem = attacker.item;
	} else if (attacker.item === "Thick Club" && ["Cubone", "Marowak", "Marowak-Alola"].includes(attacker.name) && moveCategory === "Physical" ||
		attacker.item === "Deep Sea Tooth" && attacker.name === "Clamperl" && moveCategory === "Special" ||
		attacker.item === "Light Ball" && attacker.name === "Pikachu" && !move.isZ) {
		atMods.push(0x2000);
		description.attackerItem = attacker.item;
	}

	return Math.max(1, pokeRound(attack * chainMods(atMods) / 0x1000));
}

function calcDef(attacker, defender, move, field, description) {
	let defense;
	let hitsPhysical = moveCategory === "Physical" || move.dealsPhysicalDamage;
	let defenseStat = hitsPhysical ? DF : SD;
	description.defenseEVs = defender.evs[defenseStat] +
		(NATURES[defender.nature][0] === defenseStat ? "+" : NATURES[defender.nature][1] === defenseStat ? "-" : "") + " " +
		toSmogonStat(defenseStat);
	if (defender.boosts[defenseStat] === 0 || isCritical && defender.boosts[defenseStat] > 0 || move.ignoresDefenseBoosts) {
		defense = defender.rawStats[defenseStat];
	} else if (attacker.curAbility === "Unaware") {
		defense = defender.rawStats[defenseStat];
		description.attackerAbility = attacker.curAbility;
	} else {
		defense = defender.stats[defenseStat];
		description.defenseBoost = defender.boosts[defenseStat];
	}

	// unlike all other defense modifiers, Sandstorm SpD boost gets applied directly
	if ((field.weather === "Sand" && defender.hasType("Rock") && !hitsPhysical) ||
		(field.weather === "Snow" && defender.hasType("Ice") && hitsPhysical)) {
		defense = pokeRound(defense * 3 / 2);
		description.weather = field.weather;
	}

	var dfMods = [];
	if (defender.curAbility === "Flower Gift" && field.weather.indexOf("Sun") > -1 && !hitsPhysical) {
		dfMods.push(0x1800);
		description.defenderAbility = defender.curAbility;
		description.weather = field.weather;
	}
	if (defender.curAbility === "Marvel Scale" && (defender.status !== "Healthy" || defender.isAbilityActivated) && hitsPhysical ||
		defender.curAbility === "Grass Pelt" && field.terrain === "Grassy" && hitsPhysical) {
		dfMods.push(0x1800);
		description.defenderAbility = defender.curAbility;
	}

	if (defender.curAbility === "Fur Coat" && hitsPhysical) {
		dfMods.push(0x2000);
		description.defenderAbility = defender.curAbility;
	}

	let defenderProtoQuark = checkProtoQuarkHighest(defender, field.weather, field.terrain);
	if ((defenderProtoQuark === DF && hitsPhysical) || (defenderProtoQuark === SD && !hitsPhysical)) {
		dfMods.push(0x14CD);
		description.defenderAbility = defender.ability; // use base ability for ProtoQuark
	}

	if ((field.isRuinSword && hitsPhysical && defender.curAbility !== "Sword of Ruin") ||
		(field.isRuinBeads && !hitsPhysical && defender.curAbility !== "Beads of Ruin")) {
		dfMods.push(0xC00);
		description.isRuinDef = true;
	}

	if (defender.item === "Soul Dew" && gen <= 6 && (defender.name === "Latios" || defender.name === "Latias") && !hitsPhysical ||
		defender.item === "Assault Vest" && !hitsPhysical ||
		defender.item === "Eviolite") {
		dfMods.push(0x1800);
		description.defenderItem = defender.item;
	}

	if (defender.item === "Deep Sea Scale" && defender.name === "Clamperl" && !hitsPhysical ||
		defender.item === "Metal Powder" && defender.name === "Ditto" && hitsPhysical) {
		dfMods.push(0x2000);
		description.defenderItem = defender.item;
	}

	return Math.max(1, pokeRound(defense * chainMods(dfMods) / 0x1000));
}

function calcBaseDamage(moddedBasePower, attack, defense, attackerLevel) {
	return Math.floor(Math.floor(Math.floor(2 * attackerLevel / 5 + 2) * moddedBasePower * attack / defense) / 50 + 2);
}

function modBaseDamage(baseDamage, attacker, defender, move, field, description) {
	if (field.format === "doubles" &&
		(move.isSpread || (move.name === "Expanding Force" && field.terrain === "Psychic" && attackerGrounded) || (move.name === "Tera Starstorm" && attacker.isTerastal))) {
		baseDamage = pokeRound(baseDamage * 0xC00 / 0x1000);
		description.isSpread = true;
	}
	if (!isFirstHit && attacker.curAbility === "Parental Bond") {
		baseDamage = pokeRound(baseDamage * (gen == 6 ? 0x800 : 0x400) / 0x1000);
	}

	let weatherMod = 0x1000;
	if (move.name === "Hydro Steam" && field.weather === "Sun") {
		// For readability, Hydro Steam is its own section https://www.smogon.com/forums/threads/scarlet-violet-battle-mechanics-research.3709545/post-9527435
		if (attacker.item === "Utility Umbrella") {
			if (defender.item === "Utility Umbrella") {
				weatherMod = 0x1000;
			} else {
				weatherMod = 0x800;
				description.attackerItem = attacker.item;
				description.weather = field.weather;
			}
		} else {
			weatherMod = 0x1800;
			description.weather = field.weather;
		}
	} else if (defender.item !== "Utility Umbrella" && (
		field.weather.indexOf("Sun") > -1 && moveType === "Fire" ||
		field.weather.indexOf("Rain") > -1 && moveType === "Water")) {
		weatherMod = 0x1800;
		description.weather = field.weather;
	} else if (defender.item !== "Utility Umbrella" && (
		field.weather === "Sun" && moveType === "Water" ||
		field.weather === "Rain" && moveType === "Fire")) {
		weatherMod = 0x800;
		description.weather = field.weather;
	}
	baseDamage = pokeRound(baseDamage * weatherMod / 0x1000);

	if (isCritical) {
		baseDamage = Math.floor(baseDamage * (gen >= 6 ? 3 : 4) / 2);
		description.isCritical = isCritical;
	}
	return baseDamage;
}

function calcSTABMod(attacker, move, description) {
	if (["Protean", "Libero"].includes(attacker.curAbility) && !attacker.isTerastal) {
		if (!attacker.hasType(moveType)) {
			description.attackerAbility = attacker.curAbility;
		}
		return 0x1800;
	}
	if (attacker.isTerastal && attacker.teraType === "Stellar") {
		description.attackerTera = attacker.teraType;
		if (!isFirstHit && !attacker.name.includes("Terapagos")) {
			// return standard STAB when not calcing the first hit for Stellar hits - except Terapagos
			return attacker.hasType(moveType) ? 0x1800 : 0x1000;
		}
		description.attackerTeraFirstHit = getFirstHitText(ATTACK_TEXT, move.hits);
		return attacker.hasType(moveType) ? 0x2000 : 0x1333; // https://www.smogon.com/forums/threads/scarlet-violet-battle-mechanics-research.3709545/post-9894284
	}
	let stabMod = 0x1000;
	if (attacker.hasType(moveType) || move.name.includes("Pledge Boosted")) {
		stabMod += 0x800;
		if (attacker.isTerastal) {
			description.attackerTera = attacker.teraType;
		}
	}
	if (attacker.isTerastal && (moveType === attacker.dexType1 || moveType === attacker.dexType2)) {
		stabMod += 0x800;
	}
	if (attacker.curAbility === "Adaptability" && attacker.hasType(moveType)) {
		// this ternary is for when move type matches dex type matches tera type
		stabMod += stabMod >= 0x2000 ? 0x400 : 0x800;
		description.attackerAbility = attacker.curAbility;
	}
	return stabMod;
}

function calcFinalMods(attacker, defender, move, field, description, typeEffectiveness, bypassProtect) {
	let finalMods = [];
	if (!(isCritical || ["Brick Break", "Psychic Fangs", "Raging Bull"].includes(move.name) || attacker.curAbility === "Infiltrator")) {
		description.isReflect = field.isReflect && moveCategory === "Physical";
		description.isLightScreen = field.isLightScreen && moveCategory === "Special";
		if (description.isReflect || description.isLightScreen) {
			if (field.format === "singles") {
				finalMods.push(0x800);
			} else {
				finalMods.push(0xA8F);
				description.isDoublesScreen = true;
			}
		}
	}
	if (attacker.curAbility === "Neuroforce" && typeEffectiveness > 1) {
		finalMods.push(0x1400);
		description.attackerAbility = attacker.curAbility;
	}
	if (attacker.curAbility === "Sniper" && isCritical) {
		finalMods.push(0x1800);
		description.attackerAbility = attacker.curAbility;
	}
	if (attacker.curAbility === "Tinted Lens" && typeEffectiveness < 1) {
		finalMods.push(0x2000);
		description.attackerAbility = attacker.curAbility;
	}
	if ((isFirstHit && (defender.curAbility === "Multiscale" || (defender.ability == "Shadow Shield" && !isNeutralizingGas)) && defender.curHP === defender.maxHP) ||
		defender.curAbility === "Fluffy" && makesContact ||
		defender.curAbility === "Punk Rock" && move.isSound ||
		defender.curAbility === "Ice Scales" && moveCategory === "Special") {
		finalMods.push(0x800);
		description.defenderAbility = defender.ability;
		description.defenderAbilityFirstHit = getFirstHitText(STRIKE_TEXT, move.hits);
	}
	if (field.isFriendGuard) {
		finalMods.push(0xC00);
		description.isFriendGuard = true;
	}
	if ((defender.curAbility === "Solid Rock" || defender.curAbility === "Filter" || (defender.ability === "Prism Armor" && !isNeutralizingGas)) && typeEffectiveness > 1) {
		finalMods.push(0xC00);
		description.defenderAbility = defender.ability; // print base ability for Prism Armor
	}
	if (defender.curAbility === "Fluffy" && moveType === "Fire") {
		finalMods.push(0x2000);
		description.defenderAbility = defender.curAbility;
	}
	if (attacker.item === "Expert Belt" && typeEffectiveness > 1 && !move.isZ) {
		finalMods.push(0x1333);
		description.attackerItem = attacker.item;
	} else if (attacker.item === "Life Orb" && !move.isZ) {
		finalMods.push(0x14CC);
		description.attackerItem = attacker.item;
	}
	if (isFirstHit && activateResistBerry(attacker, defender.item, typeEffectiveness)) {
		if (defender.curAbility === "Ripen") {
			finalMods.push(0x400);
			description.defenderAbility = defender.curAbility;
		} else {
			finalMods.push(0x800);
		}
		description.defenderItem = defender.item;
		description.defenderItemFirstHit = getFirstHitText(STRIKE_TEXT, move.hits);
	}
	if (field.isMinimized && (["Astonish", "Body Slam", "Dragon Rush", "Extrasensory", "Flying Press", "Heat Crash", "Heavy Slam", "Malicious Moonsault", "Needle Arm", "Phantom Force", "Shadow Force", "Steamroller", "Stomp"].includes(move.name))) {
		finalMods.push(0x2000);
		description.isMinimized = true;
	}
	if (["Dynamax Cannon", "Behemoth Blade", "Behemoth Bash"].includes(move.name) && defender.isDynamax) {
		finalMods.push(0x2000);
	}
	if (typeEffectiveness > 1 && (move.name === "Collision Course" || move.name === "Electro Drift")) {
		finalMods.push(0x1555); // https://www.smogon.com/forums/threads/scarlet-violet-battle-mechanics-research.3709545/post-9423025
	}
	let finalMod = chainMods(finalMods);

	if (field.isProtect && !bypassProtect) {
		finalMod = pokeRound(finalMod * 0x400 / 0x1000);
		description.isQuarteredByProtect = true;
	}

	return finalMod;
}

function calcDamageRange(baseDamage, stabMod, typeEffectiveness, applyBurn, finalMod) {
	let damage = new Array(16);
	for (let i = 0; i < 16; i++) {
		damage[i] = Math.floor(baseDamage * (85 + i) / 100);
		damage[i] = pokeRound(damage[i] * stabMod / 0x1000);
		damage[i] = Math.floor(damage[i] * typeEffectiveness);
		if (applyBurn) {
			damage[i] = Math.floor(damage[i] / 2);
		}
		damage[i] = Math.max(1, pokeRound(damage[i] * finalMod / 0x1000) % 65536);
	}
	return damage;
}

function recalcOtherHits(attacker, defender, move, field, description, result,
	typeEffectiveness, finalBasePower, attack, defense, baseDamage, stabMod, finalMod, applyBurn,
	otherHitsTypeEffectiveness, ateizeBoost, bypassProtect) {
	let originalATBoost = attacker.boosts[AT];
	let originalATStat = attacker.stats[AT];
	let isParentalBond = attacker.curAbility === "Parental Bond" && move.hits === 1 && (field.format === "singles" || !move.isSpread);
	if (isParentalBond) {
		isFirstHit = false;
		description.attackerAbility = attacker.curAbility;
	}

	// recalc type effectiveness
	let isTeraShellActivated = isTeraShell(defender, otherHitsTypeEffectiveness);
	let recalcFinalMod = false;
	if (isTeraShellActivated) {
		isFirstHit = false;
		recalcFinalMod = true;
		// A quirk with this implementation is that a defender with Tera Shell and a resist berry will never calculate the resist berry (except Chilan).
		// Just Tera Shell is calculated for the first hit, and no Tera Shell nor berry for the other hits.
	}

	// recalc final BP
	let isGemApplied = applyGem(attacker, move);
	if (isGemApplied) {
		result.isFirstAttack = true;
	}
	if (isGemApplied || applyKnockOffBoost(attacker, defender, move, field.terrain)) {
		isFirstHit = false;
		finalBasePower = calcBP(attacker, defender, move, field, {}, ateizeBoost);
	}

	// recalc attack
	if (move.isSound && attacker.item === "Throat Spray" && (attacker.curAbility === "Contrary" ? attacker.boosts[SA] > -6 : attacker.boosts[SA] < 6)) {
		isFirstHit = false;
		attack = calcAtk(attacker, defender, move, field, {});
	} else if (isParentalBond && move.name === "Power-Up Punch") {
		// apply the +1 Atk to the child's hit
		attacker.boosts[AT] = Math.min(6, attacker.boosts[AT] + 1);
		attacker.stats[AT] = getModifiedStat(attacker.rawStats[AT], attacker.boosts[AT]);
		attack = calcAtk(attacker, defender, move, field, {});
	}

	// recalc defense
	let isItemRemoved = moveRemovesItem(attacker, defender, move, field.terrain) && description.defenderItem;
	let originalDefenderItem = defender.item;
	if (isItemRemoved) {
		isFirstHit = false;
		defender.item = "";
		if (description.defenderItem) {
			description.defenderItemFirstHit = getFirstHitText(STRIKE_TEXT, move.hits);
		}
		defense = calcDef(attacker, defender, move, field, {});
	}

	// recalc base damage
	// and recalc modded base damage
	if (!isFirstHit) {
		isFirstHit = false;
		baseDamage = modBaseDamage(calcBaseDamage(finalBasePower, attack, defense, attacker.level), attacker, defender, move, field, {});
	}

	// recalc STAB mod
	if (attacker.isTerastal && attacker.teraType === "Stellar" && !attacker.name.includes("Terapagos")) {
		isFirstHit = false;
		result.isFirstAttack = true;
		stabMod = calcSTABMod(attacker, move, {});
	}

	// recalc final mods
	if (recalcFinalMod ||
		activateResistBerry(attacker, originalDefenderItem, typeEffectiveness) ||
		(["Multiscale"].includes(defender.curAbility) || (defender.ability == "Shadow Shield" && !isNeutralizingGas)) && defender.curHP === defender.maxHP) {
		isFirstHit = false;
		finalMod = calcFinalMods(attacker, defender, move, field, {}, otherHitsTypeEffectiveness, bypassProtect);
	}

	// calculate hits of Triple Axel, recalc final BP.
	if (["Triple Axel", "Triple Kick"].includes(move.name)) {
		// tripleAxelDamage is an array of damage arrays; a 2D number array
		if (!isFirstHit) {
			result.firstHitDamage = result.damage;
		}
		isFirstHit = false;
		result.tripleAxelDamage = [];
		if (isTeraShellActivated) {
			result.teraShellDamage = [];
		}
		let startingBP = move.bp;
		for (let hitNum = 1; hitNum <= move.hits; hitNum++) {
			move.bp = startingBP * hitNum;
			finalBasePower = calcBP(attacker, defender, move, field, {}, ateizeBoost);
			baseDamage = modBaseDamage(calcBaseDamage(finalBasePower, attack, defense, attacker.level), attacker, defender, move, field, {});
			result.tripleAxelDamage.push(calcDamageRange(baseDamage, stabMod, otherHitsTypeEffectiveness, applyBurn, finalMod));
			if (isTeraShellActivated) {
				result.teraShellDamage.push(calcDamageRange(baseDamage, stabMod, typeEffectiveness, applyBurn, finalMod));
			}
		}
		move.bp = startingBP;
		isFirstHit = true;
		return; // Nothing to return. Triple Axel just adds its custom tripleAxelDamage property.
	}

	if (isFirstHit) {
		return;
	}

	// recalc the damage array
	let recalcDamage = calcDamageRange(baseDamage, stabMod, otherHitsTypeEffectiveness, applyBurn, finalMod);

	isFirstHit = true;

	if (isItemRemoved) {
		defender.item = originalDefenderItem;
	}

	if (isParentalBond) {
		result.childDamage = recalcDamage;
		// Reset any changes from Power-Up Punch
		attacker.boosts[AT] = originalATBoost;
		attacker.stats[AT] = originalATStat;
		move.hits = 2;
		return; // Nothing to return. Parental Bond just adds its custom childDamage property.
	}

	if (isTeraShellActivated) {
		// Tera Shell applies its effect to all strikes of a multistrike move, not just the first strike.
		result.teraShellDamage = result.damage;
		result.damage = recalcDamage;
		result.firstHitDamage = result.teraShellDamage;
		return; // Nothing to return. Tera Shell just adds its custom teraShellDamage property.
	}

	return recalcDamage;
}

const MAX_SET_SUFFIX_LENGTH = 5; // this value includes the hyphen
const endsInParensRegex = / \(.+\)$/;
function getDescriptionPokemonName(pokemon) {
	// if the setName ends with something in parens, remove the parens
	let regexMatch = endsInParensRegex.exec(pokemon.setName);
	let displaySetName = regexMatch ? pokemon.setName.substring(0, regexMatch.index) : pokemon.setName;
	let setSuffix = displaySetName.substring(displaySetName.lastIndexOf("-"));
	if (setSuffix.includes(",")) {
		// BDSP has some sets of the form `speciesName-1,2,3`. Remove all set numbers except the first one.
		setSuffix = setSuffix.substring(setSuffix.indexOf(","));
		displaySetName = displaySetName.substring(0, displaySetName.length - setSuffix.length);
	}
	if (setSuffix.length > MAX_SET_SUFFIX_LENGTH) {
		return pokemon.name;
	}
	if (pokemon.name in setdex && pokemon.setName in setdex[pokemon.name]) {
		// the name and setName are straightforward. the set name can simply be returned.
		return displaySetName;
	}
	let nameDexEntry = pokedex[pokemon.name];
	if (nameDexEntry && nameDexEntry.hasBaseForme && nameDexEntry.hasBaseForme in setdex && pokemon.setName in setdex[nameDexEntry.hasBaseForme]) {
		// the pokemon is some forme. take the set suffix and put it at the end of the forme.
		return pokemon.name + setSuffix;
	}
	// don't print Gmax in the description
	return pokemon.name.endsWith("-Gmax") ? pokemon.name.substring(0, pokemon.name.lastIndexOf("-Gmax")) : pokemon.name;
}

function buildDescription(description) {
	var output = "";
	if (description.attackBoost) {
		if (description.attackBoost > 0) {
			output += "+";
		}
		output += description.attackBoost + " ";
	}
	output = appendIfSet(output, description.attackEVs);
	output = appendIfSet(output, description.attackerItem);
	output = appendIfSet(output, description.attackerItemFirstHit);
	output = appendIfSet(output, description.attackerAbility);
	if (description.isRuinAtk) {
		output += "Ruin ";
	}
	if (description.isBurned) {
		output += "burned ";
	}
	if (description.attackerLevel) {
		output += "Lv. " + description.attackerLevel + " ";
	}
	if (description.attackerTera) {
		output += "Tera " + description.attackerTera + " ";
		output = appendIfSet(output, description.attackerTeraFirstHit);
	}
	output += description.attackerName + " ";
	if (description.isHelpingHand) {
		output += "Helping Hand ";
	}
	if (description.isCharge) {
		output += "Charge ";
	}
	if (description.isPowerSpot) {
		output += "Power Spot ";
	}
	if (description.isBattery) {
		output += "Battery ";
	}
	if (description.isSteelySpirit) {
		output += "Steely Spirit ";
	}
	output = appendIfSet(output, description.aura);
	output += description.moveName + " ";
	if (description.moveBP && description.moveType) {
		output += "(" + description.moveBP + " BP " + description.moveType + ") ";
	} else if (description.moveBP) {
		output += "(" + description.moveBP + " BP) ";
	} else if (description.moveType) {
		output += "(" + description.moveType + ") ";
	}
	if (description.hits && description.hits > 1) {
		output += "(" + description.hits + " hits) ";
	}
	if (description.isSpread) {
		output += "(spread) ";
	}
	output += "vs. ";
	if (description.defenseBoost) {
		if (description.defenseBoost > 0) {
			output += "+";
		}
		output += description.defenseBoost + " ";
	}
	output = appendIfSet(output, description.HPEVs);
	if (description.defenseEVs) {
		output += "/ " + description.defenseEVs + " ";
	}
	output = appendIfSet(output, description.defenderItem);
	output = appendIfSet(output, description.defenderItemFirstHit);
	output = appendIfSet(output, description.defenderAbility);
	output = appendIfSet(output, description.defenderAbilityFirstHit);
	if (description.isMinimized) {
		output += "Minimized ";
	}
	if (description.isDynamax) {
		output += "Dynamax ";
	}
	if (description.isRuinDef) {
		output += "Ruin ";
	}
	if (description.defenderLevel) {
		output += "Lv. " + description.defenderLevel + " ";
	}
	if (description.defenderTera) {
		output += "Tera " + description.defenderTera + " ";
	}
	output += description.defenderName;
	if (description.weather || description.terrain || description.gravity) {
		output += " in ";
		fieldEffects = [];
		if (description.weather) {
			fieldEffects.push(description.weather);
		}
		if (description.terrain) {
			fieldEffects.push(description.terrain + " Terrain");
		}
		if (description.gravity) {
			fieldEffects.push("Gravity");
		}
		output += fieldEffects.join(" and ");
	}
	if (description.isDoublesScreen) {
		output += " through Doubles " + (description.isReflect ? "Reflect" : "Light Screen");
	} else if (description.isReflect) {
		output += " through Reflect";
	} else if (description.isLightScreen) {
		output += " through Light Screen";
	}
	if (description.isCritical) {
		output += " on a critical hit";
	}
	if (description.isFriendGuard) {
		output += " with Friend Guard";
	}
	if (description.isQuarteredByProtect) {
		output += " through Protect";
	}

	return output;
}

const FIRST_HIT_PREFIX = " (first ";
const FIRST_HIT_SUFFIX = " only)";
const HIT_TEXT = "hit"; // this describes the first time a non-multistrike move is used
const FIRST_HIT_ONLY_TEXT = FIRST_HIT_PREFIX + HIT_TEXT + FIRST_HIT_SUFFIX;
const STRIKE_TEXT = "strike"; // this describes only the first strike of a multistrike move
const FIRST_STRIKE_ONLY_TEXT = FIRST_HIT_PREFIX + STRIKE_TEXT + FIRST_HIT_SUFFIX;
const ATTACK_TEXT = "attack"; // this describes all the strikes of the first time a multistrike move is used
const FIRST_ATTACK_ONLY_TEXT = FIRST_HIT_PREFIX + ATTACK_TEXT + FIRST_HIT_SUFFIX;
// Describe how something in the description only applies once.
// This parenthetical can be removed by setDamageText() in ap_calc if the attack can OHKO
function getFirstHitText(hitText, moveHits) {
	if (moveHits > 1) {
		if (hitText === STRIKE_TEXT) {
			return FIRST_STRIKE_ONLY_TEXT;
		} else if (hitText === ATTACK_TEXT) {
			return FIRST_ATTACK_ONLY_TEXT;
		}
	}
	return FIRST_HIT_ONLY_TEXT;
}

function appendIfSet(str, toAppend) {
	if (toAppend) {
		return str + toAppend + " ";
	}
	return str;
}

function toSmogonStat(stat) {
	return stat === AT ? "Atk" :
		stat === DF ? "Def" :
			stat === SA ? "SpA" :
				stat === SD ? "SpD" :
					stat === SP ? "Spe" :
						"wtf";
}

function chainMods(mods) {
	var M = 0x1000;
	for (var i = 0; i < mods.length; i++) {
		if (mods[i] !== 0x1000) {
			M = M * mods[i] + 0x800 >> 12;
		}
	}
	return M;
}

function getMoveEffectiveness(move, mType, defType, isGhostRevealed, field, isStrongWinds, description) {
	if (!mType) {
		console.log(move.name + " does not have a type field.");
		return 0;
	} else if (mType === "None" || mType === "Stellar") {
		// let the caller handle Stellar attacking a terastallized defender
		return 1;
	} else if (isGhostRevealed && defType === "Ghost" && ["Normal", "Fighting"].some(type => type == mType)) {
		return 1;
	} else if (defType === "Flying" && mType === "Ground" && (defenderGrounded || move.name === "Thousand Arrows")) {
		// let the caller handle the Iron Ball and Thousand Arrows cases
		return 1;
	} else if (isStrongWinds && defType === "Flying" && ["Electric", "Ice", "Rock"].some(type => type == mType)) {
		description.weather = "Strong Winds";
		return 1;
	} else if (move.name === "Freeze-Dry" && defType === "Water") {
		return 2;
	} else if (move.name === "Flying Press") {
		return typeChart["Fighting"][defType] * typeChart["Flying"][defType];
	} else {
		return typeChart[mType][defType];
	}
}

function getModifiedStat(stat, mod) {
	const boostTable = [1, 1.5, 2, 2.5, 3, 3.5, 4];

	if (mod >= 0) {
		stat = Math.floor(stat * boostTable[mod]);
	} else {
		stat = Math.floor(stat / boostTable[-mod]);
	}

	return stat;
}

function getFinalSpeed(pokemon, opponent, field) {
	let weather = field.getWeather();
	let speed = getModifiedStat(pokemon.rawStats[SP], pokemon.boosts[SP]);
	if (pokemon.item === "Choice Scarf" && !pokemon.isDynamax) {
		speed = Math.floor(speed * 1.5);
	} else if (pokemon.item === "Macho Brace" || pokemon.item === "Iron Ball") {
		speed = Math.floor(speed / 2);
	}
	
	if (pokemon.status === "Paralyzed" && pokemon.curAbility !== "Quick Feet") {
		speed = Math.floor(speed / (gen <= 6 ? 4 : 2));
	}

	if (pokemon.curAbility === "Chlorophyll" && weather.indexOf("Sun") > -1 && pokemon.item !== "Utility Umbrella" ||
		pokemon.curAbility === "Sand Rush" && weather === "Sand" ||
		pokemon.curAbility === "Swift Swim" && weather.indexOf("Rain") > -1 && pokemon.item !== "Utility Umbrella" ||
		pokemon.curAbility === "Slush Rush" && (weather.indexOf("Hail") > -1 || weather === "Snow") ||
		pokemon.curAbility === "Surge Surfer" && field.getTerrain() === "Electric" ||
		pokemon.curAbility === "Unburden" && (pokemon.isAbilityActivated || getEffectiveItem(pokemon, opponent, field.getTerrain()) === "")) {
		speed *= 2;
	} else if (checkProtoQuarkHighest(pokemon, weather, field.getTerrain()) === SP ||
		pokemon.curAbility === "Quick Feet" && (pokemon.status !== "Healthy" || pokemon.isAbilityActivated)) {
		speed = Math.floor(speed * 1.5);
	} else if (pokemon.curAbility === "Slow Start" && pokemon.isAbilityActivated) {
		speed = Math.floor(speed * 0.5);
	}
	return speed;
}

function isGrounded(pokemon, field) {
	if (field.isGravity || pokemon.item === "Iron Ball") {
		return true;
	}
	return !(pokemon.hasType("Flying") || pokemon.item === "Air Balloon" || pokemon.curAbility === "Levitate");
}

function getEffectiveItem(source, opponent, terrain) {
	// shared calc already accommodates Weakness Policy.
	// Pokemon objects that hold Weak Pol and have the Weak Pol field button pressed are given the empty string as held item.
	if (getSeedStat(source.item, terrain) ||
		(source.item === "Adrenaline Orb" && opponent.curAbility === "Intimidate" && opponent.isAbilityActivated) ||
		(source.item === "Booster Energy" && (source.ability === "Protosynthesis" || source.ability === "Quark Drive"))) {
		return "";
	}
	return source.item;
}

function hasPriority(move, attacker, field) {
	return move.hasPriority ||
		(attacker.curAbility === "Gale Wings" && moveType === "Flying" && move.name !== "Tera Blast") ||
		(attacker.curAbility === "Triage" && move.percentHealed) ||
		(move.name === "Grassy Glide" && field.terrain === "Grassy" && attackerGrounded);
}

function getModdedWeight(pokemon) {
	let weight = pokemon.weight;
	if (pokemon.curAbility === "Heavy Metal") {
		weight *= 2;
	} else if (pokemon.curAbility === "Light Metal") {
		weight = Math.floor(weight * 5) / 10; // weight values are truncated to the tenth's place (increments of 0.1)
	}
	if (pokemon.item === "Float Stone") {
		weight = Math.floor(weight * 5) / 10;
	}
	return Math.max(weight, 0.1);
}

function killsShedinja(attacker, defender, move, field = {}) {
	// This is meant to at-a-glance highlight moves that are fatal to Shedinja and allow the mass calc to better capture Shedinja's defensive profile.
	// sorry for the mess of conditionals
	if (!(defender.ability === "Wonder Guard" && defender.curHP == 1)) {
		return false;
	}
	let afflictable = defender.status === "Healthy" && !(field.terrain === "Misty" && isGrounded(defender, field));
	let poisonable = afflictable && !["Poison", "Steel"].some(type => defender.hasType(type));
	let burnable = afflictable && !defender.hasType("Fire");

	let weather = defender.item !== "Safety Goggles" &&
		((move.name === "Sandstorm" && !["Rock", "Steel", "Ground"].some(type => defender.hasType(type))) || (move.name === "Hail" && !defender.hasType("Ice")));
	// akin to Sash, status berries should not be accounted for
	let poison = (["Toxic", "Poison Gas", "Toxic Thread"].includes(move.name) || (move.name === "Poison Powder" && defender.item !== "Safety Goggles" && !defender.hasType("Grass"))) &&
		(poisonable || (afflictable && attacker.curAbility === "Corrosion"));
	let burn = move.name === "Will-O-Wisp" && burnable;
	let dangerItem = (["Trick", "Switcheroo"].includes(move.name) || (move.name === "Bestow" && defender.item === "")) &&
		(attacker.item === "Sticky Barb" || (attacker.item === "Toxic Orb" && poisonable) || (attacker.item === "Flame Orb" && burnable) ||
		(attacker.item === "Black Sludge" && !defender.hasType("Poison")));
	let confusion = ["Confuse Ray", "Flatter", "Supersonic", "Swagger", "Sweet Kiss", "Teeter Dance"].includes(move.name);
	let otherPassive = (move.name === "Leech Seed" && !defender.hasType("Grass")) || (move.name === "Curse" && attacker.hasType("Ghost"));
	let suppressAbility = ["Skill Swap", "Worry Seed", "Entrainment", "Simple Beam", "Gastro Acid"].includes(move.name) && defender.item !== "Ability Shield";
	return weather || poison || burn || dangerItem || confusion || otherPassive || suppressAbility;
}

function getSingletonDamage(attacker, defender, move, field, description) {
	let singletonDamageValue;

	switch (move.name) {
		case "Seismic Toss":
		case "Night Shade":
			singletonDamageValue = attacker.level;
			break;
		case "Psywave":
			singletonDamageValue = Math.floor(attacker.level * 150 / 100);
			break;
		case "Sonic Boom":
			singletonDamageValue = 20;
			break;
		case "Dragon Rage":
			singletonDamageValue = 40;
			break;
	}
	if (singletonDamageValue && attacker.curAbility === "Parental Bond") {
		description.attackerAbility = attacker.curAbility;
		return singletonDamageValue *= 2;
	}

	let effectiveCurHP = defender.isDynamax ? Math.floor(defender.curHP / 2) : defender.curHP;
	switch (move.name) {
		case "Super Fang":
		case "Nature\'s Madness":
		case "Ruination":
			singletonDamageValue = Math.max(Math.floor(effectiveCurHP / 2), 1);
			break;
		case "Guardian of Alola":
			singletonDamageValue = Math.max(Math.floor(effectiveCurHP * 3 / 4), 1);
			if (field.isProtect) {
				singletonDamageValue = Math.max(Math.floor(singletonDamageValue / 4), 1);
				description.isQuarteredByProtect = true;
			}
			break;
	}
	if (singletonDamageValue && attacker.curAbility === "Parental Bond") {
		description.attackerAbility = attacker.curAbility;
		singletonDamageValue += Math.max(Math.floor((defender.curHP - singletonDamageValue) / 2), 1);
		return singletonDamageValue;
	}

	if (move.name === "Final Gambit") {
		return attacker.curHP;
	}

	return singletonDamageValue;
}

function activateResistBerry(attacker, defenderItem, typeEffectiveness) {
	return getBerryResistType(defenderItem) === moveType && (typeEffectiveness > 1 || moveType === "Normal") && attacker.curAbility !== "Unnerve" && attacker.ability !== "As One";
}

function checkAirLock(pokemon, field) {
	if (pokemon.curAbility === "Air Lock" || pokemon.curAbility === "Cloud Nine") {
		field.clearWeather();
	}
}

function checkForecast(pokemon, weather) {
	if (pokemon.curAbility === "Forecast" && pokemon.name === "Castform") {
		if (weather.indexOf("Sun") > -1) {
			pokemon.type1 = "Fire";
		} else if (weather.indexOf("Rain") > -1) {
			pokemon.type1 = "Water";
		} else if (weather === "Hail" || weather === "Snow") {
			pokemon.type1 = "Ice";
		} else {
			pokemon.type1 = "Normal";
		}
		pokemon.type2 = "";
	}
}
function checkKlutz(pokemon) {
	if (pokemon.curAbility === "Klutz" && pokemon.item) {
		pokemon.item = "Klutz"; // don't let it be the empty string for Knock Off
	}
}

function checkSeedsHonk(pokemon, terrain) {
	// A Seed can either come into the field that has the matching terrain, or its own Surge ability can proc its own Seed (Pincurchin-RS)
	let abilityTerrain = autoTerrainAbilities(pokemon.curAbility);
	if (abilityTerrain) {
		terrain = abilityTerrain;
	}
	resolveSeeds(pokemon.item, terrain, pokemon.curAbility,
		(unused, stat, stageChange) => changeStatByStage(pokemon, stat, stageChange)
	);
}

function isShellSideArmPhysical(attacker, defender, move) {
	if (move.name !== "Shell Side Arm") {
		return false;
	}
	let scaler = (Math.floor(2 * attacker.level / 5) + 2) * move.bp;
	let phys = Math.floor(scaler * attacker.stats[AT] / defender.stats[DF]);
	let spec = Math.floor(scaler * attacker.stats[SA] / defender.stats[SD]);
	return phys > spec;
}

function applyKnockOffBoost(attacker, defender, move, terrain) {
	return gen >= 6 && move.name === "Knock Off" && canKnockOffItem(attacker, defender, terrain);
}

function moveRemovesItem(attacker, defender, move, terrain) {
	return canKnockOffItem(attacker, defender, terrain) && (move.name === "Knock Off" || (["Thief", "Covet"].includes(move.name) && attacker.item === ""));
}

function canKnockOffItem(attacker, defender, terrain) {
	// Mega Stones, Red/Blue Orbs, Memories, and Rusted items are already accounted for by the fact that they don't exist as items
	return !(getEffectiveItem(defender, attacker, terrain) === "" ||
	defender.item === "Lustrous Globe" && defender.name === "Palkia-O" ||
	defender.item === "Adamant Crystal" && defender.name === "Dialga-O" ||
	defender.item === "Griseous Orb" && gen <= 8 && defender.name === "Giratina-O" ||
	defender.item === "Griseous Core" && defender.name === "Giratina-O" ||
	defender.item.endsWith("Plate") && defender.name.startsWith("Arceus") ||
	defender.item.endsWith(" Z") ||
	defender.item === "Booster Energy" && ["Protosynthesis", "Quark Drive"].includes(defender.ability) ||
	defender.item.endsWith("Mask") && defender.name.startsWith("Ogerpon-"));
}

function applyGem(attacker, move) {
	return attacker.item === moveType + " Gem" && !move.name.includes("Pledge");
}

function checkProtoQuarkHighest(pokemon, weather, terrain) {
	if ((pokemon.ability === "Protosynthesis" && !isNeutralizingGas && (pokemon.item === "Booster Energy" || weather.endsWith("Sun"))) ||
		(pokemon.ability === "Quark Drive" && !isNeutralizingGas && (pokemon.item === "Booster Energy" || terrain === "Electric"))) {
		// getModifiedStat() is used because the CALCULATE_ functions have not yet initialized a stats[SP] value, and this function is part of that initialization
		let highestStat = AT;
		let highestValue = getModifiedStat(pokemon.rawStats[AT], pokemon.boosts[AT]);
		if (getModifiedStat(pokemon.rawStats[DF], pokemon.boosts[DF]) > highestValue) {
			highestStat = DF;
			highestValue = getModifiedStat(pokemon.rawStats[highestStat], pokemon.boosts[highestStat]);
		}
		if (getModifiedStat(pokemon.rawStats[SA], pokemon.boosts[SA]) > highestValue) {
			highestStat = SA;
			highestValue = getModifiedStat(pokemon.rawStats[highestStat], pokemon.boosts[highestStat]);
		}
		if (getModifiedStat(pokemon.rawStats[SD], pokemon.boosts[SD]) > highestValue) {
			highestStat = SD;
			highestValue = getModifiedStat(pokemon.rawStats[highestStat], pokemon.boosts[highestStat]);
		}
		if (getModifiedStat(pokemon.rawStats[SP], pokemon.boosts[SP]) > highestValue) {
			return SP;
		}
		return highestStat;
	}
	return false;
}

function checkAngerShell(pokemon) {
	if (pokemon.curAbility === "Anger Shell" && pokemon.curHP <= pokemon.maxHP / 2) {
		pokemon.boosts[AT] = Math.min(6, pokemon.boosts[AT] + 1);
		pokemon.boosts[SA] = Math.min(6, pokemon.boosts[SA] + 1);
		pokemon.boosts[SP] = Math.min(6, pokemon.boosts[SP] + 1);
		pokemon.boosts[DF] = Math.max(-6, pokemon.boosts[DF] - 1);
		pokemon.boosts[SD] = Math.max(-6, pokemon.boosts[SD] - 1);
	}
}

function checkIntimidate(source, target) {
	// this function is exclusively used by the mass calc now. The AI sets should always apply Intimidate in the mass calc if possible.
	// verify that the user's Pokemon has Intimidate activated to apply it.
	if (source.curAbility !== "Intimidate" || !source.isAbilityActivated) {
		return;
	}
	resolveIntimidate(target.curAbility, target.item,
		(pokemonTarget, stat, stageChange) => changeStatByStage(pokemonTarget === "target" ? target : source, stat, stageChange)
	);
}

function checkDownload(source, target) {
	if (isNeutralizingGas || source.curAbility !== "Download" || !source.isAbilityActivated) {
		return;
	}
	resolveDownload(source.curAbility, target.stats[DF], target.stats[SD],
		(unused, stat, stageChange) => changeStatByStage(source, stat, stageChange)
	);
}

function checkFieldBoosts(attacker, defender) {
	// only apply this to the mass pokemon; the user's stat boosts are already applied as visible stat stages via #clangL #evoL
	let source = mode === "one-vs-all" ? defender : attacker;
	if ($("#wpR").prop("checked")) {
		resolveWeaknessPolicy(source.curAbility, (unused, stat, stageChange) => changeStatByStage(source, stat, stageChange));
	}
	if ($("#clangR").prop("checked")) {
		resolveOmniboost(source.curAbility, 1, (unused, stat, stageChange) => changeStatByStage(source, stat, stageChange));
	}
	if ($("#evoR").prop("checked")) {
		resolveOmniboost(source.curAbility, 2, (unused, stat, stageChange) => changeStatByStage(source, stat, stageChange));
	}
}

function changeStatByStage(pokemon, stat, stageChange, applyBlockingItem = true) {
	if (stageChange < 0 && applyBlockingItem && ["Clear Amulet", "White Herb"].includes(pokemon.item)) {
		return;
	}
	pokemon.boosts[stat] = Math.max(-6, Math.min(6, pokemon.boosts[stat] + stageChange));
}

function resolveIntimidate(targetAbility, targetItem, changeStat) {
	let atkChange = -1;
	if (["Contrary", "Guard Dog"].includes(targetAbility) || (targetAbility === "Defiant" && targetItem !== "Clear Amulet")) {
		// White Herb does not factor into Intimidate into Defiant
		// Contrary and Guard Dog will raise Atk even when holding Clear Amulet
		atkChange = 1;
	} else if (targetAbility === "Mirror Armor" && targetItem !== "Clear Amulet") {
		// A Mirror Armor mon holding Clear Amulet does not bounce Intimidate
		changeStat("source", AT, -1);
		atkChange = 0;
	} else if (targetAbility === "Competitive" && targetItem !== "Clear Amulet") {
		changeStat("target", SA, 2);
	} else if (["Clear Body", "White Smoke", "Hyper Cutter", "Full Metal Body"].includes(targetAbility) ||
		(gen >= 8 && ["Inner Focus", "Oblivious", "Scrappy", "Own Tempo"].includes(targetAbility))) {
		atkChange = 0;
	} else if (targetAbility === "Simple" && gen != 4) {
		atkChange = -2;
	}

	if (atkChange < 0 && ["White Herb", "Clear Amulet"].includes(targetItem)) {
		return;
	}

	if (targetItem === "Adrenaline Orb") {
		let speedChange = 1;
		if (targetAbility === "Contrary") {
			speedChange = -1;
		} else if (targetAbility === "Simple") {
			speedChange = 2;
		}
		changeStat("target", SP, speedChange);
	}

	changeStat("target", AT, atkChange);
}

function massCalcStatAbilities(attacker, defender) {
	// only apply this to the mass pokemon; the user's stat boosts are already applied as visible stat stages via #clangL #evoL
	let source = mode === "one-vs-all" ? defender : attacker;
	let ability = source.curAbility;
	if (ability in statAbilities) {
		resolveStatAbilities(ability, (unused, stat, stageChange) => changeStatByStage(source, stat, stageChange));
	}
	resolveEmbodyAspect(ability, source.isTerastal, source.name, (unused, stat, stageChange) => changeStatByStage(source, stat, stageChange));
}

function resolveStatAbilities(ability, changeStat) {
	let stat = statAbilities[ability];
	if (!stat) {
		return;
	}
	changeStat("source", stat, 1);
}

function resolveEmbodyAspect(ability, isTerastal, pokeName, changeStat) {
	if (!(ability === "Embody Aspect" && isTerastal)) {
		return;
	}
	let stat = pokeName === "Ogerpon-Wellspring" ? SD : pokeName === "Ogerpon-Hearthflame" ? AT : pokeName === "Ogerpon-Cornerstone" ? DF : SP;
	changeStat("source", stat, 1);
}

function resolveDownload(ability, targetDF, targetSD, changeStat) {
	if (ability !== "Download") {
		return;
	}
	changeStat("source", targetDF < targetSD ? AT : SA, 1);
}

function getSeedStat(item, terrain) {
	if ((item === "Psychic Seed" && terrain === "Psychic") || (item === "Misty Seed" && terrain === "Misty")) {
		return SD;
	} else if ((item === "Electric Seed" && terrain === "Electric") || (item === "Grassy Seed" && terrain === "Grassy")) {
		return DF;
	}
	return "";
}

function resolveSeeds(item, terrain, ability, changeStat) {
	let stat = getSeedStat(item, terrain);
	if (!stat) {
		return;
	}
	let stageChange = ability === "Simple" ? 2 : ability === "Contrary" ? -1 : 1;
	changeStat("source", stat, stageChange);
}

function resolveWeaknessPolicy(ability, changeStat) {
	let stageChange = ability === "Simple" ? 4 : ability === "Contrary" ? -2 : 2;
	changeStat("source", AT, stageChange);
	changeStat("source", SA, stageChange);
}

function resolveOmniboost(ability, stageChange, changeStat) {
	if (ability === "Simple") {
		stageChange *= 2;
	} else if (ability === "Contrary") {
		stageChange *= -1;
	}
	changeStat("source", AT, stageChange);
	changeStat("source", DF, stageChange);
	changeStat("source", SA, stageChange);
	changeStat("source", SD, stageChange);
	changeStat("source", SP, stageChange);
}

function checkMinimize(p1, p2) {
	if ($("#minimL").prop("checked")) {
		p1.boosts[ES] = Math.min(6, p2.boosts[ES] + 2);
	}
	if ($("#minimR").prop("checked")) {
		p2.boosts[ES] = Math.min(6, p2.boosts[ES] + 2);
	}
}

function isTeraShell(defender, typeEffectiveness) {
	return defender.curAbility === "Tera Shell" && typeEffectiveness >= 1 && defender.curHP === defender.maxHP;
}

const HIDDEN_POWER_TYPES = ["Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel",
	"Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark"];
function getHiddenPower(ivs) {
	let typeBits = 0, powerBits = 0;
	[ivs.hp, ivs.at, ivs.df, ivs.sp, ivs.sa, ivs.sd].forEach((iv, i) => {
		typeBits += (iv & 1) << i;
		powerBits += (iv >> 1 & 1) << i;
	});
	return {
		"name": "Hidden Power " + HIDDEN_POWER_TYPES[Math.floor(typeBits * 15 / 63)],
		"bp": gen <= 5 ? Math.floor(powerBits * 40 / 63) + 30 : 60
	};
}

function countBoosts(boosts) {
	var sum = 0;
	for (var i = 0; i < STATS.length; i++) {
		if (boosts[STATS[i]] > 0) {
			sum += boosts[STATS[i]];
		}
	}
	return sum;
}

// GameFreak rounds DOWN on .5
function pokeRound(num) {
	return num % 1 > 0.5 ? Math.ceil(num) : Math.floor(num);
}
