// input field validation
var bounds = {
	"level": [1, 100],
	"autolevel-box": [1, 100],
	"autoivs-box": [0, 31],
	"base": [1, 255],
	"evs": [0, 252],
	"ivs": [0, 31],
	"dvs": [0, 15],
	"move-bp": [0, 999],
	"current-happiness": [0, 255]
};
for (var bounded in bounds) {
	if (bounds.hasOwnProperty(bounded)) {
		attachValidation(bounded, bounds[bounded][0], bounds[bounded][1]);
	}
}
function attachValidation(clazz, min, max) {
	$("." + clazz).keyup(function () {
		validate($(this), min, max);
	});
}
function validate(obj, min, max) {
	obj.val(Math.max(min, Math.min(max, ~~obj.val())));
}

$(".max").bind("keyup change", function () {
	var poke = $(this).closest(".poke-info");
	calcHP(poke);
	calcStats(poke);
});

$(".max-level").bind("keyup change", function () {
	var poke = $(this).closest(".poke-info");
	calcHP(poke);
	calcStats(poke);
});

$("#maxL").change(function () {
	applyMaxMoveProperty("L", this.checked);
});

function applyMaxMoveProperty(side, isChecked) {
	for (let i = 1; i <= 4; i++) {
		$("#max" + side + i).prop("checked", isChecked);
	}
}

$("#wpL").change(function () {
	applyWeaknessPolicy(1, !this.checked);
});

$("#clangL").change(function () {
	applyOmniboost(1, 1, !this.checked);
});

$("#evoL").change(function () {
	applyOmniboost(1, 2, !this.checked);
});

$(".tera").bind("keyup change", function () {
	if (gen != 9) {
		return;
	}
	let pokeInfo = $(this).closest(".poke-info");
	let setName = pokeInfo.find("input.set-selector").val(); // speciesName (setName)
	let pokeName = setName.substring(0, setName.indexOf(" ("));
	let abilityObj = pokeInfo.find(".ability");
	if ($(this).prop("checked")) {
		if (pokeName.startsWith("Ogerpon")) {
			abilityObj.val("Embody Aspect");
			abilityObj.change();
		} else if (pokeName == "Terapagos-Terastal") {
			pokeInfo.find(".forme").val("Terapagos-Stellar");
			pokeInfo.find(".forme").change();
		}
		let teraType = pokeInfo.find(".tera-type").val();
		if (teraType === "Stellar") {
			return; // do not change typing for Stellar tera type
		}
		pokeInfo.find(".type1").val(teraType);
		pokeInfo.find(".type2").val("");
	} else {
		let dexEntry = pokedex[pokeName];
		let formeName = pokeInfo.find(".forme").val();
		if (dexEntry.formes && formeName) {
			dexEntry = pokedex[formeName];
		}
		if (pokeName.startsWith("Ogerpon")) {
			abilityObj.val(dexEntry.abilities[0]);
			abilityObj.change();
		} else if (formeName == "Terapagos-Stellar") {
			pokeInfo.find(".forme").val("Terapagos-Terastal");
			pokeInfo.find(".forme").change();
		}
		if (pokeInfo.find(".tera-type").val() === "Stellar") {
			return; // do not change typing for Stellar tera type
		}
		pokeInfo.find(".type1").val(dexEntry.t1);
		pokeInfo.find(".type2").val(dexEntry.t2 ? dexEntry.t2 : "");
	}
});

$(".tera-type").bind("keyup change", function () {
	if (gen != 9) {
		return;
	}
	let pokeInfo = $(this).closest(".poke-info");
	if (!pokeInfo.find(".tera").prop("checked")) {
		return;
	}
	// the tera type changed while terastallized, so update the current typing
	let teraType = $(this).val();
	let type1 = teraType;
	let type2 = "";
	if (teraType === "Stellar") {
		let setName = pokeInfo.find("input.set-selector").val(); // speciesName (setName)
		let pokeName = setName.substring(0, setName.indexOf(" ("));
		let dexEntry = pokedex[pokeName];
		let formeName = pokeInfo.find(".forme").val();
		if (dexEntry.formes && formeName) {
			dexEntry = pokedex[formeName];
		}
		type1 = dexEntry.t1;
		type2 = dexEntry.t2 ? dexEntry.t2 : "";
	} else {
		type1 = teraType;
		type2 = "";
	}
	pokeInfo.find(".type1").val(type1);
	pokeInfo.find(".type2").val(type2);
});

$("#autolevel").change(function () {
	// auto-calc stats and current HP on change
	let autoLevel = $(gen == 3 || gen == 4 ? "#autolevel-box" : "input:radio[name='autolevel-btn']:checked").val();
	let p1 = $("#p1");
	let p2 = $("#p2");
	if (gen == 4) {
		// for gen 4 only, due to Hall mechanics, changes to the autolevel should not affect the pokemon if it's a custom set
		if (!isCustomSet(p1.find("input.set-selector").val())) {
			p1.find(".level").val(autoLevel);
		}
		let p2Name = p2.find("input.set-selector").val();
		if (p2Name) {
			if (!isCustomSet(p2Name)) {
				p2.find(".level").val(autoLevel);
			}
		}
	} else {
		p1.find(".level").val(autoLevel);
		p2.find(".level").val(autoLevel);
	}
	$(".level").change();
	localStorage.setItem(LOCAL_AUTOLEVEL_KEY_PREFIX + gameId, autoLevel);
});

$("#autoivs-center").change(function () {
	// gens 3 and 4 use an input box instead of a dropdown. gen 7 was the last gen to scale IVs
	if (gen <= 4 || gen >= 8) {
		return;
	}
	// do not set the IVs of non-AI sets
	let p1 = $("#p1");
	if (!isCustomSet(p1.find("input.set-selector").val())) {
		setIVSelectors(p1, "L");
	}
	let p2 = $("#p2");
	if (!isCustomSet(p2.find("input.set-selector").val())) {
		setIVSelectors(p2, "R");
	}
});

$("#autoivsL").change(function () {
	if (gen != 3 && gen != 4) {
		return;
	}
	setIVSelectors($("#p1"), "L");
});

function setIVSelectors(poke, side) {
	if (!poke) {
		return;
	}

	let autoIVs = getAutoIVValue(side);

	poke.find(".hp .ivs").val(autoIVs);
	for (i = 0; i < STATS.length; i++) {
		poke.find("." + STATS[i] + " .ivs").val(autoIVs);
	}
	calcHP(poke);
	calcStats(poke);
}

function getAutoIVValue(side) {
	let autoIVs;
	if (gen == 3) {
		autoIVs = parseInt($("#autoivs" + side + " #autoivs-select").find(":selected").val());
	} else if (gen == 4) {
		autoIVs = parseInt($("#autoivs" + side + " #autoivs-box").val());
	} else if (gen <= 7) {
		autoIVs = parseInt($('#autoivs-center #autoivs-select').find(":selected").val());
	}
	if (isNaN(autoIVs)) {
		return 31;
	}
	return autoIVs;
}

function isCustomSet(pokeName) {
	// pokeName should be the name as displayed in the sets list: speciesName (setName)
	if (typeof pokeName != "string") {
		return false;
	}
	let setName = pokeName.substring(pokeName.indexOf("(") + 1, pokeName.length - 1);
	let speciesSets = SETDEX_CUSTOM[pokeName.substring(0, pokeName.indexOf(" ("))];
	return speciesSets !== undefined && setName in speciesSets;
}

$("#format").change(function () {
	localStorage.setItem("selectedFormat", $("input:radio[name='format']:checked").val().toLowerCase());
	autoSetMultiHits($("#p1"));
	let p2 = $("#p2");
	if (p2) {
		autoSetMultiHits(p2);
		calculate();
	}
});

$(".level").bind("keyup change", function () {
	let poke = $(this).closest(".poke-info");
	calcHP(poke);
	calcStats(poke);
});
$(".nature").bind("keyup keydown click change", function () {
	calcStats($(this).closest(".poke-info"));
});
$(".hp .base, .hp .evs, .hp .ivs, .current-happiness").bind("keyup keydown click change", function () {
	calcHP($(this).closest(".poke-info"));
});
$(".at .base, .at .evs, .at .ivs, .current-happiness").bind("keyup keydown click change", function () {
	calcStat($(this).closest(".poke-info"), "at");
});
$(".df .base, .df .evs, .df .ivs, .current-happiness").bind("keyup keydown click change", function () {
	calcStat($(this).closest(".poke-info"), "df");
});
$(".sa .base, .sa .evs, .sa .ivs, .current-happiness").bind("keyup keydown click change", function () {
	calcStat($(this).closest(".poke-info"), "sa");
});
$(".sd .base, .sd .evs, .sd .ivs, .current-happiness").bind("keyup keydown click change", function () {
	calcStat($(this).closest(".poke-info"), "sd");
});
$(".sp .base, .sp .evs, .sp .ivs, .current-happiness").bind("keyup keydown click change", function () {
	calcStat($(this).closest(".poke-info"), "sp");
});
$(".evs").bind("keyup keydown click change", function () {
	calcEvTotal($(this).closest(".poke-info"));
});

function calcStats(poke) {
	for (var i = 0; i < STATS.length; i++) {
		calcStat(poke, STATS[i]);
	}
}

function calcEvTotal(poke) {
	var total = 0;
	poke.find(".evs").each(function (idx, elt) { total += 1 * $(elt).val(); });

	var newClass = total > 510 ? "overLimit" : "underLimit";

	var evTotal = poke.find(".ev-total");
	evTotal.removeClass("underLimit overLimit").text(total).addClass(newClass);
}

function calcCurrentHP(poke, max, percent) {
	var current = Math.ceil(percent * max / 100);
	poke.find(".current-hp").val(current);
}
function calcPercentHP(poke, max, current) {
	var percent = Math.floor(100 * current / max);
	poke.find(".percent-hp").val(percent);
}
$(".current-hp").keyup(function () {
	var max = $(this).parent().children(".max-hp").text();
	validate($(this), 0, max);
	var current = $(this).val();
	calcPercentHP($(this).parent(), max, current);
});
$(".percent-hp").keyup(function () {
	var max = $(this).parent().children(".max-hp").text();
	validate($(this), 0, 100);
	var percent = $(this).val();
	calcCurrentHP($(this).parent(), max, percent);
});

var lastAura = [false, false, false];
var isNeutralizingGas = false;
$(".ability").bind("keyup change", function () {
	autoSetMultiHits($(this).closest(".poke-info"));
	autoSetAura();
});

$("#p1 .ability").bind("change", function () {
	abilityChange($(this), 1);
});

