import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
import { User } from 'src/app/models/user.model';
import { CartUtil } from 'src/app/utils/cart.util';
import { Security } from 'src/app/utils/security.util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  public user?: User;
  public cart?: Cart;

  constructor(private router: Router) { }

  ngOnInit() {
    this.user = Security.getUser();
  }
  
  totalItems(){
    this.cart = CartUtil.get();
    let total = 0;
    this.cart?.items.forEach((cartItem) => {
      total += cartItem.quantity
    });
    return total;

  }

  logout(){
    Security.clear();
    this.router.navigate(['/login'])
  }

}
