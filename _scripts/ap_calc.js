$("#p1 .ability").bind("keyup change", function () {
	abilityAPCalcChange(1);
});

$("#p1 .status").bind("keyup change", function () {
	statusAPCalcChange(1);
});

$("#p2 .ability").bind("change", function () {
	abilityChange($(this), 2);
	abilityAPCalcChange(2);
});

$("#p2 .item").bind("keyup change", function () {
	itemChange($(this).val(), 2);
});

$("#p2 .status").bind("keyup change", function () {
	statusAPCalcChange(2);
});

$("#p2 .isActivated").bind("change", function () {
	isActivatedChange($(this), 2);
});

$("#maxR").change(function () {
	applyMaxMoveProperty("R", this.checked);
});

$("#autoivsR").change(function () {
	if (gen != 3 && gen != 4) {
		return;
	}
	setIVSelectors($("#p2"), "R");
});

$("#wpR").change(function () {
	applyWeaknessPolicy(2, !this.checked);
});

$("#clangR").change(function () {
	applyOmniboost(2, 1, !this.checked);
});

$("#evoR").change(function () {
	applyOmniboost(2, 2, !this.checked);
});

function abilityAPCalcChange(pokeNum) {
	autoSetCrits(pokeNum);
}

function statusAPCalcChange(pokeNum) {
	let opponentPokeNum = pokeNum === 1 ? 2 : 1;

	// since pokeNum mon's status is changing, check the autocrit status of the opponent, since it may have activated Merciless
	autoSetCrits(opponentPokeNum);
}

function autoSetCrits(pokeNum) {
	let pokeInfo = $("#p" + pokeNum);
	let opponentIndex = pokeNum === 1 ? 1 : 0;

	let merciless = pokeInfo.find(".ability").val() === "Merciless" && $(".status")[opponentIndex].value.includes("Poisoned");
	for (let i = 1; i <= 4; i++) {
		let moveInfo = pokeInfo.find(".move" + i);
		let moveName = moveInfo.find("select.move-selector").val();
		let move = moves[moveName] || moves["(No Move)"];
		moveInfo.children(".move-crit").prop("checked", move.alwaysCrit || (merciless && move.category));
	}
}

var resultLocations = [[], []];
for (var i = 0; i < 4; i++) {
	resultLocations[0].push({
		"move": "#resultMoveL" + (i + 1),
		"damage": "#resultDamageL" + (i + 1)
	});
	resultLocations[1].push({
		"move": "#resultMoveR" + (i + 1),
		"damage": "#resultDamageR" + (i + 1)
	});
}

var damageResults;
function calculate() {
	let p1info = $("#p1");
	let p2info = $("#p2");
	let p1 = new Pokemon(p1info);
	let p2 = new Pokemon(p2info);
	let field = new Field();
	//optimizeEVs("#p1", p1);
	//optimizeEVs("#p2", p2);
	damageResults = calculateAllMoves(p1, p2, field);
	setSpeed(p1info, p2info, p1, p2);
	// Removed the auto-select highest damage since it's rarely useful for facilities (or any format?)
	//var highestMaxPercent = -1;
	//var bestResult = $(resultLocations[0][0].move);
	let p1Move, p2Move;
	for (var i = 0; i < 4; i++) {
		setDamageText(damageResults[0][i], p1, p2, p1.moves[i], field.getSide(0), resultLocations[0][i]);
		setDamageText(damageResults[1][i], p2, p1, p2.moves[i], field.getSide(1), resultLocations[1][i]);
	}
	/*if ($(".locked-move").length) {
		bestResult = $(".locked-move");
	} else {
		stickyMoves.setSelectedMove(bestResult.prop("id"));
	}
	bestResult.prop("checked", true);
	bestResult.change();*/
	//$("#resultHeaderL").text(p1.name + "'s Moves (select one to show detailed results)");
	//$("#resultHeaderR").text(p2.name + "'s Moves (select one to show detailed results)");
	updateDamageText($("input:radio[name='resultMove']:checked"));
}

$(".result-move").change(function () {
	updateDamageText($(this));
});

