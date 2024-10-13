// Sahifa yuklanganda tarjima funksiyasini ishga tushirish
window.addEventListener('load', () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'uz'; // Default tili 'uz'
    changeLanguage(savedLanguage);  // Tarjima funksiyasini ishga tushirish
    updateFlag(savedLanguage); // Til bayrog'ini yangilash
  });
  
  // Tilni o'zgartirish funksiyasi
  function changeLanguage(lang) {
    // Tanlangan tilni local storage ga saqlash
    localStorage.setItem('selectedLanguage', lang);
  
    if (translations[lang]) {
      // Ro'yxatdan o'tish sahifasi uchun sarlavhani tarjima qilish (element mavjudligini tekshiring)
      let registerTitle = document.getElementById("register__title");
      if (registerTitle) {
        registerTitle.textContent = translations[lang].register__title;
      }
  
      // Ro'yxatdan o'tish sahifasi uchun boshqa tarjimalarni qo'shing
      // Masalan:
      // let registerSubtitle = document.getElementById("register__subtitle");
      // if (registerSubtitle) {
      //   registerSubtitle.textContent = translations[lang].register__subtitle;
      // }
  
      // Sahifadagi boshqa tarjimalar bilan ishlash
      // Tugmalar, input placeholder'lar uchun kodni takrorlang
    } else {
      console.error("Til mavjud emas: " + lang);
    }
  
    // Til tanlash uchun bayroqni yangilash
    updateFlag(lang);
  }
  
  // Bayroq rasmini yangilash funksiyasi
  function updateFlag(lang) {
    const flagImage = document.getElementById("langimg");
    if (flagMap[lang]) {
      flagImage.src = flagMap[lang]; // Bayroqni tanlangan tilga mos ravishda yangilash
    } else {
      console.error("Tanlangan til uchun bayroq rasmi topilmadi: " + lang);
    }
  }
  
  // Misol uchun tarjimalar obyekti
  var translations = {
    "uz": {
      "register__title": "Ro'yhatdan o'tish",
      // Ro'yxatdan o'tish sahifasi uchun boshqa tarjimalarni shu yerga qo'shing
    },
    "en": {
      "register__title": "Sign up",
      // Ro'yxatdan o'tish sahifasi uchun boshqa tarjimalarni shu yerga qo'shing
    },
    "ru": {
      "register__title": "Регистрация",
      // Ro'yxatdan o'tish sahifasi uchun boshqa tarjimalarni shu yerga qo'shing
    }
  };
  
  // Har bir til uchun bayroq rasmlari yo'llari
  const flagMap = {
    "uz": "path/to/uzbek_flag.png",
    "en": "path/to/english_flag.png",
    "ru": "path/to/russian_flag.png"
  };
  
  // Til tanlash tugmasi uchun hodisa
  let btnlang = document.querySelector('#langbtn');
  btnlang.addEventListener('click', (event) => {
    let clickedElement = event.target;
    let selectedLanguage = clickedElement.getAttribute('value'); // Tanlangan tilni olish
  
    if (selectedLanguage) {
      changeLanguage(selectedLanguage);  // Tilni o'zgartirish funksiyasini qo'llash
    }

    
  });
  