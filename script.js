
/*
  const nicoInfo = {
  name:"Nico",
  age:33,
  gender:"Male",
  isHandsome:true
}
//console.log(nicoInfo, console);
//function
function sayHello(name, age){
  return `Hello! my name is ${name}, my age is ${age}!`;
}
const greetNicolas = sayHello("1",12);

console.log(greetNicolas);

const calculator = {
  plus: function(a,b) {
    return a+b;},
  minus: function(){}
}
const plus = calculator.plus(1,2);
let titleText = document.getElementsByTagName("title");
titleText.innerHTML = "It's Change!!!";

//console.dir(document);
//document.title="It's Gura"

//event handler
function handleResize(){
    console.log("I have been resized");
}
//함수 호출시 함수이름()으로 호출하면 바로 실행되고 함수이름으로 호출하면 이벤트가 발생할때 호출된다
window.addEventListener("resize",handleResize);
*/
// <⚠️ DONT DELETE THIS ⚠️>
const colors = ["#1abc9c", "#3498db", "#9b59b6", "#f39c12", "#e74c3c"];
// <⚠️ /DONT DELETE THIS ⚠️>

/*
✅ The text of the title should change when the mouse is on top of it.
✅ The text of the title should change when the mouse is leaves it.
✅ When the window is resized the title should change.
✅ On right click the title should also change.
✅ The colors of the title should come from a color from the colors array.
✅ DO NOT CHANGE .css, or .html files.
✅ ALL function handlers should be INSIDE of "superEventHandler"
*/
/*
let text = document.querySelector("h2");
console.dir(text);
//function mouseover
//function mousleave
//function resize window
//funciton mouse right click
const superEventHandler = {
  eventMouseOver: function(){
    text.innerHTML = "The mouse is here!";
    text.style.color = colors[0];
  },
  eventMouseLeave: function(){
    text.innerHTML = "The mouse is gone!";
    text.style.color = colors[1];
  },
  eventWindowResize: function(){
    text.innerHTML = "You just resized!";
    text.style.color = colors[2];
  },
  eventMouseRightClick: function(){
    text.innerHTML = "That was a right click!";
    text.style.color = colors[3];
  }
};
window.addEventListener("resize", superEventHandler.eventWindowResize);
text.addEventListener("mouseover",superEventHandler.eventMouseOver);
text.addEventListener("mouseleave", superEventHandler.eventMouseLeave);
text.addEventListener("contextmenu", superEventHandler.eventMouseRightClick);
*/

const title = document.querySelector("#title");


const CLICKED_CLASS = "clicked";

function handleClick(){
  const currentClass = title.className;
  if(currentClass !== CLICKED_CLASS){
    title.className = CLICKED_CLASS;
  }else{
    title.className ="";
  }  
  console.log(currentClass);
  console.log(title.style.color);
}

function init(){
  title.addEventListener("click", handleClick); 
}
init();
