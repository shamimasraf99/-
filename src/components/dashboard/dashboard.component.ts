import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal, WritableSignal } from '@angular/core';
import { HrmSystemComponent } from '../hrm-system/hrm-system.component';
import { InvoiceGeneratorComponent } from '../invoice-generator/invoice-generator.component';
import { MainDashboardComponent } from '../main-dashboard/main-dashboard.component';
import { PosSystemComponent } from '../pos-system/pos-system.component';
import { UserManagementComponent } from '../user-management/user-management.component';
import { CrmSystemComponent } from '../crm-system/crm-system.component';
import { ProjectManagementComponent } from '../project-management/project-management.component';
import { InventoryManagementComponent } from '../inventory-management/inventory-management.component';
import { ReportsPageComponent } from '../reports-page/reports-page.component';
import { SettingsPageComponent } from '../settings-page/settings-page.component';
import { SettingsService } from '../../services/settings.service';
import { AuthService } from '../../services/auth.service';

interface NavItem {
  label: string;
  view?: string;
  icon?: string;
  active?: boolean;
  children?: NavItem[];
  path?: string[];
}

@Component({
  selector: 'app-dashboard',
  imports: [
    HrmSystemComponent, 
    InvoiceGeneratorComponent, 
    MainDashboardComponent, 
    PosSystemComponent,
    UserManagementComponent,
    CrmSystemComponent,
    ProjectManagementComponent,
    InventoryManagementComponent,
    ReportsPageComponent,
    SettingsPageComponent
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  theme = input.required<'light' | 'dark'>();
  themeChange = output();

  private settingsService = inject(SettingsService);
  private authService = inject(AuthService);

  currentUser = this.authService.currentUser;

  sidebarOpen = true;
  activeView = signal('dashboard');
  activePath = signal<string[]>(['ড্যাশবোর্ড']);

  private initialNavItems: NavItem[] = [
    { label: 'ড্যাশবোর্ড', view: 'dashboard', icon: 'M9 17V7l5-5l5 5v10a2 2 0 01-2 2h-1a2 2 0 01-2-2V7' },
    {
      label: 'এইচআরএম সিস্টেম',
      view: 'hrm',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a3.002 3.002 0 01-3.71-3.71A3 3 0 017 10h4a3 3 0 013 3v1.143',
      children: [
        { label: 'কর্মী সেটআপ' },
        { label: 'বেতন সেটআপ' },
        { label: 'ছুটি ব্যবস্থাপনা' },
        { label: 'নিয়োগ সেটআপ', children: [{ label: 'জব', view: 'hrm' }, { label: 'কাস্টম প্রশ্ন' }] },
        { label: 'ইভেন্ট সেটআপ' },
      ],
    },
    {
      label: 'ইউজার ম্যানেজমেন্ট',
      view: 'users',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1-3.72a6.002 6.002 0 00-4 0c-.35.99-.5 2.06-.5 3.12V21h4z',
    },
    {
      label: 'সিআরএম',
      view: 'crm',
      icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2.586a1 1 0 01.707.293l1.414 1.414a1 1 0 01.293.707V8z',
    },
    {
      label: 'প্রজেক্ট ম্যানেজমেন্ট',
      view: 'projects',
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 003.86.517l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 00.547-1.806z M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z',
    },
    {
      label: 'হিসাব',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      children: [
        { label: 'ইনভয়েস', view: 'invoice' },
        { label: 'পেমেন্ট' },
        { label: 'খরচ' },
        { label: 'লাভ-ক্ষতি রিপোর্ট' },
      ],
    },
    { label: 'ইনভেন্টরি', view: 'inventory', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
    { label: 'POS সিস্টেম', view: 'pos', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'রিপোর্ট', view: 'reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { label: 'সেটিংস', view: 'settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0 3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  private moduleLabelToIdMap: { [label: string]: string } = {
    'এইচআরএম সিস্টেম': 'hrm',
    'ইউজার ম্যানেজমেন্ট': 'users',
    'সিআরএম': 'crm',
    'প্রজেক্ট ম্যানেজমেন্ট': 'projects',
    'হিসাব': 'accounting',
    'ইনভেন্টরি': 'inventory',
    'POS সিস্টেম': 'pos',
    'রিপোর্ট': 'reports',
  };

  navItems = computed(() => {
    const user = this.currentUser();
    const modules = this.settingsService.modules();
    const enabledModuleIds = new Set(modules.filter(m => m.enabled).map(m => m.id));
    
    const coreItems = ['ড্যাশবোর্ড', 'সেটিংস'];

    const filteredItems = JSON.parse(JSON.stringify(this.initialNavItems))
      .filter((item: NavItem) => {
          if (item.label === 'ইউজার ম্যানেজমেন্ট' && user?.role !== 'অ্যাডমিন') {
            return false;
          }
        
          if (coreItems.includes(item.label)) return true;
          const moduleId = this.moduleLabelToIdMap[item.label];
          return moduleId ? enabledModuleIds.has(moduleId) : false;
      });

    return this.updateActiveNav(filteredItems, this.activePath());
  });


  constructor() {
    this.setActiveView('dashboard', ['ড্যাশবোর্ড']);
  }

  setActiveView(view: string, path: string[]): void {
    this.activeView.set(view);
    this.activePath.set(path);
  }

  updateActiveNav(items: NavItem[], path: string[]): NavItem[] {
    let currentLevel = items;
    for (const part of path) {
      const activeItem = currentLevel.find(item => item.label === part);
      if (activeItem) {
        activeItem.active = true;
        if (activeItem.children) {
          currentLevel = activeItem.children;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return items;
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  onThemeChange(): void {
    this.themeChange.emit();
  }
  
  logout(): void {
    this.authService.logout();
  }
}
