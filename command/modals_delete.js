const fs = require('fs');
const { EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(regularbot, interaction) {
        try {
            if (!interaction.isModalSubmit()) return;
            if (interaction.customId === "token_delete_modal") {
                const medmwng_delete_token = interaction.fields.getTextInputValue("medmwng_delete_token");
                
                const FOLDER_DELETE = './modal_setting/user.json';

                try {
                    const deletePath = `${FOLDER_DELETE}`;
                    const userData = JSON.parse(fs.readFileSync(deletePath, 'utf8'));

                    const userToDelete = Object.keys(userData).find(key => userData[key].token === medmwng_delete_token);

                    if (userToDelete) {
                        delete userData[userToDelete];
                        fs.writeFileSync(deletePath, JSON.stringify(userData, null, 4));

                        const embedDelete = new EmbedBuilder()
                            .setColor(0x6633CC)
                            .setTitle('\`\`✅\`\` ปิดสถานะสำเร็จ!');
                        await interaction.reply({ embeds: [embedDelete], flags: MessageFlags.Ephemeral });
                    } else {
                        const embedNotFound = new EmbedBuilder()
                            .setColor(0xFF0000)
                            .setTitle('\`\`❌\`\` เอ้ะ! ไม่พบข้อมูลผู้ใช้งาน!');
                        await interaction.reply({ embeds: [embedNotFound], flags: MessageFlags.Ephemeral });
                    }
                } catch (error) {
                    console.error('Error reading or writing user data:', error);
                    const embedError = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle('\`\`❌\`\` เกิดข้อผิดพลาดในการลบข้อมูล!');
                    await interaction.reply({ embeds: [embedError], flags: MessageFlags.Ephemeral });
                }
            }

            regularbot.setMaxListeners(15);
        } catch (error) {
            console.error('Unexpected error Modals_Delete:', error);
        }
    }
};
