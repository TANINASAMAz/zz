const fs = require('fs');
const path = require('path');
const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(regularbot, interaction) {
        try {
            if (!interaction.isCommand() && !interaction.isStringSelectMenu()) return;
            if (interaction.commandName == "open_status") {

                const congigrowPath = path.resolve(__dirname, '../config.json');
                const congigrow_BASE = JSON.parse(fs.readFileSync(congigrowPath));
                const allowedUserIDs = congigrow_BASE?.Admin_command;

                if (!allowedUserIDs.includes(interaction.user.id)) {
                    await interaction.reply({
                        content: '\`\`\`❌ เอ้ะ! คำสั่งสำหรับผู้ที่มีสิทธิ์เท่านั้น \`\`\`',
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }

                const numberOfServers = regularbot.guilds.cache.size;
                let totalBots = 0;
                regularbot.guilds.cache.forEach(guild => {
                    const botsInGuild = guild.members.cache.filter(member => member.user.bot).size;
                    totalBots += botsInGuild;
                });

                const channels = interaction.options.getChannel('channel');
                if (!channels) {
                    await interaction.reply({ content: '\`\`\`❌ ไม่พบช่องที่ระบุ \`\`\`', flags: MessageFlags.Ephemeral });
                    return;
                }

                if (channels) {
                    const embed = new EmbedBuilder()
                        .setColor(0x2e2e2e)
                        .setTitle(`\`\`🟣\`\` เปิดสถานะสตรีมมิ่งบนโปรไฟล์`)
                        .addFields(
                            { name: '\`\`✅\`\` เปิดใช้งาน', value: '\`\`\`ansi\n[2;31m[2;35m[2;33m[2;35m[1;35m[1;35m[1;34m[1;34m[1;31m[1;34m[1;37mกดที่เปิดสถานะ[0m[1;34m[0m[1;31m[0m[1;34m[0m[1;34m[0m[1;35m[0m[1;35m[0m[2;35m[0m[2;33m[0m[2;35m[0m[2;31m[0m\n\`\`\`', inline: true },
                            { name: '\`\`❌\`\` ปิดใช้งาน', value: '\`\`\`ansi\n[2;31m[2;35m[2;33m[2;35m[1;35m[1;35m[1;34m[1;34m[1;31m[1;34m[1;37mกดที่ปิดสถานะ[0m[1;34m[0m[1;31m[0m[1;34m[0m[1;34m[0m[1;35m[0m[1;35m[0m[2;35m[0m[2;33m[0m[2;35m[0m[2;31m[0m\n\`\`\`', inline: true },
                            { name: '\`\`❗\`\` ปิดสถานะไม่ได้', value: '\`\`\`ansi\n[2;31m[2;35m[2;33m[2;35m[1;35m[1;35m[1;34m[1;34m[1;31m[1;34m[1;37mเลือกที่แถบเมนู[0m[1;34m[0m[1;31m[0m[1;34m[0m[1;34m[0m[1;35m[0m[1;35m[0m[2;35m[0m[2;33m[0m[2;35m[0m[2;31m[0m\n\`\`\`', inline: true },
                        )
                        .addFields(
                            { name: '\`\`💬\`\` ชื่อสลับกัน', value: '\`\`\`ansi\n[2;31m[2;35m[2;33m[2;35m[1;35m[1;35m[1;34m[1;34m[1;31m[1;34m[1;37mชื่อสลับสองหน้า[0m[1;34m[0m[1;31m[0m[1;34m[0m[1;34m[0m[1;35m[0m[1;35m[0m[2;35m[0m[2;33m[0m[2;35m[0m[2;31m[0m\n\`\`\`', inline: true },
                            { name: '\`\`📖\`\` รูปภาพสลับ', value: '\`\`\`ansi\n[2;31m[2;35m[2;33m[2;35m[1;35m[1;35m[1;34m[1;34m[1;31m[1;34m[1;37mรูปสลับสองหน้า[0m[1;34m[0m[1;31m[0m[1;34m[0m[1;34m[0m[1;35m[0m[1;35m[0m[2;35m[0m[2;33m[0m[2;35m[0m[2;31m[0m\n\`\`\`', inline: true },
                            { name: '\`\`🔥\`\` ปุ่มสตรีมมิ่ง', value: '\`\`\`ansi\n[2;31m[2;35m[2;33m[2;35m[1;35m[1;35m[1;34m[1;34m[1;31m[1;34m[1;37mตั้งค่าปุ่มและลิงค์[0m[1;34m[0m[1;31m[0m[1;34m[0m[1;34m[0m[1;35m[0m[1;35m[0m[2;35m[0m[2;33m[0m[2;35m[0m[2;31m[0m\n\`\`\`', inline: true },
                        )
                        .setImage('https://s11.gifyu.com/images/SAmfR.png')
                        .setFooter({ text: `🚀 เข้าร่วมแล้ว ${numberOfServers} เซิร์ฟเวอร์ © 𝐂𝐇𝐈𝐈` })

                    const select = new StringSelectMenuBuilder()
                        .setCustomId('open_command')
                        .setPlaceholder('【 เลือกหากปิดสถานะไม่ได้ 】')
                        .addOptions([
                            {
                                label: '>> ปิดใช้งานสถานะ <<',
                                description: `【 เลือกหากปิดสถานะไม่ได้ 】`,
                                value: 'detete_stetus'
                            },
                            {
                                label: '>> ล้างตัวเลือกใหม่ <<',
                                description: `【 ต้องการล้างเลือกเมนูใหม่ 】`,
                                value: 'selectmenu_stetus'
                            },
                        ]);

                    const selectRow_1 = new ActionRowBuilder().addComponents(select);
                    const linkButton = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('on_medmwng')
                                .setLabel('✅ เปิดสถานะ')
                                .setStyle(ButtonStyle.Primary)

                        )
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('off_medmwng')
                                .setLabel('❌ ปิดสถานะ')
                                .setStyle(ButtonStyle.Danger)

                        )
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('🚀 คู่มือทำสถานะ')
                                .setStyle(ButtonStyle.Link)
                                .setURL('https://github.com/AD-CHII/View-Status-Medmwng')
                        );

                    await channels.send({ embeds: [embed], components: [selectRow_1, linkButton] })
                    const embed_notify = new EmbedBuilder()
                        .setColor(0xFF99FF)
                        .setTitle('คุณสร้างหน้าทำสถานะแล้วนะ')
                        .setDescription(`\`\`📝\`\`**หน้าทำสถานะของคุณอยู่ที่นี่** ${channels}`);
                    await interaction.reply({ embeds: [embed_notify], flags: MessageFlags.Ephemeral });

                }
                } else if (interaction.isStringSelectMenu() && interaction.customId === "open_command") {
                    if (interaction.values[0] == "selectmenu_stetus") {
                        await interaction.update({ withResponse: true });
                    }
                }
            

        } catch (error) {
            console.error('Error executing Command', error);
        }
    }
};

