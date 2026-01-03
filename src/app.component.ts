import { ChangeDetectionStrategy, Component, effect, signal, WritableSignal, Renderer2, inject } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    @if (authService.isAuthenticated()) {
      <app-dashboard [theme]="theme()" (themeChange)="toggleTheme()"></app-dashboard>
    } @else {
      <app-login></app-login>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DashboardComponent, LoginComponent],
})
export class AppComponent {
  authService = inject(AuthService);
  theme: WritableSignal<'light' | 'dark'> = signal('light');

  constructor(private renderer: Renderer2) {
    this.initializeTheme();
    effect(() => {
      const currentTheme = this.theme();
      if (currentTheme === 'dark') {
        this.renderer.addClass(document.documentElement, 'dark');
      } else {
        this.renderer.removeClass(document.documentElement, 'dark');
      }
      localStorage.setItem('theme', currentTheme);
    });
  }

  initializeTheme() {
    if (typeof window !== 'undefined') {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
            this.theme.set('dark');
        } else {
            this.theme.set(storedTheme as 'light' | 'dark' || 'light');
        }
    }
  }

  toggleTheme(): void {
    this.theme.update(current => (current === 'light' ? 'dark' : 'light'));
  }
}
