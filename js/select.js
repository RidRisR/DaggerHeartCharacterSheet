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
            select.appendChild(option);
        });
    });

    // 将两个职业选择器联动
    const profession1 = document.getElementById('profession');
    const profession2 = document.getElementById('profession-page2');

    if (profession1 && profession2) {
        profession1.addEventListener('change', function () {
            profession2.value = this.value;
            updateHopeSpecial(this.value);  // 更新希望特性
        });

        profession2.addEventListener('change', function () {
            profession1.value = this.value;
            updateHopeSpecial(this.value);  // 更新希望特性
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
    const ancestrySelects = ['ancestry1', 'ancestry2'];
    ancestrySelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) {
            console.warn(`Select element with id ${selectId} not found`);
            return;
        }

        select.innerHTML = '<option value="none">无</option>';

        if (typeof RACES_DATA === 'undefined') {
            console.error('RACES_DATA is not defined!');
            return;
        }

        if (!Array.isArray(RACES_DATA)) {
            console.error('RACES_DATA is not an array!', RACES_DATA);
            return;
        }

        RACES_DATA.forEach((race, index) => {
            if (!race || !race.race) {
                console.warn(`Invalid race data at index ${index}`, race);
                return;
            }
            const option = document.createElement('option');
            option.value = race.race;
            option.textContent = race.race;
            select.appendChild(option);
        });
    });
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
