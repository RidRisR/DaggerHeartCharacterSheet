// 在实际赋值前检查每个领域的卡牌数据
console.log('Checking domain card data availability:');
[
    '奥术_CARDS', '利刃_CARDS', '骸骨_CARDS', '典籍_CARDS',
    '优雅_CARDS', '午夜_CARDS', '贤者_CARDS', '辉耀_CARDS', '勇气_CARDS'
].forEach(cardName => {
    console.log(`${cardName}: `, window[cardName]?.length || 0, ' cards');
});

window.DOMAINS_CARDS = {
    "奥术": window.奥术_CARDS,
    "利刃": window.利刃_CARDS,
    "骸骨": window.骸骨_CARDS,
    "典籍": window.典籍_CARDS,
    "优雅": window.优雅_CARDS,
    "午夜": window.午夜_CARDS,
    "贤者": window.贤者_CARDS,
    "辉耀": window.辉耀_CARDS,
    "勇气": window.勇气_CARDS
};

// 检查 DOMAINS_CARDS 是否正确初始化
console.log('DOMAINS_CARDS initialized:',
    Object.entries(window.DOMAINS_CARDS).map(([k, v]) => `${k}: ${v?.length || 0} cards`));