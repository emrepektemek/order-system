import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductAddModel } from '../models/productAddModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'https://localhost:44372/api/Products/';

  constructor(private httpClient: HttpClient) {}

  add(productAddModel: ProductAddModel) {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'add',
      productAddModel
    );
  }
}
