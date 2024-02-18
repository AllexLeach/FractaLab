var canvas = document.getElementById('canvas_Koch');
var ctx = canvas.getContext('2d');

var kochReverse = document.getElementById('button_reverse_koch');
var iter = document.getElementById('select_iter_koch');

var width = canvas.clientWidth;
var height = canvas.clientHeight;
var angleDeg = 60;
var length;
let resizeCounter = 0;
function adaptiveSize() {
   if (screen.width > 500) {
      canvas.width = 500;
      canvas.height = 500;
      length = 388;
   } else {
      canvas.width = screen.width;
      canvas.height = screen.width;
      length = screen.width - (screen.width / 4.5);
   };

   window.onresize = () => {
      if (resizeCounter == 25) {
         location.reload();
         resizeCounter = 0
         console.log(resizeCounter)
      } else {
         resizeCounter += 1
      };
   };
};

adaptiveSize();

var startPosition = {
  x: canvas.width / 10,
  y: canvas.height / 3.5,
};

var startPos = {
  x: canvas.width / 8,
  y: canvas.height / 1.25,
};

var startPosition2 = {
  x: startPosition.x + length,
  y: startPosition.y
};
var startPos2 = {
  x: startPos.x + length,
  y: startPos.y,
};

var startPosition3 = {
  x: startPosition2.x - length/2,
  y: startPosition2.y + length/2/Math.sin(120),
};
var startPos3 = {
  x: startPos2.x - length/2,
  y: startPos2.y + length/2/Math.sin(-120),
};

function drawLine(start, end) {
  //вот здесь отрисовывает на страницу линии(их ещё задать надо)
	ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
};

function kochCurve(start, end, depth, angle) {
	if (depth == 0) {
    //просто линия
   	drawLine(start, end);
  } else {
    //стартовые позиции для построения новой кривой
  	const p1 = {
   		x: start.x + (end.x - start.x) / 3,
   		y: start.y + (end.y - start.y) / 3,
  	};
  	const p2 = {
    	x: end.x - (end.x - start.x) / 3,
    	y: end.y - (end.y - start.y) / 3,
  	};
  	const tip = {
    	x: (p1.x + p2.x) / 2 - Math.cos(angle) * (p2.y - p1.y),
    	y: (p1.y + p2.y) / 2 + Math.cos(angle) * (p2.x - p1.x)
  	};
  
    //рисуем кривую в зависимости от итераций(рекурсивно)
  	kochCurve(start, p1, depth - 1, angleDeg);
  	kochCurve(p1, tip, depth - 1, angleDeg);
  	kochCurve(tip, p2, depth - 1, angleDeg);
  	kochCurve(p2, end, depth - 1, angleDeg);
  };
};

function drawing(maxDepth) {
  console.log(maxDepth);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //рисуем
  kochCurve(startPosition, {
    x: startPosition.x + length,
    y: startPosition.y
  }, maxDepth, angleDeg);
  kochCurve(startPosition2, {
    x: startPosition2.x - length/2,
    y: startPosition2.y + length/2/Math.sin(120),
  }, maxDepth, angleDeg);
  kochCurve(startPosition3, {
    x: startPosition.x,
    y: startPosition.y,
  }, maxDepth, angleDeg);
};

function drawingRev(maxDepth) {
  console.log(maxDepth);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //рисуем развёрнутую снежинку
  kochCurve(startPos, {
    x: startPos.x + length,
    y: startPos.y
  }, maxDepth, angleDeg);
  kochCurve(startPos2, {
    x: startPos2.x - length/2,
    y: startPos2.y + length/2/Math.sin(-120),
  }, maxDepth, angleDeg);
  kochCurve(startPos3, {
    x: startPos.x,
    y: startPos.y,
  }, maxDepth, angleDeg);
};

//начальные значения
kochCurve(startPosition, {
  x: startPosition.x + length,
  y: startPosition.y
}, 0, angleDeg);
kochCurve(startPosition2, {
  x: startPosition2.x - length/2,
  y: startPosition2.y + length/2/Math.sin(120),
}, 0, angleDeg);
kochCurve(startPosition3, {
  x: startPosition.x,
  y: startPosition.y,
}, 0, angleDeg);

//кнопочка разворота Коха
kochReverse.onclick = function () {
  kochReverse.classList.toggle('reverse');

  if (kochReverse.className == 'btn_koch reverse') {
    //рисуем развёрнутую снежинку
    drawingRev(iter.value);

    //прослушка изменения option в развароте
    iter.addEventListener('change', function (iter) {
      drawingRev(iter.target.value);
    });
  } else {
    //рисуем
    drawing(iter.value);

    //прослушка изменения option
    iter.addEventListener('change', function (iter) {
      drawing(iter.target.value);
    });
  };
};

//изначальная прослушка изменения option
iter.addEventListener('change', function (iter) {
  drawing(iter.target.value);
});

// drawLine(startPos, {
//   x: startPos.x + length,
//   y: startPos.y,
// })
// drawLine(startPos2, {
//   x: startPos2.x - length/2,
//   y: startPos2.y + length/2/Math.sin(-120),
// })
// drawLine(startPos, {
//   x: startPos.x + length/2,
//   y: startPos2.y + length/2/Math.sin(-120),
// })
// drawLine({
//   x: startPos.x + length/2,
//   y: startPos.y,
// }, {
//   x: startPos.x + length/2,
//   y: startPos2.y + length/2/Math.sin(-120),
// })

// kochCurve(startPos, {
//   x: startPos.x + length,
//   y: startPos.y
// }, maxDepth, angleDeg);
// kochCurve(startPos2, {
//   x: startPos2.x - length/2,
//   y: startPos2.y + length/2/Math.sin(-120),
// }, maxDepth, angleDeg);
// kochCurve(startPos3, {
//   x: startPos.x,
//   y: startPos.y,
// }, maxDepth, angleDeg);