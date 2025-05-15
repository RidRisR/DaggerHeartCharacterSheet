document.addEventListener("DOMContentLoaded", () => {
  // 初始化标签页
  initTabs()

  // 初始化角色表单元素
  initCharacterSheet()

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
    if (confirm("确定要重置所有数据吗？这将清除所有已填写的信息。")) {
      resetCharacter()
    }
  })

  // 同步两个页面的职业选择
  document.getElementById("profession").addEventListener("change", function () {
    document.getElementById("profession-page2").value = this.value
    document.getElementById("profession-name").textContent = getProfessionName(this.value)
    localStorage.setItem("characterProfession", this.value)
  })

  document.getElementById("profession-page2").addEventListener("change", function () {
    document.getElementById("profession").value = this.value
    document.getElementById("profession-name").textContent = getProfessionName(this.value)
    localStorage.setItem("characterProfession", this.value)
  })

  // 加载角色图像
  document.getElementById("character-image-upload").addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const placeholder = document.getElementById("character-image-placeholder")
        placeholder.innerHTML = ""
        placeholder.style.backgroundImage = `url(${event.target.result})`
        placeholder.style.backgroundSize = "cover"
        placeholder.style.backgroundPosition = "center"

        // 保存图像到本地存储
        localStorage.setItem("characterImage", event.target.result)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  })

  // 尝试从本地存储加载数据
  loadFromLocalStorage()
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

  // 初始化武器下拉框
  initWeaponSelects()

  // 初始化护甲下拉框
  initArmorSelect()

  // 初始化卡组
  initCardDeck()

  // 初始化升级选项
  initUpgradeOptions()
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
    { name: "AGILITY", key: "agility", skills: ["Sprint", "Leap", "Maneuver"] },
    { name: "STRENGTH", key: "strength", skills: ["Lift", "Smash", "Grapple"] },
    { name: "FINESSE", key: "finesse", skills: ["Control", "Hide", "Tinker"] },
    { name: "INSTINCT", key: "instinct", skills: ["Perceive", "Sense", "Navigate"] },
    { name: "PRESENCE", key: "presence", skills: ["Charm", "Perform", "Deceive"] },
    { name: "KNOWLEDGE", key: "knowledge", skills: ["Recall", "Analyze", "Comprehend"] },
  ]

  const attributesGrid = document.querySelector(".attributes-grid")
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
                <input type="text" class="attribute-value" id="${attr.key}-value" placeholder="#">
                <div class="attribute-skills">${attr.skills.join(", ")}</div>
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

  // 生命值格子
  hpGrid.innerHTML = ""
  for (let i = 0; i < 18; i++) {
    const box = document.createElement("div")
    box.className = "hp-box"
    box.dataset.index = i
    if (i >= 6) {
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

  // 压力格子
  stressGrid.innerHTML = ""
  for (let i = 0; i < 18; i++) {
    const box = document.createElement("div")
    box.className = "stress-box"
    box.dataset.index = i
    if (i >= 6) {
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

  // HP最大值变更事件
  document.getElementById("hpMax").addEventListener("change", function () {
    const max = Number.parseInt(this.value) || 6
    updateBoxesMax(hpGrid, "hp-box", max)
    localStorage.setItem("hpMax", max)
  })

  // Stress最大值变更事件
  document.getElementById("stressMax").addEventListener("change", function () {
    const max = Number.parseInt(this.value) || 6
    updateBoxesMax(stressGrid, "stress-box", max)
    localStorage.setItem("stressMax", max)
  })
}

// 更新格子最大值
function updateBoxesMax(grid, className, max) {
  const boxes = grid.querySelectorAll(`.${className}`)
  boxes.forEach((box, index) => {
    if (index < max) {
      box.classList.remove("disabled")
    } else {
      box.classList.remove("checked")
      box.classList.add("disabled")
    }
  })
  saveHPStressState()
}

// 保存HP和Stress状态
function saveHPStressState() {
  const hpState = []
  document.querySelectorAll(".hp-box").forEach((box, index) => {
    hpState[index] = box.classList.contains("checked")
  })

  const stressState = []
  document.querySelectorAll(".stress-box").forEach((box, index) => {
    stressState[index] = box.classList.contains("checked")
  })

  localStorage.setItem("hpState", JSON.stringify(hpState))
  localStorage.setItem("stressState", JSON.stringify(stressState))
}

// 初始化护甲格子
function initArmorGrid() {
  const armorGrid = document.getElementById("armor-grid")

  armorGrid.innerHTML = ""
  for (let i = 0; i < 12; i++) {
    const box = document.createElement("div")
    box.className = "armor-box"
    box.dataset.index = i
    if (i >= 6) {
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

  // 护甲最大值变更事件
  document.getElementById("armorMax").addEventListener("change", function () {
    const max = Number.parseInt(this.value) || 6
    updateBoxesMax(armorGrid, "armor-box", max)
    localStorage.setItem("armorMax", max)
  })
}

// 保存护甲状态
function saveArmorState() {
  const armorState = []
  document.querySelectorAll(".armor-box").forEach((box, index) => {
    armorState[index] = box.classList.contains("checked")
  })

  localStorage.setItem("armorState", JSON.stringify(armorState))
}

// 初始化希望钻石
function initHopeDiamonds() {
  const hopeGrid = document.getElementById("hope-grid")

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
  document.querySelectorAll(".hope-diamond").forEach((diamond, index) => {
    hopeState[index] = diamond.classList.contains("checked")
  })

  localStorage.setItem("hopeState", JSON.stringify(hopeState))
}

// 初始化经验列表
function initExperienceList() {
  const experienceList = document.getElementById("experience-list")

  experienceList.innerHTML = ""
  for (let i = 0; i < 5; i++) {
    const item = document.createElement("div")
    item.className = "experience-item"
    item.innerHTML = `
            <input type="text" class="experience-desc" id="experience-${i}" placeholder="Experience description">
            <input type="text" class="experience-value" id="experience-value-${i}" placeholder="#">
        `
    experienceList.appendChild(item)

    // 添加经验描述变更事件
    const expDesc = item.querySelector(`.experience-desc`)
    expDesc.addEventListener("change", function () {
      localStorage.setItem(`experience-${i}`, this.value)
    })

    // 添加经验值变更事件
    const expValue = item.querySelector(`.experience-value`)
    expValue.addEventListener("change", function () {
      localStorage.setItem(`experience-value-${i}`, this.value)
    })
  }
}

// 初始化金币格子
function initGoldCoins() {
  const handfulGrid = document.getElementById("gold-handfuls")
  const bagsGrid = document.getElementById("gold-bags")

  // 一把金币
  handfulGrid.innerHTML = ""
  for (let i = 0; i < 10; i++) {
    const coin = document.createElement("div")
    coin.className = "gold-coin"
    coin.dataset.index = i
    coin.addEventListener("click", function () {
      this.classList.toggle("checked")
      saveGoldState()
    })
    handfulGrid.appendChild(coin)
  }

  // 一袋金币
  bagsGrid.innerHTML = ""
  for (let i = 0; i < 10; i++) {
    const coin = document.createElement("div")
    coin.className = "gold-coin"
    coin.dataset.index = i + 10
    coin.addEventListener("click", function () {
      this.classList.toggle("checked")
      saveGoldState()
    })
    bagsGrid.appendChild(coin)
  }
}

// 保存金币状态
function saveGoldState() {
  const goldState = []
  document.querySelectorAll(".gold-coin").forEach((coin, index) => {
    goldState[index] = coin.classList.contains("checked")
  })

  localStorage.setItem("goldState", JSON.stringify(goldState))
}

// 初始化熟练度点
function initProficiencyDots() {
  const proficiencyDots = document.getElementById("proficiency-dots")

  proficiencyDots.innerHTML = ""
  for (let i = 0; i < 6; i++) {
    const dot = document.createElement("div")
    dot.className = "proficiency-dot"
    proficiencyDots.appendChild(dot)
  }
}

// 初始化物品栏
function initInventoryList() {
  const inventoryList = document.getElementById("inventory-list")

  inventoryList.innerHTML = ""
  for (let i = 0; i < 5; i++) {
    const item = document.createElement("input")
    item.type = "text"
    item.className = "inventory-item"
    item.id = `inventory-${i}`
    item.addEventListener("change", function () {
      localStorage.setItem(`inventory-${i}`, this.value)
    })
    inventoryList.appendChild(item)
  }
}

// 初始化武器下拉框
function initWeaponSelects() {
  const weaponSelects = ["primaryWeaponName", "secondaryWeaponName", "inventoryWeapon1Name", "inventoryWeapon2Name"]

  // 武器数据
  const weaponData = [
    { id: "sword", name: "Sword", trait: "Sharp", damage: "1d6", feature: "Versatile" },
    { id: "axe", name: "Axe", trait: "Heavy", damage: "1d8", feature: "Two-Handed" },
    { id: "dagger", name: "Dagger", trait: "Light", damage: "1d4", feature: "Finesse" },
  ]

  weaponSelects.forEach((selectId) => {
    const select = document.getElementById(selectId)
    select.innerHTML = '<option value="">选择武器</option>'

    // 添加"无"选项
    const noneOption = document.createElement("option")
    noneOption.value = "none"
    noneOption.textContent = "None"
    select.appendChild(noneOption)

    // 添加武器选项
    weaponData.forEach((weapon) => {
      const option = document.createElement("option")
      option.value = weapon.id
      option.textContent = weapon.name
      select.appendChild(option)
    })

    // 添加武器选择事件
    select.addEventListener("change", function () {
      const weaponId = this.value
      const weapon = weaponData.find((w) => w.id === weaponId)

      if (weapon) {
        const baseId = this.id.replace("Name", "")
        document.getElementById(`${baseId}Trait`).value = weapon.trait
        document.getElementById(`${baseId}Damage`).value = weapon.damage
        document.getElementById(`${baseId}Feature`).value = weapon.feature

        // 保存武器数据
        localStorage.setItem(this.id, weaponId)
        localStorage.setItem(`${baseId}Trait`, weapon.trait)
        localStorage.setItem(`${baseId}Damage`, weapon.damage)
        localStorage.setItem(`${baseId}Feature`, weapon.feature)
      } else {
        // 清空武器数据
        const baseId = this.id.replace("Name", "")
        document.getElementById(`${baseId}Trait`).value = ""
        document.getElementById(`${baseId}Damage`).value = ""
        document.getElementById(`${baseId}Feature`).value = ""

        // 保存空武器数据
        localStorage.setItem(this.id, "")
        localStorage.setItem(`${baseId}Trait`, "")
        localStorage.setItem(`${baseId}Damage`, "")
        localStorage.setItem(`${baseId}Feature`, "")
      }
    })
  })

  // 添加物品栏武器复选框事件
  document.getElementById("inventoryWeapon1Primary").addEventListener("change", function () {
    localStorage.setItem("inventoryWeapon1Primary", this.checked)
  })

  document.getElementById("inventoryWeapon1Secondary").addEventListener("change", function () {
    localStorage.setItem("inventoryWeapon1Secondary", this.checked)
  })

  document.getElementById("inventoryWeapon2Primary").addEventListener("change", function () {
    localStorage.setItem("inventoryWeapon2Primary", this.checked)
  })

  document.getElementById("inventoryWeapon2Secondary").addEventListener("change", function () {
    localStorage.setItem("inventoryWeapon2Secondary", this.checked)
  })
}

// 初始化护甲下拉框
function initArmorSelect() {
  const armorSelect = document.getElementById("armorName")
  armorSelect.innerHTML = '<option value="">选择护甲</option>'

  // 添加"无"选项
  const noneOption = document.createElement("option")
  noneOption.value = "none"
  noneOption.textContent = "None"
  armorSelect.appendChild(noneOption)

  // 护甲数据
  const armorData = [
    { id: "leather", name: "Leather Armor", baseScore: "2", feature: "Flexible" },
    { id: "chainmail", name: "Chainmail", baseScore: "4", feature: "Durable" },
    { id: "plate", name: "Plate Armor", baseScore: "6", feature: "Heavy" },
  ]

  // 添加护甲选项
  armorData.forEach((armor) => {
    const option = document.createElement("option")
    option.value = armor.id
    option.textContent = armor.name
    armorSelect.appendChild(option)
  })

  // 添加护甲选择事件
  armorSelect.addEventListener("change", function () {
    const armorId = this.value
    const armor = armorData.find((a) => a.id === armorId)

    if (armor) {
      document.getElementById("armorBaseScore").value = armor.baseScore
      document.getElementById("armorFeature").value = armor.feature

      // 保存护甲数据
      localStorage.setItem("armorName", armorId)
      localStorage.setItem("armorBaseScore", armor.baseScore)
      localStorage.setItem("armorFeature", armor.feature)
    } else {
      // 清空护甲数据
      document.getElementById("armorBaseScore").value = ""
      document.getElementById("armorFeature").value = ""

      // 保存空护甲数据
      localStorage.setItem("armorName", "")
      localStorage.setItem("armorBaseScore", "")
      localStorage.setItem("armorFeature", "")
    }
  })
}

// 初始化卡组
function initCardDeck() {
  const cardGrid = document.getElementById("card-grid")

  cardGrid.innerHTML = ""
  for (let i = 0; i < 20; i++) {
    const item = document.createElement("div")
    item.className = "card-item"
    item.innerHTML = `
            <span class="card-number">${i + 1}.</span>
            <input type="text" class="card-input" id="card-${i}" placeholder="Card ${i + 1}">
        `
    cardGrid.appendChild(item)

    // 添加卡片变更事件
    const cardInput = item.querySelector(".card-input")
    cardInput.addEventListener("change", function () {
      localStorage.setItem(`card-${i}`, this.value)
    })
  }
}

// 初始化升级选项
function initUpgradeOptions() {
  // 升级选项数据
  const upgradeOptionsData = {
    baseUpgrades: [
      { label: "增加生命值上限", doubleBox: false },
      { label: "增加压力上限", doubleBox: false },
      { label: "提高属性点", doubleBox: false },
    ],
    professionUpgrades: {
      warrior: {
        tier1: [
          { label: "战士专属技能1", doubleBox: false },
          { label: "战士专属技能2", doubleBox: true },
        ],
        tier2: [
          { label: "战士专属技能3", doubleBox: false },
          { label: "战士专属技能4", doubleBox: true },
        ],
        tier3: [
          { label: "战士专属技能5", doubleBox: false },
          { label: "战士专属技能6", doubleBox: true },
        ],
      },
      mage: {
        tier1: [
          { label: "法师专属技能1", doubleBox: false },
          { label: "法师专属技能2", doubleBox: true },
        ],
        tier2: [
          { label: "法师专属技能3", doubleBox: false },
          { label: "法师专属技能4", doubleBox: true },
        ],
        tier3: [
          { label: "法师专属技能5", doubleBox: false },
          { label: "法师专属技能6", doubleBox: true },
        ],
      },
    },
    tierSpecificUpgrades: {
      tier1: [
        { label: "通用技能1", doubleBox: false },
        { label: "通用技能2", doubleBox: true },
      ],
      tier2: [
        { label: "通用技能3", doubleBox: false },
        { label: "通用技能4", doubleBox: true },
      ],
      tier3: [
        { label: "通用技能5", doubleBox: false },
        { label: "通用技能6", doubleBox: true },
      ],
    },
  }

  // 初始化三个等级的升级选项
  for (let tier = 1; tier <= 3; tier++) {
    const upgradeList = document.getElementById(`tier${tier}-upgrades`)
    upgradeList.innerHTML = ""

    // 获取当前职业
    const profession = document.getElementById("profession").value || "warrior"

    // 获取升级选项
    const options = getUpgradeOptions(profession, tier, upgradeOptionsData)

    // 创建升级选项
    options.forEach((option, index) => {
      const item = document.createElement("div")
      item.className = "upgrade-item"

      if (option.doubleBox) {
        item.innerHTML = `
                    <div class="upgrade-double-box">
                        <div class="upgrade-box" data-tier="${tier}" data-index="${index}"></div>
                        <div class="upgrade-box" data-tier="${tier}" data-index="${index}"></div>
                    </div>
                    <span class="upgrade-label">${option.label}</span>
                `
      } else {
        item.innerHTML = `
                    <div class="upgrade-box" data-tier="${tier}" data-index="${index}"></div>
                    <span class="upgrade-label">${option.label}</span>
                `
      }

      upgradeList.appendChild(item)

      // 添加升级选项勾选事件
      const boxes = item.querySelectorAll(".upgrade-box")
      boxes.forEach((box) => {
        box.addEventListener("click", function () {
          this.classList.toggle("checked")
          saveUpgradeState(tier, index, this.classList.contains("checked"))
        })
      })
    })
  }

  // 监听职业变更，更新升级选项
  document.getElementById("profession").addEventListener("change", () => {
    initUpgradeOptions()
  })
}

// 获取升级选项
function getUpgradeOptions(profession, tier, upgradeOptionsData) {
  // 获取基础升级选项
  const baseUpgrades = [...upgradeOptionsData.baseUpgrades]

  // 添加职业特定升级选项
  const tierKey = `tier${tier}`
  const professionTierUpgrades = upgradeOptionsData.professionUpgrades[profession]?.[tierKey] || []

  // 添加特定等级升级选项
  const tierSpecificUpgrades = upgradeOptionsData.tierSpecificUpgrades[tierKey] || []

  return [...baseUpgrades, ...professionTierUpgrades, ...tierSpecificUpgrades]
}

// 保存升级状态
function saveUpgradeState(tier, index, checked) {
  const key = `upgrade-tier${tier}-${index}`
  localStorage.setItem(key, checked)
}

// 获取职业名称
function getProfessionName(professionId) {
  const professionData = [
    { id: "warrior", name: "Warrior" },
    { id: "mage", name: "Mage" },
    { id: "rogue", name: "Rogue" },
  ]
  const profession = professionData.find((p) => p.id === professionId)
  return profession ? profession.name : "Warrior"
}

// 保存角色数据
function saveCharacter() {
  // 收集所有输入字段的值
  const formData = {}

  // 基本信息
  formData.characterName = document.getElementById("characterName").value
  formData.profession = document.getElementById("profession").value
  formData.level = document.getElementById("level").value
  formData.community = document.getElementById("community").value
  formData.ancestry1 = document.getElementById("ancestry1").value
  formData.ancestry2 = document.getElementById("ancestry2").value
  formData.subclass = document.getElementById("subclass").value

  // 属性值
  const attributes = ["agility", "strength", "finesse", "instinct", "presence", "knowledge"]
  attributes.forEach((attr) => {
    formData[`${attr}-value`] = document.getElementById(`${attr}-value`).value
    formData[`${attr}-checked`] = document
      .querySelector(`.attribute-check[data-attribute="${attr}"]`)
      .classList.contains("checked")
  })

  // 闪避和护甲
  formData.evasion = document.getElementById("evasion").value
  formData.armorValue = document.getElementById("armorValue").value
  formData.armorMax = document.getElementById("armorMax").value

  // 阈值
  formData.minorThreshold = document.getElementById("minorThreshold").value
  formData.majorThreshold = document.getElementById("majorThreshold").value

  // HP和Stress
  formData.hpMax = document.getElementById("hpMax").value
  formData.stressMax = document.getElementById("stressMax").value

  // 武器和护甲
  formData.primaryWeaponName = document.getElementById("primaryWeaponName").value
  formData.primaryWeaponTrait = document.getElementById("primaryWeaponTrait").value
  formData.primaryWeaponDamage = document.getElementById("primaryWeaponDamage").value
  formData.primaryWeaponFeature = document.getElementById("primaryWeaponFeature").value

  formData.secondaryWeaponName = document.getElementById("secondaryWeaponName").value
  formData.secondaryWeaponTrait = document.getElementById("secondaryWeaponTrait").value
  formData.secondaryWeaponDamage = document.getElementById("secondaryWeaponDamage").value
  formData.secondaryWeaponFeature = document.getElementById("secondaryWeaponFeature").value

  formData.armorName = document.getElementById("armorName").value
  formData.armorBaseScore = document.getElementById("armorBaseScore").value
  formData.armorFeature = document.getElementById("armorFeature").value

  // 物品栏武器
  formData.inventoryWeapon1Name = document.getElementById("inventoryWeapon1Name").value
  formData.inventoryWeapon1Trait = document.getElementById("inventoryWeapon1Trait").value
  formData.inventoryWeapon1Damage = document.getElementById("inventoryWeapon1Damage").value
  formData.inventoryWeapon1Feature = document.getElementById("inventoryWeapon1Feature").value
  formData.inventoryWeapon1Primary = document.getElementById("inventoryWeapon1Primary").checked
  formData.inventoryWeapon1Secondary = document.getElementById("inventoryWeapon1Secondary").checked

  formData.inventoryWeapon2Name = document.getElementById("inventoryWeapon2Name").value
  formData.inventoryWeapon2Trait = document.getElementById("inventoryWeapon2Trait").value
  formData.inventoryWeapon2Damage = document.getElementById("inventoryWeapon2Damage").value
  formData.inventoryWeapon2Feature = document.getElementById("inventoryWeapon2Feature").value
  formData.inventoryWeapon2Primary = document.getElementById("inventoryWeapon2Primary").checked
  formData.inventoryWeapon2Secondary = document.getElementById("inventoryWeapon2Secondary").checked

  // 角色描述
  formData.characterBackground = document.getElementById("characterBackground").value
  formData.characterAppearance = document.getElementById("characterAppearance").value
  formData.characterMotivation = document.getElementById("characterMotivation").value

  // 将数据转换为JSON字符串
  const jsonData = JSON.stringify(formData)

  // 创建下载链接
  const blob = new Blob([jsonData], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${formData.characterName || "character"}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  alert("角色数据已保存！")
}

// 加载角色数据
function loadCharacter() {
  // 创建文件输入元素
  const fileInput = document.createElement("input")
  fileInput.type = "file"
  fileInput.accept = ".json"
  fileInput.style.display = "none"
  document.body.appendChild(fileInput)

  fileInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const formData = JSON.parse(event.target.result)

          // 填充表单数据
          fillFormData(formData)

          alert("角色数据已加载！")
        } catch (error) {
          console.error("加载角色数据失败:", error)
          alert("加载角色数据失败，请确保文件格式正确。")
        }
      }
      reader.readAsText(e.target.files[0])
    }
    document.body.removeChild(fileInput)
  })

  fileInput.click()
}

// 填充表单数据
function fillFormData(formData) {
  // 基本信息
  document.getElementById("characterName").value = formData.characterName || ""
  document.getElementById("profession").value = formData.profession || ""
  document.getElementById("profession-page2").value = formData.profession || ""
  document.getElementById("profession-name").textContent = getProfessionName(formData.profession)
  document.getElementById("level").value = formData.level || ""
  document.getElementById("community").value = formData.community || ""
  document.getElementById("ancestry1").value = formData.ancestry1 || ""
  document.getElementById("ancestry2").value = formData.ancestry2 || ""
  document.getElementById("subclass").value = formData.subclass || ""

  // 属性值
  const attributes = ["agility", "strength", "finesse", "instinct", "presence", "knowledge"]
  attributes.forEach((attr) => {
    document.getElementById(`${attr}-value`).value = formData[`${attr}-value`] || ""
    const attributeCheck = document.querySelector(`.attribute-check[data-attribute="${attr}"]`)
    if (formData[`${attr}-checked`]) {
      attributeCheck.classList.add("checked")
    } else {
      attributeCheck.classList.remove("checked")
    }
  })

  // 闪避和护甲
  document.getElementById("evasion").value = formData.evasion || "10"
  document.getElementById("armorValue").value = formData.armorValue || ""
  document.getElementById("armorMax").value = formData.armorMax || "6"
  updateBoxesMax(document.getElementById("armor-grid"), "armor-box", Number.parseInt(formData.armorMax) || 6)

  // 阈值
  document.getElementById("minorThreshold").value = formData.minorThreshold || "7"
  document.getElementById("majorThreshold").value = formData.majorThreshold || "14"

  // HP和Stress
  document.getElementById("hpMax").value = formData.hpMax || "6"
  document.getElementById("stressMax").value = formData.stressMax || "6"
  updateBoxesMax(document.getElementById("hp-grid"), "hp-box", Number.parseInt(formData.hpMax) || 6)
  updateBoxesMax(document.getElementById("stress-grid"), "stress-box", Number.parseInt(formData.stressMax) || 6)

  // 武器和护甲
  document.getElementById("primaryWeaponName").value = formData.primaryWeaponName || ""
  document.getElementById("primaryWeaponTrait").value = formData.primaryWeaponTrait || ""
  document.getElementById("primaryWeaponDamage").value = formData.primaryWeaponDamage || ""
  document.getElementById("primaryWeaponFeature").value = formData.primaryWeaponFeature || ""

  document.getElementById("secondaryWeaponName").value = formData.secondaryWeaponName || ""
  document.getElementById("secondaryWeaponTrait").value = formData.secondaryWeaponTrait || ""
  document.getElementById("secondaryWeaponDamage").value = formData.secondaryWeaponDamage || ""
  document.getElementById("secondaryWeaponFeature").value = formData.secondaryWeaponFeature || ""

  document.getElementById("armorName").value = formData.armorName || ""
  document.getElementById("armorBaseScore").value = formData.armorBaseScore || ""
  document.getElementById("armorFeature").value = formData.armorFeature || ""

  // 物品栏武器
  document.getElementById("inventoryWeapon1Name").value = formData.inventoryWeapon1Name || ""
  document.getElementById("inventoryWeapon1Trait").value = formData.inventoryWeapon1Trait || ""
  document.getElementById("inventoryWeapon1Damage").value = formData.inventoryWeapon1Damage || ""
  document.getElementById("inventoryWeapon1Feature").value = formData.inventoryWeapon1Feature || ""
  document.getElementById("inventoryWeapon1Primary").checked = formData.inventoryWeapon1Primary || false
  document.getElementById("inventoryWeapon1Secondary").checked = formData.inventoryWeapon1Secondary || false

  document.getElementById("inventoryWeapon2Name").value = formData.inventoryWeapon2Name || ""
  document.getElementById("inventoryWeapon2Trait").value = formData.inventoryWeapon2Trait || ""
  document.getElementById("inventoryWeapon2Damage").value = formData.inventoryWeapon2Damage || ""
  document.getElementById("inventoryWeapon2Feature").value = formData.inventoryWeapon2Feature || ""
  document.getElementById("inventoryWeapon2Primary").checked = formData.inventoryWeapon2Primary || false
  document.getElementById("inventoryWeapon2Secondary").checked = formData.inventoryWeapon2Secondary || false

  // 角色描述
  document.getElementById("characterBackground").value = formData.characterBackground || ""
  document.getElementById("characterAppearance").value = formData.characterAppearance || ""
  document.getElementById("characterMotivation").value = formData.characterMotivation || ""

  // 保存到本地存储
  for (const key in formData) {
    localStorage.setItem(key, typeof formData[key] === "boolean" ? formData[key] : formData[key] || "")
  }
}

// 导出为PDF
function exportToPDF() {
  alert("PDF导出功能正在开发中，请暂时使用浏览器的打印功能（Ctrl+P）保存为PDF。")
}

// 重置角色数据
function resetCharacter() {
  // 清除本地存储
  localStorage.clear()

  // 重新加载页面
  location.reload()
}

// 从本地存储加载数据
function loadFromLocalStorage() {
  // 基本信息
  document.getElementById("characterName").value = localStorage.getItem("characterName") || ""

  const profession = localStorage.getItem("characterProfession") || ""
  document.getElementById("profession").value = profession
  document.getElementById("profession-page2").value = profession
  document.getElementById("profession-name").textContent = getProfessionName(profession)

  document.getElementById("level").value = localStorage.getItem("level") || ""
  document.getElementById("community").value = localStorage.getItem("community") || ""
  document.getElementById("ancestry1").value = localStorage.getItem("ancestry1") || ""
  document.getElementById("ancestry2").value = localStorage.getItem("ancestry2") || ""
  document.getElementById("subclass").value = localStorage.getItem("subclass") || ""

  // 属性值
  const attributes = ["agility", "strength", "finesse", "instinct", "presence", "knowledge"]
  attributes.forEach((attr) => {
    document.getElementById(`${attr}-value`).value = localStorage.getItem(`${attr}-value`) || ""
    const attributeCheck = document.querySelector(`.attribute-check[data-attribute="${attr}"]`)
    if (localStorage.getItem(`${attr}-checked`) === "true") {
      attributeCheck.classList.add("checked")
    }
  })

  // 闪避和护甲
  document.getElementById("evasion").value = localStorage.getItem("evasion") || "10"
  document.getElementById("armorValue").value = localStorage.getItem("armorValue") || ""

  const armorMax = Number.parseInt(localStorage.getItem("armorMax")) || 6
  document.getElementById("armorMax").value = armorMax
  updateBoxesMax(document.getElementById("armor-grid"), "armor-box", armorMax)

  // 阈值
  document.getElementById("minorThreshold").value = localStorage.getItem("minorThreshold") || "7"
  document.getElementById("majorThreshold").value = localStorage.getItem("majorThreshold") || "14"

  // HP和Stress
  const hpMax = Number.parseInt(localStorage.getItem("hpMax")) || 6
  const stressMax = Number.parseInt(localStorage.getItem("stressMax")) || 6
  document.getElementById("hpMax").value = hpMax
  document.getElementById("stressMax").value = stressMax
  updateBoxesMax(document.getElementById("hp-grid"), "hp-box", hpMax)
  updateBoxesMax(document.getElementById("stress-grid"), "stress-box", stressMax)

  // 加载HP和Stress状态
  try {
    const hpState = JSON.parse(localStorage.getItem("hpState"))
    if (hpState) {
      document.querySelectorAll(".hp-box").forEach((box, index) => {
        if (hpState[index] && index < hpMax) {
          box.classList.add("checked")
        }
      })
    }

    const stressState = JSON.parse(localStorage.getItem("stressState"))
    if (stressState) {
      document.querySelectorAll(".stress-box").forEach((box, index) => {
        if (stressState[index] && index < stressMax) {
          box.classList.add("checked")
        }
      })
    }

    const armorState = JSON.parse(localStorage.getItem("armorState"))
    if (armorState) {
      document.querySelectorAll(".armor-box").forEach((box, index) => {
        if (armorState[index] && index < armorMax) {
          box.classList.add("checked")
        }
      })
    }

    const hopeState = JSON.parse(localStorage.getItem("hopeState"))
    if (hopeState) {
      document.querySelectorAll(".hope-diamond").forEach((diamond, index) => {
        if (hopeState[index]) {
          diamond.classList.add("checked")
        }
      })
    }

    const goldState = JSON.parse(localStorage.getItem("goldState"))
    if (goldState) {
      document.querySelectorAll(".gold-coin").forEach((coin, index) => {
        if (goldState[index]) {
          coin.classList.add("checked")
        }
      })
    }
  } catch (error) {
    console.error("加载状态数据失败:", error)
  }

  // 武器和护甲
  document.getElementById("primaryWeaponName").value = localStorage.getItem("primaryWeaponName") || ""
  document.getElementById("primaryWeaponTrait").value = localStorage.getItem("primaryWeaponTrait") || ""
  document.getElementById("primaryWeaponDamage").value = localStorage.getItem("primaryWeaponDamage") || ""
  document.getElementById("primaryWeaponFeature").value = localStorage.getItem("primaryWeaponFeature") || ""

  document.getElementById("secondaryWeaponName").value = localStorage.getItem("secondaryWeaponName") || ""
  document.getElementById("secondaryWeaponTrait").value = localStorage.getItem("secondaryWeaponTrait") || ""
  document.getElementById("secondaryWeaponDamage").value = localStorage.getItem("secondaryWeaponDamage") || ""
  document.getElementById("secondaryWeaponFeature").value = localStorage.getItem("secondaryWeaponFeature") || ""

  document.getElementById("armorName").value = localStorage.getItem("armorName") || ""
  document.getElementById("armorBaseScore").value = localStorage.getItem("armorBaseScore") || ""
  document.getElementById("armorFeature").value = localStorage.getItem("armorFeature") || ""

  // 物品栏
  for (let i = 0; i < 5; i++) {
    document.getElementById(`inventory-${i}`).value = localStorage.getItem(`inventory-${i}`) || ""
  }

  // 物品栏武器
  document.getElementById("inventoryWeapon1Name").value = localStorage.getItem("inventoryWeapon1Name") || ""
  document.getElementById("inventoryWeapon1Trait").value = localStorage.getItem("inventoryWeapon1Trait") || ""
  document.getElementById("inventoryWeapon1Damage").value = localStorage.getItem("inventoryWeapon1Damage") || ""
  document.getElementById("inventoryWeapon1Feature").value = localStorage.getItem("inventoryWeapon1Feature") || ""
  document.getElementById("inventoryWeapon1Primary").checked =
    localStorage.getItem("inventoryWeapon1Primary") === "true"
  document.getElementById("inventoryWeapon1Secondary").checked =
    localStorage.getItem("inventoryWeapon1Secondary") === "true"

  document.getElementById("inventoryWeapon2Name").value = localStorage.getItem("inventoryWeapon2Name") || ""
  document.getElementById("inventoryWeapon2Trait").value = localStorage.getItem("inventoryWeapon2Trait") || ""
  document.getElementById("inventoryWeapon2Damage").value = localStorage.getItem("inventoryWeapon2Damage") || ""
  document.getElementById("inventoryWeapon2Feature").value = localStorage.getItem("inventoryWeapon2Feature") || ""
  document.getElementById("inventoryWeapon2Primary").checked =
    localStorage.getItem("inventoryWeapon2Primary") === "true"
  document.getElementById("inventoryWeapon2Secondary").checked =
    localStorage.getItem("inventoryWeapon2Secondary") === "true"

  // 经验
  for (let i = 0; i < 5; i++) {
    const expDesc = document.getElementById(`experience-${i}`)
    const expValue = document.getElementById(`experience-value-${i}`)
    if (expDesc) expDesc.value = localStorage.getItem(`experience-${i}`) || ""
    if (expValue) expValue.value = localStorage.getItem(`experience-value-${i}`) || ""
  }

  // 卡组
  for (let i = 0; i < 20; i++) {
    const cardInput = document.getElementById(`card-${i}`)
    if (cardInput) cardInput.value = localStorage.getItem(`card-${i}`) || ""
  }

  // 角色描述
  document.getElementById("characterBackground").value = localStorage.getItem("characterBackground") || ""
  document.getElementById("characterAppearance").value = localStorage.getItem("characterAppearance") || ""
  document.getElementById("characterMotivation").value = localStorage.getItem("characterMotivation") || ""

  // 加载角色图像
  const characterImage = localStorage.getItem("characterImage")
  if (characterImage) {
    const placeholder = document.getElementById("character-image-placeholder")
    placeholder.innerHTML = ""
    placeholder.style.backgroundImage = `url(${characterImage})`
    placeholder.style.backgroundSize = "cover"
    placeholder.style.backgroundPosition = "center"
  }

  // 加载升级选项状态
  for (let tier = 1; tier <= 3; tier++) {
    const options = getUpgradeOptions(profession, tier, upgradeOptionsData)
    options.forEach((option, index) => {
      const key = `upgrade-tier${tier}-${index}`
      const checked = localStorage.getItem(key) === "true"
      if (checked) {
        const boxes = document.querySelectorAll(`.upgrade-box[data-tier="${tier}"][data-index="${index}"]`)
        boxes.forEach((box) => box.classList.add("checked"))
      }
    })
  }

  markDefaultElements()
}
