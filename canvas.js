// Fractal Tree Algorithm
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// let resizeCounter = 0;

// function adaptiveSize() {
if (screen.width > 750) {
   canvas.width = 750;
   canvas.height = 750;
} else {
   canvas.width = screen.width;
   canvas.height = screen.width;
};

//    // window.onresize = () => {
//       if (resizeCounter == 5) {
//          // location.reload();
//          resizeCounter = 0
//          console.log(resizeCounter)
//       } else {
//          resizeCounter += 1
//       };
//    // };
// };

// // adaptiveSize();

var width = canvas.width /*window.innerWidth;*/
var height = canvas.height /*window.innerHeight;*/


var branchAng = document.getElementById("input_range_branchAngle");
var numBranch = document.getElementById("numberBranches");
var ang = document.getElementById("angle3");
var branchLen = document.getElementById("lengthBranch");
var angle = 0;
var i = document.getElementById('color');

const color = ["#000", "red", "#f90", "#EAF900", "#0fb000", "#0ef", "#20f", "#b0f"];

let branchAngleValue = 6;
let angValue = 3;
let changeBranchAngleValue = false;

branchAng.addEventListener('input', function() {
   branchAngleValue = branchAng.value;
   changeBranchAngleValue = true;
});

ang.addEventListener('input', () => {
   angValue = ang.value;
   changeBranchAngleValue = false;
});

branchAng.addEventListener('change', () => {
   if (changeBranchAngleValue == true) {
      angValue = branchAngleValue/2;
      ang.value = branchAngleValue/2;  
   };
});

document.getElementById("branchAngleButton").onclick = function() {
   var numberBranches = numBranch.value;

   var angle3 = angValue;
   var branchAngle = Math.PI / branchAngleValue;
   var branchLength = height / branchLen.value; 

//   console.log(color[i.value]);
   console.log(branchAng.value);
      
   function drawBranch(x, y, length, angle, depth) {
      if (depth > 0) {
         var x2 = x + Math.cos(angle) * length;
         var y2 = y + Math.sin(angle) * length;
         
         ctx.beginPath();
         ctx.moveTo(x, y);
         ctx.lineTo(x2, y2);
         ctx.strokeStyle = color[i.value];
         ctx.lineWidth = depth * 1;
         ctx.stroke();
         
         if (numberBranches == 2) {
         drawBranch(x2, y2, length * 0.7, angle + branchAngle, depth - 1);
         drawBranch(x2, y2, length * 0.7, angle - branchAngle, depth - 1);
         } else if (numberBranches == 3) {
         drawBranch(x2, y2, length * 0.7, angle + branchAngle, depth - 1);
         drawBranch(x2, y2, length * 0.7, angle - branchAngle, depth - 1);
         drawBranch(x2, y2, length * 0.3, -angle3 * branchAngle, depth - 1);
         }
      }
   }

      
   function animate() {
      angle += 0.01; 
      ctx.clearRect(0, 0, width, height);
      drawBranch(width / 2, height - 50, branchLength, -Math.PI / 2, 9);
      requestAnimationFrame(animate);
   }
      
   animate();
}

document.getElementById("reload").onclick = function() {
   location.reload();
}

function drawBranchFirst(x, y, length, angle, depth) {
   if (depth > 0) {
      var x2 = x + Math.cos(angle) * length;
      var y2 = y + Math.sin(angle) * length;
       
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color[i.value];
      ctx.lineWidth = depth * 1;
      ctx.stroke()
   
      drawBranchFirst(x2, y2, length * 0.7, angle + (Math.PI/6), depth - 1);
      drawBranchFirst(x2, y2, length * 0.7, angle - (Math.PI/6), depth - 1);
   }
}

function animateFirst() {
   angle += 0.01; 
   ctx.clearRect(0, 0, width, height);
   drawBranchFirst(width / 2, height - 50, height / 3.5, -Math.PI / 2, 9);
   requestAnimationFrame(animateFirst);
}
     
animateFirst();