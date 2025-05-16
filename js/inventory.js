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
    WeaponSelector.init();

    const weaponSelectIds = ["primaryWeaponName", "secondaryWeaponName", "inventoryWeapon1Name", "inventoryWeapon2Name"];

    weaponSelectIds.forEach((selectId) => {
        const select = document.getElementById(selectId);
        if (!select) return;

        const button = document.createElement('button');
        button.className = 'weapon-select-button form-select';
        button.dataset.originalId = selectId;
        button.dataset.printPlaceholder = true; // 添加打印占位符标记
        button.textContent = ''; // 初始为空

        // 恢复已保存的武器数据
        const savedWeaponId = localStorage.getItem(selectId);
        if (savedWeaponId) {
            const weapon = WeaponSelector.getAllWeapons().find(w => w.ID === savedWeaponId);
            if (weapon) {
                button.textContent = removeEnglishText(weapon.名称);
                button.dataset.printPlaceholder = false;
            }
        }

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
    const buttonEl = document.querySelector(`.weapon-select-button[data-original-id="${baseId}"]`);
    const traitEl = document.getElementById(`${baseId}Trait`);
    const damageEl = document.getElementById(`${baseId}Damage`);
    const featureEl = document.getElementById(`${baseId}Feature`);

    if (buttonEl) {
        buttonEl.textContent = removeEnglishText(weapon.名称);
        buttonEl.dataset.printPlaceholder = false;
    }
    if (traitEl) traitEl.value = `${removeEnglishText(weapon.负荷)} ${removeEnglishText(weapon.范围)} ${removeEnglishText(weapon.属性)}`;
    if (damageEl) damageEl.value = `${removeEnglishText(weapon.检定)} ${weapon.伤害}`;
    if (featureEl) featureEl.value = removeEnglishText(weapon.特性);

    // 保存武器数据
    localStorage.setItem(baseId, weapon.ID);
    localStorage.setItem(`${baseId}Trait`, `${removeEnglishText(weapon.负荷)} ${removeEnglishText(weapon.范围)} ${removeEnglishText(weapon.属性)}`);
    localStorage.setItem(`${baseId}Damage`, `${removeEnglishText(weapon.检定)} ${weapon.伤害}`);
    localStorage.setItem(`${baseId}Feature`, removeEnglishText(weapon.特性));

    WeaponSelector.hide();
    window.currentWeaponTarget = null;
}

// 修改护甲选择器初始化函数
function initArmorSelect() {
    ArmorSelector.init();

    const armorButton = document.createElement('button');
    armorButton.className = 'weapon-select-button form-select';
    armorButton.dataset.originalId = 'armorName';  // 添加originalId
    armorButton.dataset.printPlaceholder = true;
    armorButton.textContent = '';

    // 恢复已保存的护甲数据
    const savedArmorId = localStorage.getItem('armorName');
    if (savedArmorId) {
        const armor = ArmorSelector.getAllArmors().find(a => a.ID === savedArmorId);
        if (armor) {
            armorButton.textContent = removeEnglishText(armor.名称);
            armorButton.dataset.printPlaceholder = false;
        }
    }

    armorButton.onclick = (e) => {
        e.preventDefault();
        ArmorSelector.show();
    };

    const select = document.getElementById('armorName');
    if (select) {
        select.parentNode.replaceChild(armorButton, select);
    }
}

function handleArmorSelection(armor) {
    // 修改data-original-id的查找方式
    const buttonEl = document.querySelector('.weapon-select-button[data-original-id="armorName"]');
    const baseScoreEl = document.getElementById('armorBaseScore');
    const featureEl = document.getElementById('armorFeature');

    if (buttonEl) {
        buttonEl.textContent = removeEnglishText(armor.名称);
        buttonEl.dataset.printPlaceholder = false;
    }
    if (baseScoreEl) baseScoreEl.value = armor.防御;
    if (featureEl) featureEl.value = removeEnglishText(armor.特性);

    // 保存护甲数据
    localStorage.setItem('armorName', armor.ID);
    localStorage.setItem('armorBaseScore', armor.防御);
    localStorage.setItem('armorFeature', removeEnglishText(armor.特性));
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