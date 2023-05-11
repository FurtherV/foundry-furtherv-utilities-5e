export const StylishDaredevilSubclass = {
    setup: function () {
        CONFIG.DND5E.characterFlags["stylishWarrior"] = {
            name: "Stylish Warrior",
            hint: "You gain style points by landing attacks while alternating between melee and ranged weapon attacks. You lose all style points on a short or long rest.",
            section: "Class Features",
            type: Boolean,
        };

        CONFIG.DND5E.featureTypes.class.subtypes.stylishFlourish =
            "Stylish Flourish";

        Hooks.on("dnd5e.restCompleted", async (actor, result) => {
            if (!actor?.getFlag("dnd5e", "stylishWarrior")) return;
            const stylePointItem = actor.items.find(
                (x) => x.name === "Style Points"
            );
            if (!stylePointItem) return;
            await stylePointItem.update({ "system.uses.value": 0 });
        });

        Hooks.on("dnd5e.rollDamage", async (item, roll) => {
            if (!item.actor) return;
            const actor = item.actor;
            if (!actor?.getFlag("dnd5e", "stylishWarrior")) return;

            const weaponAttackType = item.system.actionType;
            if (weaponAttackType !== "mwak" && weaponAttackType != "rwak")
                return;

            const lastAttackType =
                actor.getFlag("world", "stylishWarrior.previousAttackType") ||
                "none";
            if (
                lastAttackType !== "none" &&
                lastAttackType === weaponAttackType
            )
                return;

            await Dialog.confirm({
                title: "Add a Style Point?",
                content: `<p><strong>Congratulations!</strong> You have landed an attack with a different attack type than before. Would you like to add a Style Point to your character?</p>`,
                yes: async () => {
                    await actor.setFlag(
                        "world",
                        "stylishWarrior.previousAttackType",
                        weaponAttackType
                    );

                    const stylePointItem = actor.items.find(
                        (x) => x.name === "Style Points"
                    );
                    if (!stylePointItem) return;

                    const currentStylePoints =
                        stylePointItem.system.uses?.value || 0;
                    await stylePointItem.update({
                        "system.uses.value": currentStylePoints + 1,
                    });
                },
                defaultYes: true,
                rejectClose: false,
                options: {
                    classes: ["dnd5e", "dialog"],
                },
            });
        });

        Hooks.on("dnd5e.rollInitiative", async (actor, combatants) => {
            if (!actor?.getFlag("dnd5e", "stylishWarrior")) return;
            await actor.setFlag(
                "world",
                "stylishWarrior.previousAttackType",
                "none"
            );
        });
    },
};
