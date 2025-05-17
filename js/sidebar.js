class CharacterCreationGuide {
    constructor() {
        this.steps = [
            { text: "首先选择你的职业。TEST" },
            { text: "TEST" },
            { text: "TEST" },
            { text: "TEST" },
            { text: "TEST" },
            { text: "TEST" }
        ];

        this.currentStep = parseInt(localStorage.getItem('currentGuideStep')) || 0;
        // 修改默认值为 true
        this.isVisible = localStorage.getItem('guideIsVisible') !== 'false';

        this.createSidebarElement();
        this.init();
    }

    createSidebarElement() {
        const sidebarTemplate = `
            <div id="floating-sidebar" class="guide-sidebar">
                <div class="guide-header">
                    <h3>角色创建指南</h3>
                    <button id="close-nav">×</button>
                </div>
                <div id="nav-content"></div>
                <div class="guide-controls">
                    <button id="prev-step">上一步</button>
                    <button id="next-step">下一步</button>
                </div>
            </div>
        `;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = sidebarTemplate;
        document.body.appendChild(tempDiv.firstElementChild);
    }

    init() {
        try {
            this.updateContent();
            this.attachEventListeners();

            // 确保创建后立即显示
            requestAnimationFrame(() => {
                const sidebar = document.getElementById('floating-sidebar');
                if (sidebar) {
                    sidebar.style.display = this.isVisible ? 'block' : 'none';
                }
            });
        } catch (error) {
            console.error('Failed to initialize guide:', error);
        }
    }

    updateContent() {
        const content = document.getElementById('nav-content');
        if (!content) {
            console.error('Nav content element not found');
            return;
        }

        content.textContent = this.steps[this.currentStep].text;

        const prevBtn = document.getElementById('prev-step');
        const nextBtn = document.getElementById('next-step');

        if (prevBtn && nextBtn) {
            prevBtn.disabled = this.currentStep === 0;
            nextBtn.disabled = this.currentStep === this.steps.length - 1;
        }

        localStorage.setItem('currentGuideStep', this.currentStep);
    }

    attachEventListeners() {
        const prevBtn = document.getElementById('prev-step');
        const nextBtn = document.getElementById('next-step');
        const closeBtn = document.getElementById('close-nav');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevStep());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStep());
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.toggleVisibility());
        }
    }

    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.updateContent();
        }
    }

    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.updateContent();
        }
    }

    toggleVisibility() {
        this.isVisible = !this.isVisible;
        const sidebar = document.getElementById('floating-sidebar');
        if (sidebar) {
            sidebar.style.display = this.isVisible ? 'block' : 'none';
            localStorage.setItem('guideIsVisible', this.isVisible);
        }
    }
}

// 清除之前的状态并初始化
document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('guideIsVisible');
    new CharacterCreationGuide();
});
