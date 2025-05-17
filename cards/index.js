// Use global window object for browser environment
const DOMAINS_CARDS = {
    "奥术": window.奥术_CARDS,
    "利刃": window.利刃_CARDS,
    "骸骨": window.骸骨_CARDS,
    "典籍": window.典籍_CARDS,
    "优雅": window.优雅_CARDS,
    "午夜": window.午夜_CARDS,
    "贤者": window.贤者_CARDS,
    "辉耀": window.辉耀_CARDS,
    "勇气": window.勇气_CARDS
};

const CARD_TYPES = {
    CLASS: 'class',
    SUBCLASS: 'subclass',
    RACE: 'race',
    DOMAIN: 'domain',
    COMMUNITY: 'community'
};

// 获取卡牌列表
const getCardsByType = (type) => {
    switch (type) {
        case CARD_TYPES.CLASS:
            return window.classes;
        case CARD_TYPES.SUBCLASS:
            return window.subClasses;
        case CARD_TYPES.RACE:
            return window.races;
        case CARD_TYPES.COMMUNITY:
            return window.communities;
        default:
            return [];
    }
};

// 获取领域卡牌
const getDomainCards = (domainName) => {
    return DOMAINS_CARDS[domainName] || [];
};

// 确保加载器已经初始化
if (!window.loadAllCards()) {
    console.error('Failed to initialize card loader');
}

// 通用获取卡图方法
window.getCardImage = (card) => {
    if (!card || !card.卡图) return null;
    return card.卡图;
};

// 根据名称和类型查找卡牌
window.findCardByName = (name, type) => {
    switch (type) {
        case window.CARD_TYPES.CLASS:
            return window.CLASS_INDEX[name];
        case window.CARD_TYPES.SUBCLASS:
            return window.subClasses.find(c => c.名称 === name);
        case window.CARD_TYPES.RACE:
            return window.RACE_INDEX[name];
        case window.CARD_TYPES.COMMUNITY:
            return window.COMMUNITY_INDEX[name];
        case window.CARD_TYPES.DOMAIN:
            for (const domain of Object.values(window.DOMAINS_CARDS)) {
                const card = domain.find(c => c.名称 === name);
                if (card) return card;
            }
            return null;
        default:
            return null;
    }
};
