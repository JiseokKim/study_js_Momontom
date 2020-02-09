const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector(".js-title");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours<10?`0${hours}`:hours}:${minutes<10?`0${minutes}`:minutes}:${seconds<10?`0${seconds}`:seconds}`
}

function init(){
    setInterval(getTime, 1000);
}
//setInterval(func,delay), ex: setInterval(getTime,1000); 
//1초마다 getTime 함수 실행
init();