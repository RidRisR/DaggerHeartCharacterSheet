// 统一的职业数据对象
const professions = {
  warrior: {
    id: "warrior",
    name: "战士", // WARRIOR
    subtitle: "", // 副标题（如果Daggerheart有，可以在此填充）
    description: "战士是战斗的大师，受过战争艺术的训练。",
    classFeatures: [
      {
        name: "战斗策略家",
        description:
          "在一次成功的攻击检定后，你可以描述你如何智胜你的目标，然后标记一个压力点来对目标造成一个压力点。",
      },
      {
        name: "借机攻击",
        description:
          "如果一个敌人试图离开你的近战范围，进行一次敏捷反应检定，对抗其难度。如果成功，选择一个效果；如果大成功，选择两个效果：",
        list: ["阻止他们移动。", "造成你主要武器的伤害。", "与他们一同移动。"],
      },
      {
        name: "战斗训练",
        description:
          "装备武器时忽略负重。每当你造成物理伤害时，将你的等级加到伤害值上。",
      },
    ],
    upgrades: {
      tier1: [
        { label: "战士的示例升级。", doubleBox: false },
        { label: "获得武器精通能力：你选择的武器类型伤害+1。", doubleBox: false },
        { label: "获得威吓气场能力：进行威吓检定时具有优势。", doubleBox: false },
      ],
      tier2: [
        { label: "获得借机攻击能力。", doubleBox: false },
        { label: "获得盾牌大师能力：使用盾牌时AC+1。", doubleBox: false },
        {
          label: "获得战场指挥官能力：让你的一名盟友在下次攻击时获得优势。",
          doubleBox: false,
        },
      ],
      tier3: [
        { label: "获得战斗训练能力。", doubleBox: false },
        { label: "获得不屈不挠能力：每天一次，重掷一次失败的豁免检定。", doubleBox: false },
        {
          label: "获得凶猛重击能力：在重击时额外增加一个伤害骰。",
          doubleBox: false,
        },
      ],
    },
  },
  rogue: {
    id: "rogue",
    name: "游荡者", // ROGUE
    subtitle: "",
    description: "游荡者是潜行和欺诈的大师，从阴影中出击。",
    classFeatures: [
      {
        name: "偷袭",
        description:
          "当你在攻击检定中具有优势时，命中时额外造成1d6伤害。此伤害在5级时增加到2d6，9级时3d6，13级时4d6。",
      },
      {
        name: "灵巧动作",
        description: "你可以在你的每个回合中用一个附赠动作来进行疾走、撤离或躲藏。",
      },
      {
        name: "反射闪避",
        description:
          "当你受到一个允许你进行敏捷豁免检定以减半伤害的效果时，成功则不受伤害，失败则只受一半伤害。",
      },
    ],
    upgrades: {
      tier1: [
        { label: "获得偷袭能力。", doubleBox: false },
        { label: "获得盗贼黑话能力：可以与其他游荡者秘密交流。", doubleBox: false },
        { label: "获得快速巧手能力：可以用附赠动作使用物品。", doubleBox: false },
      ],
      tier2: [
        { label: "获得灵巧动作能力。", doubleBox: false },
        { label: "获得直觉闪避能力：减少你能看到的攻击所造成的伤害。", doubleBox: false },
        { label: "获得专精能力：在两项技能上获得双倍熟练加值。", doubleBox: false },
      ],
      tier3: [
        { label: "获得反射闪避能力。", doubleBox: false },
        {
          label: "获得可靠才能能力：对于你熟练的技能，d20掷骰结果为9或更低时视为10。",
          doubleBox: false,
        },
        {
          label: "获得滑溜心灵能力：在对抗魅惑或恐慌的豁免检定中具有优势。",
          doubleBox: false,
        },
      ],
    },
  },
  mage: {
    id: "mage",
    name: "法师", // MAGE
    subtitle: "",
    description: "法师是奥术力量的掌控者，能够按照自己的意愿扭曲现实。",
    classFeatures: [
      {
        name: "施法",
        description:
          "你可以施放你法术书中的法术。你准备的法术数量等于你的智力调整值+你的等级。",
      },
      {
        name: "奥术回想",
        description:
          "每天一次，当你完成一次短休时，你可以恢复总等级等于你等级一半（向上取整）的法术位。",
      },
      {
        name: "法术精通",
        description:
          "在更高等级时，你可以不消耗法术位施放某些法术。从你的法术书中选择一个1级法术和一个2级法术。",
      },
    ],
    upgrades: {
      tier1: [
        { label: "获得施法能力。", doubleBox: false },
        {
          label: "获得奥术法器能力：忽略没有消耗的材料成分。",
          doubleBox: false,
        },
        { label: "获得魔法洞察能力：通过短休鉴定魔法物品。", doubleBox: false },
      ],
      tier2: [
        { label: "获得奥术回想能力。", doubleBox: false },
        { label: "获得塑能法术能力：保护盟友免受你的范围法术伤害。", doubleBox: false },
        {
          label: "获得强效戏法能力：你的戏法在目标成功豁免时仍造成一半伤害。",
          doubleBox: false,
        },
      ],
      tier3: [
        { label: "获得法术精通能力。", doubleBox: false },
        {
          label: "获得强化塑能系能力：将智力调整值加入塑能系法术的伤害中。",
          doubleBox: false,
        },
        { label: "获得强化魔宠能力：召唤一个更强大的魔宠。", doubleBox: false },
      ],
    },
  },
  cleric: {
    id: "cleric",
    name: "牧师", // CLERIC
    subtitle: "",
    description: "牧师是神圣的仆从，引导他们神祇的力量。",
    classFeatures: [
      {
        name: "引导神力",
        description: "你可以直接从你的神祇引导神圣能量，用这些能量来驱动魔法效果。",
      },
      {
        name: "神祇干预",
        description:
          "你可以呼唤你的神祇代表你进行干预。成功的几率是你的牧师等级百分比。",
      },
      {
        name: "祝福治疗者",
        description:
          "当你施放一个为其他生物恢复生命值的法术时，你恢复等于2+法术等级的生命值。",
      },
    ],
    upgrades: {
      tier1: [
        { label: "获得引导神力能力。", doubleBox: false },
        { label: "获得生命信徒能力：治疗法术恢复额外的生命值。", doubleBox: false },
        { label: "获得守护光耀能力：使针对你的攻击检定具有劣势。", doubleBox: false },
      ],
      tier2: [
        { label: "获得神祇干预能力。", doubleBox: false },
        { label: "获得维持续命能力：引导神力治疗多个生物。", doubleBox: false },
        { label: "获得战争祭司能力：可以用附赠动作进行武器攻击。", doubleBox: false },
      ],
      tier3: [
        { label: "获得祝福治疗者能力。", doubleBox: false },
        {
          label: "获得强效施法能力：将感知调整值加入牧师戏法的伤害中。",
          doubleBox: false,
        },
        { label: "获得神圣打击能力：武器攻击每回合一次造成额外伤害。", doubleBox: false },
      ],
    },
  },
  ranger: {
    id: "ranger",
    name: "游侠", // RANGER
    subtitle: "",
    description: "游侠是荒野专家，擅长追踪猎物并在恶劣环境中生存。",
    classFeatures: [
      {
        name: "自然探索者",
        description:
          "你特别熟悉一种类型的自然环境，并且擅长在这类地区旅行和生存。",
      },
      {
        name: "猎人印记",
        description:
          "你可以将一个生物标记为你的猎物。当你用武器攻击命中目标时，对目标造成额外1d6伤害。",
      },
      {
        name: "原始知觉",
        description:
          "你可以用你的动作集中你的感知力于周围区域，让你能够侦测到特定类型的生物。",
      },
    ],
    upgrades: {
      tier1: [
        { label: "获得自然探索者能力。", doubleBox: false },
        { label: "获得野兽密语者能力：可以与野兽交流简单的想法。", doubleBox: false },
        { label: "获得宿敌能力：在追踪特定类型的敌人时具有优势。", doubleBox: false },
      ],
      tier2: [
        { label: "获得猎人印记能力。", doubleBox: false },
        { label: "获得陆地行者能力：在困难地形中移动不受减值。", doubleBox: false },
        { label: "获得巨像杀手能力：对受伤的生物造成额外伤害。", doubleBox: false },
      ],
      tier3: [
        { label: "获得原始知觉能力。", doubleBox: false },
        {
          label: "获得遁形能力：可以用附赠动作躲藏，并且无法被非魔法手段追踪。",
          doubleBox: false,
        },
        { label: "获得野性直觉能力：可以侦测到30英尺内的隐形生物。", doubleBox: false },
      ],
    },
  },
};

