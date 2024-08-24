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

    // Функция для анимации числовых значений с суффиксом и форматированием
    function animateNumber(element) {
        var targetString = element.getAttribute("data-target");
        var suffix = element.getAttribute("data-suffix") || ""; // Получаем суффикс, если он указан

        // Определяем формат числа на основе наличия запятых или точек в data-target
        var hasComma = targetString.includes(',');
        var hasDot = targetString.includes('.');
        var format = hasComma ? ',' : (hasDot ? '.' : '');
        var cleanedTarget = targetString.replace(/,/g, '').replace(/\./g, '');
        var targetValue = parseFloat(cleanedTarget);
        var currentValue = 0;
        var stepSize = Math.ceil(targetValue / 100); // Размер шага (можно настроить)

        function formatNumber(number) {
            // Форматируем число с учетом указанного разделителя
            if (format) {
                var formattedNumber = number.toString();
                var parts = formattedNumber.split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, format);
                return parts.join(".");
            } else {
                return number.toString(); // Без форматирования
            }
        }

        function step(timestamp) {
            if (currentValue < targetValue) {
                currentValue = Math.min(currentValue + stepSize, targetValue);
                element.textContent = formatNumber(currentValue) + suffix; // Форматируем число с запятыми или точками
                requestAnimationFrame(step);
            } else {
                element.textContent = formatNumber(targetValue) + suffix; // Конечное значение с форматированием
            }
        }

        setTimeout(() => requestAnimationFrame(step), 100);
    }

    // Функция для обработки пересечений элементов
    function handleIntersection(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var target = entry.target;

                // Для прогресс-баров
                if (target.tagName === 'PROGRESS') {
                    var percentParagraph = target.parentElement.previousElementSibling.querySelector(".item-description-percent-paragraph");
                    animateProgressBar(target, percentParagraph);
                }

                // Для числовых значений
                if (target.classList.contains("count-animation")) {
                    animateNumber(target);
                }

                observer.unobserve(target); // Останавливаем отслеживание после анимации
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

    // Поиск всех числовых значений для анимации и добавление их в наблюдатель
    var countElements = document.querySelectorAll(".count-animation");
    countElements.forEach(function(element) {
        observer.observe(element);
    });
});