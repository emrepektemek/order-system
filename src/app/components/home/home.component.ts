import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [],
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
