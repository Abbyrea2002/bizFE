import { Component } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  imports: [RouterModule, RouterLink],
  selector: 'app-navigation',
  styleUrl: './navigation.css',
  templateUrl: './navigation.html',
})
export class Navigation {}
