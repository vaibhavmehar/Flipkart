import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { PdetailsComponent } from './component/pdetails/pdetails.component';
import { ProductComponent } from './component/product/product.component';
import { RecoverypasswordComponent } from './component/recoverypassword/recoverypassword.component';
import { RegisterComponent } from './component/register/register.component';

const routes: Routes = [
  { path:'' , redirectTo:'product', pathMatch: 'full'},
  { path:'register', component: RegisterComponent},
  { path:'fpassword', component: RecoverypasswordComponent},
  { path:'product',component: ProductComponent},
  { path:'cart', component:CartComponent},
  { path:'pdetails', component:PdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
