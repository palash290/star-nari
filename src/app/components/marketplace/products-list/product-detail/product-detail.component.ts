import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../header/header.component';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  constructor(private location: Location) { }

    ngAfterViewInit(): void {
    $('.ct_product_gallary_slider').owlCarousel({
       loop: true,
        center: true,
        margin: 30,
        nav: true,
        dots: false,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 3
          },
          1000: {
            items: 3
          }
        }
    });
  }

  backClicked() {
    this.location.back();
  }

}
