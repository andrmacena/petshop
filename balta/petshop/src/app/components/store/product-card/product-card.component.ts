import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cart-item.model';
import { Product } from 'src/app/models/product.model';
import { CartUtil } from 'src/app/utils/cart.util';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent implements OnInit {
  //receber um objeto de outro componente
  @Input() product!: Product;

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addToCart() {
    const cartItem = new CartItem(
      this.product._id,
      this.product.title,
      1,
      this.product.price,
      this.product.image);

    CartUtil.add(cartItem);
    this.toastr.success(`${this.product.title} adicionado ao carrinho`, 'Produto Adicionado');
  }

}
