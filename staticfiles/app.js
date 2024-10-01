//
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const imagesContainer = card.querySelector('.carousel-images');
    let interval;

    // Tekshiruv: imagesContainer mavjudligini tekshirish
    if (imagesContainer) {
      card.addEventListener('mouseenter', function () {
        const width = -imagesContainer.offsetWidth / 2; // Ikki marta takrorlangan rasmlar yarmi
        let currentPosition = 0;

        interval = setInterval(() => {
          currentPosition -= 300; // Har bir rasm kengligi
          if (currentPosition < width) {
            currentPosition = 0; // Boshiga qaytarish
          }
          imagesContainer.style.transition = 'none'; // Sakrashsiz siljish
          imagesContainer.style.transform = `translateX(${currentPosition}px)`;
          setTimeout(() => {
            imagesContainer.style.transition = 'transform 0.5s ease'; // Animatsiyani qayta yoqish
          });
        }, 2000);
      });

      card.addEventListener('mouseleave', function () {
        clearInterval(interval);
        imagesContainer.style.transform = 'translateX(0)'; // Dastlabki rasmni ko'rsatish
      });
    }

    let carouselInterval;
    const coverImage = card.querySelector('.cover-image');
    const carouselImages = card.querySelectorAll('.carousel-images img');
    let currentIndex = 0;

    // Tekshiruv: carouselImages va coverImage mavjudligini tekshirish
    if (coverImage && carouselImages.length > 0) {
      card.addEventListener('mouseover', () => {
        coverImage.style.display = 'none';
        carouselImages[currentIndex].style.display = 'block';

        carouselInterval = setInterval(() => {
          carouselImages[currentIndex].style.display = 'none';
          currentIndex = (currentIndex + 1) % carouselImages.length;
          carouselImages[currentIndex].style.display = 'block';
        }, 500); // Rasmlar har 0.5 soniyada almashinadi
      });

      card.addEventListener('mouseout', () => {
        clearInterval(carouselInterval);
        carouselImages.forEach(img => img.style.display = 'none');
        coverImage.style.display = 'block';
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const paths = document.querySelectorAll('svg path');
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);

  paths.forEach(path => {
    path.addEventListener('mousemove', function (e) {
      this.style.strokeWidth = '2'; // Increase stroke width
    });

    path.addEventListener('mouseout', function () {
      tooltip.style.display = 'none';
      this.style.fill = '';  // Reset fill color
      this.style.stroke = ''; // Reset stroke color
      this.style.strokeWidth = ''; // Reset stroke width
    });
  });
});

window.addEventListener('load', () => {
  const savedLanguage = localStorage.getItem('selectedLanguage') || 'uz'; // default 'uz' til
  changeLanguage(savedLanguage);
  updateFlag(savedLanguage);
});

let btnlang = document.querySelector('#langbtn');
let langOpen = document.querySelector('#langopen');
let langimg = document.querySelector('#langimg');
let univer = '';

btnlang.addEventListener('click', (event) => {
  let clickedElement = event.target;
  univer = clickedElement.getAttribute('value'); // Tanlangan tilni olish

  langOpen.classList.toggle('active-lang-open');
  if (univer) {
    let img = clickedElement.querySelector('img');
    if (img) {
      langimg.src = img.src;
    }
  }
});

