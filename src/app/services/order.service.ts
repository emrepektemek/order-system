import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseListDataModel } from '../models/responseListDataModel';
import { Observable } from 'rxjs';
import { OrderReportModel } from '../models/orderReportModel';
import { OrderCreateModel } from '../models/orderCreateModel';
import { ResponseModel } from '../models/responseModel';
import { UserOrderReportModel } from '../models/userOrderReportModel';
import { OrderApproveModel } from '../models/orderApproveModel';
import { ResponseSingleDataModel } from '../models/responseSingleDataModel';
import { OrderApproveRejectModel } from '../models/orderApproveUpdateModel';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl = 'https://localhost:44372/api/Orders/';

  constructor(private httpClient: HttpClient) {}

  add(order: OrderCreateModel) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', order);
  }

  getReports(): Observable<ResponseListDataModel<OrderReportModel>> {
    return this.httpClient.get<ResponseListDataModel<OrderReportModel>>(
      this.apiUrl + 'getreports'
    );
  }
  getUserOrderReports(
    customerId: number
  ): Observable<ResponseListDataModel<UserOrderReportModel>> {
    return this.httpClient.get<ResponseListDataModel<UserOrderReportModel>>(
      this.apiUrl + 'getuserreports?customerId=' + customerId
    );
  }

  getOrderApproves(): Observable<ResponseListDataModel<OrderApproveModel>> {
    return this.httpClient.get<ResponseListDataModel<OrderApproveModel>>(
      this.apiUrl + 'getapproves'
    );
  }

  approveReject(orderApproveUpdateModel: OrderApproveRejectModel) {
    return this.httpClient.post<
      ResponseSingleDataModel<OrderApproveRejectModel>
    >(this.apiUrl + 'reject', orderApproveUpdateModel);
  }
}
