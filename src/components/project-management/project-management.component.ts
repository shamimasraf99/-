import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService, Project, ProjectStatus } from '../../services/project.service';

@Component({
  selector: 'app-project-management',
  imports: [CommonModule],
  templateUrl: './project-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectManagementComponent {
  private projectService = inject(ProjectService);
  projects = this.projectService.getProjects();

  getStatusClass(status: ProjectStatus): string {
    switch (status) {
      case 'চলমান': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'সম্পন্ন': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'বাতিল': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'হোল্ড': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    }
  }

    getProgressClass(progress: number): string {
        if (progress < 50) return 'bg-orange-500';
        if (progress < 100) return 'bg-blue-500';
        return 'bg-green-500';
    }
}
