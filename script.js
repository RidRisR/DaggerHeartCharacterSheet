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
    professionSelect1.value = selectedProfessionId;
    professionSelect2.value = selectedProfessionId;

    const profNameElement = document.getElementById("profession-name");
    if (profNameElement) {
      profNameElement.textContent = getProfessionName(selectedProfessionId);
    }
    localStorage.setItem("characterProfession", selectedProfessionId);
    initUpgradeOptions(); // Rebuild DOM for new profession's upgrades
    loadUpgradeStatesForProfession(selectedProfessionId); // Load saved states for these new upgrades
  }

  professionSelect1.addEventListener("change", function () {
    handleProfessionChange(this.value);
  });

  professionSelect2.addEventListener("change", function () {
    handleProfessionChange(this.value);
  });

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
  initUpgradeOptions()

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

    // Use the global 'professions' object from data.js
    Object.values(professions).forEach(prof => {
      const option = document.createElement('option');
      option.value = prof.id;
      option.textContent = prof.name; // Assumes 'name' is already translated in data.js
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

    // Use the global 'ancestryData' from data.js
    ancestryData.forEach(ancestry => {
      const option = document.createElement('option');
      option.value = ancestry.id;
      option.textContent = ancestry.name; // Assumes 'name' is translated
      select.appendChild(option);
    });
  });
}

// 初始化社群选择框
function initCommunitySelects() {
  const select = document.getElementById('community');
  if (!select) return;
  select.innerHTML = '<option value=""></option>'; // Default empty option

  // Use the global 'communityData' from data.js
  communityData.forEach(community => {
    const option = document.createElement('option');
    option.value = community.id;
    option.textContent = community.name; // Assumes 'name' is translated
    select.appendChild(option);
  });
}

// 标记默认值元素
function markDefaultElements() {
  // 标记有默认值的元素
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

  // 标记所有选择框
  document.querySelectorAll("select").forEach((select) => {
    select.setAttribute("data-has-default", "true")
  })
}

// 处理打印
function handlePrint() {
  // 保存当前值
  const savedValues = {}

  // 获取所有带默认值的元素
  const defaultElements = document.querySelectorAll("[data-has-default='true']")

  // 保存当前值并清空
  defaultElements.forEach((element) => {
    savedValues[element.id] = element.value

    // 如果值等于默认值，则清空
    if (
      element.value === element.getAttribute("data-default-value") ||
      (element.tagName === "SELECT" && (element.value === "" || element.value === "none"))
    ) {
      element.value = ""
    }
  })

  // 触发打印
  window.print()

  // 打印完成后恢复值
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

    // 添加属性勾选事件
    const attributeCheck = attributeDiv.querySelector(".attribute-check")
    attributeCheck.addEventListener("click", function () {
      this.classList.toggle("checked")
      localStorage.setItem(`${attr.key}-checked`, this.classList.contains("checked"))
    })

    // 添加属性值变更事件
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
      if (i >= 6) { // Default max
        box.classList.add("disabled")
      }
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
      if (i >= 6) { // Default max
        box.classList.add("disabled")
      }
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
    });
  }

  const stressMaxEl = document.getElementById("stressMax");
  if (stressMaxEl) {
    stressMaxEl.addEventListener("change", function () {
      const max = Number.parseInt(this.value) || 6
      updateBoxesMax(stressGrid, "stress-box", max)
      localStorage.setItem("stressMax", max.toString())
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
      box.classList.remove("checked") // Uncheck boxes beyond the new max
      box.classList.add("disabled")
    }
  })
  // saveHPStressState or saveArmorState will be called by the max change handler indirectly or directly
}

// 保存HP和Stress状态
function saveHPStressState() {
  const hpState = []
  document.querySelectorAll("#hp-grid .hp-box").forEach((box, index) => {
    hpState[index] = box.classList.contains("checked")
  })

  const stressState = []
  document.querySelectorAll("#stress-grid .stress-box").forEach((box, index) => {
    stressState[index] = box.classList.contains("checked")
  })

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
    if (i >= 6) { // Default max
      box.classList.add("disabled")
    }
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
      saveArmorState(); // Also save state when max changes
    });
  }
}

