import { Component } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { Authbutton } from '../authbutton/authbutton';
import { Authuser } from '../authuser/authuser';

@Component({
  imports: [RouterModule, RouterLink, Authbutton, Authuser],
  selector: 'app-navigation',
  styleUrl: './navigation.css',
  templateUrl: './navigation.html',
})
export class Navigation {}
