import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-universities',
  templateUrl: './universities.page.html',
  styleUrls: ['./universities.page.scss'],
})
export class UniversitiesPage implements OnInit {
  country = '';
  countries: string[] = [];
  universities: any[] = [];
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCountries();
  }

  fetchCountries() {
    this.http.get<{ countries: string[] }>('assets/countries.json')
      .subscribe(res => {
        this.countries = res.countries;
      });
  }

  searchUniversities() {
    if (!this.country) {
      return;
    }
    
    this.http.get<any[]>(`http://universities.hipolabs.com/search?country=${this.country}`)
      .subscribe(res => {
        this.universities = res.map(uni => ({
          ...uni,
          logo: this.getUniversityLogo(uni.name)
        }));
      });
  }

  getUniversityLogo(name: string): string | null {
    return null;
  }
}