// 血统数据
const ancestryData = [
  {
    id: "human",
    name: "人类",
    description: "适应性强且雄心勃勃，人类是最常见的血统。",
  },
  {
    id: "elf",
    name: "精灵",
    description: "长寿而优雅，精灵与自然和魔法有着深厚的联系。",
  },
  {
    id: "dwarf",
    name: "矮人",
    description: "强壮而坚韧，矮人是技艺精湛的工匠和矿工。",
  },
  {
    id: "halfling",
    name: "半身人",
    description: "体型小巧但勇敢，半身人珍视舒适和社群。",
  },
  {
    id: "orc",
    name: "兽人",
    description: "强大而凶猛，兽人是具有部落文化的天生战士。",
  },
  {
    id: "gnome",
    name: "侏儒",
    description: "好奇且富有创造力，侏儒对魔法和修补有天然的亲和力。",
  },
  {
    id: "tiefling",
    name: "提夫林",
    description: "带有炼狱血统，提夫林常被不信任，但拥有独特的能力。",
  },
  {
    id: "dragonborn",
    name: "龙裔",
    description: "骄傲而光荣，龙裔拥有龙族血统和龙息武器。",
  },
];

// 社区数据
const communityData = [
  {
    id: "city",
    name: "城市",
    description: "拥有多样化人口和机遇的城市中心。",
  },
  {
    id: "village",
    name: "村庄",
    description: "小型、紧密联系的社区，每个人都互相认识。",
  },
  {
    id: "nomadic",
    name: "游牧部落",
    description: "追随季节性模式或资源的游荡群体。",
  },
  {
    id: "forest",
    name: "森林飞地",
    description: "与林地环境和谐共存的隐蔽社区。",
  },
  {
    id: "mountain",
    name: "山区据点",
    description: "雕刻在山腰上的堡垒式定居点。",
  },
  {
    id: "coastal",
    name: "沿海港湾",
    description: "依赖海洋获取生计和贸易的社区。",
  },
  {
    id: "desert",
    name: "沙漠绿洲",
    description: "在干旱地区围绕珍贵水源建造的定居点。",
  },
  {
    id: "academic",
    name: "学术机构",
    description: "学习和魔法研究的中心。",
  },
];

