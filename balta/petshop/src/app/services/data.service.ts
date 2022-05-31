import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "../models/product.model";
import { Security } from "../utils/security.util";


@Injectable({
   providedIn: 'root'
})

export class DataService {
   public baseUrl: string = 'http://localhost:3000/v1';
   constructor(private http: HttpClient) { }

   public composeHeader() {
      const token: any = Security.getToken();

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

   resetPassword(data: any) {
      return this.http.post(`${this.baseUrl}/accounts/reset-password`, data)
   }

   getProfile() {
      return this.http.get(`${this.baseUrl}/accounts`, { headers: this.composeHeader() });
   }

   updateProfile(data: any) {
      return this.http.put(`${this.baseUrl}/accounts`, data, { headers: this.composeHeader() });
   }
}