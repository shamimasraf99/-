import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { UserService, User, NewUser } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-management',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private users = this.userService.getUsers();

  isAdmin = computed(() => this.authService.currentUser()?.role === 'অ্যাডমিন');

  // Filter signals
  roleFilter = signal<'all' | User['role']>('all');
  statusFilter = signal<'all' | User['status']>('all');

  // Computed signal for filtered users
  filteredUsers = computed(() => {
    const allUsers = this.users();
    const role = this.roleFilter();
    const status = this.statusFilter();

    if (role === 'all' && status === 'all') {
      return allUsers;
    }

    return allUsers.filter(user => {
      const roleMatch = role === 'all' || user.role === role;
      const statusMatch = status === 'all' || user.status === status;
      return roleMatch && statusMatch;
    });
  });

  // Modal states
  isEditModalOpen = signal(false);
  editableUser = signal<Partial<User>>({}); 
  isAddModalOpen = signal(false);
  newUser = signal<NewUser>({
    name: '',
    email: '',
    password: '',
    role: 'কর্মী',
    status: 'সক্রিয়'
  });

  // Data for dropdowns
  roles: User['role'][] = ['অ্যাডমিন', 'ম্যানেজার', 'কর্মী'];
  statuses: User['status'][] = ['সক্রিয়', 'নিষ্ক্রিয়'];

  // Edit Modal functions
  openEditModal(user: User): void {
    this.editableUser.set({ ...user }); // Create a copy for editing
    this.isEditModalOpen.set(true);
  }

  closeEditModal(): void {
    this.isEditModalOpen.set(false);
    this.editableUser.set({});
  }

  saveUserChanges(): void {
    const userToUpdate = this.editableUser() as User;
    if (!userToUpdate.id) return;

    this.userService.updateUser(userToUpdate).subscribe({
      next: () => {
        this.closeEditModal();
      },
      error: (err) => {
        console.error("Failed to update user", err);
      }
    });
  }

  updateUserRole(role: User['role']): void {
    this.editableUser.update(user => ({ ...user, role }));
  }

  updateUserStatus(status: User['status']): void {
    this.editableUser.update(user => ({ ...user, status }));
  }

  // Add Modal functions
  openAddModal(): void {
    this.newUser.set({
      name: '',
      email: '',
      password: '',
      role: 'কর্মী',
      status: 'সক্রিয়'
    });
    this.isAddModalOpen.set(true);
  }

  closeAddModal(): void {
    this.isAddModalOpen.set(false);
  }

  saveNewUser(): void {
    const newUser = this.newUser();
    if (!newUser.name || !newUser.email || !newUser.password) {
      return;
    }
    this.userService.addUser(newUser).subscribe({
      next: () => {
        this.closeAddModal();
      },
      error: (err) => {
        console.error("Failed to add user", err);
      }
    });
  }

  updateNewUserName(name: string): void {
    this.newUser.update(user => ({ ...user, name }));
  }
  updateNewUserEmail(email: string): void {
    this.newUser.update(user => ({ ...user, email }));
  }
  updateNewUserPassword(password: string): void {
    this.newUser.update(user => ({ ...user, password }));
  }
  updateNewUserRole(role: User['role']): void {
    this.newUser.update(user => ({ ...user, role }));
  }
  updateNewUserStatus(status: User['status']): void {
    this.newUser.update(user => ({ ...user, status }));
  }
  
  getRoleClass(role: 'অ্যাডমিন' | 'কর্মী' | 'ম্যানেজার'): string {
    switch (role) {
      case 'অ্যাডমিন': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'ম্যানেজার': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'কর্মী': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  }

  getStatusClass(status: 'সক্রিয়' | 'নিষ্ক্রিয়'): string {
    return status === 'সক্রিয়'
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
}