// 保存护甲状态
function saveArmorState() {
  const armorState = []
  document.querySelectorAll("#armor-grid .armor-box").forEach((box, index) => {
    armorState[index] = box.classList.contains("checked")
  })
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
  const hopeState = []
  document.querySelectorAll("#hope-grid .hope-diamond").forEach((diamond, index) => {
    hopeState[index] = diamond.classList.contains("checked")
  })
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

    const expDesc = item.querySelector(`.experience-desc`);
    expDesc.addEventListener("change", function () {
      localStorage.setItem(`experience-${i}`, this.value);
    });

    const expValue = item.querySelector(`.experience-value`);
    expValue.addEventListener("change", function () {
      localStorage.setItem(`experience-value-${i}`, this.value);
    });
  }
}

// 初始化金币格子
function initGoldCoins() {
  const handfulGrid = document.getElementById("gold-handfuls")
  const bagsGrid = document.getElementById("gold-bags")
  const chestGrid = document.getElementById("gold-chest")

  if (handfulGrid) {
    handfulGrid.innerHTML = ""
    for (let i = 0; i < 10; i++) {
      const coin = document.createElement("div")
      coin.className = "gold-coin"
      coin.dataset.index = i // For handfuls
      coin.addEventListener("click", function () {
        this.classList.toggle("checked")
        saveGoldState()
      })
      handfulGrid.appendChild(coin)
    }
  }

  if (bagsGrid) {
    bagsGrid.innerHTML = ""
    for (let i = 0; i < 10; i++) {
      const coin = document.createElement("div")
      coin.className = "gold-coin-bag" // Differentiate class for potential styling
      coin.dataset.index = i + 10 // For bags, continue index
      coin.addEventListener("click", function () {
        this.classList.toggle("checked")
        saveGoldState()
      })
      bagsGrid.appendChild(coin)
    }
  }

  if (chestGrid) {
    chestGrid.innerHTML = ""
    for (let i = 0; i < 1; i++) { // Only 1 chest
      const coin = document.createElement("div")
      coin.className = "gold-coin-chest" // Differentiate class
      coin.dataset.index = i + 20 // For chest
      coin.addEventListener("click", function () {
        this.classList.toggle("checked")
        saveGoldState()
      })
      chestGrid.appendChild(coin)
    }
  }
}

