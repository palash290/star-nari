import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-joined-kitty-group',
  imports: [CommonModule, HeaderComponent, RouterLink],
  templateUrl: './joined-kitty-group.component.html',
  styleUrl: './joined-kitty-group.component.css'
})
export class JoinedKittyGroupComponent {

}
