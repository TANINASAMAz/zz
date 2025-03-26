
const { TextInputBuilder, ActionRowBuilder, ModalBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(regularbot, interaction) {
        try {
            if (!interaction.isStringSelectMenu()) return;
            if (interaction.customId == "open_command") {
                if (interaction.values[0] == "detete_stetus") {
                    const modal = new ModalBuilder()
                        .setCustomId('token_delete_modal')
                        .setTitle('ปิดสถานะสตรีมมิ่งไม่ได้')
                        .addComponents(
                            new ActionRowBuilder().addComponents(
                                new TextInputBuilder()
                                    .setCustomId('medmwng_delete_token')
                                    .setLabel('กรอก TOKEN ของผู้ใช้งาน')
                                    .setStyle(TextInputStyle.Short)
                                    .setPlaceholder('TOKEN ควรเก็บเป็นความลับรู้เพียงคุณเท่านั้น')
                                    .setRequired(true)
                            ),
                        );
                    await interaction.showModal(modal);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
};

