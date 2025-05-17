const races = require('./races');

// Use window object for browser environment
window.RACE_INDEX = {};
window.races.forEach(card => {
    window.RACE_INDEX[card.名称] = card;
});

// 按种族类型分组索引
window.RACE_TYPE_INDEX = {};
window.races.forEach(card => {
    if (!window.RACE_TYPE_INDEX[card.种族]) {
        window.RACE_TYPE_INDEX[card.种族] = [];
    }
    window.RACE_TYPE_INDEX[card.种族].push(card);
});

// 工具方法
window.getRaceById = (id) => window.races.find(card => card.id === id);
window.getRaceByName = (name) => window.RACE_INDEX[name];
window.getRacesByType = (type) => window.RACE_TYPE_INDEX[type] || [];
