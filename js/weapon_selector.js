class WeaponSelector {
    static STYLES = `
        .weapon-selector-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .weapon-selector {
            background: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 800px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }

        .weapon-item {
            display: grid;
            grid-template-columns: 50px 150px 100px 100px 100px 100px 100px 1fr;
            padding: 8px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
        }

        .weapon-item:hover {
            background: #f0f0f0;
        }

        .close-button {
            float: right;
            padding: 5px 10px;
            cursor: pointer;
        }
    `;

    static TEMPLATE = `
        <div class="weapon-selector">
            <button class="close-button">×</button>
            <h3>选择武器</h3>
            <div id="weaponListContainer"></div>
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

        container.innerHTML = ''; // Clear existing content

        weapons.forEach(weapon => {
            const div = document.createElement('div');
            div.className = 'weapon-item';
            div.innerHTML = `
                <div>${weapon.ID || ''}</div>
                <div>${weapon.名称 || ''}</div>
                <div>${weapon.检定 || ''}</div>
                <div>${weapon.属性 || ''}</div>
                <div>${weapon.范围 || ''}</div>
                <div>${weapon.伤害 || ''}</div>
                <div>${weapon.负荷 || ''}</div>
                <div>${weapon.特性 || ''}</div>
            `;
            container.appendChild(div);
        });
    }

    static async init() {
        if (this.initialized) return;

        // 创建并注入选择器 HTML
        const overlayDiv = document.createElement('div');
        overlayDiv.className = 'weapon-selector-overlay';
        overlayDiv.style.display = 'none';
        overlayDiv.innerHTML = this.TEMPLATE;
        document.body.appendChild(overlayDiv);

        // 注入样式
        const styleSheet = document.createElement('style');
        styleSheet.textContent = this.STYLES;
        document.head.appendChild(styleSheet);

        this.initEvents();
        this.displayWeapons();

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
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    static show() {
        const overlay = document.querySelector('.weapon-selector-overlay');
        if (overlay) {
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            // 重新显示武器列表
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

                const weapon = {
                    ID: weaponItem.children[0].textContent,
                    名称: weaponItem.children[1].textContent,
                    检定: weaponItem.children[2].textContent,
                    属性: weaponItem.children[3].textContent,
                    范围: weaponItem.children[4].textContent,
                    伤害: weaponItem.children[5].textContent,
                    负荷: weaponItem.children[6].textContent,
                    特性: weaponItem.children[7].textContent
                };

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
