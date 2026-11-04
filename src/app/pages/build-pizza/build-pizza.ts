import { Component, OnInit, signal } from '@angular/core';
import { Ingredient } from '../../services/ingredient';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-build-pizza',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './build-pizza.html',
  styleUrl: './build-pizza.css',
})
export class BuildPizza implements OnInit {

  ingredients = signal<any[]>([]);
  totalPrice = 0;


  selectedIngredients: any[] = [];
  selectedPizza: any;


  //constructor(private ingredientService: Ingredient) {}


  constructor(
    private ingredientService: Ingredient,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const pizzaData = localStorage.getItem('selectedPizza');
    //console.log("selected pizza local storage data", pizzaData)

    if (!pizzaData) {

      alert('Please order a pizza first');

      this.router.navigate(['/order-pizza']);

      return;
    }

    this.selectedPizza = JSON.parse(pizzaData);

    this.totalPrice = this.selectedPizza.price;

    this.getIngredients();

  }

  getIngredients() {
    this.ingredientService.getIngredients().subscribe((response: any) => {
      this.ingredients.set(response);
      console.log("Ingredinets is fetched", response)
    });
  }



  updatePrice(item: any, event: any) {

    if (event.target.checked) {
      this.totalPrice += item.price;

      this.selectedIngredients.push(item.tname);
    } else {
      this.totalPrice -= item.price;

      this.selectedIngredients =
        this.selectedIngredients.filter(
          (ing) => ing !== item.tname
        );
    }
  }


  buildPizza() {

    const finalPizza = {

      pizzaId: this.selectedPizza.id,

      name: this.selectedPizza.name,

      image: this.selectedPizza.image,

      quantity: 1,

      ingredients: this.selectedIngredients,

      price: this.totalPrice
    };

    this.cartService.addToCart(finalPizza)
      .subscribe(() => {

        alert('Customized Pizza Added To Cart');

        localStorage.removeItem('selectedPizza');

        this.router.navigate(['/cart']);
      });
  }


}



