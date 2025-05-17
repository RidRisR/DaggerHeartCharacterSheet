const { CARD_TYPES, CARD_ATTRIBUTES } = require('../constants/cardTypes');
const { DOMAIN_CARDS } = require('./domains');
const { RACE_CARDS, RACE_CARD_INDEX } = require('./races');
const { CLASS_DATA, CLASS_INDEX } = require('./classes');

// 统一导出
module.exports = {
    CARD_TYPES,
    CARD_ATTRIBUTES,
    DOMAIN_CARDS,
    RACE_CARDS,
    RACE_CARD_INDEX,
    CLASS_DATA,
    CLASS_INDEX,

    // 工具方法
    getCardsByType(type) {
        switch (type) {
            case CARD_TYPES.DOMAIN: return DOMAIN_CARDS;
            case CARD_TYPES.RACE: return RACE_CARDS;
            case CARD_TYPES.CLASS: return CLASS_DATA;
            default: return [];
        }
    },

    getCardsByAttribute(attr) {
        return [...Object.values(DOMAIN_CARDS), ...RACE_CARDS, ...CLASS_DATA]
            .filter(card => card.属性 === attr);
    }
};
