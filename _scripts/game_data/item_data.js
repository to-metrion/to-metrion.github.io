var ITEMS_GSC = [
	"Berry",
	"Berry Juice",
	"Black Belt",
	"Black Glasses",
	"Charcoal",
	"Dragon Fang",
	"Gold Berry",
	"Hard Stone",
	"King's Rock",
	"Leek",
	"Leftovers",
	"Light Ball",
	"Lucky Punch",
	"Magnet",
	"Metal Coat",
	"Metal Powder",
	"Miracle Seed",
	"Mystic Water",
	"Never-Melt Ice",
	"Pink Bow",
	"Poison Barb",
	"Polkadot Bow",
	"Sharp Beak",
	"Silver Powder",
	"Soft Sand",
	"Spell Tag",
	"Stick",
	"Thick Club",
	"Twisted Spoon"
];

var ITEMS_ADV = ITEMS_GSC.concat([
	"Aguav Berry",
	"Apicot Berry",
	"Aspear Berry",
	"Bright Powder",
	"Cheri Berry",
	"Chesto Berry",
	"Choice Band",
	"Deep Sea Scale",
	"Deep Sea Tooth",
	"Enigma Berry",
	"Figy Berry",
	"Focus Band",
	"Ganlon Berry",
	"Iapapa Berry",
	"Lansat Berry",
	"Lax Incense",
	"Leppa Berry",
	"Liechi Berry",
	"Lum Berry",
	"Macho Brace",
	"Mago Berry",
	"Mental Herb",
	"Quick Claw",
	"Oran Berry",
	"Pecha Berry",
	"Persim Berry",
	"Petaya Berry",
	"Rawst Berry",
	"Salac Berry",
	"Sea Incense",
	"Scope Lens",
	"Shell Bell",
	"Silk Scarf",
	"Sitrus Berry",
	"Soul Dew",
	"Starf Berry",
	"White Herb",
	"Wiki Berry"
]);

ITEMS_ADV.splice(ITEMS_ADV.indexOf("Berry"), 1);
ITEMS_ADV.splice(ITEMS_ADV.indexOf("Gold Berry"), 1);
ITEMS_ADV.splice(ITEMS_ADV.indexOf("Pink Bow"), 1);
ITEMS_ADV.splice(ITEMS_ADV.indexOf("Polkadot Bow"), 1);

var PLATES = [
	"Fist Plate",
	"Sky Plate",
	"Toxic Plate",
	"Earth Plate",
	"Stone Plate",
	"Insect Plate",
	"Spooky Plate",
	"Iron Plate",
	"Flame Plate",
	"Splash Plate",
	"Meadow Plate",
	"Zap Plate",
	"Mind Plate",
	"Icicle Plate",
	"Draco Plate",
	"Dread Plate"
];

var ITEMS_DPP = ITEMS_ADV.concat([
	"Adamant Orb",
	"Babiri Berry",
	"Belue Berry",
	"Big Root",
	"Black Sludge",
	"Charti Berry",
	"Chilan Berry",
	"Choice Scarf",
	"Choice Specs",
	"Chople Berry",
	"Coba Berry",
	"Colbur Berry",
	"Custap Berry",
	"Damp Rock",
	"Destiny Knot",
	"Durin Berry",
	"Expert Belt",
	"Flame Orb",
	"Focus Sash",
	"Full Incense",
	"Grip Claw",
	"Griseous Orb",
	"Haban Berry",
	"Heat Rock",
	"Icy Rock",
	"Iron Ball",
	"Jaboca Berry",
	"Kasib Berry",
	"Kebia Berry",
	"Lagging Tail",
	"Life Orb",
	"Light Clay",
	"Lustrous Orb",
	"Metronome",
	"Micle Berry",
	"Muscle Band",
	"Occa Berry",
	"Odd Incense",
	"Passho Berry",
	"Payapa Berry",
	"Power Herb",
	"Quick Powder",
	"Razor Claw",
	"Razor Fang",
	"Rindo Berry",
	"Rock Incense",
	"Rose Incense",
	"Rowap Berry",
	"Shed Shell",
	"Shuca Berry",
	"Smooth Rock",
	"Sticky Barb",
	"Tanga Berry",
	"Toxic Orb",
	"Wacan Berry",
	"Watmel Berry",
	"Wave Incense",
	"Wide Lens",
	"Wise Glasses",
	"Yache Berry",
	"Zoom Lens"
],
PLATES);

