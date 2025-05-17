console.log('打印预览页面初始化...');

class PrintPreview {
    static init() {
        const printId = new URLSearchParams(window.location.search).get('print');
        if (!printId) return;

        try {
            const printData = this.loadPrintData();
            if (!printData || !this.validatePrintData(printData)) {
                throw new Error('无效的打印数据');
            }

            this.initializeData(printData);
            this.renderContent(printData);
            requestAnimationFrame(() => this.restoreStates(printData));
        } catch (e) {
            this.showError(e);
        }
    }

    static validatePrintData(data) {
        return data.type === 'content' &&
            data.pages?.page1 &&
            data.pages?.page2 &&
            data.characterData;
    }

    static loadPrintData() {
        const rawData = sessionStorage.getItem('printData');
        return rawData ? JSON.parse(rawData) : null;
    }

    static initializeData(printData) {
        console.group('初始化数据');
        try {
            if (!printData.globalData) {
                throw new Error('全局数据缺失');
            }

            if (!printData.globalData.professions) {
                throw new Error('职业数据缺失');
            }

            window.professions = printData.globalData.professions;
            window.weaponData = printData.globalData.weaponData || [];
            window.armorData = printData.globalData.armorData || [];
            window.upgradeOptionsData = printData.globalData.upgradeOptionsData || {};

            console.log('全局数据初始化完成:', {
                professions: Object.keys(window.professions).length,
                weaponData: window.weaponData.length,
                armorData: window.armorData.length
            });
        } catch (e) {
            console.error('初始化数据失败:', e);
        }
        console.groupEnd();
    }

    static renderContent(printData) {
        console.group('渲染内容');
        try {
            if (!printData || !printData.pages) {
                throw new Error('打印数据为空或格式错误');
            }

            const page1Content = printData.pages.page1;
            const page2Content = printData.pages.page2;

            if (!page1Content || !page2Content) {
                throw new Error('页面内容缺失');
            }

            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = page1Content + page2Content;

            const page1Element = tempContainer.querySelector('.character-sheet');
            const page2Element = tempContainer.querySelector('.character-sheet-page-two');

            if (!page1Element || !page2Element) {
                throw new Error('无法找到角色表内容');
            }

            const page1 = document.getElementById('page1-content');
            const page2 = document.getElementById('page2-content');

            page1.innerHTML = '';
            page2.innerHTML = '';
            page1.appendChild(page1Element);
            page2.appendChild(page2Element);

            console.log('内容渲染完成，开始恢复表单状态');
        } catch (e) {
            console.error('渲染内容失败:', e);
            this.showError(e);
        }
        console.groupEnd();
    }

    static showError(error) {
        const errorHtml = `
            <div class="error-message" style="color: red; padding: 20px;">
                <h3>渲染错误</h3>
                <p>${error.message}</p>
                <pre>${error.stack}</pre>
            </div>
        `;

        const page1 = document.getElementById('page1-content');
        if (page1) {
            page1.innerHTML = errorHtml;
        }
    }

    static restoreStates(printData) {
        console.group('状态恢复');
        try {
            // 特别记录关键数据
            console.log('准备恢复的数据:', {
                闪避: printData.characterData.state.evasion,
                物品栏: printData.characterData.inventory,
                经验: printData.characterData.experience
            });

            this.restoreBasicInfo(printData.characterData.info);
            this.restoreAttributes(printData.characterData.attributes);

            // 恢复闪避值
            const evasionEl = document.getElementById('evasion');
            if (evasionEl) {
                evasionEl.value = printData.characterData.state.evasion || '0';
                console.log('恢复闪避值:', evasionEl.value);
            }

            this.restoreStateValues(printData.characterData.state);

            // 恢复经验
            console.group('恢复经验');
            printData.characterData.experience.forEach((exp, i) => {
                const descEl = document.getElementById(`experience-${i}`);
                const valueEl = document.getElementById(`experience-value-${i}`);
                if (descEl) descEl.value = exp.description;
                if (valueEl) valueEl.value = exp.value;
                console.log(`经验 ${i}:`, { desc: exp.description, value: exp.value });
            });
            console.groupEnd();

            // 恢复物品栏
            console.group('恢复物品栏');
            printData.characterData.inventory.forEach((item, i) => {
                const el = document.getElementById(`inventory-${i}`);
                if (el) {
                    el.value = item;
                    console.log(`物品栏 ${i}:`, item);
                }
            });
            console.groupEnd();

            this.restoreWeaponFields(printData.weaponData);
            this.restoreProfessionInfo(printData.professionInfo);
            this.restoreCardDeck(printData.characterData.cards);
        } catch (e) {
            console.error('状态恢复失败:', e);
        }
        console.groupEnd();
    }

    static restoreBasicInfo(info) {
        // 首先恢复名称
        const nameElement = document.getElementById('characterName');
        if (nameElement && info.name) {
            nameElement.value = info.name;
            document.querySelectorAll('.character-name').forEach(el => {
                el.textContent = info.name;
            });
        }

        // 恢复其他基本信息
        Object.entries(info).forEach(([key, value]) => {
            const element = document.getElementById(key);
            if (element && value) {
                element.value = value;
                console.log(`恢复${key}:`, value);
                // 特别处理文本区域
                if (element.tagName.toLowerCase() === 'textarea') {
                    element.style.height = 'auto';
                    element.style.height = `${element.scrollHeight}px`;
                }
            }
        });

        // 特别处理背景相关文本框
        ['background', 'appearance', 'motivation'].forEach(field => {
            const element = document.getElementById(`character${field.charAt(0).toUpperCase() + field.slice(1)}`);
            if (element && info[field]) {
                element.value = info[field];
                console.log(`恢复${field}:`, info[field]);
            }
        });
    }

