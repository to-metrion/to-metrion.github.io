function CALCULATE_ALL_MOVES_PTHGSS(p1, p2, field) {
	checkAirLock(p1, field);
	checkAirLock(p2, field);
	checkForecast(p1, field.getWeather());
	checkForecast(p2, field.getWeather());
	checkKlutz(p1);
	checkKlutz(p2);
	p1.stats[SP] = getFinalSpeed(p1, p2, field);
	p2.stats[SP] = getFinalSpeed(p2, p1, field);
	var side1 = field.getSide(1);
	var side2 = field.getSide(0);
	var results = [[], []];
	for (var i = 0; i < 4; i++) {
		results[0][i] = getDamageResultPtHGSS(p1, p2, p1.moves[i], side1);
		p2.resetCurAbility();
		results[1][i] = getDamageResultPtHGSS(p2, p1, p2.moves[i], side2);
		p1.resetCurAbility();
	}
	return results;
}

function CALCULATE_MOVES_OF_ATTACKER_PTHGSS(attacker, defender, field) {
	checkAirLock(attacker, field);
	checkAirLock(defender, field);
	checkForecast(attacker, field.getWeather());
	checkForecast(defender, field.getWeather());
	checkIntimidate(attacker, defender);
	checkIntimidate(defender, attacker);
	checkKlutz(attacker);
	checkKlutz(defender);
	attacker.stats[SP] = getFinalSpeed(attacker, defender, field);
	defender.stats[SP] = getFinalSpeed(defender, attacker, field);
	checkDownload(attacker, defender);
	var defenderSide = field.getSide(~~(mode === "one-vs-all"));
	var results = [];
	for (var i = 0; i < 4; i++) {
		results[i] = getDamageResultPtHGSS(attacker, defender, attacker.moves[i], defenderSide);
		defender.resetCurAbility();
	}
	return results;
}