function setSpeed(p1info, p2info, p1, p2) {
	let p1Speed = p1.stats.sp;
	let p2Speed = p2.stats.sp;
	p1info.find(".sp .totalMod").text(p1Speed).css({ "font-weight": p1Speed > p2Speed ? "bold" : "" });
	p2info.find(".sp .totalMod").text(p2Speed).css({ "font-weight": p2Speed > p1Speed ? "bold" : "" });
}

const MAX_GROUP_COUNT = 14;
const MAX_UNGROUPED_COUNT = MAX_GROUP_COUNT + 4;
function damageMapAsGroups(damageInfo) {
	// This takes in a damage map and puts its damage values into groups with the probability of that group occuring.
	// This is to display something smaller and simpler for the complete calculation of multi-hit moves.
	let sortedDamageValues = Array.from(damageInfo.damageMap.keys());
	sortedDamageValues.sort((a, b) => a - b);
	let valuesCount = sortedDamageValues.length;
	let groupCount = Math.min(valuesCount, MAX_GROUP_COUNT);
	// make an array that stores how many damage values are in each group, evenly distributed
	let groupSizes = new Array(groupCount);
	groupSizes.fill(Math.floor(valuesCount / groupCount));
	// if the number of damage values doesn't evenly divide, add 1 to the highest and lowest group(s)
	let extra = valuesCount % groupCount;
	let upperExtra = Math.ceil(extra / 2);
	extra -= upperExtra;
	for ( ; upperExtra > 0; upperExtra--) {
		groupSizes[groupCount - upperExtra]++;
	}
	for (extra--; extra >= 0; extra--) {
		groupSizes[extra]++;
	}
	// contruct the groups and generate the string
	let valueIndex = 0;
	let groupDamageResult = "[";
	for (let i = 0; i < groupCount; i++) {
		let groupSize = groupSizes[i];
		let group = sortedDamageValues[valueIndex]
		if (groupSize > 1) {
			group += "-" + sortedDamageValues[valueIndex + groupSize - 1];
		}
		let groupCountTotal = 0;
		// get the total number of combinations the group has
		for (let j = valueIndex; j < valueIndex + groupSize; j++) {
			groupCountTotal += damageInfo.damageMap.get(sortedDamageValues[j]);
		}
		let percent = Math.round(groupCountTotal / damageInfo.mapCombinations * 1000) / 10;
		if (percent == 0) {
			percent = "~0";
		}
		if (i != 0) {
			groupDamageResult += ", ";
		}
		groupDamageResult += group + ": " + percent + "%";
		valueIndex += groupSize;
	}
	return groupDamageResult + "]";
}

