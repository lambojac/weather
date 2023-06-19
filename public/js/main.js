/* const checkbtn=document.getElementById('check-btn');
const input=document.getElementById('input');
const placename=document.getElementById('place-name');
const temp=document.getElementById('temp');
const temph1=document.getElementById('temph1');
const icon=document.getElementById('icon');
const togglerbutton=document.querySelector('.navbar-toggler');
const toggler=document.getElementById('navbarSupportedContent');

const checkWeather = async(event)=>
{
    const value=input.value;
    if(value==""){
        
        placename.innerText="Enter any place";
        temph1.classList.add('hide');

    }
    else{
    try
{
    const url=`https://api.weatherapi.com/v1/current.json?key=da706f928c504a83aa7230110222404&q=${value}`;
    const response=await fetch(url);
    const data= await response.json();
    temph1.classList.remove("hide");
    const arrData=[data];
    placename.innerText=`${arrData[0].location.name}, ${arrData[0].location.country}`;
    temp.innerText=arrData[0].current.temp_c;
    const tempmood=arrData[0].current.condition.text;

    if(tempmood == "Mist"){
        icon.innerHTML=`<i class="fa-solid fa-sun" style="color:yellow"></i>`
    }
    else if(tempmood=='clear' || tempmood=="Clear"){
        icon.innerHTML=`<i class="fa-solid fa-cloud-sun" style="color:green"></i>`
    }
    else if(tempmood=='sunny' || tempmood=="Sunny"){
        icon.innerHTML=`<i class="fa-solid fa-sun" style="color:yellow"></i>`
    }
    else if(tempmood=="Partly cloudy"){
        icon.innerHTML=`<i class="fa-solid fa-clouds-sun" style="color:aqua"></i>`
    }
    else if(tempmood=="Overcast"  || tempmood=="Rainy" || tempmood=="rainy"){
        icon.innerHTML=`<i class="fa-solid fa-cloud-rain" style="color:blue"></i>`
    }
    else{
        icon.innerHTML=`<i class="fa-solid fa-sun" style="color:yellow"></i>`
    
    }
}
    catch{
        placename.innerText="Wrong Input"
        temph1.classList.add("hide");
    }
    }
}
console.log(checkbtn);



checkbtn.addEventListener("click", checkWeather);
togglerbutton.addEventListener('click',()=>{
    if(togglerbutton.classList.contains("collapsed")){
        togglerbutton.classList.remove("collapsed");
        toggler.classList.add("show");
        togglerbutton.ariaExpanded=true;
    }else{
        
        toggler.classList.remove("show");
        togglerbutton.classList.add('collapsed')
        togglerbutton.ariaExpanded=false;
    }
})
 */
const date = document.getElementById("card-header");
const submitBtn = document.getElementById("submit-btn");
const inputValue = document.getElementById("input-value");
const errorMessage = document.getElementById("card-title");
const place = document.getElementById("location");
const temp = document.getElementById("temp");
const minTemp = document.getElementById("min-temp");
const maxTemp = document.getElementById("max-temp");
const speed = document.getElementById("speed");
const degree = document.getElementById("degree");
const humidity = document.getElementById("humidity");

const getCurrentDate = () => {
  let currentDate = new Date();
  let weekday = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let days = weekday[currentDate.getDay()];
  let month = months[currentDate.getMonth()];
  let date = currentDate.getDate();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  let periods = "AM";
  if (hours > 11) {
    periods = "PM";
    if (hours > 12) hours = hours - 12;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${days} | ${date} ${month} | ${hours}:${minutes} ${periods}`;
};
date.innerHTML = getCurrentDate();

const getWeather = async (event) => {
  event.preventDefault();
  let cityName = inputValue.value;
  if (cityName === "") {
    errorMessage.innerHTML = "Please Enter city name.";
  } else {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=84c152cc26bba95d8a9943e3f65d61dc`
      );
      const data = await response.json();
      errorMessage.innerHTML = "";
      place.innerText = `Location: ${data.name}, ${data.sys.country}`;
      temp.innerText = `Temperature: ${data.main.temp}° C`;
      minTemp.innerText = `Min Temperature: ${data.main.temp_min}° C`;
      maxTemp.innerText = `Max Temperature:${data.main.temp_max}° C`;
      speed.innerText = `Wind Speed: ${data.wind.speed}`;
      degree.innerText = `Wind Degree: ${data.wind.deg}`;
      humidity.innerText = `Humidity: ${data.main.humidity}`;
      inputValue.value = "";
    } catch (error) {
      errorMessage.innerHTML = "Please give valid city name.";
    }
  }
};
submitBtn.addEventListener("click", getWeather);
