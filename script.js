const apiKey='0f1a1a65ffc3b98662ba4f43a5cf130e'
const btn=document.getElementById('89');
const button=document.getElementById('location');
function getForecast(city){
     fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+ apiKey).
     then(response=>response.json()).then(data2=>
      {
        let date=new Date(data2.list[0].dt_txt)
        let hours= (24-date.getHours())/3;
        for(let i=0;i<5;i++,hours+=8)
        {
          let {icon}=data2.list[hours].weather[0];
          document.querySelector('#e'+i+' > p').innerHTML=data2.list[hours].dt_txt.slice(0,10);
          document.querySelector('#e'+i+' > img').src='http://openweathermap.org/img/wn/'+icon+'.png';
          document.querySelector('#e'+i+' > h1').innerHTML=data2.list[hours].weather[0].main;
          document.querySelector('#e'+i+' > h2').innerHTML=(data2.list[hours].main.temp-273.15).toFixed(2)+'°C';
        }
      })
}
btn.addEventListener('click',()=>{
    let city=document.getElementById('city').value;
    getweather(city);
    document.getElementById('main1').classList.add('hidden');
    document.getElementById('section').classList.add('hidden');
    document.getElementById('city').value='';});
    function getweather(city){
        const a1=document.getElementById('output1');
        const img=document.getElementById('icon')
        const name1=document.getElementById('name')
        let body= document.getElementById('main')
        let description=document.getElementById('desc');
        let weather=document.getElementById('weather');
        let display=document.getElementById('tag');
        document.getElementById('main1').classList.add('hidden');
        document.getElementById('section').classList.add('hidden');
        document.getElementById('section1').classList.add('hidden');
        display.innerHTML="Fetching Weather";
        display.classList.remove("hidden");
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+ apiKey).
        then(response=>response.json()).
        then(data=>{
        document.querySelector("#NR").classList.add('hidden');
        body.classList.add("bg-[url('https://source.unsplash.com/random/?"+city+"')]");
        let timezone = 3600;
        a1.innerHTML=(data.main.temp-273.15).toFixed(2)+'°C';
        let {icon}=data.weather[0];
        name1.innerHTML=data.name;
        description.innerHTML=data.weather[0].description;
        weather.innerHTML=data.weather[0].main;
        document.querySelector("#wind").innerHTML=data.wind.speed;
        document.querySelector("#humidity").innerHTML=data.main.humidity;
        geticonlogo(icon);
        getForecast(city);
        img.src='http://openweathermap.org/img/wn/'+icon+'.png';
        document.querySelector('#sunrise').innerHTML=new Date((timezone+data.sys.sunrise)*1000).toUTCString();
        document.querySelector('#sunset').innerHTML=new Date((timezone+data.sys.sunset)*1000).toUTCString();
        display.classList.add("hidden");
        document.getElementById('main1').classList.remove('hidden');
        document.getElementById('section').classList.remove('hidden');
        document.getElementById('section1').classList.remove('hidden');
    }).catch((e)=>{
        document.querySelector("#NR").innerHTML="No results found";
        document.querySelector("#NR").classList.remove('hidden');
        display.classList.add("hidden");
    })
}
function geticonlogo(icon){
    let e=document.getElementById('logo');
    e.src='http://openweathermap.org/img/wn/'+icon+'.png';
}
function geocode(latitude,longitude) 
{
    var api_key = '349cba6779a346c8aa78027df94a4613';
    var latitude = latitude;
    var longitude = longitude;
    var api_url = 'https://api.opencagedata.com/geocode/v1/json'
    var request_url = api_url
      + '?'
      + 'key=' + api_key
      + '&q=' + encodeURIComponent(latitude + ',' + longitude)
      + '&pretty=1'
      + '&no_annotations=1';
    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);
    request.onload = function() {
      if (request.status === 200){
        var data = JSON.parse(request.responseText);
        console.log(data)
        getweather(data.results[0].components.city)
        console.log(data.results[0].components.city)
      } else if (request.status <= 500){
        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log('error msg: ' + data.status.message);
      } else {
        console.log("server error");
      }
    };
    request.onerror = function() {
      console.log("unable to connect to server");
    };
    request.send();
}
function sucess(data)
{
  geocode(data.coords.latitude,data.coords.longitude);
}

button.addEventListener('click',()=>{
     navigator.geolocation.getCurrentPosition(sucess,console.error);})