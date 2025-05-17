window.dataCollectors = {
    collectAttributeData() {
        return {
            agility: document.getElementById('agility-value')?.value || '',
            strength: document.getElementById('strength-value')?.value || '',
            finesse: document.getElementById('finesse-value')?.value || '',
            instinct: document.getElementById('instinct-value')?.value || '',
            presence: document.getElementById('presence-value')?.value || '',
            knowledge: document.getElementById('knowledge-value')?.value || ''
        };
    },

    collectCharacterState() {
        console.log('开始收集角色状态...');
        const evasion = document.getElementById('evasion')?.value;
        console.log('闪避值:', evasion);

        const state = {
            hp: this.collectGridState('hp'),
            stress: this.collectGridState('stress'),
            armor: this.collectArmorState(),
            hope: this.collectHopeState(),
            evasion: document.getElementById('evasion')?.value || '',
            damageThreshold: this.collectDamageThreshold()
        };
        console.log('角色状态数据收集完成:', state);
        return state;
    },

    collectProfessionInfo() {
        const currentProfession = document.getElementById('profession')?.value;
        const professionSelect = document.getElementById('profession');
        const professionData = Array.from(professionSelect?.options || [])
            .find(opt => opt.value === currentProfession)?.dataset.profData;

        return {
            id: currentProfession,
            data: professionData ? JSON.parse(professionData) : null,
            name: window.getProfessionName?.(currentProfession) || '',
            displayName: window.professions?.[currentProfession]?.职业 || ''
        };
    },

    collectGlobalData() {
        return {
            weaponData: window.weaponData || [],
            armorData: window.armorData || [],
            upgradeOptionsData: window.upgradeOptionsData || {},
            professions: window.professions || {}
        };
    },

    collectCardData() {
        const cardDeck = [];
        for (let i = 0; i < 20; i++) {
            const cardNameEl = document.getElementById(`card-name-${i}`);
            if (cardNameEl?.value) {
                cardDeck.push({
                    name: cardNameEl.value,
                    type: document.getElementById(`card-type-${i}`)?.value || '',
                    level: document.getElementById(`card-level-${i}`)?.value || '',
                    recall: document.getElementById(`card-recall-${i}`)?.value?.replace('RC.', '') || '0'
                });
            }
        }
        return cardDeck;
    },

    collectWeaponData() {
        const weaponData = {};
        ["primaryWeaponName", "secondaryWeaponName", "inventoryWeapon1Name", "inventoryWeapon2Name"]
            .forEach(baseId => {
                const cleanedId = baseId.replace('Name', '');
                weaponData[baseId] = {
                    weaponId: localStorage.getItem(baseId),
                    trait: document.getElementById(`${cleanedId}Trait`)?.value || '',
                    damage: document.getElementById(`${cleanedId}Damage`)?.value || '',
                    feature: document.getElementById(`${cleanedId}Feature`)?.value || '',
                    isPrimary: document.getElementById(`${cleanedId}Primary`)?.checked || false,
                    isSecondary: document.getElementById(`${cleanedId}Secondary`)?.checked || false
                };
            });
        return weaponData;
    },

    collectCharacterInfo() {
        return {
            name: document.getElementById('characterName')?.value || '',
            level: document.getElementById('level')?.value || '',
            community: document.getElementById('community')?.value || '',
            ancestry1: document.getElementById('ancestry1')?.value || '',
            ancestry2: document.getElementById('ancestry2')?.value || '',
            subclass: document.getElementById('subclass')?.value || '',
            background: document.getElementById('characterBackground')?.value || '',
            appearance: document.getElementById('characterAppearance')?.value || '',
            motivation: document.getElementById('characterMotivation')?.value || ''
        };
    },

    collectInventoryData() {
        const inventoryData = Array.from({ length: 5 }, (_, i) => {
            const value = document.getElementById(`inventory-${i}`)?.value;
            console.log(`收集物品栏 ${i}:`, value);
            return value || '';
        });
        console.log('物品栏数据收集完成:', inventoryData);
        return inventoryData;
    },

    collectExperienceData() {
        console.log('开始收集经验数据...');
        const expData = Array.from({ length: 5 }, (_, i) => ({
            description: document.getElementById(`experience-${i}`)?.value || '',
            value: document.getElementById(`experience-value-${i}`)?.value || ''
        }));
        console.log('经验数据收集完成:', expData);
        return expData;
    },

    collectGridState(type) {
        return {
            current: Array.from(document.querySelectorAll(`#${type}-grid .${type}-box.checked`)).length,
            max: document.getElementById(`${type}Max`)?.value || '6'
        };
    },

    collectHopeState() {
        return Array.from(document.querySelectorAll('#hope-grid .hope-diamond.checked')).length;
    },

    collectDamageThreshold() {
        return {
            minor: document.getElementById('minorThreshold')?.value || '',
            major: document.getElementById('majorThreshold')?.value || ''
        };
    },

    collectArmorState() {
        return {
            current: Array.from(document.querySelectorAll('#armor-grid .armor-box.checked')).length,
            max: document.getElementById('armorMax')?.value || '6',
            value: document.getElementById('armorValue')?.value || '',
            name: document.getElementById('armorName')?.value || '',
            trait: document.getElementById('armorTrait')?.value || '',
            feature: document.getElementById('armorFeature')?.value || '',
            defense: document.getElementById('armorBaseScore')?.value || ''
        };
    }
};
