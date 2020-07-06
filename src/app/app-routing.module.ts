import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './Pages/home/home.component';
import {SliderComponent} from './Pages/home/slider/slider.component';
import {RegisterComponent} from './Pages/register/register.component';
import {ActiveAccountComponent} from './SharedComponents/active-account/active-account.component';
import {LoginComponent} from './Pages/login/login.component';
import { HeaderSidenavComponent } from './SharedComponents/header-sidenav/header-sidenav.component';
import {ProductsComponent} from './Pages/products/products.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'activate-account/:activeCode', component: ActiveAccountComponent},
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  HomeComponent,
  SliderComponent,
  RegisterComponent,
  ActiveAccountComponent,
  LoginComponent,
  ProductsComponent,
  HeaderSidenavComponent
];
