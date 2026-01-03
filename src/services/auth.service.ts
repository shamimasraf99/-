import { Injectable, signal, WritableSignal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, of, Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'অ্যাডমিন' | 'কর্মী' | 'ম্যানেজার';
  avatarUrl: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient;
  private apiUrl = 'http://localhost:8080';

  isAuthenticated: WritableSignal<boolean> = signal(false);
  currentUser: WritableSignal<User | null> = signal(null);

  constructor() {
    // Fix: Inject HttpClient within the constructor to ensure correct injection context.
    this.http = inject(HttpClient);
    // Check for persisted login state
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token');
        if (token) {
            this.isAuthenticated.set(true);
            const storedUser = localStorage.getItem('current-user');
            if (storedUser) {
                this.currentUser.set(JSON.parse(storedUser));
            }
        }
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/auth/login`, { email, password }).pipe(
      // FIX: Explicitly type the response to LoginResponse to fix a type inference issue.
      tap((response: LoginResponse) => {
        this.handleAuthentication(response.token, response.user);
      })
    );
  }

  logout(): void {
    // Optional: Inform backend about logout
    this.http.post(`${this.apiUrl}/api/auth/logout`, {}).subscribe();
    this.clearAuthentication();
  }

  private handleAuthentication(token: string, user: User): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('current-user', JSON.stringify(user));
    this.isAuthenticated.set(true);
    this.currentUser.set(user);
  }

  private clearAuthentication(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current-user');
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
  }
}
