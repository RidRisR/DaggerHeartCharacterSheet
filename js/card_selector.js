class CardSelector {
    static STYLES = `
        .card-selector-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s, opacity 0.2s;
            pointer-events: none;
        }

        .card-selector-overlay.active {
            visibility: visible;
            opacity: 1;
            pointer-events: all;
        }

        .card-selector {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 8px;
            width: min(1400px, 95vw);  /* 增加最大宽度 */
            height: min(800px, 90vh);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            display: grid;
            grid-template-rows: auto auto 1fr;
            gap: 10px;
        }

        .card-selector h3 {
            margin: 0 0 15px 0;
            padding-right: 30px;
        }

        .card-list-container {
            overflow-y: auto;
            border: 1px solid #eee;
            border-radius: 4px;
            position: relative;
        }

        .card-list-item {
            display: grid;
            grid-template-columns: 250px 120px 80px 100px 80px minmax(400px, 1fr); /* 调整列宽 */
            gap: 10px;
            padding: 8px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
            align-items: center;
        }

        .card-list-item > div {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            position: relative;
        }

        .card-list-item > div:hover::after {
            content: attr(title);
            position: absolute;
            left: 0;
            top: 100%;
            background: #333;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            z-index: 10000;
            white-space: pre-wrap;
            width: max-content;
            max-width: 9000px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            line-height: 1.4;
        }

        .card-list-item:hover {
            background: #f0f0f0;
        }

        .close-button {
            position: absolute;
            top: 15px;
            right: 15px;
            padding: 5px 10px;
            cursor: pointer;
            border: none;
            background: none;
            font-size: 20px;
        }

        .card-header {
            display: grid;
            grid-template-columns: 250px 120px 80px 100px 80px minmax(400px, 1fr); /* 调整列宽，与列表项保持一致 */
            gap: 10px;
            padding: 8px;
            font-weight: bold;
            border-bottom: 2px solid #ccc;
        }
    `;

    static TEMPLATE = `
        <div class="card-selector">
            <button class="close-button">×</button>
            <h3>选择卡牌</h3>
            <div class="card-header">
                <div>名称</div>
                <div>领域</div>
                <div>等级</div>
                <div>属性</div>
                <div>回想</div>
                <div>描述</div>
            </div>
            <div id="cardListContainer" class="card-list-container"></div>
        </div>
    `;

    static init() {
        if (this.initialized) return;

        // 确保卡牌数据已初始化
        if (typeof initGlobalCards === 'function') {
            initGlobalCards();
        }

        const overlayDiv = document.createElement('div');
        overlayDiv.className = 'card-selector-overlay';
        overlayDiv.innerHTML = this.TEMPLATE;
        document.body.appendChild(overlayDiv);

        const styleSheet = document.createElement('style');
        styleSheet.textContent = this.STYLES;
        document.head.appendChild(styleSheet);

        this.initEvents();
        this.initialized = true;
    }

    static displayCards() {
        const allCards = [
            ...(window.DOMAIN_CARDS || []),
            ...(window.RACES_CARD || [])
        ];

        if (allCards.length === 0) {
            console.error('找不到卡牌数据，请确保 all_card.js 已正确加载');
            return;
        }

        const container = document.getElementById('cardListContainer');
        if (!container) return;

        // 使用特定ID检查筛选器是否已存在
        if (!document.getElementById('cardTypeFilterContainer')) {
            const filterDiv = document.createElement('div');
            filterDiv.id = 'cardTypeFilterContainer';
            filterDiv.className = 'card-filter';
            filterDiv.innerHTML = `
                <select id="cardTypeFilter">
                    <option value="all">所有类型</option>
                    <option value="法术">法术卡</option>
                    <option value="种族">种族卡</option>
                </select>
            `;
            container.parentElement.insertBefore(filterDiv, container);

            // 添加筛选事件
            document.getElementById('cardTypeFilter').addEventListener('change', (e) => {
                this.filterCards(e.target.value);
            });
        }

        this.allCards = allCards;
        this.filterCards('all');
    }

    static filterCards(type) {
        const container = document.getElementById('cardListContainer');
        container.innerHTML = '';

        const filteredCards = type === 'all'
            ? this.allCards
            : this.allCards.filter(card => card.属性 === type);

        filteredCards.forEach(card => {
            const div = document.createElement('div');
            div.className = 'card-list-item';
            div.innerHTML = `
                <div title="${removeEnglishText(card.名称)}">${removeEnglishText(card.名称)}</div>
                <div title="${card.领域}">${card.领域}</div>
                <div title="${card.等级}">${card.等级}</div>
                <div title="${card.属性}">${card.属性}</div>
                <div title="${card.回想}">${card.回想}</div>
                <div title="${card.描述}">${card.描述}</div>
            `;
            div.dataset.cardData = JSON.stringify(card);
            container.appendChild(div);
        });
    }

    static show() {
        const overlay = document.querySelector('.card-selector-overlay');
        if (overlay) {
            overlay.classList.add('active');
            this.displayCards();
        }
    }

    static hide() {
        const overlay = document.querySelector('.card-selector-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    static initEvents() {
        const overlay = document.querySelector('.card-selector-overlay');
        const closeButton = overlay.querySelector('.close-button');
        const cardList = document.getElementById('cardListContainer');

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.hide();
            }
        });

        closeButton.addEventListener('click', () => {
            this.hide();
        });

        // Improve card selection handling
        cardList.addEventListener('click', (e) => {
            const cardItem = e.target.closest('.card-list-item');
            if (!cardItem) return;

            console.log('Card clicked:', cardItem);

            try {
                const cardData = cardItem.dataset.cardData;
                console.log('Card data:', cardData);

                const card = JSON.parse(cardData);
                console.log('Parsed card:', card);

                if (typeof window.handleCardSelection === 'function') {
                    window.handleCardSelection(card);
                    this.hide();
                } else {
                    console.error('handleCardSelection function not found');
                }
            } catch (error) {
                console.error('Error in card selection:', error);
            }
        });
    }
}

// Export for external use
window.CardSelector = CardSelector;
