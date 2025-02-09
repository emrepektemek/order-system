import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseListDataModel } from '../models/responseListDataModel';
import { Observable } from 'rxjs';
import { OrderReportModel } from '../models/orderReportModel';
import { Order } from '../models/order';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl = 'https://localhost:44372/api/Orders/';

  constructor(private httpClient: HttpClient) {}

  add(order: Order) {
    console.log(order);
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', order);
  }

  getReports(): Observable<ResponseListDataModel<OrderReportModel>> {
    return this.httpClient.get<ResponseListDataModel<OrderReportModel>>(
      this.apiUrl + 'getreports'
    );
  }
}
