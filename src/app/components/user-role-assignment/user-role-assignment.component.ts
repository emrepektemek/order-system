import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserOperationAssignmentModel } from '../../models/userOperationAssignmentModel';
import { UserOperationAssignmentUpdateModel } from '../../models/userOperationAssignmentUpdateModel';
import { UserService } from './../../services/user.service';
import { UserOperationClaimService } from '../../services/userOperationClaimService';
import { roleMap } from '../../constants/role-map';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';
import { UserOperationAssignmentDeleteModel } from '../../models/userOperationAssignmentDeleteModel';

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
  selectedUserClaimOperationId: number = 0;
  selectedRole: number = 0;
  selectedUserId: number = 0;
  selecteOperationClaimId: number = 0;
  updateModalElement: any;
  deleteModalElement: any;
  userRoles = roleMap;

  constructor(
    private userService: UserService,
    private userOperationClaimService: UserOperationClaimService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.updateModalElement = new bootstrap.Modal(
      document.getElementById('userOperationClaimUpdateModal')!
    );
    this.deleteModalElement = new bootstrap.Modal(
      document.getElementById('userOperationClaimDeleteModal')!
    );
  }

  getUsers() {
    this.userService.getUsers().subscribe((response) => {
      this.userOperationAssignments = response.data;
      this.dataLoaded = true;
    });
  }

  openUpdateModal(userOperationClaimId: number, userId: number) {
    this.selectedUserClaimOperationId = userOperationClaimId;
    this.selectedUserId = userId;
    this.updateModalElement.show();
  }

  openDeleteModal(
    userOperationClaimId: number,
    userId: number,
    operationClaimId: number
  ) {
    this.selectedUserClaimOperationId = userOperationClaimId;
    this.selectedUserId = userId;
    this.selecteOperationClaimId = operationClaimId;
    this.deleteModalElement.show();
  }

  selectRole(role: number): void {
    this.selectedRole = role;
  }

  getRoleName(role: number): string {
    return this.userRoles[role] || this.userRoles[0];
  }

  saveRole() {
    let updateObject: UserOperationAssignmentUpdateModel = {
      id: this.selectedUserClaimOperationId,
      userId: this.selectedUserId,
      operationClaimId: this.selectedRole,
      status: true,
      isDeleted: false,
    };

    this.userOperationClaimService.update(updateObject).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        this.updateModalElement.hide();
      },
      (responseError) => {
        this.toastrService.error(
          'Could not update that role, please contact admin'
        );
        this.updateModalElement.hide();
      }
    );
  }

  deleteRole() {
    let deleteObject: UserOperationAssignmentDeleteModel = {
      id: this.selectedUserClaimOperationId,
      userId: this.selectedUserId,
      operationClaimId: this.selecteOperationClaimId,
      status: true,
      isDeleted: true,
    };

    this.userOperationClaimService.delete(deleteObject).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        this.deleteModalElement.hide();
      },
      (responseError) => {
        this.toastrService.error(
          'Could not delete that role, please contact admin'
        );
        this.deleteModalElement.hide();
      }
    );

    console.log(' ');
  }
}
