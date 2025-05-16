function initCardDeck() {
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
                    <input type="text" class="card-type" id="card-type-${i}" readonly>
                    <input type="text" class="card-level" id="card-level-${i}" readonly>
                    <input type="text" class="card-recall" id="card-recall-${i}" readonly>
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
    const slot = window.currentCardSlot;
    const cardBox = document.querySelector(`.card-box[data-slot="${slot}"]`);
    if (!cardBox) return;

    cardBox.dataset.cardData = JSON.stringify(card);

    document.getElementById(`card-name-${slot}`).value = removeEnglishText(card.名称);
    document.getElementById(`card-type-${slot}`).value = card.领域;
    document.getElementById(`card-level-${slot}`).value = card.等级;
    document.getElementById(`card-recall-${slot}`).value = card.回想;

    // 保存到 localStorage
    ['名称', '领域', '等级', '回想', '描述'].forEach(field => {
        localStorage.setItem(`card-${field}-${slot}`, card[field]);
    });
}
