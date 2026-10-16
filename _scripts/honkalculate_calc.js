$.fn.DataTable.ColVis.prototype._fnDomColumnButton = function (i) {
	var
		that = this,
		column = this.s.dt.aoColumns[i],
		dt = this.s.dt;

	var title = this.s.fnLabel === null ?
		column.sTitle :
		this.s.fnLabel(i, column.sTitle, column.nTh);

	return $(
		'<li ' + (dt.bJUI ? 'class="ui-button ui-state-default"' : '') + '>' +
		'<label>' +
		'<input type="checkbox" />' +
		'<span>' + title + '</span>' +
		'</label>' +
		'</li>'
	)
		.click(function (e) {
			var showHide = !$('input', this).is(":checked");
			if (e.target.nodeName.toLowerCase() !== "li") {
				showHide = !showHide;
			}

			/* Need to consider the case where the initialiser created more than one table - change the
			 * API index that DataTables is using
			 */
			var oldIndex = $.fn.dataTableExt.iApiIndex;
			$.fn.dataTableExt.iApiIndex = that._fnDataTablesApiIndex();

			// Optimisation for server-side processing when scrolling - don't do a full redraw
			if (dt.oFeatures.bServerSide) {
				that.s.dt.oInstance.fnSetColumnVis(i, showHide, false);
				that.s.dt.oInstance.fnAdjustColumnSizing(false);
				if (dt.oScroll.sX !== "" || dt.oScroll.sY !== "") {
					that.s.dt.oInstance.oApi._fnScrollDraw(that.s.dt);
				}
				that._fnDrawCallback();
			} else {
				that.s.dt.oInstance.fnSetColumnVis(i, showHide);
			}

			$.fn.dataTableExt.iApiIndex = oldIndex; /* Restore */

			if ((e.target.nodeName.toLowerCase() === 'input' || e.target.nodeName.toLowerCase() === 'li') && that.s.fnStateChange !== null) {
				that.s.fnStateChange.call(that, i, showHide);
			}
		})[0];
};

$.fn.dataTableExt.oSort['damage100-asc'] = function (a, b) {
	return parseFloat(a) - parseFloat(b);
};
$.fn.dataTableExt.oSort['damage100-desc'] = function (a, b) {
	return parseFloat(b) - parseFloat(a);
};

$.fn.dataTableExt.oSort['damage48-asc'] = function (a, b) {
	return parseInt(a) - parseInt(b);
};
$.fn.dataTableExt.oSort['damage48-desc'] = function (a, b) {
	return parseInt(b) - parseInt(a);
};

$(".ability").bind("change", function () {
	let ability = $(this).val();
	if (ability in checkboxAbilities && checkboxAbilities[ability].mass) {
		$("#p1 .isActivated").prop("checked", true);
	}
});

// empty calculate() so that shared_calc functions don't have to have a special exception in mass calc mode.
function calculate() {}

