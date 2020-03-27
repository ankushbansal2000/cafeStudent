import { OrderData } from './../../model/OrderData';
import { AppEventEmitter } from './../../model/Utils/EventEmitter';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { AddItems } from 'src/app/model/additems';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  cart: Array<OrderData> = [];
  showPopupforQuantity: boolean = false;
  showPopupforPlaceOrder: boolean = false;
  itemList: Array<AddItems>;
  input: Array<AddItems>;
  constructor(private apiService: AuthService) { }

  ngOnInit() {
    this.getItem();
  }
  showPopup(item) {
    this.input = item;
    this.showPopupforQuantity = true;
  }
  forOrderPlace(){
    this.showPopupforPlaceOrder = true;
  }

  getItem() {
    this.apiService.getItems().subscribe(data => {
      this.itemList = data;
    },
      error => {
        alert(error.error.text);
      });
  }
  onUpdate(event: AppEventEmitter) {
    
    switch (event.eventData) {
     
      case 0:
        this.showPopupforQuantity = false;
        break;

      case 1:
        this.showPopupforQuantity = false;
        break;

      default:
        this.showPopupforQuantity = false;
        this.cart.push(event.eventData);
        break;
    }
  }

  onUpdateOfOrder(event: AppEventEmitter) {
    switch (event.eventData) {
           
      case 0:
        this.showPopupforPlaceOrder = false;
        break;

      default:
          this.showPopupforPlaceOrder = false;
          break;
    }
  }

}
