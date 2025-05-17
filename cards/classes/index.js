const classes = require('./class_cards');

// 按职业分类索引
const CLASS_INDEX = {};
classes.forEach(classData => {
    CLASS_INDEX[classData.名称] = classData;
});

// 工具方法
const getClassById = (id) => classes.find(c => c.id === id);
const getClassByName = (name) => CLASS_INDEX[name];
const getClassesByDomain = (domain) => {
    const domainName = domain.split(' ')[0]; // 只匹配中文名
    return classes.filter(c =>
        c.领域.some(d => d.startsWith(domainName))
    );
};

module.exports = {
    classes,
    CLASS_INDEX,
    getClassById,
    getClassByName,
    getClassesByDomain
};
