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

    
    function animateNumber(element) {
        var targetString = element.getAttribute("data-target");
        var suffix = element.getAttribute("data-suffix") || ""; 
        var hasComma = targetString.includes(',');
        var hasDot = targetString.includes('.');
        var format = hasComma ? ',' : (hasDot ? '.' : '');
        var cleanedTarget = targetString.replace(/,/g, '').replace(/\./g, '');
        var targetValue = parseFloat(cleanedTarget);
        var currentValue = 0;
        var stepSize = Math.ceil(targetValue / 100); 

        function formatNumber(number) {
            if (format) {
                var formattedNumber = number.toString();
                var parts = formattedNumber.split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, format);
                return parts.join(".");
            } else {
                return number.toString(); 
            }
        }

        function step(timestamp) {
            if (currentValue < targetValue) {
                currentValue = Math.min(currentValue + stepSize, targetValue);
                element.textContent = formatNumber(currentValue) + suffix; 
                requestAnimationFrame(step);
            } else {
                element.textContent = formatNumber(targetValue) + suffix;
            }
        }

        setTimeout(() => requestAnimationFrame(step), 100);
    }

   
    function handleIntersection(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var target = entry.target;

                if (target.tagName === 'PROGRESS') {
                    var percentParagraph = target.parentElement.previousElementSibling.querySelector(".item-description-percent-paragraph");
                    animateProgressBar(target, percentParagraph);
                }

                if (target.classList.contains("count-animation")) {
                    animateNumber(target);
                }

                observer.unobserve(target); 
            }
        });
    }

    var observer = new IntersectionObserver(handleIntersection, {
        threshold: 1.0 
    });

    var progressBars = document.querySelectorAll("progress");
    progressBars.forEach(function(progressBar) {
        observer.observe(progressBar);
    });

    var countElements = document.querySelectorAll(".count-animation");
    countElements.forEach(function(element) {
        observer.observe(element);
    });
});








document.addEventListener('DOMContentLoaded', function () {
  var swiper3 = new Swiper('.swiper-container-3', {
    slidesPerView: 1, 
    slidesPerGroup: 1,
    centeredSlides: false,  
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next-3',
      prevEl: '.swiper-button-prev-3',
    },
    pagination: {
      el: '.swiper-pagination-3',
      clickable: true,
    },
    observer: true, 
    observeParents: true,
    loop: false,
    breakpoints: {
      1200: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      }
    }
  });
});
