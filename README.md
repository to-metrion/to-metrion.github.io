# BATTLE FACILITIES DAMAGE CALCULATOR // SV EDITION

By [Eisenherz](https://www.smogon.com/forums/members/eisenherz.326390/) & SilverstarStream, based on the [BSS damage calculator](http://cantsay.github.io/) by cant say ([@jakecantsay](https://twitter.com/jakecantsay)) and [Lego](https://www.smogon.com/forums/members/188833/).

The calculator includes all BDSP Tower / SwSh Tower / Restricted Sparring / Battle Tree / Battle Maison / Battle Subway / Sinnoh Battle Frontier / Hoenn Battle Frontier sets preloaded and has been updated for SV.

Custom sets can be input within the calculator using the official Pokemon Showdown format.

```
Nickname (Species) @ Item
Ability: Name
Level: #
EVs: # Stat / # Stat / # Stat
Serious Nature
IVs: # Stat
- Move Name
- Move Name
- Move Name
- Move Name
```

### Calculation Accuracy:
This damage calculator is committed to accurate and correct calculations. It uses the following resources to verify calculations:

* Gen III-IV: the damage code was taken from a [fork of Showdown's calc](https://github.com/turskain/turskain.github.io) and verified against the decompilations (Emerald [decomp](https://github.com/pret/pokeemerald/blob/master/src/pokemon.c) | Platinum [decomp](https://github.com/pret/pokeplatinum/blob/main/src/battle/battle_lib.c))
* Gen V-IX: this calculator is a fork of a calculator based on the Gen V [damage formula research](https://www.smogon.com/bw/articles/bw_complete_damage_formula) (the formula explained up through Gen VII: [DaWoblefet's Damage Dissertation](https://www.trainertower.com/dawoblefets-damage-dissertation/))
* Gen VIII-IX: additional effects are researched on Smogon (SwSh [mechanics research](https://www.smogon.com/forums/threads/sword-shield-battle-mechanics-research.3655528/) | SV [mechanics research](https://www.smogon.com/forums/threads/scarlet-violet-battle-mechanics-research.3709545/))

If there are any errors found while using the calc, please report the issue by either reaching out through the [Battle Facilities Discord](https://discord.gg/8RMcwybe2t) or by submitting a [New Issue](https://github.com/to-metrion/to-metrion.github.io/issues).

## Contributing:
The site is powered by Jekyll, with linting by nodejs' eslint.

Do NOT Edit anything under the ``_site`` folder, it is regenerated whenever you make changes to the other files and edits made there will NOT be saved.

Jekyll uses the [Liquid](https://shopify.github.io/liquid/) templating language, combined with a YAML Front-Matter to serve pages. This allows us to use templates and ``{% includes %}`` tags (see ``/_layouts/default.html``) to avoid repeating content (such as the header used by both ``index.html`` and ``/_pages/privacy.html``) with the following in the YAML Front-Matter:
```
---
layout: default
---
```
This means that any page with this Front-Matter will use ``default.html`` injected with its contents where it says ``{{ content }}``.

Different layouts can be used but they would have to be created separately.

Aside from that, the repo should be fairly simple to navigate.

#### Build Instructions
##### One-time setup:
1. Install [Ruby](https://www.ruby-lang.org/en/) (use [RubyInstaller](https://rubyinstaller.org/downloads/) if on Windows)
2. Double-click ``setup.bat`` if on Windows, or view the script's main content for the necessary commands.

##### Running the calc:
The site can be ran locally by double-clicking ``run.bat``.

This will open a page in the default browser that will have a connection error. Wait for several seconds for the site to build (this can be seen from the terminal), then refresh the page.

#### Testing and PRing changes
Please ensure your code passes our tests before submitting your PR!

NOTE: Running the tests launches an instance of Firefox, and Firefox is required to be installed.

As an alternative, Chrome can be used instead (must be installed). In this case, replace `Capybara.current_driver = :selenium_headless` with `Capybara.current_driver = :selenium_chrome_headless`.

1. Double-click ``test.bat``.
2. Fix any errors turned up by the test!
3. If appropriate, consider adding a test to capture the changes' behavior.
4. Create a pull request for your changes!

## Handy Links:

* [Calc](https://to-metrion.github.io)
* [BSS Calc](https://cantsay.github.io/sumo-bss-calc/)
* [Parser (PS! Importable to calc format)](https://legofigure11.github.io/custom-calc-parser/)
* [VGC Calc](https://jake-white.github.io/VGC-Damage-Calculator/) ([git](https://github.com/jake-white/VGC-Damage-Calculator))
* [PS! Calc](https://pokemonshowdown.com/damagecalc/) ([git](https://github.com/Zarel/honko-damagecalc))
