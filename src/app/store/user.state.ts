import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserOperationAssignmentModel } from '../models/userOperationAssignmentModel';

@Injectable({
  providedIn: 'root',
})
export class UserState {
  private users = new BehaviorSubject<UserOperationAssignmentModel[]>([]);

  users$ = this.users.asObservable();

  setUsers(users: UserOperationAssignmentModel[]) {
    this.users.next(users);
  }
}
