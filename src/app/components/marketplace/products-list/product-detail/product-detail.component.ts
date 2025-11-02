import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../header/header.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  constructor(private location: Location) { }

  backClicked() {
    this.location.back();
  }

}
