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
        button.dataset.printPlaceholder = true;
        button.textContent = '';

        // 恢复已保存的武器数据
        const savedWeaponId = localStorage.getItem(selectId);
        if (savedWeaponId) {
            const weapon = WeaponSelector.getAllWeapons().find(w => w.ID === savedWeaponId);
            if (weapon) {
                button.textContent = removeEnglishText(weapon.名称);
                button.dataset.printPlaceholder = false;

                // 恢复其他武器相关数据
                const cleanedId = selectId.replace('Name', '');
                const traitEl = document.getElementById(`${cleanedId}Trait`);
                const damageEl = document.getElementById(`${cleanedId}Damage`);
                const featureEl = document.getElementById(`${cleanedId}Feature`);

                if (traitEl) traitEl.value = localStorage.getItem(`${selectId}Trait`) || '';
                if (damageEl) damageEl.value = localStorage.getItem(`${selectId}Damage`) || '';
                if (featureEl) featureEl.value = localStorage.getItem(`${selectId}Feature`) || '';
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
    console.log('==== Weapon Selection START ====');
    console.log('Selected weapon:', weapon);
    console.log('Current target:', window.currentWeaponTarget);

    if (!window.currentWeaponTarget) {
        console.error('No weapon target selected');
        return;
    }

    const baseId = window.currentWeaponTarget;

    // 修复ID匹配：去掉"Name"后缀
    const cleanedId = baseId.replace('Name', '');

    // 记录元素查找过程
    const buttonEl = document.querySelector(`button[data-original-id="${baseId}"]`);
    const traitEl = document.getElementById(`${cleanedId}Trait`);
    const damageEl = document.getElementById(`${cleanedId}Damage`);
    const featureEl = document.getElementById(`${cleanedId}Feature`);

    console.log('Clean ID:', cleanedId);
    console.log('Looking for elements with IDs:', {
        button: baseId,
        trait: `${cleanedId}Trait`,
        damage: `${cleanedId}Damage`,
        feature: `${cleanedId}Feature`
    });

    console.log('Found Elements:', {
        buttonFound: !!buttonEl,
        traitFound: !!traitEl,
        damageFound: !!damageEl,
        featureFound: !!featureEl
    });

    if (!buttonEl || !traitEl || !damageEl || !featureEl) {
        console.error('Missing elements for IDs:', {
            button: baseId,
            trait: `${cleanedId}Trait`,
            damage: `${cleanedId}Damage`,
            feature: `${cleanedId}Feature`
        });
        return;
    }

    try {
        // 记录即将更新的值
        const updates = {
            name: removeEnglishText(weapon.名称),
            trait: `${removeEnglishText(weapon.负荷)} ${removeEnglishText(weapon.范围)} ${removeEnglishText(weapon.属性)}`,
            damage: `${removeEnglishText(weapon.检定)} ${weapon.伤害}`,
            feature: removeEnglishText(weapon.特性)
        };
        console.log('Updating with values:', updates);

        // 更新显示
        buttonEl.textContent = updates.name;
        buttonEl.dataset.printPlaceholder = false;
        traitEl.value = updates.trait;
        damageEl.value = updates.damage;
        featureEl.value = updates.feature;

        // 保存完整的武器数据
        localStorage.setItem(baseId, weapon.ID);  // 保存武器ID
        localStorage.setItem(`${baseId}Trait`, updates.trait);
        localStorage.setItem(`${baseId}Damage`, updates.damage);
        localStorage.setItem(`${baseId}Feature`, updates.feature);

        console.log('Before calling WeaponSelector.hide()');
        WeaponSelector.hide();
        console.log('After WeaponSelector.hide(), clearing currentWeaponTarget');
        window.currentWeaponTarget = null;
        console.log('Selection process completed');

    } catch (error) {
        console.error('Update failed:', error);
        console.error('Stack:', error.stack);
    }

    console.log('==== Weapon Selection END ====');
}

// 导出武器数据
function exportWeaponsData() {
    const weaponData = {};
    const weaponSelectIds = ["primaryWeaponName", "secondaryWeaponName", "inventoryWeapon1Name", "inventoryWeapon2Name"];

    weaponSelectIds.forEach(baseId => {
        const cleanedId = baseId.replace('Name', '');
        const buttonEl = document.querySelector(`button[data-original-id="${baseId}"]`);

        const weapon = WeaponSelector.getAllWeapons().find(w => w.ID === localStorage.getItem(baseId));
        const weaponName = weapon ? removeEnglishText(weapon.名称) : '';

        weaponData[baseId] = {
            weaponId: localStorage.getItem(baseId),
            weaponName: weaponName,  // 添加武器名称
            trait: localStorage.getItem(`${baseId}Trait`),
            damage: localStorage.getItem(`${baseId}Damage`),
            feature: localStorage.getItem(`${baseId}Feature`)
        };
    });

    return weaponData;
}

// 导入武器数据
function importWeaponsData(weaponData) {
    console.log('==== Import Weapons Data START ====');
    console.log('Importing weapon data:', weaponData);

    for (const [baseId, data] of Object.entries(weaponData)) {
        console.log(`\nProcessing weapon: ${baseId}`);
        console.log('Data:', data);

        if (!data.weaponId) {
            console.log(`Skipping ${baseId} - no weaponId found`);
            continue;
        }

        const cleanedId = baseId.replace('Name', '');
        const buttonEl = document.querySelector(`button[data-original-id="${baseId}"]`);

        if (buttonEl) {
            buttonEl.textContent = data.weaponName || '';
            buttonEl.dataset.printPlaceholder = !data.weaponName;
        }

        const traitEl = document.getElementById(`${cleanedId}Trait`);
        const damageEl = document.getElementById(`${cleanedId}Damage`);
        const featureEl = document.getElementById(`${cleanedId}Feature`);

        if (traitEl) traitEl.value = data.trait || '';
        if (damageEl) damageEl.value = data.damage || '';
        if (featureEl) featureEl.value = data.feature || '';

        // 保存到localStorage
        localStorage.setItem(baseId, data.weaponId);
        localStorage.setItem(`${baseId}Name`, data.weaponName || '');  // 保存武器名称
        localStorage.setItem(`${baseId}Trait`, data.trait || '');
        localStorage.setItem(`${baseId}Damage`, data.damage || '');
        localStorage.setItem(`${baseId}Feature`, data.feature || '');
    }

    console.log('==== Import Weapons Data END ====');
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

// 导出护甲数据
function exportArmorData() {
    const armorButton = document.querySelector('button[data-original-id="armorName"]');
    const armor = ArmorSelector.getAllArmors().find(a => a.ID === localStorage.getItem('armorName'));
    const armorName = armor ? removeEnglishText(armor.名称) : '';

    return {
        armorId: localStorage.getItem('armorName'),
        armorName: armorName,
        baseScore: localStorage.getItem('armorBaseScore'),
        feature: localStorage.getItem('armorFeature')
    };
}

// 导入护甲数据
function importArmorData(armorData) {
    console.log('==== Import Armor Data START ====');
    console.log('Importing armor data:', armorData);

    if (!armorData.armorId) {
        console.log('No armor ID found, skipping import');
        return;
    }

    const buttonEl = document.querySelector('button[data-original-id="armorName"]');
    const baseScoreEl = document.getElementById('armorBaseScore');
    const featureEl = document.getElementById('armorFeature');

    if (buttonEl) {
        console.log(' armor name to:', armorData.armorName);
        buttonEl.textContent = armorData.armorName || '';
        buttonEl.dataset.printPlaceholder = !armorData.armorName;
    }

    if (baseScoreEl) baseScoreEl.value = armorData.baseScore || '';
    if (featureEl) featureEl.value = armorData.feature || '';

    // 保存到localStorage
    localStorage.setItem('armorName', armorData.armorId);
    localStorage.setItem('armorBaseScore', armorData.baseScore || '');
    localStorage.setItem('armorFeature', armorData.feature || '');

    console.log('==== Import Armor Data END ====');
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
window.exportWeaponsData = exportWeaponsData;
window.importWeaponsData = importWeaponsData;
window.exportArmorData = exportArmorData;
window.importArmorData = importArmorData;