function MassPokemon(speciesName, setName) {
	let pokemon = pokedex[speciesName];
	let set = setdex[speciesName][setName];
	let formeNum = getFormeNum(setName, speciesName);
	if (formeNum != 0) {
		pokemon = pokedex[pokemon.formes[formeNum]];
	}
	let autoLevel = parseInt(localStorage.getItem(LOCAL_AUTOLEVEL_KEY_PREFIX + gameId));
	let massPoke = {
		"name": speciesName,
		"setName": setName,
		"type1": pokemon.t1,
		"type2": pokemon.t2 && typeof pokemon.t2 !== "undefined" ? pokemon.t2 : "",
		"rawStats": [],
		"boosts": [],
		"stats": [],
		"evs": [],
		"level": set.level ? set.level : (autoLevel ? autoLevel : 50),
		"HPEVs": set.evs && typeof set.evs.hp !== "undefined" ? set.evs.hp : 0,
		"nature": set.nature,
		"ability": set.ability && typeof set.ability !== "undefined" ? set.ability :
		(pokemon.ab && typeof pokemon.ab !== "undefined" ? pokemon.ab :
		(pokemon.abilities && pokemon.abilities.length == 1 ? pokemon.abilities[0] : "")),
		"item": set.item && typeof set.item !== "undefined" &&
		(set.item === "Eviolite" || !(set.item.endsWith("ite") && set.item.endsWith("ite X") && set.item.endsWith("ite Y"))) ? set.item : "",
		"status": "Healthy",
		"toxicCounter": 0,
		"moves": [],
		//"baseMoveNames" goes unused by MassPokemon
		"weight": pokemon.w,
		"tier": set.tier,
		"hasType": function (type) { return this.type1 === type || this.type2 === type; },
		// Reset this mon's stat stages to 0 and clear the stats.
		"revertStats": function () {
			Object.keys(this.boosts).forEach(stat => { this.boosts[stat] = 0; });
			this.stats = [];
		},
		// Reset this mon's current ability subject to Neutralizing Gas
		// This is designed to be called once before calcs and after calcing each move as defender. Do not call this in MassPokemon object creation
		"resetCurAbility": function () { this.curAbility = (isNeutralizingGas && this.item !== "Ability Shield") ? "" : this.ability }
	};
	// maxHP
	let autoIVs = gen == 4 ? parseInt($("#autoivs-center #autoivs-box").val()) : (gen <= 7 ? parseInt($("#autoivs-center #autoivs-select").find(":selected").val()) : 31);
	if (isNaN(autoIVs)) {
		autoIVs = 31;
	}
	if (pokemon.bs.hp === 1) {
		massPoke.maxHP = 1;
	} else {
		let HPIVs = set.ivs && typeof set.ivs.hp !== "undefined" ? set.ivs.hp : autoIVs;
		// ~~ is used as a faster Math.floor() for positive numbers
		massPoke.maxHP = ~~((pokemon.bs.hp * 2 + HPIVs + ~~(massPoke.HPEVs / 4)) * massPoke.level / 100) + massPoke.level + 10;
		if (set.startDmax) {
			// assume a dynamax level of 0 for all AI mons
			massPoke.maxHP = ~~(massPoke.maxHP * 1.5);
		}
	}
	// curHP
	massPoke.curHP = massPoke.maxHP;
	// stats
	for (let n = 0; n < STATS.length; n++) {
		let stat = STATS[n];
		massPoke.boosts[stat] = 0;
		massPoke.evs[stat] = set.evs && typeof set.evs[stat] !== "undefined" ? set.evs[stat] : 0;
		let ivs = set.ivs && typeof set.ivs[stat] !== "undefined" ? set.ivs[stat] : autoIVs;
		let natureMods = NATURES[massPoke.nature];
		let nature = natureMods[0] === stat ? 1.1 : natureMods[1] === stat ? 0.9 : 1;
		massPoke.rawStats[stat] = ~~((~~((pokemon.bs[stat] * 2 + ivs + ~~(massPoke.evs[stat] / 4)) * massPoke.level / 100) + 5) * nature);
	}
	// moves
	for (let n = 0; n < 4; n++) {
		let moveName = set.moves[n];
		let hiddenPower = null;
		if (moveName === "Hidden Power") {
			let ivs = {};
			["hp"].concat(STATS).forEach(stat => { ivs[stat] = set.ivs && typeof set.ivs[stat] !== "undefined" ? set.ivs[stat] : autoIVs; });
			hiddenPower = getHiddenPower(ivs);
			moveName = hiddenPower.name;
		}
		let defaultDetails = moves[moveName] || moves["(No Move)"];
		if (hiddenPower) {
			defaultDetails = $.extend({}, defaultDetails, {"bp": hiddenPower.bp});
		}
		if (gameId == 7 && defaultDetails.zp && defaultDetails.type && defaultDetails.type !== "None" &&
			massPoke.item.endsWith(" Z") && massPoke.item.startsWith(defaultDetails.type.substring(0, defaultDetails.type.length - 1))) {
			massPoke.moves.push(getZMove(moveName, massPoke, defaultDetails));
		} else if (gameId == 8 && set.startDmax) {
			massPoke.moves.push(getMaxMove(moveName, massPoke, defaultDetails));
		} else {
			massPoke.moves.push($.extend({}, defaultDetails, {
				"name": moveName,
				"bp": defaultDetails.bp,
				"type": defaultDetails.type,
				"category": defaultDetails.category,
				"isCrit": !!defaultDetails.alwaysCrit,
				"acc": defaultDetails.acc,
				"hits": defaultDetails.isThreeHit ? 3 : defaultDetails.isTwoHit ? 2 : getDefaultMultiHits(moveName, massPoke.ability, massPoke.item),
				"usedTimes": 1
			}));
		}
	}
	// use the same default state as the user's Pokemon's checkbox
	massPoke.isAbilityActivated = checkboxAbilities[massPoke.ability] ? checkboxAbilities[massPoke.ability].mass : false;

	return massPoke;
}

