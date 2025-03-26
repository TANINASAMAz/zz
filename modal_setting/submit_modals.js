const fs = require('fs');
const path = require('path');
const { EmbedBuilder, MessageFlags } = require('discord.js');

const MedmwngPath = () => {
    let medmwng_config_id = {};
    const medmwng_id_Path = path.resolve(__dirname, 'user.json');
    if (fs.existsSync(medmwng_id_Path)) {
        try {
            const data = fs.readFileSync(medmwng_id_Path, 'utf-8');
            if (data) {
                medmwng_config_id = JSON.parse(data);
            }
        } catch (error) {
            console.error("Error parsing JSON: ", error);
        }
    } else {
        fs.writeFileSync(medmwng_id_Path, JSON.stringify({}));
    }
    if (typeof medmwng_config_id !== 'object' || medmwng_config_id === null) {
        medmwng_config_id = {};
    }
    return medmwng_config_id;
}

module.exports = {
    name: 'interactionCreate',
    async execute(regularbot, interaction) {
        try {
            if (interaction.isModalSubmit()) {
                if (interaction.customId === 'id_token__modal') {

                    const medmwng_id = interaction.user.id;
                    const medmwng_token = interaction.fields.getTextInputValue("medmwng_token");
                    const medmwng_id_Path = path.resolve(__dirname, 'user.json');

                    if (medmwng_token.length <= 50) {
                        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
                        const embed = new EmbedBuilder()
                            .setTitle('โทเคนผู้ใช้งานไม่ถูกต้อง \`\`❌\`\`')
                            .addFields({ name: '> **กรุณากรอกโทเคนให้ได้มากกว่านั้น**', value: '_ _' })
                            .setColor(0xFF0000);
                        await interaction.editReply({ embeds: [embed] });
                        return;
                    }

                    const medmwng_config_id = MedmwngPath();
                    medmwng_config_id[medmwng_id] = {
                        token: medmwng_token,
                        Name1: 'ㅤ',
                        Name2: 'ㅤ',
                        Details1: '꒰ time:t ꒱ ✦ ꒰ date:n ꒱',
                        Details2: '꒰ day:th ꒱ ✦ ꒰ day:eg ꒱',
                        Statetext1: '【 𝟏 / 𝟐 】👒ꔛ☆★☆★☆★☆★ꔛ',
                        Statetext2: '【 𝟐 / 𝟐 】👒ꔛ★☆★☆★☆★☆ꔛ',
                        State1: '⋆꒰ 🌡️ temp:c °𝐂 ꒱ εїз ꒰🍃 ping:ms 𝗸𝗺/𝘀 ꒱⋆',
                        State2: '⋆꒰ 🌡️ temp:c °𝐂 ꒱ εїз ꒰🍃 ping:ms 𝗸𝗺/𝘀 ꒱⋆',
                        stream_URL: 'https://twitch.tv/HnuuChii',
                        LargeImage1: '-',
                        LargeImage2: '-',
                        SmallImage1: '-',
                        SmallImage2: '-',
                        Button1: '-',
                        Link_Button1: '-',
                        Button2: '-',
                        Link_Button2: '-',
                    };

                    fs.writeFileSync(medmwng_id_Path, JSON.stringify(medmwng_config_id, null, 4));

                    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
                    const embed = new EmbedBuilder()
                        .setColor(0x6633CC)
                        .setTitle(`\`\`✅\`\` **ตั้งค่าข้อมูลแล้วรอแสดงสถานะแสดงที่โปรไฟล์ของคุณ!**`);
                    await interaction.editReply({ embeds: [embed] });

                } else if (interaction.customId === 'status_a1_modal') {

                    const medmwng_id = interaction.user.id;
                    const medmwng_id_Path = path.resolve(__dirname, 'user.json');

                    const status_a1 = interaction.fields.getTextInputValue("status_a1");
                    const status_a2 = interaction.fields.getTextInputValue("status_a2");
                    const status_a3 = interaction.fields.getTextInputValue("status_a3");
                    const image_a1 = interaction.fields.getTextInputValue("image_a1").replace(/`/g, '');
                    const image_a2 = interaction.fields.getTextInputValue("image_a2").replace(/`/g, '');

                    const validImageLink = (link) => {
                        return link.startsWith('https://') || link.startsWith('-');
                    };

                    const invalidLinks = [];
                    if (!validImageLink(image_a1)) invalidLinks.push('LargeImage1');
                    if (!validImageLink(image_a2)) invalidLinks.push('SmallImage1');
                    if (invalidLinks.length > 0) {
                        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
                        const embed = new EmbedBuilder()
                            .setColor(0xFF0000)
                            .setTitle('ลิงก์รูปภาพไม่ถูกต้อง \`\`❌\`\`')
                            .addFields({ name: '> กรุณาฝากรูปบนเว็ปไซต์ [กดลิงค์](https://gifyu.com/?lang=th)', value: '_ _' })
                            .addFields({ name: '> เสร็จแล้วคัดลอกที่อยู่ลิงค์รูปภาพมาใส่ที่นี่', value: '_ _' });
                        await interaction.editReply({ embeds: [embed] });
                        return;
                    }

                    const medmwng_config_id = MedmwngPath();
                    medmwng_config_id[medmwng_id].Details1 = status_a1 || '-',
                    medmwng_config_id[medmwng_id].Statetext1 = status_a2 || '-',
                    medmwng_config_id[medmwng_id].State1 = status_a3 || '-',
                    medmwng_config_id[medmwng_id].LargeImage1 = image_a1 || '-',
                    medmwng_config_id[medmwng_id].SmallImage1 = image_a2 || '-',

                    fs.writeFileSync(medmwng_id_Path, JSON.stringify(medmwng_config_id, null, 4));
                    await interaction.update({ withResponse: true });

                } else if (interaction.customId === 'status_b2_modal') {
                    const medmwng_id = interaction.user.id;
                    const medmwng_id_Path = path.resolve(__dirname, 'user.json');

                    const status_b1 = interaction.fields.getTextInputValue("status_b1");
                    const status_b2 = interaction.fields.getTextInputValue("status_b2");
                    const status_b3 = interaction.fields.getTextInputValue("status_b3");
                    const image_b1 = interaction.fields.getTextInputValue("image_b1").replace(/`/g, '');
                    const image_b2 = interaction.fields.getTextInputValue("image_b2").replace(/`/g, '');

                    const validImageLink = (link) => {
                        return link.startsWith('https://') || link.startsWith('-');
                    };

                    const invalidLinks = [];
                    if (!validImageLink(image_b1)) invalidLinks.push('LargeImage2');
                    if (!validImageLink(image_b2)) invalidLinks.push('SmallImage2');
                    if (invalidLinks.length > 0) {
                        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
                        const embed = new EmbedBuilder()
                            .setColor(0xFF0000)
                            .setTitle('ลิงก์รูปภาพไม่ถูกต้อง \`\`❌\`\`')
                            .addFields({ name: '> กรุณาฝากรูปบนเว็ปไซต์ [กดลิงค์](https://gifyu.com/?lang=th)', value: '_ _' })
                            .addFields({ name: '> เสร็จแล้วคัดลอกที่อยู่ลิงค์รูปภาพมาใส่ที่นี่', value: '_ _' });
                        await interaction.editReply({ embeds: [embed] });
                        return;
                    }

                    const medmwng_config_id = MedmwngPath();
                    medmwng_config_id[medmwng_id].Details2 = status_b1 || '-',
                    medmwng_config_id[medmwng_id].Statetext2 = status_b2 || '-',
                    medmwng_config_id[medmwng_id].State2 = status_b3 || '-',
                    medmwng_config_id[medmwng_id].LargeImage2 = image_b1 || '-',
                    medmwng_config_id[medmwng_id].SmallImage2 = image_b2 || '-',

                    fs.writeFileSync(medmwng_id_Path, JSON.stringify(medmwng_config_id, null, 4));
                    await interaction.update({ withResponse: true });

                } else if (interaction.customId === 'button_b_modal') {

                    const medmwng_id = interaction.user.id;
                    const medmwng_id_Path = path.resolve(__dirname, 'user.json');

                    const button_b1 = interaction.fields.getTextInputValue("button_b1");
                    const link_button_b1 = interaction.fields.getTextInputValue("link_button_b1");
                    const button_b2 = interaction.fields.getTextInputValue("button_b2");
                    const link_button_b2 = interaction.fields.getTextInputValue("link_button_b2");

                    if (!link_button_b1.startsWith('https://') && !link_button_b1.startsWith('http://') && !link_button_b1.startsWith('-')) {
                        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
                        const embed = new EmbedBuilder()
                            .setTitle('ที่อยู่ลิงก์ไม่ถูกต้อง \`\`❌\`\`')
                            .addFields({ name: '> **กรุณาเพิ่มที่อยู่ลิงค์ให้ถูกต้องด้วย!**', value: '_ _' })
                            .addFields({ name: '> **หากไม่ต้องการเพิ่มปุ่มให้ใส่ลิงค์ปุ่มเป็น** \`\` - \`\`', value: '_ _' })
                            .setColor(0xFF0000);

                        await interaction.editReply({ embeds: [embed] });
                        return;

                    }

                    if (!link_button_b2.startsWith('https://') && !link_button_b2.startsWith('http://') && !link_button_b2.startsWith('-')) {
                        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
                        const embed = new EmbedBuilder()
                            .setTitle('ที่อยู่ลิงก์ไม่ถูกต้อง \`\`❌\`\`')
                            .addFields({ name: '> **กรุณาเพิ่มที่อยู่ลิงค์ให้ถูกต้องด้วย!**', value: '_ _' })
                            .addFields({ name: '> **หากไม่ต้องการเพิ่มปุ่มให้ใส่ลิงค์ปุ่มเป็น** \`\` - \`\`', value: '_ _' })
                            .setColor(0xFF0000);

                        await interaction.editReply({ embeds: [embed] });
                        return;
                    }

                    if (button_b1.length > 20) {
                        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
                        const embed = new EmbedBuilder()
                            .setTitle('ชื่อปุ่มยาวเกินไป \`\`❌\`\`')
                            .addFields({ name: '> **กรุณาใส่ชื่อปุ่มไม่เกิน 20 ตัวอักษร**', value: '_ _' })
                            .addFields({ name: '> **หากเว้นบรรทัดนับว่าเป็น 1 ตัวอักษร**', value: '_ _' })
                            .addFields({ name: '> **หากใส่อักษรพิเศษนับว่าเป็น 2 ตัวอักษร ต่อ 1 อักขระ**', value: '_ _' })
                            .setColor(0xFF0000);
                        await interaction.editReply({ embeds: [embed] });
                        return;
                    }

                    if (button_b2.length > 15) {
                        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
                        const embed = new EmbedBuilder()
                            .setTitle('ชื่อปุ่มยาวเกินไป \`\`❌\`\`')
                            .addFields({ name: '> **กรุณาใส่ชื่อปุ่มไม่เกิน 15 ตัวอักษร**', value: '_ _' })
                            .addFields({ name: '> **หากเว้นบรรทัดนับว่าเป็น 1 ตัวอักษร**', value: '_ _' })
                            .addFields({ name: '> **หากใส่อักษรพิเศษนับว่าเป็น 2 ตัวอักษร ต่อ 1 อักขระ**', value: '_ _' })
                            .setColor(0xFF0000);
                        await interaction.editReply({ embeds: [embed] });
                        return;
                    }
                    const medmwng_config_id = MedmwngPath();

                    medmwng_config_id[medmwng_id].Button1 = button_b1 || '-',
                    medmwng_config_id[medmwng_id].Button2 = button_b2 || '-',
                    medmwng_config_id[medmwng_id].Link_Button1 = link_button_b1 || 'https://discord.com/',
                    medmwng_config_id[medmwng_id].Link_Button2 = link_button_b2 || 'https://discord.com/',

                    fs.writeFileSync(medmwng_id_Path, JSON.stringify(medmwng_config_id, null, 4));
                    await interaction.update({ withResponse: true });

                } else if (interaction.customId === 'link_ming_modal') {
                    const medmwng_id = interaction.user.id;
                    const medmwng_id_Path = path.resolve(__dirname, 'user.json');
                    const link_ming_URL = interaction.fields.getTextInputValue("link_ming");

                    if (!link_ming_URL.startsWith('https://') && !link_ming_URL.startsWith('http://')) {
                        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
                        const embed = new EmbedBuilder()
                            .setTitle('ที่อยู่ลิงก์ไม่ถูกต้อง \`\`❌\`\`')
                            .setDescription('**กรุณาเพิ่มที่อยู่ลิงค์ให้ถูกต้องด้วย!**')
                            .setColor(0xFF0000);
                        await interaction.editReply({ embeds: [embed] });
                        return;

                    }
                    const medmwng_config_id = MedmwngPath();
                    medmwng_config_id[medmwng_id].stream_URL = link_ming_URL || 'https://twitch.tv/ANIME',

                    fs.writeFileSync(medmwng_id_Path, JSON.stringify(medmwng_config_id, null, 4));
                    await interaction.update({ withResponse: true });

                }
            }
        } catch (error) {
            console.error('Submit_modals Error executing', error);
        }
    }
};
