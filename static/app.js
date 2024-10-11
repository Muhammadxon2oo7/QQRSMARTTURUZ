//







document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const imagesContainer = card.querySelector('.carousel-images');
    let interval;

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

    let carouselInterval;
    const coverImage = card.querySelector('.cover-image');
    const carouselImages = card.querySelectorAll('.carousel-images img');
    let currentIndex = 0;

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
      // Hide tooltip
      tooltip.style.display = 'none';

      // Reset the path style to default
      this.style.fill = '';  // Reset fill color
      this.style.stroke = ''; // Reset stroke color
      this.style.strokeWidth = ''; // Reset stroke width
    });
  });
});

// let tit=100

// let btnlang=document.querySelector('#langbtn')
// let langOpen=document.querySelector('#langopen')
// let langimg=document.querySelector('#langimg')
// btnlang.addEventListener('click',(event)=>{
//     let slc=event.target

//     langOpen.classList.toggle('active-lang-open')
//     let clickedElement = event.target;
//     let img = clickedElement.querySelector('img');
//     console.log(slc.img);
//     langimg.src=`${img.src}`

// })
// const translations = {
//   "uz": {
//     "greeting": "Qoraqalpog'istonga xush kelibsiz.",
//     "welcome": "O'zingiz uchun yangi madaniyatni kashf eting.",
//     "mainPage":"Bosh sahifa",
//     "contact":"Biz haqimizda",
//     "Services":"Xizmatlar",
//     "Manuals":"Qo'llanmalar",
//     "HUDUDLAR":"HUDUDLAR",

//   },
//   "en": {
//     "greeting": "Welcome to Qarakalpakstan",
//     "welcome": "Discover a new culture for yourself.",
//     "mainPage":"Home",
//     "contact":"About us",
//     "Services":"Services",
//     "Manuals":"Manuals",
//     "HUDUDLAR":"Territories",
//   },
//   "ru": {
//     "greeting": "Добро пожаловать в Каракалпакстан.",
//     "welcome": "Откройте для себя новую культуру.",
//     "mainPage": "Главный",
//     "contact": "O нас",
//     "Services":"Услуги",
//     "Manuals":"Руководства",
//     "HUDUDLAR":"Территории"
//   }
// };
// function changeLanguage(lang) {
//   if (translations[lang]) {
//      document.getElementById("bannertxt").textContent = translations[lang].greeting;
//     document.getElementById("spantxt").textContent = translations[lang].welcome;
//     document.getElementById("mainPage").textContent = translations[lang].mainPage;
//     document.getElementById("contact").textContent = translations[lang].contact;
//     document.getElementById("Services").textContent = translations[lang].Services;
//     document.getElementById("Manuals").textContent = translations[lang].Manuals;
//     document.getElementById("HUDUDLAR").textContent = translations[lang].HUDUDLAR;
//     document.getElementById("regiontit").textContent = translations[lang].HUDUDLAR;

//     tit = translations[lang].greeting;
//   }

//     //regiontit ,regiondec  ${this.getAttribute('uz')}
//     else {console.error("Til mavjud emas: " + lang);}}

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
    // Tasvirni yangilash
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
    "secure": "2024 © Barcha huquqlar himoyalangan",
    "requests":"Savol va Takliflar",
    "day":"Kun",
    "places":"ta bo'sh joy",
    "contactpl":"Bog'lanish",
    "replyc":"Javob berish",
    "demosite":"Ushbu sayt test rejimida ishlamoqda va shu saytdagi barcha contentlar to'liq tasdiqlanmagan",
    "txtarea":"Sharhingizni kiriting...",
    "success": "Mahsulot muvaffaqiyatli qo'shildi.",
    "error": "Mahsulotni qo'shishda xato yuz berdi.",
    "warning": "Bu kategoriyadan ko'p mahsulot qo'sha olmaysiz.",
  },
  "en": {
    "greeting": "Welcome to Karakalpakstan",
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
    "secure": "2024 © All Rights Reserved",
    "requests":"Questions and Suggestions",
    "day":"Day",
    "places":"spaces",
    "contactpl":"Contact",
    "replyc":"Reply",
    "demosite":"This site is in beta mode and all content has not been fully verified.",
    "txtarea":"Enter your comment...",
    "success": "The item has been added successfully.",
    "error": "An error occurred while adding the item.",
    "warning": "You cannot add more items from this category.",
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
    "secure": "2024 © Все права защищены",
    "requests":"Вопросы и предложения",
    "day":"День",
    "places":"Mест",
    "contactpl":"Cвязаться",
    "replyc":"Oтветить",
    "demosite":"Этот сайт находится в тестовом режиме, и все его содержимое не полностью проверено.",
    "txtarea":"Введите свой комментарий...",
    "success": "Товар успешно добавлен.",
    "error": "Произошла ошибка при добавлении товара.",
    "warning": "Вы не можете добавить больше товаров из этой категории."
  }
};

let lang ='ru'

// CSRF token olish funksiyasi
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

