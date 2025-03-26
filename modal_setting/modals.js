const fs = require('fs');
const path = require('path');
const { TextInputBuilder, ActionRowBuilder, ModalBuilder, TextInputStyle, EmbedBuilder, MessageFlags } = require('discord.js');


const handleUserSetupError = async (interaction) => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    const Embed_error = new EmbedBuilder()
        .setColor(0xFF0033)
        .setTitle('\`\`❌\`\` เอ้ะ! คุณต้องตั้งค่าข้อมูลผู้ใช้งานก่อน!');
    await interaction.editReply({ embeds: [Embed_error] });
};


const MedmwngPath = () => {

    const medmwng_id_Path = path.resolve(__dirname, 'user.json');
    let medmwng_config_id = {};

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

            if (interaction.isButton() && interaction.customId === "set_id_token") {

                const medmwng_id = interaction.user.id;
                const medmwng_config_id = MedmwngPath();

                const modal = new ModalBuilder()
                    .setCustomId('id_token__modal')
                    .setTitle('ข้อมูลส่วนตัวควรเก็บเป็นความลับ')
                    .addComponents(
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('medmwng_token')
                                .setLabel('[ TOKEN ของผู้ใช้งาน ]')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('TOKEN ควรเก็บเป็นความลับรู้เพียงคุณเท่านั้น')
                                .setRequired(true)
                                .setValue(medmwng_config_id[medmwng_id]?.token || 'TOKEN')
                        ),
                    );
                await interaction.showModal(modal);

            } else if (interaction.isButton() && interaction.customId === "set_name_status") {


                const medmwng_id = interaction.user.id;
                const medmwng_config_id = MedmwngPath();


                if (!medmwng_config_id[interaction.user.id]?.token) {
                    await handleUserSetupError(interaction);
                    return;
                }

                const modal = new ModalBuilder()
                    .setCustomId('status_a1_modal')
                    .setTitle('ชื่อสถานะหน้าแรก')
                    .addComponents(
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('status_a1')
                                .setLabel('[ 💬ชื่อด้านบนสุด ]')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('หากไม่ใช้ - เอาไว้')
                                .setRequired(false)
                                .setValue(medmwng_config_id[medmwng_id]?.Details1)
                        ),
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('status_a2')
                                .setLabel('[ 💬ชื่อสลับตรงกลาง ]')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('หากไม่ใช้ - เอาไว้')
                                .setRequired(false)
                                .setValue(medmwng_config_id[medmwng_id]?.Statetext1)
                        ),
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('status_a3')
                                .setLabel('[ 💬ชื่อสลับล่างสุด ]')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('หากไม่ใช้ - เอาไว้')
                                .setRequired(false)
                                .setValue(medmwng_config_id[medmwng_id]?.State1)
                        ),
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('image_a1')
                                .setLabel('[ 🔗ลิงค์รูปภาพใหญ่ ]')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('กรอก URL ลิงค์รูปภาพใหญ่')
                                .setRequired(false)
                                .setValue(medmwng_config_id[medmwng_id]?.LargeImage1)
                        ),
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('image_a2')
                                .setLabel('[ 🔗ลิงค์รูปภาพเล็ก ]')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('กรอก URL หากไม่ใช้ - เอาไว้')
                                .setRequired(false)
                                .setValue(medmwng_config_id[medmwng_id]?.SmallImage1)
                        ),

                    );
                await interaction.showModal(modal);

            } else if (interaction.isButton() && interaction.customId === "set_nametwo_status") {

                const medmwng_id = interaction.user.id;
                const medmwng_config_id = MedmwngPath();


                if (!medmwng_config_id[interaction.user.id]?.token) {
                    await handleUserSetupError(interaction);
                    return;
                }

                const modal = new ModalBuilder()
                    .setCustomId('status_b2_modal')
                    .setTitle('ชื่อสถานะหน้าสอง')

                    .addComponents(
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('status_b1')
                                .setLabel('[ 💬ชื่อด้านบนสุด ]')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('หากไม่ใช้ - เอาไว้')
                                .setRequired(false)
                                .setValue(medmwng_config_id[medmwng_id]?.Details2)
                        ),
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('status_b2')
                                .setLabel('[ 💬ชื่อสลับตรงกลาง ]')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('หากไม่ใช้ - เอาไว้')
                                .setRequired(false)
                                .setValue(medmwng_config_id[medmwng_id]?.Statetext2)
                        ),
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('status_b3')
                                .setLabel('[ 💬ชื่อสลับล่างสุด ]')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('หากไม่ใช้ - เอาไว้')
                                .setRequired(false)
                                .setValue(medmwng_config_id[medmwng_id]?.State2)
                        ),
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('image_b1')
                                .setLabel('[ 🔗ลิงค์รูปภาพใหญ่ ]')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('กรอก URL ลิงค์รูปภาพใหญ่')
                                .setRequired(false)
                                .setValue(medmwng_config_id[medmwng_id]?.LargeImage2)
                        ),
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('image_b2')
                                .setLabel('[ 🔗ลิงค์รูปภาพเล็ก ]')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('กรอก URL หากไม่ใช้ - เอาไว้')
                                .setRequired(false)
                                .setValue(medmwng_config_id[medmwng_id]?.SmallImage2)
                        ),
                    );
                await interaction.showModal(modal);
            } else if (interaction.isButton() && interaction.customId === "set_button_b1") {

                const medmwng_id = interaction.user.id;
                const medmwng_config_id = MedmwngPath();


                if (!medmwng_config_id[interaction.user.id]?.token) {
                    await handleUserSetupError(interaction);
                    return;
                }

                const modal = new ModalBuilder()
                    .setCustomId('button_b_modal')
                    .setTitle('ตั้งค่าชื่อปุ่ม และ ลิงค์')
                    .addComponents(
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('button_b1')
                                .setLabel('[ 💬ชื่อปุ่มที่หนึ่ง ]')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('หากไม่ใช้ - เอาไว้')
                                .setRequired(false)
                                .setValue(medmwng_config_id[medmwng_id]?.Button1)
                        ),
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('link_button_b1')
                                .setLabel('[ 🔗ลิงค์ปุ่มที่หนึ่ง ]')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('กรอก URL หากไม่ใช้ - เอาไว้')
                                .setRequired(false)
                                .setValue(medmwng_config_id[medmwng_id]?.Link_Button1)

                        ),
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('button_b2')
                                .setLabel('[ 💬ชื่อปุ่มที่สอง ]')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('หากไม่ใช้ - เอาไว้')
                                .setRequired(false)
                                .setValue(medmwng_config_id[medmwng_id]?.Button2)
                        ),
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('link_button_b2')
                                .setLabel('[ 🔗ลิงค์ปุ่มที่สอง ]')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('กรอก URL หากไม่ใช้ - เอาไว้')
                                .setRequired(false)
                                .setValue(medmwng_config_id[medmwng_id]?.Link_Button2)
                        ),
                    );
                await interaction.showModal(modal);
            } else if (interaction.isButton() && interaction.customId === "set_link_ming") {

                const medmwng_id = interaction.user.id;
                const medmwng_config_id = MedmwngPath();


                if (!medmwng_config_id[interaction.user.id]?.token) {
                    await handleUserSetupError(interaction);
                    return;
                }

                const modal = new ModalBuilder()
                    .setCustomId('link_ming_modal')
                    .setTitle('ตั้งลิงค์สตรีมมิ่ง')
                    .addComponents(
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('link_ming')
                                .setLabel('[ 🔗ตั้งลิงค์ URL สตรีมมิ่ง ]')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('https://www.twitch.tv/Anime')
                                .setRequired(true)
                                .setValue(medmwng_config_id[medmwng_id]?.stream_URL)
                        ),
                    );
                await interaction.showModal(modal);
            }

        } catch (error) {
            console.error('Error Setting Status Modals', error);
        }
    }
};
