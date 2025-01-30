import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseListDataModel } from '../models/responseListDataModel';
import { Observable } from 'rxjs';
import { OrderReportModel } from '../models/orderReportModel';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl = 'https://localhost:44372/api/Orders/';

  constructor(private httpClient: HttpClient) {}

  getReports(): Observable<ResponseListDataModel<OrderReportModel>> {
    return this.httpClient.get<ResponseListDataModel<OrderReportModel>>(
      this.apiUrl + 'getreports'
    );
  }
}
