import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './Pages/home/home.component';
import {SliderComponent} from './Pages/home/slider/slider.component';
import {RegisterComponent} from './Pages/register/register.component';
import {ActiveAccountComponent} from './SharedComponents/active-account/active-account.component';
import {LoginComponent} from './Pages/login/login.component';
import { HeaderSidenavComponent } from './SharedComponents/header-sidenav/header-sidenav.component';
import {ProductsComponent} from './Pages/products/products.component';
import { SingleProductComponent } from './SharedComponents/single-product/single-product.component';
import {ProductDetailComponent} from './Pages/product-detail/product-detail.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent, data: { breadcrumb: 'ثبت نام'}},
  {path: 'activate-account/:activeCode', component: ActiveAccountComponent, data: { breadcrumb: 'فعال سازی اکانت'}},
  {path: 'login', component: LoginComponent, data: { breadcrumb: 'ورود'}},
  {path: 'products', component: ProductsComponent, data: { breadcrumb: 'محصولات'}},
  {path: 'products/:productId/:productName', component: ProductDetailComponent, data: { breadcrumb: 'جزئیات'}}

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
  HeaderSidenavComponent,
  SingleProductComponent,
  ProductDetailComponent
];
