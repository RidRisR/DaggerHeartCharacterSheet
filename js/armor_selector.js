class ArmorSelector {
    static STYLES = `
        .armor-selector-overlay {
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

        .armor-selector-overlay.active {
            visibility: visible;
            opacity: 1;
            pointer-events: all;
        }

        .armor-selector {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 8px;
            width: min(1000px, 90vw);
            height: min(600px, 80vh);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            display: grid;
            grid-template-rows: auto 1fr;
            gap: 10px;
        }

        .armor-list-container {
            overflow-y: auto;
            border: 1px solid #eee;
            border-radius: 4px;
        }

        .armor-header {
            display: grid;
            grid-template-columns: 200px 100px minmax(300px, 1fr);
            gap: 10px;
            padding: 8px;
            font-weight: bold;
            background: #f5f5f5;
            border-bottom: 2px solid #ccc;
            position: sticky;
            top: 0;
        }

        .armor-item {
            display: grid;
            grid-template-columns: 200px 100px minmax(300px, 1fr);
            gap: 10px;
            padding: 8px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
            min-height: 32px;
            align-items: center;
        }

        .armor-item:hover {
            background: #f0f0f0;
        }

        .armor-item > div {
            padding: 4px;
        }
    `;

    static TEMPLATE = `
        <div class="armor-selector">
            <button class="close-button">×</button>
            <h3>选择护甲</h3>
            <div class="armor-header">
                <div>名称</div>
                <div>防御</div>
                <div>特性</div>
            </div>
            <div id="armorListContainer" class="armor-list-container"></div>
        </div>
    `;

    static getAllArmors() {
        return [
            ...armor_t1,
            ...armor_t2,
            ...armor_t3,
            ...armor_t4
        ];
    }

    static displayArmors() {
        const armors = this.getAllArmors();
        const container = document.getElementById('armorListContainer');
        if (!container) return;

        container.innerHTML = '';

        // 添加空白选项
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'armor-item';
        emptyDiv.innerHTML = `
            <div>--清除选择--</div>
            <div></div>
            <div></div>
        `;
        emptyDiv.dataset.armorData = JSON.stringify({
            ID: "",
            名称: "",
            防御: "",
            特性: ""
        });
        container.appendChild(emptyDiv);

        armors.forEach(armor => {
            const div = document.createElement('div');
            div.className = 'armor-item';
            div.innerHTML = `
                <div title="${removeEnglishText(armor.名称)}">${removeEnglishText(armor.名称)}</div>
                <div title="${armor.防御}">${armor.防御}</div>
                <div title="${removeEnglishText(armor.特性)}">${removeEnglishText(armor.特性)}</div>
            `;
            // 修改数据存储格式，使用中文属性名
            div.dataset.armorData = JSON.stringify({
                ID: armor.ID,
                名称: armor.名称,
                防御: armor.防御,
                特性: armor.特性
            });
            container.appendChild(div);
        });
    }

    static async init() {
        if (this.initialized) return;

        const overlayDiv = document.createElement('div');
        overlayDiv.className = 'armor-selector-overlay';
        overlayDiv.innerHTML = this.TEMPLATE;
        document.body.appendChild(overlayDiv);

        const styleSheet = document.createElement('style');
        styleSheet.textContent = this.STYLES;
        document.head.appendChild(styleSheet);

        this.initEvents();

        this.initialized = true;
    }

    static hide() {
        const overlay = document.querySelector('.armor-selector-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    static show() {
        const overlay = document.querySelector('.armor-selector-overlay');
        if (overlay) {
            overlay.classList.add('active');
            this.displayArmors();
        }
    }

    static initEvents() {
        const overlay = document.querySelector('.armor-selector-overlay');
        const closeButton = document.querySelector('.armor-selector-overlay .close-button');
        const armorList = document.getElementById('armorListContainer');

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

        if (armorList) {
            armorList.onclick = (e) => {
                const armorItem = e.target.closest('.armor-item');
                if (!armorItem) return;

                const armor = JSON.parse(armorItem.dataset.armorData);

                if (typeof handleArmorSelection === 'function') {
                    handleArmorSelection(armor);
                }
                this.hide();
            };
        }
    }
}

window.ArmorSelector = ArmorSelector;
