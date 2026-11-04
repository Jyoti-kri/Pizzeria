import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  apiUrl = 'http://localhost:3000/api/cart';

  constructor(private http: HttpClient) {}

  getCartItems() {
    return this.http.get<any>(this.apiUrl);
  }

  addToCart(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateQuantity(id: string, quantity: number) {
    return this.http.put(`${this.apiUrl}/${id}`, {
      quantity
    });
  }

  deleteItem(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
