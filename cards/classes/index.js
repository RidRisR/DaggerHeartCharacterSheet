// Use window object for browser environment
window.CLASS_INDEX = {};
window.classes.forEach(classData => {
    window.CLASS_INDEX[classData.名称] = classData;
});

// 工具方法
window.getClassById = (id) => window.classes.find(c => c.id === id);
window.getClassByName = (name) => window.CLASS_INDEX[name];
window.getClassesByDomain = (domain) => {
    const domainName = domain.split(' ')[0];
    return window.classes.filter(c =>
        c.领域.some(d => d.startsWith(domainName))
    );
};
