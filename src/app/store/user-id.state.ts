import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserIdState {
  private userIdSubject = new BehaviorSubject<number | null>(null);

  userId$ = this.userIdSubject.asObservable();

  setUserId(userId: number | null): void {
    this.userIdSubject.next(userId);
  }

  clearUserId(): void {
    this.userIdSubject.next(null);
  }
}
