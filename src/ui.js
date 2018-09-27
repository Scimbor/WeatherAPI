 class UI {
     constructor() {
         this.weather = document.getElementById('containerWeather');
         this.forecast = document.getElementById('containerForecast');
         this.forState = 'add';
         this.boxPost = document.querySelector('.card');
         this.date = new Date();
         this.day = this.date.getDate();
         this.month = this.date.getMonth();
         this.year = this.date.getFullYear();

         this.arrayMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
     }

     showWeather(data) {
         this.weather.innerHTML = `
                <div class="row">
                    <div class="jumbotron jumbotron-fluid jumbotron-custom">
                        <div class="temp pr-5">
                            <h3>${this.day} ${this.arrayMonth[this.month-1]} ${this.year}</h3>
                            <h2>${(data.main.temp.toFixed(0))}&#8451;</h2>
                            <h3 class="descriptionWeahter">${data.weather[0].description}</h3>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="bg-gray10 information-text text-white box">
                        <h2>${data.name}, ${data.sys.country}</h2>
                        <h4>Coordinates: ${data.coord.lat}N &nbsp; ${data.coord.lon}E</h4>
                        <p class="mt-3">"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."</p>
                    </div>
                </div>`;
     }

     showForecast(data) {
         let output = `
            <div class="col-md-3 boxForecastMainStyle boxFirsForecast">
                <h4 class="text-white">Weather</h4>
                <img src="assets/img/sun.png" alt="sun">
            </div>`;

         for (let i = 0; i < 7; i++) {
             output += `
                <div class="col-md-3 boxForecastMainStyle boxRestForecast boxRestForecastAfter-${i}">
                    <h3 class="data">${data.list[i].dt_txt.substr(0,9)}</h3>
                    <h4 class="data">${data.list[i].dt_txt.substr(11,15)}</h4>
                    <h2 class="temperature">${data.list[i].main.temp.toFixed(0)}&#8451;</h2>
                    <h3 class="description">${data.list[i].weather[0].description}</h3>
                    <span></span>
                </div>`;
         }

         this.forecast.innerHTML = output;
     }

     showChart(data) {
         var arrayTemp = [];
         var arrayPress = [];
         var arrayDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

         var d = new Date();
         var dayNumber = d.getDay();
         var dayName = arrayDays[d.getDay()];

         for (let i = 0; i < dayNumber; i++) {
            arrayDays.push(arrayDays.shift());
         }

         for (let i = 0; i < 7; i++) {
             arrayTemp.push(data.list[i].main.temp);
             arrayPress.push(data.list[i].main.pressure);
         }
         
         var ctx = document.getElementById("myChart").getContext('2d');
         if(window.screen.availWidth <= 767){
            document.getElementById("myChart").style["height"] = "300px";
         }
         var myChart = new Chart(ctx, {
             type: 'line',
             data: {
                 labels: arrayDays,
                 datasets: [{
                     label: 'Temperature',
                     data: arrayTemp,
                     lineTension:0,
                     borderColor: [
                         'rgba(255,99,132,1)',
                     ],
                     borderWidth: 1,
                 }]
             },
             options: {
                 gridLines: {
                     color: ['white']
                 },
                 legend: {
                     labels: {
                         fontColor: 'cornsilk',
                         fontSize: 20
                     }
                 },
                 scales: {
                     xAxes: [{
                         type: 'category',
                         id: 'x-axis-0'
                     }],
                     yAxes: [{
                         type: 'linear',
                         id: 'y-axis-0'
                     }]
                 },
                 ticks:{
                    beginAtZero: true
                 }
             }
         });
     }
 }

 export const ui = new UI();