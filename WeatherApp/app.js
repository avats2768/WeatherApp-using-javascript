let apiKey = "fe9fcc2628d783c4bb7600eecba03cb6";

const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const city = document.querySelector('.search-input');
const btn = document.querySelector('.search-icon')
const bgImg = document.querySelector('.main-container')
var img = "";

btn.addEventListener('click', async() => {

    console.log(city.value)
    const response = await fetch(apiurl + `&appid=${apiKey}` + `&q=${city.value}`);
    const data = await response.json();
    console.log(data);

    document.querySelector(".city h2").innerText = data.name;
    document.querySelector(".temprature p").innerText = data.main.temp + '°C';
    document.querySelector(".humidity p").innerText = data.main.humidity + " %";
    document.querySelector(".wind p").innerText = data.wind.speed + " Km/h";
    document.querySelector(".weather h2").innerText = data.weather[0].main;

    updatetime(data)

    console.log(img)
    bgImg.style.background = `url(${img})`;
    bgImg.style.backgroundSize = "cover";
    bgImg.style.backgroundRepeat = "no-repeat";

})

function updatetime(data) {
    let timezone = data.timezone;
    let curDate = new Date();
    let hours = ((5 * 60 * 60) + (30 * 60)) * 1000;
    let objdate = new Date(((curDate.getTime() + timezone * 1000)) - hours);
    let datetime = document.querySelector(".time p");
    datetime.innerHTML = objdate.toLocaleTimeString();
    const h = objdate.getHours();
    console.log(h);


    if (h >= 6 && h <= 18) {
        img = `images/${(data.weather[0].main).toLowerCase()}.jpg`;
    } else {
        img = `images/night${(data.weather[0].main).toLowerCase()}.jpg`;
        bgImg.style.color = "red";
    }

    let date = document.querySelector(".date p");
    date.innerText = objdate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    })

}