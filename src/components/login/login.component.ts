import { ChangeDetectionStrategy, Component, output, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private authService = inject(AuthService);
  
  email = signal('admin@demo.com');
  password = signal('12345678');
  errorMessage = signal('');
  isLoading = signal(false);

  onLogin(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    
    this.authService.login(this.email(), this.password()).pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: () => {
        // Parent component will handle successful login via the isAuthenticated signal
      },
      error: (err) => {
        if (err.status === 401) {
           this.errorMessage.set('ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।');
        } else {
           this.errorMessage.set('একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।');
        }
      }
    });
  }
}
