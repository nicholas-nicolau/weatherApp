window.addEventListener("online", settingInfo())

async function settingInfo() {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekdayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Ocotober", "November", "December"]
    let date = new Date();
    let today = (new Date().setHours(0, 0, 0, 0)) / 1000

    try {
        var info = await axios.get("https://ipinfo.io/json?token=a74c0e051bc2ef") //getting ip info (location)

        var answer = await axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=" + info.data.loc.split(",")[0] + "&lon=" + info.data.loc.split(",")[1] + "&appid=fb70c05ce287b32b33d93a3c8772f930&units=metric") //getting current data
        var answerTwo = await axios.get("https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" + info.data.loc.split(",")[0] + "&lon=" + info.data.loc.split(",")[1] + "&dt=" + today + "&appid=fb70c05ce287b32b33d93a3c8772f930&units=metric") //getting historical data
        if (answer.status != 200) { throw "Sorry, there was an error trying to fetch your data." }
        if (answerTwo.status != 200) { throw "Sorry, there was an error trying to fetch your data." }
        if (info.status != 200) { throw "Sorry, there was an error trying to locate you. Please, click <a>here<a>" }

    } catch (e) {
        document.getElementById('error-p').innerHTML = e
        document.getElementById('error-messages').style.display = "flex"
        document.getElementById('container').style.display = "none"
    }
    document.getElementById('cityName').innerHTML = info.data.city + ", " + info.data.country // writing header
    document.getElementById('date').innerHTML = weekday[date.getDay()] + ", " + date.getDate() + " " + months[date.getMonth()]
    
    document.getElementById("current-temperature").innerHTML = answer.data.current.temp.toFixed(0) + "°" //writing current-time
    document.getElementById('current-description').innerHTML = answer.data.current.weather[0].description
    document.getElementById('current-icon').className = classIcon(answer.data.current.weather[0].icon)

    document.getElementById("high").innerHTML = answer.data.daily[0].temp.max.toFixed(1) + "°" //writing current-data
    document.getElementById("low").innerHTML = answer.data.daily[0].temp.min.toFixed(1) + "°"
    document.getElementById("wind").innerHTML = (answer.data.daily[0].wind_speed * 3.6).toFixed(0) + " <span>km/h</span>"
    document.getElementById("humidity").innerHTML = answer.data.current.humidity + "%"
    let dateTime = new Date(answer.data.current.sunrise * 1000)
    document.getElementById("sunrise").innerHTML = dateTime.getHours() + ":" + dateTime.getMinutes()
    dateTime = new Date(answer.data.current.sunset * 1000)
    document.getElementById("sunset").innerHTML = dateTime.getHours() + ":" + dateTime.getMinutes()

    for (counter = 1; counter <= 7; counter++) { //writing todays-weather
        today = today + 10800
        for (subCounter = 0; subCounter < answerTwo.data.hourly.length; subCounter++) {
            if (today == answerTwo.data.hourly[subCounter].dt) {
                document.getElementById(counter + "tt").innerHTML = answerTwo.data.hourly[subCounter].temp.toFixed(0) + "°"
                document.getElementById(counter + "it").className = classIcon(answerTwo.data.hourly[subCounter].weather[0].icon)
                subCounter = answerTwo.data.hourly.length + 1
            }
        }
        for (subCounter = 0; subCounter < answer.data.hourly.length; subCounter++) {
            if (today == answer.data.hourly[subCounter].dt) {
                document.getElementById(counter + "tt").innerHTML = answer.data.hourly[subCounter].temp.toFixed(0) + "°"
                document.getElementById(counter + "it").className = classIcon(answer.data.hourly[subCounter].weather[0].icon)
                subCounter = answerTwo.data.hourly.length + 1
            }
        }
    }

    for (let i = 1; i < 6; i++) { //writing next-days and next-days-second
        dateTime = new Date(answer.data.daily[i].dt * 1000)
        document.getElementById(i + "d").innerHTML = weekdayShort[dateTime.getDay()]
        document.getElementById(i + "ds").innerHTML = weekdayShort[dateTime.getDay()]
        document.getElementById(i + "dates").innerHTML = dateTime.getDate() + "/" + (dateTime.getMonth() + 1)
        document.getElementById(i + "low").innerHTML = answer.data.daily[i].temp.min.toFixed(0) + "°"
        document.getElementById(i + "high").innerHTML = answer.data.daily[i].temp.max.toFixed(0) + "°"
        document.getElementById(i + "wind").innerHTML = ((answer.data.daily[i].wind_speed) * 3.6).toFixed(0) + " km/h"
        document.getElementById(i + "hum").innerHTML = answer.data.daily[i].humidity.toFixed(0) + " %"
        document.getElementById(i + "t").innerHTML = answer.data.daily[i].temp.min.toFixed(0) + "/" + answer.data.daily[i].temp.max.toFixed(0) + "°"
        document.getElementById(i + "i").className = classIcon(answer.data.daily[i].weather[0].icon)
        document.getElementById(i + "is").className = classIcon(answer.data.daily[i].weather[0].icon)
    }

    for (counter = 1; counter <= 7; counter++) { //checking if some div lack of temperature and setting it as 21°
        if (document.getElementById(counter + "tt").innerHTML == "") {
            document.getElementById(counter + "tt").innerHTML = "21°"
        }
    }

    if(info.data.country == "UK" || info.data.country == "US"){
        document.getElementById('units').value = "imperial"
        changeUnits()
    }

}

