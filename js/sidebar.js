document.addEventListener('DOMContentLoaded', function () {
    const quickSave = document.getElementById('quickSave');
    const quickLoad = document.getElementById('quickLoad');
    const sidebarNotes = document.getElementById('sidebarNotes');

    // 从本地存储加载笔记
    sidebarNotes.value = localStorage.getItem('sidebarNotes') || '';

    // 保存笔记
    sidebarNotes.addEventListener('input', () => {
        localStorage.setItem('sidebarNotes', sidebarNotes.value);
    });

    // 快速保存功能
    quickSave.addEventListener('click', () => {
        document.getElementById('save-button').click();
    });

    // 快速加载功能
    quickLoad.addEventListener('click', () => {
        document.getElementById('load-button').click();
    });

    // 添加位置计算和更新逻辑
    function updateSidebarPosition() {
        const container = document.querySelector('.container');
        const sidebar = document.getElementById('floating-sidebar');
        if (!container || !sidebar) return;

        const containerRect = container.getBoundingClientRect();
        const sidebarHeight = sidebar.offsetHeight;

        // 设置侧边栏位置
        sidebar.style.left = (containerRect.left - sidebar.offsetWidth - 20) + 'px';
        sidebar.style.top = Math.max(20, (window.innerHeight - sidebarHeight) / 2) + 'px';
    }

    // 初始定位和监听窗口变化
    updateSidebarPosition();
    window.addEventListener('resize', updateSidebarPosition);
    window.addEventListener('scroll', updateSidebarPosition);
});
