// 确保函数在全局范围内可用
window.initProfessionSelect = function () {
    const professionSelects = document.querySelectorAll('.profession-select');

    // 清空并填充职业选项
    professionSelects.forEach(select => {
        select.innerHTML = '<option value=""></option>';
        CLASS_DATA.forEach(prof => {
            const option = document.createElement('option');
            option.value = prof.id;  // 使用id作为value
            option.textContent = prof.职业;
            // 将完整的职业数据保存到option中
            option.dataset.profData = JSON.stringify(prof);
            select.appendChild(option);
        });
    });

    // 将两个职业选择器联动
    const profession1 = document.getElementById('profession');
    const profession2 = document.getElementById('profession-page2');

    window.getProfessionName = function (professionId) {
        const select = document.getElementById('profession');
        if (!select) return "";
        const option = select.querySelector(`option[value="${professionId}"]`);
        if (!option) return "";
        try {
            const profData = JSON.parse(option.dataset.profData);
            return profData.职业 || "";
        } catch (e) {
            console.error('Error parsing profession data:', e);
            return "";
        }
    };

    if (profession1 && profession2) {
        const handleProfessionChange = function (selectedValue, sourceElement) {
            console.log(`Profession change triggered from ${sourceElement.id}:`, selectedValue);

            // 更新两个选择器的值
            if (sourceElement !== profession1) profession1.value = selectedValue;
            if (sourceElement !== profession2) profession2.value = selectedValue;

            // 更新职业名称显示
            const profNameElement = document.getElementById("profession-name");
            if (profNameElement) {
                const profData = CLASS_DATA.find(p => p.id === selectedValue);
                profNameElement.textContent = profData ? profData.职业 : selectedValue;
            }

            // 更新相关组件
            updateHopeSpecial(selectedValue);
            initUpgradeOptions(selectedValue);
            loadUpgradeStatesForProfession(selectedValue);

            // 保存到localStorage
            localStorage.setItem("characterProfession", selectedValue);
        };

        profession1.addEventListener("change", function () {
            handleProfessionChange(this.value, this);
        });

        profession2.addEventListener("change", function () {
            handleProfessionChange(this.value, this);
        });

        // 从localStorage加载保存的职业
        const savedProfession = localStorage.getItem('characterProfession');
        if (savedProfession) {
            profession1.value = savedProfession;
            profession2.value = savedProfession;
            updateHopeSpecial(savedProfession);  // 初始加载时更新希望特性
        }
    }
}

// 初始化血统选择框
function initAncestrySelects() {
    const ancestry1Select = document.getElementById("ancestry1")
    const ancestry2Select = document.getElementById("ancestry2")

    if (!ancestry1Select || !ancestry2Select) return

    // Clear existing options
    ancestry1Select.innerHTML = ''
    ancestry2Select.innerHTML = ''

    // Add empty option
    const emptyOption1 = document.createElement("option")
    emptyOption1.value = ""
    ancestry1Select.appendChild(emptyOption1)

    const emptyOption2 = document.createElement("option")
    emptyOption2.value = ""
    ancestry2Select.appendChild(emptyOption2)

    // Add ancestry options from RACES_DATA
    if (Array.isArray(RACES_DATA)) {
        RACES_DATA.forEach(race => {
            const option1 = document.createElement("option")
            option1.value = race.race
            option1.textContent = race.race
            ancestry1Select.appendChild(option1)

            const option2 = document.createElement("option")
            option2.value = race.race
            option2.textContent = race.race
            ancestry2Select.appendChild(option2)
        })
    }
}

// 初始化社群选择框
function initCommunitySelects() {
    const select = document.getElementById('community');
    if (!select) {
        console.warn('Community select element not found');
        return;
    }

    select.innerHTML = '<option value=""></option>';

    if (typeof GROUPS_DATA === 'undefined') {
        console.error('GROUPS_DATA is not defined!');
        return;
    }

    if (!Array.isArray(GROUPS_DATA)) {
        console.error('GROUPS_DATA is not an array!', GROUPS_DATA);
        return;
    }

    GROUPS_DATA.forEach((group, index) => {
        if (!group || !group.社群) {
            console.warn(`Invalid group data at index ${index}`, group);
            return;
        }
        const option = document.createElement('option');
        option.value = group.社群;
        option.textContent = group.社群;
        select.appendChild(option);
    });
}