function getDamageResultPtHGSS(attacker, defender, move, field) {
	var description = {
		"attackerName": getDescriptionPokemonName(attacker),
		"moveName": move.name,
		"defenderName": getDescriptionPokemonName(defender)
	};

	if (attacker.ability === "Mold Breaker") {
		defender.curAbility = "";
		//description.attackerAbility = attacker.ability;
	}

	if (killsShedinja(attacker, defender, move)) {
		return {"damage": [1], "description": buildDescription(description)};
	}
	if (move.bp === 0) {
		return {"damage": [0], "description": buildDescription(description)};
	}

	let moveType = move.type;

	var isCritical = move.isCrit && !["Battle Armor", "Shell Armor"].includes(defender.curAbility);

	let basePower = move.bp;

	if (move.name === "Weather Ball") {
		moveType = getWeatherBall(field.weather, attacker.item);
		if (moveType !== "Normal") {
			description.weather = field.weather;
		}
	} else if (move.name === "Judgment" && attacker.item.indexOf("Plate") !== -1) {
		moveType = getItemBoostType(attacker.item);
	} else if (move.name === "Natural Gift" && attacker.item.indexOf("Berry") !== -1) {
		var gift = getNaturalGift(attacker.item);
		moveType = gift.t;
		basePower = gift.p;
		description.attackerItem = attacker.item;
		description.moveBP = basePower;
	}

	// If a move's type is different from its default type, print it.
	if (move.name in moves) {
		let moveDefaultDetails = moves[move.name];
		if (moveDefaultDetails.hasOwnProperty("type") && moveType !== moveDefaultDetails.type) {
			description.moveType = moveType;
		}
	}

	if (attacker.ability === "Normalize") {
		moveType = "Normal";
		description.attackerAbility = attacker.ability;
	}

	var chartType = moveType;
	if (move.name === "Struggle") {
		moveType = "Normal";
		chartType = "None";
	}

	attackerGrounded = isGrounded(attacker, field);
	defenderGrounded = isGrounded(defender, field);

	var typeEffect1 = getMoveEffectiveness(move, chartType, defender.type1, attacker.ability === "Scrappy", field);
	var typeEffect2 = defender.type2 ? getMoveEffectiveness(move, chartType, defender.type2, attacker.ability === "Scrappy", field) : 1;
	var typeEffectiveness = typeEffect1 * typeEffect2;
	if (reorderTypeEffectiveness(defender, moveType)) {
		let temp = typeEffect1;
		typeEffect1 = typeEffect2;
		typeEffect2 = temp;
	}

	if (moveType === "Ground" && defender.hasType("Flying") && defenderGrounded) {
		// Defending gen 4 Iron Ball Flying types always treat their Flying type as 1x with Ground attacks
		if (field.isGravity) {
			description.gravity = true;
		} else if (defender.item === "Iron Ball") {
			description.defenderItem = defender.item;
		}
	}

	if (typeEffectiveness === 0) {
		return {"damage": [0], "description": buildDescription(description)};
	}
	if ((defender.curAbility === "Wonder Guard" && typeEffectiveness <= 1 && !["Struggle", "Beat Up", "Future Sight", "Doom Desire", "Fire Fang"].includes(move.name)) ||
		(moveType === "Fire" && defender.curAbility === "Flash Fire") ||
		(moveType === "Water" && ["Dry Skin", "Water Absorb"].indexOf(defender.curAbility) !== -1) ||
		(moveType === "Electric" && ["Motor Drive", "Volt Absorb"].indexOf(defender.curAbility) !== -1) ||
		(moveType === "Ground" && defender.curAbility === "Levitate" && !isGrounded(defender, field)) ||
		(move.isSound && defender.curAbility === "Soundproof") ||
		(move.isMLG && defender.curAbility === "Sturdy")) {
		description.defenderAbility = defender.curAbility;
		return {"damage": [0], "description": buildDescription(description)};
	}

	description.HPEVs = defender.HPEVs + " HP";
	let attackerLevel = attacker.level;
	if (attackerLevel != defender.level || (attackerLevel != 50 && attackerLevel != 100)) {
		description.attackerLevel = attackerLevel;
		description.defenderLevel = defender.level;
	}

	let singletonDamageValue = getSingletonDamage(attacker, defender, move, field, description);
	if (singletonDamageValue) {
		return {"damage": [singletonDamageValue], "description": buildDescription(description)};
	}

	if (move.hits > 1) {
		description.hits = move.hits;
	}
	var turnOrder = attacker.stats[SP] > defender.stats[SP] ? "FIRST" : "LAST";

	////////////////////////////////
	////////// BASE POWER //////////
	////////////////////////////////
	switch (move.name) {
	case "Brine":
		if (defender.curHP <= (defender.maxHP / 2)) {
			basePower *= 2;
			description.moveBP = basePower;
		}
		break;
	case "Eruption":
	case "Water Spout":
		basePower = Math.max(1, Math.floor(basePower * attacker.curHP / attacker.maxHP));
		description.moveBP = basePower;
		break;
	case "Facade":
		if (["Paralyzed", "Poisoned", "Badly Poisoned", "Burned"].indexOf(attacker.status) !== -1) {
			basePower *= 2;
			description.moveBP = basePower;
		}
		break;
	case "Flail":
	case "Reversal":
		var p = Math.floor(64 * attacker.curHP / attacker.maxHP);
		basePower = p <= 1 ? 200 : p <= 5 ? 150 : p <= 12 ? 100 : p <= 21 ? 80 : p <= 42 ? 40 : 20;
		description.moveBP = basePower;
		break;
	case "Fling":
		basePower = getFlingPower(attacker.item);
		description.moveBP = basePower;
		description.attackerItem = attacker.item;
		break;
	case "Grass Knot":
	case "Low Kick":
		var w = defender.weight;
		// unlike other gens, a weight exactly on a threshold gets the lower power
		basePower = w > 200 ? 120 : w > 100 ? 100 : w > 50 ? 80 : w > 25 ? 60 : w > 10 ? 40 : 20;
		description.moveBP = basePower;
		break;
	case "Gyro Ball":
		basePower = attacker.stats[SP] === 0 ? 1 : Math.min(150, Math.floor(25 * defender.stats[SP] / attacker.stats[SP]) + 1);
		description.moveBP = basePower;
		break;
	case "Magnitude":
		// always print these moves' power
		description.moveBP = basePower;
		break;
	case "Payback":
		if (turnOrder !== "FIRST") {
			basePower *= 2;
			description.moveBP = basePower;
		}
		break;
	case "Punishment":
		var boostCount = countBoosts(defender.boosts);
		if (boostCount > 0) {
			basePower = Math.min(200, basePower + 20 * boostCount);
			description.moveBP = basePower;
		}
		break;
	case "Smelling Salts":
		if (defender.status === "Paralyzed") {
			basePower *= 2;
			description.moveBP = basePower;
		}
		break;
	case "Triple Kick":
		description.moveBP = basePower;
		for (let i = 2; i <= move.hits; i++) {
			description.moveBP += ", " + (basePower * i);
		}
		break;
	case "Wake-Up Slap":
		if (defender.status === "Asleep") {
			basePower *= 2;
			description.moveBP = basePower;
		}
		break;
	case "Weather Ball":
		basePower *= field.weather !== "" ? 2 : 1;
		description.moveBP = basePower;
		break;
	case "Wring Out":
	case "Crush Grip":
		basePower = Math.floor(defender.curHP * 120 / defender.maxHP) + 1;
		description.moveBP = basePower;
		break;
	}

	var isPhysical = move.category === "Physical";
	if (attacker.ability === "Reckless" && move.hasRecoil && move.name !== "Struggle") {
		basePower = Math.floor(basePower * 1.2);
		description.attackerAbility = attacker.ability;
	}

	if (field.isCharge && moveType === "Electric") {
		basePower *= 2;
		description.isCharge = true;
	}

	if (field.isHelpingHand) {
		basePower = Math.floor(basePower * 1.5);
		description.isHelpingHand = true;
	}

	if (attacker.ability === "Technician" && basePower <= 60 && move.name !== "Struggle") {
		basePower = Math.floor(basePower * 1.5);
		description.attackerAbility = attacker.ability;
	}

	if ((attacker.item === "Muscle Band" && isPhysical) || (attacker.item === "Wise Glasses" && !isPhysical)) {
		basePower = Math.floor(basePower * 1.1);
		description.attackerItem = attacker.item;
	} else if (getItemBoostType(attacker.item) === moveType ||
            (((attacker.item === "Adamant Orb" && attacker.name === "Dialga") ||
            (attacker.item === "Lustrous Orb" && attacker.name === "Palkia") ||
            (attacker.item === "Griseous Orb" && attacker.name === "Giratina-Origin")) &&
            attacker.hasType(moveType))) {
		basePower = Math.floor(basePower * 1.2);
		description.attackerItem = attacker.item;
	} else if (attacker.item === "Light Ball" && attacker.name === "Pikachu") {
		basePower *= 2;
		description.attackerItem = attacker.item;
	}

	if (defender.curAbility === "Thick Fat" && (moveType === "Fire" || moveType === "Ice")) {
		basePower = Math.floor(basePower * 0.5);
		description.defenderAbility = defender.curAbility;
	}

	if ((attacker.curAbility === "Overgrow" && moveType === "Grass" ||
        attacker.curAbility === "Blaze" && moveType === "Fire" ||
        attacker.curAbility === "Torrent" && moveType === "Water" ||
        attacker.curAbility === "Swarm" && moveType === "Bug") && (attacker.curHP <= attacker.maxHP / 3 || attacker.isAbilityActivated)) {
		basePower = Math.floor(basePower * 1.5);
		description.attackerAbility = attacker.ability;
	}

	if (defender.curAbility === "Heatproof" && moveType === "Fire") {
		basePower = Math.floor(basePower * 0.5);
		description.defenderAbility = defender.curAbility;
	} else if (defender.curAbility === "Dry Skin" && moveType === "Fire") {
		basePower = Math.floor(basePower * 1.25);
		description.defenderAbility = defender.curAbility;
	}

	if (attacker.curAbility === "Rivalry" && attacker.isAbilityActivated) {
		if (attacker.isAbilityActivated === true) {
			basePower = Math.floor(basePower * 1.25);
			description.attackerAbility = attacker.curAbility + " (increasing)";
		} else if (attacker.isAbilityActivated === "indeterminate") {
			basePower = Math.floor(basePower * 0.75);
			description.attackerAbility = attacker.curAbility + " (decreasing)";
		} else {
			console.log("attacker.isAbilityActivated in a bad state for Rivalry: " + description.attackerAbility);
		}
	}

	if (attacker.ability === "Iron Fist" && move.isPunch) {
		basePower = Math.floor(basePower * 1.2);
		description.attackerAbility = attacker.ability;
	}

	////////////////////////////////
	////////// (SP)ATTACK //////////
	////////////////////////////////
	var attackStat = isPhysical ? AT : SA;
	description.attackEVs = attacker.evs[attackStat] +
            (NATURES[attacker.nature][0] === attackStat ? "+" : NATURES[attacker.nature][1] === attackStat ? "-" : "") + " " +
            toSmogonStat(attackStat);
	var rawAttack = attacker.rawStats[attackStat];
	if (isPhysical && (attacker.ability === "Pure Power" || attacker.ability === "Huge Power")) {
		rawAttack *= 2;
		description.attackerAbility = attacker.ability;
	} else if (isPhysical && attacker.ability === "Slow Start" && attacker.isAbilityActivated) {
		rawAttack = Math.floor(rawAttack * 0.5);
		description.attackerAbility = attacker.ability;
	}

	if ((isPhysical ? attacker.item === "Choice Band" : attacker.item === "Choice Specs") ||
            (attacker.item === "Soul Dew" && (attacker.name === "Latios" || attacker.name === "Latias") && !isPhysical)) {
		rawAttack = Math.floor(rawAttack * 1.5);
		description.attackerItem = attacker.item;
	} else if ((attacker.item === "Thick Club" && (attacker.name === "Cubone" || attacker.name === "Marowak") && isPhysical) ||
            (attacker.item === "Deep Sea Tooth" && attacker.name === "Clamperl" && !isPhysical)) {
		rawAttack *= 2;
		description.attackerItem = attacker.item;
	}

	if (isPhysical && (attacker.ability === "Hustle" || (attacker.ability === "Guts" && (attacker.status !== "Healthy" || attacker.isAbilityActivated)))) {
		rawAttack = Math.floor(rawAttack * 1.5);
		description.attackerAbility = attacker.ability;
	} else if (!isPhysical && (attacker.ability === "Plus" || attacker.ability === "Minus") && attacker.isAbilityActivated) {
		rawAttack = Math.floor(rawAttack * 1.5);
		description.attackerAbility = attacker.ability;
	} else if (field.weather === "Sun" && (isPhysical ? attacker.ability === "Flower Gift" : attacker.ability === "Solar Power")) {
		rawAttack = Math.floor(rawAttack * 1.5);
		description.attackerAbility = attacker.ability;
		description.weather = field.weather;
	}

	var attack;
	var attackBoost = attacker.boosts[attackStat];
	if (attackBoost === 0 || (isCritical && attackBoost < 0)) {
		attack = rawAttack;
	} else if (defender.curAbility === "Unaware") {
		attack = rawAttack;
		description.defenderAbility = defender.curAbility;
	} else if (attacker.ability === "Simple") {
		attack = getSimpleModifiedStat(rawAttack, attackBoost);
		description.attackerAbility = attacker.ability;
		description.attackBoost = attackBoost;
	} else {
		attack = getModifiedStat(rawAttack, attackBoost);
		description.attackBoost = attackBoost;
	}

	////////////////////////////////
	///////// (SP)DEFENSE //////////
	////////////////////////////////
	var defenseStat = isPhysical ? DF : SD;
	description.defenseEVs = defender.evs[defenseStat] +
            (NATURES[defender.nature][0] === defenseStat ? "+" : NATURES[defender.nature][1] === defenseStat ? "-" : "") + " " +
            toSmogonStat(defenseStat);
	var rawDefense = defender.rawStats[defenseStat];
	if (defender.item === "Soul Dew" && (defender.name === "Latios" || defender.name === "Latias") && !isPhysical) {
		rawDefense = Math.floor(rawDefense * 1.5);
		description.defenderItem = defender.item;
	} else if ((defender.item === "Deep Sea Scale" && defender.name === "Clamperl" && !isPhysical) ||
            (defender.item === "Metal Powder" && defender.name === "Ditto" && isPhysical)) {
		rawDefense *= 2;
		description.defenderItem = defender.item;
	}

	if (defender.curAbility === "Marvel Scale" && (defender.status !== "Healthy" || defender.isAbilityActivated) && isPhysical) {
		rawDefense = Math.floor(rawDefense * 1.5);
		description.defenderAbility = defender.curAbility;
	} else if (defender.curAbility === "Flower Gift" && field.weather === "Sun" && !isPhysical) {
		rawDefense = Math.floor(rawDefense * 1.5);
		description.defenderAbility = defender.curAbility;
		description.weather = field.weather;
	}

	if (field.weather === "Sand" && defender.hasType("Rock") && !isPhysical) {
		rawDefense = Math.floor(rawDefense * 1.5);
		description.weather = field.weather;
	}

	if (move.name === "Explosion" || move.name === "Self-Destruct") {
		rawDefense = Math.floor(rawDefense * 0.5);
	}

	var defense;
	var defenseBoost = defender.boosts[defenseStat];
	if (defenseBoost === 0 || (isCritical && defenseBoost > 0)) {
		defense = rawDefense;
	} else if (attacker.ability === "Unaware") {
		defense = rawDefense;
		description.attackerAbility = attacker.ability;
	} else if (defender.curAbility === "Simple") {
		defense = getSimpleModifiedStat(rawDefense, defenseBoost);
		description.defenderAbility = defender.curAbility;
		description.defenseBoost = defenseBoost;
	} else {
		defense = getModifiedStat(rawDefense, defenseBoost);
		description.defenseBoost = defenseBoost;
	}

	if (defense < 1) {
		defense = 1;
	}

	////////////////////////////////
	//////////// DAMAGE ////////////
	////////////////////////////////
	var baseDamage = Math.floor(Math.floor(Math.floor(2 * attackerLevel / 5 + 2) * basePower * attack / 50) / defense);

	if (attacker.status === "Burned" && isPhysical && attacker.ability !== "Guts") {
		baseDamage = Math.floor(baseDamage * 0.5);
		description.isBurned = true;
	}
	if (!(isCritical || move.name === "Brick Break")) {
		description.isReflect = field.isReflect && isPhysical;
		description.isLightScreen = field.isLightScreen && !isPhysical;
		if (description.isReflect || description.isLightScreen) {
			if (field.format === "singles") {
				baseDamage = Math.floor(baseDamage / 2);
			} else {
				baseDamage = Math.floor(baseDamage * 2 / 3);
				description.isDoublesScreen = true;
			}
		}
	}

	if (field.format === "doubles" && move.isSpread) {
		baseDamage = Math.floor(baseDamage * 3 / 4);
		description.isSpread = true;
	}

	if ((field.weather === "Sun" && moveType === "Fire") || (field.weather === "Rain" && moveType === "Water")) {
		baseDamage = Math.floor(baseDamage * 1.5);
		description.weather = field.weather;
	} else if ((field.weather === "Sun" && moveType === "Water") || (field.weather === "Rain" && moveType === "Fire") ||
            (["Rain", "Sand", "Hail"].indexOf(field.weather) !== -1 && move.name === "Solar Beam")) {
		baseDamage = Math.floor(baseDamage * 0.5);
		description.weather = field.weather;
	}

	if (attacker.ability === "Flash Fire" && attacker.isAbilityActivated && moveType === "Fire") {
		baseDamage = Math.floor(baseDamage * 1.5);
		description.attackerAbility = attacker.ability;
	}

	baseDamage += 2;

	if (isCritical) {
		if (attacker.ability === "Sniper") {
			baseDamage *= 3;
			description.attackerAbility = attacker.ability;
		} else {
			baseDamage *= 2;
		}
		description.isCritical = isCritical;
	}

	if (attacker.item === "Life Orb") {
		baseDamage = Math.floor(baseDamage * 1.3);
		description.attackerItem = attacker.item;
	}

	// the random factor is applied between the LO mod and the STAB mod, so don't apply anything below this until we're inside the loop
	var stabMod = 1;
	if ((attacker.hasType(moveType) && move.name !== "Struggle") || move.name.includes("Pledge Boosted")) {
		if (attacker.ability === "Adaptability") {
			stabMod = 2;
			description.attackerAbility = attacker.ability;
		} else {
			stabMod = 1.5;
		}
	}

	var filterMod = 1;
	if ((defender.curAbility === "Filter" || defender.curAbility === "Solid Rock") && typeEffectiveness > 1) {
		filterMod = 0.75;
		description.defenderAbility = defender.curAbility;
	}
	var ebeltMod = 1;
	if (attacker.item === "Expert Belt" && typeEffectiveness > 1) {
		ebeltMod = 1.2;
		description.attackerItem = attacker.item;
	}
	var tintedMod = 1;
	if (attacker.ability === "Tinted Lens" && typeEffectiveness < 1) {
		tintedMod = 2;
		description.attackerAbility = attacker.ability;
	}
	var berryMod = 1;
	if (isFirstHit && getBerryResistType(defender.item) === moveType && (typeEffectiveness > 1 || moveType === "Normal") && attacker.ability !== "Unnerve") {
		berryMod = 0.5;
		description.defenderItem = defender.item + getFirstHitText(STRIKE_TEXT, move.hits);
	}

	var damage = [];
	for (var i = 0; i < 16; i++) {
		damage[i] = Math.floor(baseDamage * (85 + i) / 100);
		damage[i] = Math.floor(damage[i] * stabMod);
		damage[i] = Math.max(1, Math.floor(damage[i] * typeEffect1));
		damage[i] = Math.max(1, Math.floor(damage[i] * typeEffect2));
		damage[i] = Math.max(1, Math.floor(damage[i] * filterMod));
		damage[i] = Math.floor(damage[i] * ebeltMod);
		damage[i] = Math.floor(damage[i] * tintedMod);
		damage[i] = Math.floor(damage[i] * berryMod);
		damage[i] = Math.max(1, damage[i]);
	}
	let result = {"damage": damage, "description": buildDescription(description)};

	let tripleKickDamage = getTripleKickDamage(getDamageResultPtHGSS, attacker, defender, move, field, damage);
	if (tripleKickDamage) {
		result.tripleAxelDamage = tripleKickDamage;
	}

	if (isFirstHit && berryMod != 1) {
		result.firstHitDamage = damage;
		isFirstHit = false;
		result.damage = getDamageResultPtHGSS(attacker, defender, move, field).damage;
		isFirstHit = true;
	}

	return result;
}

