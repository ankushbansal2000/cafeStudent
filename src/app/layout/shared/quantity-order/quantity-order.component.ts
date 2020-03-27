import { AuthService } from './../../../auth.service';
import { OrderData } from './../../../model/OrderData';
import { AppEventEmitter } from './../../../model/Utils/EventEmitter';
import { AddItems } from 'src/app/model/additems';
import { Student } from './../../../model/studentData';
import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quantity-order',
  templateUrl: './quantity-order.component.html',
  styleUrls: ['./quantity-order.component.css']
})
export class QuantityOrderComponent implements OnInit {
  public addItems = {} as OrderData;
  email : string;
  @Input() input = {} as AddItems;

  orderData: Array<OrderData> = [];

  @Output() showPopupforQuantity: EventEmitter<any> = new EventEmitter<any>();
  constructor(private apiService: AuthService) { }

  ngOnInit() {
    this.openModal();
     this.email= sessionStorage.getItem('user_id');
  }
  openModal() {
    var modal = document.getElementById('modal');
    modal.style.display = 'block';
  }

  closeModal(no: number) {
    var modal = document.getElementById('modal');
    modal.style.display = 'none';
    const emitter = new AppEventEmitter();
    emitter.eventData = no;
    this.showPopupforQuantity.emit(emitter);
  }
  orderEnter(data: number) {
    var modal = document.getElementById('modal');
    modal.style.display = 'none';
    this.addItems.item_name = this.input.name;
    this.addItems.emailid = this.email;
    this.addItems.item_price = this.input.price;
    this.postApiCall(this.addItems,data);
  }
  postApiCall(dataLocal: OrderData, no) {
    this.apiService.postCartData(dataLocal).subscribe(data => {
      const emitter = new AppEventEmitter();
    emitter.eventData = no;
    this.showPopupforQuantity.emit(emitter);
    },
      error => {
        alert(error.error.text);
      });
  }


}