import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../header/header.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-store-detail',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './store-detail.component.html',
  styleUrl: './store-detail.component.css'
})
export class StoreDetailComponent {


  constructor(private location: Location) { }

  backClicked() {
    this.location.back();
  }


}