// 保存金币状态 (Updated to cover all types)
function saveGoldState() {
  const goldState = [] // Single array for all gold items based on their data-index
  document.querySelectorAll("#gold-handfuls .gold-coin, #gold-bags .gold-coin-bag, #gold-chest .gold-coin-chest").forEach((coin) => {
    // Ensure data-index is a number and use it for the array
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
  // No need to call loadProficiencyDotsState here, main loadFromLocalStorage will handle it
}

// 保存熟练度点状态
function saveProficiencyDotsState() {
  const proficiencyState = []
  document.querySelectorAll("#proficiency-dots .proficiency-dot").forEach((dot, index) => {
    proficiencyState[index] = dot.classList.contains("checked")
  })
  localStorage.setItem("proficiencyState", JSON.stringify(proficiencyState))
}

// 加载熟练度点状态 (This function is kept for potential direct use, but loadFromLocalStorage handles initial load)
function loadProficiencyDotsState() {
  try {
    const proficiencyState = JSON.parse(localStorage.getItem("proficiencyState"))
    if (proficiencyState) {
      document.querySelectorAll("#proficiency-dots .proficiency-dot").forEach((dot, index) => {
        if (proficiencyState[index]) {
          dot.classList.add("checked")
        } else {
          dot.classList.remove("checked")
        }
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
    item.placeholder = `Item ${i + 1}` // Placeholder text
    item.addEventListener("change", function () {
      localStorage.setItem(`inventory-${i}`, this.value)
    })
    inventoryList.appendChild(item)
  }
}

// 初始化武器下拉框
function initWeaponSelects() {
  const weaponSelectIds = ["primaryWeaponName", "secondaryWeaponName", "inventoryWeapon1Name", "inventoryWeapon2Name"];

  // weaponData is now global, from data.js
  if (typeof weaponData === 'undefined') {
    console.error("weaponData is not defined. Make sure data.js is loaded before script.js");
    return;
  }

  weaponSelectIds.forEach((selectId) => {
    const select = document.getElementById(selectId);
    if (!select) return;

    select.innerHTML = '<option value=""></option>'; // Default empty

    const noneOption = document.createElement("option");
    noneOption.value = "none";
    noneOption.textContent = "None"; // Or "无" if translated in JS
    select.appendChild(noneOption);

    weaponData.forEach((weapon) => {
      const option = document.createElement("option");
      option.value = weapon.id;
      option.textContent = weapon.name; // Assumes name is translated in data.js
      select.appendChild(option);
    });

    select.addEventListener("change", function () {
      const weaponId = this.value;
      // Find weapon in global weaponData
      const selectedWeapon = weaponData.find((w) => w.id === weaponId);
      const baseId = this.id.replace("Name", ""); // e.g., "primaryWeapon"

      if (selectedWeapon && weaponId !== "none") {
        document.getElementById(`${baseId}Trait`).value = selectedWeapon.trait || "";
        document.getElementById(`${baseId}Damage`).value = selectedWeapon.damage || "";
        document.getElementById(`${baseId}Feature`).value = selectedWeapon.feature || "";

        localStorage.setItem(this.id, weaponId);
        localStorage.setItem(`${baseId}Trait`, selectedWeapon.trait || "");
        localStorage.setItem(`${baseId}Damage`, selectedWeapon.damage || "");
        localStorage.setItem(`${baseId}Feature`, selectedWeapon.feature || "");
      } else {
        // Clear fields if "None" or empty is selected
        document.getElementById(`${baseId}Trait`).value = "";
        document.getElementById(`${baseId}Damage`).value = "";
        document.getElementById(`${baseId}Feature`).value = "";

        localStorage.setItem(this.id, weaponId); // Store "none" or ""
        localStorage.setItem(`${baseId}Trait`, "");
        localStorage.setItem(`${baseId}Damage`, "");
        localStorage.setItem(`${baseId}Feature`, "");
      }
    });
  });

  // Event listeners for inventory weapon checkboxes
  const invWpn1Primary = document.getElementById("inventoryWeapon1Primary");
  if (invWpn1Primary) invWpn1Primary.addEventListener("change", function () { localStorage.setItem("inventoryWeapon1Primary", this.checked); });

  const invWpn1Secondary = document.getElementById("inventoryWeapon1Secondary");
  if (invWpn1Secondary) invWpn1Secondary.addEventListener("change", function () { localStorage.setItem("inventoryWeapon1Secondary", this.checked); });

  const invWpn2Primary = document.getElementById("inventoryWeapon2Primary");
  if (invWpn2Primary) invWpn2Primary.addEventListener("change", function () { localStorage.setItem("inventoryWeapon2Primary", this.checked); });

  const invWpn2Secondary = document.getElementById("inventoryWeapon2Secondary");
  if (invWpn2Secondary) invWpn2Secondary.addEventListener("change", function () { localStorage.setItem("inventoryWeapon2Secondary", this.checked); });
}

// 初始化护甲下拉框
function initArmorSelect() {
  const armorSelect = document.getElementById("armorName");
  if (!armorSelect) return;

  // armorData is now global, from data.js
  if (typeof armorData === 'undefined') {
    console.error("armorData is not defined. Make sure data.js is loaded before script.js");
    return;
  }

  armorSelect.innerHTML = '<option value=""></option>'; // Default empty

  const noneOption = document.createElement("option");
  noneOption.value = "none";
  noneOption.textContent = "None"; // Or "无"
  armorSelect.appendChild(noneOption);

  armorData.forEach((armor) => {
    const option = document.createElement("option");
    option.value = armor.id;
    option.textContent = armor.name; // Assumes name is translated in data.js
    armorSelect.appendChild(option);
  });

  armorSelect.addEventListener("change", function () {
    const armorId = this.value;
    // Find armor in global armorData
    const selectedArmor = armorData.find((a) => a.id === armorId);

    if (selectedArmor && armorId !== "none") {
      document.getElementById("armorBaseScore").value = selectedArmor.baseScore || "";
      document.getElementById("armorFeature").value = selectedArmor.feature || "";

      localStorage.setItem("armorName", armorId);
      localStorage.setItem("armorBaseScore", selectedArmor.baseScore || "");
      localStorage.setItem("armorFeature", selectedArmor.feature || "");
    } else {
      document.getElementById("armorBaseScore").value = "";
      document.getElementById("armorFeature").value = "";

      localStorage.setItem("armorName", armorId); // Store "none" or ""
      localStorage.setItem("armorBaseScore", "");
      localStorage.setItem("armorFeature", "");
    }
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
    `; // Changed card-name id to card-name-${i} for consistency
    cardGrid.appendChild(item);

    const fields = ['card-name', 'card-type', 'card-level', 'card-recall'];
    fields.forEach(field => {
      const input = item.querySelector(`#${field}-${i}`);
      if (input) {
        input.addEventListener("change", function () {
          localStorage.setItem(`${field}-${i}`, this.value);
        });
      }
    });
  }
}

// Helper function to get combined upgrade options for a profession and tier
function getUpgradeOptions(professionId, tier) {
  const options = [];
  // Ensure upgradeOptionsData and professions are available
  if (typeof upgradeOptionsData === 'undefined' || typeof professions === 'undefined') {
    console.error("Data objects (upgradeOptionsData or professions) not defined.");
    return options;
  }

  const baseUpgrades = upgradeOptionsData.baseUpgrades || [];
  const tierSpecific = upgradeOptionsData.tierSpecificUpgrades?.[`tier${tier}`] || [];

  // Get profession-specific upgrades from the new 'professions' structure
  const professionSpecificUpgrades = professions[professionId]?.upgrades?.[`tier${tier}`] || [];

  options.push(...baseUpgrades);
  // Tier-specific upgrades (like multiclass) are typically added from tier 2 onwards based on Daggerheart structure.
  // Adjust this logic if Daggerheart rules differ.
  if (tierSpecific.length > 0) { // Check if tierSpecific exists for this tier
    options.push(...tierSpecific);
  }
  options.push(...professionSpecificUpgrades);

  return options;
}


// 初始化升级选项
function initUpgradeOptions() {
  const currentProfessionId = document.getElementById("profession")?.value ||
    (localStorage.getItem("characterProfession") || Object.keys(professions)[0]); // Fallback to first profession if none selected/saved


  for (let tier = 1; tier <= 3; tier++) {
    const upgradeList = document.getElementById(`tier${tier}-upgrades`);
    if (!upgradeList) continue;
    upgradeList.innerHTML = "";

    const options = getUpgradeOptions(currentProfessionId, tier);

    options.forEach((option, index) => {
      const item = document.createElement("div");
      item.className = "upgrade-item";
      // Ensure option.label exists
      const labelText = option && option.label ? option.label : `Upgrade Option ${index + 1}`;


      if (option.doubleBox) {
        item.innerHTML = `
          <div class="upgrade-double-box">
            <div class="upgrade-box" data-tier="${tier}" data-index="${index}"></div>
            <div class="upgrade-box" data-tier="${tier}" data-index="${index}"></div>
          </div>
          <span class="upgrade-label">${labelText}</span>
        `;
      } else {
        item.innerHTML = `
          <div class="upgrade-box" data-tier="${tier}" data-index="${index}"></div>
          <span class="upgrade-label">${labelText}</span>
        `;
      }
      upgradeList.appendChild(item);

      const boxes = item.querySelectorAll(".upgrade-box");
      boxes.forEach((box) => {
        box.addEventListener("click", function () {
          this.classList.toggle("checked");
          // saveUpgradeState needs to be aware of the current profession if state is per profession
          // For now, using index-based saving as per original implication.
          saveUpgradeState(tier, index, this.classList.contains("checked"));
        });
      });
    });
  }
}

// Placeholder: saveUpgradeState - current method saves by index, not ideal for multi-profession
function saveUpgradeState(tier, index, isChecked) {
  // Key is generic: upgrade-tierX-indexY
  // This means state for Warrior's tier 1, 1st option will use the same key as
  // Mage's tier 1, 1st option if you switch professions.
  // A robust solution needs unique IDs for options or profession-specific keys.
  const key = `upgrade-tier${tier}-${index}`;
  localStorage.setItem(key, isChecked.toString());
}

// Load upgrade states for the currently selected profession
function loadUpgradeStatesForProfession(professionId) {
  for (let tier = 1; tier <= 3; tier++) {
    const options = getUpgradeOptions(professionId, tier);
    const upgradeList = document.getElementById(`tier${tier}-upgrades`); // Get the container
    if (!upgradeList) continue;

    options.forEach((option, index) => {
      const key = `upgrade-tier${tier}-${index}`; // Generic key
      const checked = localStorage.getItem(key) === "true";

      // Find the specific boxes in the DOM using data-tier and data-index
      const boxes = upgradeList.querySelectorAll(`.upgrade-box[data-tier="${tier}"][data-index="${index}"]`);
      boxes.forEach(box => {
        if (checked) {
          box.classList.add("checked");
        } else {
          box.classList.remove("checked");
        }
      });
    });
  }
}


// 获取职业名称 (Updated to use global 'professions' object)
function getProfessionName(professionId) {
  if (typeof professions === 'undefined') {
    console.error("Professions data not loaded.");
    return professionId || ""; // Fallback
  }
  if (professions && professionId && professions[professionId]) {
    return professions[professionId].name; // Assumes name is translated in data.js
  }
  return ""; // Return empty if not found or ID is empty
}

// 保存角色数据
function saveCharacter() {
  const formData = {};
  const formElements = [
    "characterName", "profession", "level", "community", "ancestry1", "ancestry2", "subclass",
    "evasion", "armorValue", "armorMax", "minorThreshold", "majorThreshold", "hpMax", "stressMax",
    "primaryWeaponName", "primaryWeaponTrait", "primaryWeaponDamage", "primaryWeaponFeature",
    "secondaryWeaponName", "secondaryWeaponTrait", "secondaryWeaponDamage", "secondaryWeaponFeature",
    "armorName", "armorBaseScore", "armorFeature",
    "inventoryWeapon1Name", "inventoryWeapon1Trait", "inventoryWeapon1Damage", "inventoryWeapon1Feature",
    "inventoryWeapon2Name", "inventoryWeapon2Trait", "inventoryWeapon2Damage", "inventoryWeapon2Feature",
    "characterBackground", "characterAppearance", "characterMotivation"
  ];

  formElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) formData[id] = element.value;
  });

  const attributes = ["agility", "strength", "finesse", "instinct", "presence", "knowledge"];
  attributes.forEach((attr) => {
    const valueEl = document.getElementById(`${attr}-value`);
    if (valueEl) formData[`${attr}-value`] = valueEl.value;
    const checkEl = document.querySelector(`.attribute-check[data-attribute="${attr}"]`);
    if (checkEl) formData[`${attr}-checked`] = checkEl.classList.contains("checked");
  });

  const invWpn1Primary = document.getElementById("inventoryWeapon1Primary");
  if (invWpn1Primary) formData.inventoryWeapon1Primary = invWpn1Primary.checked;
  const invWpn1Secondary = document.getElementById("inventoryWeapon1Secondary");
  if (invWpn1Secondary) formData.inventoryWeapon1Secondary = invWpn1Secondary.checked;
  const invWpn2Primary = document.getElementById("inventoryWeapon2Primary");
  if (invWpn2Primary) formData.inventoryWeapon2Primary = invWpn2Primary.checked;
  const invWpn2Secondary = document.getElementById("inventoryWeapon2Secondary");
  if (invWpn2Secondary) formData.inventoryWeapon2Secondary = invWpn2Secondary.checked;

  // Note: States for HP, Stress, Armor boxes, Hope, Gold, Proficiency, Upgrades are saved directly to localStorage by their respective functions.
  // If you want them in the JSON file, they need to be collected here too.
  // For simplicity, this saveCharacter function matches the original scope of saved data.

  const jsonData = JSON.stringify(formData);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${formData.characterName || "character"}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  alert("角色数据已保存到文件！(部分状态如勾选框等仍保存在浏览器本地存储)");
}

// 加载角色数据 (from JSON file)
function loadCharacter() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".json";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  fileInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const formData = JSON.parse(event.target.result);
          fillFormData(formData); // Fills form inputs

          // After filling form (which sets profession), load relevant dynamic states
          // like upgrades for that profession from localStorage (if not in JSON)
          const loadedProfession = formData.profession || document.getElementById("profession").value;
          initUpgradeOptions(); // Rebuild upgrade DOM for the loaded profession
          loadUpgradeStatesForProfession(loadedProfession); // Load their states from localStorage

          // Other dynamic states (HP, stress, etc.) are typically loaded by loadFromLocalStorage on page init.
          // If the JSON file should be the single source of truth, fillFormData would need to handle them.
          // For now, assume JSON loads primary fields, and localStorage handles checkbox states.

          alert("角色数据已从文件加载！请注意检查所有勾选框和动态状态。");
        } catch (error) {
          console.error("加载角色数据失败:", error);
          alert("加载角色数据失败，请确保文件格式正确。");
        }
      };
      reader.readAsText(e.target.files[0]);
    }
    document.body.removeChild(fileInput);
  });

  fileInput.click();
}


