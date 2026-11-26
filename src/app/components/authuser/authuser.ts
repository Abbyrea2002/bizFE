import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe, JsonPipe } from '@angular/common';


@Component({
  imports: [AsyncPipe, JsonPipe],
  selector: 'app-authuser',
  styleUrl: './authuser.css',
  templateUrl: './authuser.html',
})
export class Authuser {
  protected auth = inject(AuthService);
}
