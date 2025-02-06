import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserClaimState {
  private claimSubject = new BehaviorSubject<string | null>(null);
  claim$ = this.claimSubject.asObservable();

  setClaim(claim: string | null): void {
    this.claimSubject.next(claim);
  }

  clearClaim(): void {
    this.claimSubject.next(null);
  }
}
