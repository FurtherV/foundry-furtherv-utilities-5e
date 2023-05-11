export const MagicalDamageProperty = {
    setup: function () {
        CONFIG.DND5E.weaponProperties.mgcDamage = "Magical Damage";

        // because "Magical Damage" is too long to be correctly displayed, we have to fix its CSS styling.
        Hooks.on("renderItemSheet", (app, html, data) => {
            const label = html
                .find('input[name="system.properties.mgcDamage"]')
                .closest("label");
            label.css({
                "white-space": "nowrap",
                overflow: "hidden",
                "text-overflow": "clip",
            });
            label.attr("data-tooltip", "Deals magical damage.");
        });
    },
};