function performCalculations() {
	var attacker, defender, setPoke, setTier;
	var selectedTier = getSelectedTier(); // selectedTier can be: All, threshold, Hall, HallR10, Tower, RS, SM, DM.  *SM and DM are Singles and Doubles Master
	var dataSet = [];
	var userPoke = new Pokemon($("#p1"));
	userPoke.startingBoosts = [];
	// after each MassPokemon is calc'd against, reset the user's mon's stat stages to what the user set them to and clear the stats
	STATS.forEach(stat => { userPoke.startingBoosts[stat] = userPoke.boosts[stat]; });
	userPoke.revertStats = function () {
		Object.keys(this.boosts).forEach(stat => { this.boosts[stat] = this.startingBoosts[stat] });
		this.stats = [];
	};
	let userNeutralizingGas = userPoke.ability === "Neutralizing Gas";
	let autoLevel = $("#autolevel-box").val();
	if (mode === "one-vs-all") {
		attacker = userPoke;
	} else {
		defender = userPoke;
	}
	var field = new Field();
	var startingWeather = field.getWeather();

	let setSpecies = Object.keys(setdex);
	let ohkoCount = 0;
	for (let speciesName of setSpecies) {
		let setNames = Object.keys(setdex[speciesName]);
		for (let setName of setNames) {
			setPoke = MassPokemon(speciesName, setName);
			setTier = setPoke.tier; // setPoke.tier can be: 50, Open, Hall, HallR10, 28, 40, Tower, RS, SM, DM, SMDM. A set might not have a tier key.
			if (gen == 3 && selectedTier === "threshold" && setTier === "Open" && autoLevel !== "50") {
				// let set be calculated for open level
				// threshold checks for 50+
			} else if (gen == 4 && selectedTier === "All" && setTier && setTier.includes("Hall")) {
				continue;
			} else if (selectedTier === "All" || (setTier && setTier.includes(selectedTier)) || (selectedTier === "threshold" && parseInt(setTier))) {
				// let set be calculated
			} else {
				continue;
			}

			if (mode === "one-vs-all") {
				defender = setPoke;
			} else {
				attacker = setPoke;
			}
			// apply Neutralizing Gas if applicable
			isNeutralizingGas = userNeutralizingGas || setPoke.ability === "Neutralizing Gas";
			userPoke.resetCurAbility();
			setPoke.resetCurAbility();

			let damageResults = calculateMovesOfAttacker(attacker, defender, field);
			let data = {
				setName: setName,
				move: "(No Move)",
				percentRange: "0 - 0%",
				koChance: "nice move",
				speed: setPoke.stats[SP],
				type1: setPoke.type1,
				type2: setPoke.type2 ? setPoke.type2 : ""
			};
			let result;
			let maxDamage;
			let highestDamage = 0;
			let highestDamageMinRange = 0;
			let highestN = 0;
			for (let n = 0; n < 4; n++) {
				result = damageResults[n];
				let moveHits = attacker.moves[n].hits;
				minDamage = getMinMaxDamage(result, moveHits);
				maxDamage = getMinMaxDamage(result, moveHits, true);
				// four cases (without expanding to include <=/>=):
				// > min, > max (better move)
				// < min, > max (I guess multihits? This would also come up if s toss was the max and min)
				// > min, < max (s toss)
				// < min, < max (worse move)
				// I think the cases other than the two below can be ignored
				if ((minDamage >= highestDamageMinRange && maxDamage > highestDamageMinRange) ||
					(minDamage > highestDamageMinRange && maxDamage <= highestDamageMinRange)) {
					highestDamage = maxDamage;
					highestDamageMinRange = minDamage;
					highestN = n;
				}
			}
			if (highestDamage) {
				result = damageResults[highestN];
				let move = attacker.moves[highestN];
				let moveHits = result.childDamage ? 2 : move.hits; // this is placeholder.
				let mainDamageInfo = DamageInfo(result, moveHits);
				let firstHitDamageInfo = result.firstHitDamage ? DamageInfo(result, moveHits, true) : mainDamageInfo;
				if (move.noKOChance) {
					data.koChance = "-";
				} else {
					// do not want to pass child damage as 2 hits here, at least for now until KO text can figure out parental bond damage
					setKOChanceText(result, move, move.hits, attacker, defender, field.getSide(~~(mode === "one-vs-all")), mainDamageInfo, firstHitDamageInfo);
					data.koChance = result.koChanceText ? result.koChanceText : "Did not get koChanceText";
				}
				let minPercentage = Math.round(firstHitDamageInfo.min * 1000 / defender.maxHP) / 10;
				let maxPercentage = Math.round(firstHitDamageInfo.max * 1000 / defender.maxHP) / 10;
				data.percentRange = minPercentage + " - " + maxPercentage + "%";
				data.move = move.name.replace("Hidden Power", "HP");
				// let setKOChanceText() do the math of whether something got the OHKO after hazards etc.
				if ((mode === "one-vs-all" && data.koChance === "guaranteed OHKO") ||
					(mode === "all-vs-one" && data.koChance.includes("OHKO"))) {
					ohkoCount++;
				}
			}

			dataSet.push(data);
			// fields in the boosts and stats objects should be the only things that get changed in the Pokemon object during mass calc
			attacker.revertStats();
			defender.revertStats();
			// the only Field object "property" that can be modified is weather
			field.setWeather(startingWeather);
		}
	}
	table.rows.add(dataSet).draw();
	return { setsCount: dataSet.length, ohkoCount: ohkoCount };
}

