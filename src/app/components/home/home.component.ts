import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, SidebarComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toastrService.info('Çıkış Yapıldı');
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
}
