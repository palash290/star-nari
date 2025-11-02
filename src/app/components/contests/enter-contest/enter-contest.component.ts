import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-enter-contest',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './enter-contest.component.html',
  styleUrl: './enter-contest.component.css'
})
export class EnterContestComponent {

}