function setDamageText(result, attacker, defender, move, fieldSide, resultLocation) {
	if (!result.damage) {
		result.damageText = "Error: uninitialized damage array.";
		console.log(result.damageText);
		console.log(move.name + " from " + attacker.name + " (" + attacker.ability + ") vs. " + defender.name + " (" + defender.ability + ")");
		return;
	}
	let moveHits = move.hits ? move.hits : 1;

	// mainDamageInfo contains the damage map of all moveHits number of hits. Resist berry is not applied
	// firstHit is the same as mainDamageInfo, but with resist berry applied if applicable. On multi hit moves the berry only applies to the first strike of the multihit.
	// firstHit is the basis for the ranges and percentages displayed for the user, and is the same as mainDamageInfo if there is no resist berry.
	let mainDamageInfo = DamageInfo(result, moveHits);
	let firstHitDamageInfo = result.firstHitDamage ? DamageInfo(result, moveHits, true) : mainDamageInfo;

	let minPercent = Math.round(firstHitDamageInfo.min * 1000 / defender.maxHP) / 10;
	let maxPercent = Math.round(firstHitDamageInfo.max * 1000 / defender.maxHP) / 10;
	result.damageText = firstHitDamageInfo.min + "-" + firstHitDamageInfo.max + " (" + minPercent + " - " + maxPercent + "%)";
	if (move.bp === 0) {
		result.koChanceText = "nice move";
	} else if (move.isMLG && firstHitDamageInfo.min != 0) {
		result.koChanceText = "<a href = 'https://www.youtube.com/watch?v=iD92h-M474g'>it's a one-hit KO!</a>";
	} else if (move.noKOChance) {
		result.koChanceText = "";
		result.noKOChance = true;
	} else {
		setKOChanceText(result, move, moveHits, attacker, defender, fieldSide, mainDamageInfo, firstHitDamageInfo);
	}
	// put together the primary hit information based on the first hit map
	setUpDamageRangeText(result, moveHits, mainDamageInfo, firstHitDamageInfo);
	setUpRecoilRecoveryText(result, attacker, defender, move, firstHitDamageInfo.min, firstHitDamageInfo.max);
	if (result.koChanceText.includes("OHKO")) {
		// don't remove "first strike only" text from the description
		// it's both difficult to determine when it needs to be removed and comes up very rarely
		result.description = result.description.replaceAll(FIRST_HIT_ONLY_TEXT, "").replaceAll(FIRST_ATTACK_ONLY_TEXT, "");
	}
	let damageText = minPercent + " - " + maxPercent + "%";
	// intentionally does not display both recoil and recovery text on the same line
	if (result.recoilPercent) {
		damageText += " (" + result.recoilPercent + "% " + result.recoilType + " damage)";
	} else if (result.recoveryPercent) {
		damageText += " (recovers " + result.recoveryPercent + "%)";
	}
	$(resultLocation.move + " + label").text(move.name.replace("Hidden Power", "HP"));
	$(resultLocation.damage).text(damageText);
	/*if (maxPercent > highestMaxPercent) {
		highestMaxPercent = maxPercent;
		bestResult = $(resultLocations[1][i].move);
	}*/
}

function setUpDamageRangeText(result, moveHits, mainDamageInfo, firstHitDamageInfo) {
	if (!mainDamageInfo.damageMap) {
		return;
	}

	if (firstHitDamageInfo.mapCombinations > MAX_UNGROUPED_COUNT) {
		result.multiHitPercents = moveHits + " hits: " + damageMapAsGroups(firstHitDamageInfo);
		if (result.firstHitDamage && !(result.koChanceText && result.koChanceText.endsWith("OHKO"))) {
			result.multiHitPercents = "First attack " + result.multiHitPercents +
				"<br />Other attacks " + moveHits + " hits: " + damageMapAsGroups(mainDamageInfo);
		}
	}

	if (result.childDamage) {
		result.hitDamageValues = "(First hit: " + (result.firstHitDamage ? result.firstHitDamage : result.damage).join(", ") +
		"; Second hit: " + result.childDamage.join(", ") + ")";
		if (result.firstHitDamage) {
			result.hitDamageValues += "; Other parent hits: (" + result.damage.join(", ") + ")";
		}
	} else if (result.tripleAxelDamage) {
		let damageArrays = result.teraShellDamage ? result.teraShellDamage : result.tripleAxelDamage;
		result.hitDamageValues = "(First hit: " + (result.firstHitDamage ? result.firstHitDamage : damageArrays[0]).join(", ") +
		"; Second hit: " + damageArrays[1].join(", ") +
		(moveHits > 2 ? "; Third hit: " + damageArrays[2].join(", ") : "") + ")";
	} else if (result.firstHitDamage) {
		let qualifier = "hit";
		let firstQualifier = qualifier;
		if (moveHits > 1 && (result.teraShellDamage || result.isFirstAttack)) {
			qualifier = "attack " + qualifier;
			firstQualifier = qualifier + "s";
		}
		result.hitDamageValues = "(First " + firstQualifier + ": " + result.firstHitDamage.join(", ") +
			"; Other " + qualifier + "s: " + result.damage.join(", ") + ")";
	} else {
		result.hitDamageValues = "(" + result.damage.join(", ") + ")";
	}
}

