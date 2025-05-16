// 初始化属性
function initAttributes() {
    console.log("Initializing attributes...");
    const attributes = [
        { name: "敏捷", key: "agility", skills: ["奔跑", "跳跃", "机动"] },
        { name: "力量", key: "strength", skills: ["举起", "破坏", "擒拿"] },
        { name: "灵巧", key: "finesse", skills: ["操控", "隐藏", "修理"] },
        { name: "本能", key: "instinct", skills: ["感知", "感应", "导航"] },
        { name: "风度", key: "presence", skills: ["魅惑", "表演", "欺骗"] },
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
        // 读取并设置复选框状态
        const isChecked = localStorage.getItem(`${attr.key}-checked`) === 'true'
        if (isChecked) {
            attributeCheck.classList.add('checked')
        }

        attributeCheck.addEventListener("click", function () {
            this.classList.toggle("checked")
            localStorage.setItem(`${attr.key}-checked`, this.classList.contains("checked").toString())
        })

        const attributeValue = attributeDiv.querySelector(`#${attr.key}-value`)
        const savedValue = localStorage.getItem(`${attr.key}-value`)
        console.log(`Loading attribute ${attr.key}:`, {
            element: attributeValue,
            savedValue: savedValue
        });

        if (savedValue) {
            attributeValue.value = savedValue
            console.log(`Set ${attr.key} value to:`, savedValue);
        }

        attributeValue.addEventListener("input", function () {
            localStorage.setItem(`${attr.key}-value`, this.value)
        })
    })
    console.log("Attributes initialization completed");
}
