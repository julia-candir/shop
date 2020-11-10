import { ProductService } from './shared/services/product.service';
import { CategoryService } from './shared/services/category.service';
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

import { AdminAuthGuard } from './shared/guards/admin-guard.guard';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './shared/services/user.service';
import { UploadComponent } from './shared/components/upload-component/upload-component.component';
import { ModalComponent } from './shared/components/modal/modal.component';

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
    ProductFormComponent,
    UploadComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    ReactiveFormsModule,
    FormsModule,
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
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'my/orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'order-success',
        component: OrderSuccessComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin/admin-products',
        component: AdminProductsComponent,
        // canActivate: [AuthGuard, AdminAuthGuard],
      },
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        // canActivate: [AuthGuard, AdminAuthGuard],
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        // canActivate: [AuthGuard, AdminAuthGuard],
      },
      {
        path: 'admin/admin-orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
      { path: '**', component: NotFoundComponent },
    ]),
  ],
  providers: [AuthService, AuthGuard, UserService, AdminAuthGuard, AngularFirestore, CategoryService, ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
