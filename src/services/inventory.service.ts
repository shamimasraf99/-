import { Injectable, signal, WritableSignal, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of } from 'rxjs';


export interface InventoryItem {
  id: number;
  productName: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private http = inject(HttpClient);

  private inventoryItemsSignal: WritableSignal<InventoryItem[]> = signal([
    { id: 1, productName: 'ল্যাপটপ ব্যাগ', sku: 'LP-BG-001', category: 'এক্সেসরিজ', stock: 120, price: 1500 },
    { id: 2, productName: 'ওয়্যারলেস মাউস', sku: 'MS-WL-005', category: 'কম্পিউটার পার্টস', stock: 85, price: 800 },
    { id: 3, productName: 'এইচডি মনিটর', sku: 'MN-HD-021', category: 'ইলেকট্রনিক্স', stock: 45, price: 12500 },
    { id: 4, productName: 'কফি মগ', sku: 'MG-CF-010', category: 'অফিস সাপ্লাই', stock: 250, price: 350 },
    { id: 5, productName: 'টি-শার্ট', sku: 'TS-MD-032', category: 'পোশাক', stock: 8, price: 500 },
    { id: 6, productName: 'নোটবুক', sku: 'NB-LG-002', category: 'স্টেশনারি', stock: 0, price: 120 },
  ]);

  constructor() {
    this.loadInventoryItems();
  }
  
  private getAuthHeaders(): HttpHeaders {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });
  }

  getInventoryItems() {
    return this.inventoryItemsSignal.asReadonly();
  }

  private loadInventoryItems(): void {
    const headers = this.getAuthHeaders();
    this.http.get<InventoryItem[]>(`/api/inventory`, { headers }).pipe(
        catchError(error => {
            console.error('Error fetching inventory items, using mock data.', error);
            return of(null);
        })
    ).subscribe(items => {
        if (items) {
            this.inventoryItemsSignal.set(items);
        }
    });
  }
}