function abilityChange(abilityObj, pokeNum) {
	let pokeIndex = pokeNum - 1;
	let side = pokeNum === 1 ? "L" : "R";
	let opponentIndex = pokeNum === 1 ? 1 : 0;

	let ability = abilityObj.val();
	autoSetWeatherTerrain(curAbilities[pokeIndex], ability, curAbilities[opponentIndex]);
	if (abilityObj.siblings(".isActivated").prop("checked")) {
		// so long as all applyActivatedStatAbilities() abilities default to an unchecked box, this will work
		// undo any activated stat abilities
		applyActivatedStatAbilities(curAbilities[pokeIndex], "", pokeNum);
	}
	applyStatAbilities(curAbilities[pokeIndex], ability, pokeNum);
	curAbilities[pokeIndex] = ability;
	autoSetVicStar(ability, side);
	autoSetSteely(ability, side);
	autoSetRuin(ability, side);
	showActivated(ability, pokeNum);
	checkNeutralizingGas();
}

$("#p1 .isActivated").bind("change", function () {
	isActivatedChange($(this), 1);
});

function isActivatedChange(isActivatedObj, pokeNum) {
	let ability = isActivatedObj.siblings(".ability").val();
	if (ability === "Rivalry") {
		rivalryStateTransitions(isActivatedObj, pokeNum);
	}
	applyActivatedStatAbilities("", ability, pokeNum); // passing in "" as oldAbility will allow the subfunctions to always run
	if (ability in checkboxAbilities) {
		calculate();
	}
}

var rivalryState = [0, 0]; // 0 = unchecked, 1 = checked, 2 = indeterminate
function rivalryStateTransitions(checkboxObj, pokeNum) {
	let pokeIndex = pokeNum - 1;
	rivalryState[pokeIndex] = (rivalryState[pokeIndex] + 1) % 3;
	if (rivalryState[pokeIndex] == 0) {
		checkboxObj.prop("checked", false);
		checkboxObj.prop("indeterminate", false);
	} else if (rivalryState[pokeIndex] == 1) {
		checkboxObj.prop("checked", true);
		checkboxObj.prop("indeterminate", false);
	} else if (rivalryState[pokeIndex] == 2) {
		checkboxObj.prop("checked", false);
		checkboxObj.prop("indeterminate", true);
	}
}

function autoSetAura() {
	var ability1 = $("#p1 .ability").val();
	var ability2 = $("#p2 .ability").val();
	if (!isNeutralizingGas && (ability1 == "Fairy Aura" || ability2 == "Fairy Aura"))
		$("input:checkbox[id='fairy-aura']").prop("checked", true);
	else
		$("input:checkbox[id='fairy-aura']").prop("checked", lastAura[0]);
	if (!isNeutralizingGas && (ability1 == "Dark Aura" || ability2 == "Dark Aura"))
		$("input:checkbox[id='dark-aura']").prop("checked", true);
	else
		$("input:checkbox[id='dark-aura']").prop("checked", lastAura[1]);
	if (!isNeutralizingGas && (ability1 == "Aura Break" || ability2 == "Aura Break"))
		$("input:checkbox[id='aura-break']").prop("checked", true);
	else
		$("input:checkbox[id='aura-break']").prop("checked", lastAura[2]);
}

function autoSetVicStar(ability, side) {
	$("input:checkbox[id='vicStar" + side + "']").prop("checked", (!isNeutralizingGas && ability === "Victory Star"));
}

// Whenever a pokemon changes ( $(".set-selector").bind("change"... ), the corresponding curAbilities entry is reset to empty string
// However, it does NOT reset the ability for weather/terrain abilities so that weather/terrain logic works
var curAbilities = ["", ""];
var curTerrain = "";
var curItems = ["", ""];
var manuallySetWeather = "";
var manuallySetTerrain = "";

$("input:radio[name='weather']").change(function () {
	manuallySetWeather = $(this).val();
});

$("input:radio[name='terrain']").change(function () {
	manuallySetTerrain = $(this).val();
	terrainChange(manuallySetTerrain);
});

function terrainChange(newTerrain) {
	applySeeds(curItems[0], curItems[0], curTerrain, newTerrain, 1);
	applySeeds(curItems[1], curItems[1], curTerrain, newTerrain, 2);
	curTerrain = newTerrain;
}

function autoWeatherAbilities(ability) {
	switch (ability) {
	case "Drought":
	case "Orichalcum Pulse":
		return "Sun";
	case "Drizzle":
		return "Rain";
	case "Sand Stream":
		return "Sand";
	case "Snow Warning":
		return gen <= 8 ? "Hail" : "Snow";
	case "Desolate Land":
		return "Harsh Sun";
	case "Primordial Sea":
		return "Heavy Rain";
	case "Delta Stream":
		return "Strong Winds";
	default:
		return "";
	}
}
var strongWeatherAbilities = {
	"Desolate Land": "Harsh Sun",
	"Primordial Sea": "Heavy Rain",
	"Delta Stream": "Strong Winds",
};
function autoTerrainAbilities(ability) {
	switch (ability) {
	case "Electric Surge":
	case "Hadron Engine":
		return "Electric";
	case "Grassy Surge":
		return "Grassy";
	case "Misty Surge":
		return "Misty";
	case "Psychic Surge":
		return "Psychic";
	default:
		return "";
	}
}

function autoSetWeatherTerrain(currentAbility, newAbility, opponentAbility) {
	setNewFieldEffect("weather", currentAbility, newAbility, opponentAbility, manuallySetWeather, autoWeatherAbilities);
	let newTerrain = setNewFieldEffect("terrain", currentAbility, newAbility, opponentAbility, manuallySetTerrain, autoTerrainAbilities);
	if (currentAbility !== newAbility && curTerrain !== newTerrain && (curTerrain || newTerrain)) {
		terrainChange(newTerrain);
	}
}

function setNewFieldEffect(effectType, currentAbility, newAbility, opponentAbility, manuallySetEffect, effectAbilities) {
	let currentEffect = $("input:radio[name='" + effectType + "']:checked").val();
	let newEffect = manuallySetEffect;
	let newAbilityEffect = effectAbilities(newAbility);
	// check if setting a new effect
	if (newAbilityEffect !== "") {
		if (!(newAbility in strongWeatherAbilities) &&
			Object.values(strongWeatherAbilities).includes(currentEffect) && !(currentAbility in strongWeatherAbilities)) {
			return;
		}
		newEffect = newAbilityEffect;
	}
	// check if need to switch to the opponent's effect
	else if (effectAbilities(currentAbility) !== currentEffect) {
		// don't change to the opponent's effect if this mon's old ability doesn't match the current effect
		return;
	} else if (effectAbilities(opponentAbility)) {
		newEffect = effectAbilities(opponentAbility);
	}

	$("input:radio[name='" + effectType + "'][value='" + newEffect + "']").prop("checked", true);
	return newEffect;
}

$("#p1 .item").bind("keyup change", function () {
	itemChange($(this).val(), 1);
});

function itemChange(item, pokeNum) {
	let pokeIndex = pokeNum - 1;
	let pid = "#p" + pokeNum;

	autosetStatus(pid, item);
	autoSetMultiHits($(pid));
	applySeeds(curItems[pokeIndex], item, curTerrain, curTerrain, pokeNum);
	curItems[pokeIndex] = item;
}

var lastManualStatus = {"#p1": "Healthy", "#p2": "Healthy"};
var lastAutoStatus = {"#p1": "Healthy", "#p2": "Healthy"};
function autosetStatus(p, item) {
	var currentStatus = $(p + " .status").val();
	if (currentStatus !== lastAutoStatus[p]) {
		lastManualStatus[p] = currentStatus;
	}
	if (item === "Flame Orb") {
		lastAutoStatus[p] = "Burned";
		$(p + " .status").val("Burned");
		$(p + " .status").change();
	} else if (item === "Toxic Orb") {
		lastAutoStatus[p] = "Badly Poisoned";
		$(p + " .status").val("Badly Poisoned");
		$(p + " .status").change();
	} else {
		lastAutoStatus[p] = "Healthy";
		if (currentStatus !== lastManualStatus[p]) {
			$(p + " .status").val(lastManualStatus[p]);
			$(p + " .status").change();
		}
	}
}

function autoSetSteely(ability, side) {
	$("input:checkbox[id='steelySpirit" + side + "']").prop("checked", (!isNeutralizingGas && ability === "Steely Spirit"));
}

// each ability can independently initialize as checked or unchecked in each calc mode
var checkboxAbilities = {
	"Analytic": { ap: true, mass: true },
	"Intimidate": { ap: false, mass: true },
	"Download": { ap: false, mass: true },
	"Rivalry": { ap: false, mass: false },
	"Flash Fire": { ap: false, mass: false },
	"Plus": { ap: false, mass: false },
	"Minus": { ap: false, mass: false },
	"Electromorphosis": { ap: false, mass: false },
	"Wind Power": { ap: false, mass: false },
	"Marvel Scale": { ap: false, mass: false },
	"Guts": { ap: false, mass: false },
	"Quick Feet": { ap: false, mass: false },
	"Overgrow": { ap: false, mass: false },
	"Blaze": { ap: false, mass: false },
	"Torrent": { ap: false, mass: false },
	"Swarm": { ap: false, mass: false },
	"Slow Start": { ap: true, mass: true },
	"Defeatist": { ap: false, mass: false },
	"Unburden": { ap: false, mass: false }
};

// Based on input ability, show or hide the activated checkbox. Also use checkboxAbilities to initialize the checkbox state
function showActivated(ability, sideNum) {
	let activatedObj = $("#p" + sideNum + " .isActivated");
	activatedObj.prop("indeterminate", false);
	rivalryState[sideNum - 1] = 0;
	if (ability in checkboxAbilities) {
		activatedObj.prop("checked", checkboxAbilities[ability].ap);
		activatedObj.show();
	} else {
		activatedObj.prop("checked", false);
		activatedObj.hide();
	}
}

function applyActivatedStatAbilities(oldAbility, newAbility, pokeNum) {
	applyIntimidate(oldAbility, newAbility, pokeNum);
	applyDownload(oldAbility, newAbility, pokeNum);
}

function applyIntimidate(oldAbility, newAbility, intimidatePokeNum) {
	// since Intimidate has to be explicitly applied via the checkbox, no interaction with N Gas
	if ((newAbility !== "Intimidate" && oldAbility !== "Intimidate") ||
		newAbility === oldAbility) {
		return;
	}

	let fieldAbilities = $(".ability");
	if (fieldAbilities.length < 2) {
		return; // don't try to do the following in mass calc mode
	}
	let targetIndex = intimidatePokeNum === 1 ? 1 : 0; // intimidatePokeNum is the side (1 or 2) of the Intimidator; get the index of the opponent's side

	let targetAbility = fieldAbilities[targetIndex].value;
	// if an active Intimidate is deactivated, reverse the effect of Intimidate that was previously applied
	let undoIntimidate = !$(".isActivated")[intimidatePokeNum - 1].checked || (oldAbility === "Intimidate" && newAbility !== "Intimidate");
	resolveIntimidate(targetAbility, $(".item")[targetIndex].value, (targetPoke, stat, stageChange) => {
		let affectedPokeNum;
		if (targetPoke === "target") {
			affectedPokeNum = intimidatePokeNum === 1 ? 2 : 1;
		} else if (targetPoke === "source") {
			affectedPokeNum = intimidatePokeNum;
		} else {
			console.log("bad targetPoke: " + targetPoke);
			return;
		}
		if (stageChange < 0 && ["Clear Amulet", "White Herb"].includes($(".item")[targetIndex].value)) {
			return;
		}
		applyBoostChange(affectedPokeNum, stat, undoIntimidate ? -stageChange : stageChange);
	});
}

