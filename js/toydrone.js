let isDroneVisible = false;
let xValue = "0";
let yValue = "0";
let droneManagement = "NORTH";
const rotationDegree = {
  "NORTH": "0deg",
  "EAST": "90deg",
  "SOUTH": "180deg",
  "WEST": "-90deg"
};
var gameStateStarted = false;

//create surface area of 10 units x 10 units

window.onload = function containerElement() {
  let text = "";
  let i;
  for (var a = 9; a >= 0; a--) {
    text += "<tr>";
    for (var b = 0; b < 10; b++) {
      text += "<td id=" + b + a + "></td>";
    }
    text += "</tr>";
  }
  document.getElementById("tenxtenSquare").innerHTML = text;

}

// Place toy drone function

function placeDrone() {

  document.getElementById('directionGroup').style.display = 'block';
  document.getElementById('toggel').style.display = 'inline';

  var disMsg = document.getElementById("myDIV");
  disMsg.style.display = "none";

  ToggleContainerChildren("dialogBoxContainer", false);
  var dialogBox = document.getElementById("dialogBoxContainer");
  dialogBox.style.opacity = 1;
  ToggleContainerChildren("directionGroup", true);
  ToggleContainerChildren("toggel", true);

  droneManagement = document.getElementById('droneManagement').value;
  xValue = document.getElementById('xValue').value;
  yValue = document.getElementById('yValue').value;

  let elements = document.getElementsByClassName('attackClass');
  while (elements.length > 0) {
    elements[0].removeAttribute("style");
    elements[0].classList.remove('attackClass');
  }

  let element1 = document.getElementsByClassName('arrowClassUp');
  while (element1.length > 0) {
    element1[0].removeAttribute("style");
    element1[0].classList.remove('arrowClassUp');
  }

  let element2 = document.getElementsByClassName('arrowClassDown');
  while (element2.length > 0) {
    element2[0].removeAttribute("style");
    element2[0].classList.remove('arrowClassDown');
  }

  let element3 = document.getElementsByClassName('arrowClassLeft');
  while (element3.length > 0) {
    element3[0].removeAttribute("style");
    element3[0].classList.remove('arrowClassLeft');
  }

  let element4 = document.getElementsByClassName('arrowClassRight');
  while (element4.length > 0) {
    element4[0].removeAttribute("style");
    element4[0].classList.remove('arrowClassRight');
  }

  setToyDrone(xValue, yValue, droneManagement.substring(0, 1));
}

function ToggleContainerChildren(containerId, isDisabled) {
  var containerChildren = document.getElementById(containerId).children;
  for (let i = 0; i < containerChildren.length; i++) {
    containerChildren[i].disabled = isDisabled;
  }
}
function CancelClickHandler() {
  var dialogBox = document.getElementById("dialogBoxContainer");
  dialogBox.style.opacity = 0;
  dialogBox.reset();
  ToggleContainerChildren("dialogBoxContainer", true);
  ToggleContainerChildren("directionGroup", false);
  ToggleContainerChildren("toggel", false);
}

function OkClickHandler() {
  placeDrone();
  var dialogBox = document.getElementById("dialogBoxContainer");
  dialogBox.style.opacity = 0;
  dialogBox.reset();
  ToggleContainerChildren("dialogBoxContainer", true);
  ToggleContainerChildren("directionGroup", false);
  ToggleContainerChildren("toggel", false);
}

//Set drone to specified co-ordinates
const setToyDrone = ((x, y, dir) => {
  isDroneVisible = true;
  let elemSample = "";
  elemSample = document.getElementById('drone');
  if (!!elemSample) {
    if (document.getElementById('drone').parentNode.style.backgroundImage.split(",").length > 1) {
      document.getElementById('drone').parentNode.style.backgroundImage = "url(https://res.cloudinary.com/dmqk0i7jd/image/upload/c_scale,e_make_transparent:10,w_50/v1505039229/damage2_dj3206.png)";
      document.getElementById('drone').style.backgroundSize = "contain";
      document.getElementById('drone').parentNode.style.backgroundRepeat = "no-repeat";
    } else {
      document.getElementById('drone').parentNode.style.backgroundImage = "";
      document.getElementById('drone').parentNode.style.backgroundRepeat = "";
    }
    elemSample.parentNode.removeChild(elemSample);
  }
  var spanEle = document.createElement("span");
  spanEle.setAttribute("id", "drone");
  spanEle.setAttribute("class", "circle");
  var t = document.createTextNode(""); //dir
  spanEle.appendChild(t);
  gameStateStarted = true;
  document.getElementById(x + y).appendChild(spanEle);
  if (document.getElementById(x + y).style.backgroundImage !== "") {
    document.getElementById(x + y).style.backgroundImage = "url(https://ya-webdesign.com/transparent250_/drone-clipart-fpv-12.png),url(https://res.cloudinary.com/dmqk0i7jd/image/upload/c_scale,e_make_transparent:10,w_50/v1505039229/damage2_dj3206.png)";
    document.getElementById(x + y).style.backgroundSize = "contain";
    document.getElementById(x + y).style.backgroundRepeat = "no-repeat, no-repeat";
    document.getElementById('drone').parentNode.style.transform = "rotate(" + rotationDegree[droneManagement] + ")";
  }
  else {
    document.getElementById(x + y).style.backgroundImage = "url(https://ya-webdesign.com/transparent250_/drone-clipart-fpv-12.png)";
    document.getElementById(x + y).style.backgroundRepeat = "no-repeat";
    document.getElementById(x + y).style.backgroundSize = "contain";
    document.getElementById('drone').parentNode.style.transform = "rotate(" + rotationDegree[droneManagement] + ")";
  }
});


// Report function

