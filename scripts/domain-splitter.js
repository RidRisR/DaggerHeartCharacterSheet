const fs = require('fs');
const path = require('path');

// 导入原始数据
const originalFile = path.join(__dirname, '../data/all_card.js');
const outputDir = path.join(__dirname, '../data/domains');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 读取utils.js文件内容并提取removeEnglishText函数
const utilsContent = fs.readFileSync(path.join(__dirname, '../js/util.js'), 'utf8');
const removeEnglishTextFn = utilsContent.match(/function removeEnglishText[^}]+}/)[0];
eval(removeEnglishTextFn);

// 读取并解析原始文件
const fileContent = fs.readFileSync(originalFile, 'utf8');
const cardsMatch = fileContent.match(/const DOMAIN_CARDS = (\[[\s\S]*\])/);
const DOMAIN_CARDS = eval(cardsMatch[1]);

// 获取所有领域
const domains = [...new Set(DOMAIN_CARDS.map(card => card.领域))];

// 处理卡牌数据，添加卡图字段
const processedCards = DOMAIN_CARDS.map(card => ({
    ...card,
    "卡图": `resource/领域/${card.领域}/${card.等级}${removeEnglishText(card.名称)}.png`
}));

// 按领域分组卡牌
const domainGroups = {};
domains.forEach(domain => {
    domainGroups[domain] = processedCards.filter(card => card.领域 === domain);
});

// 为每个领域创建文件
domains.forEach(domain => {
    const fileName = `${domain.toLowerCase()}_cards.js`;
    const filePath = path.join(outputDir, fileName);

    const content = `// 自动生成的领域卡牌文件
const ${domain.toUpperCase()}_CARDS = ${JSON.stringify(domainGroups[domain], null, 2)};

module.exports = {
    ${domain.toUpperCase()}_CARDS
};`;

    fs.writeFileSync(filePath, content, 'utf8');
});

// 创建index.js导出所有领域
const indexContent = `// 自动生成的领域卡牌索引文件
${domains.map(domain => `const { ${domain.toUpperCase()}_CARDS } = require('./${domain.toLowerCase()}_cards');`).join('\n')}

module.exports = {
    ${domains.map(domain => `${domain.toUpperCase()}_CARDS`).join(',\n    ')}
};`;

fs.writeFileSync(path.join(outputDir, 'index.js'), indexContent, 'utf8');

console.log('处理完成！创建了以下领域文件：');
domains.forEach(domain => {
    console.log(`- ${domain.toLowerCase()}_cards.js`);
});
console.log('并创建了 index.js 用于统一导出');