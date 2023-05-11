export const EquipNotifier = {
    setup: function () {
        Hooks.on("updateItem", _onItemUpdate);
    },
};

async function _onItemUpdate(item, changes, options, instigatingUserId) {
    // check if the item update was initiated by the current user, and if the updated item is equipped
    if (
        game.user.id !== instigatingUserId ||
        !foundry.utils.hasProperty(changes, "system.equipped")
    ) {
        return;
    }

    const actor = item.actor;
    // check if the updated item belongs to an actor of type "character"
    if (!actor || actor.type !== "character") {
        return;
    }

    // construct the message HTML with the actor image, the item image, and the text centered
    const messageText = `
    <div style="display: flex; flex-direction: column; align-items: center;">
        <img data-tooltip="${actor.name}"  src="${
        actor.img
    }" style="border: 0; width:32px; height:32px; margin-bottom: 5px;" />
        <div style="display: flex; align-items: center;">
            <strong style="margin-right: 5px;">${
                changes.system.equipped ? "Equipped:" : "Unequipped:"
            }</strong>
            <img src="${
                item.img
            }" style="border: 0; width:16px; height:16px; margin-right: 5px;" />
            <label>${item.name}</label>
        </div>
    </div>
                        `;
    const messageData = {
        content: messageText,
        speaker: ChatMessage.getSpeaker({ actor }),
    };

    await ChatMessage.create(messageData);
}
