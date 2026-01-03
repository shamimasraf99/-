import { ChangeDetectionStrategy, Component, computed, signal, WritableSignal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

@Component({
  selector: 'app-pos-system',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './pos-system.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PosSystemComponent {
  products: WritableSignal<Product[]> = signal([
    { id: 1, name: 'ফ্রেশ কফি', price: 120, imageUrl: 'https://picsum.photos/id/225/200' },
    { id: 2, name: 'চকলেট কেক', price: 350, imageUrl: 'https://picsum.photos/id/1078/200' },
    { id: 3, name: 'ফ্রুট জুস', price: 150, imageUrl: 'https://picsum.photos/id/102/200' },
    { id: 4, name: 'ভেজিটেবল স্যান্ডউইচ', price: 180, imageUrl: 'https://picsum.photos/id/1060/200' },
    { id: 5, name: 'আইসক্রিম কাপ', price: 90, imageUrl: 'https://picsum.photos/id/244/200' },
    { id: 6, name: 'চিকেন বার্গার', price: 250, imageUrl: 'https://picsum.photos/id/312/200' },
    { id: 7, name: 'মিনারেল ওয়াটার', price: 20, imageUrl: 'https://picsum.photos/id/326/200' },
    { id: 8, name: 'ফ্রুট সালাদ', price: 220, imageUrl: 'https://picsum.photos/id/1080/200' },
  ]);

  cartItems: WritableSignal<CartItem[]> = signal([]);
  paymentSuccess = signal(false);

  subtotal = computed(() => this.cartItems().reduce((acc, item) => acc + item.price * item.quantity, 0));
  taxRate = signal(0.05); // 5% tax
  taxAmount = computed(() => this.subtotal() * this.taxRate());
  total = computed(() => this.subtotal() + this.taxAmount());

  addToCart(product: Product): void {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (existingItem) {
        return items.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
  }

  updateQuantity(item: CartItem, change: number): void {
    this.cartItems.update(items => {
      const updatedItems = items.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + change } : i
      );
      return updatedItems.filter(i => i.quantity > 0);
    });
  }
  
  removeItem(itemId: number): void {
    this.cartItems.update(items => items.filter(item => item.id !== itemId));
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  processPayment(): void {
    if (this.cartItems().length === 0) return;
    
    console.log('পেমেন্ট প্রক্রিয়া করা হচ্ছে...', {
      subtotal: this.subtotal(),
      tax: this.taxAmount(),
      total: this.total(),
      items: this.cartItems(),
    });

    this.paymentSuccess.set(true);
    this.clearCart();
    
    setTimeout(() => {
        this.paymentSuccess.set(false);
    }, 3000);
  }
}
