class WeaponSelector {
    static STYLES = `
        .weapon-selector-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s, opacity 0.2s;
            pointer-events: none;
        }

        .weapon-selector-overlay.active {
            visibility: visible;
            opacity: 1;
            pointer-events: all;
        }

        .weapon-selector {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 8px;
            width: min(1200px, 90vw);
            height: min(600px, 80vh);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            display: grid;
            grid-template-rows: auto auto 1fr;
            gap: 10px;
        }

        .weapon-selector h3 {
            margin: 0 0 15px 0;
            padding-right: 30px;
        }

        .weapon-list-container {
            overflow-y: auto;
            border: 1px solid #eee;
            border-radius: 4px;
            position: relative;
        }

        .weapon-item {
            display: grid;
            grid-template-columns: 120px 80px 80px 80px 80px 80px minmax(200px, 1fr);
            gap: 10px;
            padding: 8px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
            min-height: 32px;
            max-height: 32px;
            align-items: center;
        }

        .weapon-item > div {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .weapon-item:hover {
            background: #f0f0f0;
        }

        .close-button {
            position: absolute;
            top: 15px;
            right: 15px;
            padding: 5px 10px;
            cursor: pointer;
            border: none;
            background: none;
            font-size: 20px;
        }

        .weapon-header {
            display: grid;
            grid-template-columns: 120px 80px 80px 80px 80px 80px minmax(200px, 1fr);
            gap: 10px;
            padding: 8px;
            font-weight: bold;
            border-bottom: 2px solid #ccc;
        }
    `;

    static TEMPLATE = `
        <div class="weapon-selector">
            <button class="close-button">×</button>
            <h3>选择武器</h3>
            <div class="weapon-header">
                <div>名称</div>
                <div>检定</div>
                <div>属性</div>
                <div>范围</div>
                <div>伤害</div>
                <div>负荷</div>
                <div>特性</div>
            </div>
            <div id="weaponListContainer" class="weapon-list-container"></div>
        </div>
    `;

    static getAllWeapons() {
        const allWeapons = [
            ...weapon_t1_physics,
            ...weapon_t1_magic,
            ...weapon_t2_physics,
            ...weapon_t2_magic,
            ...weapon_t3_physics,
            ...weapon_t3_magic,
            ...weapon_t4_physics,
            ...weapon_t4_magic,
            ...offhand_weapon_t1,
            ...offhand_weapon_t2,
            ...offhand_weapon_t3,
            ...offhand_weapon_t4
        ];
        return allWeapons;
    }

    static displayWeapons() {
        const weapons = this.getAllWeapons();
        const container = document.getElementById('weaponListContainer');
        if (!container) return;

        container.innerHTML = '';

        weapons.forEach(weapon => {
            const div = document.createElement('div');
            div.className = 'weapon-item';
            div.innerHTML = `
                <div title="${removeEnglishText(weapon.名称)}">${removeEnglishText(weapon.名称)}</div>
                <div title="${removeEnglishText(weapon.检定)}">${removeEnglishText(weapon.检定)}</div>
                <div title="${removeEnglishText(weapon.属性)}">${removeEnglishText(weapon.属性)}</div>
                <div title="${removeEnglishText(weapon.范围)}">${removeEnglishText(weapon.范围)}</div>
                <div title="${weapon.伤害}">${weapon.伤害}</div>
                <div title="${removeEnglishText(weapon.负荷)}">${removeEnglishText(weapon.负荷)}</div>
                <div title="${removeEnglishText(weapon.特性)}">${removeEnglishText(weapon.特性)}</div>
            `;
            // 保存完整数据用于选择
            div.dataset.weaponData = JSON.stringify({
                ID: weapon.ID,
                名称: weapon.名称,
                检定: weapon.检定,
                属性: weapon.属性,
                范围: weapon.范围,
                伤害: weapon.伤害,
                负荷: weapon.负荷,
                特性: weapon.特性
            });
            container.appendChild(div);
        });
    }

    static async init() {
        if (this.initialized) return;

        const overlayDiv = document.createElement('div');
        overlayDiv.className = 'weapon-selector-overlay';
        overlayDiv.innerHTML = this.TEMPLATE;
        document.body.appendChild(overlayDiv);

        const styleSheet = document.createElement('style');
        styleSheet.textContent = this.STYLES;
        document.head.appendChild(styleSheet);

        this.initEvents();

        this.initialized = true;
    }

    static injectStyles() {
        // Implementation for injecting styles
    }

    static injectHTML() {
        // Implementation for injecting HTML
    }

    static hide() {
        const overlay = document.querySelector('.weapon-selector-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    static show() {
        const overlay = document.querySelector('.weapon-selector-overlay');
        if (overlay) {
            overlay.classList.add('active');
            this.displayWeapons();
        }
    }

    static initEvents() {
        const overlay = document.querySelector('.weapon-selector-overlay');
        const closeButton = document.querySelector('.weapon-selector-overlay .close-button');
        const weaponList = document.getElementById('weaponListContainer');

        if (overlay) {
            overlay.onclick = (e) => {
                if (e.target === overlay) {
                    this.hide();
                }
            };
        }

        if (closeButton) {
            closeButton.onclick = () => this.hide();
        }

        if (weaponList) {
            weaponList.onclick = (e) => {
                const weaponItem = e.target.closest('.weapon-item');
                if (!weaponItem) return;

                const weapon = JSON.parse(weaponItem.dataset.weaponData);

                if (window.currentWeaponTarget && typeof handleWeaponSelection === 'function') {
                    handleWeaponSelection(weapon);
                }
                this.hide();
            };
        }
    }
}

// Export for external use
window.WeaponSelector = WeaponSelector;
