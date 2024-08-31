document.addEventListener("DOMContentLoaded", function() {
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
    var swiper1 = new Swiper('.swiper-container-1', {
      slidesPerView: 1,
      slidesPerGroup: 1,
      centeredSlides: false,
      loop: true,  
      autoplay: {
        delay: 2000, 
        disableOnInteraction: false, 
      },
      observer: true,
      observeParents: true,
      breakpoints: {
        1200: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 3,
        }
      }
    });
  });



  
document.addEventListener('DOMContentLoaded', function () {
    var swiper2 = new Swiper('.swiper-container-2', {
      slidesPerView: 1, 
      slidesPerGroup: 1,
      centeredSlides: false,  
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next-2',
        prevEl: '.swiper-button-prev-2',
      },
      pagination: {
        el: '.swiper-pagination-2',
        clickable: true,
      },
      observer: true, 
      observeParents: true,
      loop: false,
      breakpoints: {
        1200: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 3,
        }
      }
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





















document.querySelector('.appointment_btn').addEventListener('click', function(event) {
  event.preventDefault(); 
  
  let isValid = true;

  document.querySelectorAll('input').forEach(function(input) {
      input.classList.remove('input-error');
      input.value = input.value.replace(/.*(Full name is required|Email is required|Invalid email format|Invalid phone number format)/, '');
  });

  const fullName = document.getElementById('full_name');
  if (fullName.value.trim() === '') {
      showError(fullName, 'Full name is required');
      isValid = false;
  }

  const email = document.getElementById('email_address');
  if (email.value.trim() === '') {
      showError(email, 'Email is required');
      isValid = false;
  } else if (!validateEmail(email.value)) {
      showError(email, 'Invalid email format');
      isValid = false;
  }

  const phoneNumber = document.getElementById('phone_number');
  if (phoneNumber.value.trim() !== '' && !validatePhoneNumber(phoneNumber.value)) {
      showError(phoneNumber, 'Invalid phone number format');
      isValid = false;
  }

  if (isValid) {
      showSuccessMessage();
  }
});

function showError(inputElement, message) {
  inputElement.value = message;
  inputElement.classList.add('input-error');

  inputElement.addEventListener('focus', function() {
      inputElement.value = '';
      inputElement.classList.remove('input-error');
  }, { once: true }); 
}

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

function validatePhoneNumber(phone) {
  const re = /^\+?[0-9]{10,20}$/;
  return re.test(String(phone));
}

function showSuccessMessage() {
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.innerHTML = `
      <div class="success-popup">
          <svg width="40" height="40" fill="green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M20.29 4.29a1 1 0 00-1.41 0l-9.29 9.29-4.29-4.29a1 1 0 00-1.41 1.41l5 5a1 1 0 001.41 0l10-10a1 1 0 000-1.41z"/>
          </svg>
          <p>Request sent successfully</p>
      </div>
  `;
  document.body.appendChild(successMessage);
  
  setTimeout(function() {
      successMessage.remove();
  }, 3000);
}


