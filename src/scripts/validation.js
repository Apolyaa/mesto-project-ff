// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
          // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    })
  };

  // Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

export const toggleButtonState = (inputList, buttonElement, elementsClasses) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
          buttonElement.disabled = true;
      buttonElement.classList.add(elementsClasses.inactiveButtonClass);
    } else {
          // иначе сделай кнопку активной
          buttonElement.disabled = false;
      buttonElement.classList.remove(elementsClasses.inactiveButtonClass);
    }
  };

const showInputError = (formElement, inputElement, errorMessage, elementsClasses) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.add(elementsClasses.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(elementsClasses.errorClass);
  };
  
  export const hideInputError = (formElement, inputElement, elementsClasses) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    console.log(elementsClasses);
    inputElement.classList.remove(elementsClasses.inputErrorClass);
    errorElement.classList.remove(elementsClasses.errorClass);
    errorElement.textContent = '';
  }; 

// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости
const isValid = (formElement, inputElement, elementsClasses) => {
    console.log(elementsClasses);
    if (inputElement.validity.patternMismatch) {
        // данные атрибута доступны у элемента инпута через ключевое слово dataset.
        // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
        // HTML мы писали в kebab-case, это не опечатка)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      showInputError(formElement, inputElement, inputElement.validationMessage, elementsClasses);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      hideInputError(formElement, inputElement, elementsClasses);
    }
  }; 

  const setEventListeners = (formElement, elementsClasses) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(elementsClasses.inputSelector));
      // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(elementsClasses.submitButtonSelector);
  
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement, elementsClasses)
                    // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, elementsClasses);
      });
    });
  };

  export const enableValidation = (elementsClasses) => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    console.log(elementsClasses);
    const formList = Array.from(document.querySelectorAll(elementsClasses.formSelector));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement, elementsClasses);
    });
  };