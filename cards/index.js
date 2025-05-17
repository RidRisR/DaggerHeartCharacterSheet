const { classes, CLASS_INDEX } = require('./classes');
const { subClasses, SUBCLASS_INDEX } = require('./subclasses');
const { races, RACE_INDEX } = require('./races');
const { communities, COMMUNITY_INDEX } = require('./communities');
const {
    奥术_CARDS, 利刃_CARDS, 骸骨_CARDS, 典籍_CARDS,
    优雅_CARDS, 午夜_CARDS, 贤者_CARDS, 辉耀_CARDS,
    勇气_CARDS
} = require('./domains');

// 合并所有领域卡牌
const DOMAIN_CARDS = {
    "奥术": 奥术_CARDS,
    "利刃": 利刃_CARDS,
    "骸骨": 骸骨_CARDS,
    "典籍": 典籍_CARDS,
    "优雅": 优雅_CARDS,
    "午夜": 午夜_CARDS,
    "贤者": 贤者_CARDS,
    "辉耀": 辉耀_CARDS,
    "勇气": 勇气_CARDS
};

// 卡牌类型枚举
const CARD_TYPES = {
    CLASS: 'class',
    SUBCLASS: 'subclass',
    RACE: 'race',
    DOMAIN: 'domain',
    COMMUNITY: 'community'  // 新增社群类型
};

// 获取卡牌列表
const getCardsByType = (type) => {
    switch (type) {
        case CARD_TYPES.CLASS:
            return classes;
        case CARD_TYPES.SUBCLASS:
            return subClasses;
        case CARD_TYPES.RACE:
            return races;
        case CARD_TYPES.COMMUNITY:
            return communities;
        default:
            return [];
    }
};

// 获取领域卡牌
const getDomainCards = (domainName) => {
    return DOMAIN_CARDS[domainName] || [];
};

// 通用获取卡图方法
const getCardImage = (card) => {
    if (!card || !card.卡图) return null;
    return card.卡图;
};

// 根据名称和类型查找卡牌
const findCardByName = (name, type) => {
    switch (type) {
        case CARD_TYPES.CLASS:
            return CLASS_INDEX[name];
        case CARD_TYPES.SUBCLASS:
            return subClasses.find(c => c.名称 === name);
        case CARD_TYPES.RACE:
            return RACE_INDEX[name];
        case CARD_TYPES.COMMUNITY:
            return COMMUNITY_INDEX[name];
        case CARD_TYPES.DOMAIN:
            for (const domain of Object.values(DOMAIN_CARDS)) {
                const card = domain.find(c => c.名称 === name);
                if (card) return card;
            }
            return null;
        default:
            return null;
    }
};

module.exports = {
    CARD_TYPES,
    getCardsByType,
    getDomainCards,
    getCardImage,
    findCardByName,
};
