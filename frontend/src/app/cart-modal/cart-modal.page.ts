import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from 'src/app/servicios/productos.service';
import { ModalController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  
  cart: Product[] =[];


  constructor(public productService: ProductService, private modalCtrl: ModalController,public navCtrl: NavController) { }

  getProductsCompra(){
    this.productService.getProductsCompra()
    .subscribe((product: any) => {
      
     this.cart = product;
     console.log(product);
     console.log("holiii");
     
    });
  }

  ngOnInit() {
    this.cart = this.productService.getCart();
  }

  getTotal(){
    return this.cart.reduce((i, j) => i + j.price * j.amonut, 0);
  }
  close(){
    this.modalCtrl.dismiss();
  }


}
