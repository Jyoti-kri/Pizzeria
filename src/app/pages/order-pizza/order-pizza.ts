import { Component, OnInit, signal } from '@angular/core';
import { Pizza } from '../../services/pizza';
import { CommonModule } from '@angular/common';
//import { CartService } from '../../services/cart-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-pizza',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './order-pizza.html',
  styleUrl: './order-pizza.css',
})
export class OrderPizza implements OnInit{

  pizzas=signal<any[]>([]);

  //constructor(private pizzaService : Pizza, private cartService: CartService){}

   constructor(
    private pizzaService: Pizza,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.getAllPizzas();
  }
  getAllPizzas(){
    this.pizzaService.getPizzas().subscribe((response: any)=>{
      this.pizzas.set(response);
      console.log("pizza is fetch",response)
    });
  }






  addToCart(pizza: any) {

    localStorage.setItem(
      'selectedPizza',
      JSON.stringify(pizza)
    );

    this.router.navigate(['/build-pizza']);
  }




  /*
  addToCart(pizza: any) {

    const data = {
      pizzaId: pizza.id,
      name: pizza.name,
      image: pizza.image,
      price: pizza.price,
      quantity: 1
    };

    this.cartService.addToCart(data).subscribe(() => {
      alert('Pizza Added To Cart');
    });
  }   */


}
