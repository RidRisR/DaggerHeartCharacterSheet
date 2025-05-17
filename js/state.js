// 保存角色数据
function saveCharacter() {
    const formData = {};
    const currentProfessionId = document.getElementById("profession")?.value || "";

    // 1. 基本表单数据 (inputs, selects, textareas)
    const formElementIds = [
        "characterName", "profession", "level", "community", "ancestry1", "ancestry2", "subclass",
        "evasion", "armorValue", "armorMax", "minorThreshold", "majorThreshold", "hpMax", "stressMax",
        "characterBackground", "characterNotes", "characterAppearance", "characterMotivation"
    ];
    formElementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) formData[id] = element.value;
    });

    // 2. 属性值和标记状态
    formData.attributes = {};
    const attributeKeys = ["agility", "strength", "finesse", "instinct", "presence", "knowledge"];
    attributeKeys.forEach((attrKey) => {
        formData.attributes[attrKey] = {
            value: document.getElementById(`${attrKey}-value`)?.value || "",
            checked: document.querySelector(`.attribute-check[data-attribute="${attrKey}"]`)?.classList.contains("checked") || false
        };
    });

    // 3. 物品栏武器复选框状态
    formData.weaponCheckboxes = {};
    const weaponCheckboxIds = ["inventoryWeapon1Primary", "inventoryWeapon1Secondary", "inventoryWeapon2Primary", "inventoryWeapon2Secondary"];
    weaponCheckboxIds.forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) formData.weaponCheckboxes[id] = checkbox.checked;
    });

    // 4. 收集各种状态数据 (grids, dots)
    formData.hpState = collectBoxStates("#hp-grid .hp-box");
    formData.stressState = collectBoxStates("#stress-grid .stress-box");
    formData.armorState = collectBoxStates("#armor-grid .armor-box");
    formData.hopeState = collectBoxStates("#hope-grid .hope-diamond", false);
    formData.goldState = collectBoxStates("#gold-handfuls .gold-coin, #gold-bags .gold-coin-bag, #gold-chest .gold-coin-chest");
    formData.proficiencyState = collectBoxStates("#proficiency-dots .proficiency-dot", false);

    // 5. 收集经验列表数据
    formData.experienceData = [];
    for (let i = 0; i < 5; i++) {
        formData.experienceData.push({
            desc: document.getElementById(`experience-${i}`)?.value || "",
            value: document.getElementById(`experience-value-${i}`)?.value || ""
        });
    }

    // 6. 收集物品栏数据 (text inputs)
    formData.inventoryData = [];
    for (let i = 0; i < 5; i++) {
        formData.inventoryData.push(document.getElementById(`inventory-${i}`)?.value || "");
    }

    // 7. 收集卡组数据
    formData.cardData = [];
    for (let i = 0; i < 20; i++) {
        const cardBox = document.querySelector(`.card-box[data-slot="${i}"]`);
        const cardDataStr = cardBox?.dataset.cardData;
        let description = "";
        if (cardDataStr) {
            try {
                const cardData = JSON.parse(cardDataStr);
                description = cardData.描述 || "";
            } catch (e) {
                console.error(`Error parsing card data for slot ${i}:`, e);
            }
        }

        formData.cardData.push({
            name: document.getElementById(`card-name-${i}`)?.value || "",
            type: document.getElementById(`card-type-${i}`)?.value || "",
            level: document.getElementById(`card-level-${i}`)?.value || "",
            recall: document.getElementById(`card-recall-${i}`)?.value || "",
            description: description
        });
    }

    // 8. 收集当前职业的升级状态
    formData.upgradeStates = {};
    formData.upgradeStates[currentProfessionId] = {};

    if (currentProfessionId) {
        for (let tier = 1; tier <= 3; tier++) {
            formData.upgradeStates[currentProfessionId][`tier${tier}`] = {};
            const options = getUpgradeOptions(currentProfessionId, tier);
            options.forEach((option, originalOptionIndex) => {
                const boxesOnPage = document.querySelectorAll(`#tier${tier}-upgrades .upgrade-box[data-original-index="${originalOptionIndex}"]`);
                boxesOnPage.forEach((box, subIndex) => {
                    formData.upgradeStates[currentProfessionId][`tier${tier}`][`opt${originalOptionIndex}_box${subIndex}`] = box.classList.contains("checked");
                });
            });
        }
    }

    // 添加武器和护甲数据
    formData.weapons = window.exportWeaponsData();
    formData.armor = window.exportArmorData();

    const jsonData = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    // 获取角色名称、职业、血统和社区信息
    const charName = formData.characterName || "character";
    const profName = currentProfessionId ? window.getProfessionName(currentProfessionId).replace(/\s+/g, '_') || "prof" : "prof";
    const ancestry1 = formData.ancestry1?.replace(/\s+/g, '_') || "";
    const ancestry2 = formData.ancestry2?.replace(/\s+/g, '_') || "";
    const community = formData.community?.replace(/\s+/g, '_') || "";

    // 构建文件名
    a.download = `${charName}_${profName}_${ancestry1}_${ancestry2}_${community}.json`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert("角色数据已完整保存到文件！");
}

