export const TargetingReminder = {
    setup: function () {
        Hooks.on("dnd5e.preRollAttack", (item, config) => {
            _preRollAttack(item, config);
            return true;
        });
    },
};

function _preRollAttack(item, config) {
    // Check if the item is owned by an actor
    const actor = item.actor;
    if (!actor) return;

    // Check if the attacker is in an active and started combat
    const activeCombats = game.combats.filter((combat) => {
        return combat.isActive && combat.started && combat.combatants.size > 0;
    });

    if (
        !activeCombats.some((combat) => {
            return combat.combatants.some((combatant) => {
                return combatant.actorId === actor.id;
            });
        })
    )
        return;

    // Check if there are any targets with more than 0 HP selected.
    if (
        !game.user.targets.size ||
        !game.user.targets.some((x) => {
            return x.actor?.system.attributes.hp.value > 0;
        })
    ) {
        ui.notifications.warn(
            "Warning: You have no valid target selected for this attack. You can target a token by hovering over it and pressing T."
        );
        return;
    }
}
