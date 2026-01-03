import { Injectable, signal, WritableSignal, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of } from 'rxjs';

export type ProjectStatus = 'চলমান' | 'সম্পন্ন' | 'বাতিল' | 'হোল্ড';

export interface Project {
  id: number;
  name: string;
  status: ProjectStatus;
  progress: number;
  team: string[];
  dueDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http: HttpClient;
  private apiUrl = 'http://localhost:8080';

  private projectsSignal: WritableSignal<Project[]> = signal([
    { id: 1, name: 'ইআরপি সিস্টেম ডেভেলপমেন্ট', status: 'চলমান', progress: 75, team: ['https://picsum.photos/id/1005/32', 'https://picsum.photos/id/1011/32', 'https://picsum.photos/id/1012/32'], dueDate: 'আগস্ট ৩১, ২০২৪' },
    { id: 2, name: 'মোবাইল অ্যাপ ডিজাইন', status: 'সম্পন্ন', progress: 100, team: ['https://picsum.photos/id/1027/32', 'https://picsum.photos/id/1040/32'], dueDate: 'জুন ১৫, ২০২৪' },
    { id: 3, name: 'মার্কেটিং ওয়েবসাইট রিব্র্যান্ডিং', status: 'চলমান', progress: 40, team: ['https://picsum.photos/id/1011/32', 'https://picsum.photos/id/1040/32'], dueDate: 'সেপ্টেম্বর ৩০, ২০২৪' },
    { id: 4, name: 'API ইন্টিগ্রেশন', status: 'হোল্ড', progress: 90, team: ['https://picsum.photos/id/1012/32'], dueDate: 'জুলাই ২০, ২০২৪' },
    { id: 5, name: 'সার্ভার মাইগ্রেশন', status: 'বাতিল', progress: 20, team: ['https://picsum.photos/id/1005/32'], dueDate: 'মে ৩০, ২০২৪' },
  ]);
  
  constructor() {
    this.http = inject(HttpClient);
    this.loadProjects();
  }
  
  private getAuthHeaders(): HttpHeaders {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });
  }

  getProjects() {
    return this.projectsSignal.asReadonly();
  }

  private loadProjects(): void {
    const headers = this.getAuthHeaders();
    this.http.get<Project[]>(`${this.apiUrl}/api/projects`, { headers }).pipe(
        catchError(error => {
            console.error('Error fetching projects, using mock data.', error);
            return of(null);
        })
    ).subscribe(projects => {
        if(projects) {
            this.projectsSignal.set(projects);
        }
    });
  }
}
