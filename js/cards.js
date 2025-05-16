// 初始化卡组
function initCardDeck() {
    const cardGrid = document.getElementById("card-grid");
    if (!cardGrid) return;
    cardGrid.innerHTML = "";
    for (let i = 0; i < 20; i++) {
        const item = document.createElement("div");
        item.className = "card-item";
        item.innerHTML = `
            <div class="card-box">
                <div class="card-row">
                    <span class="card-number">${i + 1}.</span>
                    <input type="text" class="card-name" id="card-name-${i}" placeholder="Card name...">
                </div>
                <div class="card-details">
                    <input type="text" class="card-type" id="card-type-${i}" placeholder="Type...">
                    <input type="text" class="card-level" id="card-level-${i}" placeholder="Level...">
                    <input type="text" class="card-recall" id="card-recall-${i}" placeholder="Recall...">
                </div>
            </div>
        `;
        cardGrid.appendChild(item);
        ['card-name', 'card-type', 'card-level', 'card-recall'].forEach(field => {
            const input = item.querySelector(`#${field}-${i}`);
            if (input) input.addEventListener("change", function () {
                localStorage.setItem(`${field}-${i}`, this.value);
            });
        });
    }
}
