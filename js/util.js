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

// 获取职业名称
function getProfessionName(professionId) {
    // 使用select.js中定义的全局函数
    return window.getProfessionName ? window.getProfessionName(professionId) : (professionId || "");
}

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

// 标记默认值元素
function markDefaultElements() {
    const defaultElements = [
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

// 移除中英文混合字符串中的英文部分
function removeEnglishText(text) {
    if (!text) return "";
    // 匹配含有英文的部分，格式为"中文English"
    return text.replace(/([^\x00-\xff]+)([A-Za-z&\s]+)/g, '$1');
}

// 初始化全局卡牌数据
function initGlobalCards() {
    if (typeof DOMAIN_CARDS !== 'undefined') {
        window.DOMAIN_CARDS = DOMAIN_CARDS;
    }
    if (typeof RACES_CARD !== 'undefined') {
        window.RACES_CARD = RACES_CARD;
    }
}

// 确保在页面加载时初始化
document.addEventListener('DOMContentLoaded', initGlobalCards);

// Add to window object
window.removeEnglishText = removeEnglishText;

// Placeholder for exportToPDF
function exportToPDF() {
    alert("请点击打印按钮，然后选择A4大小纸张，即可保存到PDF");
}