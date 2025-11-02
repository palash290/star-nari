import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-vote-contest',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './vote-contest.component.html',
  styleUrl: './vote-contest.component.css'
})
export class VoteContestComponent {

}
