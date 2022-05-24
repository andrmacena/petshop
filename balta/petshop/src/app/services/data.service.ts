import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "../models/product.model";


@Injectable({
   providedIn: 'root'
})

export class DataService {
   public baseUrl: string = 'http://localhost:3000/v1';
   constructor(private http: HttpClient) { }

   public composeHeader() {
      const token: any = localStorage.getItem('petshop.token');

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      return headers;
   }

   getProducts() {
      return this.http.get<Product[]>(`${this.baseUrl}/products`)
   }

   authenticate(data: any) {
      return this.http.post(`${this.baseUrl}/accounts/authenticate`, data);
   }

   refreshToken() {
      return this.http.post(`${this.baseUrl}/accounts/refresh-token`, null, { headers: this.composeHeader() });
   }

   create(data: any) {
      return this.http.post(`${this.baseUrl}/accounts`, data)
   }
}