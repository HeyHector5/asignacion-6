import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.page.html',
  styleUrls: ['./gender.page.scss'],
})
export class GenderPage implements OnInit {
  name = '';
  gender = '';
  color = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  predictGender() {
    this.http.get<any>(`https://api.genderize.io/?name=${this.name}`).subscribe({
      next: res => {
        this.gender = res.gender;
        this.color = res.gender === 'male' ? 'blue' : 'pink';
        this.errorMessage = '';
      },
      error: err => {
        if (err.status === 429) {
          this.errorMessage = 'Has superado el límite de solicitudes. Inténtalo más tarde.';
        } else {
          this.errorMessage = 'Ocurrió un error al obtener la predicción.';
        }
      }
    });
  }

  ngOnInit() {
  }

}
