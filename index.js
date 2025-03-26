const fs = require('fs');
const path = require('path');
const axios = require('axios');
const Date_Time = Date.now();
const config = require('./config.json');
const Discord = require('discord.js-selfbot-v13');
const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, REST, Routes, ActivityType  } = require('discord.js');
const { getCurrentTime, getCurrentDay, getCurrentDayy, getCurrentDateEG, getCurrentDayThai, getCurrentDayEG, getRAMInfo, getCPUInfo, getTemperature } = require('./modal_setting/timeUtils');

const regularbot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});


const userConfigPath = path.resolve(__dirname, './modal_setting/user.json');
let userConfig = JSON.parse(fs.readFileSync(userConfigPath, 'utf8'));
let clients = {};
function createUserConfig(users) {
    for (const key in clients) {
        if (!users[key]) {
            clients[key].client.destroy();
            delete clients[key];
        }
    }
    for (const key in users) {
        const connect = users[key];
        const user = {
            id: key,
            token: connect.token,
            Name1: connect.Name1,
            Name2: connect.Name2,
            Details1: connect.Details1,
            Details2: connect.Details2,
            Statetext1: connect.Statetext1,
            Statetext2: connect.Statetext2,
            State1: connect.State1,
            State2: connect.State2,
            stream_URL: connect.stream_URL,
            LargeImage1: connect.LargeImage1,
            SmallImage1: connect.SmallImage1,
            LargeImage2: connect.LargeImage2,
            SmallImage2: connect.SmallImage2,
            Button1: connect.Button1,
            Link_Button1: connect.Link_Button1,
            Button2: connect.Button2,
            Link_Button2: connect.Link_Button2,

        };
        if (clients[key]) {
            clients[key].updateUser(user);
        } else {
            clients[key] = new MyClient(user);
        }
    }
}


class GetImage {
    constructor(client) {
        this.client = client;
    }
    isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
    async get(ImageUrl1, ImageUrl2) {
        try {
            ImageUrl1 = this.isValidURL(ImageUrl1) ? ImageUrl1 : null;
            ImageUrl2 = this.isValidURL(ImageUrl2) ? ImageUrl2 : null;
            if (!ImageUrl1 && !ImageUrl2) {
                throw new Error(gradient.rainbow("The image is invalid"));
            }
            const { getExternal } = Discord.RichPresence;
            const images = await getExternal(this.client, '1194538382630584372', ImageUrl1, ImageUrl2);
            if (images.length === 1) {
                const { url, external_asset_path } = images[0];
                if (url === ImageUrl1) {
                    ImageUrl1 = url.includes("attachments") ? url : external_asset_path;
                    ImageUrl2 = null;
                } else if (url === ImageUrl2) {
                    ImageUrl1 = null;
                    ImageUrl2 = url.includes("attachments") ? url : external_asset_path;
                }
            } else if (images.length === 2) {
                const [Images_path1, Images_path2] = images;
                if (Images_path1.external_asset_path) {
                    const { url, external_asset_path } = Images_path1;
                    ImageUrl1 = url.includes("attachments") ? url : external_asset_path;
                }
                if (Images_path2.external_asset_path) {
                    const { url, external_asset_path } = Images_path2;
                    ImageUrl2 = url.includes("attachments") ? url : external_asset_path;
                }
            } else {
                throw new Error(gradient.rainbow("The image is invalid"));
            }
            return { BIGlargeIMAGE: ImageUrl1, IMAGE_small: ImageUrl2 };
        } catch {
            return { BIGlargeIMAGE: null, IMAGE_small: null };
        }
    }
}

