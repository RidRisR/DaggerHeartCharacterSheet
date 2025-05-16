// 初始化职业同步
function initProfessionSync() {
    const professionSelect1 = document.getElementById("profession");
    const professionSelect2 = document.getElementById("profession-page2");

    function handleProfessionChange(selectedProfessionId) {
        if (professionSelect1) professionSelect1.value = selectedProfessionId;
        if (professionSelect2) professionSelect2.value = selectedProfessionId;

        const profNameElement = document.getElementById("profession-name");
        if (profNameElement) {
            profNameElement.textContent = getProfessionName(selectedProfessionId);
        }
        localStorage.setItem("characterProfession", selectedProfessionId);
        initUpgradeOptions();
        loadUpgradeStatesForProfession(selectedProfessionId);
    }

    if (professionSelect1) {
        professionSelect1.addEventListener("change", function () {
            handleProfessionChange(this.value);
        });
    }
    if (professionSelect2) {
        professionSelect2.addEventListener("change", function () {
            handleProfessionChange(this.value);
        });
    }
}
