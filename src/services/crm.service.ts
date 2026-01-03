import { Injectable, signal, WritableSignal, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of } from 'rxjs';

export type LeadStatus = 'নতুন লিড' | 'যোগাযোগ হয়েছে' | 'প্রস্তাব পাঠানো হয়েছে' | 'জয়ী';

export interface Lead {
  id: number;
  title: string;
  company: string;
  value: number;
  ownerAvatar: string;
  status: LeadStatus;
}

@Injectable({
  providedIn: 'root'
})
export class CrmService {
  private http: HttpClient;
  private apiUrl = 'http://localhost:8080';

  private allLeadsSignal: WritableSignal<Lead[]> = signal([
    { id: 1, title: 'নতুন ওয়েবসাইট ডিজাইন', company: 'এবিসি কর্পোরেশন', value: 150000, ownerAvatar: 'https://picsum.photos/id/1005/32', status: 'নতুন লিড' },
    { id: 2, title: 'মোবাইল অ্যাপ ডেভেলপমেন্ট', company: 'এক্সওয়াইজেড লিমিটেড', value: 350000, ownerAvatar: 'https://picsum.photos/id/1011/32', status: 'প্রস্তাব পাঠানো হয়েছে' },
    { id: 3, title: 'ডিজিটাল মার্কেটিং ক্যাম্পেইন', company: 'আলফা টেক', value: 80000, ownerAvatar: 'https://picsum.photos/id/1012/32', status: 'যোগাযোগ হয়েছে' },
    { id: 4, title: 'ইআরপি সফটওয়্যার', company: 'বেটা সলিউশনস', value: 500000, ownerAvatar: 'https://picsum.photos/id/1027/32', status: 'জয়ী' },
    { id: 5, title: 'সোশ্যাল মিডিয়া ম্যানেজমেন্ট', company: 'গামা এন্টারপ্রাইজ', value: 50000, ownerAvatar: 'https://picsum.photos/id/1040/32', status: 'যোগাযোগ হয়েছে' },
    { id: 6, title: 'লোগো ও ব্র্যান্ডিং', company: 'ডেল্টা গ্রুপ', value: 75000, ownerAvatar: 'https://picsum.photos/id/1005/32', status: 'নতুন লিড' },
  ]);

  constructor() {
    this.http = inject(HttpClient);
    this.loadLeads();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });
  }

  getLeads() {
    return this.allLeadsSignal.asReadonly();
  }
  
  private loadLeads(): void {
      const headers = this.getAuthHeaders();
      this.http.get<Lead[]>(`${this.apiUrl}/api/leads`, { headers }).pipe(
          catchError(error => {
              console.error('Error fetching leads, using mock data.', error);
              return of(null);
          })
      ).subscribe(leads => {
          if (leads) {
              this.allLeadsSignal.set(leads);
          }
      });
  }
}
