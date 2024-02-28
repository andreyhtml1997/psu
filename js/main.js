let terms_swiper__container = null; // Объявляем переменную за пределами условия, чтобы иметь к ней доступ вне блока if

function smoothAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      // Проверяем, существует ли элемент с указанным ID
      if (document.getElementById(targetId.substring(1))) {
        const target = document.querySelector(targetId);
        let offset;
        const header = document.querySelector('header');


        if(document.querySelector('.product-page')) {
          if (window.innerWidth < 991) {
            offset = target.offsetTop + header.clientHeight - 200;
          } else if (window.innerWidth < 1199) {
            offset = target.offsetTop + header.clientHeight - 200;
          } else {
            offset = target.offsetTop + header.clientHeight - 250;
          }
        } else {
          if (window.innerWidth < 991) {
            offset = target.offsetTop + header.clientHeight + 60;
          } else {
            offset = target.offsetTop + header.clientHeight;
          }
        }
        
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      }
    });
  });
}

function headerToggle() {
  document.querySelectorAll('.menu-toggle').forEach(el => el.addEventListener('click', function(){
    document.querySelector('.header').classList.toggle('active');
    document.querySelector('body').classList.toggle('overflow-hidden');
  }));
}

function menu_anchor() {
  let current = "";
  const sections = document.querySelectorAll(".anchor-menu-el");
  const navLi = document.querySelectorAll(".anchor-menu-link");
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if(document.querySelector('.product-page')) {
      if (pageYOffset >= sectionTop - 150 && section.getAttribute("id")) {
        current = section.getAttribute("id"); 
      }
    } else {
      if (pageYOffset >= sectionTop + document.querySelector('header').clientHeight && section.getAttribute("id")) {
        current = section.getAttribute("id"); 
      }
    }
  });
  navLi.forEach((li) => {
    li.classList.remove("active");
    if (li.getAttribute('href').replace('#', '') == current) {
      li.classList.add("active");
    }
  });
  if(pageYOffset >= (document.body.clientHeight - document.documentElement.clientHeight)) {
    navLi.forEach(el => {
      el.classList.remove("active");
     //  if(el.classList.contains('to-footer')){
     //    el.classList.add("active")
     //  }
    })
  }
}

function product_nav_header_init() {
  if(document.querySelector('.product-nav')) {
    const element = document.querySelector('.product-nav');
    if(pageYOffset > 300) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  }
}

function initializeStickySidebar() {
  if (document.querySelector('.terms-swiper__container') && window.innerWidth < 991) {
    terms_swiper__container = new StickySidebar('.terms-swiper__container', {
      topSpacing: 80,
      bottomSpacing: 20,
      containerSelector: '.section__body',
      innerWrapperSelector: '.terms-swiper'
    });
  } else {
    // Если условие не выполняется или окно больше 991px, деактивируем StickySidebar
    if (terms_swiper__container !== null) {
      terms_swiper__container.destroy();
      terms_swiper__container = null;
    }
  }

  if(document.querySelector('.download-metarials__els-container')) {
    const properties_sidebar = new StickySidebar('.download-metarials__els-container', {
      topSpacing: 160,
      bottomSpacing: 20,
      containerSelector: '.properties-body-js',
      innerWrapperSelector: '.download-metarials__els'
    });
  }
  
  if(document.querySelector('.catalog-filter-container')) {
    const catalog_filter_sidebar = new StickySidebar('.catalog-filter-container', {
      topSpacing: 120,
      bottomSpacing: 20,
      containerSelector: '.catalog .section__body',
      // innerWrapperSelector: '.catalog-filter'
    });
  }
  
  if(document.querySelector('.terms__nav-container')) {
    const terms_nav = new StickySidebar('.terms__nav-container', {
      topSpacing: 20,
      bottomSpacing: 20,
      containerSelector: '.terms__body',
      innerWrapperSelector: '.terms__nav'
    });
  }
}

