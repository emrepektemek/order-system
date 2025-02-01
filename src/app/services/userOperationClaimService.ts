import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { ResponseSingleDataModel } from '../models/responseSingleDataModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterModel } from '../models/registerModel';
import { UserOperationClaimModel } from './../models/userOperationClaimModel';

@Injectable({
  providedIn: 'root',
})
export class UserOperationClaimService {
  apiUrl = 'https://localhost:44372/api/UserOperationClaims/';

  constructor(private httpClient: HttpClient) {}

  add(userOperationClaimModel: UserOperationClaimModel) {
    return this.httpClient.post<
      ResponseSingleDataModel<UserOperationClaimModel>
    >(this.apiUrl + 'add', userOperationClaimModel);
  }
}
