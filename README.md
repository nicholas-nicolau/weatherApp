# Weather App

## Description
Oh this application you'll be able to see the weather forecast of your area, considering that you're not using VPN or similar features, the application will locate you by using your IP address through [IpInfo](https://ipinfo.io/) API.

## How it works
When you access the [Weather App](https://weatherappn.netlify.app/), [Axios](https://github.com/axios/axios) hit the IPInfo API with your IP address. <br>
Receiving your city, country code and coordenates, a requisition is made to [OpenWeather](https://openweathermap.org/) who returns the Weather forecast and historical data to populate all itens on screen.<br>
If your country code is "US" or "UK" the units displayed are changed to imperial format (Fahrenheit/mph), however you can change it as any time clicking the dropdown list above and to the right of the screen.

## Appearance
The displayed data will change depending on the size  of your screen.

**For 337px ≤ width < 768px, we have the mobile screen.**

![Mobile screen](https://user-images.githubusercontent.com/96356472/161833952-b6e5f7ac-1ea0-4511-9dd8-ac86f73b8257.png)


**For 798px ≤ width < 1100px, we have the intermediary screen.**

![intermediary screen](https://user-images.githubusercontent.com/96356472/161834341-6123f5d0-e560-477c-a8e5-847c647e7765.png)

**Finally, for bigger screens we have this visualisation.**

![bigger screens](https://user-images.githubusercontent.com/96356472/161834812-0d86a7e5-3a0c-4885-b9a7-f7224020f844.png)

## Suport
If you do have any problem accessing this app you can call on me at any time here on my GitHub page or through my [Linkedin](https://linkedin.com/in/nicholas-nicolau)

## Authors and acknowledgment
Thanks to for the layout's inspiration, it really has helped me a lot!. <br>
Thanks to the [Weather Icons](https://erikflowers.github.io/weather-icons/) for making it really easy to use icons for Weather Apps.
