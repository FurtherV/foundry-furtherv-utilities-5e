// This file is automatically executed by FoundryVTT
import { MODULE_NAME } from "./scripts/constants.mjs";
import { CompanionRollData } from "./scripts/misc/companionRollData.mjs";
import { EquipNotifier } from "./scripts/misc/equipNotifier.mjs";
import { MagicalDamageProperty } from "./scripts/misc/magicalDamageProperty.mjs";
import { NoFlatArmorClass } from "./scripts/misc/noFlatArmorClass.mjs";
import { TargetingReminder } from "./scripts/misc/targetingReminder.mjs";
import { StylishDaredevilSubclass } from "./scripts/classes/fighter/subclasses/stylishDaredevil.mjs";
import { BattleSmithSubclass } from "./scripts/classes/artificer/subclasses/battleSmith.mjs";

Hooks.once("init", () => {
    console.log(`FurtherV | Initializing ${MODULE_NAME}`);
});

Hooks.once("setup", () => {
    // Misc
    CompanionRollData.setup();
    EquipNotifier.setup();
    MagicalDamageProperty.setup();
    NoFlatArmorClass.setup();
    TargetingReminder.setup();

    // Classes
    // Currently empty

    // Subclasses
    StylishDaredevilSubclass.setup();
    BattleSmithSubclass.setup();
});
