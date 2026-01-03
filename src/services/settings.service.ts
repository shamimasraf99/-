import { Injectable, signal, WritableSignal } from '@angular/core';

export interface Module {
  id: string;
  label: string;
  enabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  modules: WritableSignal<Module[]> = signal([
    { id: 'hrm', label: 'এইচআরএম সিস্টেম', enabled: true },
    { id: 'users', label: 'ইউজার ম্যানেজমেন্ট', enabled: true },
    { id: 'crm', label: 'সিআরএম', enabled: true },
    { id: 'projects', label: 'প্রজেক্ট ম্যানেজমেন্ট', enabled: true },
    { id: 'accounting', label: 'হিসাব', enabled: true },
    { id: 'inventory', label: 'ইনভেন্টরি', enabled: true },
    { id: 'pos', label: 'POS সিস্টেম', enabled: true },
    { id: 'reports', label: 'রিপোর্ট', enabled: true },
  ]);

  toggleModule(moduleId: string): void {
    this.modules.update(currentModules => 
      currentModules.map(m => 
        m.id === moduleId ? { ...m, enabled: !m.enabled } : m
      )
    );
  }
}
