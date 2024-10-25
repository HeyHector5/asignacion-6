import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  selectedProvince = '';
  weatherData: any;
  forecastData: any;
  provinces = [
    'Azua', 'Baní', 'Barahona', 'Comendador', 'Cotuí', 'Dajabón', 'Distrito Nacional',
    'El Seibo', 'Hato Mayor', 'La Altagracia', 'La Romana', 'La Vega', 'Jimaní', 'Mao', 'Moca',
    'Monte Plata', 'Nagua', 'Neiba', 'Pedernales', 'Puerto Plata', 'Sabaneta', 'Salcedo', 'Samaná', 'San Cristóbal', 'San Fernando de Monte Cristi',
    'San Francisco de Macorís', 'San José de Ocoa', 'San Juan de la Maguana', 'San Pedro de Macorís', 'Santiago de los Caballeros', 'Santo Domingo'
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  fetchWeather() {
    const apiKey = '928d84bcf6088d890e43274bb631126b'; // Sustituye con tu API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.selectedProvince},DO&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${this.selectedProvince},DO&units=metric&appid=${apiKey}`;

    this.http.get(url).subscribe(data => {
      this.weatherData = data;
    });

    this.http.get(forecastUrl).subscribe((data: any) => {
      this.forecastData = data;
      this.forecastData.list = this.forecastData.list.map((forecast: any) => {
        forecast.dt_txt = this.convertToAMPM(forecast.dt_txt);
        return forecast;
      });
    });
  }

  convertToAMPM(dateString: string): string {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${hours}:${minutesStr} ${ampm}`;
  }
}
