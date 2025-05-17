const races = require('./races');

// 按种族分类索引
const RACE_INDEX = {};
races.forEach(card => {
    RACE_INDEX[card.名称] = card;
});

// 按种族类型分组索引
const RACE_TYPE_INDEX = {};
races.forEach(card => {
    if (!RACE_TYPE_INDEX[card.种族]) {
        RACE_TYPE_INDEX[card.种族] = [];
    }
    RACE_TYPE_INDEX[card.种族].push(card);
});

// 工具方法
const getRaceById = (id) => races.find(card => card.id === id);
const getRaceByName = (name) => RACE_INDEX[name];
const getRacesByType = (type) => RACE_TYPE_INDEX[type] || [];

module.exports = {
    races,
    RACE_INDEX,
    RACE_TYPE_INDEX,
    getRaceById,
    getRaceByName,
    getRacesByType
};
