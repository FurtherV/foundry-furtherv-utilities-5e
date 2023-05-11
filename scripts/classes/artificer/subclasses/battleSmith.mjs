export const BattleSmithSubclass = {
    setup: function () {
        CONFIG.DND5E.characterFlags["battleReady"] = {
            name: "Battle Ready",
            hint: "You can use your intelligence modifier in place of your strength or dexterity modifier for attack and damage rolls using a magical weapon",
            section: "Class Features",
            type: Boolean,
        };

        Hooks.on("dnd5e.preRollAttack", (item, config) => {
            if (!config.actor?.getFlag("dnd5e", "battleReady")) return;
            if (item.type !== "weapon") return;
            if (!item.system.properties.mgc) return;
            config.data.mod = Math.max(
                config.data.mod,
                config.actor.system.abilities.int.mod
            );
        });

        Hooks.on("dnd5e.preRollDamage", (item, config) => {
            if (!config.actor?.getFlag("dnd5e", "battleReady")) return;
            if (item.type !== "weapon") return;
            if (!item.system.properties.mgc) return;
            config.data.mod = Math.max(
                config.data.mod,
                config.actor.system.abilities.int.mod
            );
        });
    },
};