var appliedDownloadStat = ["", ""];
function applyDownload(oldAbility, newAbility, pokeNum) {
	// since Download has to be explicitly applied via the checkbox, no interaction with N Gas
	if ((newAbility !== "Download" && oldAbility !== "Download") ||
		newAbility === oldAbility ||
		!$('#p2').length) { // check whether this is mass calc mode
		return;
	}

	let downloaderIndex = pokeNum - 1;
	let opponentIndex = downloaderIndex === 0 ? 1 : 0;
	// if an active Download is deactivated, reverse the effect of Download that was previously applied
	let undoEffect = !$(".isActivated")[downloaderIndex].checked || (oldAbility === "Download" && newAbility !== "Download");
	if (undoEffect) {
		// if undoing the effect, undo the stat that was previously applied (not based on the current opponent stats)
		applyBoostChange(pokeNum, appliedDownloadStat[downloaderIndex], -1);
		appliedDownloadStat[downloaderIndex] = "";
	} else {
		let defense = getModifiedStat(parseInt($(".df .total")[opponentIndex].textContent), $("#p" + (opponentIndex + 1) + " .df .boost").val());
		let spDefense = getModifiedStat(parseInt($(".sd .total")[opponentIndex].textContent), $("#p" + (opponentIndex + 1) + " .sd .boost").val());
		resolveDownload(newAbility, defense, spDefense, (unused, stat, stageChange) => {
			applyBoostChange(pokeNum, stat, stageChange);
			appliedDownloadStat[downloaderIndex] = stat;
		});
	}
}

// Implemented with the assumption that abilities only ever boost 1 stat by 1 stage
// Due to the additional logic associated with them, Embody Aspect and Download are handled separately
var statAbilities = {
	"Intrepid Sword": AT,
	"Dauntless Shield": DF
}

function applyStatAbilities(oldAbility, newAbility, pokeNum) {
	if (oldAbility === newAbility) {
		return; // if ability didn't change, don't do anything
	}

	if (oldAbility in statAbilities) {
		// undo the existing effect by applying a stat drop
		resolveStatAbilities(oldAbility, (unused, stat, stageChange) => applyBoostChange(pokeNum, stat, -stageChange));
	}

	if (newAbility in statAbilities) {
		resolveStatAbilities(newAbility, (unused, stat, stageChange) => applyBoostChange(pokeNum, stat, stageChange));
	}

	applyEmbodyAspect(oldAbility, newAbility, pokeNum);
}

function applyEmbodyAspect(oldAbility, newAbility, pokeNum) {
	if ((newAbility !== "Embody Aspect" && oldAbility !== "Embody Aspect") ||
		newAbility === oldAbility) {
		return;
	}

	let pokeInfo = $("#p" + pokeNum);
	let setName = pokeInfo.find("input.set-selector").val(); // speciesName (setName)
	let pokeName = setName.substring(0, setName.indexOf(" ("));
	if (oldAbility === "Embody Aspect") {
		resolveEmbodyAspect(oldAbility, true, pokeName,
			(unused, stat, stageChange) => applyBoostChange(pokeNum, stat, -stageChange)
		);
	} else {
		resolveEmbodyAspect(newAbility, pokeInfo.find(".tera").prop("checked"), pokeName,
			(unused, stat, stageChange) => applyBoostChange(pokeNum, stat, stageChange)
		);
	}
}

function applySeeds(oldItem, newItem, oldTerrain, newTerrain, pokeNum) {
	if (oldItem === newItem && oldTerrain === newTerrain) {
		return;
	}
	// old/newStat are used to check which set of items and terrain matched to determine how to apply the stageChange
	let oldStat = getSeedStat(oldItem, oldTerrain);
	let newStat = getSeedStat(newItem, newTerrain);
	let resolvingItem;
	let resolvingTerrain;
	let undoEffect;
	if (oldStat === newStat) {
		return;
	} if (oldStat) {
		resolvingItem = oldItem;
		resolvingTerrain = oldTerrain;
		undoEffect = true;
	} else if (newStat) {
		resolvingItem = newItem;
		resolvingTerrain = newTerrain;
		undoEffect = false;
	} else {
		return;
	}
	resolveSeeds(resolvingItem, resolvingTerrain, $(".ability")[pokeNum - 1].value,
		(unused, stat, stageChange) => applyBoostChange(pokeNum, stat, undoEffect ? -stageChange : stageChange)
	);
}

function applyWeaknessPolicy(pokeNum, undoEffect) {
	resolveWeaknessPolicy($(".ability")[pokeNum - 1].value,
		(unused, stat, stageChange) => applyBoostChange(pokeNum, stat, undoEffect ? -stageChange : stageChange)
	);
}

function applyOmniboost(pokeNum, scale, undoEffect) {
	resolveOmniboost($(".ability")[pokeNum - 1].value, scale,
		(unused, stat, stageChange) => applyBoostChange(pokeNum, stat, undoEffect ? -stageChange : stageChange)
	);
}

function applyBoostChange(pokeNum, stat, stageChange) {
	let statBoostObj = $("#p" + pokeNum + " ." + stat + " .boost");
	statBoostObj.val(Math.max(-6, Math.min(6, parseInt(statBoostObj.val()) + stageChange)));
	calculate();
}

function checkNeutralizingGas() {
	let fieldAbilities = $(".ability");
	for (let i = 0; i < fieldAbilities.length; i++) {
		if (fieldAbilities[i].value === "Neutralizing Gas") {
			isNeutralizingGas = true;
			return;
		}
	}
	isNeutralizingGas = false;
}

function autoSetRuin(ability, side) {
	$("input:checkbox[id='ruinTablets" + side + "']").prop("checked", (!isNeutralizingGas && ability === "Tablets of Ruin"));
	$("input:checkbox[id='ruinVessel" + side + "']").prop("checked", (!isNeutralizingGas && ability === "Vessel of Ruin"));
	$("input:checkbox[id='ruinSword" + side + "']").prop("checked", (!isNeutralizingGas && ability === "Sword of Ruin"));
	$("input:checkbox[id='ruinBeads" + side + "']").prop("checked", (!isNeutralizingGas && ability === "Beads of Ruin"));
}

function autoSetMultiHits(pokeInfo) {
	let ability = pokeInfo.find(".ability").val();
	let item = pokeInfo.find(".item").val();
	for (let i = 1; i <= 4; i++) {
		let moveInfo = pokeInfo.find(".move" + i);
		let moveName = moveInfo.find("select.move-selector").val();
		moveInfo.children(".move-hits").val(getDefaultMultiHits(moveName, ability, item));
	}
}

const DEFAULT_MOVE_HITS = 3;
function getDefaultMultiHits(moveName, ability, item) {
	let move = moves[moveName];
	if (!move || !move.maxMultiHits) {
		return 1;
	}
	if (moveName === "Dragon Darts") {
		return $("input:radio[name='format']:checked").val().toLowerCase() === "doubles" ? 1 : move.maxMultiHits;
	}
	if (ability === "Skill Link" || ["Triple Kick", "Triple Axel", "Population Bomb"].includes(moveName)) {
		return move.maxMultiHits;
	}
	if (item === "Loaded Dice" && move.maxMultiHits >= 4) {
		return 4;
	}
	if (move.maxMultiHits < DEFAULT_MOVE_HITS) {
		return move.maxMultiHits;
	}
	return DEFAULT_MOVE_HITS;
}

$(".status").bind("keyup change", function () {
	if ($(this).val() === "Badly Poisoned") {
		$(this).siblings(".toxic-counter").show();
		$(this).siblings(".toxic-counter").val($(this).parent().siblings().find(".item").val() === "Toxic Orb" ? 0 : 1);
	} else {
		$(this).siblings(".toxic-counter").hide();
	}
});

$(".move-selector").change(function () {
	let moveName = $(this).val();
	let move = moveName in moves ? moves[moveName] : moves["(No Move)"];
	let moveGroupObj = $(this).parent();
	let pokeInfo = $(this).closest(".poke-info");
	let ability = pokeInfo.find(".ability").val();
	moveGroupObj.children(".move-bp").val(move.bp);
	moveGroupObj.children(".move-type").val(move.type);
	moveGroupObj.children(".move-cat").val(move.category);
	let forceCrit = move.alwaysCrit || (!isNeutralizingGas && ability === "Merciless" && move.category && $(".status")[pokeInfo.prop("id") == "p1" ? 1 : 0].value.endsWith("Poisoned"));
	moveGroupObj.children(".move-crit").prop("checked", forceCrit);
	let moveHits = moveGroupObj.children(".move-hits");
	moveHits.empty();
	let maxMultiHits = move.maxMultiHits;
	if (maxMultiHits && !move.isZ && !move.isMax) {
		if (moveName == "Dragon Darts") {
			moveHits.append($("<option></option>").attr("value", 1).text("1 hit"));
		}
		for(let i = 2; i <= maxMultiHits; i++) {
			moveHits.append($("<option></option>").attr("value", i).text(i + " hits"));
		}
		moveHits.show();
		moveHits.val(getDefaultMultiHits(moveName, ability, pokeInfo.find(".item").val()));
	} else {
		moveHits.hide();
	}
	moveGroupObj.children(".move-z").prop("checked", false);
	if (!($(this).closest("poke-info").find(".max").prop("checked"))) {
		moveGroupObj.children(".move-z").prop(".move-max", false);
	}
});

var oldItemNames = {
	"BlackGlasses": "Black Glasses",
	"DeepSeaScale": "Deep Sea Scale",
	"DeepSeaTooth": "Deep Sea Tooth",
	"NeverMeltIce": "Never-Melt Ice",
	"SilverPowder": "Silver Powder",
	"TwistedSpoon": "Twisted Spoon",
	"BrightPowder": "Bright Powder"
};

