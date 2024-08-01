/*
const time = 3000;
const step = 1;

function outNum(elem) {
    let e = document.querySelector(elem);
    let finalValue = parseInt(e.innerHTML); 
    let n = 0;
    let t = Math.round(time / (finalValue / step));
    let interval = setInterval(() => {
        n = n + step;
        if (n >= finalValue) { 
            clearInterval(interval);
            n = finalValue; 
        }
        e.innerHTML = n;
    }, t);
}
outNum('#out1');
outNum('#out2'); */


document.addEventListener("DOMContentLoaded", function() {
    var progressBars = document.querySelectorAll("progress");

    progressBars.forEach(function(progressBar) {
        var percentParagraph = progressBar.parentElement.previousElementSibling.querySelector(".item-description-percent-paragraph");
        var targetValue = parseInt(progressBar.getAttribute("value"));

        // Set the initial value of each progress bar to 0
        progressBar.value = 0;

        // Function to animate each progress bar
        function animateProgressBar() {
            var currentValue = progressBar.value;
            var step = 1; // Change this value to adjust animation speed

            if (currentValue < targetValue) {
                progressBar.value = Math.min(currentValue + step, targetValue);
                percentParagraph.textContent = progressBar.value + "%";
                requestAnimationFrame(animateProgressBar);
            }
        }

        // Call the animateProgressBar function after a brief delay to allow DOM rendering
        setTimeout(animateProgressBar, 100);
    });
});