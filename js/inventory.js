// 初始化物品栏
function initInventoryList() {
    const inventoryList = document.getElementById("inventory-list")
    if (!inventoryList) return;
    inventoryList.innerHTML = ""

    for (let i = 0; i < 5; i++) {
        const item = document.createElement("input")
        item.type = "text"
        item.className = "inventory-item"
        item.id = `inventory-${i}`
        item.placeholder = `物品 ${i + 1}`

        item.addEventListener("change", function () {
            saveInventoryItem(i, this.value)
        })

        // 恢复保存的值
        loadInventoryItem(i, item)

        inventoryList.appendChild(item)
    }
}

// 保存物品栏项目
function saveInventoryItem(index, value) {
    localStorage.setItem(`inventory-${index}`, value)
}

// 加载物品栏项目
function loadInventoryItem(index, element) {
    const savedValue = localStorage.getItem(`inventory-${index}`)
    if (savedValue) {
        element.value = savedValue
    }
}

// 修改initWeaponSelects函数
function initWeaponSelects() {
    // 确保 WeaponSelector 已初始化
    WeaponSelector.init();

    const weaponSelectIds = ["primaryWeaponName", "secondaryWeaponName", "inventoryWeapon1Name", "inventoryWeapon2Name"];

    weaponSelectIds.forEach((selectId) => {
        const select = document.getElementById(selectId);
        if (!select) return;

        // 将select替换为button
        const button = document.createElement('button');
        button.className = 'weapon-select-button';
        button.textContent = '选择武器';

        // 直接在按钮点击事件中处理
        button.onclick = (e) => {
            e.preventDefault();
            window.currentWeaponTarget = selectId;
            WeaponSelector.show();
        };

        select.parentNode.replaceChild(button, select);
    });
}

function openWeaponSelector(targetId) {
    window.currentWeaponTarget = targetId;
    WeaponSelector.show();
}

// 修改handleWeaponSelection函数为武器选择回调
function handleWeaponSelection(weapon) {
    if (!window.currentWeaponTarget) return;

    const baseId = window.currentWeaponTarget;
    updateWeaponDisplay(baseId, weapon);
    saveWeaponData(baseId, weapon);

    WeaponSelector.hide();
    window.currentWeaponTarget = null;
}

function updateWeaponDisplay(baseId, weapon) {
    // 查找按钮元素（使用父元素查找）
    const buttonEl = document.getElementById(baseId)?.parentElement.querySelector('.weapon-select-button');
    const traitEl = document.getElementById(`${baseId}Trait`);
    const damageEl = document.getElementById(`${baseId}Damage`);
    const featureEl = document.getElementById(`${baseId}Feature`);

    if (buttonEl) buttonEl.textContent = removeEnglishText(weapon.名称);
    if (traitEl) traitEl.value = `${removeEnglishText(weapon.负荷)} ${removeEnglishText(weapon.范围)} ${removeEnglishText(weapon.属性)}`;
    if (damageEl) damageEl.value = `${removeEnglishText(weapon.检定)} ${weapon.伤害}`;
    if (featureEl) featureEl.value = removeEnglishText(weapon.特性);
}

function saveWeaponData(baseId, weapon) {
    localStorage.setItem(`${baseId}`, weapon.ID);
    localStorage.setItem(`${baseId}Trait`, `${removeEnglishText(weapon.负荷)} ${removeEnglishText(weapon.范围)} ${removeEnglishText(weapon.属性)}`);
    localStorage.setItem(`${baseId}Damage`, `${removeEnglishText(weapon.检定)} ${weapon.伤害}`);
    localStorage.setItem(`${baseId}Feature`, removeEnglishText(weapon.特性));
}

// 初始化护甲下拉框
function initArmorSelect() {
    const armorSelect = document.getElementById("armorName");
    if (!armorSelect) return;
    if (typeof armorData === 'undefined') {
        console.error("armorData is not defined.");
        return;
    }
    armorSelect.innerHTML = '<option value=""></option><option value="none">None</option>';
    armorData.forEach((armor) => {
        const option = document.createElement("option");
        option.value = armor.id;
        option.textContent = armor.name;
        armorSelect.appendChild(option);
    });

    armorSelect.addEventListener("change", function () {
        const armorId = this.value;
        const selectedArmor = armorData.find((a) => a.id === armorId);
        const baseScoreEl = document.getElementById("armorBaseScore");
        const featureEl = document.getElementById("armorFeature");

        if (selectedArmor && armorId !== "none") {
            if (baseScoreEl) baseScoreEl.value = selectedArmor.baseScore || "";
            if (featureEl) featureEl.value = selectedArmor.feature || "";
        } else {
            if (baseScoreEl) baseScoreEl.value = "";
            if (featureEl) featureEl.value = "";
        }
        localStorage.setItem("armorName", armorId);
        if (baseScoreEl) localStorage.setItem("armorBaseScore", baseScoreEl.value);
        if (featureEl) localStorage.setItem("armorFeature", featureEl.value);
    });
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
    createCoin(handfulGrid, "gold-coin", 0, 10);       // Indices 0-9
    createCoin(bagsGrid, "gold-coin-bag", 10, 10);    // Indices 10-19
    createCoin(chestGrid, "gold-coin-chest", 20, 1);  // Index 20
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

// 导出模块中使用的函数
window.initInventoryList = initInventoryList;
window.initWeaponSelects = initWeaponSelects;
window.initArmorSelect = initArmorSelect;