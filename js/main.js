document.addEventListener("DOMContentLoaded", () => {
    // 初始化标签页
    initTabs()

    // 先初始化所有全局数据
    window.weaponData = window.weaponData || [];
    window.armorData = window.armorData || [];
    window.upgradeOptionsData = window.upgradeOptionsData || {};

    // 初始化角色表单元素
    initCharacterSheet()

    // 标记默认值元素
    markDefaultElements()

    // 初始化按钮事件监听
    initButtonListeners()

    // 同步两个页面的职业选择
    initProfessionSync()

    // 尝试从本地存储加载数据
    loadFromLocalStorage()
})

// 初始化角色表单元素
function initCharacterSheet() {
    // 1. 首先初始化下拉选择框，因为其他组件可能依赖这些选择
    initProfessionSelects()
    initAncestrySelects()
    initCommunitySelects()

    // 2. 初始化属性和状态相关组件
    initAttributes()
    initHPStressGrid()
    initArmorGrid()
    initHopeDiamonds()

    // 3. 初始化进度和金币相关组件
    initProgress()

    // 4. 初始化物品栏和装备相关组件
    initInventoryList() // 移到这里，确保在装备初始化之前
    initWeaponSelects()
    initArmorSelect()

    // 5. 初始化卡组
    initCardDeck()

    // 6. 最后初始化升级选项，因为它依赖于职业选择
    const initialProfession = localStorage.getItem("characterProfession") ||
        (document.getElementById("profession")?.value) ||
        (typeof professions !== 'undefined' && Object.keys(professions).length > 0 ? Object.keys(professions)[0] : "");

    if (initialProfession) {
        initUpgradeOptions(initialProfession)
        loadUpgradeStatesForProfession(initialProfession)
    } else {
        initUpgradeOptions()
    }
}

// 初始化按钮事件监听
function initButtonListeners() {
    document.getElementById("print-button").addEventListener("click", handlePrint)
    document.getElementById("save-button").addEventListener("click", saveCharacter)
    document.getElementById("load-button").addEventListener("click", loadCharacter)
    document.getElementById("export-button").addEventListener("click", exportToPDF)
    document.getElementById("reset-button").addEventListener("click", resetCharacter)
}

// 初始化职业同步
function initProfessionSync() {
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
        initUpgradeOptions();
        loadUpgradeStatesForProfession(selectedProfessionId);
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
}
