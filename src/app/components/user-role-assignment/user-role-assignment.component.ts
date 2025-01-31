import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserOperationAssignmentModel } from '../../models/userOperationAssignmentModel';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-user-role-assignment',
  imports: [CommonModule],

  templateUrl: './user-role-assignment.component.html',
  styleUrl: './user-role-assignment.component.css',
})
export class UserRoleAssignmentComponent implements OnInit {
  userOperationAssignments: UserOperationAssignmentModel[] = [];
  dataLoaded: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((response) => {
      this.userOperationAssignments = response.data;
      this.dataLoaded = true;
    });
  }
}
