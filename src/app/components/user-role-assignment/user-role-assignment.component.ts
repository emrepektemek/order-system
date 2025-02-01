import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserOperationAssignmentModel } from '../../models/userOperationAssignmentModel';
import { UserService } from './../../services/user.service';

declare var bootstrap: any;

@Component({
  selector: 'app-user-role-assignment',
  imports: [CommonModule],

  templateUrl: './user-role-assignment.component.html',
  styleUrl: './user-role-assignment.component.css',
})
export class UserRoleAssignmentComponent implements OnInit {
  userOperationAssignments: UserOperationAssignmentModel[] = [];
  dataLoaded: boolean = false;
  selectedRole: number = 0;
  selectedUserId: number = 0;
  modalElement: any;

  roleMap: { [key: number]: string } = {
    2: 'admin',
    4: 'user',
    5: 'customer.representative',
    0: 'Select Role',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
    this.modalElement = new bootstrap.Modal(
      document.getElementById('exampleModalCenter')!
    );
  }

  getUsers() {
    this.userService.getUsers().subscribe((response) => {
      this.userOperationAssignments = response.data;
      this.dataLoaded = true;
    });
  }

  openModal(userId: number) {
    this.selectedUserId = userId;
    this.modalElement.show();
  }

  selectRole(role: number): void {
    this.selectedRole = role;
  }

  getRoleName(role: number): string {
    return this.roleMap[role] || this.roleMap[0];
  }

  saveRole() {
    console.log(this.selectedRole, +'   ' + this.selectedUserId);
  }
}