function getMinMaxDamage(result, moveHits, getMax = false) {
	let total = 0;
	if (result.tripleAxelDamage) {
		for (let i = 0; i < result.tripleAxelDamage.length; i++) {
			let damageArray = result.tripleAxelDamage[i];
			total += damageArray[getMax ? (damageArray.length - 1) : 0];
		}
		return total;
	}

	if (result.firstHitDamage) {
		total += result.firstHitDamage[getMax ? (result.firstHitDamage.length - 1) : 0];
	} else {
		total += result.damage[getMax ? (result.damage.length - 1) : 0];
	}
	total *= moveHits;

	if (result.childDamage) {
		total += result.childDamage[getMax ? (result.childDamage.length - 1) : 0];
	}

	return total;
}

function getSelectedTier() {
	return $("input[name=tier]:checked").attr('id'); // assumes exactly one of the the tier buttons is selected
}

var calculateMovesOfAttacker;
$(".game").change(function () {
	adjustTierBorderRadius();
	let defaultChecked = "#All";
	let thresholdLabel = "";
	calculateMovesOfAttacker = CALCULATE_MOVES_OF_ATTACKER_MODERN;
	switch (gameId) {
	case 3:
		calculateMovesOfAttacker = CALCULATE_MOVES_OF_ATTACKER_ADV;
		thresholdLabel = "50+";
		break;
	case 4:
		calculateMovesOfAttacker = CALCULATE_MOVES_OF_ATTACKER_PTHGSS;
		thresholdLabel = "50+";
		break;
	case 5:
		thresholdLabel = "28+";
		break;
	case 6:
		thresholdLabel = "40+";
		break;
	case 7:
		thresholdLabel = "40+";
		break;
	case 8:
		defaultChecked = "#RS";
		break;
	case 80:
	case 9:
	default:
		break;
	}
	$(defaultChecked).prop("checked", true);
	if (thresholdLabel) {
		$("#threshold").next("label").text(thresholdLabel);
	}
	$("#ohkoCounter").text("");
	if ($.fn.DataTable.isDataTable("#holder-2")) {
		table.clear();
		constructDataTable();
		placeBsBtn();
	}
});

