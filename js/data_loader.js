class CardDataLoader {
    static loadAllCards() {
        return {
            class: window.classes || [],
            subclass: window.subClasses || [],
            domain: this.loadDomainCards(),
            race: window.races || [],
            community: window.communities || []
        };
    }

    static loadDomainCards() {
        const domainCards = [];
        const domains = {
            '奥术': window.奥术_CARDS,
            '利刃': window.利刃_CARDS,
            '骸骨': window.骸骨_CARDS,
            '典籍': window.典籍_CARDS,
            '优雅': window.优雅_CARDS,
            '午夜': window.午夜_CARDS,
            '贤者': window.贤者_CARDS,
            '辉耀': window.辉耀_CARDS,
            '勇气': window.勇气_CARDS
        };

        Object.values(domains).forEach(cards => {
            if (Array.isArray(cards)) {
                domainCards.push(...cards);
            }
        });

        return domainCards;
    }
}

window.CardDataLoader = CardDataLoader;
