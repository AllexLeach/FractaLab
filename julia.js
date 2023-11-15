// Реализация алгоритма Множества Жюлиа на JavaScript
var convasList = document.querySelectorAll('.julia')
console.log(convasList)
// Инициализация параметров
var c = {x: -0.7, y: 0.27};      // Комплексное число c
var maxIter = 1800;                // Максимальное число итераций
var zoom = 1.0;                  // Масштабирование изображения
var centerX = 0.0;               // Положение центра по оси X
var centerY = 0.0;

convasList.forEach ((element, index) => {
  const canvas = convasList[index]
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
      }

      // Назначение цвета пикселю в зависимости от числа итераций
      if (i < maxIter - 17) {
        ctx.fillStyle = i === 0 ? "#000" : "hsl(" + (350 - i) % 330 + ", 100%, 50%)";
      } else {
        ctx.fillStyle = 'white'
      }
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  julia(c, maxIter, zoom, centerX, centerY)

})