var DRIVES = [
	"Burn Drive",
	"Chill Drive",
	"Douse Drive",
	"Shock Drive"
];

var ITEMS_BW = ITEMS_DPP.concat([
	"Absorb Bulb",
	"Air Balloon",
	"Binding Band",
	"Cell Battery",
	"Eject Button",
	"Eviolite",
	"Float Stone",
	"Icy Rock",
	"Normal Gem",
	"Red Card",
	"Ring Target",
	"Rocky Helmet"
],
DRIVES);

var ITEMS_XY = ITEMS_BW.concat([
	"Assault Vest",
	"Kee Berry",
	"Luminous Moss",
	"Maranga Berry",
	"Roseli Berry",
	"Safety Goggles",
	"Snowball",
	"Weakness Policy"
]);

const PIXIE_PLATE = "Pixie Plate";
[ITEMS_XY, PLATES].forEach(itemSet => { itemSet.push(PIXIE_PLATE); });

var ITEMS_SM = ITEMS_XY.concat([
	"Adrenaline Orb",
	"Protective Pads",
	"Terrain Extender",
	"Electric Seed",
	"Psychic Seed",
	"Misty Seed",
	"Grassy Seed"
]);

// Big Nugget is 130 Fling BP without the side effects of Heavy Ball.
// It also consolidates Overheat and Leaf Storm TR items.
var ITEMS_SS = ITEMS_SM.concat([
	"Big Nugget",
	"Blunder Policy",
	"Eject Pack",
	"Heavy-Duty Boots",
	"Room Service",
	"Throat Spray",
	"Utility Umbrella"
]);

var ITEMS_BDSP = ITEMS_DPP.concat(PIXIE_PLATE);

var ITEMS_SV = ITEMS_SS.concat([
	"Booster Energy",
	"Ability Shield",
	"Clear Amulet",
	"Mirror Herb",
	"Punching Glove",
	"Covert Cloak",
	"Loaded Dice",
	"Griseous Core",
	"Adamant Crystal",
	"Lustrous Globe",
	"Fairy Feather",
	"Wellspring Mask",
	"Hearthflame Mask",
	"Cornerstone Mask"
]);


// Gen-exclusive items
var NON_NORMAL_GEMS = [
	"Bug Gem",
	"Dark Gem",
	"Dragon Gem",
	"Electric Gem",
	"Fighting Gem",
	"Fire Gem",
	"Flying Gem",
	"Ghost Gem",
	"Grass Gem",
	"Ground Gem",
	"Ice Gem",
	"Poison Gem",
	"Psychic Gem",
	"Rock Gem",
	"Steel Gem",
	"Water Gem"
];

var Z_CRYSTALS = [
	"Normalium Z",
	"Grassium Z",
	"Firium Z",
	"Waterium Z",
	"Electrium Z",
	"Icium Z",
	"Flyinium Z",
	"Buginium Z",
	"Poisonium Z",
	"Groundium Z",
	"Rockium Z",
	"Fightinium Z",
	"Psychium Z",
	"Ghostium Z",
	"Dragonium Z",
	"Darkinium Z",
	"Steelium Z",
	"Fairium Z",
	"Decidium Z",
	"Incinium Z",
	"Primarium Z",
	"Snorlium Z",
	"Aloraichium Z",
	"Mewnium Z",
	"Tapunium Z",
	"Mimikium Z",
	"Ultranecrozium Z",
	"Solganium Z",
	"Lunalium Z",
	"Lycanium Z",
	"Kommonium Z",
	"Marshadium Z"
];

ITEMS_BW = ITEMS_BW.concat(NON_NORMAL_GEMS);

ITEMS_SM = ITEMS_SM.concat(Z_CRYSTALS);

// Remove Plates from an item array.
for (let itemSet of [ITEMS_SS]) {
	for (let plate of PLATES) {
		itemSet.splice(itemSet.indexOf(plate), 1);
	}
}

ITEMS_SS.push(PIXIE_PLATE); // SwSh specially includes only the Pixie Plate.