    static restoreAttributes(attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
            const element = document.getElementById(`${key}-value`);
            if (element) {
                element.value = value;
                console.log(`恢复属性${key}:`, value);
            }
        });
    }

    static restoreStateValues(state) {
        const maxValues = {
            hp: state.hp?.max || 6,
            stress: state.stress?.max || 6,
            armor: state.armor?.max || 6
        };

        Object.entries(maxValues).forEach(([type, maxValue]) => {
            const maxElement = document.getElementById(`${type}Max`);
            if (maxElement) {
                maxElement.value = maxValue;
                console.log(`恢复${type}最大值:`, maxValue);
            }
        });

        if (state.hp) {
            this.restoreGridState('hp-grid', state.hp.current, state.hp.max);
        }
        if (state.stress) {
            this.restoreGridState('stress-grid', state.stress.current, state.stress.max);
        }
        if (state.armor) {
            this.restoreGridState('armor-grid', state.armor.current, state.armor.max);
            const armorFields = {
                'armorValue': 'value',
                'armorName': 'name',
                'armorTrait': 'trait',
                'armorFeature': 'feature',
                'armorBaseScore': 'defense'
            };

            Object.entries(armorFields).forEach(([elementId, dataKey]) => {
                const el = document.getElementById(elementId);
                if (el && state.armor[dataKey] !== undefined) {
                    el.value = state.armor[dataKey];
                    console.log(`恢复护甲${dataKey}:`, state.armor[dataKey]);
                }
            });
        }
        if (typeof state.hope === 'number') {
            this.restoreGridState('hope-grid', state.hope);
        }

        if (state.damageThreshold) {
            const minorEl = document.getElementById('minorThreshold');
            const majorEl = document.getElementById('majorThreshold');
            if (minorEl) minorEl.value = state.damageThreshold.minor;
            if (majorEl) majorEl.value = state.damageThreshold.major;
        }
    }

    static restoreGridState(gridId, current, max = null) {
        const grid = document.getElementById(gridId);
        if (!grid) return;

        const boxes = grid.querySelectorAll('.hp-box, .stress-box, .armor-box, .hope-diamond');
        boxes.forEach((box, index) => {
            if (index < current) {
                box.classList.add('checked');
            } else {
                box.classList.remove('checked');
            }
        });

        if (max !== null) {
            const maxInput = document.getElementById(`${gridId.split('-')[0]}Max`);
            if (maxInput) maxInput.value = max;
        }
    }

    static restoreWeaponFields(weaponData) {
        Object.entries(weaponData).forEach(([baseId, data]) => {
            const cleanedId = baseId.replace('Name', '');
            const traitEl = document.getElementById(`${cleanedId}Trait`);
            const damageEl = document.getElementById(`${cleanedId}Damage`);
            const featureEl = document.getElementById(`${cleanedId}Feature`);

            if (traitEl) traitEl.value = data.trait;
            if (damageEl) damageEl.value = data.damage;
            if (featureEl) featureEl.value = data.feature;

            if (baseId.startsWith('inventoryWeapon')) {
                const primaryCheckbox = document.getElementById(`${cleanedId}Primary`);
                const secondaryCheckbox = document.getElementById(`${cleanedId}Secondary`);

                if (primaryCheckbox) primaryCheckbox.checked = data.isPrimary;
                if (secondaryCheckbox) secondaryCheckbox.checked = data.isSecondary;
            }
        });
    }

    static restoreProfessionInfo(professionInfo) {
        const professionSelect1 = document.getElementById("profession");
        const professionSelect2 = document.getElementById("profession-page2");

        if (professionSelect1 && professionSelect2) {
            if (professionInfo) {
                professionSelect1.value = professionInfo.id;
                professionSelect2.value = professionInfo.id;

                const profName = professionInfo.displayName || professionInfo.name;
                console.log('设置职业名称:', profName);

                document.querySelectorAll('.profession-name').forEach(el => {
                    el.textContent = profName;
                });

                localStorage.setItem("characterProfession", professionInfo.id);
            }
        }
    }

    static restoreCardDeck(cards = []) {
        console.log('恢复卡组数据:', cards);
        cards.forEach((card, index) => {
            const nameEl = document.getElementById(`card-name-${index}`);
            const typeEl = document.getElementById(`card-type-${index}`);
            const levelEl = document.getElementById(`card-level-${index}`);
            const recallEl = document.getElementById(`card-recall-${index}`);

            if (nameEl && card.name) {
                nameEl.value = card.name;
                if (typeEl) typeEl.value = card.type || '';
                if (levelEl) levelEl.value = card.level || '';
                if (recallEl) {
                    recallEl.value = `RC.${card.recall || '0'}`;
                    console.log(`设置卡片 ${index} 的召回值:`, recallEl.value);
                }
            }
        });
    }
}

// 初始化并清理
document.addEventListener('DOMContentLoaded', () => {
    PrintPreview.init();
    sessionStorage.removeItem('printData');
});
