import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';
import { CustomerAddModel } from '../models/customerAddModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44372/api/Customers/';

  constructor(private httpClient: HttpClient) {}

  add(customerAddModel: CustomerAddModel) {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'add',
      customerAddModel
    );
  }
}