// Remove Drives from an item array.
for (let itemSet of [ITEMS_SV]) {
	for (let drive of DRIVES) {
		itemSet.splice(itemSet.indexOf(drive), 1);
	}
}

function getTechnoBlast(item) {
	switch (item) {
	case "Burn Drive":
		return "Fire";
	case "Chill Drive":
		return "Ice";
	case "Douse Drive":
		return "Water";
	case "Shock Drive":
		return "Electric";
	default:
		return "Normal";
	}
}

function getItemBoostType(item) {
	switch (item) {
	case "Draco Plate":
	case "Dragon Fang":
		return "Dragon";
	case "Dread Plate":
	case "Black Glasses":
		return "Dark";
	case "Earth Plate":
	case "Soft Sand":
		return "Ground";
	case "Fist Plate":
	case "Black Belt":
		return "Fighting";
	case "Flame Plate":
	case "Charcoal":
		return "Fire";
	case "Icicle Plate":
	case "Never-Melt Ice":
		return "Ice";
	case "Insect Plate":
	case "Silver Powder":
		return "Bug";
	case "Iron Plate":
	case "Metal Coat":
		return "Steel";
	case "Meadow Plate":
	case "Rose Incense":
	case "Miracle Seed":
		return "Grass";
	case "Mind Plate":
	case "Odd Incense":
	case "Twisted Spoon":
		return "Psychic";
	case "Pixie Plate":
	case "Fairy Feather":
		return "Fairy";
	case "Sky Plate":
	case "Sharp Beak":
		return "Flying";
	case "Splash Plate":
	case "Sea Incense":
	case "Wave Incense":
	case "Mystic Water":
		return "Water";
	case "Spooky Plate":
	case "Spell Tag":
		return "Ghost";
	case "Stone Plate":
	case "Rock Incense":
	case "Hard Stone":
		return "Rock";
	case "Toxic Plate":
	case "Poison Barb":
		return "Poison";
	case "Zap Plate":
	case "Magnet":
		return "Electric";
	case "Silk Scarf":
	case "Pink Bow":
	case "Polkadot Bow":
		return "Normal";
	default:
		return "";
	}
}

function getBerryResistType(berry) {
	switch (berry) {
	case "Chilan Berry":
		return "Normal";
	case "Occa Berry":
		return "Fire";
	case "Passho Berry":
		return "Water";
	case "Wacan Berry":
		return "Electric";
	case "Rindo Berry":
		return "Grass";
	case "Yache Berry":
		return "Ice";
	case "Chople Berry":
		return "Fighting";
	case "Kebia Berry":
		return "Poison";
	case "Shuca Berry":
		return "Ground";
	case "Coba Berry":
		return "Flying";
	case "Payapa Berry":
		return "Psychic";
	case "Tanga Berry":
		return "Bug";
	case "Charti Berry":
		return "Rock";
	case "Kasib Berry":
		return "Ghost";
	case "Haban Berry":
		return "Dragon";
	case "Colbur Berry":
		return "Dark";
	case "Babiri Berry":
		return "Steel";
	case "Roseli Berry":
		return "Fairy";
	default:
		return "";
	}
}

function getFlingPower(item) {
	if (item.includes("Plate")) {
		return 90;
	}
	switch (item) {
		case "Iron Ball":
		case "Big Nugget":
			return 130;
		case "Hard Stone":
		case "Room Service":
			return 100;
		case "Deep Sea Tooth":
		case "Grip Claw":
		case "Thick Club":
			return 90;
		case "Assault Vest":
		case "Blunder Policy":
		case "Heavy-Duty Boots":
		case "Quick Claw":
		case "Razor Claw":
		case "Safety Goggles":
		case "Sticky Barb":
		case "Weakness Policy":
			return 80;
		case "Dragon Fang":
		case "Poison Barb":
			return 70;
		case "Stick":
			return 60;
		case "Adamant Orb":
		case "Damp Rock":
		case "Griseous Orb":
		case "Heat Rock":
		case "Leek":
		case "Lustrous Orb":
		case "Macho Brace":
		case "Rocky Helmet":
		case "Terrain Extender":
		case "Utility Umbrella":
			return 60;
		case "Sharp Beak":
			return 50;
		case "Icy Rock":
		case "Lucky Punch":
			return 40;
		case "Toxic Orb":
		case "Flame Orb":
		case "Light Ball":
		case "King's Rock":
		case "Razor Fang":
		case "Berry Juice":
		case "Black Belt":
		case "Black Glasses":
		case "Black Sludge":
		case "Charcoal":
		case "Deep Sea Scale":
		case "Life Orb":
		case "Light Clay":
		case "Magnet":
		case "Metal Coat":
		case "Metronome":
		case "Miracle Seed":
		case "Mystic Water":
		case "Never-Melt Ice":
		case "Scope Lens":
		case "Shell Bell":
		case "Soul Dew":
		case "Spell Tag":
		case "Twisted Spoon":
			return 30;
	}
	return 10;
}

