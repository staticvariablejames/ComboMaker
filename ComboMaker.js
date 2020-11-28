var hasBuildingSpecial = function(spellsCast) {
    return FortuneCookie.FateChecker(spellsCast, 0, 0.15, false).indexOf("Building Special") !== -1
        || FortuneCookie.FateChecker(spellsCast, 1, 0.15, false).indexOf("Building Special") !== -1;
}

var comboSearch = function(target, maxRange = 10000) {
    let current = Game.Objects['Wizard tower'].minigame.spellsCastTotal - 1;
    let currentWindow = 0;
    for(let i = 0; i < target; i++) {
        currentWindow += hasBuildingSpecial(current++);
    }
    for(let i = target; i < maxRange; i++) {
        currentWindow -= hasBuildingSpecial(current - target);
        currentWindow += hasBuildingSpecial(current++);
        if(currentWindow === target)
            return current - target;
    }
    return -1;
}

/* Returns true if Force the Hand of Fate can return a Click Frenzy
 * (either with or without seasons)
 * with the given number of on-screen golden cookies.
 */
var hasClickFrenzy = function(spellsCast, onScreenGC) {
    let backfire = 0.15*(1+onScreenGC);
    return FortuneCookie.FateChecker(spellsCast, 0, backfire, false).indexOf("Click Frenzy") !== -1
        || FortuneCookie.FateChecker(spellsCast, 1, backfire, false).indexOf("Click Frenzy") !== -1;
}

/* Same, but for Elder Frenzy instead.
 * Note that, due to FtHoF mechanics related to on-screen golden cookies,
 * the value passed is a lower bound,
 * meaning having _less_ on-screen GC could thwart the outcome.
 */
var hasElderFrenzy = function(spellsCast, onScreenGC) {
    let backfire = 0.15*(1+onScreenGC);
    return FortuneCookie.FateChecker(spellsCast, 0, backfire, false).indexOf("Elder Frenzy") !== -1
        || FortuneCookie.FateChecker(spellsCast, 1, backfire, false).indexOf("Elder Frenzy") !== -1;
}

/* Searches for a casting spot that can yield Click Frenzy and Elder Frenzy.
 * The intention is for this to be usable with or without a single golden cookie,
 * allowing thus to stack Click Frenzy and Dragonflight.
 */
var frenzySearch = function(maxRange = 100) {
    let current = Game.Objects['Wizard tower'].minigame.spellsCastTotal - 1;
    for(let spells = current; spells < current+maxRange; spells++) {
        if(hasClickFrenzy(spells, 1) && hasElderFrenzy(spells+1, 2)) return spells;
        if(hasElderFrenzy(spells, 1) && hasClickFrenzy(spells+1, 2)) return spells;
    }
    return -1;
}