function getPing() {
    const ping = Math.round(this.client.ws.ping);
    return `${ping}`;
}

    class MyClient extends Discord.Client {
        constructor(user) {
            super({ partials: [], makeCache: Discord.Options.cacheWithLimits({ MessageManager: 0 }) }); 
            this.updateUser(user);
            this.cacheImage = new Map();
            this.index = 0;
            this.client = new Discord.Client({ readyStatus: false, checkUpdate: false });
            this.getExternal = new GetImage(this.client);
            this.client.once('ready', () => {
                this.updateStatus();
                this.statusInterval = setInterval(() => this.updateStatus(), 4000);
            });
            this.client.login(user.token)
                .catch(error => {
                    if (error.code === 'TOKEN_INVALID' || error.code === 'INVALID_INTENTS') {
                        delete userConfig[user.id];
                        error_token(user.id);
                        fs.writeFileSync(userConfigPath, JSON.stringify(userConfig, null, 2));
                    } else {
                        console.error('Login error:', error);
                    }
                });
        }

    updateUser(user) {
        this.user = user;
        this.index = 0;
        this.Status_NAME = [user.Name1, user.Name2];
        this.Status_TOP = [user.Details1, user.Details2];
        this.Statestext = [user.Statetext1, user.Statetext2];
        this.States = [user.State1, user.State2];
        this.largeImageLink = [user.LargeImage1, user.LargeImage2];
        this.smallImageLink = [user.SmallImage1, user.SmallImage2];
        this.Button_B1 = [user.Button1];
        this.Button_B2 = [user.Button2];
        this.LINK_Button_B1 = [user.Link_Button1];
        this.LINK_Button_B2 = [user.Link_Button2];
    }
    async updateStatus() {

        function replacePlaceholders(text, replacements) {
               for (const key in replacements) {
                   text = text.replace(new RegExp(key, 'i'), replacements[key]);
               }
               return text;
           }
           
           const ping = getPing.call(this);
           const temperature = getTemperature();
           const ramText = getRAMInfo();
           const cpuText = getCPUInfo();
           const Time = `${getCurrentTime()}`;
           const Date = `${getCurrentDay()}`;
           const Datee = `${getCurrentDayy()}`;
           const SundayThai = `${getCurrentDayThai()}`;
           const SundayEG = `${getCurrentDayEG()}`;
           const DateEG = `${getCurrentDateEG()}`;
   
           const richPresence = new Discord.RichPresence(this.client)
           const detailReplacements = {
               'time:t': Time, // เวลานาที
               'date:n': Date, // ปฎิทินวันที่ตัวเลข
               'date:th': Datee, // ปฎิทินวันที่ภาษาไทย
               'date:eg': DateEG,    // แสดงปฎิทินวันที่ภาษาอังกฤษ
               'ping:ms': ping,  // ความปิง
               'temp:c': temperature, // ความร้อน
               'ram:g': ramText,  // แสดงแรม
               'cpu:g': cpuText, // แสดง CPU
               'day:th': SundayThai, // แสดงวันของไทย จันทร์ อังคาร.....
               'day:eg': SundayEG   // แสดงวันของอังกฤษ 𝐒𝐮𝐧𝐝𝐚𝐲 𝐌𝐨𝐧𝐝𝐚𝐲.....
           };
   
           // ชื่อด้านบนสุด
           let Status_TOP = this.Status_TOP[this.index];
           Status_TOP = replacePlaceholders(Status_TOP, detailReplacements);
           if (!Status_TOP.includes('-')) {
               richPresence.setDetails(Status_TOP);
           }
   
           let Status_NAME = this.Status_NAME[this.index];
           Status_NAME = replacePlaceholders(Status_NAME, detailReplacements);
           if (!Status_NAME.includes('-')) {
               richPresence.setName(Status_NAME);
           }

           // ชื่อตรงกลาง
           let Statestext = this.Statestext[this.index];
           Statestext = replacePlaceholders(Statestext, detailReplacements);
           if (!Statestext.includes('-')) {
               richPresence.setState(Statestext);
           }
   
           // ชื่อด้านล่าง
           let States = this.States[this.index];
           States = replacePlaceholders(States, detailReplacements);
           if (!States.includes('-')) {
               richPresence.setAssetsLargeText(States);
           }
   
           // รูปภาพใหญ่
           const SetlargeImageLink = this.largeImageLink[this.index];
   
           // รูปภาพเล็ก
           const SetsmallImageLink = this.smallImageLink[this.index];
           const images = await this.getImage(SetlargeImageLink, SetsmallImageLink);
   
           // รูปภาพใหญ่
           if (SetlargeImageLink && !SetlargeImageLink.includes('-')) {
               richPresence.setAssetsLargeImage(images.BIGlargeIMAGE);
           }
           // รูปภาพเล็ก
           if (SetsmallImageLink && !SetsmallImageLink.includes('-')) {
               richPresence.setAssetsSmallImage(images.IMAGE_small);
           }
           richPresence
               .setApplicationId(this.user.id)
               .setType("STREAMING")
               .setURL(this.user.stream_URL)
               .setStartTimestamp(`${Date_Time}`)
           if (isValidUrl(this.user.Link_Button1)) richPresence.addButton(this.user.Button1, this.user.Link_Button1);
           if (isValidUrl(this.user.Link_Button2)) richPresence.addButton(this.user.Button2, this.user.Link_Button2);
           this.client.user.setActivity(richPresence);
           this.index = (this.index + 1) % this.Status_NAME.length;
       }
       async getImage(SetlargeImageLink, SetsmallImageLink) {
           const images = await this.getExternal.get(this.userConfig, SetlargeImageLink, SetsmallImageLink);
           const finallargeImage = images.BIGlargeIMAGE ?? this.cacheImage.get(SetlargeImageLink);
           const finalSmallImage = images.IMAGE_small ?? this.cacheImage.get(SetsmallImageLink);
           if (images.BIGlargeIMAGE) this.cacheImage.set(SetlargeImageLink, images.BIGlargeIMAGE);
           if (images.IMAGE_small) this.cacheImage.set(SetsmallImageLink, images.IMAGE_small);
           return { BIGlargeIMAGE: finallargeImage, IMAGE_small: finalSmallImage };
       }
       destroy() {
           clearInterval(this.statusInterval);
           this.client.destroy();
       }
   }
   
   const isValidUrl = url => {
       try {
           new URL(url);
           return true;
       } catch {
           return false;
       }
   };

