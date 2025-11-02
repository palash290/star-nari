import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-contest',
  imports: [HeaderComponent, RouterLink],
  templateUrl: './view-contest.component.html',
  styleUrl: './view-contest.component.css'
})
export class ViewContestComponent {

}
