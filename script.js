// Элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list');              // список карточек
const shuffleButton = document.querySelector('.shuffle__btn');           // кнопка перемешивания
const minWeightInput = document.querySelector('.minweight__input');      // поле min weight
const maxWeightInput = document.querySelector('.maxweight__input');      // поле max weight
const filterButton = document.querySelector('.filter__btn');             // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind');             // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time');             // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn');   // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn');   // кнопка сортировки
const kindInput = document.querySelector('.kind__input');                // поле с названием вида
const colorInput = document.querySelector('.color__input');              // поле с названием цвета
const weightInput = document.querySelector('.weight__input');            // поле с весом
const addActionButton = document.querySelector('.add__action__btn');     // кнопка добавления

// Список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// Преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// Отрисовка карточек
const display = () => {
  fruitsList.innerHTML = '';

  for (let i = 0; i < fruits.length; i++) {
    const li = document.createElement('li');
    li.classList.add('fruit__item');
    if (fruits[i].color == 'фиолетовый') {
      li.classList.add('fruit_violet');
    }
    if (fruits[i].color == 'зеленый') {
      li.classList.add('fruit_green');
    }
    if (fruits[i].color == 'розово-красный') {
      li.classList.add('fruit_carmazin');
    }
    if (fruits[i].color == 'желтый') {
      li.classList.add('fruit_yellow');
    }
    if (fruits[i].color == 'светло-коричневый') {
      li.classList.add('fruit_lightbrown');
    }
    if (fruits[i].color == 'черный') {
      li.classList.add('fruit_black');
    }
    if (fruits[i].color == 'оранжевый') {
      li.classList.add('fruit_orange');
    }
    if (fruits[i].color == 'розовый') {
      li.classList.add('fruit_pink');
    }
    if (fruits[i].color == 'серый') {
      li.classList.add('fruit_grey');
    }
    if (fruits[i].color == 'синий') {
      li.classList.add('fruit_blue');
    }
    fruitsList.appendChild(li);

    const div = document.createElement('div');
    div.classList.add('fruit__info');
    li.appendChild(div);

    div.innerHTML = `
    <div>index: ${i + 1}</div>
    <div>kind: ${fruits[i].kind}</div>
    <div>color: ${fruits[i].color}</div>
    <div>weight (кг): ${fruits[i].weight}</div>
    `;
  }
};

// Первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// Генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let newFruits = [...fruits];
  while (fruits.length > 0) {
    let randomFruits = getRandomInt(0, fruits.length - 1);   // случайный элемент из fruits
    result.push(fruits[randomFruits]);                       // вставляем случайный элемент из fruits в result
    fruits.splice(randomFruits, 1);                          // вырезаем случайный элемент из fruits
  }
  fruits = result;
  // Проверка на совпадение при перемешивании
  let notShuffled = fruits.every((el, index) => el === newFruits[index]);
  if (notShuffled) {
    alert("Не перемешано! Перемешайте ещё раз.");
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// Фильтрация массива
const filterFruits = () => {
  if (isNaN(maxWeightInput.value) || isNaN(minWeightInput.value)) {
    alert('Укажите вес в числовом значении!')
    maxWeightInput.value = "";
    minWeightInput.value = "";
    return fruits;
  };
  return fruits.filter((item) => {
    if (parseInt(maxWeightInput.value) < parseInt(minWeightInput.value)) {
      [maxWeightInput.value, minWeightInput.value] = [minWeightInput.value, maxWeightInput.value];   // значения меняются местами если max меньше min
    };
    return (item.weight >= parseInt(minWeightInput.value)) && (item.weight <= parseInt(maxWeightInput.value));
  });
};

filterButton.addEventListener('click', () => {
  fruits = filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort';   // инициализация состояния вида сортировки
let sortTime = '-';            // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  const priorityColor = ['желтый', 'зеленый', 'розово-красный', 'фиолетовый', 'светло-коричневый'];
  const color1 = priorityColor.indexOf(a.color);
  const color2 = priorityColor.indexOf(b.color);
  return color1 > color2;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (comparation(arr[j], arr[j + 1])) {
          const tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
        }
      }
    }
  },

  quickSort(arr, comparation) {
    if (arr.length <= 1) {
      return arr;
    }
    let index = Math.floor(arr.length / 2);
    let currentItem = arr[index];
    let less = [];
    let more = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (i === index) {
        continue;
      }
      if (comparation(arr[i], currentItem)) {
        more.push(arr[i]);
      } else {
        less.push(arr[i])
      }
    }
    return [...this.quickSort(less, comparation), currentItem, ...this.quickSort(more, comparation)];
  },

  // Выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  }
};

// Инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

// Переключать значение sortKind между 'bubbleSort' / 'quickSort'
sortChangeButton.addEventListener('click', () => {
  sortKindLabel.textContent === 'bubbleSort' ? sortKindLabel.textContent = 'quickSort' : sortKindLabel.textContent = 'bubbleSort';
});

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // Создание и добавление нового фрукта в массив fruits
  if (kindInput.value === "" || colorInput.value === "" || weightInput.value === "") {
    alert('Заполните все поля!')
  } else {
    if (isNaN(weightInput.value)) {
      alert('Укажите вес в числовом значении!')
      weightInput.value = "";
    } else {
      fruits.push({
        kind: kindInput.value,
        color: colorInput.value,
        weight: weightInput.value
      })
      display();
      // Очистка полей
      kindInput.value = "";
      colorInput.value = "";
      weightInput.value = "";
    }
  }
});