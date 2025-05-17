const RACES_CARD = require('./races');

// 按种族分类索引
const RACE_CARD_INDEX = {};
RACES_CARD.forEach(card => {
    if (!RACE_CARD_INDEX[card.种族]) {
        RACE_CARD_INDEX[card.种族] = [];
    }
    RACE_CARD_INDEX[card.种族].push(card);
});

// 工具方法
const getRaceById = (id) => RACES_CARD.find(card => card.id === id);
const getRacesByDomain = (domain) => RACE_CARD_INDEX[domain] || [];

module.exports = {
    RACES_CARD,
    RACE_CARD_INDEX,
    getRaceById,
    getRacesByDomain
};