const translations = {
  "uz": {
    "greeting": "Qoraqalpog'istonga xush kelibsiz.",
    "welcome": "O'zingiz uchun yangi madaniyatni kashf eting.",
    "mainPage": "Bosh sahifa",
    "contact": "Biz haqimizda",
    "Services": "Xizmatlar",
    "Manuals": "Qo'llanmalar",
    "HUDUDLAR": "HUDUDLAR",
    "Mashgulot": "Mashg`ulotlar",
    "Turpaketlar": "QQR Turpaketlar",
    "qtitle": "Qoraqalpogʻiston",
    "qdec": "Oʻzbekistonning shimoli-gʻarbiy qismida joylashgan avtonom respublika boʻlib, boy madaniy meros va oʻziga xos anʼanalari bilan tanilgan. Uning poytaxti Nukus shahri o'zining dunyoga mashhur Savitskiy sanʼat muzeyini o'z ichiga oladi. Mintaqa Qizilqum choʻli va kamayib borayotgan Orol dengizi bilan ham mashhur. Oʻz tili – qoraqalpoq tili va turli xalqlar yashovchi bu hudud tarix, sanʼat va tabiiy goʻzallikning uygʻunlashgan maskanidir.",
    "dhudud": "HUDUDLAR",
    "dMashgulot": "Mashg`ulotlar",
    "dTurpaketlar": "QQR Turpaketlar",
    "djamoa": "Bizning jamoa",
    "dhamkor": "Hamkorlarimiz",
    "dBron": "Bron qilish",
    "dtarnsport": "Transport",
    "dMaslahatlar": "Maslahatlar",
    "dKitob": "Kitob va Jurnallar",
    "dstatistika": "Statistika",
    "secure": "2024 © Barcha huquqlar himoyalangan"
  },
  "en": {
    "greeting": "Welcome to Qarakalpakstan",
    "welcome": "Discover a new culture for yourself.",
    "mainPage": "Home",
    "contact": "About us",
    "Services": "Services",
    "Manuals": "Manuals",
    "HUDUDLAR": "Territories",
    "Mashgulot": "Training",
    "Turpaketlar": "QQR Tour packages",
    "qtitle": "Karakalpakstan",
    "qdec": "It is an autonomous republic located in the northwestern part of Uzbekistan, known for its rich cultural heritage and unique traditions. Its capital, Nukus, contains its world-famous Savitsky Art Museum. The region is also famous for the Kyzylkum Desert and the shrinking Aral Sea. Karakalpak language is its own language and this region, inhabited by different peoples, is a harmonious place of history, art and natural beauty.",
    "dhudud": "Territories",
    "dMashgulot": "Training",
    "dTurpaketlar": "QQR Tour packages",
    "djamoa": "Our team",
    "dhamkor": "Our partners",
    "dBron": "Make a reservation",
    "dtarnsport": "Transportation",
    "dMaslahatlar": "Tips",
    "dKitob": "Books and Magazines",
    "dstatistika": "Statistics",
    "secure": "2024 © All Rights Reserved"

  },
  "ru": {
    "greeting": "Добро пожаловать в Каракалпакстан.",
    "welcome": "Откройте для себя новую культуру.",
    "mainPage": "Главный",
    "contact": "O нас",
    "Services": "Услуги",
    "Manuals": "Руководства",
    "HUDUDLAR": "Территории",
    "Mashgulot": "Oбучение",
    "Turpaketlar": "Пакеты QQR-туров",
    "qtitle": "Каракалпакстан",
    "qdec": "Это автономная республика, расположенная в северо-западной части Узбекистана, известная своим богатым культурным наследием и уникальными традициями. В ее столице Нукусе находится всемирно известный Художественный музей Савицкого. Регион также известен пустыней Кызылкум и высыхающим Аральским морем. Каракалпакский язык – это отдельный язык, и этот регион, населенный разными народами, является гармоничным местом истории, искусства и природной красоты.",
    "dhudud": "Территории",
    "dMashgulot": "Oбучение",
    "dTurpaketlar": "Пакеты QQR-туров",
    "djamoa": "Наша команда",
    "dhamkor": "Наши партнеры",
    "dBron": "Забронировать",
    "dtarnsport": "Транспорт",
    "dMaslahatlar": "Советы",
    "dKitob": "Книги и журналы",
    "dstatistika": "Статистика",
    "secure": "2024 © Все права защищены"

  }
};

function changeLanguage(lang) {
  localStorage.setItem('selectedLanguage', lang);

  if (localStorage.getItem('languageSet') !== lang) {
    document.getElementById('languageInput').value = lang; 
    localStorage.setItem('languageSet', lang);
    document.getElementById('languageForm').submit(); 
  }

  if (translations[lang]) {
    const elementsToTranslate = {
      greeting: "bannertxt",
      welcome: "spantxt",
      mainPage: "mainPage",
      contact: "contact",
      Services: "Services",
      Manuals: "Manuals",
      HUDUDLAR: "HUDUDLAR",
      Mashgulot: "things",
      Turpaketlar: "turl",
      qtitle: "qtitle",
      qdec: "qdec",
      dhudud: "dhudud",
      dMashgulot: "dmashgulot",
      dTurpaketlar: "dtur",
      djamoa: "djamoa",
      dhamkor: "dhamkor",
      dBron: "dBron",
      dtarnsport: "dtarnsport",
      dMaslahatlar: "dMaslahatlar",
      dKitob: "dKitob",
      dstatistika: "dstatistika",
      mainPageFooter: "fmainPage",
      fHudud: "fhudud",
      fMashgulot: "fmashgulot",
      fTurpaketlar: "ftur",
      fContact: "fcontact",
      fServices: "fServices",
      fManuals: "fManuals",
      secure: "secure"
    };
  
    Object.keys(elementsToTranslate).forEach(key => {
      const elementId = elementsToTranslate[key];
      const element = document.getElementById(elementId);
      if (element) {
        element.textContent = translations[lang][key];
      }
    });
    
  } else {
    console.error("Til mavjud emas: " + lang);
  }
  

  updateFlag(lang);
}

function updateFlag(lang) {
  const flagImage = document.getElementById("langimg");
  if (flagMap[lang]) {
    flagImage.src = flagMap[lang];
  } else {
    console.error("Flag image for selected language not found: " + lang);
  }
}

window.addEventListener('scroll', function () {
  const header = document.getElementById('main-header');
  const firstSectionHeight = document.querySelector('#first-section').offsetHeight;

  if (window.scrollY > firstSectionHeight) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }
});

let hamburger = document.querySelector('.ham__Wrapper');
let navItem = document.querySelector('.nav__Wrapper');
hamburger.addEventListener('click', () => {
  navItem.classList.toggle("display");
});

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