function setUpRecoilRecoveryText(result, attacker, defender, move, minDamage, maxDamage) {
	let minRecoilDamage, maxRecoilDamage;
	let atkMaxHP = attacker.maxHP;
	let defCurHP = defender.curHP;
	let defMaxHP = defender.maxHP;
	// percentage-based recoil and healing use normal rounding for their final value in gens 5+.
	let roundFunction = gen <= 4 ? x => Math.floor(x) : x => Math.round(x);
	if (attacker.ability === "Magic Guard" && !isNeutralizingGas) {
		// no recoil
	} else if (typeof move.hasRecoil === "number" && minDamage > 0 && ((attacker.ability !== "Rock Head" || isNeutralizingGas) || move.name === "Struggle")) {
		result.recoilType = "recoil";
		// Parental Bond adds the damage values into a total and then applies the recoil value, so this is fine
		minRecoilDamage = Math.max(roundFunction(Math.min(minDamage, defCurHP) * move.hasRecoil), 1);
		maxRecoilDamage = Math.max(roundFunction(Math.min(maxDamage, defCurHP) * move.hasRecoil), 1);
		result.recoilRange = minRecoilDamage;
		result.recoilPercent = Math.round(minRecoilDamage * 1000 / atkMaxHP) / 10;
		if (minRecoilDamage != maxRecoilDamage) {
			result.recoilRange += "-" + maxRecoilDamage;
			result.recoilPercent += " - " + (Math.round(maxRecoilDamage * 1000 / atkMaxHP) / 10);
		}
	} else if (move.hasRecoil === "crash") {
		result.recoilType = "potential crash";
		if (gen > 3) {
			minRecoilDamage = Math.max(Math.floor((gen == 4 ? defMaxHP : atkMaxHP) / 2), 1); // this should always floor
			result.recoilRange = minRecoilDamage;
			result.recoilPercent = Math.round(minRecoilDamage * 1000 / atkMaxHP) / 10;
		} else if (gen == 3 && !(result.damage.length == 1 && result.damage[0] == 0)) { // no recoil damage from an immunity
			minRecoilDamage = Math.min(Math.max(Math.floor(minDamage / 2), 1), Math.floor(defMaxHP / 2));
			maxRecoilDamage = Math.min(Math.max(Math.floor(maxDamage / 2), 1), Math.floor(defMaxHP / 2));
			result.recoilRange = minRecoilDamage;
			result.recoilPercent = Math.round(minRecoilDamage * 1000 / atkMaxHP) / 10;
			if (minRecoilDamage != maxRecoilDamage) {
				result.recoilRange += "-" + maxRecoilDamage;
				result.recoilPercent += " - " + (Math.round(maxRecoilDamage * 1000 / atkMaxHP) / 10);
			}
		}
	} else if (move.hasRecoil === "Struggle" && minDamage > 0) { // in gen 3 Struggle's recoil is percentage-based so its hasRecoil property is a number
		result.recoilType = move.hasRecoil;
		result.recoilRange = Math.max(roundFunction(atkMaxHP / 4), 1);
		result.recoilPercent = Math.round(result.recoilRange * 1000 / atkMaxHP) / 10;
	} else if (move.hasRecoil === true) {
		// currently if a move has its hasRecoil property simply set to true instead of a string or a number, it means recoil of 50% attacker's max HP
		result.recoilType = "recoil";
		result.recoilRange = Math.ceil(atkMaxHP / 2);
		result.recoilPercent = Math.round(result.recoilRange * 1000 / atkMaxHP) / 10;
	}

	let minHealthRecovered = 0;
	let maxHealthRecovered = 0;
	if (move.percentHealed) {
		let healingMultiplier = move.percentHealed * (attacker.item === "Big Root" ? 1.3 : 1);
		if (result.childDamage) {
			// unnecessarily messy solution just to account for Parental Bond healing after each hit
			let minParentDamage = result.damage[0];
			let maxParentDamage = result.damage[result.damage.length - 1];
			let minChildDamage = result.childDamage[0];
			let maxChildDamage = result.childDamage[result.childDamage.length - 1];
			// get min recovery
			if (maxParentDamage >= defCurHP) {
				// edge case where the parent hit can fully KO the defender - basically assume that the child always cinches the KO
				minHealthRecovered = Math.round(defCurHP * healingMultiplier);
			} else {
				minHealthRecovered = Math.round(minParentDamage * healingMultiplier) + Math.round(Math.min(minChildDamage, defCurHP - minParentDamage) * healingMultiplier);
			}
			// get max recovery
			let highestOddParent = 0;
			if (defCurHP % 2 == 0) {
				// edge case where hitting optimal damage rolls to KO an even-HP defender maximizes recovery due to recovery values using normal rounding
				let highestOddParent = maxParentDamage;
				for (let i = result.damage.length - 2; highestOddParent % 2 == 1 && i >= 0; i--) {
					highestOddParent = result.damage[i];
				}
			}
			if (highestOddParent % 2 == 1 && highestOddParent + maxChildDamage >= defCurHP) {
				maxHealthRecovered = Math.round(defCurHP * healingMultiplier) + 1;
			} else {
				maxHealthRecovered = Math.round(Math.min(maxParentDamage, defCurHP) * healingMultiplier);
				if (maxParentDamage < defCurHP) {
					maxHealthRecovered += Math.round(Math.min(maxChildDamage, defCurHP - maxParentDamage) * healingMultiplier);
				}
			}
		} else {
			minHealthRecovered = roundFunction(Math.min(minDamage, defCurHP) * healingMultiplier);
			maxHealthRecovered = roundFunction(Math.min(maxDamage, defCurHP) * healingMultiplier);
		}

		if (minDamage > 0) {
			minHealthRecovered = Math.max(minHealthRecovered, 1);
			maxHealthRecovered = Math.max(maxHealthRecovered, 1);
		}

		if (defender.ability === "Liquid Ooze" && !isNeutralizingGas && attacker.ability !== "Magic Guard") {
			result.recoilType = defender.ability;
			result.recoilRange = minHealthRecovered;
			result.recoilPercent = Math.round(minHealthRecovered * 1000 / atkMaxHP) / 10;
			if (minHealthRecovered != maxHealthRecovered) {
				result.recoilRange += "-" + maxHealthRecovered;
				result.recoilPercent += " - " + (Math.round(maxHealthRecovered * 1000 / atkMaxHP) / 10);
			}
			minHealthRecovered = 0;
			maxHealthRecovered = 0;
		}
	}
	if (minDamage > 0 && (
		attacker.item === "Shell Bell" && !["Future Sight", "Doom Desire"].includes(move.name) ||
		gen == 3 && defender.item === "Shell Bell" && attacker.item === "" && ["Thief", "Covet"].includes(move.name))) {
		minHealthRecovered += Math.max(Math.floor(Math.min(minDamage, defCurHP) / 8), 1); // this should always floor
		maxHealthRecovered += Math.max(Math.floor(Math.min(maxDamage, defCurHP) / 8), 1);
	}
	if (move.name === "Strength Sap" && (defender.curAbility === "Contrary" ? defender.boosts[AT] > -6 : defender.boosts[AT] < 6)) {
		minHealthRecovered = defender.stats[AT];
		maxHealthRecovered = minHealthRecovered;
	}
	if (minHealthRecovered) {
		result.recoveryRange = minHealthRecovered;
		result.recoveryPercent = Math.round(minHealthRecovered * 1000 / atkMaxHP) / 10;
		if (minHealthRecovered != maxHealthRecovered) {
			result.recoveryRange += "-" + maxHealthRecovered;
			result.recoveryPercent += " - " + Math.round(maxHealthRecovered * 1000 / atkMaxHP) / 10;
		}
	}
}