function Report() {
  if (gameStateStarted) {
    var droneEle = document.getElementById('drone').parentNode.id;
    var dir = droneManagement;
    var output = "Report:\nX: " + droneEle.charAt(0) + "\nY: " + droneEle.charAt(1) + "\nDirection: " + dir;
    alert(output);
  }
}

// Move toy drone to next unit

function moveToyDrone() {
  var droneEleParent = document.getElementById('drone').parentNode.id;
  var droneEleDir = droneManagement;
  var x = droneEleParent.charAt(0);
  var y = droneEleParent.charAt(1);
  if (droneEleDir === 'NORTH' && y < 9) {
    y = parseInt(y) + 1;
  } else if (droneEleDir === 'SOUTH' && y > 0) {
    y = parseInt(y) - 1;
  } else if (droneEleDir === 'EAST' && x < 9) {
    x = parseInt(x) + 1;
  } else if (droneEleDir === 'WEST' && x > 0) {
    x = parseInt(x) - 1;
  }
  else {
    alert("Drone cannot go further!!");
  }
  destroyGif();
  setToyDrone(x, y, droneEleDir);
}
// Change toy drone direction
const changeDirection = ((newDir) => {
  document.getElementById('drone').parentNode.style.transform = "rotate(0deg)";
  let droneEleDir = droneManagement;
  const dirObj = {
    "NORTH-left": "WEST",
    "SOUTH-left": "EAST",
    "EAST-left": "NORTH",
    "WEST-left": "SOUTH",
    "NORTH-right": "EAST",
    "SOUTH-right": "WEST",
    "EAST-right": "SOUTH",
    "WEST-right": "NORTH"
  }
  droneManagement = dirObj[droneEleDir + "-" + newDir];
  document.getElementById('drone').parentNode.style.transform = "rotate(" + rotationDegree[droneManagement] + ")";

});

const toyDroneAttack = () => {
  let droneEleParent = document.getElementById('drone').parentNode.id;
  let droneEleDir = droneManagement;
  let x = droneEleParent.charAt(0);
  let y = droneEleParent.charAt(1);
  if (droneEleDir === 'NORTH' && y < 8) {
    y = parseInt(y) + 2;
    y1 = parseInt(y) - 1;
    document.getElementById(x + y).classList.add("attackClass");
    // document.getElementById(x + y1).style.transform = "rotate(" + rotationDegree[droneEleDir] + ")";
    document.getElementById(x + y1).classList.add("arrowClassUp");
    destroyAttack(x, y);
    destroyPointer(x, y1);
  } else if (droneEleDir === 'SOUTH' && y > 1) {
    y = parseInt(y) - 2;
    y1 = parseInt(y) + 1;
    document.getElementById(x + y).classList.add("attackClass");
    // document.getElementById(x + y1).style.transform = "rotate(" + rotationDegree[droneEleDir] + ")";
    document.getElementById(x + y1).classList.add("arrowClassDown");
    destroyAttack(x, y);
    destroyPointer(x, y1);
  } else if (droneEleDir === 'EAST' && x < 8) {
    x = parseInt(x) + 2;
    x1 = parseInt(x) - 1;
    document.getElementById(x + y).classList.add("attackClass");
    // document.getElementById(x1 + y).transform = "rotate(" + rotationDegree[droneEleDir] + ")";
    document.getElementById(x1 + y).classList.add("arrowClassRight");
    destroyAttack(x, y);
    destroyPointer(x1, y);
  } else if (droneEleDir === 'WEST' && x > 1) {
    x = parseInt(x) - 2;
    x1 = parseInt(x) + 1;
    document.getElementById(x + y).classList.add("attackClass");
    // document.getElementById(x1 + y).style.transform = "rotate(" + rotationDegree[droneEleDir] + ")";
    document.getElementById(x1 + y).classList.add("arrowClassLeft");
    destroyAttack(x, y);
    destroyPointer(x1, y);
  }
  else {
    alert("Too close to boundary - Cannot fire!!")
  }
}
// Set plus image at destroyed unit

const destroyAttack = ((x, y) => {
  setTimeout(function () {
    document.getElementById(x + y).style.backgroundImage = "url(https://res.cloudinary.com/dmqk0i7jd/image/upload/c_scale,e_make_transparent:10,w_50/v1505039229/damage2_dj3206.png)";
    document.getElementById(x + y).style.backgroundSize = "contain";
    document.getElementById(x + y).style.backgroundRepeat = "no-repeat";
  }, 500);
});

const destroyPointer = ((x, y) => {
  setTimeout(function () {
    document.getElementById(x + y).style.backgroundImage = "none";
    document.getElementById(x + y).style.backgroundSize = "contain";
    document.getElementById(x + y).style.backgroundRepeat = "no-repeat";
  }, 500);
});

function destroyGif() {
  // let elements = document.getElementsByClassName('attackClass');
  // while (elements.length > 0) {
  //   elements[0].removeAttribute("style");
  //   elements[0].classList.remove('attackClass');
  // }

  let element1 = document.getElementsByClassName('arrowClassUp');
  while (element1.length > 0) {
    element1[0].removeAttribute("style");
    element1[0].classList.remove('arrowClassUp');
  }

  let element2 = document.getElementsByClassName('arrowClassDown');
  while (element2.length > 0) {
    element2[0].removeAttribute("style");
    element2[0].classList.remove('arrowClassDown');
  }

  let element3 = document.getElementsByClassName('arrowClassLeft');
  while (element3.length > 0) {
    element3[0].removeAttribute("style");
    element3[0].classList.remove('arrowClassLeft');
  }

  let element4 = document.getElementsByClassName('arrowClassRight');
  while (element4.length > 0) {
    element4[0].removeAttribute("style");
    element4[0].classList.remove('arrowClassRight');
  }
}
