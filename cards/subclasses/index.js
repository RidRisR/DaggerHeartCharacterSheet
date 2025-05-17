const subClasses = require('./subclsses');

// Use window object for browser environment
window.SUBCLASS_INDEX = {};
window.subClasses = subClasses;
window.subClasses.forEach(card => {
    if (!window.SUBCLASS_INDEX[card.主职业]) {
        window.SUBCLASS_INDEX[card.主职业] = {};
    }
    if (!window.SUBCLASS_INDEX[card.主职业][card.子职业]) {
        window.SUBCLASS_INDEX[card.主职业][card.子职业] = [];
    }
    window.SUBCLASS_INDEX[card.主职业][card.子职业].push(card);
});

// 工具方法
window.getSubClassById = (id) => window.subClasses.find(card => card.id === id);
window.getSubClassesByMainClass = (mainClass) => window.SUBCLASS_INDEX[mainClass] || {};
window.getSubClassCards = (mainClass, subClass) =>
    window.SUBCLASS_INDEX[mainClass]?.[subClass] || [];

module.exports = {
    subClasses,
    SUBCLASS_INDEX: window.SUBCLASS_INDEX,
    getSubClassById: window.getSubClassById,
    getSubClassesByMainClass: window.getSubClassesByMainClass,
    getSubClassCards: window.getSubClassCards
};
