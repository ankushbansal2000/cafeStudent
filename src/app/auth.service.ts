import { OrderData, CheckOut } from './model/OrderData';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from './model/studentData';
import { AddItems } from './model/additems';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'})
  constructor(private httpClient: HttpClient) { }


  createUser(employee: Student) {
    return this.httpClient.post(this.baseUrl + '/userdetail/user', employee, {headers : this.httpHeaders});
  }

  logInUser(page: string, testname: string) {
    return this.httpClient.get<Student[]>(this.baseUrl + '/userdetail/login/?email=' + page +"&password="+testname);
  }

  getItems() {
    return this.httpClient.get<AddItems[]>(this.baseUrl + '/router/itemdetail/');
  }

  postCartData(data: OrderData){ 
    return this.httpClient.post(this.baseUrl + '/cartdetail/post/', data, {headers : this.httpHeaders});
  }
  getCartData(email: string) {
    return this.httpClient.get<OrderData[]>(this.baseUrl + '/cartdetail/get/?email='+email);
  }
  getItemForUpdateCartData(id: number) {
    return this.httpClient.get<OrderData>(this.baseUrl + '/router/cartupdate/'+id +'/');
  }
  putItemForUpdateCartData(id,data) {
    return this.httpClient.put<OrderData[]>(this.baseUrl + '/router/cartupdate/'+id+'/',data );
  }
  deleteCartItem(id:number) {
    return this.httpClient.delete<OrderData[]>(this.baseUrl + '/router/cartupdate/'+id+'/' );
  }

  postOrderItem(data: CheckOut){ 
    return this.httpClient.post(this.baseUrl + '/orderdetail/post/', data, {headers : this.httpHeaders});
  }


}
 