const squaredRightCorner = { "border-top-right-radius": 0, "border-bottom-right-radius": 0 };
const roundedRightCorner = { "border-top-right-radius": "8px", "border-bottom-right-radius": "8px" };
const squaredLeftCorner = { "border-top-left-radius": 0, "border-bottom-left-radius": 0 };
const roundedLeftCorner = { "border-top-left-radius": "8px", "border-bottom-left-radius": "8px" };
function adjustTierBorderRadius() {
	 // Used to round the tier buttons to appear like the gens or mode buttons
	if (gameId == 3 || gameId == 5 || gameId == 6 || gameId == 7) {
		$("#All").next("label").css(squaredRightCorner);
		$("#threshold").next("label").css(roundedRightCorner);
	}
	else if (gameId == 4) {
		$("#All").next("label").css(squaredRightCorner);
		$("#threshold").next("label").css(squaredRightCorner);
		$("#HallR10").next("label").css(roundedRightCorner);
	}
	else if (gameId == 8) {
		$("#RS").next("label").css(roundedLeftCorner);
		$("#Tower").next("label").css(roundedRightCorner);
	}
	else if (gameId == 80) {
		$("#All").next("label").css(squaredRightCorner);
		$("#DM").next("label").css(roundedRightCorner);
	}
	else {
		$("#All").next("label").css(roundedRightCorner);
	}
}

var table;
function constructDataTable() {
	table = $("#holder-2").DataTable({
		destroy: true,
		columnDefs: [
			{ // Sort KO Chance by damage% instead
				orderData: [2], // percentRange = col 2
				targets: 3 // koChance = col 3
			},
			{
				width: "5%", // this gives the column a small width
				targets: 4 // speed = col 4
			}
		],
		columns: [
			{ data: 'setName' },
			{ data: "move" },
			{ data: 'percentRange', type: "damage100" }, // type specifies that this column is sorted via the damage100 functions
			{ data: 'koChance' },
			{ data: 'speed' },
			{ data: 'type1', visible: false, searchable: false },
			{ data: 'type2', visible: false, searchable: false }
		],
		rowCallback: function(row, data, index) {
			let userSpeed = parseInt($(".totalMod").text());
			let massSpeed = data["speed"];
			if (parseInt($(".sp .ivs").val()) <= 7) {
				if (massSpeed > userSpeed) {
					return;
				}
			} else {
				if (massSpeed < userSpeed) {
					return;
				}
			}
			// speed is col 4
			$(row).find("td:eq(4)").css({
				"color": massSpeed === userSpeed ? "gold" : "#F02020",
				"font-weight": "bold"
			});
		},
		dom: 'frti',
		/*colVis: { The options that allows selection of which columns to include in the table
			exclude: (gen > 2) ? [0, 1, 2] : (gen === 2) ? [0, 1, 2, 7] : [0, 1, 2, 7, 8],
			stateChange: function (iColumn, bVisible) {
				var column = table.settings()[0].aoColumns[iColumn];
				if (column.bSearchable !== bVisible) {
					column.bSearchable = bVisible;
					table.rows().invalidate();
				}
			}
		},*/
		paging: false,
		scrollX: Math.floor(dtWidth / 100) * 100, // round down to nearest hundred
		scrollY: dtHeight,
		scrollCollapse: true
	});
	$(".dataTables_wrapper").css({"max-width": dtWidth});
}