// auto-update set details on select
$(".set-selector").bind("change", function () {
	let fullSetName = $(this).val();
	let pokemonName = fullSetName.substring(0, fullSetName.indexOf(" ("));
	let setName = fullSetName.substring(fullSetName.indexOf("(") + 1, fullSetName.lastIndexOf(")"));
	let pokemon = pokedex[pokemonName];
	if (!pokemon) {
		console.log("error: `" + pokemonName + "` could not be found in pokedex[]");
		return;
	}
	let pokeObj = $(this).closest(".poke-info");
	let pokeObjID = pokeObj.prop("id");
	let side = pokeObjID === "p1" ? "L" : "R";

	// If the sticky move was on this side, reset it
	if (stickyMoves.getSelectedSide() === side) {
		stickyMoves.clearStickyMove();
	}

	// If the selected move was on this side, reset it
	let selectedMove = $("input:radio[name='resultMove']:checked").prop("id");
	if (selectedMove !== undefined) {
		var selectedSide = selectedMove.charAt(selectedMove.length - 2);
		if (side === "L" && selectedSide === side) {
			$("#resultMoveL1").prop("checked", true);
			$("#resultMoveL1").change();
		}
		else if (side === "R" && selectedSide === side) {
			$("#resultMoveR1").prop("checked", true);
			$("#resultMoveR1").change();
		}
	}

	pokeObj.find(".type1").val(pokemon.t1);
	pokeObj.find(".type2").val(pokemon.t2 !== undefined ? pokemon.t2 : "");
	pokeObj.find(".hp .base").val(pokemon.bs.hp);
	for (let i = 0; i < STATS.length; i++) {
		pokeObj.find("." + STATS[i] + " .base").val(pokemon.bs[STATS[i]]);
	}
	pokeObj.find(".hp").val("calcHP");
	pokeObj.find(".weight").val(pokemon.w);
	pokeObj.find(".boost").val(0);
	pokeObj.find(".percent-hp").val(100);
	pokeObj.find(".status").val("Healthy");
	$(".status").change();
	pokeObj.find(".max-level").val(10);
	pokeObj.find(".max").prop("checked", false);
	pokeObj.find(".tera-type").val(pokemon.t1); // this statement might do nothing
	pokeObj.find(".tera").prop("checked", false);
	//.change() for max and tera is below
	$("#wp" + side).prop("checked", false);
	$("#clang" + side).prop("checked", false);
	$("#evo" + side).prop("checked", false);
	let autolevelKey = LOCAL_AUTOLEVEL_KEY_PREFIX + gameId;
	var moveObj;
	var itemObj = pokeObj.find(".item");
	var abilityObj = pokeObj.find(".ability");
	var abilityList = pokemon.abilities;
	prependSpeciesAbilities(abilityList, pokeObjID, abilityObj);
	let pokeIndex = pokeObjID === "p1" ? 0 : 1;
	let oldAbility = curAbilities[pokeIndex];
	// the following works as a way to change curAbilities[] without triggering ability.change()
	// for the weather/terrain logic to work properly, leave those abilities in curAbilities[]. same goes for undoing old Intimidate
	if (!autoWeatherAbilities(oldAbility) && !autoTerrainAbilities(oldAbility) && oldAbility !== "Intimidate") {
		curAbilities[pokeIndex] = "";
	}
	curItems[pokeIndex] = ""; // clear curItem so that the undo of a held seed is not applied to this new mon
	if (pokemonName in setdexAll && setName in setdexAll[pokemonName]) {
		var set = setdexAll[pokemonName][setName];
		pokeObj.find(".level").val(set.level ? set.level : (localStorage.getItem(autolevelKey) ? parseInt(localStorage.getItem(autolevelKey)) : 50));
		let autoIVs = getAutoIVValue(side);
		pokeObj.find(".hp .evs").val(set.evs && typeof set.evs.hp !== "undefined" ? set.evs.hp : 0);
		pokeObj.find(".hp .ivs").val(set.ivs && typeof set.ivs.hp !== "undefined" ? set.ivs.hp : autoIVs);
		for (i = 0; i < STATS.length; i++) {
			pokeObj.find("." + STATS[i] + " .evs").val(set.evs && typeof set.evs[STATS[i]] !== "undefined" ? set.evs[STATS[i]] : 0);
			pokeObj.find("." + STATS[i] + " .ivs").val(set.ivs && typeof set.ivs[STATS[i]] !== "undefined" ? set.ivs[STATS[i]] : autoIVs);
		}
		setSelectValueIfValid(pokeObj.find(".nature"), set.nature, "Hardy");
		setSelectValueIfValid(abilityObj, set.ability ? set.ability : (abilityList && abilityList.length == 1 ? abilityList[0] : pokemon.ab), "");
		setSelectValueIfValid(pokeObj.find(".tera-type"), set.teraType, pokemon.t1);
		setSelectValueIfValid(itemObj, set.item && oldItemNames[set.item] ? oldItemNames[set.item] : set.item, "");
		for (i = 0; i < 4; i++) {
			moveObj = pokeObj.find(".move" + (i + 1) + " select.move-selector");
			setSelectValueIfValid(moveObj, set.moves[i], "(No Move)");
			moveObj.change();
		}
		if (gameId == 8 && pokemonName in setdex && setName in setdex[pokemonName]) {
			// all AI mons have a dynamax level of 0
			pokeObj.find(".max-level").val(0);
		}
		if (gameId == 8 && set.startDmax) {
			pokeObj.find(".max").prop("checked", true);
		} else if (gameId == 9 && set.startTera) {
			pokeObj.find(".tera").prop("checked", true);
		}
	} else {
		// Blank set
		pokeObj.find(".level").val(localStorage.getItem(autolevelKey) ? parseInt(localStorage.getItem(autolevelKey)) : 50);
		pokeObj.find(".hp .evs").val(0);
		pokeObj.find(".hp .ivs").val(31);
		for (i = 0; i < STATS.length; i++) {
			pokeObj.find("." + STATS[i] + " .evs").val(0);
			pokeObj.find("." + STATS[i] + " .ivs").val(31);
		}
		pokeObj.find(".nature").val("Hardy");
		setSelectValueIfValid(abilityObj, abilityList && abilityList.length == 1 ? abilityList[0] : pokemon.ab, "");
		if (pokemonName.startsWith("Ogerpon") && pokemonName.includes("-")) {
			pokeObj.find(".tera-type").val(pokemon.t2);
		} else if (pokemonName.startsWith("Terapagos")) {
			pokeObj.find(".tera-type").val("Stellar");
		} else {
			pokeObj.find(".tera-type").val(pokemon.t1);
		}
		itemObj.val("");
		for (i = 0; i < 4; i++) {
			moveObj = pokeObj.find(".move" + (i + 1) + " select.move-selector");
			moveObj.val("(No Move)");
			moveObj.change();
		}
	}
	pokeObj.find(".max").change();
	pokeObj.find(".tera").change();
	var formeObj = $(this).siblings().find(".forme").parent();
	itemObj.prop("disabled", false);
	if (pokemon.formes) {
		showFormes(formeObj, setName, pokemonName, pokemon);
	} else {
		formeObj.hide();
		abilityObj.change();
	}
	let opponentPokeNum = pokeIndex === 0 ? 2 : 1;
	let otherAbilityObj = $("#p" + opponentPokeNum + " .ability");
	let otherAbility = otherAbilityObj.val();
	let isOtherAbilityActivated = otherAbilityObj.siblings(".isActivated").prop("checked");
	if (otherAbility === "Intimidate" && isOtherAbilityActivated) {
		// if the opponent has active Intimidate, apply it to this new mon
		applyIntimidate("", otherAbility, opponentPokeNum);
	} else if (otherAbility === "Download" && isOtherAbilityActivated) {
		// run the function once to remove the old Download stat stage then run it again to apply the correct stat stage
		applyDownload(otherAbility, "", opponentPokeNum);
		applyDownload("", otherAbility, opponentPokeNum);
	}
	calcHP(pokeObj);
	calcStats(pokeObj);
	calcEvTotal(pokeObj);
	itemObj.change();
});

var p1AbilityCount = 0;
var p2AbilityCount = 0;
function prependSpeciesAbilities(abilityList, pokeObjID, abilityObj) {
	for (let i = pokeObjID === "p1" ? p1AbilityCount : p2AbilityCount; i > 0; i--) {
		abilityObj.children("option").eq(1).remove();
	}
	if (abilityList) {
		let abListObj = abilityObj.children("option");
		abilityList.forEach(ab => abListObj.eq(1).before($('<option></option>').val(ab).text(ab)));
		if (pokeObjID === "p1") {
			p1AbilityCount = abilityList.length;
		} else {
			p2AbilityCount = abilityList.length;
		}
	} else {
		if (pokeObjID === "p1") {
			p1AbilityCount = 0;
		} else {
			p2AbilityCount = 0;
		}
	}
}

function showFormes(formeObj, setName, pokemonName, pokemon) {
	let formeOptions = getSelectOptions(pokemon.formes, false, getFormeNum(setName, pokemonName));
	formeObj.children("select").find("option").remove().end().append(formeOptions).change();
	formeObj.show();
}

const BLANK_SET = "Blank Set";
function getFormeNum(setName, pokemonName) {
	if (setName === BLANK_SET) {
		return 0;
	}
	let set = setdexAll[pokemonName][setName];
	if (set.forme) {
		return pokedex[pokemonName].formes.indexOf(set.forme);
	} else if (set.isGmax) {
		return 1;
	} else if (set.item) {
		if (set.item !== "Eviolite" && (set.item.endsWith("ite") || set.item.endsWith("ite X"))) {
			return 1;
		} else if (set.item.endsWith("ite Y")) {
			return 2;
		}
	}
	return 0;
}

function setSelectValueIfValid(select, value, fallback) {
	select.val(select.children("option[value='" + value + "']").length !== 0 ? value : fallback);
}

$(".forme").change(function () {
	let formeName = $(this).val();
	let altForme = pokedex[formeName];
	let container = $(this).closest(".info-group").siblings();
	let fullSetName = container.find(".select2-chosen").first().text();
	let pokemonName = fullSetName.substring(0, fullSetName.indexOf(" ("));
	let setName = fullSetName.substring(fullSetName.indexOf("(") + 1, fullSetName.lastIndexOf(")"));

	if (gen != 9 || !$(this).closest(".poke-info").find(".tera").prop("checked")) {
		$(this).parent().siblings().find(".type1").val(altForme.t1);
		$(this).parent().siblings().find(".type2").val(altForme.t2 !== undefined ? altForme.t2 : "");
	}
	$(this).parent().siblings().find(".weight").val(altForme.w);

	for (let i = 0; i < STATS.length; i++) {
		let baseStat = container.find("." + STATS[i]).find(".base");
		baseStat.val(altForme.bs[STATS[i]]);
		container.find(".hp .base").val(altForme.bs.hp).keyup();
		baseStat.keyup();
	}

	let abilityList = altForme.abilities;
	prependSpeciesAbilities(abilityList, container.parent().parent().prop("id"), container.find(".ability"));

	let ability = "";
	if (setName !== BLANK_SET && pokemonName && setdexAll && setdexAll[pokemonName] && setdexAll[pokemonName][setName] &&
		abilityList && abilityList.includes(setdexAll[pokemonName][setName].ability)) {
		// this pokemon comes from a defined set and the set specifies an ability
		ability = setdexAll[pokemonName][setName].ability;
	} else if (abilityList && abilityList.length == 1) {
		// the forme only has one ability
		ability = abilityList[0];
	} else if (abilities.includes(altForme.ab)) {
		// the pokedex specifies an ability for the forme
		ability = altForme.ab;
	}
	container.find(".ability").val(ability).change();

	if (formeName.startsWith("Mega ") && !formeName.includes("Rayquaza")) {
		container.find(".item").val("").keyup();
		//container.find(".item").prop("disabled", true);
		//edited out by squirrelboy1225 for doubles!
	}/* else {
		container.find(".item").prop("disabled", false);
	}*/

	/*if (pokemonName.includes("Darmanitan")) {
		container.find(".percent-hp").val(formeName.includes("Darmanitan-Zen") ? "50" : "100").keyup();
	}*/
	// This is where we would make Zygarde's Forme change @50% HP, need to define var formeName
	// if (pokemonName === "Zygarde" && (formeName === "Zygarde-10%" || formeName === "Zygarde")) {
	//    container.find(".percent-hp").val($(this).val() === "Zygarde-Complete" ? "50" : "100").keyup();
	//}
});