// 加载角色数据
function loadCharacter() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    fileInput.addEventListener("change", (event) => {
        console.log("File selected, starting to read...");
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    console.log("File read successfully, parsing JSON...");
                    const jsonData = JSON.parse(e.target.result);
                    console.log("Loaded character data:", jsonData);
                    document.querySelectorAll('input[type="text"], input[type="number"], textarea').forEach(el => el.value = '');
                    document.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);
                    document.querySelectorAll('select').forEach(el => el.selectedIndex = 0);
                    document.querySelectorAll(".hp-box, .stress-box, .armor-box, .hope-diamond, .gold-coin, .gold-coin-bag, .gold-coin-chest, .proficiency-dot, .attribute-check")
                        .forEach(el => el.classList.remove("checked"));
                    for (let tier = 1; tier <= 3; tier++) {
                        const upgradeList = document.getElementById(`tier${tier}-upgrades`);
                        if (upgradeList) upgradeList.innerHTML = "";
                    }
                    fillFormData(jsonData);
                    console.log("Character data filled successfully");
                } catch (error) {
                    console.error("加载角色数据失败:", error);
                    alert("加载角色数据失败。文件可能已损坏或格式不正确。");
                } finally {
                    if (fileInput.parentNode) {
                        fileInput.parentNode.removeChild(fileInput);
                    }
                }
            };
            reader.onerror = () => {
                alert("读取文件失败。");
                if (fileInput.parentNode) {
                    fileInput.parentNode.removeChild(fileInput);
                }
            };
            reader.readAsText(file);
        } else {
            if (fileInput.parentNode) {
                fileInput.parentNode.removeChild(fileInput);
            }
        }
    });
    fileInput.click();
}

