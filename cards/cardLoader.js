// 定义所有需要加载的卡牌文件
const CARD_FILES = {
    // 领域卡牌
    domains: ['奥术', '利刃', '骸骨', '典籍', '优雅', '午夜', '贤者', '辉耀', '勇气'],
    // 其他类型卡牌
    types: ['classes', 'subclasses', 'races', 'communities']
};

// 加载所有卡牌数据
function loadAllCards() {
    console.log('Loading all card data...');

    // 加载领域卡牌
    window.DOMAINS_CARDS = {};
    CARD_FILES.domains.forEach(domain => {
        const cards = window[`${domain}_CARDS`];
        if (cards) {
            window.DOMAINS_CARDS[domain] = cards;
            console.log(`Loaded ${domain} cards:`, cards.length);
        } else {
            console.warn(`Failed to load ${domain} cards`);
        }
    });

    // 初始化工具方法
    window.CARD_TYPES = {
        CLASS: 'class',
        SUBCLASS: 'subclass',
        RACE: 'race',
        DOMAIN: 'domain',
        COMMUNITY: 'community'
    };

    // 暴露工具方法到全局
    window.getCardsByType = (type) => {
        switch (type) {
            case window.CARD_TYPES.CLASS:
                return window.classes;
            case window.CARD_TYPES.SUBCLASS:
                return window.subClasses;
            case window.CARD_TYPES.RACE:
                return window.races;
            case window.CARD_TYPES.COMMUNITY:
                return window.communities;
            default:
                return [];
        }
    };

    console.log('Card loading complete');
    return true;
}

// 导出到全局
window.loadAllCards = loadAllCards;
