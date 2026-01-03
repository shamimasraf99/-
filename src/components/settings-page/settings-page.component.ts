import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings-page',
  imports: [FormsModule],
  templateUrl: './settings-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {
  private settingsService = inject(SettingsService);
  
  modules = this.settingsService.modules;

  companyName = signal('রাজদিয়া ইনফোটেক');
  companyEmail = signal('contact@rajdia.com');
  emailNotifications = signal(true);
  smsNotifications = signal(false);
  stripeEnabled = signal(true);
  paypalEnabled = signal(false);

  onModuleToggle(moduleId: string): void {
    this.settingsService.toggleModule(moduleId);
  }
}
