document.addEventListener("DOMContentLoaded", () => {
    // 初始化标签页
    initTabs()

    // 初始化角色表单元素
    initCharacterSheet()

    markDefaultElements()

    // 初始化打印按钮
    document.getElementById("print-button").addEventListener("click", () => {
        handlePrint()
    })

    // 初始化保存按钮
    document.getElementById("save-button").addEventListener("click", () => {
        saveCharacter()
    })

    // 初始化加载按钮
    document.getElementById("load-button").addEventListener("click", () => {
        loadCharacter()
    })

    // 初始化导出PDF按钮
    document.getElementById("export-button").addEventListener("click", () => {
        exportToPDF()
    })

    // 初始化重置按钮
    document.getElementById("reset-button").addEventListener("click", () => {
        resetCharacter()
    })

    // 同步两个页面的职业选择
    const professionSelect1 = document.getElementById("profession");
    const professionSelect2 = document.getElementById("profession-page2");

    function handleProfessionChange(selectedProfessionId) {
        if (professionSelect1) professionSelect1.value = selectedProfessionId;
        if (professionSelect2) professionSelect2.value = selectedProfessionId;

        const profNameElement = document.getElementById("profession-name");
        if (profNameElement) {
            profNameElement.textContent = getProfessionName(selectedProfessionId);
        }
        localStorage.setItem("characterProfession", selectedProfessionId);
        initUpgradeOptions(); // Rebuild DOM for new profession's upgrades
        loadUpgradeStatesForProfession(selectedProfessionId); // Load saved states for these new upgrades
    }

    if (professionSelect1) {
        professionSelect1.addEventListener("change", function () {
            handleProfessionChange(this.value);
        });
    }
    if (professionSelect2) {
        professionSelect2.addEventListener("change", function () {
            handleProfessionChange(this.value);
        });
    }

    // 尝试从本地存储加载数据
    loadFromLocalStorage() // This will load saved states, including for upgrades based on the loaded profession
})

// 初始化标签页
function initTabs() {
    const tabButtons = document.querySelectorAll(".tab-button")
    const tabContents = document.querySelectorAll(".tab-content")

    tabButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const tabId = this.getAttribute("data-tab")

            // 移除所有活动标签
            tabButtons.forEach((btn) => btn.classList.remove("active"))
            tabContents.forEach((content) => content.classList.remove("active"))

            // 激活当前标签
            this.classList.add("active")
            document.getElementById(tabId).classList.add("active")
        })
    })
}

// 初始化角色表单元素
function initCharacterSheet() {
    // 初始化属性
    initAttributes()

    // 初始化生命值和压力格子
    initHPStressGrid()

    // 初始化护甲格子
    initArmorGrid()

    // 初始化希望钻石
    initHopeDiamonds()

    // 初始化经验列表
    initExperienceList()

    // 初始化金币格子
    initGoldCoins()

    // 初始化熟练度点
    initProficiencyDots()

    // 初始化物品栏
    initInventoryList()

    // 初始化武器下拉框 (Uses global weaponData from data.js)
    initWeaponSelects()

    // 初始化护甲下拉框 (Uses global armorData from data.js)
    initArmorSelect()

    // 初始化卡组
    initCardDeck()

    // 初始化升级选项 (Uses global professions and upgradeOptionsData from data.js)
    // This will be called for the default/initial profession
    const initialProfession = localStorage.getItem("characterProfession") ||
        (document.getElementById("profession") ? document.getElementById("profession").value : null) ||
        (Object.keys(professions).length > 0 ? Object.keys(professions)[0] : "");
    if (initialProfession) { // Ensure professions is loaded and has keys
        initUpgradeOptions(initialProfession);
    } else {
        initUpgradeOptions(); // Call without specific profession if none determined yet
    }

    // 初始化职业选择框 (Uses global professions from data.js)
    initProfessionSelects()

    // 初始化血统选择框 (Uses global ancestryData from data.js)
    initAncestrySelects()

    // 初始化社群选择框 (Uses global communityData from data.js)
    initCommunitySelects()
}

// 标记默认值元素
function markDefaultElements() {
    const defaultElements = [
        { id: "hpMax", defaultValue: "6" },
        { id: "stressMax", defaultValue: "6" },
        { id: "armorMax", defaultValue: "6" },
    ]

    defaultElements.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) {
            element.setAttribute("data-has-default", "true")
            element.setAttribute("data-default-value", item.defaultValue)
        }
    })

    document.querySelectorAll("select").forEach((select) => {
        select.setAttribute("data-has-default", "true")
        // Default value for selects is usually empty or a specific "none" value
        // The check in handlePrint already considers "" or "none" for selects.
    })
}

// 处理打印
function handlePrint() {
    const savedValues = {}
    const defaultElements = document.querySelectorAll("[data-has-default='true']")

    defaultElements.forEach((element) => {
        savedValues[element.id] = element.value
        if (
            element.value === element.getAttribute("data-default-value") ||
            (element.tagName === "SELECT" && (element.value === "" || element.value === "none"))
        ) {
            element.value = ""
        }
    })

    window.print()

    setTimeout(() => {
        defaultElements.forEach((element) => {
            if (element.id in savedValues) {
                element.value = savedValues[element.id]
            }
        })
    }, 500)
}