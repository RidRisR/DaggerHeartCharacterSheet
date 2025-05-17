document.addEventListener("DOMContentLoaded", () => {
    // 初始化标签页
    initTabs()

    // 先初始化所有全局数据
    window.weaponData = window.weaponData || [];
    window.armorData = window.armorData || [];
    window.upgradeOptionsData = window.upgradeOptionsData || {};
    window.races = window.RACES_DATA || []; 
    window.groups = window.groups || defaultGroups;

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
});

const defaultGroups = {
    "wanderer": { name: "漂泊之民", features: [] },
    "highlander": { name: "高城之民", features: [] }
    // Add more groups as needed
};

// 初始化角色表单元素
function initCharacterSheet() {
    // 1. 首先初始化下拉选择框，因为其他组件可能依赖这些选择
    initProfessionSelect(); // 改为正确的函数名
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
    document.getElementById("save-button").addEventListener("click", saveCharacter)
    document.getElementById("load-button").addEventListener("click", loadCharacter)
    document.getElementById("export-button").addEventListener("click", exportToPDF)
    document.getElementById("reset-button").addEventListener("click", resetCharacter)
}

async function exportToPDF() {
    console.log('开始导出PDF...');

    try {
        const transferData = {
            type: 'content',
            currentProfession: document.getElementById('profession')?.value,
            professionInfo: window.dataCollectors.collectProfessionInfo(),
            pages: {
                page1: document.querySelector('#page1')?.outerHTML,
                page2: document.querySelector('#page2')?.outerHTML
            },
            weaponData: window.dataCollectors.collectWeaponData(),
            characterData: {
                attributes: window.dataCollectors.collectAttributeData(),
                state: window.dataCollectors.collectCharacterState(),
                info: window.dataCollectors.collectCharacterInfo(),
                experience: window.dataCollectors.collectExperienceData(),
                inventory: window.dataCollectors.collectInventoryData(),
                cards: window.dataCollectors.collectCardData()
            },
            globalData: window.dataCollectors.collectGlobalData()
        };

        // 数据完整性验证
        if (!validateTransferData(transferData)) {
            alert('数据收集不完整，请至少填写职业和角色名称。');
            return;
        }

        sessionStorage.setItem('printData', JSON.stringify(transferData));
        window.open('./components/print.html?print=' + Date.now(), '_blank');
    } catch (e) {
        console.error('数据收集失败:', e);
        alert('导出失败，请重试。');
    }
}

function validateTransferData(data) {
    const required = [
        data.pages.page1,
        data.pages.page2,
    ];
    return required.every(item => !!item);
}

function collectWeaponData() {
    const weaponData = {};
    ["primaryWeaponName", "secondaryWeaponName", "inventoryWeapon1Name", "inventoryWeapon2Name"]
        .forEach(baseId => {
            const cleanedId = baseId.replace('Name', '');
            weaponData[baseId] = {
                weaponId: localStorage.getItem(baseId),
                trait: document.getElementById(`${cleanedId}Trait`)?.value || '',
                damage: document.getElementById(`${cleanedId}Damage`)?.value || '',
                feature: document.getElementById(`${cleanedId}Feature`)?.value || '',
                isPrimary: document.getElementById(`${cleanedId}Primary`)?.checked || false,
                isSecondary: document.getElementById(`${cleanedId}Secondary`)?.checked || false
            };
        });
    return weaponData;
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
