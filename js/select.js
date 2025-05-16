// 初始化职业选择框
function initProfessionSelects() {
    const professionSelects = ['profession', 'profession-page2'];
    professionSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) return;
        select.innerHTML = '<option value=""></option>';

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
