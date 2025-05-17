class CardBrowser {
    constructor(categoryData = {}) {
        this.container = null;
        this.isActive = false;
        this.currentCategory = 'all';
        // 直接接收分类数据对象 {职业: [], 领域: [], etc...}
        this.categories = categoryData;

        this.createElements();
        this.bindEvents();
    }

    createElements() {
        this.container = document.createElement('div');
        this.container.className = 'card-browser';

        const categories = Object.keys(this.categories);
        const categoryButtons = categories.map(cat =>
            `<button class="tab-item" data-category="${cat}">${cat}</button>`
        ).join('');

        this.container.innerHTML = `
            <div class="card-browser-content">
                <button class="close-button" id="closeBrowser">&times;</button>
                <div class="card-tabs">
                    <button class="tab-item active" data-category="all">全部</button>
                    ${categoryButtons}
                </div>
                <div class="filter-section">
                    <input type="text" class="filter-input" placeholder="搜索卡牌...">
                </div>
                <div class="cards-container">
                    <div class="cards-grid" id="cardsGrid"></div>
                </div>
            </div>`;

        document.body.appendChild(this.container);
        this.showCards('all');
    }

    bindEvents() {
        // 关闭事件
        this.container.addEventListener('click', e => {
            if (e.target === this.container) this.hide();
        });

        // 标签切换
        const tabs = this.container.querySelectorAll('.tab-item');
        tabs.forEach(tab => {
            tab.addEventListener('click', e => {
                tabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                this.showCards(e.target.dataset.category);
            });
        });

        // 搜索过滤
        const searchInput = this.container.querySelector('.filter-input');
        searchInput.addEventListener('input', e => {
            this.filterCards(e.target.value);
        });
    }

    filterCards(searchText) {
        const cards = this.currentCategory === 'all'
            ? Object.values(this.categories).flat()
            : this.categories[this.currentCategory] || [];

        const filtered = searchText
            ? cards.filter(card => card.名称.includes(searchText))
            : cards;

        this.renderCards(filtered);
    }

    showCards(category) {
        this.currentCategory = category;
        this.filterCards(this.container.querySelector('.filter-input').value);
    }

    renderCards(cards) {
        const grid = this.container.querySelector('#cardsGrid');
        grid.innerHTML = '';

        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card-item';
            cardElement.style.backgroundImage = `url(${card.卡图})`;
            cardElement.innerHTML = `<div class="card-name">${card.名称}</div>`;
            grid.appendChild(cardElement);
        });
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

// 全局注册
window.CardBrowser = CardBrowser;
