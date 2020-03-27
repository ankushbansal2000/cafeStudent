import { AppEventEmitter } from './../../../model/Utils/EventEmitter';
import { AuthService } from 'src/app/auth.service';
import { OrderData, CheckOut } from './../../../model/OrderData';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  itemList = Array<OrderData>();
  email: string;
  total: number;
  id: number;
  input: number;

  public updateQuantityOrder = {} as OrderData;
  @Input() orderInCart = {} as OrderData;
  orderCheckOut = {} as CheckOut;
  onUpdateBool: boolean = false;
  @Output() showPopupforPlaceOrder: EventEmitter<any> = new EventEmitter<any>();
  constructor(private apiService: AuthService, public location: Location) { }

  ngOnInit() {
    this.openModal();
    this.email = sessionStorage.getItem('user_id');
    this.getApiCall(this.orderInCart);
  }
  openModal() {
    var modal = document.getElementById('modal');
    modal.style.display = 'block';
  }
  orderEnter() {
    this.postApiOrder();
  }
  postApiOrder() {
    this.orderCheckOut.email = this.email;
    this.orderCheckOut.order = JSON.stringify(this.itemList);
    this.apiService.postOrderItem(this.orderCheckOut).subscribe(data => {
      location.reload();
    },
      error => {
        alert(error.error.text);
      });
  }

  closeModal(no: number) {
    var modal = document.getElementById('modal');
    modal.style.display = 'none';
    const emitter = new AppEventEmitter();
    emitter.eventData = no;
    this.showPopupforPlaceOrder.emit(emitter);
  }

  getApiCall(total: OrderData) {
    this.apiService.getCartData(this.email).subscribe(data => {
      total.total_Price = 0;
      this.itemList = data;
      this.itemList.forEach(function (value) {
        total.total_Price = (+total.total_Price) + (value.quantity * value.item_price);
      });
      this.total = total.total_Price;
    },
      error => {
        alert(error.error.text);
      });
  }


  onDeleteApi(id: number) {
    this.apiService.deleteCartItem(id).subscribe(data => {
      this.getApiCall(this.orderInCart);
    },
      error => {
        alert(error.error.text);
      });
  }


  onUpdateApi(id: number) {
    this.id = id;
    this.getApiForUpdate(this.id);
    this.onUpdateBool = true;
  }
  getApiForUpdate(id) {
    this.apiService.getItemForUpdateCartData(id).subscribe(data => {
      this.updateQuantityOrder = data;
    },
      error => {
        alert(error.error.text);
      });
  }

  onUpdateQuantity() {
    this.onUpdateBool = false;
    this.putApiForUpdate();
  }

  putApiForUpdate() {
    this.apiService.putItemForUpdateCartData(this.id, this.updateQuantityOrder).subscribe(data => {
      this.getApiCall(this.orderInCart);
    },
      error => {
        alert(error.error.text);
      });
  }
  onCloseQuantity() {
    this.onUpdateBool = false;
  }

}
