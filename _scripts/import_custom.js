var SETDEX_CUSTOM = {};
var showdownFormes = {
	"Kyurem-White": "Kyurem-W",
	"Kyurem-Black": "Kyurem-B",
	"Giratina-Origin": "Giratina-O",
	"Landorus-Therian": "Landorus-T",
	"Thundurus-Therian": "Thundurus-T",
	"Tornadus-Therian": "Tornadus-T",
	"Floette-Eternal": "Floette-E",
	"Wormadam-Sandy": "Wormadam-G",
	"Wormadam-Trash": "Wormadam-S",
	"Necrozma-Dusk-Mane": "Necrozma-Dusk Mane",
	"Necrozma-Dawn-Wings": "Necrozma-Dawn Wings",
	"Necrozma-Ultra": "Ultra Necrozma"
};
if (localStorage.getItem("custom") != null) {
	var SETDEX_CUSTOM = JSON.parse(localStorage.getItem("custom"));
}
var deletecustom = function () {
	if (confirm("Are you sure you want to delete all your custom sets?")) {
		SETDEX_CUSTOM = {};
		localStorage.removeItem("custom");
		setdexAll = setdex;
		alert("Custom sets deleted!");
	}
};

function migrateOldSets() {
	if (confirm("This will run a script that will attempt to migrate your old custom sets from cookies to localStorage. It may take some time and will not always work, and there is a small chance it will erase your current custom sets. Would you like to proceed?")) {
		if (readCookie("custom") != null) {
			var oldData = JSON.parse(readCookie("custom"));
			for (var i = 0; i < Object.keys(oldData).length; i++) {
				var species = (Object.keys(oldData)[i]);
				if (SETDEX_CUSTOM[species] == null) SETDEX_CUSTOM[species] = {};
				var setName = (Object.keys(oldData[species]));
				for (var j = 0; j < setName.length; j++) {
					SETDEX_CUSTOM[species][setName] = oldData[species][setName];
				}
			}
			localStorage.setItem("custom", JSON.stringify(SETDEX_CUSTOM));
			eraseCookie("custom");
			if (!alert("Success! Refreshing the page...")) {window.location.reload();}
		} else {
			alert("Aborted, no old custom set cookies found.");
		}
	}
}

function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		var expires = "; expires=" + date.toGMTString();
	} else var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name, "", -1);
}