/*function getTerrainEffects() {
	var className = $(this).prop("className");
	className = className.substring(0, className.indexOf(" "));
	switch (className) {
	case "type1":
	case "type2":
	case "ability":
	case "item":
		var id = $(this).closest(".poke-info").prop("id");
		let terrainValue = $("input:checkbox[name='terrain']:checked").val();
		if (terrainValue === "Electric") {
			$("#" + id).find("[value='Asleep']").prop("disabled", isGroundedTerrain($("#" + id)));
		} else if (terrainValue === "Misty") {
			$("#" + id).find(".status").prop("disabled", isGroundedTerrain($("#" + id)));
		}
		break;
	default:
		$("input:checkbox[name='terrain']").not(this).prop("checked", false);
		if ($(this).prop("checked") && $(this).val() === "Electric") {
			$("#p1").find("[value='Asleep']").prop("disabled", isGroundedTerrain($("#p1")));
			$("#p2").find("[value='Asleep']").prop("disabled", isGroundedTerrain($("#p2")));
		} else if ($(this).prop("checked") && $(this).val() === "Misty") {
			$("#p1").find(".status").prop("disabled", isGroundedTerrain($("#p1")));
			$("#p2").find(".status").prop("disabled", isGroundedTerrain($("#p2")));
		} else {
			$("#p1").find("[value='Asleep']").prop("disabled", false);
			$("#p1").find(".status").prop("disabled", false);
			$("#p2").find("[value='Asleep']").prop("disabled", false);
			$("#p2").find(".status").prop("disabled", false);
		}
		break;
	}
}

function isGroundedTerrain(pokeInfo) {
	return $("#gravity").prop("checked") || pokeInfo.find(".type1").val() !== "Flying" && pokeInfo.find(".type2").val() !== "Flying" &&
            pokeInfo.find(".ability").val() !== "Levitate" && pokeInfo.find(".item").val() !== "Air Balloon";
}*/

// Need to close over "lastClicked", so we'll do it the old-fashioned way to avoid
// needlessly polluting the global namespace.
var stickyMoves = (function () {
	var lastClicked = "resultMoveL1";
	$(".result-move").click(function () {
		if (this.id === lastClicked) {
			$(this).toggleClass("locked-move");
		} else {
			$(".locked-move").removeClass("locked-move");
		}
		lastClicked = this.id;
	});

	return {
		"clearStickyMove": function () {
			lastClicked = null;
			$(".locked-move").removeClass("locked-move");
		},
		"setSelectedMove": function (slot) {
			lastClicked = slot;
		},
		"getSelectedSide": function () {
			if (lastClicked) {
				if (lastClicked.includes("resultMoveL")) {
					return "L";
				} else if (lastClicked.includes("resultMoveR")) {
					return "R";
				}
			}
			return null;
		}
	};
})();

function Pokemon(pokeInfo) {
	// pokeInfo is a jquery object
	let poke = {
		"type1": pokeInfo.find(".type1").val(),
		"type2": pokeInfo.find(".type2").val(),
		// ~~ is used as a faster Math.floor() for positive numbers
		"level": ~~pokeInfo.find(".level").val(),
		"maxHP": ~~pokeInfo.find(".hp .total").text(),
		"curHP": ~~pokeInfo.find(".current-hp").val(),
		"HPEVs": ~~pokeInfo.find(".hp .evs").val(),
		"HPIVs": ~~pokeInfo.find(".hp .ivs").val(),
		"isDynamax": pokeInfo.find(".max").prop("checked"),
		"isTerastal": pokeInfo.find(".tera").prop("checked"),
		"rawStats": [],
		"boosts": [],
		"stats": [],
		"evs": [],
		"ivs": [],
		"nature": pokeInfo.find(".nature").val(),
		"ability": pokeInfo.find(".ability").val(),
		"isAbilityActivated": pokeInfo.find(".isActivated").prop("indeterminate") ? "indeterminate" : pokeInfo.find(".isActivated").prop("checked"),
		"item": pokeInfo.find(".item").val(),
		"status": pokeInfo.find(".status").val(),
		"toxicCounter": pokeInfo.find(".status").val() === "Badly Poisoned" ? ~~pokeInfo.find(".toxic-counter").val() : 0,
		"weight": +pokeInfo.find(".weight").val(),
		"hasType": function (type) { return this.type1 === type || this.type2 === type; },
		// Reset this mon's current ability subject to Neutralizing Gas
		// This is designed to be called once before calcs and after calcing each move as defender
		"resetCurAbility": function () { this.curAbility = (isNeutralizingGas && this.item !== "Ability Shield") ? "" : this.ability }
	};
	// name
	let selectorName = pokeInfo.find("input.set-selector").val();
	let speciesName = selectorName.substring(0, selectorName.indexOf(" ("));
	let dexEntry = pokedex[speciesName];
	if (!selectorName.includes("(")) {
		poke.name = selectorName;
		poke.setName = "";
	} else {
		poke.setName = selectorName.substring(selectorName.indexOf("(") + 1, selectorName.length - 1);
		let currentForme = pokeInfo.find(".forme").val();
		if (currentForme && dexEntry && dexEntry.formes) {
			poke.name = currentForme;
			dexEntry = pokedex[currentForme];
		} else {
			poke.name = speciesName;
		}
	}
	// dexType
	if (dexEntry) {
		poke.dexType1 = dexEntry.t1;
		poke.dexType2 = dexEntry.t2;
	}
	// .ability is the mon's ability and should never be overwritten
	// .curAbility represents the ability after negation through Neutralizing Gas or a Mold Breaker ability or move
	poke.resetCurAbility();
	// teraType
	if (gen === 9) {
		poke.teraType = pokeInfo.find(".tera-type").val();
	}
	// populate rawStats, boosts, evs, and ivs
	STATS.forEach(stat => {
		poke.rawStats[stat] = ~~pokeInfo.find("." + stat + " .total").text();
		poke.boosts[stat] = ~~pokeInfo.find("." + stat + " .boost").val();
		poke.evs[stat] = ~~pokeInfo.find("." + stat + " .evs").val();
		poke.ivs[stat] = ~~pokeInfo.find("." + stat + " .ivs").val();
	});
	// moves and baseMoveNames
	let move1 = pokeInfo.find(".move1");
	let move2 = pokeInfo.find(".move2");
	let move3 = pokeInfo.find(".move3");
	let move4 = pokeInfo.find(".move4");
	let setdexPoke = speciesName in setdex && poke.setName in setdex[speciesName] ? setdex[speciesName][poke.setName] : false;
	poke.baseMoveNames = [ // baseMoveNames is used in set export
		setdexPoke ? setdexPoke.moves[0] : move1.find("select.move-selector").val(),
		setdexPoke ? setdexPoke.moves[1] : move2.find("select.move-selector").val(),
		setdexPoke ? setdexPoke.moves[2] : move3.find("select.move-selector").val(),
		setdexPoke ? setdexPoke.moves[3] : move4.find("select.move-selector").val()
	];
	// if the set is a facility set and the move does not exist in moves, pass on the move's name so it appears in resultMove
	poke.moves = [
		setdexPoke && !(setdexPoke.moves[0] in moves) ? {"name": setdexPoke.moves[0], "bp": 0} : getMoveDetails(move1, poke),
		setdexPoke && !(setdexPoke.moves[1] in moves) ? {"name": setdexPoke.moves[1], "bp": 0} : getMoveDetails(move2, poke),
		setdexPoke && !(setdexPoke.moves[2] in moves) ? {"name": setdexPoke.moves[2], "bp": 0} : getMoveDetails(move3, poke),
		setdexPoke && !(setdexPoke.moves[3] in moves) ? {"name": setdexPoke.moves[3], "bp": 0} : getMoveDetails(move4, poke)
	];
	// if this mon holds a weakness policy and the weakness policy button is pressed, treat it as having no held item
	if (poke.item === "Weakness Policy" && $("#wp" + (pokeInfo.prop("id") == "p1" ? "L" : "R")).prop("checked")) {
		poke.item = "";
	}

	return poke;
}

function getMoveDetails(moveInfo, attacker) {
	let moveName = moveInfo.find("select.move-selector").val();
	let defaultDetails = moves[moveName];

	if (gameId == 7 && moveInfo.find("input.move-z").prop("checked") && moveName !== "Struggle" && "zp" in defaultDetails) {
		return getZMove(moveName, attacker, defaultDetails, moveInfo);
	}
	if (gameId == 8 && moveInfo.find("input.move-max").prop("checked") && moveName !== "Struggle") {
		return getMaxMove(moveName, attacker, defaultDetails, moveInfo);
	}

	return $.extend({}, defaultDetails, {
		"name": moveName,
		"bp": ~~moveInfo.find(".move-bp").val(),
		"type": moveInfo.find(".move-type").val(),
		"category": moveInfo.find(".move-cat").val(),
		"isCrit": moveInfo.find(".move-crit").prop("checked"),
		"hits": defaultDetails.maxMultiHits ? ~~moveInfo.find(".move-hits").val() : defaultDetails.isThreeHit ? 3 : defaultDetails.isTwoHit ? 2 : 1,
		"usedTimes": defaultDetails.dropsStats ? ~~moveInfo.find(".stat-drops").val() : 1
	});
}

function getZMove(moveName, attacker, defaultDetails, moveInfo) {
	let moveType = getMoveTypePreDamage(moveName, attacker);
	if (!moveType) {
		moveType = moveInfo ? moveInfo.find(".move-type").val() : defaultDetails.type;
		if (!moveType || moveType === "None") {
			moveType = "Normal";
		}
	}

	let zMoveName, moveDetails;
	if (attacker.item in EXCLUSIVE_ZMOVES_LOOKUP && EXCLUSIVE_ZMOVES_LOOKUP[attacker.item].baseMove === moveName) {
		zMoveName = EXCLUSIVE_ZMOVES_LOOKUP[attacker.item].zMoveName;
		moveDetails = EXCLUSIVE_ZMOVES[zMoveName];
	} else {
		if (moveName.includes("Hidden Power") || moveName === "Revelation Dance") { // always becomes Breakneck Blitz
			moveType = "Normal";
		}
		zMoveName = ZMOVES_LOOKUP[moveType];
		moveDetails = {
			"bp": (moveName === "Nature Power" && moveType !== "Normal") ? 175 : (defaultDetails.zp ? defaultDetails.zp : 0),
			"type": moveType,
			"category": moveInfo ? moveInfo.find(".move-cat").val() : defaultDetails.category
		};
	}

	return $.extend({
		"name": zMoveName,
		"acc": 101,
		"isCrit": moveInfo ? moveInfo.find(".move-crit").prop("checked") : false,
		"hits": 1,
		"isZ": true
	}, moveDetails);
}

