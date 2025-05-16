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

// 初始化武器下拉框
function initWeaponSelects() {
    const weaponSelectIds = ["primaryWeaponName", "secondaryWeaponName", "inventoryWeapon1Name", "inventoryWeapon2Name"];
    if (typeof weaponData === 'undefined') {
        console.error("weaponData is not defined.");
        return;
    }

    weaponSelectIds.forEach((selectId) => {
        const select = document.getElementById(selectId);
        if (!select) return;
        select.innerHTML = '<option value=""></option><option value="none">None</option>';
        weaponData.forEach((weapon) => {
            const option = document.createElement("option");
            option.value = weapon.id;
            option.textContent = weapon.name;
            select.appendChild(option);
        });

        // Add change event listener
        select.addEventListener("change", function () {
            handleWeaponSelectChange(this);
        });
    });

    // Add checkbox event listeners
    ["inventoryWeapon1Primary", "inventoryWeapon1Secondary", "inventoryWeapon2Primary", "inventoryWeapon2Secondary"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("change", function () {
            localStorage.setItem(id, this.checked.toString());
        });
    });
}

function handleWeaponSelectChange(select) {
    const weaponId = select.value;
    const selectedWeapon = weaponData.find((w) => w.id === weaponId);
    const baseId = select.id.replace("Name", "");

    const traitEl = document.getElementById(`${baseId}Trait`);
    const damageEl = document.getElementById(`${baseId}Damage`);
    const featureEl = document.getElementById(`${baseId}Feature`);

    if (selectedWeapon && weaponId !== "none") {
        if (traitEl) traitEl.value = selectedWeapon.trait || "";
        if (damageEl) damageEl.value = selectedWeapon.damage || "";
        if (featureEl) featureEl.value = selectedWeapon.feature || "";
    } else {
        if (traitEl) traitEl.value = "";
        if (damageEl) damageEl.value = "";
        if (featureEl) featureEl.value = "";
    }

    localStorage.setItem(select.id, weaponId);
    if (traitEl) localStorage.setItem(`${baseId}Trait`, traitEl.value);
    if (damageEl) localStorage.setItem(`${baseId}Damage`, damageEl.value);
    if (featureEl) localStorage.setItem(`${baseId}Feature`, featureEl.value);
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