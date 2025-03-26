const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, MessageFlags, ButtonStyle  } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(regularbot, interaction) {
        try {
            if (!interaction.isButton()) return;
            if (interaction.customId === 'on_medmwng') {

                await interaction.deferReply({ flags: MessageFlags.Ephemeral });
                const embed = new EmbedBuilder()
                    .setColor(0xFFCC33)
                    .setTitle(`\`\`⚙️\`\` ตั้งค่าสตรีมมิ่งบนโปรไฟล์`)
                    .addFields(
                        { name: '\`\`✅\`\` ตั้งข้อมูล', value: '\`\`\`ansi\n[2;31m[2;35m[2;33m[2;35m[1;35m[1;35m[1;34m[1;34m[1;31m[1;34m[1;37mต้องตั้งก่อนใช้งาน[0m[1;34m[0m[1;31m[0m[1;34m[0m[1;34m[0m[1;35m[0m[1;35m[0m[2;35m[0m[2;33m[0m[2;35m[0m[2;31m[0m\n\`\`\`', inline: true },
                        { name: '\`\`💬\`\` ชื่อสถานะ', value: '\`\`\`ansi\n[2;31m[2;35m[2;33m[2;35m[1;35m[1;35m[1;34m[1;34m[1;31m[1;34m[1;37mข้อความสลับหน้า[0m[1;34m[0m[1;31m[0m[1;34m[0m[1;34m[0m[1;35m[0m[1;35m[0m[2;35m[0m[2;33m[0m[2;35m[0m[2;31m[0m\n\`\`\`', inline: true },
                        { name: '\`\`📖\`\` เพิ่มรูปภาพ', value: '\`\`\`ansi\n[2;31m[2;35m[2;33m[2;35m[1;35m[1;35m[1;34m[1;34m[1;31m[1;34m[1;37mรูปภาพสลับหน้า[0m[1;34m[0m[1;31m[0m[1;34m[0m[1;34m[0m[1;35m[0m[1;35m[0m[2;35m[0m[2;33m[0m[2;35m[0m[2;31m[0m\n\`\`\`', inline: true },
                        { name: '\`\`🔥\`\` ตั้งค่าปุ่มสตรีม', value: '\`\`\`ansi\n[2;31m[2;35m[2;33m[2;35m[1;35m[1;35m[1;34m[1;34m[1;31m[1;34m[1;37mชื่อปุ่มและลิงค์[0m[1;34m[0m[1;31m[0m[1;34m[0m[1;34m[0m[1;35m[0m[1;35m[0m[2;35m[0m[2;33m[0m[2;35m[0m[2;31m[0m\n\`\`\`', inline: true },
                        { name: '\`\`🟣\`\` ตั้งลิงค์สตรีม', value: '\`\`\`ansi\n[2;31m[2;35m[2;33m[2;35m[1;35m[1;35m[1;34m[1;34m[1;31m[1;34m[1;37mURL การสตรีม[0m[1;34m[0m[1;31m[0m[1;34m[0m[1;34m[0m[1;35m[0m[1;35m[0m[2;35m[0m[2;33m[0m[2;35m[0m[2;31m[0m\n\`\`\`', inline: true },
                        { name: '\`\`🏩\`\` คู่มือทำสถานะ', value: '\`\`\`ansi\n[2;31m[2;35m[2;33m[2;35m[1;35m[1;35m[1;34m[1;34m[1;31m[1;34m[1;37mสถานะแสดงผล[0m[1;34m[0m[1;31m[0m[1;34m[0m[1;34m[0m[1;35m[0m[1;35m[0m[2;35m[0m[2;33m[0m[2;35m[0m[2;31m[0m\n\`\`\`', inline: true },

                    )
                    .setImage('https://share.creavite.co/6647afa7aac1146a40c3c24d.gif');

                    const Button_medmwng1 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('set_id_token')
                            .setLabel('✅ ตั้งค่าข้อมูล')
                            .setStyle(ButtonStyle.Secondary)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('set_name_status')
                            .setLabel('💬 สถานะหน้าแรก')
                            .setStyle(ButtonStyle.Secondary)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('set_nametwo_status')
                            .setLabel('💬 สถานะหน้าสอง')
                            .setStyle(ButtonStyle.Secondary)
                    )

                const Button_medmwng2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('set_button_b1')
                            .setLabel('🔥 ตั้งค่าปุ่มสถานะ')
                            .setStyle(ButtonStyle.Secondary)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('set_link_ming')
                            .setLabel('🟣 ตั้งลิงค์สตรีม')
                            .setStyle(ButtonStyle.Secondary)
                    )
                await interaction.editReply({ embeds: [embed], components: [Button_medmwng1, Button_medmwng2] });
            }

            regularbot.setMaxListeners(15);
        } catch (error) {
            if (error.code === 10062) {
                console.error('Unknown interaction');
            } else {
                console.error('Error executing', error);
            }
        }
    }
};
