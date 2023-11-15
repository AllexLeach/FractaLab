// Fractal Tree Algorithm
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = canvas.width = 750 /*window.innerWidth;*/
var height = canvas.height = 750 /*window.innerHeight;*/

var branchAng = document.getElementById("branchAngle");
var numBranch = document.getElementById("numberBranches");
var ang = document.getElementById("angle3");
var branchLen = document.getElementById("branchLength");
var angle = 0;
var i = document.getElementById('color');

const color = ["#000", "red", "#f90", "#EAF900", "#0fb000", "#0ef", "#20f", "#b0f"];

document.getElementById("branchAngleButton").onclick = function() {
  var numberBranches = numBranch.value;

  var angle3 = ang.value
  var branchAngle = Math.PI / branchAng.value; // anything degrees
  var branchLength = height / branchLen.value; 

  console.log(color[i.value]);
  console.log(i.value);
      
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