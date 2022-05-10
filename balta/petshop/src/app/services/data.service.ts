import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../models/product.model";

@Injectable({
   providedIn: 'root'
})

export class DataService {
   public baseUrl: string = 'http://localhost:3000/v1';
   constructor(private http: HttpClient) { }

   getProducts() {
      return this.http.get<Product[]>(`${this.baseUrl}/products`)
   }

   authenticate(data: any) {
      return this.http.post(`${this.baseUrl}/accounts/authenticate`, data)
   }
}