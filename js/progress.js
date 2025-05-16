// 初始化经验列表
function initExperienceList() {
    const experienceList = document.getElementById("experience-list")
    if (!experienceList) return;
    experienceList.innerHTML = ""

    for (let i = 0; i < 5; i++) {
        const item = document.createElement("div")
        item.className = "experience-item"
        item.innerHTML = `
            <input type="text" class="experience-desc" id="experience-${i}" placeholder="Experience description">
            <input type="text" class="experience-value" id="experience-value-${i}" placeholder="#">
        `
        experienceList.appendChild(item)

        const descInput = item.querySelector(`#experience-${i}`)
        const valueInput = item.querySelector(`#experience-value-${i}`)

        // 设置事件监听器
        descInput.addEventListener("change", function () {
            localStorage.setItem(`experience-${i}`, this.value)
        })
        valueInput.addEventListener("change", function () {
            localStorage.setItem(`experience-value-${i}`, this.value)
        })

        // 加载已保存的值
        const savedDesc = localStorage.getItem(`experience-${i}`)
        const savedValue = localStorage.getItem(`experience-value-${i}`)
        if (savedDesc) descInput.value = savedDesc
        if (savedValue) valueInput.value = savedValue
    }
}

// 初始化熟练度点
function initProficiencyDots() {
    const proficiencyDots = document.getElementById("proficiency-dots")
    if (!proficiencyDots) return;
    proficiencyDots.innerHTML = ""
    for (let i = 0; i < 6; i++) {
        const dot = document.createElement("div")
        dot.className = "proficiency-dot"
        dot.dataset.index = i
        dot.addEventListener("click", function () {
            this.classList.toggle("checked")
            saveProficiencyDotsState()
        })
        proficiencyDots.appendChild(dot)
    }
}

// 保存熟练度点状态
function saveProficiencyDotsState() {
    const proficiencyState = Array.from(document.querySelectorAll("#proficiency-dots .proficiency-dot"))
        .map(dot => dot.classList.contains("checked"));
    localStorage.setItem("proficiencyState", JSON.stringify(proficiencyState))
}

// 加载熟练度点状态
function loadProficiencyDotsState() {
    try {
        const proficiencyState = JSON.parse(localStorage.getItem("proficiencyState"))
        if (proficiencyState) {
            document.querySelectorAll("#proficiency-dots .proficiency-dot").forEach((dot, index) => {
                if (proficiencyState[index]) dot.classList.add("checked")
                else dot.classList.remove("checked")
            })
        }
    } catch (error) {
        console.error("加载熟练度点状态失败:", error)
    }
}

// 初始化金币格子
function initGoldCoins() {
    const handfulGrid = document.getElementById("gold-handfuls")
    const bagsGrid = document.getElementById("gold-bags")
    const chestGrid = document.getElementById("gold-chest")

    function createCoin(container, className, baseIndex, count) {
        if (!container) return;
        container.innerHTML = "";
        for (let i = 0; i < count; i++) {
            const coin = document.createElement("div");
            coin.className = className;
            coin.dataset.index = baseIndex + i;
            coin.addEventListener("click", function () {
                this.classList.toggle("checked");
                saveGoldState();
            });
            container.appendChild(coin);
        }
    }

    createCoin(handfulGrid, "gold-coin", 0, 10);
    createCoin(bagsGrid, "gold-coin-bag", 10, 10);
    createCoin(chestGrid, "gold-coin-chest", 20, 1);

    // 加载保存的状态
    loadGoldState();
}

// 保存金币状态
function saveGoldState() {
    const goldState = [];
    document.querySelectorAll("#gold-handfuls .gold-coin, #gold-bags .gold-coin-bag, #gold-chest .gold-coin-chest").forEach((coin) => {
        const index = parseInt(coin.dataset.index, 10);
        if (!isNaN(index)) {
            goldState[index] = coin.classList.contains("checked");
        }
    });
    localStorage.setItem("goldState", JSON.stringify(goldState));
}

// 加载金币状态
function loadGoldState() {
    const savedState = localStorage.getItem("goldState");
    if (savedState) {
        try {
            const goldState = JSON.parse(savedState);
            setGoldStates(goldState);
        } catch (error) {
            console.error("加载金币状态失败:", error);
        }
    }
}

// 设置金币状态
function setGoldStates(states) {
    if (!states || !Array.isArray(states)) return;
    document.querySelectorAll("#gold-handfuls .gold-coin, #gold-bags .gold-coin-bag, #gold-chest .gold-coin-chest").forEach((coin) => {
        const index = parseInt(coin.dataset.index, 10);
        if (!isNaN(index) && states[index] !== undefined) {
            if (states[index]) {
                coin.classList.add("checked");
            } else {
                coin.classList.remove("checked");
            }
        }
    });
}

// 初始化所有进度组件
function initProgress() {
    initGoldCoins();          // 包含自己的状态加载
    initProficiencyDots();    // 紧接着加载状态
    loadProficiencyDotsState();
    initExperienceList();     // 包含自己的状态加载
}
