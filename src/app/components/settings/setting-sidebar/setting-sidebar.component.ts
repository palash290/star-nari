import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-setting-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './setting-sidebar.component.html',
  styleUrl: './setting-sidebar.component.css'
})
export class SettingSidebarComponent {

  constructor(private router: Router) { }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }


}
