import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerState {
  private customer = new BehaviorSubject<Customer[]>([]);

  customers$ = this.customer.asObservable();

  setCustomer(customer: Customer[]) {
    this.customer.next(customer);
  }

  clearCustomer(): void {
    this.customer.next([]);
  }
}
