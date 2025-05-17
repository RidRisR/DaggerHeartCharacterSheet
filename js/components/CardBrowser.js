class CardBrowser {
    constructor(cardData) {
        this.container = null;
        this.isActive = false;
        this.currentTab = 'all';
        this.cards = cardData || {};
        this.createElements();
        this.bindEvents();
    }

    createElements() {
        // 创建主容器
        this.container = document.createElement('div');
        this.container.className = 'card-browser';

        // 构建内部结构
        this.container.innerHTML = `
            <div class="card-browser-content">
                <div class="card-browser-header">
                    <button class="close-button" id="closeBrowser">&times;</button>
                </div>
                
                <div class="card-browser-body">
                    <div class="card-tabs">
                        <button class="tab-item active" data-type="all">全部</button>
                        <button class="tab-item" data-type="class">职业卡</button>
                        <button class="tab-item" data-type="subclass">子职业卡</button>
                        <button class="tab-item" data-type="domain">领域卡</button>
                        <button class="tab-item" data-type="race">血统卡</button>
                        <button class="tab-item" data-type="community">社群卡</button>
                    </div>

                    <div class="filter-section">
                        <select class="filter-select" id="typeFilter">
                            <option value="">全部类型</option>
                        </select>
                        <select class="filter-select" id="levelFilter">
                            <option value="">全部等级</option>
                        </select>
                        <input type="text" class="filter-input" placeholder="搜索...">
                    </div>

                    <div class="cards-container">
                        <div class="cards-grid" id="cardsGrid"></div>
                    </div>
                </div>
            </div>`;

        // 添加到body
        document.body.appendChild(this.container);
    }

    bindEvents() {
        const closeBtn = this.container.querySelector('#closeBrowser');
        closeBtn.addEventListener('click', () => this.hide());

        // 标签切换事件
        const tabs = this.container.querySelectorAll('.tab-item');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                tabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                this.filterCards(e.target.dataset.type);
            });
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

    filterCards(type) {
        this.currentTab = type;
        const grid = this.container.querySelector('#cardsGrid');
        grid.innerHTML = '';

        let cardsToShow = [];
        if (type === 'all') {
            Object.values(this.cards).forEach(cardSet => {
                cardsToShow = cardsToShow.concat(cardSet);
            });
        } else {
            cardsToShow = this.cards[type] || [];
        }

        cardsToShow.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card-item';
            cardElement.style.backgroundImage = `url(${card.卡图})`;
            cardElement.innerHTML = `<div class="card-name">${card.名称}</div>`;
            grid.appendChild(cardElement);
        });
    }

    // 销毁组件
    destroy() {
        if (this.container) {
            this.container.remove();
            this.container = null;
        }
    }
}

// Use standard global registration
window.CardBrowser = CardBrowser;
