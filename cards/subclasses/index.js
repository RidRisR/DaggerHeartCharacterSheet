const subClasses = require('./subclsses');

// 按主职业和子职业分类索引
const SUBCLASS_INDEX = {};
subClasses.forEach(card => {
    if (!SUBCLASS_INDEX[card.主职业]) {
        SUBCLASS_INDEX[card.主职业] = {};
    }
    if (!SUBCLASS_INDEX[card.主职业][card.子职业]) {
        SUBCLASS_INDEX[card.主职业][card.子职业] = [];
    }
    SUBCLASS_INDEX[card.主职业][card.子职业].push(card);
});

// 工具方法
const getSubClassById = (id) => subClasses.find(card => card.id === id);
const getSubClassesByMainClass = (mainClass) => SUBCLASS_INDEX[mainClass] || {};
const getSubClassCards = (mainClass, subClass) =>
    SUBCLASS_INDEX[mainClass]?.[subClass] || [];

module.exports = {
    subClasses,
    SUBCLASS_INDEX,
    getSubClassById,
    getSubClassesByMainClass,
    getSubClassCards
};
