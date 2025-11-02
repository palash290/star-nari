import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-contest',
  imports: [HeaderComponent, RouterLink],
  templateUrl: './create-contest.component.html',
  styleUrl: './create-contest.component.css'
})
export class CreateContestComponent {

}
