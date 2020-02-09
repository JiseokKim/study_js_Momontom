const body = document.querySelector("body");
const IMG_NUMBER = 7;

function handleImageLoad(){
    setInterval(paintImage,5000);
}
function paintImage(imgNumber){
    image.src = `images/${imgNumber +1}.jpg`;
    image.classList.add("bgImage");
}
function getRandom(){
    const number=Math.floor(Math.random()*IMG_NUMBER);
    return number;
}
const image = new Image();
function init(){
    const imgNumber = getRandom();
    paintImage(imgNumber);
    setInterval(function(){
        paintImage(getRandom());
    },10000);
    body.appendChild(image);
}

init();