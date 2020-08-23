var hasBuildingSpecial = function(spells_cast) {
    return FortuneCookie.FateChecker(spells_cast, 0, 0.15, false).indexOf("Building Special") !== -1
        || FortuneCookie.FateChecker(spells_cast, 1, 0.15, false).indexOf("Building Special") !== -1;
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
