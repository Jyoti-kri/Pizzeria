import { Component, OnInit, signal } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {

  cartItems = signal<any[]>([]);

  grandTotal = 0;

  constructor(private cartService: CartService) { }


  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {

    this.cartService.getCartItems().subscribe((response: any) => {

      this.cartItems.set(response);

      this.calculateTotal();
    });
  }

  calculateTotal() {

    this.grandTotal = 0;

    this.cartItems().forEach((item) => {
      this.grandTotal += item.price * item.quantity;
    });
  }

  increaseQuantity(item: any) {

    item.quantity++;

    this.cartService
      .updateQuantity(item._id, item.quantity)
      .subscribe(() => {
        this.calculateTotal();
      });
  }

  decreaseQuantity(item: any) {

    if (item.quantity > 1) {

      item.quantity--;

      this.cartService
        .updateQuantity(item._id, item.quantity)
        .subscribe(() => {
          this.calculateTotal();
        });
    }
  }

  deleteItem(id: string) {

    this.cartService.deleteItem(id).subscribe(() => {
      this.getCartItems();
    });

  }

}