var mainResult = "";
function updateDamageText(resultMoveObj) {
	if (damageResults) {
		let result = findDamageResult(resultMoveObj);
		if (result) {
			let recoilText = result.recoilRange ? ("; " + result.recoilType + " damage: " + result.recoilRange + " (" + result.recoilPercent + "%)") : "";
			let recoveryText = result.recoveryRange ? ("; recovers " + result.recoveryRange + " (" + result.recoveryPercent + "%)") : "";
			mainResult = result.description + ": " + result.damageText + recoilText + recoveryText;
			if (!result.noKOChance) {
				let koChanceText = result.koChanceText ? (result.koChanceText + (result.afterText ? result.afterText : "")) : "Did not get koChanceText";
				mainResult += " -- " + koChanceText;
			}
			$("#mainResult").html(mainResult);
			$("#afterAcc").html(result.afterAccText ? result.afterAccText : "");
			$("#damageValues").html(result.hitDamageValues + (result.multiHitPercents ? "<br />" + result.multiHitPercents : ""));
		} else {
			mainResult = "problem with mainResult";
		}
	}
}

// Click-to-copy function (thanks DimK19, this is an excellent idea)
$("#mainResult").click(function () {
	navigator.clipboard.writeText(mainResult);
});

function findDamageResult(resultMoveObj) {
	var selector = "#" + resultMoveObj.attr("id");
	for (var i = 0; i < resultLocations.length; i++) {
		for (var j = 0; j < resultLocations[i].length; j++) {
			if (resultLocations[i][j].move === selector) {
				return damageResults[i][j];
			}
		}
	}
}