function countdown_init() {
  if(document.querySelector('#countdown')) {
    // Устанавливаем дату до которой будем отсчитывать время
    var targetDate = new Date("2024-03-01");
    // Функция для обновления таймера
    function updateTimer() {
        // Получаем текущую дату и время
        var currentDate = new Date();
  
        // Вычисляем разницу между текущей датой и целевой датой
        var diff = countdown(targetDate, currentDate, countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS);
  
        // Формируем строку с оставшимся временем
        var countdownStr = `
    <div class="countdown-el">
      <span class="countdown-el-value">${diff.days}</span>
      <span class="countdown-el-title">дней</span>
    </div>
    :
    <div class="countdown-el">
      <span class="countdown-el-value">${diff.hours}</span>
      <span class="countdown-el-title">часов</span>
    </div>
    :
    <div class="countdown-el">
      <span class="countdown-el-value">${diff.minutes}</span>
      <span class="countdown-el-title">минут</span>
    </div>
    :
    <div class="countdown-el">
      <span class="countdown-el-value">${diff.seconds}</span>
      <span class="countdown-el-title">секунд</span>
    </div>
        `
  
        // Выводим строку на страницу
        document.getElementById('countdown').innerHTML = countdownStr;
    }
    // Обновляем таймер каждую секунду
    setInterval(updateTimer, 1000);
    // Вызываем функцию для первоначального отображения времени
    updateTimer();
  }
}