// 从本地存储加载数据
function loadFromLocalStorage() {
    const simpleFields = [
        "characterName", "level", "community", "ancestry1", "ancestry2", "subclass",
        "evasion", "armorValue", "minorThreshold", "majorThreshold",
        "primaryWeaponTrait", "primaryWeaponDamage", "primaryWeaponFeature",
        "secondaryWeaponTrait", "secondaryWeaponDamage", "secondaryWeaponFeature",
        "armorBaseScore", "armorFeature",
        "inventoryWeapon1Trait", "inventoryWeapon1Damage", "inventoryWeapon1Feature",
        "inventoryWeapon2Trait", "inventoryWeapon2Damage", "inventoryWeapon2Feature",
        "characterBackground", "characterNotes", "characterAppearance", "characterMotivation"
    ];

    simpleFields.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            const storedValue = localStorage.getItem(id);
            if (storedValue !== null) {
                element.value = storedValue;
            } else if (element.dataset.hasDefault === "true") {
                element.value = element.dataset.defaultValue || "";
            }
        }
    });

    ['hpMax', 'stressMax', 'armorMax'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const storedVal = localStorage.getItem(id);
            if (storedVal !== null) el.value = storedVal;
            else if (el.dataset.hasDefault === "true") el.value = el.dataset.defaultValue || "6";
            updateBoxesMax(document.getElementById(id.replace('Max', '-grid')), id.replace('Max', '-box'), parseInt(el.value) || 6);
        }
    });

    const attributeKeys = ["agility", "strength", "finesse", "instinct", "presence", "knowledge"];
    attributeKeys.forEach(attrKey => {
        const valueEl = document.getElementById(`${attrKey}-value`);
        const checkEl = document.querySelector(`.attribute-check[data-attribute="${attrKey}"]`);
        if (valueEl) valueEl.value = localStorage.getItem(`${attrKey}-value`) || "";
        if (checkEl && localStorage.getItem(`${attrKey}-checked`) === "true") checkEl.classList.add("checked");
        else if (checkEl) checkEl.classList.remove("checked");
    });

    ['primaryWeaponName', 'secondaryWeaponName', 'inventoryWeapon1Name', 'inventoryWeapon2Name', 'armorName'].forEach(id => {
        const selectEl = document.getElementById(id);
        if (selectEl) {
            const storedValue = localStorage.getItem(id);
            if (storedValue !== null) {
                selectEl.value = storedValue;
                selectEl.dispatchEvent(new Event('change'));
            }
        }
    });

    ["inventoryWeapon1Primary", "inventoryWeapon1Secondary", "inventoryWeapon2Primary", "inventoryWeapon2Secondary"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.checked = localStorage.getItem(id) === "true";
    });

    try {
        const hpState = JSON.parse(localStorage.getItem("hpState"));
        if (hpState) setBoxStates("#hp-grid .hp-box", hpState);

        const stressState = JSON.parse(localStorage.getItem("stressState"));
        if (stressState) setBoxStates("#stress-grid .stress-box", stressState);

        const armorState = JSON.parse(localStorage.getItem("armorState"));
        if (armorState) setBoxStates("#armor-grid .armor-box", armorState);

        const hopeState = JSON.parse(localStorage.getItem("hopeState"));
        if (hopeState) setBoxStates("#hope-grid .hope-diamond", hopeState, false);

        const goldState = JSON.parse(localStorage.getItem("goldState"));
        if (goldState) setBoxStates("#gold-handfuls .gold-coin, #gold-bags .gold-coin-bag, #gold-chest .gold-coin-chest", goldState);

    } catch (error) { console.error("加载HP/Stress/Armor/Hope/Gold状态失败:", error); }
    loadProficiencyDotsState();

    for (let i = 0; i < 5; i++) {
        const invItem = document.getElementById(`inventory-${i}`);
        if (invItem) invItem.value = localStorage.getItem(`inventory-${i}`) || "";
    }

    for (let i = 0; i < 5; i++) {
        const expDesc = document.getElementById(`experience-${i}`);
        if (expDesc) expDesc.value = localStorage.getItem(`experience-${i}`) || "";
        const expValue = document.getElementById(`experience-value-${i}`);
        if (expValue) expValue.value = localStorage.getItem(`experience-value-${i}`) || "";
    }

    for (let i = 0; i < 20; i++) {
        ['card-name', 'card-type', 'card-level', 'card-recall'].forEach(field => {
            const input = document.getElementById(`${field}-${i}`);
            if (input) input.value = localStorage.getItem(`${field}-${i}`) || "";
        });
    }

    const currentProfessionId = localStorage.getItem("characterProfession") || "";
    const professionSelect1 = document.getElementById("profession");
    const professionSelect2 = document.getElementById("profession-page2");

    if (professionSelect1) professionSelect1.value = currentProfessionId;
    if (professionSelect2) professionSelect2.value = currentProfessionId;

    const profNameElement = document.getElementById("profession-name");
    if (profNameElement) profNameElement.textContent = getProfessionName(currentProfessionId);

    if (currentProfessionId) {
        initUpgradeOptions(currentProfessionId);
        loadUpgradeStatesForProfession(currentProfessionId);
    } else {
        initUpgradeOptions();
    }
}

// 重置角色表单
function resetCharacter() {
    if (!confirm("你确定要重置角色表吗？所有本地存储的更改都将丢失。")) {
        return;
    }

    const keysInLocalStorage = [];
    for (let i = 0; i < localStorage.length; i++) {
        keysInLocalStorage.push(localStorage.key(i));
    }
    const appPrefixes = ["character", "level", "community", "ancestry", "subclass", "evasion", "armor", "minor", "major", "hp", "stress", "primary", "secondary", "inventory", "experience", "gold", "proficiency", "card-", "upgrade-", "agility", "strength", "finesse", "instinct", "presence", "knowledge"];

    keysInLocalStorage.forEach(key => {
        if (appPrefixes.some(prefix => key.startsWith(prefix))) {
            localStorage.removeItem(key);
        }
    });
    localStorage.removeItem("hopeState");

    location.reload();
}

