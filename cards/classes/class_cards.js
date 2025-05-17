const classes = [
    {
        id: "Bard",
        名称: "吟游诗人",
        领域: ["优雅 Grace", "典籍 Codex"],
        初始闪避: 9,
        重伤阈值: 6,
        严重阈值: 12,
        专属物品: "一本浪漫小说, 或一封从未打开的信",
        职业特性: "吟游诗人的希望 Bard's Hope, 鼓舞 Rally",
        卡图: "resource/主职业能力/吟游诗人.png",
        子职业: [
            {
                子职业名称: "文学巨匠 Wordsmith",
                施法属性: "风度 Presence"
            },
            {
                子职业名称: "流浪乐手 Troubadour",
                施法属性: "风度 Presence"
            }
        ]
    },
    {
        id: "Druid",
        名称: "德鲁伊",
        领域: ["圣者 Sage", "奥术 Arcana"],
        初始闪避: 8,
        重伤阈值: 7,
        严重阈值: 14,
        专属物品: "一小包石头和兽骨, 或者在泥土中发现的奇异吊坠",
        职业特性: "德鲁伊的希望 Druid's Hope, 荒野之触 Wildtouch, 野兽形态 Beastform",
        卡图: "resource/主职业能力/德鲁伊.png",
        子职业: [
            {
                子职业名称: "元素守卫 Warden of the Elements",
                施法属性: "本能 Instinct"
            },
            {
                子职业名称: "复兴守卫 Warden of Renewal",
                施法属性: "本能 Instinct"
            }
        ]
    },
    {
        id: "Guardian",
        名称: "守护者",
        领域: ["勇气 Valor", "利刃 Blade"],
        初始闪避: 8,
        重伤阈值: 8,
        严重阈值: 16,
        专属物品: "一个由你的导师赠予的石质图腾, 或一把秘密钥匙",
        职业特性: "守护者的希望 Guardian's Hope, 势不可挡 Unstoppable",
        卡图: "resource/主职业能力/守护者.png",
        子职业: [
            {
                子职业名称: "坚定者 Stalwart",
                施法属性: "无"
            },
            {
                子职业名称: "复仇者 Vengeance",
                施法属性: "无"
            }
        ]
    },
    {
        id: "Ranger",
        名称: "游侠",
        领域: ["骸骨 Bone", "智者 Sage"],
        初始闪避: 10,
        重伤阈值: 7,
        严重阈值: 14,
        专属物品: "从首次狩猎获得的战利品, 或一个看似破损的指南针",
        职业特性: "游侠的希望 Ranger's Hope, 游侠专注 Ranger's Focus",
        卡图: "resource/主职业能力/游侠.png",
        子职业: [
            {
                子职业名称: "寻路者 Wayfinder",
                施法属性: "敏捷 Agility"
            },
            {
                子职业名称: "驯兽师 Beastbound",
                施法属性: "敏捷 Agility"
            }
        ]
    },
    {
        id: "Rogue",
        名称: "盗贼",
        领域: ["午夜 Midnight", "优雅 Grace"],
        初始闪避: 11,
        重伤阈值: 6,
        严重阈值: 12,
        专属物品: "一套伪造工具, 或一只抓钩",
        职业特性: "盗贼的希望 Rogue's Hope, 隐匿 Hide, 偷袭 Sneak Attack",
        卡图: "resource/主职业能力/盗贼.png",
        子职业: [
            {
                子职业名称: "枭雄 Syndicate",
                施法属性: "灵巧 Finesse"
            },
            {
                子职业名称: "夜行者 Nightwalker",
                施法属性: "灵巧 Finesse"
            }
        ]
    },
    {
        id: "Seraph",
        名称: "神使",
        领域: ["辉耀 Splendor", "勇气 Valor"],
        初始闪避: 7,
        重伤阈值: 8,
        严重阈值: 16,
        专属物品: "一份祭品, 或一枚你所信仰神祇的圣徽",
        职业特性: "神使的希望 Seraph's Hope, 虔信者之骰 Prayer Dice",
        卡图: "resource/主职业能力/神使.png",
        子职业: [
            {
                子职业名称: "翔翼哨兵 Winged Sentinel",
                施法属性: "力量 Strength"
            },
            {
                子职业名称: "神兵驭者 Divine Wielder",
                施法属性: "力量 Strength"
            }
        ]
    },
    {
        id: "Sorcerer",
        名称: "术士",
        领域: ["奥术 Arcana", "午夜 Midnight"],
        初始闪避: 9,
        重伤阈值: 6,
        严重阈值: 12,
        专属物品: "一个持续低语的法球, 或一件传家宝",
        职业特性: "术士的希望 Sorcerer's Hope, 奥术感知 Arcane Sense, 微小幻象 Minor Illusion, 引导原始力量 Channel Raw Power",
        卡图: "resource/主职业能力/术士.png",
        子职业: [
            {
                子职业名称: "原初起源 Primal Origin",
                施法属性: "本能 Instinct"
            },
            {
                子职业名称: "元素起源 Elemental Origin",
                施法属性: "本能 Instinct"
            }
        ]
    },
    {
        id: "Warrior",
        名称: "战士",
        领域: ["利刃 Blade", "骸骨 Bone"],
        初始闪避: 10,
        重伤阈值: 7,
        严重阈值: 14,
        专属物品: "一张爱人的画像, 或一个磨刀石",
        职业特性: "战士的希望 Warrior's Hope, 战术大师 Battle Strategist, 借机攻击 Attack of Opportunity, 战斗训练 Combat Training",
        卡图: "resource/主职业能力/战士.png",
        子职业: [
            {
                子职业名称: "屠戮呼唤 Call of the Slayer",
                施法属性: "无"
            },
            {
                子职业名称: "勇气呼唤 Call of the Brave",
                施法属性: "无"
            }
        ]
    },
    {
        id: "Wizard",
        名称: "法师",
        领域: ["典籍 Codex", "辉耀 Splendor"],
        初始闪避: 10,
        重伤阈值: 5,
        严重阈值: 10,
        专属物品: "一本你试图翻译的书, 或者一只无害的小元素宠物",
        职业特性: "法师的希望 Wizard's Hope, 魔法伎俩 Prestidigitation, 奇异范式 Strange Patterns",
        卡图: "resource/主职业能力/法师.png",
        子职业: [
            {
                子职业名称: "知识学院 School of Knowledge",
                施法属性: "知识 Knowledge"
            },
            {
                子职业名称: "战争学院 School of War",
                施法属性: "知识 Knowledge"
            }
        ]
    }
];