function initialize_swiper() {
  if(document.querySelector(".terms-swiper")) {
    const terms_swiper = new Swiper(".terms-swiper", {
      slidesPerView: 4,
      spaceBetween: 20,
      speed: 600,
      navigation: {
        prevEl: ".terms-swiper__container .swiper__nav-el--prev",
        nextEl: ".terms-swiper__container .swiper__nav-el--next",
      },
      breakpoints: {
        // when window width is >= 320px
        0: {
          slidesPerView: 2.1,
          spaceBetween: 4
        },
        // when window width is >= 480px
        767: {
          slidesPerView: 3.1,
          spaceBetween: 10
        },
        // when window width is >= 640px
        991: {
          slidesPerView: 4,
          spaceBetween: 20,
        }
      }
    });
  }

  if(document.querySelector(".feedbacks-swiper")) {
    const feedbacks_swiper = new Swiper(".feedbacks-swiper", {
      slidesPerView: 1.15,
      spaceBetween: 70,
      speed: 600,
      navigation: {
        prevEl: ".feedbacks .swiper__nav-el--prev",
        nextEl: ".feedbacks .swiper__nav-el--next",
      },
      breakpoints: {
        0: {
          spaceBetween: 10,
        },
        575: {
          spaceBetween: 40,
        },
        991: {
          spaceBetween: 70,
        }
      }
    });
  }

  if(document.querySelector(".product-video") && document.querySelector(".product-video-pagination")) {
    const product_video_pagination_swiper = new Swiper(".product-video-pagination", {
      spaceBetween: 20,
      slidesPerView: 5,
      watchSlidesProgress: true,
      freeMode: true,
      centeredSlides: true,
      // navigation: {
      //   nextEl: ".product-gallery-pagination__container .swiper__nav-el--next",
      //   prevEl: ".product-gallery-pagination__container .swiper__nav-el--prev",
      // },
    });
    const product_video_swiper = new Swiper(".product-video", {
      spaceBetween: 20,
      speed: 600,
      // navigation: {
      //   nextEl: ".product-gallery-main .swiper__nav-el--next",
      //   prevEl: ".product-gallery-main .swiper__nav-el--prev",
      // },
      thumbs: {
        swiper: product_video_pagination_swiper,
      },
      breakpoints: {
        0: {
          slidesPerView: 1.15,
          spaceBetween: 10,
        },
        575: {
          slidesPerView: 1,
          spaceBetween: 20,
        }
      }
    });
  }

  if(document.querySelector(".functions-swiper")) {
    const functions_swiper = new Swiper(".functions-swiper", {
      slidesPerView: 2.15,
      spaceBetween: 25,
      speed: 600,
      navigation: {
        prevEl: ".functions-swiper .swiper__nav-el--prev",
        nextEl: ".functions-swiper .swiper__nav-el--next",
      },
      breakpoints: {
        0: {
          slidesPerView: 1.15,
          spaceBetween: 10,
        },
        575: {
          slidesPerView: 1.75,
          spaceBetween: 25,
        },
        767: {
          slidesPerView: 2.15,
          spaceBetween: 25,
        }
      }
    });
  }

  if(document.querySelector(".photo-swiper")) {
    const photo_swiper = new Swiper(".photo-swiper", {
      slidesPerView: 1.5,
      spaceBetween: 25,
      speed: 600,
      navigation: {
        prevEl: ".photo-swiper .swiper__nav-el--prev",
        nextEl: ".photo-swiper .swiper__nav-el--next",
      },
      breakpoints: {
        0: {
          slidesPerView: 1.15,
          spaceBetween: 10,
        },
        575: {
          slidesPerView: 1.2,
          spaceBetween: 10,
        },
        767: {
          slidesPerView: 1.3,
          spaceBetween: 25,
        }
      }
    });
  }


  if(document.querySelector('.product-gallery-main') && document.querySelector('.product-gallery-pagination')) {
    const product_gallery_pagination = new Swiper(".product-gallery-pagination", {
      spaceBetween: 20,
      slidesPerView: 5,
      watchSlidesProgress: true,
      direction: "vertical",
      freeMode: true,
      navigation: {
        nextEl: ".product-gallery-pagination__container .swiper__nav-el--next",
        prevEl: ".product-gallery-pagination__container .swiper__nav-el--prev",
      },
    });
    const product_gallery_main = new Swiper(".product-gallery-main", {
      spaceBetween: 20,
      speed: 600,
      navigation: {
        nextEl: ".product-gallery-main .swiper__nav-el--next",
        prevEl: ".product-gallery-main .swiper__nav-el--prev",
      },
      thumbs: {
        swiper: product_gallery_pagination,
      },
      breakpoints: {
        0: {
          pagination: {
            el: ".swiper-pagination",
          },
        },
        575: {

        }
      }
    });
  }

  if(document.querySelector('[data-fancybox="gallery"]')) {
    Fancybox.bind('[data-fancybox="gallery"]', {
      // Your custom options for a specific gallery
    });
  }

  if(document.querySelector('[data-fancybox="product-video"]')) {
    Fancybox.bind('[data-fancybox="product-video"]', {
      // Your custom options for a specific gallery
    });
  }

  if(document.querySelector('[data-fancybox="photo-gallery"]')) {
    Fancybox.bind('[data-fancybox="photo-gallery"]', {
      // Your custom options for a specific gallery
    });
  }

  if(document.querySelector(".our-team .swiper")) {
    const our_team_swiper = new Swiper(".our-team .swiper", {
      spaceBetween: 0,
      slidesPerView: '1.15',
      speed: 600,
      allowSlideNext: false,
      allowSlidePrev: false,
      breakpoints: {
        0: {
          allowSlideNext: true,
          allowSlidePrev: true,

        },
        767: {
          allowSlideNext: false,
          allowSlidePrev: false,
        }
      }
    });
  }

  if(document.querySelector(".promotion-swiper")) {
    const promotions_swiper = new Swiper(".promotion-swiper", {
      
      slidesPerView: '3',
      speed: 600,
      spaceBetween: 25,
      navigation: {
        prevEl: ".promotion-swiper .swiper__nav-el--prev",
        nextEl: ".promotion-swiper .swiper__nav-el--next",
      },
      breakpoints: {
        0: {
          allowSlideNext: false,
          allowSlidePrev: false,
          spaceBetween: 0,
        },
        767: {
          spaceBetween: 25,
          allowSlideNext: true,
          allowSlidePrev: true, 
          slidesPerView: '2',
        },
        991: {
          slidesPerView: '2.3',
          spaceBetween: 25,
        },
        1400: {
          slidesPerView: '3',
          spaceBetween: 25,
        }
      }
    });
  }

  if(document.querySelector(".key-features .swiper")) {
    const key_features_swiper = new Swiper(".key-features .swiper", {
      spaceBetween: 0,
      slidesPerView: '1.15',
      speed: 600,
      allowSlideNext: false,
      allowSlidePrev: false,
      breakpoints: {
        0: {
          allowSlideNext: true,
          allowSlidePrev: true,

        },
        767: {
          allowSlideNext: false,
          allowSlidePrev: false,
        }
      }
    });
  }

  if(document.querySelector(".product-page .possibilities .swiper")) {
    const product_page_possibilities_swiper = new Swiper(".product-page .possibilities .swiper", {
      spaceBetween: 0,
      slidesPerView: '1.15',
      speed: 600,
      allowSlideNext: false,
      allowSlidePrev: false,
      breakpoints: {
        0: {
          allowSlideNext: true,
          allowSlidePrev: true,

        },
        767: {
          allowSlideNext: false,
          allowSlidePrev: false,
        }
      }
    });
  }
}



window.onload = function(e) {
  smoothAnchorScroll();
  headerToggle();
  countdown_init();
  initializeStickySidebar();
  initialize_swiper();
}
window.onscroll = function(e) {
  menu_anchor();
  product_nav_header_init();
}
window.onresize = function(e) {
  initializeStickySidebar();
}