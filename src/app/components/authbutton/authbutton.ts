import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { Router } from'@angular/router';

@Component({
  imports: [CommonModule],
  providers: [Router],
  selector: 'app-authbutton',
  styleUrl: './authbutton.css',
  templateUrl: './authbutton.html',
})
export class Authbutton {
  protected readonly window = window;
  protected auth = inject(AuthService);
  protected router = inject(Router);
}
