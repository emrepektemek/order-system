import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { ResponseSingleDataModel } from '../models/responseSingleDataModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterModel } from '../models/registerModel';
import { IdTokenModel } from '../models/idTokenModel';
import { jwtDecode } from 'jwt-decode';

import { UserClaimState } from '../store/user-claim.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44372/api/Auth/';

  constructor(
    private httpClient: HttpClient,
    private userClaimState: UserClaimState
  ) {}

  login(loginModel: LoginModel) {
    return this.httpClient.post<ResponseSingleDataModel<TokenModel>>(
      this.apiUrl + 'login',
      loginModel
    );
  }

  register(registerModel: RegisterModel) {
    return this.httpClient.post<ResponseSingleDataModel<IdTokenModel>>(
      this.apiUrl + 'register',
      registerModel
    );
  }

  getUserClaim(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decodedToken: any = jwtDecode(token);
      return (
        decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] || null
      );
    } catch (error) {
      console.error('Token decode edilirken hata oluştu:', error);
      return null;
    }
  }

  setClaim(): void {
    const claim = this.getUserClaim();

    this.userClaimState.setClaim(claim);
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
