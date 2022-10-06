const wrapper = document.querySelector(".wrapper")
inputPart = wrapper.querySelector(".input-part")
infoTxt = inputPart.querySelector(".info-txt")
inputField = inputPart.querySelector("input")
locationBtn = inputPart.querySelector("button")
wIcon = document.querySelector(".weather-part img")
arrowBack = wrapper.querySelector("header i")
const apiKey = `3265874a2c77ae4a04bb96236a642d2f` 

inputField.addEventListener("keyup", e => {
  if(e.key == "Enter" && inputField.value != ""){
    requestApi(inputField.value)
  }
})

locationBtn.addEventListener("click",() => {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess,onError)
  }else{
    alert("Your Browser does not support geolocation Api :*)")
  }
})

function onSuccess(position){
  const {latitude, longitude} = position.coords
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  fetch(api).then(response => response.json()).then(result => weatherDetails(result))
}

function onError(error){
  infoTxt.innerText = error.message
  infoTxt.classList.add("error")
}

const requestApi = async(city) => {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  infoTxt.innerText = await "Getting weather Details....(hehe)"
  infoTxt.classList.add("pending")
  const response = await fetch(api)
  const data = await response.json()
  return weatherDetails(data)
}

function weatherDetails(info){
  infoTxt.classList.replace("pending","error")
  if(info.cod == "404"){
    infoTxt.innerText = `${inputField.value} isnt a valid city name`
  }else{
    const city = info.name
    const country = info.sys.country
    const {description, id} = info.weather[0]
    const {feels_like, humidity, temp} = info.main

    if(id == 800){
      wIcon.src = "Weather Icons/clear.svg"
    }else if(id>=200 && id<=232){
      wIcon.src = "Weather Icons/strom.svg"
    }else if(id>=600 && id<=622){
      wIcon.src = "Weather Icons/snow.svg"
    }else if(id>=701 && id<=781){
      wIcon.src = "Weather Icons/haze.svg"
    }else if(id>=801 && id<=804){
      wIcon.src = "Weather Icons/cloud.svg"
    }else if(id>=300 && id<=321){
      wIcon.src = "Weather Icons/rain.svg"
    }else if(id>=500 && id<=531){
      wIcon.src = "Weather Icons/rain.svg"
    }

    wrapper.querySelector(".temp .numb").innerText = Math.floor(temp)
    wrapper.querySelector(".weather").innerText = description
    wrapper.querySelector(".location span").innerText = `${city},${country}`
    wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like)
    wrapper.querySelector(".humidity span").innerText = `${humidity}%`
    
    infoTxt.classList.remove("pending","error")
    wrapper.classList.add("active")
  }
  console.log(info)
}

arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active")
})