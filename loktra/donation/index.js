var totalAmount = 1000;
var remainingAmount = totalAmount;
var clicks = 0;

// Slider
function Slider(targetElement) {
    this.targetElement = targetElement;
    this.current = 0;
    this.currentAmount = 0;
    this.intervalSpeed = 10; // 애니메니션 스피드
}

Slider.prototype.moveForward = function(remainingAmount) {
    if (this.currentAmount === totalAmount) return;
    this.currentAmount = totalAmount - remainingAmount;
    var intervalId = setInterval(frame, this.intervalSpeed);

    var start = this.current;
    this.current = this.currentAmount / 10;
    var end = this.current;
    var elem = this.targetElement;
    console.log(width);

    function frame() {
        if (start >= end) {
            clearInterval(intervalId);
        } else {
            start++;
            elem.style.width = start + "%";
        }
    }
};

const createDonation = () => {
    const $donors = document.querySelector(".donation-donors");
    const $notification = document.querySelector(".notification-bubble");
    const $donationInput = document.querySelector("input[name=give]");
    const $donationButton = document.querySelector(".donation-button");
    const targetElement = document.querySelector(".donation-slider span");
    var slider = new Slider(targetElement);

    // button click event
    $donationButton.addEventListener("click", () => {
        // update $donors
        if (remainingAmount > 0 && $donationInput.value !== "") clicks++;
        $donors.innerHTML = `<p>Join the ${clicks} other donors who have already supported this project. Every dollar helps.</p>`;

        // update $notification
        remainingAmount = remainingAmount - $donationInput.value;
        if (remainingAmount <= 0) {
            remainingAmount = 0;
        }
        $notification.innerHTML = `$${remainingAmount} still needed for this project`;

        // update slider
        slider.moveForward(parseInt(remainingAmount));
    });
};

document.querySelector(".save-btn").onclick = (() => {
    const $popupModal = document.querySelector(
        ".popup-modal[data-popup-modal='one']"
    );

    return (e) => {
        $popupModal.classList.add("is--visible");
    };
})();

document.querySelector(
    ".popup-modal__close[data-popup-modal-close='one']"
).onclick = (() => {
    const $popupModal = document.querySelector(
        ".popup-modal[data-popup-modal='one']"
    );

    return (e) => {
        $popupModal.classList.remove("is--visible");
    };
})();

document.querySelector(
    ".popup-modal__close[data-popup-modal-close='two']"
).onclick = (() => {
    const $popupModal = document.querySelector(
        ".popup-modal[data-popup-modal='two']"
    );

    return (e) => {
        $popupModal.classList.remove("is--visible");
    };
})();

document.querySelector(".share-btn").onclick = (() => {
    const $popupModal = document.querySelector(
        ".popup-modal[data-popup-modal='two']"
    );

    return (e) => {
        $popupModal.classList.add("is--visible");
    };
})();

const shareDonation = () => {};

document.addEventListener("DOMContentLoaded", createDonation());