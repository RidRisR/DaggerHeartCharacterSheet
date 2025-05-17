class CardBrowser {
    constructor() {
        console.log('Initializing CardBrowser');
        this.container = null;
        this.isActive = false;
        this.currentDomain = 'all';
        this.manager = new CardBrowserManager();
        this.createElements();
        this.bindEvents();
        this.updateLevelFilter('all');
    }

    createElements() {
        this.container = document.createElement('div');
        this.container.className = 'card-browser';

        // 构建标签页
        const tabsHtml = `
            <button class="tab-item active" data-type="all">全部</button>
            ${this.manager.domains.map(domain =>
            `<button class="tab-item" data-type="${domain}">${domain}</button>`
        ).join('')}`;

        // 构建筛选器
        const filterHtml = `
            <select class="filter-select" id="levelFilter">
                <option value="">选择等级</option>
            </select>
            <input type="text" class="filter-input" placeholder="搜索卡牌...">`;

        this.container.innerHTML = `
            <div class="card-browser-content">
                <button class="close-button" id="closeBrowser">&times;</button>
                <div class="card-tabs">${tabsHtml}</div>
                <div class="filter-section">${filterHtml}</div>
                <div class="cards-container">
                    <div class="cards-grid" id="cardsGrid"></div>
                </div>
            </div>`;

        document.body.appendChild(this.container);
    }

    bindEvents() {
        // 关闭事件
        this.container.addEventListener('click', e => {
            if (e.target === this.container) this.hide();
        });

        // 等级筛选
        const levelFilter = this.container.querySelector('#levelFilter');
        levelFilter.addEventListener('change', () => this.updateDisplayedCards());

        // 名称搜索
        const nameFilter = this.container.querySelector('.filter-input');
        nameFilter.addEventListener('input', () => this.updateDisplayedCards());

        // 标签切换
        const tabs = this.container.querySelectorAll('.tab-item');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                tabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                this.currentDomain = e.target.dataset.type;
                this.updateLevelFilter(this.currentDomain);
                this.updateDisplayedCards();
            });
        });
    }

    updateLevelFilter(domain) {
        const levelSelect = this.container.querySelector('#levelFilter');
        const levels = this.manager.getAvailableLevels(domain);

        levelSelect.innerHTML = `
            <option value="">选择等级</option>
            ${levels.map(level =>
            `<option value="${level}">${level}级</option>`
        ).join('')}`;
    }

    updateDisplayedCards() {
        const levelFilter = this.container.querySelector('#levelFilter').value;
        const nameFilter = this.container.querySelector('.filter-input').value;
        console.log('Updating cards with filters:', { level: levelFilter, name: nameFilter });

        let cards = this.manager.getDomainCards(this.currentDomain);
        console.log(`Initial cards count: ${cards.length}`);

        cards = this.manager.filterCardsByLevel(cards, levelFilter);
        console.log(`After level filter: ${cards.length}`);

        cards = this.manager.filterCardsByName(cards, nameFilter);
        console.log(`After name filter: ${cards.length}`);

        this.renderCards(cards);
    }

    renderCards(cards) {
        console.log('Rendering cards:', cards);
        const grid = this.container.querySelector('#cardsGrid');
        grid.innerHTML = '';

        cards.forEach(card => {
            if (!card.卡图) {
                console.warn('Card missing image:', card);
                return;
            }
            const cardElement = document.createElement('div');
            cardElement.className = 'card-item';
            cardElement.style.backgroundImage = `url(${card.卡图})`;
            cardElement.innerHTML = `
                <div class="card-name">
                    ${card.名称}
                    <span class="card-level">${card.等级}级</span>
                </div>`;
            grid.appendChild(cardElement);
        });

        console.log(`Rendered ${cards.length} cards`);
    }

    show() {
        this.container.classList.add('active');
        this.isActive = true;
    }

    hide() {
        this.container.classList.remove('active');
        this.isActive = false;
    }

    destroy() {
        this.container?.remove();
        this.container = null;
    }
}

// Use standard global registration
window.CardBrowser = CardBrowser;
