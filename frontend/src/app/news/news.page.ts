import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from './../servicios/productos.service';
import { BehaviorSubject } from 'rxjs';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;
  @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;

  constructor(private productService: ProductService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.cart = this.productService.getCart();
    this.cartItemCount = this.productService.getCartItemCount();
  }
  
  addToCart(product) {
    this.productService.addProduct(product);
  }
  removeCartItem(product){
    this.productService.decreaseProduct(product);
  }
  async openCart(product) {
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'

    });
    modal.present();
  }
}