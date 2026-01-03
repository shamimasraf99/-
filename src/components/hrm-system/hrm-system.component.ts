import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-hrm-system',
  imports: [FormsModule],
  templateUrl: './hrm-system.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HrmSystemComponent {
  private geminiService = inject(GeminiService);

  jobTitle = signal('সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার');
  jobDescription = signal('');
  jobRequirement = signal('');

  isGeneratingDesc = signal(false);
  isGeneratingReq = signal(false);

  async generateDescription(): Promise<void> {
    if (!this.jobTitle()) return;
    this.isGeneratingDesc.set(true);
    this.jobDescription.set('');
    try {
      const result = await this.geminiService.generateJobDescription(this.jobTitle());
      this.jobDescription.set(result);
    } finally {
      this.isGeneratingDesc.set(false);
    }
  }

  async generateRequirement(): Promise<void> {
    if (!this.jobTitle()) return;
    this.isGeneratingReq.set(true);
    this.jobRequirement.set('');
    try {
      const result = await this.geminiService.generateJobRequirement(this.jobTitle());
      this.jobRequirement.set(result);
    } finally {
      this.isGeneratingReq.set(false);
    }
  }
}
