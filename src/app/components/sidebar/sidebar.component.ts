import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  data: any;

  constructor(private router: Router, private commonService: CommonService) { }

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    this.commonService.get('user/profile').subscribe({
      next: (resp: any) => {
        this.data = resp.data;
      },
      error: (error) => {
        console.log(error || 'Something went wrong!');
      }
    });
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }


}
