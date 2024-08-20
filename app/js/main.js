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

/*
document.addEventListener("DOMContentLoaded", function() {
    var progressBars = document.querySelectorAll("progress");

    progressBars.forEach(function(progressBar) {
        var percentParagraph = progressBar.parentElement.previousElementSibling.querySelector(".item-description-percent-paragraph");
        var targetValue = parseInt(progressBar.getAttribute("value"));

        progressBar.value = 0;

        function animateProgressBar() {
            var currentValue = progressBar.value;
            var step = 1; 
            if (currentValue < targetValue) {
                progressBar.value = Math.min(currentValue + step, targetValue);
                percentParagraph.textContent = progressBar.value + "%";
                requestAnimationFrame(animateProgressBar);
            }
        }
        setTimeout(animateProgressBar, 100);
    });
});
*/
document.addEventListener("DOMContentLoaded", function() {
    // Функция для анимации прогресс-бара
    function animateProgressBar(progressBar, percentParagraph) {
        var targetValue = parseInt(progressBar.getAttribute("value"));
        progressBar.value = 0;

        function step() {
            var currentValue = progressBar.value;
            var stepSize = 1; 
            if (currentValue < targetValue) {
                progressBar.value = Math.min(currentValue + stepSize, targetValue);
                percentParagraph.textContent = progressBar.value + "%";
                requestAnimationFrame(step);
            }
        }

        setTimeout(step, 100);
    }

    // Функция для обработки элементов
    function handleIntersection(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var progressBar = entry.target;
                var percentParagraph = progressBar.parentElement.previousElementSibling.querySelector(".item-description-percent-paragraph");
                animateProgressBar(progressBar, percentParagraph);
                observer.unobserve(progressBar); // Остановить отслеживание после анимации
            }
        });
    }

    // Создание наблюдателя
    var observer = new IntersectionObserver(handleIntersection, {
        threshold: 1.0 // Элемент должен быть полностью видимым для запуска анимации
    });

    // Поиск всех прогресс-баров и добавление их в наблюдатель
    var progressBars = document.querySelectorAll("progress");
    progressBars.forEach(function(progressBar) {
        observer.observe(progressBar);
    });
});
