// Реализация алгоритма Множества Жюлиа на JavaScript
const convasList = document.querySelectorAll('.julia');
const speed = document.querySelector('.julia')
console.log(convasList, speed);
const zoomButtonPlus = document.querySelector('.zoomingPlus');
const zoomButtonMinus = document.querySelector('.zoomingMinus');
const but = document.querySelector('.bread')
// Инициализация параметров
const c = {x: -0.7, y: 0.27};      // Комплексное число c
const maxIter = 1800;                // Максимальное число итераций
let zoom = 1.0;                  // Масштабирование изображения
let centerX = 0.0;               // Положение центра по оси X
let centerY = 0.0;             // Положение центра по оси Y
let zoomSing = 'plus'
let clickCounter = 1

const randerJulia = () => {
   convasList.forEach ((element, index) => {
   const canvas = convasList[index];
   var ctx = canvas.getContext("2d");
   
      const julia = (c, maxIter, zoom, centerX, centerY) => {
         // Обход каждого пикселя на холсте
         for (var x = 0; x < canvas.width; x++) {
            for (var y = 0; y < canvas.height; y++) {
               // Расчет координат пикселя в комплексной плоскости
               var zx = 1.5 * (x - canvas.width / 2) / (0.5 * zoom * canvas.width) + centerX;
               var zy = (y - canvas.height / 2) / (0.5 * zoom * canvas.height) + centerY;

               // Расчет числа итераций для текущего значения c
               var i = maxIter;
               while (zx * zx + zy * zy < 4 && i > 0) {
                  var xt = zx * zx - zy * zy + c.x;
                  zy = 2 * zx * zy + c.y;
                  zx = xt;
                  i--;
               };

               // Назначение цвета пикселю в зависимости от числа итераций
               if (i < maxIter - 17) {
                  ctx.fillStyle = i === 0 ? "#000" : "hsl(" + (350 - i) % 330 + ", 100%, 50%)";
               } else {
                  ctx.fillStyle = 'white';
               };
               ctx.fillRect(x, y, 1, 1);
            };
         };
      };

      julia(c, maxIter, zoom, centerX, centerY);

   });
};

randerJulia();
//КНОПАЧКИ
zoomButtonPlus.onclick = function () {
   zoomSing = 'plus';
};

zoomButtonMinus.onclick = function () {
   zoomSing = 'minus';
};

but.onclick = function (e) {
   if (zoomSing == 'plus') {
      zoom = zoom + 1;
   } else if (zoomSing == 'minus' && zoom > 1) {
      zoom = zoom - 1;
   } else {
      zoom = zoom
   };
   console.log(zoom, zoomSing);

   const rect = e.target.getBoundingClientRect();
   const x = e.clientX - rect.left; //x position within the element.
   const y = e.clientY - rect.top;  //y position within the element.

   console.log("x : " + x, "y : " + y);
   // centerX = parseFloat('0.' + String(x)) - 0.1 * clickCounter;
   // centerY = parseFloat('0.' + String(y)) - 0.1 * clickCounter;
   console.log("x : " + centerX, "y : " + centerY);

   randerJulia();
};

let mouseDown = false;
let idTimeOut;

speed.addEventListener('mousedown', function(e) {
   mouseDown = true;
   idTimeOut = setTimeout(function() {
      if(mouseDown) {
         console.log(mouseDown)
         zoomSing = 'notSing'
      };
   }, 250);
});

speed.addEventListener('mouseup', function() {
   clearTimeout(idTimeOut);
   mouseDown = false;
});

document.addEventListener('mousemove', function(e) {
   if (mouseDown) {
      const rect = e.target.getBoundingClientRect();
      speed.style.left = e.clientX - 500 + 'px';
      speed.style.top = e.clientY - 500 + 'px';
      console.log("x : " + speed.style.left, "y : " + speed.style.top);
      console.log(rect.left)
   };
});