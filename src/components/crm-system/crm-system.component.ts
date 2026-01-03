import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmService, Lead, LeadStatus } from '../../services/crm.service';

interface KanbanColumn {
  title: LeadStatus;
  leads: Lead[];
}

@Component({
  selector: 'app-crm-system',
  templateUrl: './crm-system.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrmSystemComponent {
  private crmService = inject(CrmService);
  private allLeads = this.crmService.getLeads();

  columns = computed<KanbanColumn[]>(() => {
    const statuses: LeadStatus[] = ['নতুন লিড', 'যোগাযোগ হয়েছে', 'প্রস্তাব পাঠানো হয়েছে', 'জয়ী'];
    return statuses.map(status => ({
      title: status,
      leads: this.allLeads().filter(lead => lead.status === status)
    }));
  });

  getColumnHeaderClass(status: LeadStatus): string {
    switch(status) {
        case 'নতুন লিড': return 'border-t-blue-500';
        case 'যোগাযোগ হয়েছে': return 'border-t-orange-500';
        case 'প্রস্তাব পাঠানো হয়েছে': return 'border-t-purple-500';
        case 'জয়ী': return 'border-t-green-500';
    }
  }
}
