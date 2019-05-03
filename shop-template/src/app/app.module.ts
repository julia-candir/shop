import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AdminOrdersComponent,
    AdminProductsComponent,
    AppComponent,
    CheckOutComponent,
    HomeComponent,
    LoginComponent,
    MyOrdersComponent,
    NavbarComponent,
    NotFoundComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ShoppingCartComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
      },
      {
        path: 'my/orders',
        component: MyOrdersComponent,
      },
      {
        path: 'check-out',
        component: CheckOutComponent,
      },
      {
        path: 'order-success',
        component: OrderSuccessComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'admin/admin-products',
        component: AdminProductsComponent,
      },
      {
        path: 'admin/admin-orders',
        component: AdminOrdersComponent,
      },
      { path: '**', component: NotFoundComponent },
    ]),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
