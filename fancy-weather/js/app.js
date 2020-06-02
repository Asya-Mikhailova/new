getLocation();
changeBackground();
setInterval(getDate, 1000);

//DEFINE LOCATION & WEATHER
function getLocation() {
  window.addEventListener('load', () => {
    let long;
    let lat;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        const key = '148926c7ca1946bab40f436801dbdd6b';
        let city;
        let location;
        let country;
        let temp;
        const temperature = document.querySelector('.temperature');

        const api_weather = `http://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${key}`;
        const api_location = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en
                `;

        fetch(api_location)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            city = data.localityInfo.administrative[2].name.toUpperCase();
            country = data.countryName.toUpperCase();

            location = `${city}, ${country}`;
            document.querySelector('h1').innerHTML = location;
          });

        fetch(api_weather)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            temp = Math.round(data.data[0].temp);
            temperature.innerHTML = `${temp} C&deg`;

            //CONVERTING TEMPERATURE

            const celsius = document.querySelector('#celsius');
            const farenheit = document.querySelector('#farenheit');
            let count = 0;

            farenheit.addEventListener('click', () => {
              // count++;
              // if (count > 1) {
              //   count = 0;
              //   return;
              // }
              temp = Math.round(temp * 1.8 + 32);
              temperature.innerHTML = `${temp} F&deg`;
            });

            celsius.addEventListener('click', () => {
              // count++;
              // if (count > 1) {
              //   count = 0;
              //   return;
              // }
              temp = Math.round(((temp - 32) * 5) / 9);
              document.querySelector(
                '.temperature'
              ).innerHTML = `${temp} C&deg`;
            });
          });
      });
    }
  });
}

//CHANGE BACKGROUND IMAGE ON CLICK;
function changeBackground() {
  let background = document.body.style.backgroundImage;
  let backgroundCount = 0;
  let newBackground;
  console.log(background);
  const images = [
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1440&q=80',
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80',
    'https://images.unsplash.com/photo-1474524955719-b9f87c50ce47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80',
    'https://images.unsplash.com/38/L2NfDz5SOm7Gbf755qpw_DSCF0490.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  ];

  const refreshButton = document.querySelector('.refresh');
  refreshButton.addEventListener('click', () => {
    backgroundCount++;
    if (backgroundCount > images.length - 1) backgroundCount = 0;
    newBackground = images[backgroundCount];

    document.body.style.background = `url(${newBackground})`;
    document.body.style.backgroundSize = 'cover';
    localStorage.setItem('back', newBackground);
    window.addEventListener('load', () => {
      let index = localStorage.getItem('back');
      backgroundCount = index;

      backgroundCount++;
      if (backgroundCount > images.length - 1) backgroundCount = 0;
      let newBackground = images[backgroundCount];

      document.body.style.background = `url(${newBackground})`;
      document.body.style.backgroundSize = 'cover';
    });
  });
}

//GETTING THE DATE AND TIME
function getDate() {
  const dateContainer = document.querySelector('.date');
  let today = new Date();

  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let date = `${week[today.getDay()]} ${today.getDate()} ${
    months[today.getMonth()]
  }`;

  dateContainer.innerHTML = date;
  document.querySelector(
    '.time'
  ).innerHTML = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
}

//LOADING A MAP
let map;
let latt;
let long;
let marker;

function initMap() {
  navigator.geolocation.getCurrentPosition((positions) => {
    long = positions.coords.longitude;
    latt = positions.coords.latitude;
    let location = { lat: latt, lng: long };

    map = new google.maps.Map(document.querySelector('.map'), {
      center: { lat: latt, lng: long },
      zoom: 8,
    });
    marker = new google.maps.Marker({ position: location, map: map });
  });
}