// 武器数据
const weaponData = [
  {
    id: "longsword",
    name: "长剑",
    trait: "多用，近战", // Versatile, Melee
    damage: "1d8",
    feature: "可以用双手挥舞造成1d10伤害",
  },
  {
    id: "dagger",
    name: "匕首",
    trait: "轻型，灵巧，投掷（20/60）", // Light, Finesse, Thrown (20/60)
    damage: "1d4",
    feature: "可以作为自由动作拔出",
  },
  {
    id: "bow", // 原为 longbow, 对应长弓
    name: "长弓",
    trait: "双手，远程（150/600）", // Two-handed, Ranged (150/600)
    damage: "1d8",
    feature: "需要双手使用",
  },
  {
    id: "axe", // 原为 battle axe, 对应战斧
    name: "战斧",
    trait: "多用，近战", // Versatile, Melee
    damage: "1d8",
    feature: "可以用双手挥舞造成1d10伤害",
  },
  {
    id: "mace",
    name: "钉头锤",
    trait: "近战", // Melee
    damage: "1d6",
    feature: "忽略2点护甲",
  },
  {
    id: "staff", // 原为 quarterstaff, 对应木棍/长棍
    name: "长棍",
    trait: "多用，近战", // Versatile, Melee
    damage: "1d6",
    feature: "可以用双手挥舞造成1d8伤害",
  },
  {
    id: "crossbow",
    name: "弩",
    trait: "双手，远程（80/320）", // Two-handed, Ranged (80/320)
    damage: "1d8",
    feature: "需要一个动作来重新装填",
  },
  {
    id: "greatsword",
    name: "巨剑",
    trait: "双手，重型，近战", // Two-handed, Heavy, Melee
    damage: "2d6",
    feature: "进行威吓检定时具有优势",
  },
  {
    id: "warhammer",
    name: "战锤",
    trait: "多用，近战", // Versatile, Melee
    damage: "1d8",
    feature: "可以用双手挥舞造成1d10伤害",
  },
  {
    id: "shortbow",
    name: "短弓",
    trait: "双手，远程（80/320）", // Two-handed, Ranged (80/320)
    damage: "1d6",
    feature: "可以在骑乘时使用",
  },
];