function placeBsBtn() {
	var honkalculator = "<button id='honkalculate' style='position:relative;margin-top:7px;font-size:larger' class='btn btn-fit'>Mass Calc</button>";
	$("#holder-2_wrapper").prepend(honkalculator);
	$("#honkalculate").click(function () {
		table.clear();
		let startTime = performance.now();
		let massCalcInfo = performCalculations();
		let endTime = performance.now();
		console.log("honkalculated " + massCalcInfo.setsCount + " sets in " + Math.round(endTime - startTime) + "ms");
		$("#ohkoCounter").text("OHKOs: " + Math.round(massCalcInfo.ohkoCount * 100 / massCalcInfo.setsCount) + "% (" + massCalcInfo.ohkoCount + "/" + massCalcInfo.setsCount + ")");
	});
}

/*$(".mode").change(function () {
	if ($("#one-vs-one").prop("checked")) {
		var params = new URLSearchParams(window.location.search);
		params.delete('mode');
		params = '' + params;
		window.location.replace();
	}
 	else {
		var params = new URLSearchParams(window.location.search);
		params.set('mode', $(this).attr("id"));
		window.location.replace('honkalculate' + linkExtension + '?' + params);
	}
});*/

$(".mode").change(function () {
	if ($("#one-vs-one").prop("checked")) {
		window.location.href = "/";
	} else {
		window.location.replace('honkalculate' + linkExtension + '?mode=' + $(this).attr("id"));
	}
});

$(".tiers label").mouseup(function () {
	var oldID = $('.tiers input:checked').attr("id");
	var newID = $(this).attr("for");
	/*if ((oldID === "Doubles" || startsWith(oldID, "VGC")) && (newID !== oldID)) {
		$("#singles-format").attr("disabled", false);
		$("#singles-format").prop("checked", true);
	}
	if ((startsWith(oldID, "VGC") || oldID === "LC") && (!startsWith(newID, "VGC") && newID !== "LC")) {
		setLevel("100");
	}*/
});

$(".tiers input").change(function () {
	var type = $(this).attr("type");
	var id = $(this).attr("id");
	//$(".tiers input").not(":" + type).prop("checked", false); // deselect all radios if a checkbox is checked, and vice-versa
});

function setLevel(lvl) {
	$('.level').val(lvl);
	$('.level').keyup();
	$('.level').popover({
		content: "Level has been set to " + lvl,
		placement: "right"
	}).popover('show');
	setTimeout(function () { $('.level').popover('destroy'); }, 1350);
}

$(".set-selector").change(function (e) {
	var format = getSelectedTier();
});

function calcDTDimensions() {
	$("#holder-2").DataTable({
		dom: 'frti'
	});

	var theadBottomOffset = getBottomOffset($(".sorting"));
	var heightUnderDT = getBottomOffset($(".holder-0")) - getBottomOffset($("#holder-2 tbody"));
	dtHeight = $(document).height() - theadBottomOffset - heightUnderDT;
}

function getBottomOffset(obj) {
	return obj.offset().top + obj.outerHeight();
}

$(".isActivated").bind("change", function () {
	setDisplayedSpeed();
});

function setDisplayedSpeed() {
	$(".totalMod").text(getFinalSpeed(new Pokemon($("#p1")), {}, new Field()));
}

var dtHeight, dtWidth;
$(document).ready(function () {
	var params = new URLSearchParams(window.location.search);
	window.mode = params.get("mode");
	if (window.mode) {
		if (window.mode === "one-vs-one") {
			window.location.replace("");
		}
		else if (window.mode !== "one-vs-all" && window.mode !== "all-vs-one") {
			window.mode = "one-vs-all";
			window.location.replace("honkalculate" + linkExtension + "?mode=" + window.mode);
		}
	} else {
		window.mode = "one-vs-all";
	}
	$("#" + mode).prop("checked", true);

	$("#holder-2 th:first").text((mode === "one-vs-all") ? "Defender" : "Attacker");
	$("#holder-2").show();

	calcDTDimensions();
	constructDataTable();
	placeBsBtn();

	$(".calc-trigger").bind("change keyup", setDisplayedSpeed);
	setDisplayedSpeed();
});
