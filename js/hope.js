// 初始化希望钻石
function initHopeDiamonds() {
    const hopeGrid = document.getElementById("hope-grid")
    if (!hopeGrid) return;
    hopeGrid.innerHTML = ""
    for (let i = 0; i < 6; i++) {
        const diamond = document.createElement("div")
        diamond.className = "hope-diamond"
        diamond.dataset.index = i
        diamond.addEventListener("click", function () {
            this.classList.toggle("checked")
            saveHopeState()
        })
        hopeGrid.appendChild(diamond)
    }
}

// 保存希望状态
function saveHopeState() {
    const hopeState = Array.from(document.querySelectorAll("#hope-grid .hope-diamond"))
        .map(diamond => diamond.classList.contains("checked"));
    localStorage.setItem("hopeState", JSON.stringify(hopeState))
}