function getSimpleModifiedStat(stat, mod) {
	var simpleMod = Math.min(6, Math.max(-6, mod * 2));
	return simpleMod > 0 ? Math.floor(stat * (2 + simpleMod) / 2) :
		simpleMod < 0 ? Math.floor(stat * 2 / (2 - simpleMod)) :
			stat;
}

// this function is also used by gen 3
function getTripleKickDamage(getDamageResultFunction, attacker, defender, move, field, firstStrikeDamage) {
	if (!isFirstHit || move.name !== "Triple Kick") {
		return;
	}

	let damageArrays = [];
	let startingBP = move.bp;
	isFirstHit = false;
	for (let hitNum = 1; hitNum <= move.hits; hitNum++) {
		move.bp = startingBP * hitNum;
		damageArrays.push(getDamageResultFunction(attacker, defender, move, field).damage);
	}
	isFirstHit = true;
	move.bp = startingBP;
	return damageArrays;
}

// in gens 3 and 4, type effectiveness is applied in the order of the type chart's rows for the move's type
const TYPE_CHART_ROW_ORDER = {
	"Normal": ["Rock", "Steel"],
	"Fire": ["Fire", "Water", "Grass", "Ice", "Bug", "Rock", "Dragon", "Steel"],
	"Water": ["Fire", "Water", "Grass", "Ground", "Rock", "Dragon"],
	"Electric": ["Water", "Electric", "Grass", "Flying", "Dragon"],
	"Grass": ["Fire", "Water", "Grass", "Poison", "Ground", "Flying", "Bug", "Rock", "Dragon", "Steel"],
	"Ice": ["Water", "Grass", "Ice", "Ground", "Flying", "Dragon", "Steel", "Fire"],
	"Fighting": ["Normal", "Ice", "Poison", "Flying", "Psychic", "Bug", "Rock", "Dark", "Steel"],
	"Poison": ["Grass", "Poison", "Ground", "Rock", "Ghost"],
	"Ground": ["Fire", "Electric", "Grass", "Poison", "Bug", "Rock", "Steel"],
	"Flying": ["Electric", "Grass", "Fighting", "Bug", "Rock", "Steel"],
	"Psychic": ["Fighting", "Poison", "Psychic", "Steel"],
	"Bug": ["Fire", "Grass", "Fighting", "Poison", "Flying", "Psychic", "Ghost", "Dark", "Steel"],
	"Rock": ["Fire", "Ice", "Fighting", "Ground", "Flying", "Bug", "Steel"],
	"Ghost": ["Psychic", "Dark", "Steel", "Ghost"],
	"Dragon": ["Dragon", "Steel"],
	"Dark": ["Fighting", "Psychic", "Ghost", "Dark", "Steel"],
	"Steel": ["Fire", "Water", "Electric", "Ice", "Rock", "Steel"]
};

function reorderTypeEffectiveness(defender, moveType) {
	let row = TYPE_CHART_ROW_ORDER[moveType];
	return defender.type2 && row && row.indexOf(defender.type1) > row.indexOf(defender.type2);
}