function classIcon(icon) {
    let period = icon.replace(/[0-9]/g, "")
    icon = Number(icon.replace(/[a-z]/ig, ""))
    switch (period) {
        case ("d"):
            switch (icon) {
                case (01):
                    return "wi wi-day-sunny"
                case (02):
                    return "wi wi-day-cloudy"
                case (03):
                    return "wi wi-cloud"
                case (04):
                    return "wi wi-cloudy"
                case (09):
                    return "wi wi-showers"
                case (10):
                    return "wi wi-day-rain"
                case (11):
                    return "wi wi-thunderstorm"
                case (13):
                    return "wi wi-snowflake-cold"
                case (50):
                    return "wi wi-windy"
            }
        case ("n"):
            switch (icon) {
                case (01):
                    return "wi wi-night-clear"
                case (02):
                    return "wi wi-night-alt-cloudy"
                case (03):
                    return "wi wi-cloud"
                case (04):
                    return "wi wi-cloudy"
                case (09):
                    return "wi wi-showers"
                case (10):
                    return "wi wi-night-alt-rain"
                case (11):
                    return "wi wi-thunderstorm"
                case (13):
                    return "wi wi-snowflake-cold"
                case (50):
                    return "wi wi-windy"
            }
    }
}

function changeUnits() {
    switch (document.getElementById("units").value) {
        case ("metric"):
            document.getElementById("current-temperature").innerHTML = ((document.getElementById("current-temperature").innerHTML.replace(/[^0-9]/g, "") - 32) * (5 / 9)).toFixed(0) + "°"
            document.getElementById("high").innerHTML = (((document.getElementById("high").innerHTML.replace(/[^0-9]/g, "") / 10) - 32) * (5 / 9)).toFixed(1) + "°"
            document.getElementById("low").innerHTML = (((document.getElementById("low").innerHTML.replace(/[^0-9]/g, "") / 10) - 32) * (5 / 9)).toFixed(1) + "°"
            document.getElementById("wind").innerHTML = (document.getElementById("wind").innerHTML.replace(/[^0-9]/g, "") / 1.609).toFixed(0) + "<span> km/h</span>"
            for (i = 1; i <= 7; i++) {
                document.getElementById(i + "tt").innerHTML = (((document.getElementById(i + "tt").innerHTML.replace(/[^0-9]/g, "")) - 32) * (5 / 9)).toFixed(0) + "°"
            }
            for (i = 1; i < 6; i++) {
                document.getElementById(i + "low").innerHTML = (((document.getElementById(i + "low").innerHTML.replace(/[^0-9]/g, "")) - 32) * (5 / 9)).toFixed(0) + "°"
                document.getElementById(i + "high").innerHTML = (((document.getElementById(i + "high").innerHTML.replace(/[^0-9]/g, "")) - 32) * (5 / 9)).toFixed(0) + "°"
                document.getElementById(i + "wind").innerHTML = (document.getElementById(i + "wind").innerHTML.replace(/[^0-9]/g, "") / 1.609).toFixed(0) + " km/h"
            }
            for (i = 1; i < 6; i++) {
                document.getElementById(i + 't').innerHTML = ((document.getElementById(i + 't').innerHTML.split('/')[0] - 32) * (5 / 9)).toFixed(0) + '/' + ((document.getElementById(i + 't').innerHTML.split('/')[1].replace(/[^1-9]/g, '') - 32) * (5 / 9)).toFixed(0) + '°'
            }
            break;
        case ("imperial"):
            document.getElementById("current-temperature").innerHTML = ((document.getElementById("current-temperature").innerHTML.replace(/[^0-9]/g, "") * (9 / 5)) + (32)).toFixed(0) + "°"
            document.getElementById("high").innerHTML = (((document.getElementById("high").innerHTML.replace(/[^0-9]/g, "") / 10) * (9 / 5)) + (32)).toFixed(1) + "°"
            document.getElementById("low").innerHTML = (((document.getElementById("low").innerHTML.replace(/[^0-9]/g, "") / 10) * (9 / 5)) + (32)).toFixed(1) + "°"
            document.getElementById("wind").innerHTML = (document.getElementById("wind").innerHTML.replace(/[^0-9]/g, "") * 1.609).toFixed(0) + "<span> mph</span>"
            for (i = 1; i <= 7; i++) {
                document.getElementById(i + "tt").innerHTML = (((document.getElementById(i + "tt").innerHTML.replace(/[^0-9]/g, "")) * (9 / 5)) + (32)).toFixed(0) + "°"
            }
            for (i = 1; i < 6; i++) {
                document.getElementById(i + "low").innerHTML = (((document.getElementById(i + "low").innerHTML.replace(/[^0-9]/g, "")) * (9 / 5)) + (32)).toFixed(0) + "°"
                document.getElementById(i + "high").innerHTML = (((document.getElementById(i + "high").innerHTML.replace(/[^0-9]/g, "")) * (9 / 5)) + (32)).toFixed(0) + "°"
                document.getElementById(i + "wind").innerHTML = (document.getElementById(i + "wind").innerHTML.replace(/[^0-9]/g, "") * 1.609).toFixed(0) + " mph"
            }
            for (i = 1; i < 6; i++) {
                document.getElementById(i + 't').innerHTML = ((document.getElementById(i + 't').innerHTML.split('/')[0] * (9 / 5)) + (32)).toFixed(0) + '/' + ((document.getElementById(i + 't').innerHTML.split('/')[1].replace(/°/g, '') * (9 / 5)) + (32)).toFixed(0) + '°'
            }
            break;
    }

}



