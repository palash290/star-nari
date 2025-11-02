import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-all-sessions',
  imports: [HeaderComponent, RouterLink],
  templateUrl: './all-sessions.component.html',
  styleUrl: './all-sessions.component.css'
})
export class AllSessionsComponent {

}