function getMaxMove(moveName, attacker, defaultDetails, moveInfo) {
	let moveType = getMoveTypePreDamage(moveName, attacker);
	if (!moveType) {
		moveType = moveInfo ? moveInfo.find(".move-type").val() : defaultDetails.type;
		// this won't account for an opponent's neutralizing gas in the 1vAll mass calc
		let ability = (isNeutralizingGas && attacker.item !== "Ability Shield") ? "" : attacker.ability;
		if (!moveType || moveType === "None") {
			moveType = "Normal";
		} else if (ability === "Pixilate" && moveType === "Normal") {
			// changing the type like this prevents getDamageResult() from applying the -ate boost, which is correct
			// this will also display the correct max move i.e. Max Starfall
			moveType = "Fairy";
		} else if (ability === "Refrigerate" && moveType === "Normal") {
			moveType = "Ice";
		}
	}

	let maxMoveName = MAXMOVES_LOOKUP[moveType];

	let tempBP;
	if (MAXMOVES_POWER[moveName]) {
		tempBP = MAXMOVES_POWER[moveName];
	} else {
		tempBP = moveInfo ? ~~moveInfo.find(".move-bp").val() : defaultDetails.bp;
		if (!tempBP || tempBP === 0) tempBP = 0;
		else if (tempBP >= 150) tempBP = 150;
		else if (tempBP >= 110) tempBP = 140;
		else if (tempBP >= 75) tempBP = 130;
		else if (tempBP >= 65) tempBP = 120;
		else if (tempBP >= 55) tempBP = 110;
		else if (tempBP >= 45) tempBP = 100;
		else if (tempBP >= 1) tempBP = 90;
	}

	let negateAbility = false;
	// Weather Ball / Terrain Pulse turn into their respective G-Max move in the proper field condition
	// As a status move, Nature Power turns into Max Guard
	if (tempBP == 0 || moveName === "Nature Power") {
		tempBP = 0;
		maxMoveName = "Max Guard";
	} else if (attacker.name === "Cinderace-Gmax" && moveType === "Fire") {
		tempBP = 160;
		maxMoveName = "G-Max Fireball";
		negateAbility = true;
	} else if (attacker.name === "Inteleon-Gmax" && moveType === "Water") {
		tempBP = 160;
		maxMoveName = "G-Max Hydrosnipe";
		negateAbility = true;
	} else if (attacker.name === "Rillaboom-Gmax" && moveType === "Grass") {
		tempBP = 160;
		maxMoveName = "G-Max Drum Solo";
		negateAbility = true;
	}

	return {
		"name": maxMoveName,
		"bp": tempBP,
		"type": moveType,
		"category": moveInfo ? moveInfo.find(".move-cat").val() : defaultDetails.category,
		"acc": 101,
		"isCrit": moveInfo ? moveInfo.find(".move-crit").prop("checked") : false,
		"hits": 1,
		"isMax": true,
		"negateAbility": negateAbility
	};
}

function getMoveTypePreDamage(moveName, attacker) {
	if (moveName === "Weather Ball") {
		// this won't account for an opponent's cloud nine in the 1vAll mass calc
		return getWeatherBall(getActiveWeather(), attacker.item);
	} else if (moveName === "Nature Power") {
		// Nature Power only changes in terrain, not weather. It still changes if the user is not grounded
		return getTerrainType($("input:radio[name='terrain']:checked").val());
	} else if (moveName === "Terrain Pulse") {
		let tempAbility = attacker.curAbility;
		attacker.resetCurAbility(); // temporarily negate ability via neutralizing gas if active
		let grounded = isGrounded(attacker, { "isGravity": $("#gravity").prop("checked") });
		attacker.curAbility = tempAbility;
		return grounded ? getTerrainType($("input:radio[name='terrain']:checked").val()) : "Normal";
	} else if (moveName === "Techno Blast" && attacker.item.endsWith("Drive")) {
		return getTechnoBlast(attacker.item);
	} else if (moveName === "Multi-Attack" && attacker.name.startsWith("Silvally-")) {
		return attacker.name.substring(attacker.name.indexOf("-") + 1);
	}
}

function getWeatherBall(weather, attackerItem) {
	if (weather.includes("Sun") && attackerItem !== "Utility Umbrella") {
		return "Fire";
	} else if (weather.includes("Rain") && attackerItem !== "Utility Umbrella") {
		return "Water";
	} else if (weather === "Sand") {
		return "Rock";
	} else if (weather === "Hail" || weather === "Snow") {
		return "Ice";
	}
	return "Normal";
}

function getTerrainType(terrain) {
	switch (terrain) {
		case "Electric":
			return "Electric";
		case "Grassy":
			return "Grass";
		case "Misty":
			return "Fairy";
		case "Psychic":
			return "Psychic";
		default:
			return "Normal";
	}
}

// get the current weather subject to cloud nine / air lock
function getActiveWeather() {
	let p1 = $("#p1")
	let p1Ability = p1.find(".ability").val();
	let p2 = $("#p2");
	let p2Ability = p2.find(".ability").val();
	if (isNeutralizingGas && p1.find(".item").val() !== "Ability Shield") {
		p1Ability = "";
	}
	if (p2Ability) {
		if (isNeutralizingGas && p2.find(".item").val() !== "Ability Shield") {
			p2Ability = "";
		}
	} else {
		p2Ability = "";
	}
	let noWeatherAbilities = ["Cloud Nine", "Air Lock"];
	if (noWeatherAbilities.includes(p1Ability) || noWeatherAbilities.includes(p2Ability)) {
		return "";
	}
	return $("input:radio[name='weather']:checked").val();
}

function Field() {
	let format = $("input:radio[name='format']:checked").val().toLowerCase();
	let terrain = $("input:radio[name='terrain']:checked").val();
	let weather = $("input:radio[name='weather']:checked").val();
	let isAuraFairy = $("#fairy-aura").prop("checked");
	let isAuraDark = $("#dark-aura").prop("checked");
	let isAuraBreak = $("#aura-break").prop("checked");
	let isGravity = $("#gravity").prop("checked");
	// isSR (stealth rocks), spikes, and Busted are all in the correct order.
	let isSR = [$("#srR").prop("checked"), $("#srL").prop("checked")];
	let isProtect = [$("#protectL").prop("checked"), $("#protectR").prop("checked")];
	let spikes = [~~$("input:radio[name='spikesR']:checked").val(), ~~$("input:radio[name='spikesL']:checked").val()];
	let isReflect = [$("#reflectL").prop("checked"), $("#reflectR").prop("checked")];
	let isLightScreen = [$("#lightScreenL").prop("checked"), $("#lightScreenR").prop("checked")];
	let isSeeded = [$("#leechSeedR").prop("checked"), $("#leechSeedL").prop("checked")]; // affects attacks against opposite side
	let isHelpingHand = [$("#helpingHandR").prop("checked"), $("#helpingHandL").prop("checked")]; // affects attacks against opposite side
	let isCharge = [$("#chargeR").prop("checked"), $("#chargeL").prop("checked")]; // affects attacks against opposite side
	let isPowerSpot = [$("#powerSpotR").prop("checked"), $("#powerSpotL").prop("checked")]; // affects attacks against opposite side
	let isFriendGuard = [$("#friendGuardL").prop("checked"), $("#friendGuardR").prop("checked")];
	let isBattery = [$("#batteryR").prop("checked"), $("#batteryL").prop("checked")]; // affects attacks against opposite side
	let isMinimized = [$("#minimL").prop("checked"), $("#minimR").prop("checked")];
	let isVictoryStar = [$("#vicStarL").prop("checked"), $("#vicStarR").prop("checked")];
	let isBusted8 = [$("#busted8R").prop("checked"), $("#busted8L").prop("checked")];
	let isBusted16 = [$("#busted16R").prop("checked"), $("#busted16L").prop("checked")];
	let isSteelySpirit = [$("#steelySpiritR").prop("checked"), $("#steelySpiritL").prop("checked")]; // affects attacks against opposite side
	let fainted = [$("#faintedR").val(), $("#faintedL").val()]; // affects attacks against opposite side
	let isRuinTablets = [$("#ruinTabletsL").prop("checked"), $("#ruinTabletsR").prop("checked")];
	let isRuinVessel = [$("#ruinVesselL").prop("checked"), $("#ruinVesselR").prop("checked")];
	let isRuinSword = [$("#ruinSwordR").prop("checked"), $("#ruinSwordL").prop("checked")]; // affects attacks against opposite side
	let isRuinBeads = [$("#ruinBeadsR").prop("checked"), $("#ruinBeadsL").prop("checked")]; // affects attacks against opposite side

	this.getWeather = function () {
		return weather;
	};
	this.setWeather = function (newWeather) {
		weather = newWeather;
	};
	this.clearWeather = function () {
		weather = "";
	};
	this.getTerrain = function () {
		return terrain;
	};
	this.getSide = function (i) {
		return new Side(format, terrain, weather, isAuraFairy, isAuraDark, isAuraBreak, isGravity,
			isSR[i], spikes[i], isReflect[i], isLightScreen[i], isSeeded[i], isHelpingHand[i], isCharge[i], isMinimized[i],
			isVictoryStar[i], isFriendGuard[i],
			isBattery[i], isProtect[i],
			isPowerSpot[i], isBusted8[i], isBusted16[i], isSteelySpirit[i],
			fainted[i], isRuinTablets[i], isRuinVessel[i], isRuinSword[i], isRuinBeads[i]);
	};
}

function Side(format, terrain, weather, isAuraFairy, isAuraDark, isAuraBreak, isGravity,
	isSR, spikes, isReflect, isLightScreen, isSeeded, isHelpingHand, isCharge, isMinimized,
	isVictoryStar, isFriendGuard,
	isBattery, isProtect,
	isPowerSpot, isBusted8, isBusted16, isSteelySpirit,
	faintedCount, isRuinTablets, isRuinVessel, isRuinSword, isRuinBeads) {
	this.format = format;
	this.terrain = terrain;
	this.weather = weather;
	this.isAuraFairy = isAuraFairy;
	this.isAuraDark = isAuraDark;
	this.isAuraBreak = isAuraBreak;
	this.isGravity = isGravity;
	this.isSR = isSR;
	this.spikes = spikes;
	this.isReflect = isReflect;
	this.isLightScreen = isLightScreen;
	this.isSeeded = isSeeded;
	this.isHelpingHand = isHelpingHand;
	this.isCharge = isCharge;
	this.isMinimized = isMinimized;
	this.isVictoryStar = isVictoryStar;
	this.isFriendGuard = isFriendGuard;
	this.isBattery = isBattery;
	this.isProtect = isProtect;
	this.isPowerSpot = isPowerSpot;
	this.isBusted8 = isBusted8;
	this.isBusted16 = isBusted16;
	this.isSteelySpirit = isSteelySpirit;
	this.faintedCount = faintedCount;
	this.isRuinTablets = isRuinTablets;
	this.isRuinVessel = isRuinVessel;
	this.isRuinSword = isRuinSword;
	this.isRuinBeads = isRuinBeads;
}

