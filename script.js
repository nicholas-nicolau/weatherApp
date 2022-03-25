window.addEventListener("online",settingInfo())

async function settingInfo(){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const weekdayShort = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const months = ["January", "February","March","April","May","June","July","August","September","Ocotober","November","December"]
    let date = new Date();
    
    const info = await axios.get("https://ipinfo.io/json?token=a74c0e051bc2ef")
    document.getElementById('cityName').innerHTML = info.data.city + ", " + info.data.country
    document.getElementById('date').innerHTML = weekday[date.getDay()] + ", " + date.getDate() + " " + months[date.getMonth()]
    let location = info.data.loc.split(",")
    lat = location[0]
    lon = location[1]
    
    const urlText = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=fb70c05ce287b32b33d93a3c8772f930&units=metric"
    const answer = await axios.get(urlText)
    
    let today = (new Date().setHours(0,0,0,0))/1000
    const urlTextTwo = "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat="+lat+"&lon="+lon+"&dt="+today+"&appid=fb70c05ce287b32b33d93a3c8772f930&units=metric"
    const answerTwo = await axios.get(urlTextTwo)

    const historyArray = answerTwo.data.hourly

    for(counter=1;counter<=7;counter++){
        today=today + 10800
        for(subCounter=0;subCounter<historyArray.length;subCounter++){
            if(today == historyArray[subCounter].dt){
                document.getElementById(counter + "tt").innerHTML = historyArray[subCounter].temp.toFixed(0) + "°"
                subCounter = historyArray.length + 1
            }
        }   
    }

    today = today - 75600
    for(counter=1;counter<=7;counter++){
        today=today + 10800
        for(subCounter=0;subCounter<answer.data.hourly.length;subCounter++){
            if(today == answer.data.hourly[subCounter].dt){
                document.getElementById(counter + "tt").innerHTML = answer.data.hourly[subCounter].temp.toFixed(0) + "°"
                subCounter = historyArray.length + 1
            }
        }   
    }

    for(counter=1;counter<=7;counter++){
        if(document.getElementById(counter + "tt").innerHTML == ""){
            document.getElementById(counter + "tt").innerHTML = "21°"
        } 
    }

    

    if(answer.data.current.weather[0].main="Clear"){
        changeClassIcon("wi-day-sunny")
    }

    if(answer.data.current.weather[0].main="Clouds"){
        changeClassIcon("wi-day-cloudy")
    }
    
    document.getElementById('current-description').innerHTML = answer.data.current.weather[0].description
    document.getElementById("current-temperature").innerHTML = answer.data.current.temp.toFixed(0) + "°"
    document.getElementById("high").innerHTML = answer.data.daily[0].temp.max.toFixed(1) + "°"
    document.getElementById("low").innerHTML = answer.data.daily[0].temp.min.toFixed(1) + "°"
    document.getElementById("wind").innerHTML = (answer.data.daily[0].wind_speed * 3.6).toFixed(0) + " km/h"
    document.getElementById("humidity").innerHTML = answer.data.current.humidity + "%"
    
    let dateTime = new Date(answer.data.current.sunrise*1000)
    document.getElementById("sunrise").innerHTML = dateTime.getHours() +":"+ dateTime.getMinutes()
    
    dateTime = new Date(answer.data.current.sunset*1000)
    document.getElementById("sunset").innerHTML = dateTime.getHours() +":"+ dateTime.getMinutes()

    for(let i=1; i<6;i++){
        dateTime = new Date(answer.data.daily[i].dt*1000)
        document.getElementById(i+"d").innerHTML = weekdayShort[dateTime.getDay()]
        document.getElementById(i+"ds").innerHTML = weekdayShort[dateTime.getDay()]
        document.getElementById(i+"dates").innerHTML = dateTime.getDate()+"/" + (dateTime.getMonth()+1)

        document.getElementById(i+"low").innerHTML = answer.data.daily[i].temp.min.toFixed(0) + "°"
        document.getElementById(i+"high").innerHTML = answer.data.daily[i].temp.max.toFixed(0) + "°"

        document.getElementById(i+"wind").innerHTML = ((answer.data.daily[i].wind_speed)*3.6).toFixed(0) + " km/h"

        document.getElementById(i+"hum").innerHTML = answer.data.daily[i].humidity.toFixed(0) + " %"

        tempRange = answer.data.daily[i].temp.min.toFixed(0) + "-" + answer.data.daily[i].temp.max.toFixed(0) + "°"
        document.getElementById(i+"t").innerHTML = tempRange

        if (answer.data.daily[i].weather[0].main = "Rain"){
            document.getElementById(i+"i").className = "wi wi-rain"
        }
    }    
}

function changeClassIcon(icon){
    document.getElementById("current-icon").className = "wi " + icon
}

