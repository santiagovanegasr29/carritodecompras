import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs'
export interface Product {
  id: number;
  name: string;
  price: number;
  amonut: number;
  imageURL: any;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  data: Product[] = [
    { id: 1, name: 'arroz', price: 3500, amonut: 1, imageURL: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2018/12/cuanto-arroz-necesito-cocinar-para-100-personas.jpg' },
    { id: 2, name: 'lentejas', price: 1500, amonut: 1, imageURL: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2018/11/comer-lentejas-todos-los-dias.jpg' },
    { id: 3, name: 'frijoles', price: 4500, amonut: 1, imageURL: 'https://dam.cocinafacil.com.mx/wp-content/uploads/2019/05/frijol-cover.jpg' },
    { id: 4, name: 'pasta', price: 2500, amonut: 1, imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1luS0F25LM9SsW09kZnvranVOJ-lMQUxawQ&usqp=CAU' },
    { id: 5, name: 'papas', price: 500, amonut: 1, imageURL: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2019/04/como-saber-que-una-papa-esta-podrida.jpg' }
  ];

  private cart = [];
  private cartItemsCount = new BehaviorSubject(0);


  constructor(public http: HttpClient) { }

  getProductsCompra(){
    const path = 'http://localhost:3002/get';
    return this.http.get<Product>(path);
  }

  getProducts() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }
  getCartItemCount() {
    return this.cartItemsCount;
  }
  addProduct(product) {
    let added = false;
    for (const p of this.cart) {
      if (p.id === product.id) {
       p.amonut += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
    }
    this.cartItemsCount.next(this.cartItemsCount.value + 1);
  }
  decreaseProduct(product) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amonut -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }


    }
    this.cartItemsCount.next(this.cartItemsCount.value - 1);

  }
  removeProduct(product) {
    for (let [i, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemsCount.next(this.cartItemsCount.value - p.amonut);
        this.cart.splice(i, 1);

      }

    }

  }


}
