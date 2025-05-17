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
    if (!professionId || !window.professions || !window.professions[professionId]) {
        return '';
    }
    // 优先使用中文职业名称
    return window.professions[professionId].职业 ||
        window.professions[professionId].name ||
        professionId;
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

// Placeholder for exportToPDF function only
function exportToPDF() {
    alert("PDF导出功能正在准备中");
}