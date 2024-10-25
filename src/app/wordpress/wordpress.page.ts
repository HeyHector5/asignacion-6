import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wordpress',
  templateUrl: './wordpress.page.html',
  styleUrls: ['./wordpress.page.scss'],
})
export class WordpressPage implements OnInit {
  logoUrl = 'https://cdn.deultimominuto.net/wp-content/uploads/2024/10/DUM-OCT.png';
  posts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http.get<any[]>('https://deultimominuto.net/wp-json/wp/v2/posts?_embed')
      .subscribe({
        next: res => {
          console.log('Respuesta de la API:', res);
          if (res.length > 0) {
            this.posts = res.slice(0, 3);
          } else {
            console.warn('No se encontraron posts');
          }
        },
        error: err => {
          console.error('Error al obtener los posts', err);
        }
      });
  }
}
