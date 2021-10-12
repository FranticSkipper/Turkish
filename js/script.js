"use strict";

var body = document.querySelector('body');

function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
}); // Функция определения поддержки формата WebP

var elementsToMove = document.querySelectorAll('[data-move]');

if (elementsToMove.length > 0) {
  var elementsObj = {};

  for (var i = 0; i <= elementsToMove.length - 1; i++) {
    var el = elementsToMove[i];
    var parentClass = el.parentNode.classList[el.parentNode.classList.length - 1];
    var dataValues = el.dataset.move.split(',');
    var elClasses = el.className.split(' ');
    var elCurrentClass = elClasses[elClasses.length - 1];

    if (!elementsObj.hasOwnProperty(dataValues[0])) {
      elementsObj[dataValues[0]] = [];
      addElementToContainer(elementsObj[dataValues[0]], parentClass, dataValues[1], elCurrentClass);
    } else {
      addElementToContainer(elementsObj[dataValues[0]], parentClass, dataValues[1], elCurrentClass);
    }
  }

  window.addEventListener('resize', function () {
    var currentSize = document.documentElement.clientWidth;

    for (var property in elementsObj) {
      if (property >= currentSize) {
        for (var _i = 0; _i <= elementsObj[property].length - 1; _i++) {
          var element = document.querySelector('.' + elementsObj[property][_i].element);
          var destination = document.querySelector('.' + elementsObj[property][_i].to);
          destination.appendChild(element);
        }
      } else {
        for (var _i2 = 0; _i2 <= elementsObj[property].length - 1; _i2++) {
          var _element = document.querySelector('.' + elementsObj[property][_i2].element);

          var _destination = document.querySelector('.' + elementsObj[property][_i2].from);

          _destination.appendChild(_element);
        }
      }
    }
  });
  window.addEventListener('load', function () {
    var currentSize = document.documentElement.clientWidth;

    for (var property in elementsObj) {
      if (property >= currentSize) {
        for (var _i3 = 0; _i3 <= elementsObj[property].length - 1; _i3++) {
          var element = document.querySelector('.' + elementsObj[property][_i3].element);
          var destination = document.querySelector('.' + elementsObj[property][_i3].to);
          destination.appendChild(element);
        }
      } else {
        for (var _i4 = 0; _i4 <= elementsObj[property].length - 1; _i4++) {
          var _element2 = document.querySelector('.' + elementsObj[property][_i4].element);

          var _destination2 = document.querySelector('.' + elementsObj[property][_i4].from);

          _destination2.appendChild(_element2);
        }
      }
    }
  });
}

function addElementToContainer(objProperty, from, to, element) {
  objProperty.push({
    from: from,
    to: to,
    element: element
  });
}

var burger = document.querySelector('.burger');
var burgerCurrentMenu = burger.dataset.menu;
var currentMenu = document.querySelector('.' + burgerCurrentMenu);
var menuActive = false;
burger.addEventListener('click', function () {
  burger.classList.toggle('active');
  currentMenu.classList.toggle('active');
  body.classList.toggle('lock');
});
var paginations = document.querySelectorAll('[data-pagination]');

if (paginations.length > 0) {
  for (var index = 0; index <= paginations.length - 1; index++) {
    var element = paginations[index];
    var elementWidth = element.dataset.pagination;
    element.style.width = elementWidth + '%';
  }
}

var popupLinks = document.querySelectorAll('.popup-link');
var lockPadding = document.querySelectorAll('.lock-padding');
var unlock = true;
var timeout = 800;

if (popupLinks.length > 0) {
  var _loop = function _loop(_index) {
    var element = popupLinks[_index];
    element.addEventListener('click', function (e) {
      var popupName = element.getAttribute('href').replace('#', '');
      var currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    });
  };

  for (var _index = 0; _index < popupLinks.length; _index++) {
    _loop(_index);
  }
}

var popupCloseIcon = document.querySelectorAll('.popup-close');

if (popupCloseIcon.length > 0) {
  var _loop2 = function _loop2(_index2) {
    var element = popupCloseIcon[_index2];
    element.addEventListener('click', function (e) {
      popupClose(element.closest('.popup'));
      e.preventDefault();
    });
  };

  for (var _index2 = 0; _index2 < popupCloseIcon.length; _index2++) {
    _loop2(_index2);
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    var popupActive = document.querySelector('.popup.open');

    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }

    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__body')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive) {
  var doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (unlock) {
    popupActive.classList.remove('open');

    if (doUnlock) {
      bodyUnlock();
    }
  }
}

function bodyLock() {
  var lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if (lockPaddingValue.length > 0) {
    for (var _index3 = 0; _index3 < lockPadding.length; _index3++) {
      var _element3 = lockPadding[_index3];
      _element3.style.paddingRight = lockPaddingValue;
    }
  }

  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnlock() {
  setTimeout(function () {
    for (var _index4 = 0; _index4 < lockPadding.length; _index4++) {
      var _element4 = lockPadding[_index4];
      _element4.style.paddingRight = '0px';
    }

    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    var popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
}); // (function () {
//     if (!Element.prototype.matches) {
//         Element.prototype.matches = Element.prototype.matchesSelector ||
//             Element.prototype.webkitMatchesSelector ||
//             Element.prototype.mozMatchesSelector ||
//             Element.prototype.msMatchesSelector;
//     }
// })();

var swiper = new Swiper(".partners-swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    479: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 3
    },
    991: {
      slidesPerView: 4
    }
  }
});
var swiperCoursesMenu = ['А1 - начальный уровень', 'А2', 'B1', 'B2', 'С1'];
var swipercourses = new Swiper(".courses-swiper", {
  pagination: {
    el: ".courses-pagination",
    clickable: true,
    renderBullet: function renderBullet(index, className) {
      return '<span class="' + className + '">' + swiperCoursesMenu[index] + '</span>';
    }
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});