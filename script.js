document.addEventListener('DOMContentLoaded', function () {
    const openNavButton = document.getElementById('openNav');
    const closeNavButton = document.getElementById('closeNav');
    const sideNav = document.getElementById('navSamping');

    openNavButton.addEventListener('click', function () {
        sideNav.style.left = "0px";
    });

    closeNavButton.addEventListener('click', function () {
        sideNav.style.left = "-250px";
    });
});
