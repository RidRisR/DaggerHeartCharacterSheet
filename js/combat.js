// 初始化生命值和压力格子
function initHPStressGrid() {
    const hpGrid = document.getElementById("hp-grid")
    const stressGrid = document.getElementById("stress-grid")

    if (hpGrid) {
        hpGrid.innerHTML = ""
        for (let i = 0; i < 18; i++) {
            const box = document.createElement("div")
            box.className = "hp-box"
            box.dataset.index = i
            if (i >= 6) box.classList.add("disabled")
            box.addEventListener("click", function () {
                if (!this.classList.contains("disabled")) {
                    this.classList.toggle("checked")
                    saveHPStressState()
                }
            })
            hpGrid.appendChild(box)
        }
    }

    if (stressGrid) {
        stressGrid.innerHTML = ""
        for (let i = 0; i < 18; i++) {
            const box = document.createElement("div")
            box.className = "stress-box"
            box.dataset.index = i
            if (i >= 6) box.classList.add("disabled")
            box.addEventListener("click", function () {
                if (!this.classList.contains("disabled")) {
                    this.classList.toggle("checked")
                    saveHPStressState()
                }
            })
            stressGrid.appendChild(box)
        }
    }

    initMaxInputs()
}

function initMaxInputs() {
    const hpMaxEl = document.getElementById("hpMax");
    if (hpMaxEl) {
        hpMaxEl.addEventListener("change", function () {
            const max = Number.parseInt(this.value) || 6
            updateBoxesMax(document.getElementById("hp-grid"), "hp-box", max)
            localStorage.setItem("hpMax", max.toString())
            saveHPStressState()
        });
    }

    const stressMaxEl = document.getElementById("stressMax");
    if (stressMaxEl) {
        stressMaxEl.addEventListener("change", function () {
            const max = Number.parseInt(this.value) || 6
            updateBoxesMax(document.getElementById("stress-grid"), "stress-box", max)
            localStorage.setItem("stressMax", max.toString())
            saveHPStressState()
        });
    }
}

// 初始化护甲格子
function initArmorGrid() {
    const armorGrid = document.getElementById("armor-grid")
    if (!armorGrid) return;

    armorGrid.innerHTML = ""
    for (let i = 0; i < 12; i++) {
        const box = document.createElement("div")
        box.className = "armor-box"
        box.dataset.index = i
        if (i >= 6) box.classList.add("disabled")
        box.addEventListener("click", function () {
            if (!this.classList.contains("disabled")) {
                this.classList.toggle("checked")
                saveArmorState()
            }
        })
        armorGrid.appendChild(box)
    }

    const armorMaxEl = document.getElementById("armorMax");
    if (armorMaxEl) {
        armorMaxEl.addEventListener("change", function () {
            const max = Number.parseInt(this.value) || 6
            updateBoxesMax(armorGrid, "armor-box", max)
            localStorage.setItem("armorMax", max.toString())
            saveArmorState()
        });
    }
}

// 保存HP和Stress状态
function saveHPStressState() {
    const hpState = Array.from(document.querySelectorAll("#hp-grid .hp-box"))
        .map(box => box.classList.contains("checked"));
    const stressState = Array.from(document.querySelectorAll("#stress-grid .stress-box"))
        .map(box => box.classList.contains("checked"));
    localStorage.setItem("hpState", JSON.stringify(hpState))
    localStorage.setItem("stressState", JSON.stringify(stressState))
}

// 保存护甲状态
function saveArmorState() {
    const armorState = Array.from(document.querySelectorAll("#armor-grid .armor-box"))
        .map(box => box.classList.contains("checked"));
    localStorage.setItem("armorState", JSON.stringify(armorState))
}
