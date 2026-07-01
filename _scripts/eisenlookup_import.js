// Receives a set sent from the EisenLookup tool (lookup.eisencalc.com) and loads it into
// field 2: switches to the right game, then selects the matching preloaded set, or — if
// the set isn't preloaded — injects it transiently (in-memory only; never saved to the
// user's custom sets). Set is delivered via a #eisenlookup= hash on first open and via
// postMessage for an already-open tab.
(function () {
    var GAME_RADIOS = { 3:1, 4:1, 5:1, 6:1, 7:1, 8:1, 80:1, 9:1 };
    // Showdown forme names -> eisencalc dex spelling (mirrors import_custom.js).
    var FORME = {
        "Kyurem-White": "Kyurem-W", "Kyurem-Black": "Kyurem-B", "Giratina-Origin": "Giratina-O",
        "Landorus-Therian": "Landorus-T", "Thundurus-Therian": "Thundurus-T",
        "Tornadus-Therian": "Tornadus-T", "Wormadam-Sandy": "Wormadam-G", "Wormadam-Trash": "Wormadam-S"
    };
    var EV = { HP: "hp", Atk: "at", Def: "df", SpA: "sa", SpD: "sd", Spe: "sp" };

    function parseStats(s) {
        var out = {};
        s.split("/").forEach(function (tok) {
            var m = tok.trim().match(/^(\d+)\s+(\w+)$/);
            if (m && EV[m[2]]) out[EV[m[2]]] = +m[1];
        });
        return out;
    }

    // Parse a Showdown set into eisencalc's set shape.
    function parse(text) {
        var set = { level: 50, evs: {}, ivs: {}, moves: [], nature: "Hardy", ability: "", item: "" };
        var species = "", m;
        text.split(/\r?\n/).forEach(function (raw) {
            var ln = raw.trim();
            if (!ln) return;
            if (ln.charAt(0) === "-") { set.moves.push(ln.slice(1).trim()); return; }
            if ((m = ln.match(/^Ability:\s*(.+)$/i))) { set.ability = m[1].trim(); return; }
            if ((m = ln.match(/^Level:\s*(\d+)$/i))) { set.level = +m[1]; return; }
            if ((m = ln.match(/^Tera Type:\s*(.+)$/i))) { set.teraType = m[1].trim(); return; }
            if ((m = ln.match(/^EVs:\s*(.+)$/i))) { set.evs = parseStats(m[1]); return; }
            if ((m = ln.match(/^IVs:\s*(.+)$/i))) { set.ivs = parseStats(m[1]); return; }
            if ((m = ln.match(/^(.+)\s+Nature$/i))) { set.nature = m[1].trim(); return; }
            if (!species) {
                var mm = ln.match(/^(.*?)\s*@\s*(.+)$/);
                if (mm) { set.item = mm[2].trim(); ln = mm[1]; }
                var nick = ln.match(/\((.+)\)\s*$/);
                species = (nick ? nick[1] : ln).trim();
            }
        });
        while (set.moves.length < 4) set.moves.push("");
        set.species = FORME[species] || species;
        return set;
    }

    function movesKey(arr) { return (arr || []).filter(Boolean).slice().sort().join("|"); }

    // A preloaded set is "the same" when species + moves + item + nature agree. EVs/IVs are
    // ignored: the lookup normalizes EVs (252) where eisencalc keeps the raw value (255).
    function sameSet(parsed, eset) {
        return movesKey(parsed.moves) === movesKey(eset.moves)
            && (parsed.item || "") === (eset.item || "")
            && (parsed.nature || "") === (eset.nature || "");
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = { parse: parse, sameSet: sameSet, movesKey: movesKey };
        return;
    }

    var injected = null; // { dex, sp } of the last transient set, removed before the next

    function handle(d) {
        if (!d || typeof setdex === "undefined") return;
        if (d.game && GAME_RADIOS[d.game] && ~~$("input.game:checked").val() !== d.game) {
            var radio = document.getElementById("game" + d.game);
            if (radio) { radio.checked = true; $(radio).trigger("change"); }
        }
        var set = parse(d.showdown || "");
        var sp = set.species;
        if (!sp || typeof pokedex === "undefined" || !pokedex[sp]) {
            console.log("EisenLookup: cannot place set for `" + sp + "`");
            return;
        }
        if (injected) { try { delete injected.dex[injected.sp].Imported; } catch (e) {} injected = null; }

        var chosen = null, pool = setdex[sp];
        if (pool) for (var name in pool) { if (sameSet(set, pool[name])) { chosen = name; break; } }

        var setName = chosen || "Imported";
        if (!chosen) {
            setdex[sp] = setdex[sp] || {};
            setdex[sp].Imported = set;
            setdexAll[sp] = setdexAll[sp] || {};
            setdexAll[sp].Imported = set;
            injected = { dex: setdex, sp: sp };
        }
        var id = sp + " (" + setName + ")";
        var $sel = $("#p2 input.set-selector");
        // Set select2's OWN value (keeps its internal state in sync, so the panel populates
        // and repeat exports work), then fire change to fill the panel. The collapsed label
        // is set directly: this select2 has a fixed `initSelection` (always the first set),
        // so it can't render an arbitrary selection the normal way.
        try { $sel.select2("val", id); } catch (e) { $sel.val(id); }
        $sel.trigger("change");
        setTimeout(function () {
            try { $sel.select2("container").find(".select2-chosen").text(id); } catch (e) {}
        }, 0);
        var node = document.getElementById("p2");
        if (node && node.scrollIntoView) node.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function originOk(o) { try { return /(^|\.)eisencalc\.com$/.test(new URL(o).hostname); } catch (e) { return false; } }

    window.addEventListener("message", function (e) {
        if (originOk(e.origin) && e.data && e.data.source === "eisenlookup") handle(e.data);
    });

    function readHash() {
        var m = location.hash.match(/[#&]eisenlookup=([^&]+)/);
        if (!m) return;
        try { handle(JSON.parse(decodeURIComponent(m[1]))); } catch (e) { return; }
        history.replaceState(null, "", location.pathname + location.search); // consume it
    }
    // Run after the calc has initialized its globals; retry briefly if not ready yet.
    var tries = 0;
    (function ready() {
        if (typeof setdexAll !== "undefined" && $("#p2").length) return readHash();
        if (tries++ < 40) setTimeout(ready, 100);
    })();
})();
