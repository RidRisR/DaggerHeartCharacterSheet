class CardBrowserManager {
    constructor() {
        this.domains = ['奥术', '利刃', '骸骨', '典籍', '优雅', '午夜', '贤者', '辉耀', '勇气'];
        this.cards = {};
        this.loadCards(window.CARD_TYPES);

        console.log('CardBrowserManager initialized');
        console.log('Available DOMAINS_CARDS:', window.DOMAINS_CARDS);
    }

    loadCards(cardTypes) {
        // Load domain cards
        this.domains.forEach(domain => {
            this.cards[domain] = window.DOMAINS_CARDS[domain] || [];
            console.log(`Loaded ${domain} cards:`, this.cards[domain]?.length || 0);
        });

        // Load other card types
        this.cards.class = window.getCardsByType(cardTypes.CLASS);
        this.cards.subclass = window.getCardsByType(cardTypes.SUBCLASS);
        this.cards.race = window.getCardsByType(cardTypes.RACE);
        this.cards.community = window.getCardsByType(cardTypes.COMMUNITY);

        console.log('All loaded cards:', this.cards);
    }

    getDomainCards(domain) {
        console.log(`Getting cards for domain: ${domain}`);
        if (domain === 'all') {
            // 只合并包含等级属性的卡牌
            const allCards = [];
            Object.values(this.cards).forEach(cardSet => {
                if (Array.isArray(cardSet)) {
                    cardSet.forEach(card => {
                        if (card.等级 !== undefined) {
                            allCards.push(card);
                        }
                    });
                }
            });
            console.log(`Found ${allCards.length} cards`);
            return allCards;
        }
        const result = this.cards[domain] || [];
        console.log(`Found ${result.length} cards`);
        return result;
    }

    filterCardsByLevel(cards, level) {
        if (!level) return cards;
        return cards.filter(card => card.等级 !== undefined && card.等级 == level);
    }

    filterCardsByName(cards, name) {
        return name ? cards.filter(card => card.名称.includes(name)) : cards;
    }

    getAvailableLevels(domain) {
        const cards = this.getDomainCards(domain);
        const levels = new Set(
            cards
                .filter(card => card.等级 !== undefined)
                .map(card => card.等级)
        );
        return Array.from(levels).sort((a, b) => a - b);
    }
}

window.CardBrowserManager = CardBrowserManager;
