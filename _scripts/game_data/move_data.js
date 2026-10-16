var MOVES_RBY = {
	"(No Move)": {
		"bp": 0,
		"type": "Normal",
		"category": "Physical",
		"acc": 100
	},
	"Acid": {
		"bp": 40,
		"type": "Poison",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isSpread": true,
		"acc": 100
	},
	"Acid Armor": {
		"bp": 0,
		"type": "Poison",
	},
	"Agility": {
		"bp": 0,
		"type": "Psychic"
	},
	"Amnesia": {
		"bp": 0,
		"type": "Psychic"
	},
	"Aurora Beam": {
		"bp": 65,
		"type": "Ice",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Barrier": {
		"bp": 0,
		"type": "Psychic"
	},
	"Bind": {
		"bp": 15,
		"type": "Normal",
		"category": "Physical",
		"acc": 85
	},
	"Blizzard": {
		"bp": 120,
		"type": "Ice",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isSpread": true,
		"isWind": true,
		"acc": 70
	},
	"Body Slam": {
		"bp": 85,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Bone Club": {
		"bp": 65,
		"type": "Ground",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"acc": 85
	},
	"Bubble Beam": {
		"bp": 65,
		"type": "Water",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Clamp": {
		"bp": 35,
		"type": "Water",
		"category": "Physical",
		"acc": 85
	},
	"Crabhammer": {
		"bp": 90,
		"type": "Water",
		"category": "Physical",
		"makesContact": true,
		"acc": 90
	},
	"Confuse Ray": {
		"bp": 0,
		"type": "Ghost"
	},
	"Confusion": {
		"bp": 50,
		"type": "Psychic",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Conversion": {
		"bp": 0,
		"type": "Normal"
	},
	"Counter": {
		"bp": 0,
		"type": "Fighting"
	},
	"Defense Curl": {
		"bp": 0,
		"type": "Normal"
	},
	"Dig": {
		"bp": 100,
		"type": "Ground",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Disable": {
		"bp": 0,
		"type": "Normal"
	},
	"Dizzy Punch": {
		"bp": 70,
		"type": "Normal",
		"category": "Physical",
		"isPunch": true,
		"hasSecondaryEffect": true,
		"makesContact": true
	},
	"Double Kick": {
		"bp": 30,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"isTwoHit": true,
		"acc": 100
	},
	"Double-Edge": {
		"bp": 100,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"hasRecoil": 1/4,
		"acc": 100
	},
	"Double Team": {
		"bp": 0,
		"type": "Normal"
	},
	"Dragon Breath": {
		"bp": 60,
		"type": "Dragon",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Dragon Rage": {
		"bp": 1,
		"type": "Dragon",
		"category": "Special",
		"acc": 100
	},
	"Dream Eater": {
		"bp": 100,
		"type": "Psychic",
		"category": "Special",
		"percentHealed": 1/2,
		"acc": 100
	},
	"Drill Peck": {
		"bp": 80,
		"type": "Flying",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Earthquake": {
		"bp": 100,
		"type": "Ground",
		"category": "Physical",
		"isSpread": true,
		"acc": 100
	},
	 "Egg Bomb": {
		"bp": 100,
		"type": "Normal",
		"category": "Physical",
		"acc": 75
	},
	"Ember": {
		"bp": 40,
		"type": "Fire",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Explosion": {
		"bp": 170,
		"type": "Normal",
		"category": "Physical",
		"isSpread": true,
		"acc": 100
	},
	"Fire Blast": {
		"bp": 120,
		"type": "Fire",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 85
	},
	"Fire Punch": {
		"bp": 75,
		"type": "Fire",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"isPunch": true,
		"acc": 100
	},
	"Fire Spin": {
		"bp": 15,
		"type": "Fire",
		"category": "Special",
		"acc": 85
	},
	"Flamethrower": {
		"bp": 95,
		"type": "Fire",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Flash": {
		"bp": 0,
		"type": "Normal"
	},
	"Fly": {
		"bp": 70,
		"type": "Flying",
		"category": "Physical",
		"makesContact": true,
		"acc": 95
	},
	"Focus Energy": {
		"bp": 0,
		"type": "Normal"
	},
	"Foresight": {
		"bp": 0,
		"type": "Normal"
	},
	"Fury Attack": {
		"bp": 15,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"maxMultiHits": 5,
		"acc": 85
	},
	"Fury Swipes": {
		"bp": 18,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"maxMultiHits": 5,
		"acc": 80
	},
	"Glare": {
		"bp": 0,
		"type": "Normal"
	},
	"Growl": {
		"bp": 0,
		"type": "Normal"
	},
	"Growth": {
		"bp": 0,
		"type": "Normal"
	},
	"Guillotine": {
		"bp": 0,
		"type": "Normal"
	},
	"Haze": {
		"bp": 0,
		"type": "Ice"
	},
	"Headbutt": {
		"bp": 70,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"High Jump Kick": {
		"bp": 85,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"hasRecoil": "crash",
		"acc": 90
	},
	"Horn Drill": {
		"bp": 0,
		"type": "Normal"
	},
	"Hydro Pump": {
		"bp": 120,
		"type": "Water",
		"category": "Special",
		"acc": 80
	},
	"Hyper Beam": {
		"bp": 150,
		"type": "Normal",
		"category": "Special",
		"acc": 90
	},
	"Hyper Fang": {
		"bp": 80,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"isBite": true,
		"acc": 90
	},
	"Hypnosis": {
		"bp": 0,
		"type": "Psychic"
	},
	"Ice Beam": {
		"bp": 95,
		"type": "Ice",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Ice Punch": {
		"bp": 75,
		"type": "Ice",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"isPunch": true,
		"acc": 100
	},
	"Jump Kick": {
		"bp": 70,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"hasRecoil": "crash",
		"acc": 95
	},
	"Karate Chop": {
		"bp": 50,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Leech Life": {
		"bp": 20,
		"type": "Bug",
		"category": "Physical",
		"makesContact": true,
		"percentHealed": 1/2,
		"acc": 100
	},
	"Leech Seed": {
		"bp": 0,
		"type": "Grass"
	},
	"Lick": {
		"bp": 20,
		"type": "Ghost",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true
	},
	"Leer": {
		"bp": 0,
		"type": "Normal"
	},
	"Light Screen": {
		"bp": 0,
		"type": "Psychic"
	},
	"Lovely Kiss": {
		"bp": 0,
		"type": "Normal"
	},
	"Magnitude": {
		"bp": 150,
		"type": "Ground",
		"category": "Physical",
		"isSpread": true,
		"acc": 100,
		"noKOChance": true
	},
	"Mega Drain": {
		"bp": 40,
		"type": "Grass",
		"category": "Special",
		"percentHealed": 1/2,
		"acc": 100
	},
	"Mega Kick": {
		"bp": 120,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"acc": 75
	},
	"Mega Punch": {
		"bp": 80,
		"type": "Normal",
		"category": "Physical",
		"isPunch": true,
		"makesContact": true,
		"acc": 85
	},
	"Mimic": {
		"bp": 0,
		"type": "Normal"
	},
	"Minimize": {
		"bp": 0,
		"type": "Normal"
	},
	"Metronome": {
		"bp": 0,
		"type": "Normal"
	},
	"Mirror Move": {
		"bp": 0,
		"type": "Flying"
	},
	"Mist": {
		"bp": 0,
		"type": "Ice"
	},
	"Night Shade": {
		"bp": 1,
		"type": "Ghost",
		"category": "Special",
		"acc": 100
	},
	"Peck": {
		"bp": 35,
		"type": "Flying",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Petal Dance": {
		"bp": 70,
		"type": "Grass",
		"category": "Special",
		"makesContact": true,
		"acc": 100
	},
	"Pin Missile": {
		"bp": 14,
		"type": "Bug",
		"category": "Physical",
		"maxMultiHits": 5,
		"acc": 95
	},
	"Poison Powder": {
		"bp": 0,
		"type": "Poison"
	},
	"Psybeam": {
		"bp": 65,
		"type": "Psychic",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Psychic": {
		"bp": 90,
		"type": "Psychic",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Quick Attack": {
		"bp": 40,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"hasPriority": true,
		"acc": 100
	},
	"Razor Leaf": {
		"bp": 55,
		"type": "Grass",
		"category": "Physical",
		"isSlicing": true,
		"isSpread": true,
		"acc": 95
	},
	"Razor Wind": {
		"bp": 80,
		"type": "Normal",
		"category": "Special",
		"isSpread": true
	},
	"Recover": {
		"bp": 0,
		"type": "Normal"
	},
	"Reflect": {
		"bp": 0,
		"type": "Psychic"
	},
	"Rest": {
		"bp": 0,
		"type": "Psychic"
	},
	"Roar": {
		"bp": 0,
		"type": "Normal"
	},
	"Rock Slide": {
		"bp": 75,
		"type": "Rock",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"isSpread": true,
		"acc": 90
	},
	"Rock Throw": {
		"bp": 50,
		"type": "Rock",
		"category": "Physical",
		"acc": 90
	},
	"Rolling Kick": {
		"bp": 60,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 85
	},
	"Screech": {
		"bp": 0,
		"type": "Normal"
	},
	"Sand Attack": {
		"bp": 0,
		"type": "Ground"
	},
	"Seismic Toss": {
		"bp": 1,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Self-Destruct": {
		"bp": 130,
		"type": "Normal",
		"category": "Physical",
		"isSpread": true,
		"acc": 100
	},
	"Sing": {
		"bp": 0,
		"type": "Normal"
	},
	"Sky Attack": {
		"bp": 140,
		"type": "Flying",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"acc": 90
	},
	"Skull Bash": {
		"bp": 100,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Slam": {
		"bp": 80,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"acc": 75
	},
	"Slash": {
		"bp": 70,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"isSlicing": true,
		"acc": 100
	},
	"Sleep Powder": {
		"bp": 0,
		"type": "Grass"
	},
	"Sludge": {
		"bp": 65,
		"type": "Poison",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Soft-Boiled": {
		"bp": 0,
		"type": "Normal"
	},
	"Sonic Boom": {
		"bp": 1,
		"type": "Normal",
		"category": "Special",
		"acc": 90
	},
	"Spore": {
		"bp": 0,
		"type": "Grass"
	},
	"Strength": {
		"bp": 80,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Stomp": {
		"bp": 65,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"String Shot": {
		"bp": 0,
		"type": "Bug"
	},
	"Struggle": {
		"bp": 50,
		"type": "Normal",
		"category": "Physical",
		"hasRecoil": 1/2,
		"acc": 101
	},
	"Stun Spore": {
		"bp": 0,
		"type": "Grass"
	},
	"Submission": {
		"bp": 80,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"hasRecoil": 1/4,
		"acc": 80
	},
	"Substitute": {
		"bp": 0,
		"type": "Normal"
	},
	"Super Fang": {
		"bp": 1,
		"category": "Physical",
		"type": "Normal",
		"makesContact": true,
		"acc": 90,
		"noKOChance": true
	},
	"Surf": {
		"bp": 95,
		"type": "Water",
		"category": "Special",
		"isSpread": true,
		"acc": 100
	},
	"Swift": {
		"bp": 60,
		"type": "Normal",
		"category": "Special",
		"isSpread": true,
		"acc": 101
	},
	"Swords Dance": {
		"bp": 0,
		"type": "Normal"
	},
	"Tackle": {
		"bp": 35,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Tail Whip": {
		"bp": 0,
		"type": "Normal"
	},
	"Take Down": {
		"bp": 90,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"hasRecoil": 1/4,
		"acc": 85
	},
	"Thrash": {
		"bp": 90,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Thunder": {
		"bp": 120,
		"type": "Electric",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 70
	},
	"Thunderbolt": {
		"bp": 95,
		"type": "Electric",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Thunder Punch": {
		"bp": 75,
		"type": "Electric",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"isPunch": true,
		"acc": 100
	},
	"Thunder Shock": {
		"bp": 40,
		"type": "Electric",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Thunder Wave": {
		"bp": 0,
		"type": "Electric"
	},
	"Toxic": {
		"bp": 0,
		"type": "Poison"
	},
	"Tri Attack": {
		"bp": 80,
		"type": "Normal",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Twineedle": {
		"bp": 25,
		"type": "Bug",
		"category": "Physical",
		"isTwoHit": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Vise Grip": {
		"bp": 55,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Waterfall": {
		"bp": 80,
		"type": "Water",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Water Gun": {
		"bp": 40,
		"type": "Water",
		"category": "Special",
		"acc": 100
	},
	"Wing Attack": {
		"bp": 35,
		"type": "Flying",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Wrap": {
		"bp": 15,
		"type": "Normal",
		"category": "Physical",
		"acc": 90
	},
	"Whirlwind": {
		"bp": 0,
		"type": "Normal"
	}
};

var MOVES_GSC = $.extend(true, {}, MOVES_RBY, {
	"Aeroblast": {
		"bp": 100,
		"type": "Flying",
		"category": "Special",
		"acc": 95
	},
	"Ancient Power": {
		"bp": 60,
		"type": "Rock",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Attract": {
		"bp": 0,
		"type": "Normal"
	},
	"Baton Pass": {
		"bp": 0,
		"type": "Normal"
	},
	"Belly Drum": {
		"bp": 0,
		"type": "Normal"
	},
	"Bite": {
		"bp": 60,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"isBite": true,
		"acc": 100
	},
	"Bone Rush": {
		"bp": 25,
		"type": "Ground",
		"category": "Physical",
		"maxMultiHits": 5,
		"acc": 90
	},
	"Charm": {
		"bp": 0,
		"type": "Fairy"
	},
	"Conversion 2": {
		"bp": 0,
		"type": "Normal"
	},
	"Cotton Spore": {
		"bp": 0,
		"type": "Grass"
	},
	"Cross Chop": {
		"bp": 100,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"acc": 80
	},
	"Crunch": {
		"bp": 80,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"isBite": true,
		"acc": 100
	},
	"Curse": {
		"bp": 0,
		"type": "Ghost"
	},
	"Destiny Bond": {
		"bp": 0,
		"type": "Ghost"
	},
	"Detect": {
		"bp": 0,
		"type": "Fighting"
	},
	"Dig": {"bp": 60},
	"Double-Edge": {"bp": 120},
	"Dynamic Punch": {
		"bp": 100,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"isPunch": true,
		"acc": 50
	},
	"Encore": {
		"bp": 0,
		"type": "Normal"
	},
	"Endure": {
		"bp": 0,
		"type": "Normal"
	},
	"Explosion": {"bp": 250},
	"Extreme Speed": {
		"bp": 80,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"hasPriority": true,
		"acc": 100
	},
	"Feint Attack": {
		"bp": 60,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"acc": 101
	},
	"Flail": {
		"bp": 1,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Flame Wheel": {
		"bp": 60,
		"type": "Fire",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Frustration": {
		"bp": 102,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Fury Cutter": {
		"bp": 10,
		"type": "Bug",
		"category": "Physical",
		"isSlicing": true,
		"acc": 95
	},
	"Future Sight": {
		"bp": 80,
		"type": "Psychic",
		"category": "Special",
		"bypassesProtect": true,
		"acc": 100
	},
	"Giga Drain": {
		"bp": 60,
		"type": "Grass",
		"category": "Special",
		"percentHealed": 1/2,
		"acc": 100
	},
	"Gust": {
		"bp": 40,
		"type": "Flying",
		"category": "Special",
		"isWind": true,
		"acc": 100
	},
	"Heal Bell": {
		"bp": 0,
		"type": "Normal"
	},
	"Hidden Power Bug": {
		"bp": 70,
		"type": "Bug",
		"category": "Special",
		"acc": 100
	},
	"Hidden Power Dark": {
		"bp": 70,
		"type": "Dark",
		"category": "Special",
		"acc": 100
	},
	"Hidden Power Dragon": {
		"bp": 70,
		"type": "Dragon",
		"category": "Special",
		"acc": 100
	},
	"Hidden Power Electric": {
		"bp": 70,
		"type": "Electric",
		"category": "Special",
		"acc": 100
	},
	"Hidden Power Fighting": {
		"bp": 70,
		"type": "Fighting",
		"category": "Special",
		"acc": 100
	},
	"Hidden Power Fire": {
		"bp": 70,
		"type": "Fire",
		"category": "Special",
		"acc": 100
	},
	"Hidden Power Flying": {
		"bp": 70,
		"type": "Flying",
		"category": "Special",
		"acc": 100
	},
	"Hidden Power Ghost": {
		"bp": 70,
		"type": "Ghost",
		"category": "Special",
		"acc": 100
	},
	"Hidden Power Grass": {
		"bp": 70,
		"type": "Grass",
		"category": "Special",
		"acc": 100
	},
	"Hidden Power Ground": {
		"bp": 70,
		"type": "Ground",
		"category": "Special",
		"acc": 100
	},
	"Hidden Power Ice": {
		"bp": 70,
		"type": "Ice",
		"category": "Special",
		"acc": 100
	},
	"Hidden Power Poison": {
		"bp": 70,
		"type": "Poison",
		"category": "Special",
		"acc": 100
	},
	"Hidden Power Psychic": {
		"bp": 70,
		"type": "Psychic",
		"category": "Special",
		"acc": 100
	},
	"Hidden Power Rock": {
		"bp": 70,
		"type": "Rock",
		"category": "Special",
		"acc": 100
	},
	"Hidden Power Steel": {
		"bp": 70,
		"type": "Steel",
		"category": "Special",
		"acc": 100
	},
	"Hidden Power Water": {
		"bp": 70,
		"type": "Water",
		"category": "Special",
		"acc": 100
	},
	"Icy Wind": {
		"bp": 55,
		"type": "Ice",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isSpread": true,
		"isWind": true,
		"acc": 95
	},
	"Iron Tail": {
		"bp": 100,
		"type": "Steel",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 75
	},
	"Lock-On": {
		"bp": 0,
		"type": "Normal"
	},
	"Mach Punch": {
		"bp": 40,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"isPunch": true,
		"hasPriority": true,
		"acc": 100
	},
	"Mean Look": {
		"bp": 0,
		"type": "Normal"
	},
	"Megahorn": {
		"bp": 120,
		"type": "Bug",
		"category": "Physical",
		"makesContact": true,
		"acc": 85
	},
	"Metal Claw": {
		"bp": 50,
		"type": "Steel",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 95
	},
	"Milk Drink": {
		"bp": 0,
		"type": "Normal"
	},
	"Mind Reader": {
		"bp": 0,
		"type": "Normal"
	},
	"Mirror Coat": {
		"bp": 0,
		"type": "Psychic"
	},
	"Moonlight": {
		"bp": 0,
		"type": "Fairy"
	},
	"Morning Sun": {
		"bp": 0,
		"type": "Normal"
	},
	"Mud-Slap": {
		"bp": 20,
		"type": "Ground",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Nightmare": {
		"bp": 0,
		"type": "Ghost"
	},
	"Octazooka": {
		"bp": 65,
		"type": "Water",
		"category": "Special",
		"acc": 85,
		"hasSecondaryEffect": true,
		"acc": 85
	},
	"Outrage": {
		"bp": 90,
		"type": "Dragon",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Pain Split": {
		"bp": 0,
		"type": "Normal"
	},
	"Perish Song": {
		"bp": 0,
		"type": "Normal"
	},
	"Protect": {
		"bp": 0,
		"type": "Normal"
	},
	"Psywave": {
		"bp": 1,
		"type": "Psychic",
		"category": "Special",
		"acc": 80,
		"noKOChance": true
	},
	"Pursuit": {
		"bp": 40,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Psych Up": {
		"bp": 0,
		"type": "Normal"
	},
	"Rain Dance": {
		"bp": 0,
		"type": "Water"
	},
	"Rapid Spin": {
		"bp": 20,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Return": {
		"bp": 102,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Reversal": {
		"bp": 1,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Rock Smash": {
		"bp": 20,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Rollout": {
		"bp": 30,
		"type": "Rock",
		"category": "Physical",
		"makesContact": true
	},
	"Sacred Fire": {
		"bp": 100,
		"type": "Fire",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"acc": 95
	},
	"Safeguard": {
		"bp": 0,
		"type": "Normal"
	},
	"Sandstorm": {
		"bp": 0,
		"type": "Rock"
	},
	"Scary Face": {
		"bp": 0,
		"type": "Normal"
	},
	"Self-Destruct": {"bp": 200},
	"Shadow Ball": {
		"bp": 80,
		"type": "Ghost",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isBullet": true,
		"acc": 100
	},
	"Sleep Talk": {
		"bp": 0,
		"type": "Normal"
	},
	"Sludge Bomb": {
		"bp": 90,
		"type": "Poison",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isBullet": true,
		"acc": 100
	},
	"Snore": {
		"bp": 40,
		"type": "Normal",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isSound": true,
		"acc": 100
	},
	"Solar Beam": {
		"bp": 120,
		"type": "Grass",
		"category": "Special",
		"acc": 100
	},
	"Spark": {
		"bp": 65,
		"type": "Electric",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Spikes": {
		"bp": 0,
		"type": "Ground"
	},
	"Spite": {
		"bp": 0,
		"type": "Normal"
	},
	"Steel Wing": {
		"bp": 70,
		"type": "Steel",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 90
	},
	"Struggle": {"type": "None", "hasRecoil": 1/4},
	"Sunny Day": {
		"bp": 0,
		"type": "Fire"
	},
	"Swagger": {
		"bp": 0,
		"type": "Normal"
	},
	"Sweet Kiss": {
		"bp": 0,
		"type": "Fairy"
	},
	"Synthesis": {
		"bp": 0,
		"type": "Grass"
	},
	"Thief": {
		"bp": 40,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Tri Attack": {"hasSecondaryEffect": true},
	"Triple Kick": {
		"bp": 10,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"maxMultiHits": 3,
		"acc": 90
	},
	"Twister": {
		"bp": 40,
		"type": "Dragon",
		"category": "Special",
		"isWind": true,
		"hasSecondaryEffect": true,
		"isSpread": true
	},
	"Vital Throw": {
		"bp": 70,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true
	},
	"Whirlpool": {
		"bp": 15,
		"type": "Water",
		"category": "Special",
		"acc": 85
	},
	"Wing Attack": {"bp": 60},
	"Zap Cannon": {
		"bp": 100,
		"type": "Electric",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isBullet": true,
		"acc": 50
	}
});

var MOVES_ADV = $.extend(true, {}, MOVES_GSC, {
	"Aerial Ace": {
		"bp": 60,
		"type": "Flying",
		"category": "Physical",
		"makesContact": true,
		"isSlicing": true,
		"acc": 101
	},
	"Air Cutter": {
		"bp": 55,
		"type": "Flying",
		"category": "Special",
		"isSpread": true,
		"isSlicing": true,
		"isWind": true,
		"acc": 95
	},
	"Arm Thrust": {
		"bp": 15,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"maxMultiHits": 5,
		"acc": 100
	},
	"Astonish": {
		"bp": 30,
		"type": "Ghost",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Aromatherapy": {
		"bp": 0,
		"type": "Grass"
	},
	"Blast Burn": {
		"bp": 150,
		"type": "Fire",
		"category": "Special",
		"acc": 90
	},
	"Blaze Kick": {
		"bp": 85,
		"type": "Fire",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 90
	},
	"Block": {
		"bp": 0,
		"type": "Normal"
	},
	"Bonemerang": {
		"bp": 50,
		"type": "Ground",
		"category": "Physical",
		"isTwoHit": true,
		"acc": 90
	},
	"Bounce": {
		"bp": 85,
		"type": "Flying",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 85
	},
	"Brick Break": {
		"bp": 75,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Bulk Up": {
		"bp": 0,
		"type": "Fighting"
	},
	"Bullet Seed": {
		"bp": 10,
		"type": "Grass",
		"category": "Physical",
		"maxMultiHits": 5,
		"isBullet": true,
		"acc": 100
	},
	"Calm Mind": {
		"bp": 0,
		"type": "Psychic"
	},
	"Charge": {
		"bp": 0,
		"type": "Electric"
	},
	"Cosmic Power": {
		"bp": 0,
		"type": "Psychic"
	},
	"Covet": {
		"bp": 40,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Crush Claw": {
		"bp": 75,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 95
	},
	"Dive": {
		"bp": 60,
		"type": "Water",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Doom Desire": {
		"bp": 120,
		"type": "Steel",
		"category": "Special",
		"bypassesProtect": true,
		"acc": 100
	},
	"Dragon Claw": {
		"bp": 80,
		"type": "Dragon",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Dragon Dance": {
		"bp": 0,
		"type": "Dragon"
	},
	"Double-Edge": {"hasRecoil": 1/3},
	"Endeavor": {
		"bp": 1,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Eruption": {
		"bp": 150,
		"type": "Fire",
		"category": "Special",
		"isSpread": true,
		"acc": 100
	},
	"Extrasensory": {
		"bp": 80,
		"type": "Psychic",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Facade": {
		"bp": 70,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Fake Out": {
		"bp": 40,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"hasPriority": true,
		"acc": 100
	},
	"Fake Tears": {
		"bp": 0,
		"type": "Dark"
	},
	"Feather Dance": {
		"bp": 0,
		"type": "Flying"
	},
	"Flatter": {
		"bp": 0,
		"type": "Dark"
	},
	"Focus Punch": {
		"bp": 150,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"isPunch": true,
		"acc": 100
	},
	"Follow Me": {
		"bp": 0,
		"type": "Normal"
	},
	"Frenzy Plant": {
		"bp": 150,
		"type": "Grass",
		"category": "Special",
		"acc": 100
	},
	"Grass Whistle": {
		"bp": 0,
		"type": "Grass"
	},
	"Grudge": {
		"bp": 0,
		"type": "Ghost"
	},
	"Hail": {
		"bp": 0,
		"type": "Ice"
	},
	"Heat Wave": {
		"bp": 100,
		"type": "Fire",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isSpread": true,
		"isWind": true,
		"acc": 90
	},
	"Helping Hand": {
		"bp": 0,
		"type": "Normal"
	},
	"Hydro Cannon": {
		"bp": 150,
		"type": "Water",
		"category": "Special",
		"acc": 90
	},
	"Hyper Voice": {
		"bp": 90,
		"type": "Normal",
		"category": "Special",
		"isSound": true,
		"isSpread": true,
		"acc": 100
	},
	"Ice Ball": {
		"bp": 30,
		"type": "Ice",
		"category": "Physical",
		"makesContact": true
	},
	"Icicle Spear": {
		"bp": 10,
		"type": "Ice",
		"category": "Physical",
		"maxMultiHits": 5,
		"acc": 100
	},
	"Imprison": {
		"bp": 0,
		"type": "Psychic"
	},
	"Ingrain": {
		"bp": 0,
		"type": "Grass"
	},
	"Iron Defense": {
		"bp": 0,
		"type": "Steel"
	},
	"Knock Off": {
		"bp": 20,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Leaf Blade": {
		"bp": 70,
		"type": "Grass",
		"category": "Physical",
		"makesContact": true,
		"isSlicing": true,
		"acc": 100
	},
	"Luster Purge": {
		"bp": 70,
		"type": "Psychic",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Low Kick": {
		"bp": 1,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Magical Leaf": {
		"bp": 60,
		"type": "Grass",
		"category": "Special",
		"acc": 101
	},
	"Magic Coat": {
		"bp": 0,
		"type": "Psychic",
		"acc": 100
	},
	"Memento": {
		"bp": 0,
		"type": "Dark"
	},
	"Metal Sound": {
		"bp": 0,
		"type": "Steel"
	},
	"Meteor Mash": {
		"bp": 100,
		"type": "Steel",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"isPunch": true,
		"acc": 90
	},
	"Mist Ball": {
		"bp": 70,
		"type": "Psychic",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isBullet": true,
		"acc": 100
	},
	"Mud Shot": {
		"bp": 55,
		"type": "Ground",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 95
	},
	"Muddy Water": {
		"bp": 95,
		"type": "Water",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isSpread": true,
		"acc": 85
	},
	"Needle Arm": {
		"bp": 60,
		"type": "Grass",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Odor Sleuth": {
		"bp": 0,
		"type": "Normal"
	},
	"Overheat": {
		"bp": 140,
		"type": "Fire",
		"category": "Special",
		"dropsStats": 2,
		"acc": 90
	},
	"Poison Fang": {
		"bp": 50,
		"type": "Poison",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"isBite": true,
		"acc": 100
	},
	"Poison Tail": {
		"bp": 50,
		"type": "Poison",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Psycho Boost": {
		"bp": 140,
		"type": "Psychic",
		"category": "Special",
		"dropsStats": 2,
		"acc": 90
	},
	"Recycle": {
		"bp": 0,
		"type": "Normal"
	},
	"Refresh": {
		"bp": 0,
		"type": "Normal"
	},
	"Revenge": {
		"bp": 60,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Revenge (Doubled)": {
		"bp": 120,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Rock Blast": {
		"bp": 25,
		"type": "Rock",
		"category": "Physical",
		"maxMultiHits": 5,
		"acc": 90
	},
	"Rock Tomb": {
		"bp": 50,
		"type": "Rock",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"acc": 90
	},
	"Role Play": {
		"bp": 0,
		"type": "Psychic"
	},
	"Sand Tomb": {
		"bp": 15,
		"type": "Ground",
		"category": "Physical",
		"acc": 85
	},
	"Secret Power": {
		"bp": 70,
		"type": "Normal",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Shadow Punch": {
		"bp": 60,
		"type": "Ghost",
		"category": "Physical",
		"makesContact": true,
		"isPunch": true,
		"acc": 101
	},
	"Sheer Cold": {
		"bp": 1,
		"type": "Ice",
		"category": "Special",
		"acc": 30,
		"isMLG": true
	},
	"Fissure": {
		"bp": 1,
		"type": "Ground",
		"category": "Physical",
		"acc": 30,
		"isMLG": true
	},
	"Horn Drill": {
		"bp": 1,
		"type": "Normal",
		"category": "Physical",
		"acc": 30,
		"isMLG": true
	},
	"Guillotine": {
		"bp": 1,
		"type": "Normal",
		"category": "Physical",
		"acc": 30,
		"isMLG": true
	},
	"Shock Wave": {
		"bp": 60,
		"type": "Electric",
		"category": "Special",
		"acc": 101
	},
	"Signal Beam": {
		"bp": 75,
		"type": "Bug",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Silver Wind": {
		"bp": 60,
		"type": "Bug",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Skill Swap": {
		"bp": 0,
		"type": "Psychic"
	},
	"Sky Uppercut": {
		"bp": 85,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"isPunch": true,
		"acc": 90
	},
	"Slack Off": {
		"bp": 0,
		"type": "Normal"
	},
	"Smelling Salts": {
		"bp": 60,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true
	},
	"Spit Up": {
		"bp": 1,
		"type": "Normal",
		"category": "Special",
		"acc": 100
	},
	"Snatch": {
		"bp": 0,
		"type": "Dark"
	},
	"Stockpile": {
		"bp": 0,
		"type": "Normal"
	},
	"Superpower": {
		"bp": 120,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"dropsStats": 1,
		"acc": 100
	},
	"Swallow": {
		"bp": 0,
		"type": "Normal"
	},
	"Tail Glow": {
		"bp": 0,
		"type": "Bug"
	},
	"Taunt": {
		"bp": 0,
		"type": "Dark"
	},
	"Teeter Dance": {
		"bp": 0,
		"type": "Fairy"
	},
	"Tickle": {
		"bp": 0,
		"type": "Normal"
	},
	"Torment": {
		"bp": 0,
		"type": "Dark"
	},
	"Trick": {
		"bp": 0,
		"type": "Psychic"
	},
	"Uproar": {
		"bp": 50,
		"type": "Normal",
		"category": "Special",
		"acc": 100
	},
	"Volt Tackle": {
		"bp": 120,
		"type": "Electric",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"hasRecoil": 1/3,
		"acc": 100
	},
	"Water Pulse": {
		"bp": 60,
		"type": "Water",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isPulse": true,
		"acc": 100
	},
	"Water Spout": {
		"bp": 150,
		"type": "Water",
		"category": "Special",
		"isSpread": true,
		"acc": 100
	},
	"Weather Ball": {
		"bp": 50,
		"type": "Normal",
		"category": "Special",
		"isBullet": true,
		"acc": 100
	},
	"Will-O-Wisp": {
		"bp": 0,
		"type": "Fire"
	},
	"Wish": {
		"bp": 0,
		"type": "Normal"
	},
	"Yawn": {
		"bp": 0,
		"type": "Normal"
	}
});

var MOVES_DPP = $.extend(true, {}, MOVES_ADV, {
	"Acupressure": {
		"bp": 0,
		"type": "Normal",
	},
	"Air Slash": {
		"bp": 75,
		"type": "Flying",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isSlicing": true,
		"acc": 95
	},
	"Aqua Jet": {
		"bp": 40,
		"type": "Water",
		"category": "Physical",
		"makesContact": true,
		"hasPriority": true,
		"acc": 100
	},
	"Aqua Tail": {
		"bp": 90,
		"type": "Water",
		"category": "Physical",
		"makesContact": true,
		"acc": 90
	},
	"Aqua Ring": {
		"bp": 0,
		"type": "Water"
	},
	"Assurance": {
		"bp": 50,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Attack Order": {
		"bp": 90,
		"type": "Bug",
		"category": "Physical",
		"acc": 100
	},
	"Aura Sphere": {
		"bp": 90,
		"type": "Fighting",
		"category": "Special",
		"isBullet": true,
		"isPulse": true,
		"acc": 101
	},
	"Avalanche": {
		"bp": 60,
		"type": "Ice",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Avalanche (Doubled)": {
		"bp": 120,
		"type": "Ice",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Brave Bird": {
		"bp": 120,
		"type": "Flying",
		"category": "Physical",
		"makesContact": true,
		"hasRecoil": 1/3,
		"acc": 100
	},
	"Brine": {
		"bp": 65,
		"type": "Water",
		"category": "Special",
		"acc": 100
	},
	"Bug Bite": {
		"bp": 60,
		"type": "Bug",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Bug Buzz": {
		"bp": 90,
		"type": "Bug",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isSound": true,
		"acc": 100
	},
	"Bullet Punch": {
		"bp": 40,
		"type": "Steel",
		"category": "Physical",
		"makesContact": true,
		"isPunch": true,
		"hasPriority": true,
		"acc": 100
	},
	"Captivate": {
		"bp": 0,
		"type": "Normal"
	},
	"Charge Beam": {
		"bp": 50,
		"type": "Electric",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Chatter": {
		"bp": 60,
		"type": "Flying",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isSound": true,
		"acc": 100
	},
	"Close Combat": {
		"bp": 120,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Copycat": {
		"bp": 0,
		"type": "Normal"
	},
	"Cross Poison": {
		"bp": 70,
		"type": "Poison",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"isSlicing": true,
		"acc": 100
	},
	"Crush Grip": {
		"bp": 1,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"acc": 100,
		"noKOChance": true
	},
	"Dark Pulse": {
		"bp": 80,
		"type": "Dark",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isPulse": true,
		"acc": 100
	},
	"Dark Void": {
		"bp": 0,
		"type": "Dark"
	},
	"Defend Order": {
		"bp": 0,
		"type": "Bug"
	},
	"Defog": {
		"bp": 0,
		"type": "Flying"
	},
	"Dig": {"bp": 80},
	"Discharge": {
		"bp": 80,
		"type": "Electric",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isSpread": true,
		"acc": 100
	},
	"Dive": {"bp": 80},
	"Double Hit": {
		"bp": 35,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"isTwoHit": true
	},
	"Draco Meteor": {
		"bp": 140,
		"type": "Dragon",
		"category": "Special",
		"dropsStats": 2,
		"acc": 100
	},
	"Dragon Pulse": {
		"bp": 90,
		"type": "Dragon",
		"category": "Special",
		"isPulse": true,
		"acc": 100
	},
	"Dragon Rush": {
		"bp": 100,
		"type": "Dragon",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 75
	},
	"Drain Punch": {
		"bp": 60,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"isPunch": true,
		"percentHealed": 1/2,
		"acc": 100
	},
	"Earth Power": {
		"bp": 90,
		"type": "Ground",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Embargo": {
		"bp": 0,
		"type": "Dark"
	},
	"Energy Ball": {
		"bp": 80,
		"type": "Grass",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isBullet": true,
		"acc": 100
	},
	"Feint": {
		"bp": 50,
		"type": "Normal",
		"category": "Physical",
		"bypassesProtect": true,
		"hasPriority": true,
		"acc": 100
	},
	"Fire Fang": {
		"bp": 65,
		"type": "Fire",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"isBite": true,
		"acc": 95
	},
	"Flare Blitz": {
		"bp": 120,
		"type": "Fire",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"hasRecoil": 1/3,
		"acc": 100
	},
	"Flash Cannon": {
		"bp": 80,
		"type": "Steel",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Fling": {
		"bp": 1,
		"type": "Dark",
		"category": "Physical",
		"acc": 100
	},
	"Fly": {"bp": 90},
	"Focus Blast": {
		"bp": 120,
		"type": "Fighting",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isBullet": true,
		"acc": 70
	},
	"Force Palm": {
		"bp": 60,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Gastro Acid": {
		"bp": 0,
		"type": "Poison"
	},
	"Giga Impact": {
		"bp": 150,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"acc": 90
	},
	"Grass Knot": {
		"bp": 1,
		"type": "Grass",
		"category": "Special",
		"makesContact": true,
		"acc": 100
	},
	"Gravity": {
		"bp": 0,
		"type": "Psychic"
	},
	"Gunk Shot": {
		"bp": 120,
		"type": "Poison",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"acc": 80
	},
	"Gyro Ball": {
		"bp": 1,
		"type": "Steel",
		"category": "Physical",
		"makesContact": true,
		"isBullet": true,
		"acc": 100
	},
	"Hammer Arm": {
		"bp": 100,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"isPunch": true,
		"acc": 90
	},
	"Head Smash": {
		"bp": 150,
		"type": "Rock",
		"category": "Physical",
		"makesContact": true,
		"hasRecoil": 1/2,
		"acc": 80
	},
	"Heal Order": {
		"bp": 0,
		"type": "Bug"
	},
	"Healing Wish": {
		"bp": 0,
		"type": "Psychic"
	},
	"High Jump Kick": {"bp": 100},
	"Ice Fang": {
		"bp": 65,
		"type": "Ice",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"isBite": true,
		"acc": 95
	},
	"Ice Shard": {
		"bp": 40,
		"type": "Ice",
		"category": "Physical",
		"hasPriority": true,
		"acc": 100
	},
	"Iron Head": {
		"bp": 80,
		"type": "Steel",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Judgment": {
		"bp": 100,
		"type": "Normal",
		"category": "Special",
		"acc": 100
	},
	"Jump Kick": {"bp": 85},
	"Last Resort": {
		"bp": 130,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Lava Plume": {
		"bp": 80,
		"type": "Fire",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isSpread": true,
		"acc": 100
	},
	"Leaf Blade": {"bp": 90},
	"Leaf Storm": {
		"bp": 140,
		"type": "Grass",
		"category": "Special",
		"dropsStats": 2,
		"acc": 90
	},
	"Lunar Dance": {
		"bp": 0,
		"type": "Psychic"
	},
	"Magma Storm": {
		"bp": 120,
		"type": "Fire",
		"category": "Special",
		"acc": 75
	},
	"Magnet Bomb": {
		"bp": 60,
		"type": "Steel",
		"category": "Physical",
		"isBullet": true,
		"acc": 101
	},
	"Magnet Rise": {
		"bp": 0,
		"type": "Electric"
	},
	"Me First": {
		"bp": 0,
		"type": "Normal"
	},
	"Metal Burst": {
		"bp": 0,
		"type": "Steel",
		"category": "Physical"
	},
	"Miracle Eye": {
		"bp": 0,
		"type": "Psychic"
	},
	"Mirror Shot": {
		"bp": 65,
		"type": "Steel",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 85
	},
	"Mud Bomb": {
		"bp": 65,
		"type": "Ground",
		"category": "Special",
		"isBullet": true,
		"hasSecondaryEffect": true,
		"acc": 85
	},
	"Natural Gift": {
		"bp": 1,
		"type": "Normal",
		"category": "Physical",
		"acc": 100
	},
	"Nature Power": {
		"bp": 80,
		"type": "Normal",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Nasty Plot": {
		"bp": 0,
		"type": "Dark"
	},
	"Night Slash": {
		"bp": 70,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"isSlicing": true,
		"acc": 100
	},
	"Ominous Wind": {
		"bp": 60,
		"type": "Ghost",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Outrage": {"bp": 120},
	"Payback": {
		"bp": 50,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Petal Dance": {"bp": 90},
	"Pluck": {
		"bp": 60,
		"type": "Flying",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Poison Jab": {
		"bp": 80,
		"type": "Poison",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Power Gem": {
		"bp": 70,
		"type": "Rock",
		"category": "Special",
		"acc": 100
	},
	"Power Swap": {
		"bp": 0,
		"type": "Psychic"
	},
	"Power Trick": {
		"bp": 0,
		"type": "Psychic"
	},
	"Power Whip": {
		"bp": 120,
		"type": "Grass",
		"category": "Physical",
		"makesContact": true,
		"acc": 85
	},
	"Psycho Cut": {
		"bp": 70,
		"type": "Psychic",
		"category": "Physical",
		"isSlicing": true,
		"acc": 100
	},
	"Psycho Shift": {
		"bp": 0,
		"type": "Psychic"
	},
	"Punishment": {
		"bp": 60,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Roar of Time": {
		"bp": 150,
		"type": "Dragon",
		"category": "Special",
		"acc": 90
	},
	"Rock Climb": {
		"bp": 90,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 85
	},
	"Rock Smash": {"bp": 40},
	"Rock Polish": {
		"bp": 0,
		"type": "Rock"
	},
	"Rock Wrecker": {
		"bp": 150,
		"type": "Rock",
		"category": "Physical",
		"isBullet": true,
		"acc": 90
	},
	"Roost": {
		"bp": 0,
		"type": "Flying"
	},
	"Seed Bomb": {
		"bp": 80,
		"type": "Grass",
		"category": "Physical",
		"isBullet": true,
		"acc": 100
	},
	"Seed Flare": {
		"bp": 120,
		"type": "Grass",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 85
	},
	"Shadow Claw": {
		"bp": 70,
		"type": "Ghost",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Shadow Force": {
		"bp": 120,
		"type": "Ghost",
		"category": "Physical",
		"makesContact": true,
		"bypassesProtect": true,
		"acc": 100
	},
	"Shadow Sneak": {
		"bp": 40,
		"type": "Ghost",
		"category": "Physical",
		"makesContact": true,
		"hasPriority": true,
		"acc": 100
	},
	"Spacial Rend": {
		"bp": 100,
		"type": "Dragon",
		"category": "Special",
		"acc": 95
	},
	"Stealth Rock": {
		"bp": 0,
		"type": "Rock"
	},
	"Stone Edge": {
		"bp": 100,
		"type": "Rock",
		"category": "Physical",
		"acc": 80
	},
	"Struggle": {"hasRecoil": "Struggle"},
	"Sucker Punch": {
		"bp": 80,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"hasPriority": true,
		"acc": 100
	},
	"Switcheroo": {
		"bp": 0,
		"type": "Dark"
	},
	"Tailwind": {
		"bp": 0,
		"type": "Flying"
	},
	"Thunder Fang": {
		"bp": 65,
		"type": "Electric",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"isBite": true,
		"acc": 95
	},
	"Toxic Spikes": {
		"bp": 0,
		"type": "Poison"
	},
	"Trick Room": {
		"bp": 0,
		"type": "Psychic"
	},
	"U-turn": {
		"bp": 70,
		"type": "Bug",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Vacuum Wave": {
		"bp": 40,
		"type": "Fighting",
		"category": "Special",
		"hasPriority": true,
		"acc": 100
	},
	"Wake-Up Slap": {
		"bp": 60,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Waterfall": {"hasSecondaryEffect": true},
	"Wood Hammer": {
		"bp": 120,
		"type": "Grass",
		"category": "Physical",
		"makesContact": true,
		"hasRecoil": 1/3,
		"acc": 100
	},
	"Worry Seed": {
		"bp": 0,
		"type": "Grass"
	},
	"Wring Out": {
		"bp": 1,
		"type": "Normal",
		"category": "Special",
		"makesContact": true,
		"acc": 100,
		"noKOChance": true
	},
	"X-Scissor": {
		"bp": 80,
		"type": "Bug",
		"category": "Physical",
		"makesContact": true,
		"isSlicing": true,
		"acc": 100
	},
	"Zap Cannon": {"bp": 120},
	"Zen Headbutt": {
		"bp": 80,
		"type": "Psychic",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 90
	}
});

var MOVES_BW = $.extend(true, {}, MOVES_DPP, {
	"Acid Spray": {
		"bp": 40,
		"type": "Poison",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isBullet": true,
		"acc": 100
	},
	"Acrobatics": {
		"bp": 55,
		"type": "Flying",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"After You": {
		"bp": 0,
		"type": "Normal"
	},
	"Ally Switch": {
		"bp": 0,
		"type": "Psychic"
	},
	"Autotomize": {
		"bp": 0,
		"type": "Steel"
	},
	"Blue Flare": {
		"bp": 130,
		"type": "Fire",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 85
	},
	"Bolt Strike": {
		"bp": 130,
		"type": "Electric",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 85
	},
	"Bulldoze": {
		"bp": 60,
		"type": "Ground",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"isSpread": true,
		"acc": 100
	},
	"Bullet Seed": {"bp": 25},
	"Chip Away": {
		"bp": 70,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"ignoresDefenseBoosts": true,
		"acc": 100
	},
	"Circle Throw": {
		"bp": 60,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"acc": 90
	},
	"Clear Smog": {
		"bp": 50,
		"type": "Poison",
		"category": "Special",
		"acc": 100
	},
	"Coil": {
		"bp": 0,
		"type": "Poison"
	},
	"Cotton Guard": {
		"bp": 0,
		"type": "Grass"
	},
	"Covet": {"bp": 60},
	"Doom Desire": {"bp": 140},
	"Dragon Tail": {
		"bp": 60,
		"type": "Dragon",
		"category": "Physical",
		"makesContact": true,
		"acc": 90
	},
	"Drain Punch": {"bp": 75},
	"Drill Run": {
		"bp": 80,
		"type": "Ground",
		"category": "Physical",
		"makesContact": true,
		"acc": 95
	},
	"Dual Chop": {
		"bp": 40,
		"type": "Dragon",
		"category": "Physical",
		"makesContact": true,
		"isTwoHit": true,
		"acc": 90
	},
	"Electro Ball": {
		"bp": 1,
		"type": "Electric",
		"category": "Special",
		"isBullet": true,
		"acc": 100
	},
	"Electroweb": {
		"bp": 55,
		"type": "Electric",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isSpread": true,
		"acc": 95
	},
	"Entrainment": {
		"bp": 0,
		"type": "Normal"
	},
	"Feint": {"bp": 30},
	"Fiery Dance": {
		"bp": 80,
		"type": "Fire",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Final Gambit": {
		"bp": 1,
		"type": "Fighting",
		"category": "Special",
		"acc": 100
	},
	"Fire Pledge": {
		"bp": 50,
		"type": "Fire",
		"category": "Special",
		"acc": 100
	},
	"Fire Pledge (Pledge Boosted)": {
		"bp": 150,
		"type": "Fire",
		"category": "Special",
		"acc": 100
	},
	"Fire Spin": {"bp": 35},
	"Flame Burst": {
		"bp": 70,
		"type": "Fire",
		"category": "Special",
		"acc": 100
	},
	"Flame Charge": {
		"bp": 50,
		"type": "Fire",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Foul Play": {
		"bp": 95,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Freeze Shock": {
		"bp": 140,
		"type": "Ice",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"acc": 90
	},
	"Frost Breath": {
		"bp": 40,
		"type": "Ice",
		"category": "Special",
		"alwaysCrit": true,
		"acc": 90
	},
	"Fury Cutter": {"bp": 20},
	"Fusion Bolt": {
		"bp": 100,
		"type": "Electric",
		"category": "Physical",
		"acc": 100
	},
	"Fusion Flare": {
		"bp": 100,
		"type": "Fire",
		"category": "Special",
		"acc": 100
	},
	"Future Sight": {"bp": 100},
	"Gear Grind": {
		"bp": 50,
		"type": "Steel",
		"category": "Physical",
		"isTwoHit": true,
		"makesContact": true,
		"acc": 85
	},
	"Giga Drain": {"bp": 75},
	"Glaciate": {
		"bp": 65,
		"type": "Ice",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isSpread": true,
		"acc": 95
	},
	"Grass Pledge": {
		"bp": 50,
		"type": "Grass",
		"category": "Special",
		"acc": 100
	},
	"Grass Pledge (Pledge Boosted)": {
		"bp": 150,
		"type": "Grass",
		"category": "Special",
		"acc": 100
	},
	"Guard Split": {
		"bp": 0,
		"type": "Psychic"
	},
	"Heal Pulse": {
		"bp": 0,
		"type": "Psychic"
	},
	"Heart Stamp": {
		"bp": 60,
		"type": "Psychic",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"makesContact": true,
		"acc": 100
	},
	"Head Charge": {
		"bp": 120,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"hasRecoil": 1/4,
		"acc": 100
	},
	"Heat Crash": {
		"bp": 1,
		"type": "Fire",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Heavy Slam": {
		"bp": 1,
		"type": "Steel",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Hex": {
		"bp": 50,
		"type": "Ghost",
		"category": "Special",
		"acc": 100
	},
	"High Jump Kick": {"bp": 130},
	"Hone Claws": {
		"bp": 0,
		"type": "Dark"
	},
	"Horn Leech": {
		"bp": 75,
		"type": "Grass",
		"category": "Physical",
		"makesContact": true,
		"percentHealed": 1/2,
		"acc": 100
	},
	"Hurricane": {
		"bp": 120,
		"type": "Flying",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isWind": true,
		"acc": 70
	},
	"Ice Burn": {
		"bp": 140,
		"type": "Ice",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 90
	},
	"Icicle Crash": {
		"bp": 85,
		"type": "Ice",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"acc": 90
	},
	"Icicle Spear": {"bp": 25},
	"Incinerate": {
		"bp": 30,
		"type": "Fire",
		"category": "Special",
		"isSpread": true,
		"acc": 100
	},
	"Inferno": {
		"bp": 100,
		"type": "Fire",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 50
	},
	"Jump Kick": {"bp": 100},
	"Last Resort": {"bp": 140},
	"Leaf Tornado": {
		"bp": 65,
		"type": "Grass",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 90
	},
	"Low Sweep": {
		"bp": 60,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Night Daze": {
		"bp": 85,
		"type": "Dark",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 95
	},
	"Petal Dance": {"bp": 120},
	"Power Split": {
		"bp": 0,
		"type": "Psychic"
	},
	"Psyshock": {
		"bp": 80,
		"type": "Psychic",
		"category": "Special",
		"dealsPhysicalDamage": true,
		"acc": 100
	},
	"Psystrike": {
		"bp": 100,
		"type": "Psychic",
		"category": "Special",
		"dealsPhysicalDamage": true,
		"acc": 100
	},
	"Quash": {
		"bp": 0,
		"type": "Dark"
	},
	"Quick Guard": {
		"bp": 0,
		"type": "Fighting"
	},
	"Quiver Dance": {
		"bp": 0,
		"type": "Bug"
	},
	"Rage Powder": {
		"bp": 0,
		"type": "Bug"
	},
	"Razor Shell": {
		"bp": 75,
		"type": "Water",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"isSlicing": true,
		"acc": 95
	},
	"Reflect Type": {
		"bp": 0,
		"type": "Normal"
	},
	"Relic Song": {
		"bp": 75,
		"type": "Normal",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isSound": true,
		"isSpread": true,
		"acc": 100
	},
	"Retaliate": {
		"bp": 70,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Round": {
		"bp": 60,
		"type": "Normal",
		"category": "Special",
		"acc": 100
	},
	"Sacred Sword": {
		"bp": 90,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"ignoresDefenseBoosts": true,
		"isSlicing": true,
		"acc": 100
	},
	"Sand Tomb": {"bp": 35},
	"Scald": {
		"bp": 80,
		"type": "Water",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Searing Shot": {
		"bp": 100,
		"type": "Fire",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isSpread": true,
		"isBullet": true,
		"acc": 100
	},
	"Secret Sword": {
		"bp": 85,
		"type": "Fighting",
		"category": "Special",
		"dealsPhysicalDamage": true,
		"acc": 100
	},
	"Shell Smash": {
		"bp": 0,
		"type": "Normal"
	},
	"Shift Gear": {
		"bp": 0,
		"type": "Steel"
	},
	"Sky Drop": {
		"bp": 60,
		"type": "Flying",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Sludge Wave": {
		"bp": 95,
		"type": "Poison",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isSpread": true,
		"acc": 100
	},
	"Smack Down": {
		"bp": 50,
		"type": "Rock",
		"category": "Physical",
		"acc": 100
	},
	"Snarl": {
		"bp": 55,
		"type": "Dark",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isSound": true,
		"isSpread": true,
		"acc": 95
	},
	"Soak": {
		"bp": 0,
		"type": "Water"
	},
	"Steamroller": {
		"bp": 65,
		"type": "Bug",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Stored Power": {
		"bp": 20,
		"type": "Psychic",
		"category": "Special",
		"acc": 100
	},
	"Storm Throw": {
		"bp": 40,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"alwaysCrit": true,
		"acc": 100
	},
	"Struggle Bug": {
		"bp": 30,
		"type": "Bug",
		"category": "Special",
		"hasSecondaryEffect": true,
		"isSpread": true,
		"acc": 100
	},
	"Synchronoise": {
		"bp": 70,
		"type": "Psychic",
		"category": "Special",
		"acc": 100
	},
	"Tackle": {"bp": 50},
	"Tail Slap": {
		"bp": 25,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"maxMultiHits": 5,
		"acc": 85
	},
	"Techno Blast": {
		"bp": 85,
		"type": "Normal",
		"category": "Special",
		"acc": 100
	},
	"Telekinesis": {
		"bp": 0,
		"type": "Psychic"
	},
	"Thrash": {"bp": 120},
	"Uproar": {"bp": 90},
	"V-create": {
		"bp": 180,
		"type": "Fire",
		"category": "Physical",
		"makesContact": true,
		"acc": 95
	},
	"Venoshock": {
		"bp": 65,
		"type": "Poison",
		"category": "Special",
		"acc": 100
	},
	"Volt Switch": {
		"bp": 70,
		"type": "Electric",
		"category": "Special",
		"acc": 100
	},
	"Water Pledge": {
		"bp": 50,
		"type": "Water",
		"category": "Special",
		"acc": 100
	},
	"Water Pledge (Pledge Boosted)": {
		"bp": 150,
		"type": "Water",
		"category": "Special",
		"acc": 100
	},
	"Whirlpool": {"bp": 35},
	"Wide Guard": {
		"bp": 0,
		"type": "Rock"
	},
	"Wild Charge": {
		"bp": 90,
		"type": "Electric",
		"category": "Physical",
		"makesContact": true,
		"hasRecoil": 1/4,
		"acc": 100
	},
	"Wonder Room": {
		"bp": 0,
		"type": "Psychic"
	},
	"Work Up": {
		"bp": 0,
		"type": "Normal"
	}
});

var MOVES_XY = $.extend(true, {}, MOVES_BW, {
	"Air Cutter": {"bp": 60},
	"Aromatic Mist": {
		"bp": 0,
		"type": "Fairy"
	},
	"Assurance": {"bp": 60},
	"Aura Sphere": {"bp": 80},
	"Baby-Doll Eyes": {
		"bp": 0,
		"type": "Fairy"
	},
	"Belch": {
		"bp": 120,
		"type": "Poison",
		"category": "Special",
		"acc": 90
	},
	"Blizzard": {"bp": 110},
	"Boomburst": {
		"bp": 140,
		"type": "Normal",
		"category": "Special",
		"isSound": true,
		"isSpread": true,
		"acc": 100
	},
	"Chatter": {"bp": 65},
	"Confide": {
		"bp": 0,
		"type": "Normal"
	},
	"Crabhammer": {"bp": 100},
	"Dazzling Gleam": {
		"bp": 80,
		"type": "Fairy",
		"category": "Special",
		"isSpread": true,
		"acc": 100
	},
	"Diamond Storm": {
		"bp": 100,
		"type": "Rock",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"isSpread": true,
		"acc": 95
	},
	"Disarming Voice": {
		"bp": 40,
		"type": "Fairy",
		"category": "Special",
		"isSound": true,
		"acc": 100
	},
	"Draco Meteor": {"bp": 130},
	"Dragon Ascent": {
		"bp": 120,
		"type": "Flying",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Dragon Pulse": {"bp": 85},
	"Draining Kiss": {
		"bp": 50,
		"type": "Fairy",
		"category": "Special",
		"makesContact": true,
		"percentHealed": 3/4,
		"acc": 100
	},
	"Eerie Impulse": {
		"bp": 0,
		"type": "Electric"
	},
	"Electric Terrain": {
		"bp": 0,
		"type": "Electric"
	},
	"Electrify": {
		"bp": 0,
		"type": "Electric"
	},
	"Energy Ball": {"bp": 90},
	"Fairy Wind": {
		"bp": 40,
		"type": "Fairy",
		"isWind": true,
		"category": "Special"
	},
	"Fell Stinger": {
		"bp": 30,
		"type": "Bug",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Fire Blast": {"bp": 110},
	"Fire Pledge": {"bp": 80},
	"Flamethrower": {"bp": 90},
	"Flower Shield": {
		"bp": 0,
		"type": "Flying"
	},
	"Flying Press": {
		"bp": 80,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"acc": 95
	},
	"Forest's Curse": {
		"bp": 0,
		"type": "Grass"
	},
	"Freeze-Dry": {
		"bp": 70,
		"type": "Ice",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Frost Breath": {"bp": 60},
	"Fury Cutter": {"bp": 40},
	"Future Sight": {"bp": 120},
	"Geomancy": {
		"bp": 0,
		"type": "Fairy"
	},
	"Grass Pledge": {"bp": 80},
	"Grassy Terrain": {
		"bp": 0,
		"type": "Grass"
	},
	"Heat Wave": {"bp": 95},
	"Hex": {"bp": 65},
	"Hidden Power Bug": {"bp": 60},
	"Hidden Power Dark": {"bp": 60},
	"Hidden Power Dragon": {"bp": 60},
	"Hidden Power Electric": {"bp": 60},
	"Hidden Power Fighting": {"bp": 60},
	"Hidden Power Fire": {"bp": 60},
	"Hidden Power Flying": {"bp": 60},
	"Hidden Power Ghost": {"bp": 60},
	"Hidden Power Grass": {"bp": 60},
	"Hidden Power Ground": {"bp": 60},
	"Hidden Power Ice": {"bp": 60},
	"Hidden Power Poison": {"bp": 60},
	"Hidden Power Psychic": {"bp": 60},
	"Hidden Power Rock": {"bp": 60},
	"Hidden Power Steel": {"bp": 60},
	"Hidden Power Water": {"bp": 60},
	"Hurricane": {"bp": 110},
	"Hydro Pump": {"bp": 110},
	"Hyperspace Fury": {
		"bp": 100,
		"type": "Dark",
		"category": "Physical",
		"bypassesProtect": true,
		"acc": 101
	},
	"Hyperspace Hole": {
		"bp": 80,
		"type": "Psychic",
		"category": "Special",
		"bypassesProtect": true,
		"acc": 101
	},
	"Ice Beam": {"bp": 90},
	"Incinerate": {"bp": 60},
	"Infestation": {
		"bp": 20,
		"type": "Bug",
		"category": "Special",
		"makesContact": true,
		"acc": 100
	},
	"King's Shield": {
		"bp": 0,
		"type": "Steel"
	},
	"Knock Off": {"bp": 65},
	"Land's Wrath": {
		"bp": 90,
		"type": "Ground",
		"category": "Physical",
		"isSpread": true,
		"acc": 100
	},
	"Leaf Storm": {"bp": 130},
	"Lick": {"bp": 30},
	"Light of Ruin": {
		"bp": 140,
		"type": "Fairy",
		"category": "Special",
		"hasRecoil": 1/2,
		"acc": 100
	},
	"Low Sweep": {"bp": 65},
	"Magma Storm": {"bp": 100},
	"Mat Block": {
		"bp": 0,
		"type": "Fighting"
	},
	"Magnetic Flux": {
		"bp": 0,
		"type": "Electric"
	},
	"Meteor Mash": {"bp": 90},
	"Misty Terrain": {
		"bp": 0,
		"type": "Fairy"
	},
	"Moonblast": {
		"bp": 95,
		"type": "Fairy",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Muddy Water": {"bp": 90},
	"Mystical Fire": {
		"bp": 65,
		"type": "Fire",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Noble Roar": {
		"bp": 0,
		"type": "Normal"
	},
	"Nuzzle": {
		"bp": 20,
		"type": "Electric",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"makesContact": true,
		"acc": 100
	},
	"Oblivion Wing": {
		"bp": 80,
		"type": "Flying",
		"category": "Special",
		"percentHealed": 3/4,
		"acc": 100
	},
	"Origin Pulse": {
		"bp": 110,
		"type": "Water",
		"category": "Special",
		"isSpread": true,
		"isPulse": true,
		"acc": 85
	},
	"Overheat": {"bp": 130},
	"Parabolic Charge": {
		"bp": 50,
		"type": "Electric",
		"category": "Special",
		"percentHealed": 1/2,
		"acc": 100
	},
	"Petal Blizzard": {
		"bp": 90,
		"type": "Grass",
		"category": "Physical",
		"isWind": true,
		"isSpread": true
	},
	"Parting Shot": {
		"bp": 0,
		"type": "Dark"
	},
	"Phantom Force": {
		"bp": 90,
		"type": "Ghost",
		"category": "Physical",
		"makesContact": true,
		"bypassesProtect": true,
		"acc": 100
	},
	"Pin Missile": {"bp": 25},
	"Play Nice": {
		"bp": 0,
		"type": "Fairy"
	},
	"Play Rough": {
		"bp": 90,
		"type": "Fairy",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 90
	},
	"Power Gem": {"bp": 80},
	"Power-Up Punch": {
		"bp": 40,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"isPunch": true,
		"acc": 100
	},
	"Precipice Blades": {
		"bp": 120,
		"type": "Ground",
		"category": "Physical",
		"isSpread": "true",
		"acc": 85
	},
	"Psychic Terrain": {
		"bp": 0,
		"type": "Psychic"
	},
	"Psywave": {"acc": 100},
	"Rock Tomb": {"bp": 60},
	"Skull Bash": {"bp": 130},
	"Spiky Shield": {
		"bp": 0,
		"type": "Grass"
	},
	"Smelling Salts": {"bp": 70},
	"Snore": {"bp": 50},
	"Steam Eruption": {
		"bp": 110,
		"type": "Water",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 95
	},
	"Sticky Web": {
		"bp": 0,
		"type": "Bug"
	},
	"Storm Throw": {"bp": 60},
	"Struggle Bug": {"bp": 50},
	"Surf": {"bp": 90},
	"Synchronoise": {"bp": 120},
	"Techno Blast": {"bp": 120},
	"Thief": {"bp": 60},
	"Thousand Arrows": {
		"bp": 90,
		"type": "Ground",
		"category": "Physical",
		"isSpread": "true",
		"acc": 100
	},
	"Thousand Waves": {
		"bp": 90,
		"type": "Ground",
		"category": "Physical",
		"isSpread": "true",
		"acc": 100
	},
	"Thunder": {"bp": 110},
	"Thunderbolt": {"bp": 90},
	"Trick-or-Treat": {
		"bp": 0,
		"type": "Ghost"
	},
	"Venom Drench": {
		"bp": 0,
		"type": "Poison"
	},
	"Wake-Up Slap": {"bp": 70},
	"Water Pledge": {"bp": 80},
	"Water Shuriken": {
		"bp": 15,
		"type": "Water",
		"category": "Physical",
		"hasPriority": true,
		"maxMultiHits": 5,
		"acc": 100
	}
});

var MOVES_SM = $.extend(true, {}, MOVES_XY, {
	"Acid Spray": {"zp": 100},
	"Accelerock": {
		"bp": 40,
		"type": "Rock",
		"category": "Physical",
		"makesContact": true,
		"hasPriority": true,
		"zp": 100,
		"acc": 100
	},
	"Acrobatics": {"zp": 100},
	"Aerial Ace": {"zp": 120},
	"Aeroblast": {"zp": 180},
	"Air Cutter": {"zp": 120},
	"Air Slash": {"zp": 140},
	"Anchor Shot": {
		"bp": 80,
		"type": "Steel",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"zp": 160,
		"acc": 100
	},
	"Ancient Power": {"zp": 120},
	"Aqua Jet": {"zp": 100},
	"Aqua Tail": {"zp": 175},
	"Arm Thrust": {"zp": 100},
	"Assurance": {"zp": 120},
	"Astonish": {"zp": 100},
	"Attack Order": {"zp": 175},
	"Aura Sphere": {"zp": 160},
	"Aurora Beam": {"zp": 120},
	"Aurora Veil": {
		"bp": 0,
		"type": "Ice"
	},
	"Avalanche": {"zp": 120},
	"Avalanche (Doubled)": {"zp": 120},
	"Baneful Bunker": {
		"bp": 0,
		"type": "Poison"
	},
	"Beak Blast": {
		"bp": 100,
		"type": "Flying",
		"category": "Physical",
		"zp": 180,
		"isBullet": true,
		"acc": 100
	},
	"Belch": {"zp": 190},
	"Bite": {"zp": 120},
	"Blast Burn": {"zp": 200},
	"Blaze Kick": {"zp": 160},
	"Blizzard": {"zp": 185},
	"Blue Flare": {"zp": 195},
	"Brave Bird": {"zp": 190},
	"Brine": {"zp": 120},
	"Body Slam": {"zp": 160},
	"Bolt Strike": {"zp": 195},
	"Bone Club": {"zp": 120},
	"Bone Rush": {"zp": 140},
	"Bonemerang": {"zp": 100},
	"Boomburst": {"zp": 200},
	"Bounce": {"zp": 160},
	"Brick Break": {"zp": 140},
	"Brutal Swing": {
		"bp": 60,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"isSpread": true,
		"zp": 120,
		"acc": 100
	},
	"Bubble Beam": {"zp": 120},
	"Bug Bite": {"zp": 120},
	"Bug Buzz": {"zp": 175},
	"Bulldoze": {"zp": 120},
	"Bullet Punch": {"zp": 100},
	"Bullet Seed": {"zp": 140},
	"Burn Up": {
		"bp": 130,
		"type": "Fire",
		"category": "Special",
		"zp": 195,
		"acc": 130
	},
	"Charge Beam": {"zp": 100},
	"Chatter": {"zp": 120},
	"Chip Away": {"zp": 140},
	"Circle Throw": {"zp": 120},
	"Clanging Scales": {
		"bp": 110,
		"type": "Dragon",
		"category": "Special",
		"isSound": true,
		"isSpread": true,
		"zp": 185,
		"acc": 100
	},
	"Clear Smog": {"zp": 100},
	"Close Combat": {"zp": 190},
	"Core Enforcer": {
		"bp": 100,
		"type": "Dragon",
		"category": "Special",
		"isSpread": true,
		"zp": 140,
		"acc": 140
	},
	"Covet": {"zp": 120},
	"Crabhammer": {"zp": 180},
	"Cross Chop": {"zp": 180},
	"Cross Poison": {"zp": 140},
	"Crunch": {"zp": 160},
	"Crush Claw": {"zp": 140},
	"Dark Pulse": {"zp": 160},
	"Darkest Lariat": {
		"bp": 85,
		"type": "Dark",
		"category": "Physical",
		"ignoresDefenseBoosts": true,
		"makesContact": true,
		"zp": 160,
		"acc": 100
	},
	"Dazzling Gleam": {"zp": 160},
	"Diamond Storm": {"zp": 180},
	"Dig": {"zp": 160},
	"Discharge": {"zp": 160},
	"Dive": {"zp": 160},
	"Dragon Hammer": {
		"bp": 90,
		"type": "Dragon",
		"category": "Physical",
		"makesContact": true,
		"zp": 175,
		"acc": 100
	},
	"Draining Kiss": {"zp": 100},
	"Drill Peck": {"zp": 160},
	"Doom Desire": {"zp": 200},
	"Double-Edge": {"zp": 190},
	"Double Hit": {"zp": 140},
	"Double Kick": {"zp": 100},
	"Draco Meteor": {"zp": 195},
	"Dragon Ascent": {"zp": 190},
	"Dragon Claw": {"zp": 160},
	"Dragon Pulse": {"zp": 160},
	"Dragon Rage": {"zp": 100},
	"Dragon Rush": {"zp": 180},
	"Dragon Tail": {"zp": 120},
	"Drain Punch": {"zp": 140},
	"Dream Eater": {"zp": 180},
	"Drill Run": {"zp": 160},
	"Dual Chop": {"zp": 100},
	"Dynamic Punch": {"zp": 180},
	"Earth Power": {"zp": 175},
	"Earthquake": {"zp": 180},
	"Electro Ball": {"zp": 160},
	"Electroweb": {"zp": 100},
	"Endeavor": {"zp": 160},
	"Energy Ball": {"zp": 175},
	"Eruption": {"zp": 200},
	"Explosion": {"zp": 200},
	"Extrasensory": {"zp": 160},
	"Extreme Speed": {"zp": 160},
	"Fake Out": {"zp": 100},
	"Facade": {"zp": 140},
	"Feint": {"zp": 100},
	"Feint Attack": {"zp": 120},
	"Fell Stinger": {"bp": "50", "zp": 100},
	"Fiery Dance": {"zp": 160},
	"Final Gambit": {"zp": 180},
	"Fire Blast": {"zp": 185},
	"Fire Fang": {"zp": 120},
	"Fire Lash": {
		"bp": 80,
		"type": "Fire",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"makesContact": true,
		"zp": 160,
		"acc": 100
	},
	"Fire Pledge": {"zp": 160},
	"Fire Punch": {"zp": 140},
	"First Impression": {
		"bp": 90,
		"type": "Bug",
		"category": "Physical",
		"makesContact": true,
		"hasPriority": true,
		"zp": 175,
		"acc": 100
	},
	"Flail": {"zp": 160},
	"Flamethrower": {"zp": 175},
	"Flame Burst": {"zp": 140},
	"Flame Charge": {"zp": 100},
	"Flame Wheel": {"zp": 120},
	"Flare Blitz": {"zp": 190},
	"Flash Cannon": {"zp": 160},
	"Fleur Cannon": {
		"bp": 130,
		"type": "Fairy",
		"category": "Special",
		"hasSecondaryEffect": true,
		"zp": 195,
		"dropsStats": 2,
		"acc": 90
	},
	"Fling": {"zp": 100},
	"Floral Healing": {
		"bp": 0,
		"type": "Fairy"
	},
	"Fly": {"zp": 175},
	"Flying Press": {"bp": 100, "zp": 170},
	"Focus Blast": {"zp": 190},
	"Focus Punch": {"zp": 200},
	"Force Palm": {"zp": 120},
	"Foul Play": {"zp": 175},
	"Freeze Shock": {"zp": 200},
	"Freeze-Dry": {"zp": 140},
	"Frenzy Plant": {"zp": 200},
	"Frost Breath": {"zp": 120},
	"Frustration": {"zp": 160},
	"Fury Swipes": {"zp": 100},
	"Fusion Bolt": {"zp": 180},
	"Fusion Flare": {"zp": 180},
	"Future Sight": {"zp": 190},
	"Gear Grind": {"zp": 180},
	"Giga Drain": {"zp": 140},
	"Giga Impact": {"zp": 200},
	"Glaciate": {"zp": 120},
	"Grass Knot": {"zp": 160},
	"Grass Pledge": {"zp": 160},
	"Gunk Shot": {"zp": 190},
	"Gust": {"zp": 100},
	"Gyro Ball": {"zp": 160},
	"Hammer Arm": {"zp": 180},
	"Headbutt": {"zp": 140},
	"Head Charge": {"zp": 190},
	"Head Smash": {"zp": 200},
	"Heart Stamp": {"zp": 120},
	"Heat Wave": {"zp": 175},
	"Heavy Slam": {"zp": 160},
	"Hex": {"zp": 160},
	"Hidden Power Bug": {"zp": 120},
	"Hidden Power Dark": {"zp": 120},
	"Hidden Power Dragon": {"zp": 120},
	"Hidden Power Electric": {"zp": 120},
	"Hidden Power Fighting": {"zp": 120},
	"Hidden Power Fire": {"zp": 120},
	"Hidden Power Flying": {"zp": 120},
	"Hidden Power Ghost": {"zp": 120},
	"Hidden Power Grass": {"zp": 120},
	"Hidden Power Ground": {"zp": 120},
	"Hidden Power Ice": {"zp": 120},
	"Hidden Power Poison": {"zp": 120},
	"Hidden Power Psychic": {"zp": 120},
	"Hidden Power Rock": {"zp": 120},
	"Hidden Power Steel": {"zp": 120},
	"Hidden Power Water": {"zp": 120},
	"High Horsepower": {
		"bp": 95,
		"type": "Ground",
		"category": "Physical",
		"makesContact": true,
		"zp": 175,
		"acc": 95
	},
	"High Jump Kick": {"zp": 195},
	"Horn Leech": {"zp": 140},
	"Hurricane": {"zp": 185},
	"Hydro Cannon": {"zp": 200},
	"Hydro Pump": {"zp": 185},
	"Hyper Beam": {"zp": 200},
	"Hyper Voice": {"zp": 175},
	"Hyperspace Fury": {"zp": 180},
	"Hyperspace Hole": {"zp": 160},
	"Ice Beam": {"zp": 175},
	"Ice Burn": {"zp": 200},
	"Ice Fang": {"zp": 120},
	"Ice Hammer": {
		"bp": 100,
		"type": "Ice",
		"category": "Physical",
		"makesContact": true,
		"isPunch": true,
		"zp": 180,
		"acc": 90
	},
	"Ice Punch": {"zp": 140},
	"Ice Shard": {"zp": 100},
	"Icicle Crash": {"zp": 160},
	"Icicle Spear": {"zp": 140},
	"Icy Wind": {"zp": 100},
	"Incinerate": {"zp": 120},
	"Inferno": {"zp": 180},
	"Infestation": {"zp": 100},
	"Instruct": {
		"bp": 0,
		"type": "Psychic"
	},
	"Iron Head": {"zp": 160},
	"Iron Tail": {"zp": 180},
	"Judgment": {"zp": 180},
	"Jump Kick": {"zp": 180},
	"Knock Off": {"zp": 120},
	"Land's Wrath": {"zp": 185},
	"Last Resort": {"zp": 200},
	"Lava Plume": {"zp": 160},
	"Leafage": {
		"bp": 40,
		"type": "Grass",
		"category": "Physical",
		"zp": 100,
		"acc": 100
	},
	"Leaf Blade": {"zp": 175},
	"Leaf Storm": {"zp": 195},
	"Leaf Tornado": {"zp": 120},
	"Leech Life": {"bp": 80, "zp": 160},
	"Light of Ruin": {"zp": 200},
	"Liquidation": {
		"bp": 85,
		"type": "Water",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"makesContact": true,
		"zp": 160,
		"acc": 100
	},
	"Low Kick": {"zp": 160},
	"Low Sweep": {"zp": 120},
	"Lunge": {
		"bp": 80,
		"type": "Bug",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"makesContact": true,
		"zp": 160,
		"acc": 100
	},
	"Luster Purge": {"zp": 140},
	"Mach Punch": {"zp": 100},
	"Magical Leaf": {"zp": 120},
	"Magma Storm": {"zp": 180},
	"Magnet Bomb": {"zp": 120},
	"Magnitude": {"zp": 140},
	"Megahorn": {"zp": 190},
	"Metal Claw": {"zp": 100},
	"Meteor Mash": {"zp": 175},
	"Mind Blown": {
		"bp": 150,
		"type": "Fire",
		"category": "Special",
		"isSpread": true,
		"hasRecoil": true,
		"zp": 200,
		"acc": 100
	},
	"Mirror Shot": {"zp": 120},
	"Mist Ball": {"zp": 140},
	"Moonblast": {"zp": 175},
	"Moongeist Beam": {
		"bp": 100,
		"type": "Ghost",
		"category": "Special",
		"negateAbility": true,
		"zp": 180,
		"acc": 100
	},
	"Muddy Water": {"zp": 175},
	"Mud Bomb": {"zp": 120},
	"Mud Shot": {"zp": 100},
	"Multi-Attack": {
		"bp": 90,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"zp": 185,
		"acc": 100
	},
	"Mystical Fire": {"bp": 75, "zp": 140},
	"Natural Gift": {"zp": 160},
	"Nature Power": {"zp": 160},
	"Nature's Madness": {
		"bp": 1,
		"type": "Fairy",
		"category": "Special",
		"zp": 100,
		"acc": 90,
		"noKOChance": true
	},
	"Needle Arm": {"zp": 120},
	"Night Daze": {"zp": 160},
	"Night Shade": {"zp": 100},
	"Night Slash": {"zp": 140},
	"Nuzzle": {"zp": 100},
	"Oblivion Wing": {"zp": 160},
	"Ominous Wind": {"zp": 120},
	"Origin Pulse": {"zp": 185},
	"Outrage": {"zp": 190},
	"Overheat": {"zp": 195},
	"Parabolic Charge": {"bp": 65, "zp": 120},
	"Payback": {"zp": 100},
	"Petal Dance": {"zp": 190},
	"Phantom Force": {"zp": 175},
	"Photon Geyser": {
		"bp": 100,
		"type": "Psychic",
		"category": "Special",
		"usesHighestAttackStat": true,
		"zp": 180,
		"acc": 100
	},
	"Pin Missile": {"zp": 140},
	"Plasma Fists": {
		"bp": 100,
		"type": "Electric",
		"category": "Physical",
		"makesContact": true,
		"isPunch": true,
		"zp": 180,
		"acc": 100
	},
	"Play Rough": {"zp": 175},
	"Pluck": {"zp": 120},
	"Poison Fang": {"zp": 100},
	"Poison Jab": {"zp": 160},
	"Poison Tail": {"zp": 100},
	"Pollen Puff": {
		"bp": 90,
		"type": "Bug",
		"category": "Special",
		"isBullet": true,
		"zp": 175,
		"acc": 100
	},
	"Power Gem": {"zp": 160},
	"Power Trip": {
		"bp": 20,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"zp": 160,
		"acc": 100
	},
	"Power Whip": {"zp": 190},
	"Power-Up Punch": {"zp": 100},
	"Prismatic Laser": {
		"bp": 160,
		"type": "Psychic",
		"category": "Special",
		"zp": 200,
		"acc": 100
	},
	"Precipice Blades": {"zp": 190},
	"Psychic": {"zp": 175},
	"Psychic Fangs": {
		"bp": 85,
		"type": "Psychic",
		"category": "Physical",
		"makesContact": true,
		"isBite": true,
		"zp": 160,
		"acc": 100
	},
	"Psycho Boost": {"zp": 200},
	"Psycho Cut": {"zp": 140},
	"Psyshock": {"zp": 160},
	"Psystrike": {"zp": 180},
	"Psywave": {"zp": 100},
	"Punishment": {"zp": 160},
	"Pursuit": {"zp": 100},
	"Quick Attack": {"zp": 100},
	"Rapid Spin": {"zp": 100},
	"Razor Leaf": {"zp": 120},
	"Razor Shell": {"zp": 140},
	"Relic Song": {"zp": 140},
	"Retaliate": {"zp": 140},
	"Return": {"zp": 160},
	"Revelation Dance": {
		"bp": 90,
		"type": "Normal",
		"category": "Special",
		"zp": 175,
		"acc": 100
	},
	"Revenge": {"zp": 120},
	"Revenge (Doubled)": {"zp": 120},
	"Reversal": {"zp": 160},
	"Roar of Time": {"zp": 200},
	"Rock Blast": {"isBullet": true, "zp": 140},
	"Rock Climb": {"zp": 175},
	"Rock Slide": {"zp": 140},
	"Rock Smash": {"zp": 100},
	"Rock Throw": {"zp": 100},
	"Rock Tomb": {"zp": 140},
	"Rock Wrecker": {"zp": 200},
	"Round": {"zp": 120},
	"Sacred Fire": {"zp": 180},
	"Sacred Sword": {"zp": 175},
	"Sand Tomb": {"zp": 100},
	"Scald": {"zp": 160},
	"Searing Shot": {"zp": 180},
	"Secret Power": {"zp": 140},
	"Secret Sword": {"zp": 160},
	"Seed Bomb": {"zp": 160},
	"Seed Flare": {"zp": 190},
	"Seismic Toss": {"zp": 100},
	"Self-Destruct": {"zp": 200},
	"Shadow Claw": {"zp": 140},
	"Shadow Force": {"zp": 190},
	"Shadow Sneak": {"zp": 100},
	"Shadow Strike": {"zp": 160},
	"Shadow Ball": {"zp": 160},
	"Shadow Bone": {
		"bp": 85,
		"type": "Ghost",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"zp": 160,
		"acc": 100
	},
	"Shadow Punch": {"zp": 120},
	"Sheer Cold": {
		"zp": 180
	},
	"Fissure": {
		"zp": 180
	},
	"Horn Drill": {
		"zp": 180
	},
	"Guillotine": {
		"zp": 180
	},
	"Shell Trap": {
		"bp": 150,
		"type": "Fire",
		"category": "Special",
		"isSpread": true,
		"zp": 200,
		"acc": 100
	},
	"Shock Wave": {"zp": 120},
	"Shore Up": {
		"bp": 0,
		"type": "Ground"
	},
	"Signal Beam": {"zp": 140},
	"Silver Wind": {"zp": 120},
	"Skull Bash": {"zp": 195},
	"Sky Attack": {"zp": 200},
	"Sky Drop": {"zp": 120},
	"Sky Uppercut": {"zp": 160},
	"Slash": {"zp": 140},
	"Sludge": {"zp": 120},
	"Sludge Bomb": {"zp": 175},
	"Sludge Wave": {"zp": 175},
	"Smack Down": {"zp": 100},
	"Smart Strike": {
		"bp": 70,
		"type": "Steel",
		"category": "Physical",
		"makesContact": true,
		"zp": 140,
		"acc": 101
	},
	"Snarl": {"zp": 100},
	"Snore": {"zp": 100},
	"Solar Beam": {"zp": 190},
	"Solar Blade": {
		"bp": 125,
		"type": "Grass",
		"category": "Physical",
		"makesContact": true,
		"isSlicing": true,
		"zp": 190,
		"acc": 100
	},
	"Sonic Boom": {"zp": 100},
	"Spacial Rend": {"zp": 180},
	"Spark": {"zp": 120},
	"Sparkling Aria": {
		"bp": 90,
		"type": "Water",
		"category": "Special",
		"isSound": true,
		"isSpread": true,
		"zp": 175,
		"acc": 100
	},
	"Spectral Thief": {
		"bp": 90,
		"type": "Ghost",
		"category": "Physical",
		"makesContact": true,
		"zp": 175,
		"acc": 100
	},
	"Spirit Shackle": {
		"bp": 80,
		"type": "Ghost",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"zp": 160,
		"acc": 100
	},
	"Steam Eruption": {"zp": 185},
	"Steamroller": {"zp": 120},
	"Steel Wing": {"zp": 140},
	"Stomp": {"zp": 120},
	"Stomping Tantrum": {
		"bp": 75,
		"type": "Ground",
		"category": "Physical",
		"makesContact": true,
		"zp": 140,
		"acc": 100
	},
	"Stone Edge": {"zp": 180},
	"Stored Power": {"zp": 160},
	"Storm Throw": {"zp": 120},
	"Strength Sap": {
		"bp": 0,
		"type": "Grass"
	},
	"Struggle Bug": {"zp": 100},
	"Submission": {"zp": 160},
	"Sucker Punch": {"bp": 70, "zp": 140},
	"Sunsteel Strike": {
		"bp": 100,
		"type": "Steel",
		"category": "Physical",
		"makesContact": true,
		"negateAbility": true,
		"zp": 180,
		"acc": 100
	},
	"Super Fang": {"zp": 100},
	"Superpower": {"zp": 190},
	"Surf": {"zp": 175},
	"Swift": {"zp": 120},
	"Synchronoise": {"zp": 190},
	"Tackle": {"bp": 40, "zp": 100},
	"Take Down": {"zp": 160},
	"Tail Slap": {"zp": 140},
	"Tearful Look": {
		"bp": 0,
		"type": "Normal"
	},
	"Techno Blast": {"zp": 190},
	"Thief": {"zp": 120},
	"Thousand Arrows": {"zp": 180},
	"Thousand Waves": {"zp": 175},
	"Thrash": {"zp": 190},
	"Throat Chop": {
		"bp": 80,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"zp": 160,
		"acc": 100
	},
	"Thunder": {"zp": 185},
	"Thunderbolt": {"zp": 175},
	"Thunder Fang": {"zp": 120},
	"Thunder Punch": {"zp": 140},
	"Tri Attack": {"zp": 160},
	"Triple Kick": {"zp": 120},
	"Trop Kick": {
		"bp": 70,
		"type": "Grass",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"makesContact": true,
		"zp": 140,
		"acc": 100
	},
	"Twineedle": {"zp": 100},
	"U-turn": {"zp": 140},
	"Uproar": {"zp": 175},
	"V-create": {"zp": 220},
	"Vacuum Wave": {"zp": 100},
	"Venoshock": {"zp": 120},
	"Volt Switch": {"zp": 140},
	"Volt Tackle": {"zp": 190},
	"Wake-Up Slap": {"zp": 140},
	"Waterfall": {"zp": 160},
	"Water Pledge": {"zp": 160},
	"Water Pulse": {"zp": 120},
	"Water Shuriken": {
		"category": "Special",
		"zp": 100
	},
	"Water Spout": {"zp": 200},
	"Weather Ball": {"zp": 160},
	"Whirlpool": {"zp": 100},
	"Wild Charge": {"zp": 175},
	"Wing Attack": {"zp": 120},
	"Wood Hammer": {"zp": 190},
	"Wring Out": {"zp": 190},
	"X-Scissor": {"zp": 160},
	"Zap Cannon": {"zp": 190},
	"Zen Headbutt": {"zp": 160},
	"Zing Zap": {
		"bp": 80,
		"type": "Electric",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"makesContact": true,
		"zp": 160,
		"acc": 100
	}
});

var MOVES_SS = $.extend(true, {}, MOVES_SM, {
	"Double Iron Bash": {
		"bp": 60,
		"type": "Steel",
		"category": "Physical",
		"isTwoHit": true,
		"makesContact": true,
		"isPunch": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Dynamax Cannon": {
		"bp": 100,
		"type": "Dragon",
		"category": "Special",
		"acc": 100
	},
	"Snipe Shot": {
		"bp": 80,
		"type": "Water",
		"category": "Special",
		"acc": 100
	},
	"Jaw Lock": {
		"bp": 80,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"isBite": true,
		"acc": 100
	},
	"Dragon Darts": {
		"bp": 50,
		"type": "Dragon",
		"category": "Physical",
		"maxMultiHits": 2,
		"acc": 100
	},
	"Bolt Beak": {
		"bp": 85,
		"type": "Electric",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Bolt Beak (Doubled)": {
		"bp": 170,
		"type": "Electric",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Fishious Rend": {
		"bp": 85,
		"type": "Water",
		"category": "Physical",
		"isBite": true,
		"makesContact": true,
		"acc": 100
	},
	"Fishious Rend (Doubled)": {
		"bp": 170,
		"type": "Water",
		"category": "Physical",
		"isBite": true,
		"makesContact": true,
		"acc": 100
	},
	"Body Press": {
		"bp": 80,
		"type": "Fighting",
		"makesContact": true,
		"category": "Physical",
		"acc": 100
	},
	"Drum Beating": {
		"bp": 80,
		"type": "Grass",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Snap Trap": {
		"bp": 35,
		"type": "Grass",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Pyro Ball": {
		"bp": 120,
		"type": "Fire",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"acc": 90
	},
	"Behemoth Blade": {
		"bp": 100,
		"type": "Steel",
		"isSlicing": true,
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Behemoth Bash": {
		"bp": 100,
		"type": "Steel",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Aura Wheel": {
		"bp": 110,
		"type": "Electric",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Breaking Swipe": {
		"bp": 60,
		"type": "Dragon",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"makesContact": true,
		"isSpread": true,
		"acc": 100
	},
	"Branch Poke": {
		"bp": 40,
		"type": "Grass",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Overdrive": {
		"bp": 80,
		"type": "Electric",
		"category": "Special",
		"isSound": true,
		"isSpread": true,
		"acc": 100
	},
	"Apple Acid": {
		"bp": 80,
		"type": "Grass",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Grav Apple": {
		"bp": 80,
		"type": "Grass",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Spirit Break": {
		"bp": 75,
		"type": "Fairy",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"makesContact": true,
		"acc": 100
	},
	"Strange Steam": {
		"bp": 90,
		"type": "Fairy",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 95
	},
	"False Surrender": {
		"bp": 80,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"acc": 101
	},
	"Meteor Assault": {
		"bp": 150,
		"type": "Fighting",
		"category": "Physical",
		"acc": 100
	},
	"Eternabeam": {
		"bp": 160,
		"type": "Dragon",
		"category": "Special",
		"acc": 90
	},
	"Steel Beam": {
		"bp": 140,
		"type": "Steel",
		"category": "Special",
		"hasRecoil": true,
		"acc": 95
	},
	"Stuff Cheeks": {
		"bp": 0,
		"type": "Normal"
	},
	"Tar Shot": {
		"bp": 0,
		"type": "Rock"
	},
	"Teatime": {
		"bp": 0,
		"type": "Normal"
	},
	"Magic Powder": {
		"bp": 0,
		"type": "Psychic"
	},
	"No Retreat": {
		"bp": 0,
		"type": "Fighting"
	},
	"Clangorous Soul": {
		"bp": 0,
		"type": "Dragon"
	},
	"Octolock": {
		"bp": 0,
		"type": "Fighting"
	},
	"Court Change": {
		"bp": 0,
		"type": "Normal"
	},
	"Decorate": {
		"bp": 0,
		"type": "Fairy"
	},
	"Obstruct": {
		"bp": 0,
		"type": "Dark"
	},
	"Multi-Attack": {"bp": 120},
	"Rapid Spin": {"bp": 50},
	"Shell Side Arm": {
		"bp": 90,
		"type": "Poison",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Terrain Pulse": {
		"bp": 50,
		"type": "Normal",
		"category": "Special",
		"isPulse": true,
		"acc": 100
	},
	"Burning Jealousy": {
		"bp": 70,
		"type": "Fire",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Flip Turn": {
		"bp": 60,
		"type": "Water",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Rising Voltage": {
		"bp": 70,
		"type": "Electric",
		"category": "Special",
		"acc": 100
	},
	"Grassy Glide": {
		"bp": 70,
		"type": "Grass",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Triple Axel": {
		"bp": 20,
		"type": "Ice",
		"category": "Physical",
		"makesContact": true,
		"maxMultiHits": 3,
		"acc": 90
	},
	"Scorching Sands": {
		"bp": 70,
		"type": "Ground",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Dual Wingbeat": {
		"bp": 40,
		"type": "Flying",
		"category": "Physical",
		"makesContact": true,
		"acc": 90,
		"isTwoHit": true
	},
	"Expanding Force": {
		"bp": 80,
		"type": "Psychic",
		"category": "Special",
		"acc": 100
	},
	"Skitter Smack": {
		"bp": 70,
		"type": "Bug",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"makesContact": true,
		"acc": 90
	},
	"Meteor Beam": {
		"bp": 120,
		"type": "Rock",
		"category": "Special",
		"acc": 90
	},
	"Poltergeist": {
		"bp": 110,
		"type": "Ghost",
		"category": "Physical",
		"acc": 90
	},
	"Scale Shot": {
		"bp": 25,
		"type": "Dragon",
		"category": "Physical",
		"acc": 90,
		"maxMultiHits": 5
	},
	"Lash Out": {
		"bp": 75,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Lash Out (Doubled)": {
		"bp": 150,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Steel Roller": {
		"bp": 130,
		"type": "Steel",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Misty Explosion": {
		"bp": 100,
		"type": "Fairy",
		"category": "Special",
		"isSpread": true,
		"acc": 100
	},
	"Surging Strikes": {
		"bp": 25,
		"type": "Water",
		"category": "Physical",
		"makesContact": true,
		"isThreeHit": true,
		"acc": 100,
		"alwaysCrit": true
	},
	"Wicked Blow": {
		"bp": 80,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"acc": 100,
		"alwaysCrit": true
	},
	"Coaching": {
		"bp": 0,
		"type": "Fighting"
	},
	"Corrosive Gas": {
		"bp": 0,
		"type": "Poison"
	},
	"Jungle Healing": {
		"bp": 0,
		"type": "Grass"
	},
	"Eerie Spell": {
		"bp": 80,
		"type": "Psychic",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Freezing Glare": {
		"bp": 90,
		"type": "Psychic",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Fiery Wrath": {
		"bp": 90,
		"type": "Dark",
		"category": "Special",
		"isSpread": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Thunderous Kick": {
		"bp": 90,
		"type": "Fighting",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"makesContact": true,
		"acc": 100
	},
	"Glacial Lance": {
		"bp": 130,
		"type": "Ice",
		"category": "Physical",
		"isSpread": true,
		"acc": 100
	},
	"Astral Barrage": {
		"bp": 120,
		"type": "Ghost",
		"category": "Special",
		"isSpread": true,
		"acc": 100
	},
	"Thunder Cage": {
		"bp": 80,
		"type": "Electric",
		"category": "Special",
		"acc": 90
	},
	"Dragon Energy": {
		"bp": 150,
		"type": "Dragon",
		"category": "Special",
		"isSpread": true,
		"acc": 100
	}
});

var MOVES_SV = $.extend(true, {}, MOVES_SS, {
	"Aqua Cutter": {
		"bp": 70,
		"type": "Water",
		"category": "Physical",
		"isSlicing": true,
		"acc": 100
	},
	"Aqua Step": {
		"bp": 80,
		"type": "Water",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Armor Cannon": {
		"bp": 120,
		"type": "Fire",
		"category": "Special",
		"acc": 100
	},
	"Axe Kick": {
		"bp": 120,
		"type": "Fighting",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"makesContact": true,
		"hasRecoil": "crash",
		"acc": 90,
	},
	"Bitter Blade": {
		"bp": 90,
		"type": "Fire",
		"category": "Physical",
		"makesContact": true,
		"percentHealed": 1/2,
		"isSlicing": true,
		"acc": 100
	},
	"Chilling Water": {
		"bp": 50,
		"type": "Water",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Chilly Reception": {
		"bp": 0,
		"type": "Ice"
	},
	"Collision Course": {
		"bp": 100,
		"type": "Fighting",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Comeuppance": {
		"bp": 1,
		"type": "Dark",
		"makesContact": true
	},
	"Doodle": {
		"bp": 0,
		"type": "Normal"
	},
	"Double Shock": {
		"bp": 120,
		"type": "Electric",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Electro Drift": {
		"bp": 100,
		"type": "Electric",
		"category": "Special",
		"makesContact": true,
		"acc": 100
	},
	"Fillet Away": {
		"bp": 0,
		"type": "Normal"
	},
	"Flower Trick": {
		"bp": 70,
		"type": "Grass",
		"category": "Physical",
		"alwaysCrit": true,
		"acc": 101
	},
	"Gigaton Hammer": {
		"bp": 160,
		"type": "Steel",
		"category": "Physical",
		"acc": 100
	},
	"Glaive Rush": {
		"bp": 120,
		"type": "Dragon",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Hyper Drill": {
		"bp": 100,
		"type": "Normal",
		"category": "Physical",
		"bypassesProtect": true,
		"makesContact": true,
		"acc": 100
	},
	"Ice Spinner": {
		"bp": 80,
		"type": "Ice",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Jet Punch": {
		"bp": 60,
		"type": "Water",
		"category": "Physical",
		"makesContact": true,
		"isPunch": true,
		"hasPriority": true,
		"acc": 100
	},
	"Kowtow Cleave": {
		"bp": 85,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true,
		"isSlicing": true,
		"acc": 101
	},
	"Last Respects": {
		"bp": 50,
		"type": "Ghost",
		"category": "Physical",
		"acc": 100
	},
	"Lumina Crash": {
		"bp": 80,
		"type": "Psychic",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Make It Rain": {
		"bp": 120,
		"type": "Steel",
		"category": "Special",
		"isSpread": true,
		"acc": 100
	},
	"Mortal Spin": {
		"bp": 30,
		"type": "Poison",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"makesContact": true,
		"acc": 100
	},
	"Order Up": {
		"bp": 80,
		"type": "Dragon",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Population Bomb": {
		"bp": 20,
		"type": "Normal",
		"category": "Physical",
		"maxMultiHits": 10,
		"makesContact": true,
		"isSlicing": true,
		"acc": 90
	},
	"Pounce": {
		"bp": 50,
		"type": "Bug",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"makesContact": true,
		"acc": 100
	},
	"Rage Fist": {
		"bp": 50,
		"type": "Ghost",
		"category": "Physical",
		"makesContact": true,
		"isPunch": true,
		"acc": 100
	},
	"Raging Bull": {
		"bp": 90,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Revival Blessing": {
		"bp": 0,
		"type": "Normal"
	},
	"Ruination": {
		"bp": 1,
		"category": "Special",
		"type": "Dark",
		"acc": 90,
		"noKOChance": true
	},
	"Salt Cure": {
		"bp": 40,
		"type": "Rock",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Shed Tail": {
		"bp": 0,
		"type": "Normal"
	},
	"Silk Trap": {
		"bp": 0,
		"type": "Bug"
	},
	"Snowscape": {
		"bp": 0,
		"type": "Ice"
	},
	"Spicy Extract": {
		"bp": 0,
		"type": "Grass"
	},
	"Spin Out": {
		"bp": 100,
		"type": "Steel",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Tera Blast": {
		"bp": 80,
		"type": "Normal",
		"category": "Special",
		"acc": 100
	},
	"Tidy Up": {
		"bp": 0,
		"type": "Normal"
	},
	"Torch Song": {
		"bp": 80,
		"type": "Fire",
		"category": "Special",
		"isSound": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Trailblaze": {
		"bp": 50,
		"type": "Grass",
		"category": "Physical",
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Triple Dive": {
		"bp": 30,
		"type": "Water",
		"category": "Physical",
		"makesContact": true,
		"isThreeHit": true,
		"acc": 95
	},
	"Twin Beam": {
		"bp": 40,
		"type": "Psychic",
		"category": "Special",
		"isTwoHit": true,
		"acc": 100
	},
	"Grassy Glide": {"bp": 55},
	"Wicked Blow": {"bp": 75},
	"Glacial Lance": {"bp": 120},
	"Barb Barrage": {
		"bp": 60,
		"type": "Poison",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Bitter Malice": {
		"bp": 75,
		"type": "Ghost",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Bleakwind Storm": {
		"bp": 100,
		"type": "Flying",
		"category": "Special",
		"isSpread": true,
		"isWind": true,
		"hasSecondaryEffect": true,
		"acc": 80
	},
	"Ceaseless Edge": {
		"bp": 65,
		"type": "Dark",
		"category": "Physical",
		"isSlicing": true,
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Chloroblast": {
		"bp": 150,
		"type": "Grass",
		"category": "Special",
		"hasRecoil": true,
		"acc": 95
	},
	"Dire Claw": {
		"bp": 80,
		"type": "Poison",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"makesContact": true,
		"acc": 100
	},
	"Esper Wing": {
		"bp": 80,
		"type": "Psychic",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Headlong Rush": {
		"bp": 120,
		"type": "Ground",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Infernal Parade": {
		"bp": 60,
		"type": "Ghost",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Lunar Blessing": {
		"bp": 0,
		"type": "Psychic"
	},
	"Mountain Gale": {
		"bp": 100,
		"type": "Ice",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"acc": 85
	},
	"Mystical Power": {
		"bp": 70,
		"type": "Psychic",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 90
	},
	"Power Shift": {
		"bp": 0,
		"type": "Normal"
	},
	"Psyshield Bash": {
		"bp": 70,
		"type": "Psychic",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"makesContact": true,
		"acc": 90
	},
	"Raging Fury": {
		"bp": 120,
		"type": "Fire",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Sandsear Storm": {
		"bp": 100,
		"type": "Ground",
		"category": "Special",
		"isSpread": true,
		"isWind": true,
		"hasSecondaryEffect": true,
		"acc": 80
	},
	"Shelter": {
		"bp": 0,
		"type": "Steel"
	},
	"Springtide Storm": {
		"bp": 100,
		"type": "Fairy",
		"category": "Special",
		"isSpread": true,
		"isWind": true,
		"hasSecondaryEffect": true,
		"acc": 80
	},
	"Stone Axe": {
		"bp": 65,
		"type": "Rock",
		"category": "Physical",
		"isSlicing": true,
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 90
	},
	"Take Heart": {
		"bp": 0,
		"type": "Psychic"
	},
	"Triple Arrows": {
		"bp": 90,
		"type": "Fighting",
		"category": "Physical",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Victory Dance": {
		"bp": 0,
		"type": "Fighting"
	},
	"Wave Crash": {
		"bp": 120,
		"type": "Water",
		"category": "Physical",
		"makesContact": true,
		"hasRecoil": 1/3,
		"acc": 100
	},
	"Wildbolt Storm": {
		"bp": 100,
		"type": "Electric",
		"category": "Special",
		"isSpread": true,
		"isWind": true,
		"hasSecondaryEffect": true,
		"acc": 80
	},
	"Psyblade": {
		"bp": 80,
		"type": "Psychic",
		"category": "Physical",
		"makesContact": true,
		"isSlicing": true,
		"acc": 100
	},
	"Hydro Steam": {
		"bp": 80,
		"type": "Water",
		"category": "Special",
		"acc": 100
	},

	"Blood Moon": {
		"bp": 140,
		"type": "Normal",
		"category": "Special",
		"acc": 100
	},
	"Ivy Cudgel": {
		"bp": 100,
		"type": "Grass",
		"category": "Physical",
		"acc": 100
	},
	"Matcha Gotcha": {
		"bp": 80,
		"type": "Grass",
		"category": "Special",
		"hasSecondaryEffect": true,
		"percentHealed": 1/2,
		"acc": 90
	},
	"Syrup Bomb": {
		"bp": 60,
		"type": "Grass",
		"category": "Special",
		"isBullet": true,
		"acc": 85
	},

	"Alluring Voice": {
		"bp": 80,
		"type": "Fairy",
		"category": "Special",
		"isSound": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Electro Shot": {
		"bp": 130,
		"type": "Electric",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Fickle Beam": {
		"bp": 80,
		"type": "Dragon",
		"category": "Special",
		"acc": 100
	},
	"Hard Press": {
		"bp": 1,
		"type": "Steel",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Malignant Chain": {
		"bp": 100,
		"type": "Poison",
		"category": "Special",
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Mighty Cleave": {
		"bp": 95,
		"type": "Rock",
		"category": "Physical",
		"makesContact": true,
		"isSlicing": true,
		"bypassesProtect": true,
		"acc": 100
	},
	"Psychic Noise": {
		"bp": 75,
		"type": "Psychic",
		"category": "Special",
		"isSound": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Supercell Slam": {
		"bp": 100,
		"type": "Electric",
		"category": "Physical",
		"makesContact": true,
		"hasRecoil": "crash",
		"acc": 95
	},
	"Tachyon Cutter": {
		"bp": 50,
		"type": "Steel",
		"category": "Special",
		"isSlicing": true,
		"isTwoHit": true,
		"acc": 101
	},
	"Temper Flare": {
		"bp": 75,
		"type": "Fire",
		"category": "Physical",
		"makesContact": true,
		"acc": 100
	},
	"Tera Starstorm": {
		"bp": 120,
		"type": "Normal",
		"category": "Special",
		"acc": 100
	},
	"Thunderclap": {
		"bp": 70,
		"type": "Electric",
		"category": "Special",
		"hasPriority": true,
		"acc": 100
	},
	"Upper Hand": {
		"bp": 65,
		"type": "Fighting",
		"category": "Physical",
		"hasPriority": true,
		"makesContact": true,
		"hasSecondaryEffect": true,
		"acc": 100
	},
	"Luster Purge": {"bp": 95},
	"Mist Ball": {"bp": 95}
});


var ZMOVES_LOOKUP = {
	"Bug": "Savage Spin-Out",
	"Dark": "Black Hole Eclipse",
	"Dragon": "Devastating Drake",
	"Electric": "Gigavolt Havoc",
	"Fairy": "Twinkle Tackle",
	"Fighting": "All-Out Pummeling",
	"Fire": "Inferno Overdrive",
	"Flying": "Supersonic Skystrike",
	"Ghost": "Never-Ending Nightmare",
	"Grass": "Bloom Doom",
	"Ground": "Tectonic Rage",
	"Ice": "Subzero Slammer",
	"Normal": "Breakneck Blitz",
	"Poison": "Acid Downpour",
	"Psychic": "Shattered Psyche",
	"Rock": "Continental Crush",
	"Steel": "Corkscrew Crash",
	"Water": "Hydro Vortex"
};

var EXCLUSIVE_ZMOVES_LOOKUP = {
	"Kommonium Z": {
		"zMoveName": "Clangorous Soulblaze",
		"baseMove": "Clanging Scales"
	},
	"Incinium Z": {
		"zMoveName": "Malicious Moonsault",
		"baseMove": "Darkest Lariat"
	},
	"Snorlium Z": {
		"zMoveName": "Pulverizing Pancake",
		"baseMove": "Giga Impact"
	},
	"Lunalium Z": {
		"zMoveName": "Menacing Moonraze Maelstrom",
		"baseMove": "Moongeist Beam"
	},
	"Ultranecrozium Z": {
		"zMoveName": "Light That Burns the Sky",
		"baseMove": "Photon Geyser"
	},
	"Mimikium Z": {
		"zMoveName": "Let\'s Snuggle Forever",
		"baseMove": "Play Rough"
	},
	"Mewnium Z": {
		"zMoveName": "Genesis Supernova",
		"baseMove": "Psychic"
	},
	"Primarium Z": {
		"zMoveName": "Oceanic Operetta",
		"baseMove": "Sparkling Aria"
	},
	"Marshadium Z": {
		"zMoveName": "Soul-Stealing 7-Star Strike",
		"baseMove": "Spectral Thief"
	},
	"Decidium Z": {
		"zMoveName": "Sinister Arrow Raid",
		"baseMove": "Spirit Shackle"
	},
	"Lycanium Z": {
		"zMoveName": "Splintered Stormshards",
		"baseMove": "Stone Edge"
	},
	"Solganium Z": {
		"zMoveName": "Searing Sunraze Smash",
		"baseMove": "Sunsteel Strike"
	},
	"Aloraichium Z": {
		"zMoveName": "Stoked Sparksurfer",
		"baseMove": "Thunderbolt"
	},
	"Pikashunium Z": {
		"zMoveName": "10,000,000 Volt Thunderbolt",
		"baseMove": "Thunderbolt"
	},
	"Pikanium Z": {
		"zMoveName": "Catastropika",
		"baseMove": "Volt Tackle"
	},
	"Tapunium Z": {
		"zMoveName": "Guardian of Alola",
		"baseMove": "Nature\'s Madness"
	}
};

var EXCLUSIVE_ZMOVES = {
	"10,000,000 Volt Thunderbolt": {
		"bp": 195,
		"type": "Electric",
		"category": "Special"
	},
	"Catastropika": {
		"bp": 210,
		"type": "Electric",
		"category": "Physical",
		"makesContact": true
	},
	"Clangorous Soulblaze": {
		"bp": 185,
		"type": "Dragon",
		"category": "Special",
		"isSound": true,
		"isSpread": true,
		"hasSecondaryEffect": true
	},
	"Genesis Supernova": {
		"bp": 185,
		"type": "Psychic",
		"category": "Special"
	},
	"Guardian of Alola": {
		"bp": 1,
		"type": "Fairy",
		"category": "Special",
		"noKOChance": true
	},
	"Let's Snuggle Forever": {
		"bp": 190,
		"type": "Fairy",
		"category": "Physical",
		"makesContact": true
	},
	"Light That Burns the Sky": {
		"bp": 200,
		"type": "Psychic",
		"category": "Special",
		"usesHighestAttackStat": true,
		"negateAbility": true
	},
	"Malicious Moonsault": {
		"bp": 180,
		"type": "Dark",
		"category": "Physical",
		"makesContact": true
	},
	"Menacing Moonraze Maelstrom": {
		"bp": 200,
		"type": "Ghost",
		"category": "Special",
		"negateAbility": true
	},
	"Oceanic Operetta": {
		"bp": 195,
		"type": "Water",
		"category": "Special"
	},
	"Pulverizing Pancake": {
		"bp": 210,
		"type": "Normal",
		"category": "Physical",
		"makesContact": true
	},
	"Searing Sunraze Smash": {
		"bp": 200,
		"type": "Steel",
		"category": "Physical",
		"makesContact": true,
		"negateAbility": true
	},
	"Sinister Arrow Raid": {
		"bp": 180,
		"type": "Ghost",
		"category": "Physical"
	},
	"Soul-Stealing 7-Star Strike": {
		"bp": 195,
		"type": "Ghost",
		"category": "Physical"
	},
	"Splintered Stormshards": {
		"bp": 190,
		"type": "Rock",
		"category": "Physical"
	},
	"Stoked Sparksurfer": {
		"bp": 175,
		"type": "Electric",
		"category": "Special",
		"hasSecondaryEffect": true
	}
};

var MAXMOVES_LOOKUP = {
	"Normal": "Max Strike",
	"Fire": "Max Flare",
	"Water": "Max Geyser",
	"Electric": "Max Lightning",
	"Grass": "Max Overgrowth",
	"Ghost": "Max Phantasm",
	"Dark": "Max Darkness",
	"Psychic": "Max Mindstorm",
	"Fighting": "Max Knuckle",
	"Steel": "Max Steelspike",
	"Ice": "Max Hailstorm",
	"Ground": "Max Quake",
	"Rock": "Max Rockfall",
	"Bug": "Max Flutterby",
	"Fairy": "Max Starfall",
	"Flying": "Max Airstream",
	"Dragon": "Max Wyrmwind",
	"Poison": "Max Ooze"
};

var MAXMOVES_POWER = {
	// Fighting
	"Final Gambit": 100,
	"Focus Punch": 100,
	"Low Kick": 100,
	"Meteor Assault": 100,
	"Reversal": 100,
	"Close Combat": 95,
	"Focus Blast": 95,
	"High Jump Kick": 95,
	"Superpower": 95,
	"Aura Sphere": 90,
	"Body Press": 90,
	"Brick Break": 90,
	"Cross Chop": 90,
	"Drain Punch": 90,
	"Dynamic Punch": 90,
	"Flying Press": 90,
	"Hammer Arm": 90,
	"Sacred Sword": 90,
	"Secret Sword": 90,
	"Submission": 90,
	"Thunderous Kick": 90,
	"Low Sweep": 85,
	"Vital Throw": 85,
	"Circle Throw": 80,
	"Double Kick": 80,
	"Force Palm": 80,
	"Revenge": 80,
	"Storm Throw": 80,
	"Triple Kick": 80,
	"Counter": 75,
	"Seismic Toss": 75,
	"Arm Thrust": 70,
	"Mach Punch": 70,
	"Power-Up Punch": 70,
	"Rock Smash": 70,
	"Vacuum Wave": 70,
	// Poison
	"Belch": 95,
	"Gunk Shot": 95,
	"Poison Jab": 90,
	"Shell Side Arm": 90,
	"Sludge Bomb": 90,
	"Sludge Wave": 90,
	"Cross Poison": 85,
	"Sludge": 85,
	"Venoshock": 85,
	"Clear Smog": 75,
	"Poison Fang": 75,
	"Poison Tail": 75,
	"Acid": 70,
	"Acid Spray": 70,
	"Poison Sting": 70,
	"Smog": 70,

	"Multi-Attack": 95,
	"Triple Axel": 140,
	"Crush Grip": 140,
	"Double Iron Bash": 140,
	"Rising Voltage": 140,
	"Lash Out (Doubled)": 130,
	"Scale Shot": 130,
	"Dual Wingbeat": 130,
	"Terrain Pulse": 130,
	"Bolt Beak (Doubled)": 130,
	"Fishious Rend (Doubled)": 130,
	"Pin Missile": 130,
	"Power Trip": 130,
	"Dragon Darts": 130,
	"Dual Chop": 130,
	"Electro Ball": 130,
	"Heat Crash": 130,
	"Bullet Seed": 130,
	"Grass Knot": 130,
	"Bonemerang": 130,
	"Bone Rush": 130,
	"Fissure": 130,
	"Icicle Spear": 130,
	"Sheer Cold": 130,
	"Weather Ball": 130,
	"Tail Slap": 130,
	"Guillotine": 130,
	"Horn Drill": 130,
	"Flail": 130,
	"Endeavor": 130,
	"Stored Power": 130,
	"Rock Blast": 130,
	"Gear Grind": 130,
	"Gyro Ball": 130,
	"Heavy Slam": 130,
	"Double Hit": 120,
	"Avalanche (Doubled)": 110,
	"Revenge (Doubled)": 110,
	"Fling": 100,
	"Nature\'s Madness": 100,
	"Night Shade": 100,
	"Fury Swipes": 100,
	"Super Fang": 100,
	"Spit Up": 100,
	"Mirror Coat": 100,
	"Metal Burst": 100
}

// SwSh Dexited moves
delete MOVES_SS["Assist"];
delete MOVES_SS["Barrage"];
delete MOVES_SS["Barrier"];
delete MOVES_SS["Beak Blast"];
delete MOVES_SS["Bestow"];
delete MOVES_SS["Bide"];
delete MOVES_SS["Bone Club"];
delete MOVES_SS["Bubble"];
delete MOVES_SS["Camouflage"];
delete MOVES_SS["Captivate"];
delete MOVES_SS["Chatter"];
delete MOVES_SS["Chip Away"];
delete MOVES_SS["Clamp"];
delete MOVES_SS["Comet Punch"];
delete MOVES_SS["Constrict"];
delete MOVES_SS["Dark Void"];
delete MOVES_SS["Dizzy Punch"];
delete MOVES_SS["Double Slap"];
delete MOVES_SS["Dragon Rage"];
delete MOVES_SS["Egg Bomb"];
delete MOVES_SS["Embargo"];
delete MOVES_SS["Feint Attack"];
delete MOVES_SS["Flame Burst"];
delete MOVES_SS["Flash"];
delete MOVES_SS["Foresight"];
delete MOVES_SS["Frustration"];
delete MOVES_SS["Grass Whistle"];
delete MOVES_SS["Heal Block"];
delete MOVES_SS["Heal Order"];
delete MOVES_SS["Heart Stamp"];
delete MOVES_SS["Heart Swap"];
delete MOVES_SS["Hidden Power"];
delete MOVES_SS["Hidden Power Bug"];
delete MOVES_SS["Hidden Power Dark"];
delete MOVES_SS["Hidden Power Dragon"];
delete MOVES_SS["Hidden Power Electric"];
delete MOVES_SS["Hidden Power Fighting"];
delete MOVES_SS["Hidden Power Fire"];
delete MOVES_SS["Hidden Power Flying"];
delete MOVES_SS["Hidden Power Ghost"];
delete MOVES_SS["Hidden Power Grass"];
delete MOVES_SS["Hidden Power Ground"];
delete MOVES_SS["Hidden Power Ice"];
delete MOVES_SS["Hidden Power Poison"];
delete MOVES_SS["Hidden Power Psychic"];
delete MOVES_SS["Hidden Power Rock"];
delete MOVES_SS["Hidden Power Steel"];
delete MOVES_SS["Hidden Power Water"];
delete MOVES_SS["Hyper Fang"];
delete MOVES_SS["Ice Ball"];
delete MOVES_SS["Ice Hammer"];
delete MOVES_SS["Ion Deluge"];
delete MOVES_SS["Judgment"];
delete MOVES_SS["Jump Kick"];
delete MOVES_SS["Karate Chop"];
delete MOVES_SS["Light of Ruin"];
delete MOVES_SS["Lucky Chant"];
delete MOVES_SS["Magnet Bomb"];
delete MOVES_SS["Magnitude"];
delete MOVES_SS["Me First"];
delete MOVES_SS["Meditate"];
delete MOVES_SS["Miracle Eye"];
delete MOVES_SS["Mirror Move"];
delete MOVES_SS["Mirror Shot"];
delete MOVES_SS["Mud Bomb"];
delete MOVES_SS["Mud Sport"];
delete MOVES_SS["Natural Gift"];
delete MOVES_SS["Needle Arm"];
delete MOVES_SS["Nightmare"];
delete MOVES_SS["Odor Sleuth"];
delete MOVES_SS["Ominous Wind"];
delete MOVES_SS["Powder"];
delete MOVES_SS["Psycho Boost"];
delete MOVES_SS["Psywave"];
delete MOVES_SS["Punishment"];
delete MOVES_SS["Pursuit"];
delete MOVES_SS["Rage"];
delete MOVES_SS["Razor Wind"];
delete MOVES_SS["Refresh"];
delete MOVES_SS["Return"];
delete MOVES_SS["Revelation Dance"];
delete MOVES_SS["Rock Climb"];
delete MOVES_SS["Rolling Kick"];
delete MOVES_SS["Rototiller"];
delete MOVES_SS["Secret Power"];
delete MOVES_SS["Seed Flare"];
delete MOVES_SS["Sharpen"];
delete MOVES_SS["Signal Beam"];
delete MOVES_SS["Silver Wind"];
delete MOVES_SS["Sketch"];
delete MOVES_SS["Sky Drop"];
delete MOVES_SS["Sky Uppercut"];
delete MOVES_SS["Smelling Salts"];
delete MOVES_SS["Snatch"];
delete MOVES_SS["Sonic Boom"];
delete MOVES_SS["Spider Web"];
delete MOVES_SS["Spike Cannon"];
delete MOVES_SS["Spotlight"];
delete MOVES_SS["Steamroller"];
delete MOVES_SS["Synchronoise"];
delete MOVES_SS["Tail Glow"];
delete MOVES_SS["Telekinesis"];
delete MOVES_SS["Toxic Thread"];
delete MOVES_SS["Trump Card"];
delete MOVES_SS["Twineedle"];
delete MOVES_SS["Wake-Up Slap"];
delete MOVES_SS["Water Sport"];
delete MOVES_SS["Wring Out"];

// SV Dexited moves
delete MOVES_SV["Karate Chop"];
delete MOVES_SV["Double Slap"];
delete MOVES_SV["Comet Punch"];
delete MOVES_SV["Razor Wind"];
delete MOVES_SV["Jump Kick"];
delete MOVES_SV["Rolling Kick"];
delete MOVES_SV["Twineedle"];
delete MOVES_SV["Sonic Boom"];
delete MOVES_SV["Submission"];
delete MOVES_SV["Dragon Rage"];
delete MOVES_SV["Meditate"];
delete MOVES_SV["Rage"];
delete MOVES_SV["Barrier"];
delete MOVES_SV["Bide"];
delete MOVES_SV["Mirror Move"];
delete MOVES_SV["Egg Bomb"];
delete MOVES_SV["Bone Club"];
delete MOVES_SV["Clamp"];
delete MOVES_SV["Skull Bash"];
delete MOVES_SV["Spike Cannon"];
delete MOVES_SV["Constrict"];
delete MOVES_SV["Kinesis"];
delete MOVES_SV["Barrage"];
delete MOVES_SV["Lovely Kiss"];
delete MOVES_SV["Bubble"];
delete MOVES_SV["Dizzy Punch"];
delete MOVES_SV["Flash"];
delete MOVES_SV["Psywave"];
delete MOVES_SV["Bonemerang"];
delete MOVES_SV["Hyper Fang"];
delete MOVES_SV["Sharpen"];
delete MOVES_SV["Spider Web"];
delete MOVES_SV["Mind Reader"];
delete MOVES_SV["Nightmare"];
delete MOVES_SV["Feint Attack"];
delete MOVES_SV["Octazooka"];
delete MOVES_SV["Foresight"];
delete MOVES_SV["Return"];
delete MOVES_SV["Frustration"];
delete MOVES_SV["Sacred Fire"];
delete MOVES_SV["Magnitude"];
delete MOVES_SV["Pursuit"];
delete MOVES_SV["Vital Throw"];
delete MOVES_SV["Hidden Power"];
delete MOVES_SV["Hidden Power Bug"];
delete MOVES_SV["Hidden Power Dark"];
delete MOVES_SV["Hidden Power Dragon"];
delete MOVES_SV["Hidden Power Electric"];
delete MOVES_SV["Hidden Power Fighting"];
delete MOVES_SV["Hidden Power Fire"];
delete MOVES_SV["Hidden Power Flying"];
delete MOVES_SV["Hidden Power Ghost"];
delete MOVES_SV["Hidden Power Grass"];
delete MOVES_SV["Hidden Power Ground"];
delete MOVES_SV["Hidden Power Ice"];
delete MOVES_SV["Hidden Power Poison"];
delete MOVES_SV["Hidden Power Psychic"];
delete MOVES_SV["Hidden Power Rock"];
delete MOVES_SV["Hidden Power Steel"];
delete MOVES_SV["Hidden Power Water"];
delete MOVES_SV["Hail"];
delete MOVES_SV["Smelling Salts"];
delete MOVES_SV["Nature Power"];
delete MOVES_SV["Assist"];
delete MOVES_SV["Magic Coat"];
delete MOVES_SV["Revenge"];
delete MOVES_SV["Revenge (Doubled)"];
delete MOVES_SV["Refresh"];
delete MOVES_SV["Grudge"];
delete MOVES_SV["Snatch"];
delete MOVES_SV["Secret Power"];
delete MOVES_SV["Camouflage"];
delete MOVES_SV["Mud Sport"];
delete MOVES_SV["Ice Ball"];
delete MOVES_SV["Needle Arm"];
delete MOVES_SV["Aromatherapy"];
delete MOVES_SV["Odor Sleuth"];
delete MOVES_SV["Silver Wind"];
delete MOVES_SV["Grass Whistle"];
delete MOVES_SV["Signal Beam"];
delete MOVES_SV["Sky Uppercut"];
delete MOVES_SV["Water Sport"];
delete MOVES_SV["Miracle Eye"];
delete MOVES_SV["Wake-Up Slap"];
delete MOVES_SV["Natural Gift"];
delete MOVES_SV["Embargo"];
delete MOVES_SV["Psycho Shift"];
delete MOVES_SV["Trump Card"];
delete MOVES_SV["Heal Block"];
delete MOVES_SV["Wring Out"];
delete MOVES_SV["Lucky Chant"];
delete MOVES_SV["Me First"];
delete MOVES_SV["Punishment"];
delete MOVES_SV["Mud Bomb"];
delete MOVES_SV["Mirror Shot"];
delete MOVES_SV["Rock Climb"];
delete MOVES_SV["Magnet Bomb"];
delete MOVES_SV["Captivate"];
delete MOVES_SV["Chatter"];
delete MOVES_SV["Heal Order"];
delete MOVES_SV["Ominous Wind"];
delete MOVES_SV["Autotomize"];
delete MOVES_SV["Telekinesis"];
delete MOVES_SV["Storm Throw"];
delete MOVES_SV["Flame Burst"];
delete MOVES_SV["Synchronoise"];
delete MOVES_SV["Chip Away"];
delete MOVES_SV["Sky Drop"];
delete MOVES_SV["Bestow"];
delete MOVES_SV["Dual Chop"];
delete MOVES_SV["Heart Stamp"];
delete MOVES_SV["Steamroller"];
delete MOVES_SV["Head Charge"];
delete MOVES_SV["Gear Grind"];
delete MOVES_SV["Searing Shot"];
delete MOVES_SV["Techno Blast"];
delete MOVES_SV["Mat Block"];
delete MOVES_SV["Rototiller"];
delete MOVES_SV["Trick-or-Treat"];
delete MOVES_SV["Ion Deluge"];
delete MOVES_SV["Crafty Shield"];
delete MOVES_SV["Flower Shield"];
delete MOVES_SV["Electrify"];
delete MOVES_SV["King's Shield"];
delete MOVES_SV["Venom Drench"];
delete MOVES_SV["Powder"];
delete MOVES_SV["Geomancy"];
delete MOVES_SV["Power-Up Punch"];
delete MOVES_SV["Oblivion Wing"];
delete MOVES_SV["Thousand Arrows"];
delete MOVES_SV["Thousand Waves"];
delete MOVES_SV["Land's Wrath"];
delete MOVES_SV["Light of Ruin"];
delete MOVES_SV["Spotlight"];
delete MOVES_SV["Laser Focus"];
delete MOVES_SV["Gear Up"];
delete MOVES_SV["Anchor Shot"];
delete MOVES_SV["Purify"];
delete MOVES_SV["Core Enforcer"];
delete MOVES_SV["Shell Trap"];
delete MOVES_SV["Shadow Bone"];
delete MOVES_SV["Spectral Thief"];
delete MOVES_SV["Nature's Madness"];
delete MOVES_SV["Multi-Attack"];
delete MOVES_SV["Mind Blown"];
delete MOVES_SV["Plasma Fists"];
delete MOVES_SV["Double Iron Bash"];
delete MOVES_SV["Octolock"];
delete MOVES_SV["Bolt Beak"];
delete MOVES_SV["Bolt Beak (Doubled)"];
delete MOVES_SV["Fishious Rend"];
delete MOVES_SV["Fishious Rend (Doubled)"];
delete MOVES_SV["Snap Trap"];
delete MOVES_SV["Obstruct"];
delete MOVES_SV["Meteor Assault"];
delete MOVES_SV["Eternabeam"];
