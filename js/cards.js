function initCardDeck() {
    // Ensure DOMAIN_CARDS is available
    if (typeof window.DOMAIN_CARDS === 'undefined') {
        console.error('DOMAIN_CARDS not loaded. Please ensure domain_cards.js is included before cards.js');
        return;
    }

    const cardGrid = document.getElementById("card-grid");
    if (!cardGrid) return;
    cardGrid.innerHTML = "";

    // 初始化卡牌选择器和全局变量
    CardSelector.init();
    window.currentCardSlot = null;  // 添加这行，确保全局变量被正确初始化

    for (let i = 0; i < 20; i++) {
        const item = document.createElement("div");
        item.className = "card-item";
        item.innerHTML = `
            <div class="card-box" data-slot="${i}">
                <div class="card-row">
                    <span class="card-number">${i + 1}.</span>
                    <input type="text" class="card-name" id="card-name-${i}" placeholder="点击选择卡牌..." readonly>
                </div>
                <div class="card-details">
                    <input type="text" class="card-field card-type" id="card-type-${i}" readonly>
                    <input type="text" class="card-field card-level" id="card-level-${i}" readonly>
                    <input type="text" class="card-field card-recall" id="card-recall-${i}" readonly>
                </div>
                <div class="card-tooltip" id="card-tooltip-${i}"></div>
            </div>
        `;
        cardGrid.appendChild(item);

        // 为每个卡槽添加点击事件
        const cardBox = item.querySelector('.card-box');
        cardBox.addEventListener('click', function () {
            window.currentCardSlot = i;
            CardSelector.show();
        });

        // 添加悬停事件以显示描述
        cardBox.addEventListener('mouseenter', function () {
            const tooltip = document.getElementById(`card-tooltip-${i}`);
            const cardData = this.dataset.cardData;
            if (cardData) {
                const card = JSON.parse(cardData);
                tooltip.textContent = card.描述;
                tooltip.style.display = 'block';
            }
        });

        cardBox.addEventListener('mouseleave', function () {
            const tooltip = document.getElementById(`card-tooltip-${i}`);
            tooltip.style.display = 'none';
        });
    }
}

// 处理卡牌选择
window.handleCardSelection = function (card) {
    if (window.currentCardSlot === null) return;  // 添加这行，防止未定义情况
    const slot = window.currentCardSlot;
    const cardBox = document.querySelector(`.card-box[data-slot="${slot}"]`);
    if (!cardBox) return;

    cardBox.dataset.cardData = JSON.stringify(card);

    document.getElementById(`card-name-${slot}`).value = removeEnglishText(card.名称);
    document.getElementById(`card-type-${slot}`).value = card.领域;
    document.getElementById(`card-level-${slot}`).value = `LV.${card.等级}`;
    document.getElementById(`card-recall-${slot}`).value = `RC.${card.回想}`;

    // 保存到 localStorage
    localStorage.setItem(`card-名称-${slot}`, card.名称);
    localStorage.setItem(`card-领域-${slot}`, card.领域);
    localStorage.setItem(`card-等级-${slot}`, `LV.${card.等级}`);
    localStorage.setItem(`card-回想-${slot}`, `RC.${card.回想}`);
    localStorage.setItem(`card-描述-${slot}`, card.描述);
}

// 修改样式定义
const style = document.createElement('style');
style.textContent = `
    .card-details {
        display: flex;
        gap: 10px;
        justify-content: flex-start;
    }
    .card-field {
        width: 100%;  // 设置固定宽度
        text-align: center;
        padding: 2px 5px;
        bottom: 1px solid #ccc;
    }
`;
document.head.appendChild(style);
