function initCardDeck() {
    console.log('Initializing card deck...');
    // 确保在最开始就初始化 currentCardSlot
    window.currentCardSlot = null;

    // Ensure DOMAIN_CARDS is available
    if (typeof window.DOMAIN_CARDS === 'undefined') {
        console.error('DOMAIN_CARDS not loaded. Please ensure domain_cards.js is included before cards.js');
        return;
    }

    const cardGrid = document.getElementById("card-grid");
    if (!cardGrid) return;
    cardGrid.innerHTML = "";

    // 初始化卡牌选择器
    CardSelector.init();

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

        // 从localStorage加载已保存的卡牌数据
        loadSavedCard(i);

        // 为每个卡槽添加点击事件
        const cardBox = item.querySelector('.card-box');
        cardBox.addEventListener('click', function () {
            console.log(`Card slot ${i} clicked, setting currentCardSlot`);
            window.currentCardSlot = i;
            console.log('Current slot value:', window.currentCardSlot);
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

// 添加新函数用于加载已保存的卡牌
function loadSavedCard(slot) {
    const savedName = localStorage.getItem(`card-名称-${slot}`);
    if (!savedName) return;

    const cardData = {
        名称: savedName,
        领域: localStorage.getItem(`card-领域-${slot}`),
        等级: localStorage.getItem(`card-等级-${slot}`),
        回想: localStorage.getItem(`card-回想-${slot}`),
        描述: localStorage.getItem(`card-描述-${slot}`)
    };

    const cardBox = document.querySelector(`.card-box[data-slot="${slot}"]`);
    if (cardBox) {
        cardBox.dataset.cardData = JSON.stringify(cardData);

        const nameInput = document.getElementById(`card-name-${slot}`);
        const typeInput = document.getElementById(`card-type-${slot}`);
        const levelInput = document.getElementById(`card-level-${slot}`);
        const recallInput = document.getElementById(`card-recall-${slot}`);

        if (nameInput) nameInput.value = removeEnglishText(cardData.名称);
        if (typeInput) typeInput.value = cardData.领域;
        if (levelInput) levelInput.value = `LV.${cardData.等级}`;
        if (recallInput) recallInput.value = `RC.${cardData.回想}`;
    }
}

// 处理卡牌选择
window.handleCardSelection = function (card) {
    console.log('handleCardSelection called with card:', card);
    console.log('Current slot before processing:', window.currentCardSlot);

    // 确保 currentCardSlot 是有效数字
    if (typeof window.currentCardSlot !== 'number') {
        console.error('Invalid card slot:', window.currentCardSlot);
        return;
    }

    const slot = window.currentCardSlot;
    console.log(`Processing card selection for slot ${slot}`);

    // 使用更精确的选择器
    const cardBox = document.querySelector(`#card-grid .card-box[data-slot="${slot}"]`);
    if (!cardBox) {
        console.error(`Could not find card box for slot ${slot}`);
        return;
    }

    try {
    // 更新卡牌数据
        cardBox.dataset.cardData = JSON.stringify(card);

        // 获取并更新所有相关输入字段
        const nameInput = document.getElementById(`card-name-${slot}`);
        const typeInput = document.getElementById(`card-type-${slot}`);
        const levelInput = document.getElementById(`card-level-${slot}`);
        const recallInput = document.getElementById(`card-recall-${slot}`);

        if (!nameInput || !typeInput || !levelInput || !recallInput) {
            throw new Error('One or more card inputs not found');
        }

        nameInput.value = removeEnglishText(card.名称);
        typeInput.value = card.领域;
        levelInput.value = `LV.${card.等级}`;
        recallInput.value = `RC.${card.回想}`;

        // 保存到 localStorage
        localStorage.setItem(`card-名称-${slot}`, card.名称);
        localStorage.setItem(`card-领域-${slot}`, card.领域);
        localStorage.setItem(`card-等级-${slot}`, card.等级);
        localStorage.setItem(`card-回想-${slot}`, card.回想);
        localStorage.setItem(`card-描述-${slot}`, card.描述);

        console.log(`Successfully updated card in slot ${slot}`);
    } catch (error) {
        console.error('Error updating card:', error);
    }
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
        width: 100%;
        text-align: center;
        padding: 2px 5px;
        bottom: 1px solid #ccc;
    }
    .card-tooltip {
        display: none;
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 4px;
        z-index: 1000;
        max-width: 300px;
        white-space: pre-wrap;
        top: 100%;
        left: 0;
        margin-top: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    .card-box {
        position: relative;
    }
`;
document.head.appendChild(style);
