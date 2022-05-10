import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent implements OnInit {
  //receber um objeto de outro componente
  @Input() product!: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