$(".mode").change(function () {
	window.location.replace('honkalculate' + linkExtension + '?mode=' + $(this).attr("id"));
});

$(document).ready(function () {
	$(".calc-trigger").bind("change keyup", calculate);
	calculate();
});

/******************/
/*  EV OPTIMIZER  */
/******************/

/*function optimizeEVs(side, mon) {
	//log(mon.rawStats)
	var basehp = ~~$(side).find(".hp .base").val();
	var baseat = ~~$(side).find(".at .base").val();
	var basedf = ~~$(side).find(".df .base").val();
	var basesa = ~~$(side).find(".sa .base").val();
	var basesd = ~~$(side).find(".sd .base").val();
	var basesp = ~~$(side).find(".sp .base").val();
	var ivshp = ~~$(side).find(".hp .ivs").val();
	var ivsat = ~~$(side).find(".at .ivs").val();
	var ivsdf = ~~$(side).find(".df .ivs").val();
	var ivssa = ~~$(side).find(".sa .ivs").val();
	var ivssd = ~~$(side).find(".sd .ivs").val();
	var ivssp = ~~$(side).find(".sp .ivs").val();
	var evshp = ~~$(side).find(".hp .evs").val();
	var evsat = ~~$(side).find(".at .evs").val();
	var evsdf = ~~$(side).find(".df .evs").val();
	var evssa = ~~$(side).find(".sa .evs").val();
	var evssd = ~~$(side).find(".sd .evs").val();
	var evssp = ~~$(side).find(".sp .evs").val();
	var nature = NATURES[mon.nature];
	var level = ~~mon.level;
	var natureVals = ["1", "1", "1", "1", "1"];
	console.log(nature)
	var hp0 = Math.floor((basehp * 2 + ivshp + Math.floor(evshp / 4)) * level / 100) + level + 10;
	var at0 = Math.floor((Math.floor((baseat * 2 + ivsat + Math.floor(evsat / 4)) * level / 100) + 5) * natureVals[0]);
	var df0 = Math.floor((Math.floor((basedf * 2 + ivsdf + Math.floor(evsdf / 4)) * level / 100) + 5) * natureVals[1]);
	var sa0 = Math.floor((Math.floor((basesa * 2 + ivssa + Math.floor(evssa / 4)) * level / 100) + 5) * natureVals[2]);
	var sd0 = Math.floor((Math.floor((basesd * 2 + ivssd + Math.floor(evssd / 4)) * level / 100) + 5) * natureVals[3]);
	var sp0 = Math.floor((Math.floor((basesp * 2 + ivssp + Math.floor(evssp / 4)) * level / 100) + 5) * natureVals[4]);
	switch (nature[0]) {
		case "at":
		natureVals[0] = 1.1;
		break;
		case "df":
		natureVals[1] = 1.1;
		break;
	}
	console.log(hp);
	console.log(at);
	console.log(df);
	console.log(sa);
	console.log(sd);
	console.log(sp);
}*/