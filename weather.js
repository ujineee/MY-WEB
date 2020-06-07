// 사용자의 위도 경도 받기 -> 그곳에서 온도 장소 뽑아내기 -> html 추가해주기

const COORDS = "coords" // 위도:... 경도:...

const API_KEY = "c9f9e517cc2e43a0dff92c6e9ef571f3"

const weather = document.querySelector(".js-weather")


// response: JSON -> 자바스크립트로 변환해야
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json);
        const temperature = json.main.temp
        const name = json.name
        console.log(temperature);
        console.log(name);
        weather.innertext = `오늘의 온도: ${temperature}도(섭씨) and 장소: ${name}`
    })
}


function saveCoords(coordsOBJ){
    localStorage.setItem(COORDS, JSON.stringify(coordsOBJ))
} // COORDS : JSON 형식으로 위도와 경도가 들어가게 됨

function handlesuccess(position) {
    console.log(position)
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsOBJ = {
        latitude,
        longitude
    } //coordsOBJ = 위도 경도
    saveCoords(coordsOBJ)

}

function handleerror() {
    console.log('error');

}

function askforPosition(){
    navigator.geolocation.getCurrentPosition(handlesuccess, handleerror);

}


function loadedCoords(){
    const loadedcoords = localStorage.getItem(COORDS)
    console.log(loadedcoords)
    if(loadedcoords === null){
        askforPosition()
    } else {
        const parsecoords = JSON.parse(loadedcoords)
        getWeather(parsecoords.latitude, parsecoords.longitude)
    }
}// 위도와 경도를 집어넣어서 온도와 장소를 가져오는 함수 


function init(){
    loadedCoords()
} //설정한 것

init(); //실행할 것을 실행