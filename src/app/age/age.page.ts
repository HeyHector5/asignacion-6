import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-age',
  templateUrl: './age.page.html',
  styleUrls: ['./age.page.scss'],
})
export class AgePage implements OnInit {
  name = '';
  age = 0;
  category = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  predictAge() {
    this.http.get<any>(`https://api.agify.io/?name=${this.name}`).subscribe({
      next: res => {
        this.age = res.age;
        this.category = this.age < 18 ? 'Joven' : this.age < 60 ? 'Adulto' : 'Anciano';
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