createUserConfig(userConfig);
function reloadUserConfig() {
    setTimeout(() => {
        try {
            userConfig = JSON.parse(fs.readFileSync(userConfigPath, 'utf8'));
            createUserConfig(userConfig);
        } catch (error) {
            console.error('Error parsing user config file:', error);
        }
    }, 1000);
}
fs.watch(userConfigPath, (eventType, filename) => {
    if (filename && eventType === 'change') {
        reloadUserConfig();
    }
});
reloadUserConfig();

regularbot.setMaxListeners(80);
const commands = [
    new SlashCommandBuilder()
        .setName('open_status')
        .setDescription('[ 🔥 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗦𝘁𝗮𝘁𝘂𝘀 𝗠𝗲𝗱𝗺𝘄𝗻𝗴 ]')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('[ 💬 𝗖𝗵𝗮𝗻𝗻𝗲𝗹 𝗢𝗽𝗲𝗻𝗦𝘁𝗮𝘁𝘂𝘀 ]')
                .setRequired(true))
        .toJSON(),
];

const GREEN = `\x1b[32m`;
const BLUE = `\x1b[34m`;
const MAGENTA = `\x1b[35m`;
const BOLD = `\x1b[1m`;
const RESET = `\x1b[0m`;
let Index = 0;
regularbot.once('ready', async () => {
    console.log(`${BOLD}${GREEN}LOGGED IN AS ${regularbot.user.tag}${RESET}`)

    const updatesStatus = () => {
        const numberOfServers = regularbot.guilds.cache.size;
        let StatusNAME = [
            `Playing Streaming Bot | open_status `,
            `Already Joined ${numberOfServers} Server `,
        ];
        let totalBots = 0;
        regularbot.guilds.cache.forEach(guild => {
            const botsInGuild = guild.members.cache.filter(member => member.user.bot).size;
            totalBots += botsInGuild;
        });
        let Status = StatusNAME[Index % StatusNAME.length];
        regularbot.user.setPresence({
            activities: [
                {
                    name: `${Status}`,
                    type: ActivityType.Custom,
                }],
            status: `idle`
        });
        Index++;
    };
    updatesStatus();
    setInterval(updatesStatus, 8000);

    const rest = new REST({ version: '10' }).setToken(`${config.token_bot}`);
    try {
        await rest.put(Routes.applicationCommands(regularbot.user.id), { body: commands });
        console.log(`${BOLD}${BLUE}SUCCESSFULLY!${RESET} 彡 INFO :【 STATUS: ${GREEN}LOGIN BOT ${regularbot.user.tag}${RESET}, DEVELOPER: ${MAGENTA}CHII 4.0 HZ${RESET} 】`)
    } catch (error) {
        console.error(`${BOLD}${BLUE}ERROR!${RESET} 彡 INFO :【 STATUS: ${GREEN}LOGIN ERROR${RESET}, DEVELOPER: ${MAGENTA}CHII 4.0 HZ${RESET} 】`)
    }
});


const command_Files = fs.readdirSync('./command').filter(file => file.endsWith('.js'));
for (const file of command_Files) {
    const command_file = require(path.join(__dirname, 'command', file));
    if (command_file.once) {
        regularbot.once(command_file.name, (...args) => command_file.execute(regularbot, ...args));
    } else {
        regularbot.on(command_file.name, (...args) => command_file.execute(regularbot, ...args));
    }
}


const modal_setting_Files = fs.readdirSync('./modal_setting').filter(file => file.endsWith('.js'));
for (const file of modal_setting_Files) {
    const modal_setting_file = require(path.join(__dirname, 'modal_setting', file));
    if (modal_setting_file.once) {
        regularbot.once(modal_setting_file.name, (...args) => modal_setting_file.execute(regularbot, ...args));
    } else {
        regularbot.on(modal_setting_file.name, (...args) => modal_setting_file.execute(regularbot, ...args));
    }
}

async function error_token(userId) {
    if (!userId) return;
    try {
        const user = await regularbot.users.fetch(userId);
        if (!user) return;
        const embed = new EmbedBuilder()
             .setColor(0xFFCC33) // สีแดง
            .setTitle("\`\`🔔\`\` ผู้ใช้งานป้อนข้อมูลไม่ถูกต้อง")
            .setDescription(`\`\`👤\`\` ผู้ใช้งาน <@${user.id}>\n\`\`💬\`\` **โทเค็นผู้ใช้งานไม่ถูกต้อง**\`\`\`✅ กรุณากรอกข้อมูลให้ถูกต้องในการทำสถานะงับ\`\`\``)
            .setThumbnail(user.displayAvatarURL())

        await axios.post(config.WEBHOOK_URL, {
            embeds: [embed.toJSON()],
        });

    } catch (fetchError) {
        console.error("Error fetching user:", fetchError);
    }
}


regularbot.login(config.token_bot);