// 填充表单数据 (from JSON object or localStorage object)
function fillFormData(sourceData) {
  // Basic Info
  document.getElementById("characterName").value = sourceData.characterName || "";
  const professionValue = sourceData.profession || sourceData.characterProfession || ""; // characterProfession from LS
  document.getElementById("profession").value = professionValue;
  document.getElementById("profession-page2").value = professionValue;
  const profNameElement = document.getElementById("profession-name");
  if (profNameElement) {
    profNameElement.textContent = getProfessionName(professionValue);
  }
  document.getElementById("level").value = sourceData.level || "";
  document.getElementById("community").value = sourceData.community || "";
  document.getElementById("ancestry1").value = sourceData.ancestry1 || "none";
  document.getElementById("ancestry2").value = sourceData.ancestry2 || "none";
  document.getElementById("subclass").value = sourceData.subclass || "";

  // Attributes
  const attributes = ["agility", "strength", "finesse", "instinct", "presence", "knowledge"];
  attributes.forEach((attr) => {
    document.getElementById(`${attr}-value`).value = sourceData[`${attr}-value`] || "";
    const attributeCheck = document.querySelector(`.attribute-check[data-attribute="${attr}"]`);
    if (attributeCheck) {
      if (sourceData[`${attr}-checked`] === true || sourceData[`${attr}-checked`] === "true") {
        attributeCheck.classList.add("checked");
      } else {
        attributeCheck.classList.remove("checked");
      }
    }
  });

  // Evasion & Armor Value (inputs)
  document.getElementById("evasion").value = sourceData.evasion || "10";
  document.getElementById("armorValue").value = sourceData.armorValue || "";

  // Max values & update grids
  const armorMax = Number.parseInt(sourceData.armorMax) || 6;
  document.getElementById("armorMax").value = armorMax.toString();
  updateBoxesMax(document.getElementById("armor-grid"), "armor-box", armorMax);

  const hpMax = Number.parseInt(sourceData.hpMax) || 6;
  document.getElementById("hpMax").value = hpMax.toString();
  updateBoxesMax(document.getElementById("hp-grid"), "hp-box", hpMax);

  const stressMax = Number.parseInt(sourceData.stressMax) || 6;
  document.getElementById("stressMax").value = stressMax.toString();
  updateBoxesMax(document.getElementById("stress-grid"), "stress-box", stressMax);

  // Thresholds
  document.getElementById("minorThreshold").value = sourceData.minorThreshold || "7";
  document.getElementById("majorThreshold").value = sourceData.majorThreshold || "14";

  // Weapons & Armor (selected items) - trigger change to update dependent fields
  function setSelectAndTriggerChange(selectId, value) {
    const selectElement = document.getElementById(selectId);
    if (selectElement) {
      selectElement.value = value || "";
      selectElement.dispatchEvent(new Event('change')); // Trigger change to populate related fields
    }
  }

  setSelectAndTriggerChange("primaryWeaponName", sourceData.primaryWeaponName);
  setSelectAndTriggerChange("secondaryWeaponName", sourceData.secondaryWeaponName);
  setSelectAndTriggerChange("armorName", sourceData.armorName);
  setSelectAndTriggerChange("inventoryWeapon1Name", sourceData.inventoryWeapon1Name);
  setSelectAndTriggerChange("inventoryWeapon2Name", sourceData.inventoryWeapon2Name);

  // Inventory Weapon Checkboxes
  const invWpn1Primary = document.getElementById("inventoryWeapon1Primary");
  if (invWpn1Primary) invWpn1Primary.checked = sourceData.inventoryWeapon1Primary === true || sourceData.inventoryWeapon1Primary === "true";
  const invWpn1Secondary = document.getElementById("inventoryWeapon1Secondary");
  if (invWpn1Secondary) invWpn1Secondary.checked = sourceData.inventoryWeapon1Secondary === true || sourceData.inventoryWeapon1Secondary === "true";
  const invWpn2Primary = document.getElementById("inventoryWeapon2Primary");
  if (invWpn2Primary) invWpn2Primary.checked = sourceData.inventoryWeapon2Primary === true || sourceData.inventoryWeapon2Primary === "true";
  const invWpn2Secondary = document.getElementById("inventoryWeapon2Secondary");
  if (invWpn2Secondary) invWpn2Secondary.checked = sourceData.inventoryWeapon2Secondary === true || sourceData.inventoryWeapon2Secondary === "true";


  // Character Description
  document.getElementById("characterBackground").value = sourceData.characterBackground || "";
  document.getElementById("characterAppearance").value = sourceData.characterAppearance || "";
  document.getElementById("characterMotivation").value = sourceData.characterMotivation || "";

  // If sourceData is from a full character file (not just localStorage),
  // you might want to save all these values to localStorage as well.
  // For now, this function just populates the form.
  // The original `loadCharacter` saved all `formData` to localStorage.
  if (sourceData !== localStorage) { // Avoid re-saving if source is already localStorage
    for (const key in sourceData) {
      if (Object.hasOwnProperty.call(sourceData, key)) {
        const value = sourceData[key];
        localStorage.setItem(key, typeof value === "boolean" ? value.toString() : value || "");
      }
    }
  }
}


