const headIcon = document.querySelector(".main_icon");
const header = document.querySelector(".head");

headIcon.onclick = function () {
	header.classList.toggle('active');
};
