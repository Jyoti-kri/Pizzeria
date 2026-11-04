import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Ingredient {

  apiUrl='http://localhost:3000/api/ingredients';

  constructor(private http: HttpClient){}
  
  getIngredients(){
    return this.http.get<any>(this.apiUrl);
  }

}
