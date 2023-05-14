import { MODULE_ID } from "../constants.mjs";

export const CompanionRollData = {
    setup: function () {
        CONFIG.DND5E.characterFlags.companionOwner = {
            name: "Companion Owner",
            hint: "Actor UUID of the owner actor of this companion. That actors roll data will be placed in the new 'companion.owner' object.",
            section: "Companion",
            type: String,
        };

        _registerWrapper();
    },
};

function _registerWrapper() {
    libWrapper.register(
        MODULE_ID,
        "CONFIG.Actor.documentClass.prototype.getRollData",
        function (wrapped, ...args) {
            const rollData = wrapped(...args);
            const companionOwner = this.flags.dnd5e?.companionOwner;
            if (!!companionOwner && companionOwner !== this.id) {
                rollData.companion = {
                    owner: game.actors?.get(companionOwner)?.getRollData(),
                };
            }
            return rollData;
        },
        "WRAPPER"
    );
}
