import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-all-articles',
  imports: [HeaderComponent, RouterLink],
  templateUrl: './all-articles.component.html',
  styleUrl: './all-articles.component.css'
})
export class AllArticlesComponent {


  constructor(private location: Location) { }

  backClicked() {
    this.location.back();
  }
}