// note that this function only checks the setdex against the currently selected game.
function validateSetdex(ignoreMoves = false) {
	let failedValidation = false;
	for (const [speciesName, speciesSets] of Object.entries(setdex)) {
		if (!(speciesName in pokedex)) {
			failedValidation = true;
			console.log(speciesName + " is not a species in the pokedex");
			continue;
		}
		let pokedexEntry = pokedex[speciesName];
		if (pokedexEntry.hasBaseForme) {
			failedValidation = true;
			console.log(speciesName + " is listed as a species, but is a forme in the pokedex");
			continue;
		}
		for (const [setName, setObj] of Object.entries(speciesSets)) {
			let outputText = [];
			if (setObj.item && items.indexOf(setObj.item) == -1 &&
				!(pokedexEntry.formes && pokedexEntry.formes[getFormeNum(setName, speciesName)].startsWith("Mega"))) {
					outputText.push("item " + setObj.item);
			}
			if (pokedexEntry.abilities && setObj.ability && pokedexEntry.abilities.indexOf(setObj.ability) == -1) {
				outputText.push("ability " + setObj.ability);
			}
			if (setObj.nature && !(setObj.nature in NATURES)) {
				outputText.push("nature " + setObj.nature);
			}
			if (!ignoreMoves) {
				if (setObj.moves) {
					for (let i = 0; i < setObj.moves.length; i++) {
						let moveName = setObj.moves[i];
						if (moveName && !(moveName in moves)) {
							outputText.push("move " + moveName);
						}
					}
				} else {
					outputText.push("no moves found");
				}
			}
			if (outputText.length > 0) {
				failedValidation = true;
				console.log(setName + ": " + outputText.join("; "));
			}
		}
	}
	if (!failedValidation) {
		console.log("No " + (ignoreMoves ? "non-move " : "") + "validation issues found for gameId " + gameId + ".");
	}
}

// Damage map functions
function damageInfoFromArray(array) {
	let map = new Map();
	for (let i = 0; i < array.length; i++) {
		mapAddKey(map, array[i], 1);
	}
	return {
		damageMap: map,
		min: array[0],
		max: array[array.length - 1]
	};
}

function mapAddKey(map, key, value) {
	map.set(key, map.has(key) ? map.get(key) + value : value);
}

function combineDuplicateDamageInfo(damageInfo) {
	// for combining two damage maps that have the same kv-pairs, thus just one arg
	let combinedMap = new Map();
	let damageValues = Array.from(damageInfo.damageMap.keys());
	let valuesLength = damageValues.length;
	for (let i = 0; i < valuesLength; i++) {
		let iDamage = damageValues[i];
		let iCount = damageInfo.damageMap.get(iDamage);
		mapAddKey(combinedMap, iDamage + iDamage, iCount * iCount);
		for (let j = i + 1; j < valuesLength; j++) {
			let jDamage = damageValues[j];
			let jCount = damageInfo.damageMap.get(jDamage);
			mapAddKey(combinedMap, iDamage + jDamage, 2 * iCount * jCount);
		}
	}
	return {
		damageMap: combinedMap,
		min: 2 * damageInfo.min,
		max: 2 * damageInfo.max
	};
}

function combineDamageInfo(iDamageInfo, jDamageInfo) {
	let combinedMap = new Map();
	for (const [iDamage, iCount] of iDamageInfo.damageMap) {
		for (const [jDamage, jCount] of jDamageInfo.damageMap) {
			mapAddKey(combinedMap, iDamage + jDamage, iCount * jCount);
		}
	}
	return {
		damageMap: combinedMap,
		min: iDamageInfo.min + jDamageInfo.min,
		max: iDamageInfo.max + jDamageInfo.max
	};
}

function recurseDamageInfo(damageInfo, numHits) {
	// this function can be optimized a few ways, but with numHits <= 10, it won't do much.
	if (numHits == 1) {
		return damageInfo;
	}
	if (numHits % 2 == 0) {
		return combineDuplicateDamageInfo(recurseDamageInfo(damageInfo, numHits / 2));
	} else {
		return combineDamageInfo(damageInfo, recurseDamageInfo(damageInfo, numHits - 1));
	}
}

const MAP_SQUASH_CONSTANT = 2 ** 13;
function squashDamageInfo(damageInfo) {
	if (damageInfo.mapCombinations <= MAP_SQUASH_CONSTANT) {
		return;
	}
	// damageMap numbers use integral numbers, except in this case.
	// To avoid exceeding Number.MAX_SAFE_INTEGER (2 ** 53 - 1) and avoid needing BigNums, divide all values by the same factor.
	// Since damage maps are (currently) only used for the first 4 hits when calcing an nHKO, dividing all values by (mapCombinations / (2 ** 13)) works.
	let divisor = damageInfo.mapCombinations / MAP_SQUASH_CONSTANT;
	for (const [key, value] of damageInfo.damageMap) {
		damageInfo.damageMap.set(key, value / divisor);
	}
	damageInfo.mapCombinations = MAP_SQUASH_CONSTANT;
}

function getAssembledDamageInfo(result, moveHits, isFirstHit) {
	if (result.damage.length == 1) {
		let singletonValue = result.damage[0];
		return {
			damageMap: new Map([[singletonValue, 1]]),
			min: singletonValue,
			max: singletonValue
		};
	}
	if (result.tripleAxelDamage) {
		let damageArrays = isFirstHit && result.teraShellDamage ? result.teraShellDamage : result.tripleAxelDamage;
		let assembledDamageInfo = combineDamageInfo(damageInfoFromArray(isFirstHit ? result.firstHitDamage : damageArrays[0]), damageInfoFromArray(damageArrays[1]));
		if (damageArrays.length == 2) {
			return assembledDamageInfo;
		}
		return combineDamageInfo(assembledDamageInfo, damageInfoFromArray(damageArrays[2]));
	}
	let resultDamageInfo = damageInfoFromArray(result.damage);
	if (result.childDamage) {
		return combineDamageInfo((isFirstHit ? damageInfoFromArray(result.firstHitDamage) : resultDamageInfo), damageInfoFromArray(result.childDamage));
	}
	if (moveHits > 1) {
		if (!isFirstHit) {
			return recurseDamageInfo(resultDamageInfo, moveHits);
		}
		if (result.teraShellDamage || result.isFirstAttack) {
			return recurseDamageInfo(damageInfoFromArray(result.firstHitDamage), moveHits);
		}
		return combineDamageInfo(recurseDamageInfo(resultDamageInfo, moveHits - 1), damageInfoFromArray(result.firstHitDamage));
	}

	return isFirstHit ? damageInfoFromArray(result.firstHitDamage) : resultDamageInfo;
}

function DamageInfo(result, moveHits, isFirstHit = false) {
	let damageInfo = getAssembledDamageInfo(result, moveHits, isFirstHit);
	damageInfo.mapCombinations = result.damage.length ** moveHits;
	squashDamageInfo(damageInfo);
	return damageInfo;
}
// End damage map functions

// please add the new setdex to this function whenever adding a new gen
function isFacilitySet(speciesName, setName) {
	let setdexMaps = [SETDEX_EM, SETDEX_PHGSS, SETDEX_GEN5, SETDEX_GEN6, SETDEX_GEN7, SETDEX_GEN8, SETDEX_GEN80];
	for (let setdexMap of setdexMaps) {
		let speciesSets = setdexMap[speciesName];
		if (speciesSets && (setName in speciesSets)) {
			return true;
		}
	}
	return false;
}

// the keys for this object are the values under the game-select tag
const GAME_GENS = {
	3: { game: "em" },
	4: { game: "pthgss" },
	5: { game: "bw" },
	6: { game: "oras" },
	7: { game: "usum" },
	8: { game: "swsh" },
	80: { game: "bdsp", gen: 8 },
	9: { game: "sv" }
};
const LOCAL_SELECTED_GAME_KEY = "selectedGen";
const LOCAL_AUTOLEVEL_KEY_PREFIX = "autolevelGen";

var gameId, gen, pokedex, setdex, setdexAll, typeChart, moves, abilities, items, calculateAllMoves;
var STATS = STATS_GSC;
var calcHP = CALC_HP_ADV;
var calcStat = CALC_STAT_ADV;
$(".game").change(function () {
	gameId = ~~$(this).val();
	let gameGen = GAME_GENS[gameId];
	gen = gameGen && gameGen.gen ? gameGen.gen : gameId;
	localStorage.setItem(LOCAL_SELECTED_GAME_KEY, gameId);

	setGenProperties();
	$("#autolevel-title").text((gen == 4 ? "AI " : "") + "Auto-Level to:");
	setdexAll = joinDexes([setdex, SETDEX_CUSTOM]);
	clearField();
	$(".gen-specific.g" + gameId).show();
	$(".gen-specific").not(".g" + gameId).hide();
	let typeOptions = getSelectOptions(Object.keys(typeChart));
	$("select.type1").find("option").remove().end().append(typeOptions);
	$("select.type2").find("option").remove().end().append("<option value=\"\">(none)</option>" + typeOptions);
	$("select.move-type").find("option").remove().end().append("<option value=\"None\">None</option>" + typeOptions);
	if (gen == 9) {
		$("select.tera-type").find("option").remove().end().append(typeOptions + "<option value=\"Stellar\">Stellar</option>");
	}
	var moveOptions = getSelectOptions(Object.keys(moves), true);
	$("select.move-selector").find("option").remove().end().append(moveOptions);
	var abilityOptions = getSelectOptions(abilities, true);
	$("select.ability").find("option").remove().end().append("<option value=\"\">(other)</option><option disabled>--</option>" + abilityOptions);
	p1AbilityCount = 0;
	p2AbilityCount = 0;
	var itemOptions = getSelectOptions(items, true);
	$("select.item").find("option").remove().end().append("<option value=\"\">(none)</option>" + itemOptions);
	manuallySetWeather = "";
	manuallySetTerrain = "";
	$("input:radio[name='weather'][value='']").prop("checked", true);
	$("input:radio[name='terrain'][value='']").prop("checked", true);

	$(".set-selector").val(getSetOptions()[1].id); // load the first set after the unselectable species name
	$(".set-selector").change();
});
const IV_LISTS = {
	"IVS_GEN3": { ivs: [31, 21, 18, 15, 12, 9, 6, 3], select: ".autoivs-select" },
	"IVS_OTHER": { ivs: [31, 27, 23, 19], select: "#autoivs-center #autoivs-select" }
}