// 辅助函数：收集格子状态
function collectBoxStates(selector) {
    const states = [];
    document.querySelectorAll(selector).forEach(el => {
        const index = parseInt(el.dataset.index, 10);
        if (!isNaN(index)) {
            states[index] = el.classList.contains("checked");
        } else {
            states.push(el.classList.contains("checked"));
        }
    });
    return states;
}

// 辅助函数：设置格子状态
function setBoxStates(selector, states, isDataIndexBased = true) {
    if (!states || states.length === 0) return;
    document.querySelectorAll(selector).forEach((el, queryIndex) => {
        let state;
        if (isDataIndexBased) {
            const dataIdx = parseInt(el.dataset.index, 10);
            if (!isNaN(dataIdx)) {
                state = states[dataIdx];
            }
        } else {
            state = states[queryIndex];
        }

        if (state === true) {
            el.classList.add("checked");
        } else if (state === false) {
            el.classList.remove("checked");
        }
    });
    return states;
}

// 填充表单数据 (核心加载逻辑)
function fillFormData(sourceData) {
    console.log("Starting to fill form data...");

    // 1. 职业数据处理
    const loadedProfessionId = sourceData.profession;
    console.log("Setting profession:", loadedProfessionId);

    // 查找匹配的职业数据
    const profData = CLASS_DATA.find(p =>
        p.id === loadedProfessionId ||
        p.id.toLowerCase() === loadedProfessionId.toLowerCase()
    );

    if (profData) {
        const profession1 = document.getElementById("profession");
        const profession2 = document.getElementById("profession-page2");
        const profNameElement = document.getElementById("profession-name");

        // 设置值并触发事件
        if (profession1) {
            console.log("Setting profession1 to:", profData.id);
            profession1.value = profData.id;
            // 触发原生change事件
            profession1.dispatchEvent(new Event('change', { bubbles: true }));
        }

        if (profession2) {
            console.log("Setting profession2 to:", profData.id);
            profession2.value = profData.id;
            // 确保第二页也触发change事件
            profession2.dispatchEvent(new Event('change', { bubbles: true }));
        }

        if (profNameElement) {
            profNameElement.textContent = profData.职业;
        }

        // 保存到localStorage
        localStorage.setItem("characterProfession", profData.id);

        // 手动触发相关更新
        updateHopeSpecial(profData.id);
        initUpgradeOptions(profData.id);
        loadUpgradeStatesForProfession(profData.id);
    } else {
        console.error("No matching profession found for:", loadedProfessionId);
    }

    // 导入武器和护甲数据
    if (sourceData.weapons) {
        window.importWeaponsData(sourceData.weapons);
    }
    if (sourceData.armor) {
        window.importArmorData(sourceData.armor);
    }

    // 1. 基本表单数据 (inputs, selects, textareas)
    const formElementIds = [
        "characterName", "profession", "level", "community", "ancestry1", "ancestry2", "subclass",
        "evasion", "armorValue", "armorMax", "minorThreshold", "majorThreshold", "hpMax", "stressMax",
        "armorName", "armorBaseScore", "armorFeature",
        "characterBackground", "characterAppearance", "characterMotivation"
    ];

    formElementIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && sourceData[id] !== undefined) {
            el.value = sourceData[id];
            localStorage.setItem(id, sourceData[id]);
        }
    });

    // 2. 属性状态
    if (sourceData.attributes) {
        console.log("Loading attributes:", sourceData.attributes);
        Object.entries(sourceData.attributes).forEach(([attrKey, attrData]) => {
            const valueEl = document.getElementById(`${attrKey}-value`);
            const checkEl = document.querySelector(`.attribute-check[data-attribute="${attrKey}"]`);

            if (valueEl) {
                valueEl.value = attrData.value;
                localStorage.setItem(`${attrKey}-value`, attrData.value);
            } else {
                console.warn(`Value element not found for ${attrKey}`);
            }

            if (checkEl) {
                console.log(` ${attrKey} checked state to:`, attrData.checked);
                if (attrData.checked) {
                    checkEl.classList.add('checked');
                } else {
                    checkEl.classList.remove('checked');
                }
                localStorage.setItem(`${attrKey}-checked`, attrData.checked.toString());
            } else {
                console.warn(`Check element not found for ${attrKey}`);
            }
        });
    }

    // 3. 复选框状态
    if (sourceData.weaponCheckboxes) {
        Object.entries(sourceData.weaponCheckboxes).forEach(([id, checked]) => {
            const el = document.getElementById(id);
            if (el) {
                el.checked = checked;
                localStorage.setItem(id, checked.toString());
            }
        });
    }

    // 4. 格子状态
    if (sourceData.hpState) {
        setBoxStates("#hp-grid .hp-box", sourceData.hpState);
        localStorage.setItem("hpState", JSON.stringify(sourceData.hpState));
    }
    if (sourceData.stressState) {
        setBoxStates("#stress-grid .stress-box", sourceData.stressState);
        localStorage.setItem("stressState", JSON.stringify(sourceData.stressState));
    }
    if (sourceData.armorState) {
        setBoxStates("#armor-grid .armor-box", sourceData.armorState);
        localStorage.setItem("armorState", JSON.stringify(sourceData.armorState));
    }
    if (sourceData.hopeState) {
        setBoxStates("#hope-grid .hope-diamond", sourceData.hopeState, false);
        localStorage.setItem("hopeState", JSON.stringify(sourceData.hopeState));
    }
    if (sourceData.goldState) {
        setBoxStates("#gold-handfuls .gold-coin, #gold-bags .gold-coin-bag, #gold-chest .gold-coin-chest", sourceData.goldState);
        localStorage.setItem("goldState", JSON.stringify(sourceData.goldState));
    }
    if (sourceData.proficiencyState) {
        setBoxStates("#proficiency-dots .proficiency-dot", sourceData.proficiencyState, false);
        localStorage.setItem("proficiencyState", JSON.stringify(sourceData.proficiencyState));
    }

    // 5. 经验列表数据
    if (sourceData.experienceData) {
        sourceData.experienceData.forEach((exp, i) => {
            const descEl = document.getElementById(`experience-${i}`);
            const valueEl = document.getElementById(`experience-value-${i}`);
            if (descEl) {
                descEl.value = exp.desc || "";
                localStorage.setItem(`experience-${i}`, descEl.value);
            }
            if (valueEl) {
                valueEl.value = exp.value || "";
                localStorage.setItem(`experience-value-${i}`, valueEl.value);
            }
        });
    }

    // 6. 物品栏数据
    if (sourceData.inventoryData) {
        sourceData.inventoryData.forEach((item, i) => {
            const el = document.getElementById(`inventory-${i}`);
            if (el) {
                el.value = item || "";
                localStorage.setItem(`inventory-${i}`, el.value);
            }
        });
    }

    // 7. 卡组数据
    if (sourceData.cardData) {
        sourceData.cardData.forEach((card, i) => {
            const cardBox = document.querySelector(`.card-box[data-slot="${i}"]`);
            if (cardBox) {
                const cardData = {
                    名称: card.name,
                    领域: card.type,
                    等级: card.level?.replace("LV.", "") || "",
                    回想: card.recall?.replace("RC.", "") || "",
                    描述: card.description || ""
                };
                cardBox.dataset.cardData = JSON.stringify(cardData);
            }

            ["name", "type", "level", "recall"].forEach(key => {
                const el = document.getElementById(`card-${key}-${i}`);
                const val = card[key] || "";
                if (el) {
                    el.value = val;
                    localStorage.setItem(`card-${key}-${i}`, val);
                }
            });
            // 保存描述到 localStorage
            localStorage.setItem(`card-描述-${i}`, card.description || "");
        });
    }

    // 8. 职业和升级状态
    if (loadedProfessionId && sourceData.upgradeStates && sourceData.upgradeStates[loadedProfessionId]) {
        const profUpgradeStates = sourceData.upgradeStates[loadedProfessionId];
        for (let tier = 1; tier <= 3; tier++) {
            if (profUpgradeStates[`tier${tier}`]) {
                localStorage.setItem(
                    `upgradeStates_${loadedProfessionId}_tier${tier}`,
                    JSON.stringify(profUpgradeStates[`tier${tier}`])
                );
            }
        }
    }

    console.log("Form data fill completed");
}

// 确保函数被导出
window.fillFormData = fillFormData;