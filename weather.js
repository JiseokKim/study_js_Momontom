const weather = document.querySelector(".js-weather");
const API_KEY = "4a3102779055e8e6bb2803b3d02d508a";
const COORDS = "coords";
function getWeather(lat, lon){
    const image = new Image();
    image.setAttribute("id", "icon");
    //note!! fetch 에 들어갈 파라미터는 "" 말고 ``를 사용할것
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){//데이터가 다 들어올때까지 대기
        return response.json();
    }).then(function(json){
        const weatherIcon = json.weather[0].icon;
        image.src = `http://openweathermap.org/img/w/${weatherIcon}.png`;
        const newP = document.createElement("p");
        const place = document.createTextNode(`,${json.name}`);
        newP.appendChild(place);
        weather.appendChild(image);
        weather.appendChild(place);
    });
}
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}
function handleGeoError(){
    console.log("geo error");
}
function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);  
}
function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }

}
function init(){
    loadCoords();
}

init();