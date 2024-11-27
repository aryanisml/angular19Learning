import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductService {
    constructor(private http : HttpClient) { }

    private baseUrl = `https://dummyjson.com/products`;

    getProduct(skip: number, limit: number) : Observable<any> {
        const url = `${this.baseUrl}?limit=${limit}&skip=${skip}&select=title,price`;
        return this.http.get(url);
    }
    
}