// 护甲数据
const armorData = [
  {
    id: "leather",
    name: "皮甲",
    baseScore: "11 + 敏捷调整值", // 11 + DEX
    feature: "轻甲，潜行检定无劣势",
  },
  {
    id: "chain",
    name: "链甲",
    baseScore: "16",
    feature: "重甲，潜行检定有劣势，需要力量13", // requires STR 13
  },
  {
    id: "plate",
    name: "板甲",
    baseScore: "18",
    feature: "重甲，潜行检定有劣势，需要力量15", // requires STR 15
  },
  {
    id: "shield",
    name: "盾牌",
    baseScore: "+2", // 通常指AC +2
    feature: "可以与任何护甲配合使用，需要一只手",
  },
  {
    id: "hide",
    name: "生皮甲",
    baseScore: "12 + 敏捷调整值 (最高2)", // 12 + DEX (max 2)
    feature: "中甲，潜行检定无劣势",
  },
  {
    id: "breastplate",
    name: "胸甲",
    baseScore: "14 + 敏捷调整值 (最高2)", // 14 + DEX (max 2)
    feature: "中甲，潜行检定无劣势",
  },
  {
    id: "halfplate",
    name: "半身板甲",
    baseScore: "15 + 敏捷调整值 (最高2)", // 15 + DEX (max 2)
    feature: "中甲，潜行检定有劣势",
  },
  {
    id: "studded",
    name: "镶钉皮甲",
    baseScore: "12 + 敏捷调整值", // 12 + DEX
    feature: "轻甲，潜行检定无劣势",
  },
];

// 升级选项数据 (非职业特定部分)
const upgradeOptionsData = {
  // 基础升级选项（所有职业通用）
  baseUpgrades: [
    { label: "一个示例。", doubleBox: false },
    { label: "一个示例。", doubleBox: false },
    { label: "一个示例。", doubleBox: true },
    { label: "一个示例。", doubleBox: true },
  ],

  // 特定等级升级选项
  tierSpecificUpgrades: {
    tier2: [
      {
        label: "获取一张升级后的子职业卡。然后划掉此等阶的兼职选项。",
        doubleBox: false,
      },
      { label: "将你的熟练项加值提高+1。", doubleBox: true },
      {
        label:
          '兼职：为你的角色选择一个额外的职业，然后在此表上划掉一个未使用的“获取一张升级后的子职业卡”选项和另一个兼职选项。',
        doubleBox: true,
      },
    ],
    tier3: [
      {
        label: "获取一张升级后的子职业卡。然后划掉此等阶的兼职选项。",
        doubleBox: false,
      },
      { label: "将你的熟练项加值提高+1。", doubleBox: true },
      {
        label:
          '兼职：为你的角色选择一个额外的职业，然后在此表上划掉一个未使用的“获取一张升级后的子职业卡”选项和另一个兼职选项。',
        doubleBox: true,
      },
    ],
  },
};