const FORUM_LINK_DEFAULT = "https://www.smogon.com/forums/forums/battle-facilities.697/";
function setGenProperties() {
	typeChart = TYPE_CHART_XY;
	calculateAllMoves = CALCULATE_ALL_MOVES_MODERN;
	let gimmickType, plus2StatsPath1, plus2StatsPath2, ivList, forumLink;
	if (gameId == 3) {
		pokedex = POKEDEX_ADV;
		setdex = SETDEX_EM;
		typeChart = TYPE_CHART_GSC;
		moves = MOVES_ADV;
		items = ITEMS_ADV;
		abilities = ABILITIES_ADV;
		calculateAllMoves = CALCULATE_ALL_MOVES_ADV;
		ivList = IV_LISTS.IVS_GEN3;
		forumLink = "https://www.smogon.com/forums/threads/gen-iii-battle-frontier-discussion-and-records.3648697/";
	} else if (gameId == 4) {
		pokedex = POKEDEX_DPP;
		setdex = SETDEX_PHGSS;
		typeChart = TYPE_CHART_GSC;
		moves = MOVES_DPP;
		items = ITEMS_DPP;
		abilities = ABILITIES_DPP;
		calculateAllMoves = CALCULATE_ALL_MOVES_PTHGSS;
		forumLink = "https://www.smogon.com/forums/threads/4th-generation-battle-facilities-discussion-and-records.3663294/";
	} else if (gameId == 5) {
		pokedex = POKEDEX_BW;
		setdex = SETDEX_GEN5;
		typeChart = TYPE_CHART_GSC;
		moves = MOVES_BW;
		items = ITEMS_BW;
		abilities = ABILITIES_BW;
		ivList = IV_LISTS.IVS_OTHER;
		forumLink = "https://www.smogon.com/forums/threads/black-white-battle-subway-records-now-with-gen-4-records.102593/";
	} else if (gameId == 6) {
		pokedex = POKEDEX_XY;
		setdex = SETDEX_GEN6;
		moves = MOVES_XY;
		items = ITEMS_XY;
		abilities = ABILITIES_XY;
		ivList = IV_LISTS.IVS_OTHER;
		forumLink = "https://www.smogon.com/forums/threads/battle-maison-discussion-records.3492706/";
	} else if (gameId == 7) {
		pokedex = POKEDEX_SM;
		setdex = SETDEX_GEN7;
		moves = MOVES_SM;
		items = ITEMS_SM;
		abilities = ABILITIES_SM;
		ivList = IV_LISTS.IVS_OTHER;
		plus2StatsPath1 = "_images/eevee.png";
		plus2StatsPath2 = "_images/eevium.png";
		forumLink = "https://www.smogon.com/forums/threads/battle-tree-discussion-and-records.3587215/";
	} else if (gameId == 8) {
		pokedex = POKEDEX_SS;
		setdex = SETDEX_GEN8;
		moves = MOVES_SS;
		items = ITEMS_SS;
		abilities = ABILITIES_SS;
		gimmickType = "Dynamaxed";
		forumLink = "https://www.smogon.com/forums/threads/swsh-battle-facilities-discussion-records.3656190/";
	} else if (gameId == 80) {
		pokedex = POKEDEX_BDSP;
		setdex = SETDEX_GEN80;
		moves = MOVES_SS;
		items = ITEMS_BDSP;
		abilities = ABILITIES_SS;
		forumLink = "https://www.smogon.com/forums/threads/bdsp-battle-tower-discussion-records.3693739/";
	} else if (gameId == 9) {
		pokedex = POKEDEX_SV;
		setdex = {};
		moves = MOVES_SV;
		items = ITEMS_SV;
		abilities = ABILITIES_SV;
		gimmickType = "Terastallized";
		plus2StatsPath1 = "_images/dozo.png";
		plus2StatsPath2 = "_images/giri.png";
	}

	if (gimmickType) {
		$("#startGimmick-label").text("Start " + gimmickType);
		$("#startGimmick-label").prop("title", "This custom set starts " + gimmickType + " when loaded");
	}
	if (plus2StatsPath1 && plus2StatsPath2) {
		$(".evo_img1").attr("src", plus2StatsPath1);
		$(".evo_img2").attr("src", plus2StatsPath2);
	}
	if (ivList) {
		$(ivList.select).find("option").remove().end().append(getSelectOptions(ivList.ivs));
	}
	$("#midimg").parent().prop("href", forumLink ? forumLink : FORUM_LINK_DEFAULT);
}

function joinDexes(components) {
	var joinedDex = {};
	for (var i = 0; i < components.length; i++) {
		var sourceDex = components[i];
		if (sourceDex) {
			for (var p in sourceDex) {
				if (sourceDex.hasOwnProperty(p)) {
					joinedDex[p] = $.extend(joinedDex[p], sourceDex[p]);
				}
			}
		}
	}
	return joinedDex;
}

function clearField() {
	let autolevelKey = LOCAL_AUTOLEVEL_KEY_PREFIX + gameId;
	let storedLevel = localStorage.getItem(autolevelKey) ? localStorage.getItem(autolevelKey) : 50;
	if (gen == 3 || gen == 4) {
		$("#autolevel-box").val(storedLevel);
	} else {
		$("input:radio[id='autolevel" + storedLevel + "']").prop("checked", true);
	}
	if (localStorage.getItem("selectedFormat") != null) {
		switch (localStorage.getItem("selectedFormat") + "") {

		case "singles":
			$("#singles").prop("checked", true);
			break;

		case "doubles":
			$("#doubles").prop("checked", true);
			break;

		default:
			$("#doubles").prop("checked", true);
		}
	} else if (gen == 3 || gen == 4) {
		$("#singles").prop("checked", true);
	} else {
		$("#doubles").prop("checked", true);
	}
	$("#clear").prop("checked", true);
	$("#gscClear").prop("checked", true);
	$("#gravity").prop("checked", false);
	$("#srL").prop("checked", false);
	$("#srR").prop("checked", false);
	$("#spikesL0").prop("checked", true);
	$("#spikesR0").prop("checked", true);
	$("#gscSpikesL").prop("checked", false);
	$("#gscSpikesR").prop("checked", false);
	$("#reflectL").prop("checked", false);
	$("#reflectR").prop("checked", false);
	$("#lightScreenL").prop("checked", false);
	$("#lightScreenR").prop("checked", false);
	$("#leechSeedL").prop("checked", false);
	$("#leechSeedR").prop("checked", false);
	$("#helpingHandL").prop("checked", false);
	$("#helpingHandR").prop("checked", false);
	$("#chargeL").prop("checked", false);
	$("#chargeR").prop("checked", false);
	$("#powerSpotL").prop("checked", false);
	$("#powerSpotR").prop("checked", false);
	$("#friendGuardL").prop("checked", false);
	$("#friendGuardR").prop("checked", false);
	$("#batteryL").prop("checked", false);
	$("#batteryR").prop("checked", false);
	$("#clangL").prop("checked", false); // +1 All
	$("#clangR").prop("checked", false);
	$("#wpL").prop("checked", false);
	$("#wpR").prop("checked", false);
	$("#evoL").prop("checked", false); // +2 All
	$("#evoR").prop("checked", false);
	$("#steelySpiritL").prop("checked", false);
	$("#steelySpiritR").prop("checked", false);
	$("#faintedL").val(0);
	$("#faintedR").val(0);
	$("#ruinTabletsL").prop("checked", false);
	$("#ruinTabletsR").prop("checked", false);
	$("#ruinVesselL").prop("checked", false);
	$("#ruinVesselR").prop("checked", false);
	$("#ruinSwordL").prop("checked", false);
	$("#ruinSwordR").prop("checked", false);
	$("#ruinBeadsL").prop("checked", false);
	$("#ruinBeadsR").prop("checked", false);

	$("#startGimmick").prop("checked", false);
}

function getSetOptions() {
	let setOptions = [];
	let customSetOptions = [];
	Object.keys(pokedex).sort().forEach(function(pokeName) {
		if (pokedex[pokeName].hasBaseForme) {
			// do not do anything for additional formes
			return;
		}

		setOptions.push({ // bold species header, will be unselectable
			"pokemon": pokeName,
			"text": pokeName
		});
		if (pokeName in setdex) {
			for (const setName in setdex[pokeName]) {
				setOptions.push(setOptionsObject(pokeName, setName));
			}
		}
		if (pokeName in SETDEX_CUSTOM) {
			for (const setName in SETDEX_CUSTOM[pokeName]) {
				setOption = setOptionsObject(pokeName, setName);
				setOption.set = setOption.text; // the selectable text matches the display text
				customSetOptions.push(setOption);
			}
		}
		setOptions.push(setOptionsObject(pokeName, BLANK_SET));
	});

	if (customSetOptions.length > 0) {
		setOptions = [{"pokemon": "", "text": "Custom Sets"}, ...customSetOptions, ...setOptions];
	}

	return setOptions;
}

function setOptionsObject(pokeName, setName) {
	let text = pokeName + " (" + setName + ")";
	return {
		"pokemon": pokeName, // string used in searches
		"set": setName, // string that displays in the dropdown list
		"text": text, // string that displays in the selector
		"id": text
	};
}

function getSelectOptions(arr, sort, defaultIdx) {
	if (sort) {
		arr.sort();
	}
	var r = "";
	// Zero is of course falsy too, but this is mostly to coerce undefined.
	if (!defaultIdx) {
		defaultIdx = 0;
	}
	for (var i = 0; i < arr.length; i++) {
		if (i === defaultIdx) {
			r += '<option value="' + arr[i] + '" selected="selected">' + arr[i] + "</option>";
		} else {
			r += '<option value="' + arr[i] + '">' + arr[i] + "</option>";
		}
	}
	return r;
}

$(document).ready(function () {
	let localGameId = localStorage.getItem(LOCAL_SELECTED_GAME_KEY);
	let gameJQuery = !localGameId ? $(".game").last() : $("#game" + localGameId);
	if (gameJQuery.length > 0) {
		gameJQuery.prop("checked", true);
		gameJQuery.change();
	}
	//$(".terrain-trigger").bind("change keyup", getTerrainEffects);
	//$(".calc-trigger").bind("change keyup", calculate);
	$(".set-selector").select2({
		"formatResult": function (object) {
			return object.set ? "&nbsp;&nbsp;&nbsp;" + object.set : "<b>" + object.text + "</b>";
		},
		"query": function (query) {
			var setOptions = getSetOptions();
			var pageSize = 10000;
			var results = [];
			for (var i = 0; i < setOptions.length; i++) {
				var pokeName = setOptions[i].pokemon.toUpperCase();
				if (!query.term || pokeName.indexOf(query.term.toUpperCase()) === 0 || pokeName.includes("" + query.term.toUpperCase())) {
					results.push(setOptions[i]);
				}
			}
			query.callback({
				"results": results.slice((query.page - 1) * pageSize, query.page * pageSize),
				"more": results.length >= query.page * pageSize
			});
		},
		"initSelection": function (element, callback) {
			var data = getSetOptions()[1]; // skip over the unselectable first species name and display the name of the first set in the selector
			callback(data);
		}
	});
	$(".move-selector").select2({
		"dropdownAutoWidth": true,
		"matcher": function (term, text) {
			// 2nd condition is for Hidden Power
			return text.toUpperCase().indexOf(term.toUpperCase()) === 0 || text.toUpperCase().includes(" " + term.toUpperCase());
		}
	});
	//$(".set-selector").val(getSetOptions()[1].id); // load the first set after the unselectable species name
	//$(".set-selector").change();
});

var linkExtension = '.html';
