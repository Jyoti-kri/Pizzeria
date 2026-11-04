import { Routes } from '@angular/router';
import { OrderPizza } from './pages/order-pizza/order-pizza';
import { BuildPizza } from './pages/build-pizza/build-pizza';
import { Cart } from './pages/cart/cart';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [

    {
        path: '',
        component: Home
    },

    {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

    {
        path:'order-pizza',
        component:OrderPizza
    },
    {
        path:'build-pizza',
        component:BuildPizza
    },
    {
        path:'cart',
        component:Cart
    }
];
