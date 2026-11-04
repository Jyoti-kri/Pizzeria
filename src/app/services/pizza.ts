import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Pizza {


  apiUrl = 'http://localhost:3000/api/pizzas';

  constructor(private http: HttpClient) {}

  getPizzas() {
    return this.http.get<any>(this.apiUrl);
  }

}
