const weapon_t1_physics = [
    {
        "ID": "Battleaxe",
        "名称": "战斧Battleaxe",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+3",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Warhammer",
        "名称": "战锤Warhammer",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d12+3",
        "负荷": "双手",
        "特性": "重型Heavy: 敏捷-1"
    },
    {
        "ID": "Greatsword",
        "名称": "巨剑Greatsword",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+3",
        "负荷": "双手",
        "特性": "巨型Massive: 敏捷-1，额外骰1个伤害骰并去掉其中最小的一个 "
    },
    {
        "ID": "Mace",
        "名称": "钉头锤Mace",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+1",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Broadsword",
        "名称": "阔剑Broadsword",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8",
        "负荷": "单手",
        "特性": "可靠Reliable: 你的攻击掷骰+1"
    },
    {
        "ID": "Longsword",
        "名称": "长剑Longsword",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+3",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Cutlass",
        "名称": "短刀Cutlass",
        "检定": "风度Presence",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+1",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Rapier",
        "名称": "刺剑Rapier",
        "检定": "风度Presence",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8",
        "负荷": "单手",
        "特性": "迅捷Quick: 标记1个压力以额外攻击一个范围内的目标"
    },
    {
        "ID": "Dagger",
        "名称": "匕首Dagger",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+1",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Quarterstaff",
        "名称": "短棍Quarterstaff",
        "检定": "本能Instinct",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+3",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Halberd",
        "名称": "戟Halberd",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "邻近Very Close",
        "伤害": "d8+2",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Spear",
        "名称": "长矛Spear",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "邻近Very Close",
        "伤害": "d8+2",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Shortbow",
        "名称": "短弓Shortbow",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "远距离Far",
        "伤害": "d6+3",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Crossbow",
        "名称": "弩Crossbow",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "远距离Far",
        "伤害": "d6+1",
        "负荷": "单手",
        "特性": ""
    },
];
const weapon_t1_magic = [
    {
        "ID": "Hallowed_Axe",
        "名称": "圣斧Hallowed Axe",
        "检定": "力量Strength",
        "属性": "魔法",
        "范围": "近战Melee",
        "伤害": "d10+1",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Arcane_Gauntlets",
        "名称": "奥术护手Arcane Gauntlets",
        "检定": "力量Strength",
        "属性": "魔法",
        "范围": "近战Melee",
        "伤害": "d10+3",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Hand_Runes",
        "名称": "手持符文Hand Runes",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "邻近Very Close",
        "伤害": "d10",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Glowing_Rings",
        "名称": "发光戒指Glowing Rings",
        "检定": "敏捷Aglity",
        "属性": "魔法",
        "范围": "邻近Very Close",
        "伤害": "d10+2",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Returing_Blade",
        "名称": "回力剑Returing Blade",
        "检定": "灵巧Finesse",
        "属性": "魔法",
        "范围": "近距离Close",
        "伤害": "d8+1",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Shortstaff",
        "名称": "短杖Shortstaff",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "近距离Close",
        "伤害": "d8+1",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Dualstaff",
        "名称": "双手法杖Dualstaff",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6+3",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Scepter",
        "名称": "权杖Scepter",
        "检定": "风度Presence",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6",
        "负荷": "双手",
        "特性": "多用Versatile：本能近战d10"
    },
    {
        "ID": "Wand",
        "名称": "魔杖Wand",
        "检定": "知识Knowledge",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6+1",
        "负荷": "单手",
        "特性": ""
    },
];
const offhand_weapon_t1 = [
    {
        "ID": "Round_Shield",
        "名称": "圆盾Round Shield",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d4",
        "负荷": "副手",
        "特性": "保护Protective: 护甲值+1"
    },
    {
        "ID": "Tower_Shield",
        "名称": "塔盾Tower Shield",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d6",
        "负荷": "副手",
        "特性": "壁垒Barrie+3 -2"
    },
    {
        "ID": "Small_Dagger",
        "名称": "小匕首Small Dagger",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8",
        "负荷": "副手",
        "特性": "双持Paired: 主武器近战伤害 +2"
    },
    {
        "ID": "Shortsword",
        "名称": "短剑Shortsword",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8",
        "负荷": "副手",
        "特性": "双持Paired: 主武器近战伤害 +2"
    },
    {
        "ID": "Whip",
        "名称": "鞭子Whip",
        "检定": "风度Presence",
        "属性": "物理",
        "范围": "邻近Very Close",
        "伤害": "d6",
        "负荷": "副手",
        "特性": "鞭笞Whipcrack: 标记1点压力，将所有近战范围内的敌人击退至近距离"
    },
    {
        "ID": "Grappler",
        "名称": "抓钩Grappler",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "近距离Close",
        "伤害": "d6",
        "负荷": "副手",
        "特性": "出钩Hook: 进行一次成功的攻击后，你可以将目标拉至你的近战范围内"
    },
];
const armor_t1 = [
    {
        "ID": "Gambeson_Armor",
        "名称": "填充布甲Gambeson Armor",
        "防御": "3",
        "特性": "灵活Flexible: 闪避值+1"
    },
    {
        "ID": "Leather_Armor",
        "名称": "皮甲Leather Armor",
        "防御": "4",
        "特性": ""
    },
    {
        "ID": "Chainmail_Armor",
        "名称": "链甲Chainmail Armor",
        "防御": "5",
        "特性": "厚重Heavy: 闪避值-1"
    },
];
const weapon_t2_physics = [
    {
        "ID": "Improved_Battleaxe",
        "名称": "改良战斧Improved Battleaxe",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+6",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Improved_Warhammer",
        "名称": "改良战锤Improved Warhammer",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d12+6",
        "负荷": "双手",
        "特性": "重型Heavy: 敏捷-1"
    },
    {
        "ID": "Improved_Greatsword",
        "名称": "改良巨剑Improved Greatsword",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+6",
        "负荷": "双手",
        "特性": "巨型Massive: 敏捷-1，额外骰1个伤害骰并去掉其中最小的一个 "
    },
    {
        "ID": "Improved_Mace",
        "名称": "改良钉头锤Improved Mace",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+4",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Improved_Broadsword",
        "名称": "改良阔剑Improved Broadsword",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+6",
        "负荷": "单手",
        "特性": "可靠Reliable: 你的攻击掷骰+1"
    },
    {
        "ID": "Improved_Longsword",
        "名称": "改良长剑Improved Longsword",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+6",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Improved_Cutlass",
        "名称": "改良短刀Improved Cutlass",
        "检定": "风度Presence",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+4",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Improved_Rapier",
        "名称": "改良刺剑Improved Rapier",
        "检定": "风度Presence",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+3",
        "负荷": "单手",
        "特性": "迅捷Quick: 标记1个压力以额外攻击一个范围内的目标"
    },
    {
        "ID": "Improved_Dagger",
        "名称": "改良匕首Improved Dagger",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+4",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Improved_Quarterstaff",
        "名称": "改良短棍Improved Quarterstaff",
        "检定": "本能Instinct",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+6",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Improved_Halberd",
        "名称": "改良戟Improved Halberd",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "邻近Very Close",
        "伤害": "d8+5",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Improved_Spear",
        "名称": "改良长矛Improved Spear",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "邻近Very Close",
        "伤害": "d8+5",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Improved_Shortbow",
        "名称": "改良短弓Improved Shortbow",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "远距离Far",
        "伤害": "d6+6",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Improved_Crossbow",
        "名称": "改良弩Improved Crossbow",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "远距离Far",
        "伤害": "d6+4",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Improved_Longbow",
        "名称": "改良长弓Improved Longbow",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "极远Very Far",
        "伤害": "d6+6",
        "负荷": "双手",
        "特性": "繁琐Cumbersome: 闪避值-1"
    },
    {
        "ID": "Gilded_Falchion",
        "名称": "鎏金弯刀Gilded Falchion",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+6",
        "负荷": "双手",
        "特性": "强力Powerful: 额外骰1个伤害骰并去掉其中最小的一个 "
    },
    {
        "ID": "Knuckle_Blades",
        "名称": "拳刃Knuckle Blades",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+3",
        "负荷": "单手",
        "特性": "残暴Brutal: 伤害骰每掷出一次最大值，就额外掷出一个伤害骰"
    },
    {
        "ID": "Urok_Broadsword",
        "名称": "乌洛克阔剑Urok Broadsword",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+6",
        "负荷": "双手",
        "特性": "致命Deadly: 造成严重伤害时，额外造成 1 点生命值"
    },
    {
        "ID": "Bladed_Whip",
        "名称": "刃鞭Bladed Whip",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "邻近Very Close",
        "伤害": "d8+3",
        "负荷": "单手",
        "特性": "迅捷Quick: 标记1个压力以额外攻击一个范围内的目标"
    },
    {
        "ID": "Steelforged_Halberd",
        "名称": "钢铸戟Steelforged Halberd",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "邻近Very Close",
        "伤害": "d8+4",
        "负荷": "双手",
        "特性": "恐惧Scary: 成功的攻击同时会额外标记1点压力"
    },
    {
        "ID": "War_Scythe",
        "名称": "战镰War Scythe",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "邻近Very Close",
        "伤害": "d8+5",
        "负荷": "双手",
        "特性": "可靠Reliable: 你的攻击掷骰+1"
    },
    {
        "ID": "Greatbow",
        "名称": "巨弓Greatbow",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "远距离Far",
        "伤害": "d6+6",
        "负荷": "双手",
        "特性": "强力Powerful: 额外骰1个伤害骰并去掉其中最小的一个 "
    },
    {
        "ID": "Blunderbuss",
        "名称": "火铳Blunderbuss",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "远距离Far",
        "伤害": "d6+6",
        "负荷": "单手",
        "特性": "装填Reloading: 攻击后骰1d6，如果骰出1，下次攻击前你必须使用一个动作进行装填"
    },
];
const weapon_t2_magic = [
    {
        "ID": "Improved_Hallowed_Axe",
        "名称": "改良圣斧Improved Hallowed Axe",
        "检定": "力量Strength",
        "属性": "魔法",
        "范围": "近战Melee",
        "伤害": "d10+4",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Improved_Arcane_Gauntlets",
        "名称": "改良奥术护手Improved Arcane Gauntlets",
        "检定": "力量Strength",
        "属性": "魔法",
        "范围": "近战Melee",
        "伤害": "d10+6",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Improved_Hand_Runes",
        "名称": "改良手持符文Improved Hand Runes",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "邻近Very Close",
        "伤害": "d10+3",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Improved_Glowing_Rings",
        "名称": "改良发光戒指Improved Glowing Rings",
        "检定": "敏捷Aglity",
        "属性": "魔法",
        "范围": "邻近Very Close",
        "伤害": "d10+5",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Improved_Returing_Blade",
        "名称": "改良回力剑Improved Returing Blade",
        "检定": "灵巧Finesse",
        "属性": "魔法",
        "范围": "近距离Close",
        "伤害": "d8+4",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Shortstaff",
        "名称": "改良短杖Shortstaff",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "近距离Close",
        "伤害": "d8+4",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Improved_Dualstaff",
        "名称": "改良双手法杖Improved Dualstaff",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6+6",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Improved_Scepter",
        "名称": "改良权杖Improved Scepter",
        "检定": "风度Presence",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6+3",
        "负荷": "双手",
        "特性": "多用Versatile：本能近战d10+2"
    },
    {
        "ID": "Improved_Wand",
        "名称": "改良魔杖Improved Wand",
        "检定": "知识Knowledge",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6+4",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Improved_Greatstaff",
        "名称": "改良巨杖Improved Greatstaff",
        "检定": "知识Knowledge",
        "属性": "魔法",
        "范围": "极远Very Far",
        "伤害": "d6+3",
        "负荷": "双手",
        "特性": "强力Powerful: 额外骰1个伤害骰并去掉其中最小的一个 "
    },
    {
        "ID": "Ego_Blade",
        "名称": "自我之刃Ego Blade",
        "检定": "敏捷Aglity",
        "属性": "魔法",
        "范围": "近战Melee",
        "伤害": "d12+4",
        "负荷": "单手",
        "特性": "傲慢Pompous: 0或者更低的风度才可以使用该武器"
    },
    {
        "ID": "Casting_Sword",
        "名称": "施法剑Casting Sword",
        "检定": "力量Strength",
        "属性": "魔法",
        "范围": "近战Melee",
        "伤害": "d10+4",
        "负荷": "双手",
        "特性": "多用Versatile：知识远距离d6+3"
    },
    {
        "ID": "Devouring_Dagger",
        "名称": "吞噬匕首Devouring Dagger",
        "检定": "灵巧Finesse",
        "属性": "魔法",
        "范围": "近战Melee",
        "伤害": "d8+4",
        "负荷": "单手",
        "特性": "恐惧Scary: 成功的攻击同时会额外标记1点压力"
    },
    {
        "ID": "Hammer_of_Exota",
        "名称": "异界之锤Hammer of Exota",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "近战Melee",
        "伤害": "d8+6",
        "负荷": "双手",
        "特性": "爆发Eruptive: 当你在近战中击中一个生物时，每个邻近的敌人都必须进行反应掷骰（14），否则也会受到一半的伤害"
    },
    {
        "ID": "Yutari_Bloodbow",
        "名称": "尤塔里血弓Yutari Bloodbow",
        "检定": "灵巧Finesse",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6+4",
        "负荷": "双手",
        "特性": "残暴Brutal: 伤害骰每掷出一次最大值，就额外掷出一个伤害骰"
    },
    {
        "ID": "Elder_Bow",
        "名称": "长者之弓Elder Bow",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6+4",
        "负荷": "双手",
        "特性": "强力Powerful: 额外骰1个伤害骰并去掉其中最小的一个 "
    },
    {
        "ID": "Scepter_of_Elias",
        "名称": "伊利亚斯的权杖Scepter of Elias",
        "检定": "风度Presence",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6+3",
        "负荷": "单手",
        "特性": "振奋Invigorating: 当你成功攻击时，掷一个 d4。掷出 4 时，清除1点压力"
    },
    {
        "ID": "Wand_of_Enthrallment",
        "名称": "迷惑魔杖Wand of Enthrallment",
        "检定": "风度Presence",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6+4",
        "负荷": "单手",
        "特性": "说服Persuasive: 在进行风度掷骰前可标记1点压力值以+2"
    },
];
const offhand_weapon_t2 = [
    {
        "ID": "Improved_Round_Shield",
        "名称": "改良圆盾Improved Round Shield",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d4+2",
        "负荷": "副手",
        "特性": "保护Protective: 护甲值+2"
    },
    {
        "ID": "Improved_Tower_Shield",
        "名称": "改良塔盾Improved Tower Shield",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d6+2",
        "负荷": "副手",
        "特性": "壁垒Barrier: 护甲值+4，闪避值-2"
    },
    {
        "ID": "Improved_Small_Dagger",
        "名称": "改良小匕首Improved Small Dagger",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+2",
        "负荷": "副手",
        "特性": "双持Paired: 主武器近战伤害 +3"
    },
    {
        "ID": "Improved_Shortsword",
        "名称": "改良短剑Improved Shortsword",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+2",
        "负荷": "副手",
        "特性": "双持Paired: 主武器近战伤害+3"
    },
    {
        "ID": "Improved_Whip",
        "名称": "改良鞭子Improved Whip",
        "检定": "风度Presence",
        "属性": "物理",
        "范围": "邻近Very Close",
        "伤害": "d6+2",
        "负荷": "副手",
        "特性": "鞭笞Whipcrack: 标记1点压力，将所有近战范围内的敌人击退至近距离"
    },
    {
        "ID": "Improved_Grappler",
        "名称": "改良抓钩Improved Grappler",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "近距离Close",
        "伤害": "d6+2",
        "负荷": "副手",
        "特性": "出钩Hook: 进行一次成功的攻击后，你可以将目标拉至你的近战范围内"
    },
    {
        "ID": "Improved_Hand_Crossbow",
        "名称": "改良手弩Improved Hand Crossbow",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "远距离Far",
        "伤害": "d6+3",
        "负荷": "副手",
        "特性": ""
    },
    {
        "ID": "Spiked_Shield",
        "名称": "尖刺盾牌Spiked Shield",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d6+2",
        "负荷": "副手",
        "特性": "两用Double Duty: 护甲值+2，主武器近战伤害+1"
    },
    {
        "ID": "Parrying_Dagger",
        "名称": "格挡匕首Parrying Dagger",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d6+2",
        "负荷": "副手",
        "特性": "格挡Parry: 在对你发起攻击时，掷出该武器的伤害骰子。如果有任何与攻击者匹配的骰子，则在伤害总计之前将其移除"
    },
];
const armor_t2 = [
    {
        "ID": "Improved_Gambeson_Armor",
        "名称": "改良填充布甲Improved Gambeson Armor",
        "防御": "3",
        "特性": "灵活Flexible: 闪避值+1"
    },
    {
        "ID": "Improved_Leather_Armor",
        "名称": "改良皮甲Improved Leather Armor",
        "防御": "5",
        "特性": ""
    },
    {
        "ID": "Improved_Chainmail_Armor",
        "名称": "改良链甲Improved Chainmail Armor",
        "防御": "7",
        "特性": "厚重Heavy: 闪避值-1"
    },
    {
        "ID": "Improved_Full_Plate_Armor",
        "名称": "改良全板甲Improved Full Plate Armor",
        "防御": "9",
        "特性": "极重Very Heavy: 闪避值-2，敏捷-1"
    },
    {
        "ID": "Elundrian_Chain_Armor",
        "名称": "埃伦德里安链甲Elundrian Chain Armor",
        "防御": "2",
        "特性": "强化Reinforced: 增加你的护甲值，增加的数额取决于你拥有的未标记护甲槽的数量"
    },
    {
        "ID": "Harrowbone_Armor",
        "名称": "掠骸护甲Harrowbone Armor",
        "防御": "5",
        "特性": "抵抗Resistance: 标记 2 个护甲槽，使自己能够抵抗即将到来的伤害，而不是通过护甲值来减少伤害"
    },
    {
        "ID": "Irontree_Breastplate_Armor",
        "名称": "铁木胸甲Irontree Breastplate Armor",
        "防御": "5",
        "特性": "坚固Sturdy: 在标记最后一个护甲槽之前，掷一个 d6。如果掷出6，则可以使用护甲而无需标记槽位"
    },
    {
        "ID": "Runetan_Shield",
        "名称": "符文盾Runetan Shield",
        "防御": "5",
        "特性": "护卫Warden: 每个护甲槽可额外抵御2d4魔法伤害"
    },
    {
        "ID": "Tyris_Soft_Armor",
        "名称": "泰瑞斯软甲Tyris Soft Armor",
        "防御": "5",
        "特性": "安静Quite: 任何试图不被人听到的移动动作掷骰 +2"
    },
];
const weapon_t3_physics = [
    {
        "ID": "Advanced_Battleaxe",
        "名称": "高级战斧Advanced Battleaxe",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+9",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Advanced_Warhammer",
        "名称": "高级战锤Advanced Warhammer",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d12+9",
        "负荷": "双手",
        "特性": "重型Heavy: 敏捷-1"
    },
    {
        "ID": "Advanced_Greatsword",
        "名称": "高级巨剑Advanced Greatsword",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+9",
        "负荷": "双手",
        "特性": "巨型Massive: 敏捷-1，额外骰1个伤害骰并去掉其中最小的一个 "
    },
    {
        "ID": "Advanced_Mace",
        "名称": "高级钉头锤Advanced Mace",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+7",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Advanced_Broadsword",
        "名称": "高级阔剑Advanced Broadsword",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+9",
        "负荷": "单手",
        "特性": "可靠Reliable: 你的攻击掷骰+1"
    },
    {
        "ID": "Advanced_Longsword",
        "名称": "高级长剑Advanced Longsword",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+9",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Advanced_Cutlass",
        "名称": "高级短刀Advanced Cutlass",
        "检定": "风度Presence",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+7",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Advanced_Rapier",
        "名称": "高级刺剑Advanced Rapier",
        "检定": "风度Presence",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+6",
        "负荷": "单手",
        "特性": "迅捷Quick: 标记1个压力以额外攻击一个范围内的目标"
    },
    {
        "ID": "Advanced_Dagger",
        "名称": "高级匕首Advanced Dagger",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+7",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Advanced_Quarterstaff",
        "名称": "高级短棍Advanced Quarterstaff",
        "检定": "本能Instinct",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+9",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Advanced_Halberd",
        "名称": "高级戟Advanced Halberd",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "邻近Very Close",
        "伤害": "d8+9",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Advanced_Spear",
        "名称": "高级长矛Advanced Spear",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "邻近Very Close",
        "伤害": "d8+8",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Advanced_Shortbow",
        "名称": "高级短弓Advanced Shortbow",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "远距离Far",
        "伤害": "d6+9",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Advanced_Crossbow",
        "名称": "高级弩Advanced Crossbow",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "远距离Far",
        "伤害": "d6+7",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Advanced_Longbow",
        "名称": "高级长弓Advanced Longbow",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "极远Very Far",
        "伤害": "d6+9",
        "负荷": "双手",
        "特性": "繁琐Cumbersome: 闪避值-1"
    },
    {
        "ID": "Flickerfly_Blade",
        "名称": "闪蝶之刃Flickerfly Blade",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+5",
        "负荷": "单手",
        "特性": "锐翼Sharpwing: 将你的敏捷属性值添加到该武器的伤害掷骰中"
    },
    {
        "ID": "Bravesword",
        "名称": "勇气之剑Bravesword",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d12+7",
        "负荷": "双手",
        "特性": "密集Dense: 敏捷 -1 ，重伤阈值 +3"
    },
    {
        "ID": "s_Hammer",
        "名称": "地狱之锤Hell’s Hammer",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+7",
        "负荷": "双手",
        "特性": "毁灭Devastating: 在攻击掷骰之前标记压力，在进行伤害掷骰时，把你的伤害骰改为d20"
    },
    {
        "ID": "Labrys_Axe",
        "名称": "拉布里斯斧Labrys Axe",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+7",
        "负荷": "双手",
        "特性": "保护Protectvie"
    },
    {
        "ID": "Meridian_Cutlass",
        "名称": "经络短刀Meridian Cutlass",
        "检定": "风度Presence",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+5",
        "负荷": "单手",
        "特性": "决斗Dueling: 当近距离内除了当前目标外没有其他敌人或盟友时，攻击掷骰时获得优势"
    },
    {
        "ID": "Retractable_Saber",
        "名称": "伸缩军刀Retractable Saber",
        "检定": "风度Presence",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+7",
        "负荷": "单手",
        "特性": "伸缩Retractable: 刀片可以隐藏在刀柄中以避免被识别为武器"
    },
    {
        "ID": "Double_Flail",
        "名称": "双连枷Double Flail",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "邻近Very Close",
        "伤害": "d10+8",
        "负荷": "双手",
        "特性": "强力Powerful: 额外骰1个伤害骰并去掉其中最小的一个 "
    },
    {
        "ID": "Talon_Blades",
        "名称": "利爪之刃Talon Blades",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "近距离Close",
        "伤害": "d10+7",
        "负荷": "双手",
        "特性": "残暴Brutal: 伤害骰每掷出一次最大值，就额外掷出一个伤害骰"
    },
    {
        "ID": "Spiked_Bow",
        "名称": "尖刺弓Spiked Bow",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "极远Very Far",
        "伤害": "d6+7",
        "负荷": "双手",
        "特性": "多用Versatile：敏捷近战d12+5"
    },
];
const weapon_t3_magic = [
    {
        "ID": "Advanced_Hallowed_Axe",
        "名称": "高级圣斧Advanced Hallowed Axe",
        "检定": "力量Strength",
        "属性": "魔法",
        "范围": "近战Melee",
        "伤害": "d10+7",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Advanced_Arcane_Gauntlets",
        "名称": "高级奥术护手Advanced Arcane Gauntlets",
        "检定": "力量Strength",
        "属性": "魔法",
        "范围": "近战Melee",
        "伤害": "d10+9",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Advanced_Hand_Runes",
        "名称": "高级手持符文Advanced Hand Runes",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "邻近Very Close",
        "伤害": "d10+8",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Advanced_Glowing_Rings",
        "名称": "高级发光戒指Advanced Glowing Rings",
        "检定": "敏捷Aglity",
        "属性": "魔法",
        "范围": "邻近Very Close",
        "伤害": "d10+6",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Advanced_Returing_Blade",
        "名称": "高级回力剑Advanced Returing Blade",
        "检定": "灵巧Finesse",
        "属性": "魔法",
        "范围": "近距离Close",
        "伤害": "d8+7",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Shortstaff",
        "名称": "高级短杖Shortstaff",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "近距离Close",
        "伤害": "d8+7",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Advanced_Dualstaff",
        "名称": "高级双手法杖Advanced Dualstaff",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6+9",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Advanced_Scepter",
        "名称": "高级权杖Advanced Scepter",
        "检定": "风度Presence",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6+6",
        "负荷": "双手",
        "特性": "多用Versatile：本能近战d10+4"
    },
    {
        "ID": "Advanced_Wand",
        "名称": "高级魔杖Advanced Wand",
        "检定": "知识Knowledge",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6+7",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Advanced_Greatstaff",
        "名称": "高级巨杖Advanced Greatstaff",
        "检定": "知识Knowledge",
        "属性": "魔法",
        "范围": "极远Very Far",
        "伤害": "d6+6",
        "负荷": "双手",
        "特性": "强力Powerful: 额外骰1个伤害骰并去掉其中最小的一个 "
    },
    {
        "ID": "Axe_of_Fortunis",
        "名称": "运气之斧Axe of Fortunis",
        "检定": "力量Strength",
        "属性": "魔法",
        "范围": "近战Melee",
        "伤害": "d10+8",
        "负荷": "双手",
        "特性": "幸运Lucky: 花费1点压力重骰一次失败的掷骰，并接受新的结果"
    },
    {
        "ID": "Blessed_Anlace",
        "名称": "祝福匕首Blessed Anlace",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "近战Melee",
        "伤害": "d10+6",
        "负荷": "单手",
        "特性": "治愈Healing: 休息时间时，自动恢复1点生命值"
    },
    {
        "ID": "Ghostblade",
        "名称": "鬼魂之刃Ghostblade",
        "检定": "风度Presence",
        "属性": "任意",
        "范围": "近战Melee",
        "伤害": "d10+7",
        "负荷": "单手",
        "特性": "异界Otherworldy: 你可以选择造成物理或者魔法伤害"
    },
    {
        "ID": "Body_Runes",
        "名称": "符文纹身Body Runes",
        "检定": "知识Knowledge",
        "属性": "魔法",
        "范围": "邻近Very Close",
        "伤害": "d20+4",
        "负荷": "单手",
        "特性": "苦痛Painful: 每次你使用此武器攻击时，你需标记1点压力"
    },
    {
        "ID": "Widogast_Pendant",
        "名称": "维多加斯特的吊坠Widogast Pendant",
        "检定": "知识Knowledge",
        "属性": "魔法",
        "范围": "近距离Close",
        "伤害": "d10+5",
        "负荷": "单手",
        "特性": "时间扭曲者Timebender: 你可以在攻击掷骰后选择攻击目标"
    },
    {
        "ID": "Gilded_Bow",
        "名称": "鎏金弓Gilded Bow",
        "检定": "灵巧Finesse",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6+7",
        "负荷": "双手",
        "特性": "自省Self-Correcting: 伤害掷骰中的所有1都视为8"
    },
    {
        "ID": "Firestaff",
        "名称": "火焰杖Firestaff",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6+7",
        "负荷": "双手",
        "特性": "灼烧Burn: 伤害掷骰中骰出的每个6都对目标标记1点压力"
    },
    {
        "ID": "Mage_Orb",
        "名称": "法师球Mage Orb",
        "检定": "知识Knowledge",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6+7",
        "负荷": "单手",
        "特性": "强力Powerful: 额外骰1个伤害骰并去掉其中最小的一个 "
    },
];
const offhand_weapon_t3 = [
    {
        "ID": "Advanced_Round_Shield",
        "名称": "高级圆盾Advanced Round Shield",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d4+4",
        "负荷": "副手",
        "特性": "保护Protective: 护甲值+3"
    },
    {
        "ID": "Advanced_Tower_Shield",
        "名称": "高级塔盾Advanced Tower Shield",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d6+4",
        "负荷": "副手",
        "特性": "壁垒Barrier: 护甲值+5，闪避值-2"
    },
    {
        "ID": "Advanced_Small_Dagger",
        "名称": "高级小匕首Advanced Small Dagger",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+4",
        "负荷": "副手",
        "特性": "双持Paired: 主武器近战伤害+4"
    },
    {
        "ID": "Advanced_Shortsword",
        "名称": "高级短剑Advanced Shortsword",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+4",
        "负荷": "副手",
        "特性": "双持Paired: 主武器近战伤害+4"
    },
    {
        "ID": "Advanced_Whip",
        "名称": "高级鞭子Advanced Whip",
        "检定": "风度Presence",
        "属性": "物理",
        "范围": "邻近Very Close",
        "伤害": "d6+4",
        "负荷": "副手",
        "特性": "鞭笞Whipcrack: 标记1点压力，将所有近战范围内的敌人击退至近距离"
    },
    {
        "ID": "AdvancedGrappler",
        "名称": "高级抓钩AdvancedGrappler",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "近距离Close",
        "伤害": "d6+4",
        "负荷": "副手",
        "特性": "出钩Hook: 进行一次成功的攻击后，你可以将目标拉至你的近战范围内"
    },
    {
        "ID": "AdvancedHand_Crossbow",
        "名称": "高级手弩AdvancedHand Crossbow",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "远距离Far",
        "伤害": "d6+4",
        "负荷": "副手",
        "特性": ""
    },
    {
        "ID": "Buckler",
        "名称": "小盾Buckler",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d4+4",
        "负荷": "副手",
        "特性": "反射Deflecting: 面对即将到来的攻击时，你可以花费1点护甲槽，将你的护甲值数值添加到你的闪避值中"
    },
    {
        "ID": "Powered_Gauntlet",
        "名称": "强力拳套Powered Gauntlet",
        "检定": "知识Knowledge",
        "属性": "魔法",
        "范围": "近距离Close",
        "伤害": "d6+4",
        "负荷": "副手",
        "特性": "充能攻击Charged Attack: 标记1点压力，为主要武器的攻击熟练+1"
    },
];
const armor_t3 = [
    {
        "ID": "Advanced_Gambeson_Armor",
        "名称": "高级填充布甲Advanced Gambeson Armor",
        "防御": "4",
        "特性": "灵活Flexible: 闪避值+1"
    },
    {
        "ID": "Advanced_Leather_Armor",
        "名称": "高级皮甲Advanced Leather Armor",
        "防御": "6",
        "特性": ""
    },
    {
        "ID": "Advanced_Chainmail_Armor",
        "名称": "高级链甲Advanced Chainmail Armor",
        "防御": "8",
        "特性": "厚重Heavy: 闪避值-1"
    },
    {
        "ID": "Advanced_Full_Plate_Armor",
        "名称": "高级全板甲Advanced Full Plate Armor",
        "防御": "10",
        "特性": "极重Very Heavy: 闪避值-2，敏捷-1"
    },
    {
        "ID": "Bellamoi_Fine_Armor",
        "名称": "贝拉莫伊精致护甲Bellamoi Fine Armor",
        "防御": "6",
        "特性": "鎏金Gilded: 当你标记1点护甲槽时，你可以花费任意数量的希望以减少伤害，每点希望降低等同于你熟练值的伤害数值"
    },
    {
        "ID": "Dragonscale_Armor",
        "名称": "龙鳞护甲Dragonscale Armor",
        "防御": "6",
        "特性": "坚不可摧Impenetrable: 当你标记1点护甲槽时，你不会因为物理伤害而失去你最后的生命值"
    },
    {
        "ID": "Spiked_Armor_Plating",
        "名称": "尖刺护甲 Spiked Armor Plating",
        "防御": "6",
        "特性": "锋利Sharp: 每当你成功进行近战攻击时，伤害骰加1d4"
    },
    {
        "ID": "Bladefare_Armor",
        "名称": "剑刃护甲Bladefare Armor",
        "防御": "9",
        "特性": "物理防御Physical: 你不能使用此护甲抵消魔法伤害"
    },
    {
        "ID": "s_Cloak",
        "名称": "莫奈特的斗篷Monett’s Cloak",
        "防御": "9",
        "特性": "魔法防御Magic: 你不能使用此护甲抵消物理伤害"
    },
];
const weapon_t4_physics = [
    {
        "ID": "Legendary_Battleaxe",
        "名称": "传奇战斧Legendary Battleaxe",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+12",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Legendary_Warhammer",
        "名称": "传奇战锤Legendary Warhammer",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d12+12",
        "负荷": "双手",
        "特性": "重型Heavy: 敏捷-1"
    },
    {
        "ID": "Legendary_Greatsword",
        "名称": "传奇巨剑Legendary Greatsword",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+12",
        "负荷": "双手",
        "特性": "巨型Massive: 敏捷-1，额外骰1个伤害骰并去掉其中最小的一个 "
    },
    {
        "ID": "Legendary_Mace",
        "名称": "传奇钉头锤Legendary Mace",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+10",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Legendary_Broadsword",
        "名称": "传奇阔剑Legendary Broadsword",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+12",
        "负荷": "单手",
        "特性": "可靠Reliable: 你的攻击掷骰+1"
    },
    {
        "ID": "Legendary_Longsword",
        "名称": "传奇长剑Legendary Longsword",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+12",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Legendary_Cutlass",
        "名称": "传奇短刀Legendary Cutlass",
        "检定": "风度Presence",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+10",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Legendary_Rapier",
        "名称": "传奇刺剑Legendary Rapier",
        "检定": "风度Presence",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+9",
        "负荷": "单手",
        "特性": "迅捷Quick: 标记1个压力以额外攻击一个范围内的目标"
    },
    {
        "ID": "Legendary_Dagger",
        "名称": "传奇匕首Legendary Dagger",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+10",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Legendary_Quarterstaff",
        "名称": "传奇短棍Legendary Quarterstaff",
        "检定": "本能Instinct",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+12",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Legendary_Halberd",
        "名称": "传奇戟Legendary Halberd",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "邻近Very Close",
        "伤害": "d8+12",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Legendary_Spear",
        "名称": "传奇长矛Legendary Spear",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "邻近Very Close",
        "伤害": "d8+11",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Legendary_Shortbow",
        "名称": "传奇短弓Legendary Shortbow",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "远距离Far",
        "伤害": "d6+12",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Legendary_Crossbow",
        "名称": "传奇弩Legendary Crossbow",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "远距离Far",
        "伤害": "d6+10",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Legendary_Longbow",
        "名称": "传奇长弓Legendary Longbow",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "极远Very Far",
        "伤害": "d6+12",
        "负荷": "双手",
        "特性": "繁琐Cumbersome: 闪避值-1"
    },
    {
        "ID": "Slide_Sword",
        "名称": "双刃剑Double-Slide Sword",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+9",
        "负荷": "双手",
        "特性": "迅捷Quick: 标记1个压力以额外攻击一个范围内的目标"
    },
    {
        "ID": "Impact_Gauntlet",
        "名称": "冲击拳套Impact Gauntlet",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d10+11",
        "负荷": "单手",
        "特性": "震荡Concussive: 在一次成功攻击后花费1点希望，将目标击退至远距离"
    },
    {
        "ID": "Sledge_Axe",
        "名称": "巨斧Sledge Axe",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d12+13",
        "负荷": "双手",
        "特性": "破坏Destructive: 敏捷-1，成功攻击后为所有邻近范围内的敌人标记1点压力"
    },
    {
        "ID": "Curved_Dagger",
        "名称": "弧形匕首Curved Dagger",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+9",
        "负荷": "单手",
        "特性": "锯齿Serrated: 伤害骰中的1皆视为11点伤害"
    },
    {
        "ID": "Extended_Polearm",
        "名称": "延伸长柄武器Extended Polearm",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "邻近Very Close",
        "伤害": "d8+10",
        "负荷": "双手",
        "特性": "延长Long: 你能够将范围内所有处于一条直线上的敌人同时作为你的攻击目标"
    },
    {
        "ID": "Swinging_Ropeblade",
        "名称": "摆动绳刃Swinging Ropeblade",
        "检定": "风度Presence",
        "属性": "物理",
        "范围": "近距离Close",
        "伤害": "d8+9",
        "负荷": "双手",
        "特性": "捕获Grapping: 在一次成功攻击后花费1点希望，使目标陷入束缚状态或者将其拉至你的近战范围"
    },
    {
        "ID": "Ricochet_Axes",
        "名称": "弹跳斧Ricochet Axes",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "远距离Far",
        "伤害": "d6+11",
        "负荷": "双手",
        "特性": "弹跳Bouncing: 标记任意点压力，可同时攻击范围内等量的敌人"
    },
    {
        "ID": "Aantari_Bow",
        "名称": "安塔利弓Aantari Bow",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "远距离Far",
        "伤害": "d6+11",
        "负荷": "双手",
        "特性": "可靠Reliable: 你的攻击掷骰+1"
    },
];
const weapon_t4_magic = [
    {
        "ID": "Legendary_Hallowed_Axe",
        "名称": "传奇圣斧Legendary Hallowed Axe",
        "检定": "力量Strength",
        "属性": "魔法",
        "范围": "近战Melee",
        "伤害": "d10+10",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Legendary_Arcane_Gauntlets",
        "名称": "传奇奥术护手Legendary Arcane Gauntlets",
        "检定": "力量Strength",
        "属性": "魔法",
        "范围": "近战Melee",
        "伤害": "d10+12",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Legendary_Hand_Runes",
        "名称": "传奇手持符文Legendary Hand Runes",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "邻近Very Close",
        "伤害": "d10+11",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Legendary_Glowing_Rings",
        "名称": "传奇发光戒指Legendary Glowing Rings",
        "检定": "敏捷Aglity",
        "属性": "魔法",
        "范围": "邻近Very Close",
        "伤害": "d10+9",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Legendary_Returing_Blade",
        "名称": "传奇回力剑Legendary Returing Blade",
        "检定": "灵巧Finesse",
        "属性": "魔法",
        "范围": "近距离Close",
        "伤害": "d8+10",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Shortstaff",
        "名称": "传奇短杖Shortstaff",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "近距离Close",
        "伤害": "d8+10",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Legendary_Dualstaff",
        "名称": "传奇双手法杖Legendary Dualstaff",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d8+12",
        "负荷": "双手",
        "特性": ""
    },
    {
        "ID": "Legendary_Scepter",
        "名称": "传奇权杖Legendary Scepter",
        "检定": "风度Presence",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6+9",
        "负荷": "双手",
        "特性": "多用Versatile：本能近战d10+6"
    },
    {
        "ID": "Legendary_Wand",
        "名称": "传奇魔杖Legendary Wand",
        "检定": "知识Knowledge",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6+10",
        "负荷": "单手",
        "特性": ""
    },
    {
        "ID": "Legendary_Greatstaff",
        "名称": "传奇巨杖Legendary Greatstaff",
        "检定": "知识Knowledge",
        "属性": "魔法",
        "范围": "极远Very Far",
        "伤害": "d6+9",
        "负荷": "双手",
        "特性": "强力Powerful: 额外骰1个伤害骰并去掉其中最小的一个 "
    },
    {
        "ID": "Sword_of_Light&Flame",
        "名称": "光焰剑Sword of Light&Flame",
        "检定": "力量Strength",
        "属性": "魔法",
        "范围": "近战Melee",
        "伤害": "d10+11",
        "负荷": "双手",
        "特性": "穿透Penetrating: 可以切开坚固的材质"
    },
    {
        "ID": "Siphoning_Gauntlets",
        "名称": "虹吸拳套Siphoning Gauntlets",
        "检定": "风度Presence",
        "属性": "魔法",
        "范围": "近战Melee",
        "伤害": "d10+9",
        "负荷": "双手",
        "特性": "系命Lifestealing: 在一次成功攻击后骰1d6，如果骰出6则恢复1点生命或清除1点压力"
    },
    {
        "ID": "Midas_Scythe",
        "名称": "迈达斯镰刀Midas Scythe",
        "检定": "知识Knowledge",
        "属性": "魔法",
        "范围": "近战Melee",
        "伤害": "d10+9",
        "负荷": "双手",
        "特性": "贪婪Greedy: 你可以花费一把金币，使你的伤害掷骰熟练+1"
    },
    {
        "ID": "Floating_Bladeshards",
        "名称": "漂浮碎刃Floating Bladeshards",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "近距离Close",
        "伤害": "d8+9",
        "负荷": "单手",
        "特性": "强力Powerful: 额外骰1个伤害骰并去掉其中最小的一个 "
    },
    {
        "ID": "Bloodstaff",
        "名称": "血杖Bloodstaff",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d20+7",
        "负荷": "双手",
        "特性": "苦痛Painful: 每次你使用此武器攻击时，你需标记1点压力"
    },
    {
        "ID": "Thistlebow",
        "名称": "蓟弓Thistlebow",
        "检定": "本能Instinct",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d6+13",
        "负荷": "双手",
        "特性": "可靠Reliable: 你的攻击掷骰+1"
    },
    {
        "ID": "Wand_of_Essek",
        "名称": "埃塞克之杖Wand of Essek",
        "检定": "知识Knowledge",
        "属性": "魔法",
        "范围": "远距离Far",
        "伤害": "d8+13",
        "负荷": "单手",
        "特性": "时间扭曲者Timebender: 你可以在攻击掷骰后选择攻击目标"
    },
    {
        "ID": "Magus_Revolver",
        "名称": "魔战士左轮Magus Revolver",
        "检定": "灵巧Finesse",
        "属性": "魔法",
        "范围": "极远Very Far",
        "伤害": "d6+13",
        "负荷": "单手",
        "特性": "装填Reloading: 攻击后骰1d6，如果骰出1，下次攻击前你必须使用一个动作进行装填"
    },
];
const offhand_weapon_t4 = [
    {
        "ID": "Legendary_Round_Shield",
        "名称": "传奇圆盾Legendary Round Shield",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d4+6",
        "负荷": "副手",
        "特性": "保护Protective: 护甲值+4"
    },
    {
        "ID": "Legendary_Tower_Shield",
        "名称": "传奇塔盾Legendary Tower Shield",
        "检定": "力量Strength",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d6+6",
        "负荷": "副手",
        "特性": "壁垒Barrier: 护甲值+6，闪避值-2"
    },
    {
        "ID": "Legendary_Small_Dagger",
        "名称": "传奇小匕首Legendary Small Dagger",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+6",
        "负荷": "副手",
        "特性": "双持Paired: 主武器近战伤害+5"
    },
    {
        "ID": "Legendary_Shortsword",
        "名称": "传奇短剑Legendary Shortsword",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d8+6",
        "负荷": "副手",
        "特性": "双持Paired: 主武器近战伤害+5"
    },
    {
        "ID": "Legendary_Whip",
        "名称": "传奇鞭子Legendary Whip",
        "检定": "风度Presence",
        "属性": "物理",
        "范围": "邻近Very Close",
        "伤害": "d6+6",
        "负荷": "副手",
        "特性": "鞭笞Whipcrack: 标记1点压力，将所有近战范围内的敌人击退至近距离"
    },
    {
        "ID": "Legendary_Grappler",
        "名称": "传奇抓钩Legendary Grappler",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "近距离Close",
        "伤害": "d6+6",
        "负荷": "副手",
        "特性": "出钩Hook: 进行一次成功的攻击后，你可以将目标拉至你的近战范围内"
    },
    {
        "ID": "Legendary_Hand_Crossbow",
        "名称": "传奇手弩Legendary Hand Crossbow",
        "检定": "灵巧Finesse",
        "属性": "物理",
        "范围": "远距离Far",
        "伤害": "d6+7",
        "负荷": "副手",
        "特性": ""
    },
    {
        "ID": "Braveshield",
        "名称": "勇气之盾Braveshield",
        "检定": "敏捷Aglity",
        "属性": "物理",
        "范围": "近战Melee",
        "伤害": "d4+6",
        "负荷": "副手",
        "特性": "庇护Sheltering: 你可以使用1个护甲槽以减少你以及你近战范围内的所有盟友的伤害"
    },
    {
        "ID": "Kunckle_Claws",
        "名称": "拳爪Kunckle Claws",
        "检定": "力量Strength",
        "属性": "魔法",
        "范围": "近战Melee",
        "伤害": "d6+6",
        "负荷": "副手",
        "特性": "双击Double Up: 当你使用主要武器进行一次攻击后，你可以同时使用此武器对另一名近战范围内的敌人造成伤害"
    },
];
const armor_t4 = [
    {
        "ID": "Legendary_Gambeson_Armor",
        "名称": "传奇填充布甲Legendary Gambeson Armor",
        "防御": "6",
        "特性": "灵活Flexible: 闪避值+1"
    },
    {
        "ID": "Legendary_Leather_Armor",
        "名称": "传奇皮甲Legendary Leather Armor",
        "防御": "8",
        "特性": ""
    },
    {
        "ID": "Legendary_Chainmail_Armor",
        "名称": "传奇链甲Legendary Chainmail Armor",
        "防御": "10",
        "特性": "厚重Heavy: 闪避值-1"
    },
    {
        "ID": "Legendary_Full_Plate_Armor",
        "名称": "传奇全板甲Legendary Full Plate Armor",
        "防御": "12",
        "特性": "极重Very Heavy: 闪避值-2，敏捷-1"
    },
    {
        "ID": "Dunamis_Silkchain",
        "名称": "威能丝甲Dunamis Silkchain",
        "防御": "5",
        "特性": "时缓Timeslowing: 面对即将到来的攻击时，骰1d4，将其加入到你的闪避值中"
    },
    {
        "ID": "Channeling_Armor",
        "名称": "引导护甲Channeling Armor",
        "防御": "7",
        "特性": "引导Channeling: 当装备此护甲时，所有施法掷骰+1"
    },
    {
        "ID": "Emberwoven_Armor",
        "名称": "织烬护甲Emberwoven Armor",
        "防御": "8",
        "特性": "燃烧Buring: 每当有敌人在近战范围内集中你时，他们立即标记1点压力"
    },
    {
        "ID": "Full_Reinforced_Armor",
        "名称": "全面强化护甲Full Reinforced Armor",
        "防御": "8",
        "特性": "可变Variable: 对于近战范围外发起的攻击，每个范围等级使你的护甲值+1. 邻近+1，近距离+2，远距离+3，极远+4"
    },
    {
        "ID": "Veritas_Opal_Armor",
        "名称": "诚实蛋白石护甲Veritas Opal Armor",
        "防御": "8",
        "特性": "求真Truthseeking: 当任何人在近距离范围内说谎时，此护甲将会发光"
    },
]