var savecustom = function () {
	//first, to parse it all from the PS format
	let string = $("#customMon").val();
	let importArray = string.split("\n");
	let splitArr = ["0"];
	let monArr = [];
	let finalArr = [];
	//console.log(importArray);

	for (var i = 0; i < importArray.length; i++) {
		if (importArray[i] === "") {
			splitArr.push(i);
		}
		if (i === importArray.length - 1) {
			splitArr.push(i);
		}
	}

	for (var j = 0; j <= splitArr.length; j++) {
		var thisMon = [];
		for (var k = splitArr[j - 1]; k <= splitArr[j]; k++) {
			if (importArray[k] != "") {
				thisMon.push(importArray[k]);
			}
		}
		monArr.push(thisMon);
	}

	for (var l = 0; l < monArr.length; l++) {
		if (monArr[l].length > 0) {
			finalArr.push(monArr[l]);
		}
	}

	console.log(finalArr);

	for (var x = 0; x < finalArr.length; x++) {
		var spreadName = document.getElementById("spreadName").value;
		if (spreadName == "") {
			spreadName = "My Custom Set";
		}
		var lines = finalArr[x];
		var species = "";
		var forme = "";
		var item = "";
		var ability = "";
		var teraType = "";
		var level = localStorage.getItem("autolevelGen" + gen);
		if (!level) {
			level = "50";
		}
		var EVs = [0, 0, 0, 0, 0, 0];
		var IVs = [31, 31, 31, 31, 31, 31];
		var nature = "Serious";
		var moves = [];
		var isGmax = false;

		/*    Pokemon Showdown Export Format
		0    Nickname (Species) @ Item
		1    Ability: Name
		2    Level: #
		3    EVs: # Stat / # Stat / # Stat
		4    Serious Nature
		5    IVs: # Stat
		6    - Move Name
		7    - Move Name
		8    - Move Name
		9    - Move Name
		    */

		if (lines[0].indexOf("(M)") != -1) {
			lines[0] = lines[0].substring(0, lines[0].indexOf("(M)") - 1) +
		        lines[0].substring(lines[0].indexOf("(M)") + 3, lines[0].length);
		} else if (lines[0].indexOf("(F)") != -1) {
			lines[0] = lines[0].substring(0, lines[0].indexOf("(F)")) +
		        lines[0].substring(lines[0].indexOf("(F)") + 3, lines[0].length);
		}
		if (lines[0].indexOf("(") != -1) {
			firstParenth = lines[0].lastIndexOf("(");
			lastParenth = lines[0].lastIndexOf(")");
			species = lines[0].substring(firstParenth + 1, lastParenth).trim();
			spreadName = lines[0].substring(0, firstParenth-1).trim();
		} else {
			species = lines[0].split("@")[0].trim(); //species is always first
		}

		// How formes are handled:
		// Most Pokemon that have formes don't actually use the calc's forme system. Instead they are simply listed as separate species, which is easier to deal with.
		// Search for hasBaseForme in the pokedex to see what actually uses the forme system.

		// If something has a base forme, species gets set to the hasBaseForme in the forme's pokedex object.
		// This means that species will always be the simplest string: the name of the base species. Both for Pokemon that use the forme system and those that don't.
		// If something has a base forme, forme is set to the full string: "speciesName-formeSuffix". The way the forme object is named in the pokedex.
		// The set gets saved in localStorage custom with key species (which is hasBaseForme). Get the imported set object with SETDEX_CUSTOM[hasBaseForme][spreadName].
		// When the calc loads the set, if the custom set's forme is not "", then forme is used to load the correct pokedex object.

		// Megas have changed in how they are handled. Previously they only stored their base species name and mega stone item.
		// They would load as Mega if the item was their mega stone. The forme loading code still accommodates old Mega sets that were made before this forme import logic.
		// Currently each of the following Showdown format lines will correctly load as Mega when imported:
		// "baseSpecies-Mega @ Speciesite", "baseSpecies-Mega", "baseSpecies @ Speciesite"

		if (showdownFormes[species]) {
			species = showdownFormes[species];
		}

		if (species.endsWith("-Mega")) {
			species = "Mega " + species.substring(0, species.lastIndexOf("-Mega"));
			item = "";
		}

		if (species.toLowerCase().includes("vivillon")) {
			species = "Vivillon";
		}
		if (species.toLowerCase().includes("furfrou")) {
			species = "Furfrou";
		}

		if (species.includes("-Gmax")) {
			species = species.substring(0, species.lastIndexOf("-Gmax"));
			isGmax = true;
		}

		let dexEntry = pokedex[species];
		if (!dexEntry) {
			alert("Error: could not parse " + species + " as a valid species in the current Pokedex.");
			alert('Set not saved: "' + species + '"');
			return;
		}
		let baseForme = dexEntry.hasBaseForme;
		if (baseForme) {
			forme = species;
			species = baseForme;
		}

		if (lines[0].indexOf("@") != -1)
			item = lines[0].substring(lines[0].indexOf("@") + 1).trim(); //item is always after @
			if (oldItemNames[item]) {
				item = oldItemNames[item]; // if the item has an old name, convert it to the new name
			}
		if (lines.length > 1) {
			for (var i = 1; i < lines.length; ++i) {
				if (lines[i].indexOf("Ability") != -1) {
					ability = lines[i].substring(lines[i].indexOf(" ") + 1).trim();
				}
				if (lines[i].indexOf("Tera Type") != -1) {
					teraType = lines[i].split(":")[1].trim();
				}
				if (lines[i].indexOf("Level") != -1) {
					level = lines[i].split(" ")[1].trim(); //level is sometimes third but uh not always
				}
				if (lines[i].indexOf("EVs") != -1) { //If EVs are in this line
					evList = lines[i].split(":")[1].split("/"); //splitting it into a list of " # Stat "
					for (var j = 0; j < evList.length; ++j) {
						evList[j] = evList[j].trim();
						evListElements = evList[j].split(" ");
						if (evListElements[1] == "HP") {
							EVs[0] = parseInt(evListElements[0]);
						}	else {
							if (evListElements[1] == "Atk") {
								EVs[1] = parseInt(evListElements[0]);
							} else {
								if (evListElements[1] == "Def") {
									EVs[2] = parseInt(evListElements[0]);
								} else {
									if (evListElements[1] == "SpA") {
										EVs[3] = parseInt(evListElements[0]);
									} else {
										if (evListElements[1] == "SpD") {
											EVs[4] = parseInt(evListElements[0]);
										} else {
											if (evListElements[1] == "Spe") {
												EVs[5] = parseInt(evListElements[0]);
											}
										}
									}
								}
							}
						}
					}
				}
				if (lines[i].indexOf("IVs") != -1) { //if EVs are in this line
					ivList = lines[i].split(":")[1].split("/"); //splitting it into a list of " # Stat "
					for (var j = 0; j < ivList.length; ++j) {
						ivList[j] = ivList[j].trim();
						ivListElements = ivList[j].split(" ");
						if (ivListElements[1] == "HP")
							IVs[0] = parseInt(ivListElements[0]);
						else if (ivListElements[1] == "Atk")
							IVs[1] = parseInt(ivListElements[0]);
						else if (ivListElements[1] == "Def")
							IVs[2] = parseInt(ivListElements[0]);
						else if (ivListElements[1] == "SpA")
							IVs[3] = parseInt(ivListElements[0]);
						else if (ivListElements[1] == "SpD")
							IVs[4] = parseInt(ivListElements[0]);
						else if (ivListElements[1] == "Spe")
							IVs[5] = parseInt(ivListElements[0]);
					}

				}
				if (lines[i].indexOf("Nature") != -1) { //if nature is in this line
					nature = lines[i].split(" ")[0].trim();
				}
				if (lines[i].indexOf("- ") != -1) { //if there is a move in this line
					var nextMove = lines[i].substring(lines[i].indexOf(" ") + 1).trim();
					nextMove = nextMove.replace("[", "");
					nextMove = nextMove.replace("]", "");
					moves.push(nextMove);
				}

			}
		}

		if (rejectSet(species, spreadName)) {
			alert('Set not saved: "' + species + '"');
			return;
		}

		customFormat = {
			"level": level,
			"forme": forme,
			"evs": {
				"hp": EVs[0],
				"at": EVs[1],
				"df": EVs[2],
				"sa": EVs[3],
				"sd": EVs[4],
				"sp": EVs[5],
			},
			"ivs": {
				"hp": IVs[0],
				"at": IVs[1],
				"df": IVs[2],
				"sa": IVs[3],
				"sd": IVs[4],
				"sp": IVs[5],
			},
			"nature": nature,
			"ability": ability,
			"item": item,
			"moves": moves,
			"isGmax": isGmax,
			"teraType": teraType,
			"startDmax": gen == 8 && $("#startGimmick").prop("checked"),
			"startTera": gen == 9 && $("#startGimmick").prop("checked")
		};

		if (SETDEX_CUSTOM[species] == null) {
			SETDEX_CUSTOM[species] = {};
		}
		SETDEX_CUSTOM[species][spreadName] = customFormat;
		localStorage.setItem("custom", JSON.stringify(SETDEX_CUSTOM));
		if (setdexAll[species] == null) {
			setdexAll[species] = {};
		}
		setdexAll[species][spreadName] = customFormat;
		alert("Set saved: " + (forme ? forme : species));
	}
	// due to updating the dexes, refreshing shouldn't be necessary
	//alert("Please refresh your page to get your custom sets to show up!");
};

function rejectSet(species, spreadName) {
	if (!pokedex[species]) {
		alert("Error: something unexpected happened when parsing `" + species + "` as a species. Please contact Silver or Eisen with a screenshot including this popup and the calc.");
		return true;
	} else if (spreadName.toLowerCase() === BLANK_SET.toLowerCase()) {
		alert("Error: cannot use " + spreadName + " as a set name. Select a different spread name.");
		return true;
	} else if (isFacilitySet(species, spreadName)) {
		alert("Error: " + spreadName + " is already an AI set. Select a different spread name.");
		return true;
	} else if (pokedex[species].hasBaseForme) {
		// This error might come up if the pokedex has an entry with a forme of a forme.
		alert("Error: recognized " + species + " as an alternate forme, but did not parse it properly. Please contact Silver or Eisen with a screenshot including this popup and the calc.");
		return true;
	}
	return false;
}

$("document").ready(function () {
	if (readCookie("custom") == null) {
		$("#migrate").css("display", "none");
	}
});
