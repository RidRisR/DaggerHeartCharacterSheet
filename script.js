// Assume data.js is loaded before this script, making professions, ancestryData, etc., globally available.

document.addEventListener("DOMContentLoaded", () => {
  // 初始化标签页
  initTabs()

  // 初始化角色表单元素
  initCharacterSheet() // This will call initUpgradeOptions for the initial/loaded profession

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

// 初始化职业选择框
function initProfessionSelects() {
  const professionSelects = ['profession', 'profession-page2'];
  professionSelects.forEach(selectId => {
    const select = document.getElementById(selectId);
    if (!select) return;
    select.innerHTML = '<option value=""></option>'; // Default empty option

    if (typeof professions === 'undefined' || Object.keys(professions).length === 0) {
      console.warn("Professions data not available for initProfessionSelects");
      return;
    }
    Object.values(professions).forEach(prof => {
      const option = document.createElement('option');
      option.value = prof.id;
      option.textContent = prof.name;
      select.appendChild(option);
    });
  });
}

// 初始化血统选择框
function initAncestrySelects() {
  const ancestrySelects = ['ancestry1', 'ancestry2'];
  ancestrySelects.forEach(selectId => {
    const select = document.getElementById(selectId);
    if (!select) return;
    select.innerHTML = '<option value="none">无</option>'; // "None" option
    if (typeof ancestryData === 'undefined') return;
    ancestryData.forEach(ancestry => {
      const option = document.createElement('option');
      option.value = ancestry.id;
      option.textContent = ancestry.name;
      select.appendChild(option);
    });
  });
}

// 初始化社群选择框
function initCommunitySelects() {
  const select = document.getElementById('community');
  if (!select) return;
  select.innerHTML = '<option value=""></option>'; // Default empty option
  if (typeof communityData === 'undefined') return;
  communityData.forEach(community => {
    const option = document.createElement('option');
    option.value = community.id;
    option.textContent = community.name;
    select.appendChild(option);
  });
}

// 标记默认值元素
function markDefaultElements() {
  const defaultElements = [
    { id: "evasion", defaultValue: "10" },
    { id: "minorThreshold", defaultValue: "7" },
    { id: "majorThreshold", defaultValue: "14" },
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

// 初始化属性
function initAttributes() {
  const attributes = [
    { name: "敏捷", key: "agility", skills: ["奔跑", "跳跃", "机动"] },
    { name: "力量", key: "strength", skills: ["举起", "破坏", "擒拿"] },
    { name: "灵巧", key: "finesse", skills: ["操控", "隐藏", "修理"] },
    { name: "直觉", key: "instinct", skills: ["感知", "感应", "导航"] },
    { name: "魅力", key: "presence", skills: ["魅惑", "表演", "欺骗"] },
    { name: "知识", key: "knowledge", skills: ["回忆", "分析", "理解"] },
  ]

  const attributesGrid = document.querySelector(".attributes-grid")
  if (!attributesGrid) return;
  attributesGrid.innerHTML = ""

  attributes.forEach((attr) => {
    const attributeDiv = document.createElement("div")
    attributeDiv.className = "attribute"
    attributeDiv.innerHTML = `
            <div class="attribute-header">
                <div class="attribute-name">${attr.name}</div>
                <div class="attribute-check" data-attribute="${attr.key}"></div>
            </div>
            <div class="attribute-shield">
                <div class="attribute-skills">${attr.skills.join(", ")}</div>
                <input type="text" class="attribute-value" id="${attr.key}-value" placeholder="#">
            </div>
        `
    attributesGrid.appendChild(attributeDiv)

    const attributeCheck = attributeDiv.querySelector(".attribute-check")
    attributeCheck.addEventListener("click", function () {
      this.classList.toggle("checked")
      localStorage.setItem(`${attr.key}-checked`, this.classList.contains("checked").toString())
    })

    const attributeValue = attributeDiv.querySelector(".attribute-value")
    attributeValue.addEventListener("change", function () {
      localStorage.setItem(`${attr.key}-value`, this.value)
    })
  })
}

// 初始化生命值和压力格子
function initHPStressGrid() {
  const hpGrid = document.getElementById("hp-grid")
  const stressGrid = document.getElementById("stress-grid")

  if (hpGrid) {
    hpGrid.innerHTML = ""
    for (let i = 0; i < 18; i++) {
      const box = document.createElement("div")
      box.className = "hp-box"
      box.dataset.index = i
      if (i >= 6) box.classList.add("disabled")
      box.addEventListener("click", function () {
        if (!this.classList.contains("disabled")) {
          this.classList.toggle("checked")
          saveHPStressState()
        }
      })
      hpGrid.appendChild(box)
    }
  }

  if (stressGrid) {
    stressGrid.innerHTML = ""
    for (let i = 0; i < 18; i++) {
      const box = document.createElement("div")
      box.className = "stress-box"
      box.dataset.index = i
      if (i >= 6) box.classList.add("disabled")
      box.addEventListener("click", function () {
        if (!this.classList.contains("disabled")) {
          this.classList.toggle("checked")
          saveHPStressState()
        }
      })
      stressGrid.appendChild(box)
    }
  }

  const hpMaxEl = document.getElementById("hpMax");
  if (hpMaxEl) {
    hpMaxEl.addEventListener("change", function () {
      const max = Number.parseInt(this.value) || 6
      updateBoxesMax(hpGrid, "hp-box", max)
      localStorage.setItem("hpMax", max.toString())
      saveHPStressState(); // Save state when max changes, as unchecked boxes might become relevant
    });
  }

  const stressMaxEl = document.getElementById("stressMax");
  if (stressMaxEl) {
    stressMaxEl.addEventListener("change", function () {
      const max = Number.parseInt(this.value) || 6
      updateBoxesMax(stressGrid, "stress-box", max)
      localStorage.setItem("stressMax", max.toString())
      saveHPStressState(); // Save state
    });
  }
}

// 更新格子最大值
function updateBoxesMax(grid, className, max) {
  if (!grid) return;
  const boxes = grid.querySelectorAll(`.${className}`)
  boxes.forEach((box, index) => {
    if (index < max) {
      box.classList.remove("disabled")
    } else {
      box.classList.remove("checked")
      box.classList.add("disabled")
    }
  })
}

// 保存HP和Stress状态
function saveHPStressState() {
  const hpState = Array.from(document.querySelectorAll("#hp-grid .hp-box"))
    .map(box => box.classList.contains("checked"));
  const stressState = Array.from(document.querySelectorAll("#stress-grid .stress-box"))
    .map(box => box.classList.contains("checked"));
  localStorage.setItem("hpState", JSON.stringify(hpState))
  localStorage.setItem("stressState", JSON.stringify(stressState))
}

// 初始化护甲格子
function initArmorGrid() {
  const armorGrid = document.getElementById("armor-grid")
  if (!armorGrid) return;

  armorGrid.innerHTML = ""
  for (let i = 0; i < 12; i++) {
    const box = document.createElement("div")
    box.className = "armor-box"
    box.dataset.index = i
    if (i >= 6) box.classList.add("disabled")
    box.addEventListener("click", function () {
      if (!this.classList.contains("disabled")) {
        this.classList.toggle("checked")
        saveArmorState()
      }
    })
    armorGrid.appendChild(box)
  }

  const armorMaxEl = document.getElementById("armorMax");
  if (armorMaxEl) {
    armorMaxEl.addEventListener("change", function () {
      const max = Number.parseInt(this.value) || 6
      updateBoxesMax(armorGrid, "armor-box", max)
      localStorage.setItem("armorMax", max.toString())
      saveArmorState();
    });
  }
}

// 保存护甲状态
function saveArmorState() {
  const armorState = Array.from(document.querySelectorAll("#armor-grid .armor-box"))
    .map(box => box.classList.contains("checked"));
  localStorage.setItem("armorState", JSON.stringify(armorState))
}

// 初始化希望钻石
function initHopeDiamonds() {
  const hopeGrid = document.getElementById("hope-grid")
  if (!hopeGrid) return;
  hopeGrid.innerHTML = ""
  for (let i = 0; i < 6; i++) {
    const diamond = document.createElement("div")
    diamond.className = "hope-diamond"
    diamond.dataset.index = i
    diamond.addEventListener("click", function () {
      this.classList.toggle("checked")
      saveHopeState()
    })
    hopeGrid.appendChild(diamond)
  }
}

// 保存希望状态
function saveHopeState() {
  const hopeState = Array.from(document.querySelectorAll("#hope-grid .hope-diamond"))
    .map(diamond => diamond.classList.contains("checked"));
  localStorage.setItem("hopeState", JSON.stringify(hopeState))
}

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
    item.querySelector(`#experience-${i}`).addEventListener("change", function () { localStorage.setItem(`experience-${i}`, this.value); });
    item.querySelector(`#experience-value-${i}`).addEventListener("change", function () { localStorage.setItem(`experience-value-${i}`, this.value); });
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
    item.placeholder = `Item ${i + 1}`
    item.addEventListener("change", function () { localStorage.setItem(`inventory-${i}`, this.value); })
    inventoryList.appendChild(item)
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

    select.addEventListener("change", function () {
      const weaponId = this.value;
      const selectedWeapon = weaponData.find((w) => w.id === weaponId);
      const baseId = this.id.replace("Name", "");

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
      localStorage.setItem(this.id, weaponId);
      if (traitEl) localStorage.setItem(`${baseId}Trait`, traitEl.value);
      if (damageEl) localStorage.setItem(`${baseId}Damage`, damageEl.value);
      if (featureEl) localStorage.setItem(`${baseId}Feature`, featureEl.value);
    });
  });

  ["inventoryWeapon1Primary", "inventoryWeapon1Secondary", "inventoryWeapon2Primary", "inventoryWeapon2Secondary"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", function () { localStorage.setItem(id, this.checked.toString()); });
  });
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

// 初始化卡组
function initCardDeck() {
  const cardGrid = document.getElementById("card-grid");
  if (!cardGrid) return;
  cardGrid.innerHTML = "";
  for (let i = 0; i < 20; i++) {
    const item = document.createElement("div");
    item.className = "card-item";
    item.innerHTML = `
      <div class="card-box">
        <div class="card-row">
          <span class="card-number">${i + 1}.</span>
          <input type="text" class="card-name" id="card-name-${i}" placeholder="Card name...">
        </div>
        <div class="card-details">
          <input type="text" class="card-type" id="card-type-${i}" placeholder="Type...">
          <input type="text" class="card-level" id="card-level-${i}" placeholder="Level...">
          <input type="text" class="card-recall" id="card-recall-${i}" placeholder="Recall...">
        </div>
      </div>
    `;
    cardGrid.appendChild(item);
    ['card-name', 'card-type', 'card-level', 'card-recall'].forEach(field => {
      const input = item.querySelector(`#${field}-${i}`);
      if (input) input.addEventListener("change", function () { localStorage.setItem(`${field}-${i}`, this.value); });
    });
  }
}

// Helper function to get combined upgrade options
function getUpgradeOptions(professionId, tier) {
  const options = [];
  if (typeof upgradeOptionsData === 'undefined' || typeof professions === 'undefined' || !professionId || !professions[professionId]) {
  // console.warn(`Data missing or invalid professionId '${professionId}' for getUpgradeOptions tier ${tier}.`);
    return options;
  }

  const baseUpgrades = upgradeOptionsData.baseUpgrades || [];
  const tierSpecific = upgradeOptionsData.tierSpecificUpgrades?.[`tier${tier}`] || [];
  const professionSpecificUpgrades = professions[professionId]?.upgrades?.[`tier${tier}`] || [];

  options.push(...baseUpgrades.filter(opt => (opt.tiers === undefined || opt.tiers.includes(tier)))); // Filter base upgrades by tier if specified
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
    currentProfessionId = Object.keys(professions)[0]; // Fallback
  }

  if (!currentProfessionId) {
    // console.warn("No profession ID available for initUpgradeOptions. Skipping.");
    for (let tier = 1; tier <= 3; tier++) { // Clear existing if no profession
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

      // data-original-index stores the index from the getUpgradeOptions array for this profession/tier
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

// 保存升级状态 (modified to handle profession context and double boxes)
function saveUpgradeState(professionId, tier, originalOptionIndex, isChecked, subIndex = 0) {
  // Key includes professionId to make states unique per profession
  // For double boxes, subIndex distinguishes between the two boxes (0 or 1)
  const key = `upgrade-${professionId}-tier${tier}-opt${originalOptionIndex}-box${subIndex}`;
  localStorage.setItem(key, isChecked.toString());
}

// 加载特定职业的升级状态
function loadUpgradeStatesForProfession(professionId) {
  if (!professionId) return;

  for (let tier = 1; tier <= 3; tier++) {
    const upgradeList = document.getElementById(`tier${tier}-upgrades`);
    if (!upgradeList) continue;

    const options = getUpgradeOptions(professionId, tier); // Get options to know how many originalOptionIndex to check

    options.forEach((option, originalOptionIndex) => {
      const boxesOnPage = upgradeList.querySelectorAll(`.upgrade-box[data-tier="${tier}"][data-original-index="${originalOptionIndex}"]`);

      boxesOnPage.forEach((box, subIndex) => { // subIndex will be 0 for single, 0 and 1 for double
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

// 获取职业名称
function getProfessionName(professionId) {
  if (typeof professions === 'undefined') return professionId || "";
  return (professions && professionId && professions[professionId]) ? professions[professionId].name : "";
}

// 辅助函数：收集格子状态
function collectBoxStates(selector) {
  const states = [];
  // Use data-index to preserve order if elements might be added/removed dynamically elsewhere
  // For now, assuming document order is stable for these specific grids after init
  document.querySelectorAll(selector).forEach(el => {
    const index = parseInt(el.dataset.index, 10);
    if (!isNaN(index)) {
      states[index] = el.classList.contains("checked");
    } else { // Fallback for elements without data-index, relying on querySelectorAll order
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

    if (state === true) { // Explicitly check for true/false
      el.classList.add("checked");
    } else if (state === false) {
      el.classList.remove("checked");
    }
    // If state is undefined (e.g. sparse array from data-index), do nothing to the class
  });
}


// 保存角色数据
function saveCharacter() {
  const formData = {};
  const currentProfessionId = document.getElementById("profession")?.value || "";

  // 1. 基本表单数据 (inputs, selects, textareas)
  const formElementIds = [
    "characterName", "profession", "level", "community", "ancestry1", "ancestry2", "subclass",
    "evasion", "armorValue", "armorMax", "minorThreshold", "majorThreshold", "hpMax", "stressMax",
    "primaryWeaponName", "primaryWeaponTrait", "primaryWeaponDamage", "primaryWeaponFeature",
    "secondaryWeaponName", "secondaryWeaponTrait", "secondaryWeaponDamage", "secondaryWeaponFeature",
    "armorName", "armorBaseScore", "armorFeature",
    "inventoryWeapon1Name", "inventoryWeapon1Trait", "inventoryWeapon1Damage", "inventoryWeapon1Feature",
    "inventoryWeapon2Name", "inventoryWeapon2Trait", "inventoryWeapon2Damage", "inventoryWeapon2Feature",
    "characterBackground", "characterNotes", "characterAppearance", "characterMotivation" // Added characterNotes
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
  formData.hopeState = collectBoxStates("#hope-grid .hope-diamond", false); // Not data-index based strictly
  formData.goldState = collectBoxStates("#gold-handfuls .gold-coin, #gold-bags .gold-coin-bag, #gold-chest .gold-coin-chest");
  formData.proficiencyState = collectBoxStates("#proficiency-dots .proficiency-dot", false); // Not data-index based strictly

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
    formData.cardData.push({
      name: document.getElementById(`card-name-${i}`)?.value || "",
      type: document.getElementById(`card-type-${i}`)?.value || "",
      level: document.getElementById(`card-level-${i}`)?.value || "",
      recall: document.getElementById(`card-recall-${i}`)?.value || ""
    });
  }

  // 8. 收集当前职业的升级状态
  formData.upgradeStates = {}; // Store by professionId to be more robust if needed later, or just current
  formData.upgradeStates[currentProfessionId] = {}; // Keyed by current profession

  if (currentProfessionId) {
    for (let tier = 1; tier <= 3; tier++) {
      formData.upgradeStates[currentProfessionId][`tier${tier}`] = {};
      const options = getUpgradeOptions(currentProfessionId, tier);
      options.forEach((option, originalOptionIndex) => {
        const boxesOnPage = document.querySelectorAll(`#tier${tier}-upgrades .upgrade-box[data-original-index="${originalOptionIndex}"]`);
        boxesOnPage.forEach((box, subIndex) => {
          // Store the checked state for this specific box
          formData.upgradeStates[currentProfessionId][`tier${tier}`][`opt${originalOptionIndex}_box${subIndex}`] = box.classList.contains("checked");
        });
      });
    }
  }


  // Create and download JSON file
  const jsonData = JSON.stringify(formData, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const charName = formData.characterName || "character";
  const profName = currentProfessionId ? professions[currentProfessionId]?.name.replace(/\s+/g, '_') || "prof" : "prof";
  a.download = `${charName}_${profName}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  alert("角色数据已完整保存到文件！");
}


// 填充表单数据 (核心加载逻辑)
function fillFormData(sourceData) {
  // 1. 基本表单数据
  const formElementIds = [
    "characterName", /* "profession" handled separately */ "level", "community", "ancestry1", "ancestry2", "subclass",
    "evasion", "armorValue", /* "armorMax" handled with grid */ /* "minorThreshold", "majorThreshold", */ /* "hpMax", "stressMax" handled with grids */
    "primaryWeaponName", "primaryWeaponTrait", "primaryWeaponDamage", "primaryWeaponFeature",
    "secondaryWeaponName", "secondaryWeaponTrait", "secondaryWeaponDamage", "secondaryWeaponFeature",
    "armorName", "armorBaseScore", "armorFeature",
    "inventoryWeapon1Name", "inventoryWeapon1Trait", "inventoryWeapon1Damage", "inventoryWeapon1Feature",
    "inventoryWeapon2Name", "inventoryWeapon2Trait", "inventoryWeapon2Damage", "inventoryWeapon2Feature",
    "characterBackground", "characterNotes", "characterAppearance", "characterMotivation"
  ];

  formElementIds.forEach(id => {
    const element = document.getElementById(id);
    if (element && sourceData[id] !== undefined) {
      element.value = sourceData[id];
      localStorage.setItem(id, sourceData[id]);
    }
  });
  // Defaultable values that might not be in all older JSONs
  ["minorThreshold", "majorThreshold"].forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.value = sourceData[id] !== undefined ? sourceData[id] : element.getAttribute("data-default-value") || "";
      localStorage.setItem(id, element.value);
    }
  });


  // 2. 属性值和标记状态
  if (sourceData.attributes) {
    Object.entries(sourceData.attributes).forEach(([attrKey, attrData]) => {
      const valueEl = document.getElementById(`${attrKey}-value`);
      const checkEl = document.querySelector(`.attribute-check[data-attribute="${attrKey}"]`);
      if (valueEl && attrData.value !== undefined) {
        valueEl.value = attrData.value;
        localStorage.setItem(`${attrKey}-value`, attrData.value);
      }
      if (checkEl && attrData.checked !== undefined) {
        if (attrData.checked) checkEl.classList.add('checked');
        else checkEl.classList.remove('checked');
        localStorage.setItem(`${attrKey}-checked`, attrData.checked.toString());
      }
    });
  }

  // 3. 物品栏武器复选框状态
  if (sourceData.weaponCheckboxes) {
    Object.entries(sourceData.weaponCheckboxes).forEach(([id, isChecked]) => {
      const checkbox = document.getElementById(id);
      if (checkbox) {
        checkbox.checked = isChecked;
        localStorage.setItem(id, isChecked.toString());
      }
    });
  }

  // Max values for HP, Stress, Armor - set them first, then states.
  // Order matters: set max, then update grid display, then set checked states.
  ['hpMax', 'stressMax', 'armorMax'].forEach(id => {
    const maxEl = document.getElementById(id);
    if (maxEl && sourceData[id] !== undefined) {
      maxEl.value = sourceData[id];
      localStorage.setItem(id, sourceData[id]);
      // Trigger change to update grids based on new max
      maxEl.dispatchEvent(new Event('change'));
    } else if (maxEl) { // Ensure default if not in sourceData
      maxEl.value = maxEl.getAttribute('data-default-value') || "6";
      localStorage.setItem(id, maxEl.value);
      maxEl.dispatchEvent(new Event('change'));
    }
  });

  // 4. 各种状态数据 (grids, dots)
  if (sourceData.hpState) { setBoxStates("#hp-grid .hp-box", sourceData.hpState); localStorage.setItem("hpState", JSON.stringify(sourceData.hpState)); }
  if (sourceData.stressState) { setBoxStates("#stress-grid .stress-box", sourceData.stressState); localStorage.setItem("stressState", JSON.stringify(sourceData.stressState)); }
  if (sourceData.armorState) { setBoxStates("#armor-grid .armor-box", sourceData.armorState); localStorage.setItem("armorState", JSON.stringify(sourceData.armorState)); }
  if (sourceData.hopeState) { setBoxStates("#hope-grid .hope-diamond", sourceData.hopeState, false); localStorage.setItem("hopeState", JSON.stringify(sourceData.hopeState)); }
  if (sourceData.goldState) { setBoxStates("#gold-handfuls .gold-coin, #gold-bags .gold-coin-bag, #gold-chest .gold-coin-chest", sourceData.goldState); localStorage.setItem("goldState", JSON.stringify(sourceData.goldState)); }
  if (sourceData.proficiencyState) { setBoxStates("#proficiency-dots .proficiency-dot", sourceData.proficiencyState, false); localStorage.setItem("proficiencyState", JSON.stringify(sourceData.proficiencyState)); }

  // 5. 经验列表数据
  if (sourceData.experienceData) {
    sourceData.experienceData.forEach((exp, i) => {
      const descEl = document.getElementById(`experience-${i}`);
      const valueEl = document.getElementById(`experience-value-${i}`);
      if (descEl) { descEl.value = exp.desc || ""; localStorage.setItem(`experience-${i}`, descEl.value); }
      if (valueEl) { valueEl.value = exp.value || ""; localStorage.setItem(`experience-value-${i}`, valueEl.value); }
    });
  }

  // 6. 物品栏数据
  if (sourceData.inventoryData) {
    sourceData.inventoryData.forEach((item, i) => {
      const el = document.getElementById(`inventory-${i}`);
      if (el) { el.value = item || ""; localStorage.setItem(`inventory-${i}`, el.value); }
    });
  }

  // 7. 卡组数据
  if (sourceData.cardData) {
    sourceData.cardData.forEach((card, i) => {
      const fields = { 'name': card.name, 'type': card.type, 'level': card.level, 'recall': card.recall };
      Object.entries(fields).forEach(([key, val]) => {
        const el = document.getElementById(`card-${key}-${i}`);
        if (el) { el.value = val || ""; localStorage.setItem(`card-${key}-${i}`, el.value); }
      });
    });
  }

  // 8. Profession and Upgrades (crucial order)
  const loadedProfessionId = sourceData.profession || "";
  localStorage.setItem("characterProfession", loadedProfessionId); // Prime LS for profession

  // Prime LS for upgrade states of the loaded profession
  if (loadedProfessionId && sourceData.upgradeStates && sourceData.upgradeStates[loadedProfessionId]) {
    const profUpgradeStates = sourceData.upgradeStates[loadedProfessionId];
    for (let tier = 1; tier <= 3; tier++) {
      if (profUpgradeStates[`tier${tier}`]) {
        const tierStates = profUpgradeStates[`tier${tier}`];
        Object.entries(tierStates).forEach(([optBoxKey, isChecked]) => { // optBoxKey is like opt0_box0
          // Reconstruct the full localStorage key
          // e.g. upgrade-warrior-tier1-opt0-box0
          const key = `upgrade-${loadedProfessionId}-tier${tier}-${optBoxKey}`;
          localStorage.setItem(key, isChecked.toString());
        });
      }
    }
  }

  // Set profession dropdowns
  const professionSelect1 = document.getElementById("profession");
  const professionSelect2 = document.getElementById("profession-page2");
  if (professionSelect1) professionSelect1.value = loadedProfessionId;
  if (professionSelect2) professionSelect2.value = loadedProfessionId;

  // Manually trigger the core logic of handleProfessionChange to update UI
  // This avoids potential issues with dispatchEvent not always behaving as expected across all browsers/setups
  const profNameElement = document.getElementById("profession-name");
  if (profNameElement) {
    profNameElement.textContent = getProfessionName(loadedProfessionId);
  }
  initUpgradeOptions(loadedProfessionId); // Rebuild DOM for new profession's upgrades
  loadUpgradeStatesForProfession(loadedProfessionId); // Load (from LS) states for these new upgrades

  // For weapon/armor selects, after setting their value, dependent fields are already set from JSON.
  // If they were not, we'd dispatch 'change' event:
  // ['primaryWeaponName', 'secondaryWeaponName', 'inventoryWeapon1Name', 'inventoryWeapon2Name', 'armorName'].forEach(id => {
  //   const selectEl = document.getElementById(id);
  //   if (selectEl && sourceData[id] !== undefined) selectEl.dispatchEvent(new Event('change'));
  // });
}


// 加载角色数据 (from JSON file)
function loadCharacter() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".json";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);

          // 0. Reset existing character state (DOM and MOST of localStorage)
          // We do a soft reset here, mainly clearing DOM, then fillFormData will overwrite LS.
          // A full resetCharacter() call might be too much if it reloads or fully re-inits everything
          // before fillFormData gets the specific loaded data.
          document.querySelectorAll('input[type="text"], input[type="number"], textarea').forEach(el => el.value = '');
          document.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);
          document.querySelectorAll('select').forEach(el => el.selectedIndex = 0); // Reset selects
          document.querySelectorAll(".hp-box, .stress-box, .armor-box, .hope-diamond, .gold-coin, .gold-coin-bag, .gold-coin-chest, .proficiency-dot, .attribute-check")
            .forEach(el => el.classList.remove("checked"));
          // Clear previous upgrade DOM
          for (let tier = 1; tier <= 3; tier++) {
            const upgradeList = document.getElementById(`tier${tier}-upgrades`);
            if (upgradeList) upgradeList.innerHTML = "";
          }
          // Clear specific localStorage items that might conflict if not overwritten by fillFormData
          // This part is tricky; fillFormData should ideally overwrite all necessary LS keys.

          // 1. Fill form from JSON data (this will also update DOM and localStorage)
          fillFormData(jsonData);

          alert("角色数据已从文件加载！");
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


// 重置角色表单
function resetCharacter() {
  if (!confirm("你确定要重置角色表吗？所有本地存储的更改都将丢失。")) {
    return;
  }

  // 1. Clear all known localStorage keys
  const keysInLocalStorage = [];
  for (let i = 0; i < localStorage.length; i++) {
    keysInLocalStorage.push(localStorage.key(i));
  }
  // Filter for keys that this application might have set (e.g. no "loglevel" or other unrelated keys)
  // This is a heuristic; a more robust way is to list all keys explicitly.
  const appPrefixes = ["character", "level", "community", "ancestry", "subclass", "evasion", "armor", "minor", "major", "hp", "stress", "primary", "secondary", "inventory", "experience", "gold", "proficiency", "card-", "upgrade-", "agility", "strength", "finesse", "instinct", "presence", "knowledge"];

  keysInLocalStorage.forEach(key => {
    if (appPrefixes.some(prefix => key.startsWith(prefix))) {
      localStorage.removeItem(key);
    }
  });
  // Explicitly remove some common ones not fitting prefixes well
  localStorage.removeItem("hopeState");


  // 2. Reset DOM elements to initial state and re-initialize
  // Simplest and most robust way is to reload the page.
  // All initialization logic in DOMContentLoaded will run, and loadFromLocalStorage will find nothing.
  location.reload();

  // If a reload is not desired, a more complex manual reset would be:
  // initCharacterSheet(); // Rebuilds structure, re-attaches listeners
  // markDefaultElements();
  // loadFromLocalStorage(); // Will load defaults as localStorage is now empty
  // // Manually reset profession selects and name if not handled by above
  // const profSelect1 = document.getElementById("profession");
  // const profSelect2 = document.getElementById("profession-page2");
  // if (profSelect1) profSelect1.value = "";
  // if (profSelect2) profSelect2.value = "";
  // const profNameEl = document.getElementById("profession-name");
  // if (profNameEl) profNameEl.textContent = "";
  // initUpgradeOptions(""); // Clear/reinit upgrades for no profession
  // alert("角色表已重置。");
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

  // Max values: hpMax, stressMax, armorMax
  ['hpMax', 'stressMax', 'armorMax'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const storedVal = localStorage.getItem(id);
      if (storedVal !== null) el.value = storedVal;
      else if (el.dataset.hasDefault === "true") el.value = el.dataset.defaultValue || "6";
      updateBoxesMax(document.getElementById(id.replace('Max', '-grid')), id.replace('Max', '-box'), parseInt(el.value) || 6);
    }
  });

  // Attributes
  const attributeKeys = ["agility", "strength", "finesse", "instinct", "presence", "knowledge"];
  attributeKeys.forEach(attrKey => {
    const valueEl = document.getElementById(`${attrKey}-value`);
    const checkEl = document.querySelector(`.attribute-check[data-attribute="${attrKey}"]`);
    if (valueEl) valueEl.value = localStorage.getItem(`${attrKey}-value`) || "";
    if (checkEl && localStorage.getItem(`${attrKey}-checked`) === "true") checkEl.classList.add("checked");
    else if (checkEl) checkEl.classList.remove("checked");
  });

  // Weapon/Armor Selects (Name fields)
  // These need to trigger change to populate dependent fields if not already loaded or if behavior relies on it
  ['primaryWeaponName', 'secondaryWeaponName', 'inventoryWeapon1Name', 'inventoryWeapon2Name', 'armorName'].forEach(id => {
    const selectEl = document.getElementById(id);
    if (selectEl) {
      const storedValue = localStorage.getItem(id);
      if (storedValue !== null) {
        selectEl.value = storedValue;
        selectEl.dispatchEvent(new Event('change')); // Ensure dependent fields update
      }
    }
  });

  // Weapon Checkboxes
  ["inventoryWeapon1Primary", "inventoryWeapon1Secondary", "inventoryWeapon2Primary", "inventoryWeapon2Secondary"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.checked = localStorage.getItem(id) === "true";
  });

  // Grids/Dots states
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
  loadProficiencyDotsState(); // Separate load for proficiency

  // Inventory items
  for (let i = 0; i < 5; i++) {
    const invItem = document.getElementById(`inventory-${i}`);
    if (invItem) invItem.value = localStorage.getItem(`inventory-${i}`) || "";
  }

  // Experience
  for (let i = 0; i < 5; i++) {
    const expDesc = document.getElementById(`experience-${i}`);
    if (expDesc) expDesc.value = localStorage.getItem(`experience-${i}`) || "";
    const expValue = document.getElementById(`experience-value-${i}`);
    if (expValue) expValue.value = localStorage.getItem(`experience-value-${i}`) || "";
  }

  // Card Deck
  for (let i = 0; i < 20; i++) {
    ['card-name', 'card-type', 'card-level', 'card-recall'].forEach(field => {
      const input = document.getElementById(`${field}-${i}`);
      if (input) input.value = localStorage.getItem(`${field}-${i}`) || "";
    });
  }

  // Profession - this is crucial and should trigger upgrade loading
  const currentProfessionId = localStorage.getItem("characterProfession") || "";
  const professionSelect1 = document.getElementById("profession");
  const professionSelect2 = document.getElementById("profession-page2");

  if (professionSelect1) professionSelect1.value = currentProfessionId;
  if (professionSelect2) professionSelect2.value = currentProfessionId;

  const profNameElement = document.getElementById("profession-name");
  if (profNameElement) profNameElement.textContent = getProfessionName(currentProfessionId);

  // Call initUpgradeOptions for the loaded profession, then load its states
  // This is also handled by the profession change handler logic if it were triggered,
  // but direct call ensures it happens on initial loadFromLocalStorage.
  if (currentProfessionId) { // Only if a profession is actually set
    initUpgradeOptions(currentProfessionId);
    loadUpgradeStatesForProfession(currentProfessionId);
  } else {
    initUpgradeOptions(); // Initialize with no specific profession (clears upgrades)
  }

  // markDefaultElements(); // Can be called here, but often called once at DOMContentLoaded
}

// Placeholder for exportToPDF if you have it
function exportToPDF() {
  alert("导出PDF功能尚未实现。Export to PDF function not yet implemented.");
}