import { Component, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';

import { UserClaimState } from '../../store/user-claim.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  claim: string | null = null;

  constructor(private userClaimState: UserClaimState) {}

  ngOnInit(): void {
    this.userClaimState.claim$.subscribe((claim) => {
      this.claim = claim;
    });
  }
}