// 导出为PDF
function exportToPDF() {
  alert("PDF导出功能正在开发中，请暂时使用浏览器的打印功能（Ctrl+P或Cmd+P）保存为PDF。");
}

// 重置角色数据
function resetCharacter() {
  if (confirm("确定要重置所有数据吗？这将清除所有已填写的信息和浏览器本地存储。")) {
    localStorage.clear();
    location.reload();
  }
}

// 从本地存储加载数据
function loadFromLocalStorage() {
  const localData = {};
  // Collect all relevant localStorage keys into an object
  // This is a simplified way; ideally, you'd list all keys you expect.
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    localData[key] = localStorage.getItem(key);
  }
  fillFormData(localData); // Use fillFormData to populate the sheet

  // Load checkbox/grid states that are stored as JSON strings
  try {
    const hpState = JSON.parse(localStorage.getItem("hpState"));
    const hpMax = parseInt(document.getElementById("hpMax").value, 10) || 6;
    if (hpState) {
      document.querySelectorAll("#hp-grid .hp-box").forEach((box, index) => {
        if (hpState[index] && index < hpMax) box.classList.add("checked");
        else box.classList.remove("checked");
      });
    }

    const stressState = JSON.parse(localStorage.getItem("stressState"));
    const stressMax = parseInt(document.getElementById("stressMax").value, 10) || 6;
    if (stressState) {
      document.querySelectorAll("#stress-grid .stress-box").forEach((box, index) => {
        if (stressState[index] && index < stressMax) box.classList.add("checked");
        else box.classList.remove("checked");
      });
    }

    const armorState = JSON.parse(localStorage.getItem("armorState"));
    const armorMaxVal = parseInt(document.getElementById("armorMax").value, 10) || 6;
    if (armorState) {
      document.querySelectorAll("#armor-grid .armor-box").forEach((box, index) => {
        if (armorState[index] && index < armorMaxVal) box.classList.add("checked");
        else box.classList.remove("checked");
      });
    }

    const hopeState = JSON.parse(localStorage.getItem("hopeState"));
    if (hopeState) {
      document.querySelectorAll("#hope-grid .hope-diamond").forEach((diamond, index) => {
        if (hopeState[index]) diamond.classList.add("checked");
        else diamond.classList.remove("checked");
      });
    }

    const goldState = JSON.parse(localStorage.getItem("goldState"));
    if (goldState) {
      document.querySelectorAll("#gold-handfuls .gold-coin, #gold-bags .gold-coin-bag, #gold-chest .gold-coin-chest").forEach((coin) => {
        const index = parseInt(coin.dataset.index, 10);
        if (!isNaN(index) && goldState[index]) {
          coin.classList.add("checked");
        } else {
          coin.classList.remove("checked");
        }
      });
    }

    loadProficiencyDotsState(); // Handles proficiency dots specifically

  } catch (error) {
    console.error("加载状态数据 (HP/Stress/etc.) 失败:", error);
  }

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
    const fields = ['card-name', 'card-type', 'card-level', 'card-recall'];
    fields.forEach(field => {
      const input = document.getElementById(`${field}-${i}`);
      if (input) input.value = localStorage.getItem(`${field}-${i}`) || "";
    });
  }

  // Load upgrade states for the current profession
  const currentProfession = document.getElementById("profession").value;
  // initUpgradeOptions should have already run via initCharacterSheet.
  // Now load the states for whatever DOM it built.
  loadUpgradeStatesForProfession(currentProfession);

  markDefaultElements(); // Re-apply default markings if needed, though mostly for print
}