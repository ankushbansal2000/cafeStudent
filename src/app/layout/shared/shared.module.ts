import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantityOrderComponent } from './quantity-order/quantity-order.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [QuantityOrderComponent, CartComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    QuantityOrderComponent, CartComponent
  ]
})
export class SharedModule { }
