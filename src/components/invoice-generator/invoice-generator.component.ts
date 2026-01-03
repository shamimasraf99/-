import { ChangeDetectionStrategy, Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';
import { CommonModule } from '@angular/common';

export interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-invoice-generator',
  imports: [FormsModule, CommonModule],
  templateUrl: './invoice-generator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceGeneratorComponent {
  private geminiService = inject(GeminiService);

  // Invoice Details
  invoiceNumber = signal(Math.floor(1000 + Math.random() * 9000));
  invoiceDate = signal(new Date().toISOString().split('T')[0]);
  dueDate = signal(new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0]);

  // Client Details
  clientName = signal('উদাহরণ ক্লায়েন্ট লিমিটেড');
  clientAddress = signal('১২৩ উদাহরণ রোড, ঢাকা, বাংলাদেশ');
  clientEmail = signal('client@example.com');

  // Items
  items: WritableSignal<InvoiceItem[]> = signal([
    { id: 1, description: 'ওয়েবসাইট ডিজাইন', quantity: 1, price: 25000 },
    { id: 2, description: 'ডোমেইন ও হোস্টিং (১ বছর)', quantity: 1, price: 5000 },
    { id: 3, description: '', quantity: 1, price: 0 },
    { id: 4, description: '', quantity: 1, price: 0 },
  ]);

  // AI-related state
  generatedSummary = signal<string>('');
  isGenerating = signal<boolean>(false);
  summaryGeneratedOnce = signal<boolean>(false);

  // Computed values
  subtotal = computed(() => this.items().reduce((acc, item) => acc + (item.quantity * item.price), 0));
  taxRate = signal(0.15); // 15% tax
  taxAmount = computed(() => this.subtotal() * this.taxRate());
  total = computed(() => this.subtotal() + this.taxAmount());
  
  private nextItemId = 5;

  addItem(): void {
    this.items.update(currentItems => [
      ...currentItems,
      { id: this.nextItemId++, description: '', quantity: 1, price: 0 }
    ]);
  }

  removeItem(id: number): void {
    this.items.update(currentItems => currentItems.filter(item => item.id !== id));
  }
  
  trackById(index: number, item: InvoiceItem): number {
    return item.id;
  }

  async generateAISummary(): Promise<void> {
    this.isGenerating.set(true);
    this.generatedSummary.set('');
    try {
      const itemDetails = this.items().filter(i => i.description).map(i => ({ description: i.description, total: i.quantity * i.price }));
      const summary = await this.geminiService.generateInvoiceSummary(this.clientName(), itemDetails, this.total().toFixed(2));
      this.generatedSummary.set(summary);
    } catch (error) {
      console.error(error);
      this.generatedSummary.set('সারসংক্ষেপ তৈরিতে একটি ত্রুটি হয়েছে।');
    } finally {
      this.isGenerating.set(false);
      this.summaryGeneratedOnce.set(true);
    }
  }

  printInvoice(): void {
    window.print();
  }
}