// Add to Cart funksiyasi
function addToCart(articleId) {
  // CSRF tokenni olish
  const csrftoken = getCookie('csrftoken');

  fetch(`/add_to_cart/${articleId}/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken, // CSRF token qo'shish
      },
      body: JSON.stringify({}) // Tana bo'sh, lekin POST so'rov bo'lishi uchun kerak
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(translations[lang].error);
      }
      return response.json();
  })
  .then(data => {
      if (data.status === 'success') {
          showAlert('success', translations[lang].success);
      } else if (data.status === 'error') {
          showAlert('warning', translations[lang].warning);
      } else if (data.status === 'info') {
          showAlert('error', data.message);
      }
  })
  .catch(error => {
      console.error('Xato:', error);
      showAlert('error', translations[lang].error);
  });
}

// Xabarlarni ko'rsatish funksiyasi
function showAlert(type, message) {
  const alertsContainer = document.getElementById('alerts-container');
  
  // Xabarlarni qabul qilish uchun HTML yaratish
  let alertHtml = `
      <label>
          <input type="checkbox" class="alertCheckbox" autocomplete="off" />
          <div class="alert ${type}">
              <span class="alertClose" onclick="this.parentElement.parentElement.remove();">X</span>
              <span class="alertText">${message}
              <br class="clear"/></span>
          </div>
      </label>
  `;
  
  // Bo'sh HTML qo'shish
  alertsContainer.innerHTML += alertHtml;

  // Xabarni avtomatik yo'q qilish uchun vaqt qo'yish (ixtiyoriy)
  setTimeout(() => {
      const alertElement = alertsContainer.querySelector('label:last-child');
      if (alertElement) {
          alertElement.remove();
      }
  }, 5000); // 5 soniyadan keyin avtomatik ravishda yo'q qilinadi
}

function changeLanguage(lang) {
  // Local storage ga tanlangan tilni saqlash
  localStorage.setItem('selectedLanguage', lang);

  if (localStorage.getItem('languageSet') !== lang) {
    document.getElementById('languageInput').value = lang; // Tanlangan tilni yozish
    localStorage.setItem('languageSet', lang); // Tilni saqlab qo'yish
    document.getElementById('languageForm').submit(); // Formani yuborish
}

  if (translations[lang]) {
    let bannerText = document.getElementById("bannertxt");
    if (bannerText) {
      bannerText.textContent = translations[lang].greeting;
    }

    let spanText = document.getElementById("spantxt");
    if (spanText) {
      spanText.textContent = translations[lang].welcome;
    }

    let mainPage = document.getElementById("mainPage");
    if (mainPage) {
      mainPage.textContent = translations[lang].mainPage;
    }

    let contact = document.getElementById("contact");
    if (contact) {
      contact.textContent = translations[lang].contact;
    }

    let services = document.getElementById("Services");
    if (services) {
      services.textContent = translations[lang].Services;
    }

    let manuals = document.getElementById("Manuals");
    if (manuals) {
      manuals.textContent = translations[lang].Manuals;
    }

    let hududlar = document.getElementById("HUDUDLAR");
    if (hududlar) {
      hududlar.textContent = translations[lang].HUDUDLAR;
    }

    let things = document.getElementById("things");
    if (things) {
      things.textContent = translations[lang].Mashgulot;
    }

    let turl = document.getElementById("turl");
    if (turl) {
      turl.textContent = translations[lang].Turpaketlar;
    }

    let qTitle = document.getElementById("qtitle");
    if (qTitle) {
      qTitle.textContent = translations[lang].qtitle;
    }

    let qDec = document.getElementById("qdec");
    if (qDec) {
      qDec.textContent = translations[lang].qdec;
    }

    let dHudud = document.getElementById("dhudud");
    if (dHudud) {
      dHudud.textContent = translations[lang].dhudud;
    }

    let dMashgulot = document.getElementById("dmashgulot");
    if (dMashgulot) {
      dMashgulot.textContent = translations[lang].dMashgulot;
    }

    let dTur = document.getElementById("dtur");
    if (dTur) {
      dTur.textContent = translations[lang].dTurpaketlar;
    }

    let dJamoa = document.getElementById("djamoa");
    if (dJamoa) {
      dJamoa.textContent = translations[lang].djamoa;
    }

    let dHamkor = document.getElementById("dhamkor");
    if (dHamkor) {
      dHamkor.textContent = translations[lang].dhamkor;
    }

    let dBron = document.getElementById("dBron");
    if (dBron) {
      dBron.textContent = translations[lang].dBron;
    }

    let dTarnsport = document.getElementById("dtarnsport");
    if (dTarnsport) {
      dTarnsport.textContent = translations[lang].dtarnsport;
    }

    let dMaslahatlar = document.getElementById("dMaslahatlar");
    if (dMaslahatlar) {
      dMaslahatlar.textContent = translations[lang].dMaslahatlar;
    }

    let dKitob = document.getElementById("dKitob");
    if (dKitob) {
      dKitob.textContent = translations[lang].dKitob;
    }

    let dStatistika = document.getElementById("dstatistika");
    if (dStatistika) {
      dStatistika.textContent = translations[lang].dstatistika;
    }

    let fMainPage = document.getElementById("fmainPage");
    if (fMainPage) {
      fMainPage.textContent = translations[lang].mainPage;
    }

    let fHudud = document.getElementById("fhudud");
    if (fHudud) {
      fHudud.textContent = translations[lang].HUDUDLAR;
    }

    let fMashgulot = document.getElementById("fmashgulot");
    if (fMashgulot) {
      fMashgulot.textContent = translations[lang].Mashgulot;
    }

    let fTur = document.getElementById("ftur");
    if (fTur) {
      fTur.textContent = translations[lang].Turpaketlar;
    }

    let fContact = document.getElementById("fcontact");
    if (fContact) {
      fContact.textContent = translations[lang].contact;
    }

    let fServices = document.getElementById("fServices");
    if (fServices) {
      fServices.textContent = translations[lang].Services;
    }

    let fManuals = document.getElementById("fManuals");
    if (fManuals) {
      fManuals.textContent = translations[lang].Manuals;
    }

    let secure = document.getElementById("secure");
    if (secure) {
      secure.textContent = translations[lang].secure;
    }
    let requests=document.getElementById("requests")
    if(requests){
      requests.textContent=translations[lang].requests;
    }
    let day=document.getElementById("day")
    if(day){
      day.textContent=translations[lang].day;
    }
    let places=document.getElementById("places")
    if(places){
      places.textContent=translations[lang].places;
    }
    let contactpl=document.getElementById("contactpl")
    if(contactpl){
      contactpl.textContent=translations[lang].contactpl;
    }
    let demosite=document.getElementById("demosite")
    if(demosite){
      demosite.textContent=translations[lang].demosite;
    }
    let replycElements = document.querySelectorAll("#replyc");
    
    if (replycElements.length > 0) {
        replycElements.forEach(element => {
            element.textContent = translations[lang].replyc;
        });
    }
    let txtarea = document.getElementById("txtarea");
    if (txtarea) {
      txtarea.placeholder = `${translations[lang].txtarea}`; 
    }

  } else {
    console.error("Til mavjud emas: " + lang);
  }

  // Flag rasmini yangilash
  updateFlag(lang);
}


// Flag rasmini yangilash funksiyasi
function updateFlag(lang) {
  // Global flagMap obyektidan foydalanamiz
  const flagImage = document.getElementById("langimg");
  
  if (flagMap[lang]) {
      // Agar manzil mavjud bo'lsa, flag tasviri yangilanadi
      flagImage.src = flagMap[lang];
  } else {
      console.error("Flag image for selected language not found: " + lang);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const paths = document.querySelectorAll('svg path');
  const tooltip = document.createElement('div');
  document.body.appendChild(tooltip);
  const infoPanel = document.getElementById('infoPanel');

  // Bu qismda univer global o'zgaruvchidan foydalaniladi
  // Til tanlangandan so'ng localStorage'dan o'qiymiz
  let univer = localStorage.getItem('selectedLanguage') || 'uz'; // Default uzbek tili

  paths.forEach(path => {
    path.addEventListener('mousemove', function (e) {
      // Pathni ajratib ko'rsatish
      this.style.stroke = 'white';
      this.style.strokeWidth = '2';

      // Info panelni yangilash
      let langtit = '';
      let langdec = '';

      // Tilga qarab title va description ni tanlaymiz
      if (univer === 'uz') {
        langtit = this.getAttribute('uz');
        langdec = this.getAttribute('uzdec');
      } else if (univer === 'ru') {
        langtit = this.getAttribute('ru');
        langdec = this.getAttribute('rudec');
      } else if (univer === 'en') {
        langtit = this.getAttribute('en');
        langdec = this.getAttribute('endec');
      } else {
        langtit = this.getAttribute('uz');
        langdec = this.getAttribute('uzdec');
      }

      // Info panelni to'ldirish
      infoPanel.innerHTML = `
        <img src="${this.getAttribute('src')}" class='pointer__image' alt="Image of ${this.getAttribute('id')}" style="height:300px">
        <h4 class="title" id="regiontit">${langtit}</h4>
        <p class='map-dec' id="regiondec">${langdec}</p>
      `;
    });


    path.addEventListener('mouseout', function () {
      // Tooltipni yashirish
      tooltip.style.display = 'none';

      // Pathning o'zgarishlarini bekor qilish
      this.style.fill = '';
      this.style.stroke = '';
      this.style.strokeWidth = '';

      // Info panelni reset qilish
    
    });
  });
});



window.addEventListener('scroll', function () {
  const header = document.getElementById('main-header');
  const firstSectionHeight = document.querySelector('#first-section').offsetHeight;

  // Agar scroll birinchi bo'limdan o'tsa, header fixed bo'ladi
  if (window.scrollY > firstSectionHeight) {
    header.classList.add('fixed');
  } else {
    // Birinchi bo‘limda esa header birga skroll bo‘ladi
    header.classList.remove('fixed');
  }
});

let hamburger = document.querySelector('.ham__Wrapper')
let navItem = document.querySelector('.nav__Wrapper')
hamburger.addEventListener('click', () => {
  navItem.classList.toggle("display")

})
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





