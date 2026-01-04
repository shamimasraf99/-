import { Injectable, signal, WritableSignal, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of, tap, Observable, throwError } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'অ্যাডমিন' | 'কর্মী' | 'ম্যানেজার';
  status: 'সক্রিয়' | 'নিষ্ক্রিয়';
  avatarUrl: string;
}

export interface NewUser {
  name: string;
  email: string;
  password?: string;
  role: 'অ্যাডমিন' | 'কর্মী' | 'ম্যানেজার';
  status: 'সক্রিয়' | 'নিষ্ক্রিয়';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  // Initial mock data as fallback
  private usersSignal: WritableSignal<User[]> = signal([
    { id: 1, name: 'মোঃ আব্দুল্লাহ', email: 'abdullah@example.com', role: 'অ্যাডমিন', status: 'সক্রিয়', avatarUrl: 'https://picsum.photos/id/1005/200' },
    { id: 2, name: 'ফারিহা আক্তার', email: 'fariha@example.com', role: 'ম্যানেজার', status: 'সক্রিয়', avatarUrl: 'https://picsum.photos/id/1011/200' },
    { id: 3, name: 'জাহিদ হাসান', email: 'jahid@example.com', role: 'কর্মী', status: 'সক্রিয়', avatarUrl: 'https://picsum.photos/id/1012/200' },
    { id: 4, name: 'সাদিয়া সুলতানা', email: 'sadia@example.com', role: 'কর্মী', status: 'নিষ্ক্রিয়', avatarUrl: 'https://picsum.photos/id/1027/200' },
    { id: 5, name: 'রাকিবুল ইসলাম', email: 'rakib@example.com', role: 'কর্মী', status: 'সক্রিয়', avatarUrl: 'https://picsum.photos/id/1040/200' },
  ]);

  constructor() {
    this.loadUsers();
  }
  
  private getAuthHeaders(): HttpHeaders {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });
  }

  getUsers() {
    return this.usersSignal.asReadonly();
  }

  private loadUsers(): void {
    const headers = this.getAuthHeaders();
    this.http.get<User[]>(`/api/users`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching users, using mock data.', error);
        return of(null); // Return null on error
      })
    ).subscribe(users => {
      if (users) {
        this.usersSignal.set(users);
      }
    });
  }
  
  addUser(userData: NewUser): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.post<User>(`/api/users`, userData, { headers }).pipe(
      tap(newUser => {
        this.usersSignal.update(users => [...users, newUser]);
      }),
      catchError(error => {
        console.error('Error adding user', error);
        return throwError(() => error);
      })
    );
  }

  updateUser(userToUpdate: User): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.put<User>(`/api/users/${userToUpdate.id}`, userToUpdate, { headers }).pipe(
        tap(updatedUser => {
            this.usersSignal.update(users => 
                users.map(u => u.id === updatedUser.id ? updatedUser : u)
            );
        }),
        catchError(error => {
            console.error('Error updating user', error);
            return throwError(() => error); 
        })
    );
  }
}
