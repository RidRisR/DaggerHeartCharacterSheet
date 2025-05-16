// upgradeOptionsData 应该已经在 data.js 中定义

// Helper function to get combined upgrade options
function getUpgradeOptions(professionId, tier) {
    const options = [];
    if (typeof upgradeOptionsData === 'undefined' || typeof professions === 'undefined' || !professionId || !professions[professionId]) {
        return options;
    }

    const baseUpgrades = upgradeOptionsData.baseUpgrades || [];
    const tierSpecific = upgradeOptionsData.tierSpecificUpgrades?.[`tier${tier}`] || [];
    const professionSpecificUpgrades = professions[professionId]?.upgrades?.[`tier${tier}`] || [];

    options.push(...baseUpgrades.filter(opt => (opt.tiers === undefined || opt.tiers.includes(tier))));
    options.push(...tierSpecific);
    options.push(...professionSpecificUpgrades);
    return options;
}

// 初始化升级选项
function initUpgradeOptions(professionIdToUse) {
    let currentProfessionId = professionIdToUse;
    if (!currentProfessionId) {
        const professionSelect = document.getElementById("profession");
        currentProfessionId = professionSelect ? professionSelect.value : null;
    }
    if (!currentProfessionId && typeof professions !== 'undefined' && Object.keys(professions).length > 0) {
        currentProfessionId = Object.keys(professions)[0];
    }

    if (!currentProfessionId) {
        for (let tier = 1; tier <= 3; tier++) {
            const upgradeList = document.getElementById(`tier${tier}-upgrades`);
            if (upgradeList) upgradeList.innerHTML = "";
        }
        return;
    }

    for (let tier = 1; tier <= 3; tier++) {
        const upgradeList = document.getElementById(`tier${tier}-upgrades`);
        if (!upgradeList) continue;
        upgradeList.innerHTML = "";

        const options = getUpgradeOptions(currentProfessionId, tier);

        options.forEach((option, originalOptionIndex) => {
            const item = document.createElement("div");
            item.className = "upgrade-item";
            const labelText = option && option.label ? option.label : `Upgrade Option ${originalOptionIndex + 1}`;

            const boxHtml = `<div class="upgrade-box" data-tier="${tier}" data-original-index="${originalOptionIndex}"></div>`;
            item.innerHTML = option.doubleBox ?
                `<div class="upgrade-double-box">${boxHtml}${boxHtml}</div><span class="upgrade-label">${labelText}</span>` :
                `${boxHtml}<span class="upgrade-label">${labelText}</span>`;

            upgradeList.appendChild(item);

            item.querySelectorAll(".upgrade-box").forEach((box) => {
                box.addEventListener("click", function () {
                    this.classList.toggle("checked");
                    saveUpgradeState(currentProfessionId, tier, originalOptionIndex, box.classList.contains("checked"), option.doubleBox ? Array.from(this.parentElement.children).indexOf(this) : 0);
                });
            });
        });
    }
}

// 保存升级状态
function saveUpgradeState(professionId, tier, originalOptionIndex, isChecked, subIndex = 0) {
    const key = `upgrade-${professionId}-tier${tier}-opt${originalOptionIndex}-box${subIndex}`;
    localStorage.setItem(key, isChecked.toString());
}

// 加载特定职业的升级状态
function loadUpgradeStatesForProfession(professionId) {
    if (!professionId) return;

    for (let tier = 1; tier <= 3; tier++) {
        const upgradeList = document.getElementById(`tier${tier}-upgrades`);
        if (!upgradeList) continue;

        const options = getUpgradeOptions(professionId, tier);

        options.forEach((option, originalOptionIndex) => {
            const boxesOnPage = upgradeList.querySelectorAll(`.upgrade-box[data-tier="${tier}"][data-original-index="${originalOptionIndex}"]`);

            boxesOnPage.forEach((box, subIndex) => {
                const key = `upgrade-${professionId}-tier${tier}-opt${originalOptionIndex}-box${subIndex}`;
                const checked = localStorage.getItem(key) === "true";
                if (checked) {
                    box.classList.add("checked");
                } else {
                    box.classList.remove("checked");
                }
            });
        });
    }
}

// 导出函数到全局作用域供其他模块使用
window.initUpgradeOptions = initUpgradeOptions;
window.getUpgradeOptions = getUpgradeOptions;
window.saveUpgradeState = saveUpgradeState;
window.loadUpgradeStatesForProfession = loadUpgradeStatesForProfession;