var NATURAL_GIFT_STATS = {
	"Aguav Berry": {"t": "Dragon", "p": 80},
	"Apicot Berry": {"t": "Ground", "p": 100},
	"Aspear Berry": {"t": "Ice", "p": 80},
	"Babiri Berry": {"t": "Steel", "p": 80},
	"Belue Berry": {"t": "Electric", "p": 100},
	"Charti Berry": {"t": "Rock", "p": 80},
	"Cheri Berry": {"t": "Fire", "p": 80},
	"Chesto Berry": {"t": "Water", "p": 80},
	"Chilan Berry": {"t": "Normal", "p": 80},
	"Chople Berry": {"t": "Fighting", "p": 80},
	"Coba Berry": {"t": "Flying", "p": 80},
	"Colbur Berry": {"t": "Dark", "p": 80},
	"Custap Berry": {"t": "Ghost", "p": 100},
	"Durin Berry": {"t": "Water", "p": 100},
	"Enigma Berry": {"t": "Bug", "p": 100},
	"Figy Berry": {"t": "Bug", "p": 80},
	"Ganlon Berry": {"t": "Ice", "p": 100},
	"Haban Berry": {"t": "Dragon", "p": 80},
	"Iapapa Berry": {"t": "Dark", "p": 80},
	"Jaboca Berry": {"t": "Dragon", "p": 100},
	"Kasib Berry": {"t": "Ghost", "p": 80},
	"Kebia Berry": {"t": "Poison", "p": 80},
	"Kee Berry": {"t": "Fairy", "p": 100},
	"Lansat Berry": {"t": "Flying", "p": 100},
	"Leppa Berry": {"t": "Fighting", "p": 80},
	"Liechi Berry": {"t": "Grass", "p": 100},
	"Lum Berry": {"t": "Flying", "p": 80},
	"Mago Berry": {"t": "Ghost", "p": 80},
	"Maranga Berry": {"t": "Dark", "p": 100},
	"Micle Berry": {"t": "Rock", "p": 100},
	"Occa Berry": {"t": "Fire", "p": 80},
	"Oran Berry": {"t": "Poison", "p": 80},
	"Passho Berry": {"t": "Water", "p": 80},
	"Payapa Berry": {"t": "Psychic", "p": 80},
	"Pecha Berry": {"t": "Electric", "p": 80},
	"Persim Berry": {"t": "Ground", "p": 80},
	"Petaya Berry": {"t": "Poison", "p": 100},
	"Rawst Berry": {"t": "Grass", "p": 80},
	"Rindo Berry": {"t": "Grass", "p": 80},
	"Roseli Berry": {"t": "Fairy", "p": 80},
	"Rowap Berry": {"t": "Dark", "p": 100},
	"Salac Berry": {"t": "Fighting", "p": 100},
	"Shuca Berry": {"t": "Ground", "p": 80},
	"Sitrus Berry": {"t": "Psychic", "p": 80},
	"Starf Berry": {"t": "Psychic", "p": 100},
	"Tanga Berry": {"t": "Bug", "p": 80},
	"Wacan Berry": {"t": "Electric", "p": 80},
	"Watmel Berry": {"t": "Fire", "p": 100},
	"Wiki Berry": {"t": "Rock", "p": 80},
	"Yache Berry": {"t": "Ice", "p": 80}
};

function getNaturalGift(item) {
	let gift = structuredClone(NATURAL_GIFT_STATS[item]);
	if (gift) {
		if (gen < 6) {
			gift.p -= 20;
		}
		return gift;
	}
	return {"t": "Normal", "p": 1};
}
