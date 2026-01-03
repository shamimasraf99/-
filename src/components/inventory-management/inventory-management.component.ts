import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-management',
  imports: [CommonModule],
  templateUrl: './inventory-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryManagementComponent {
  private inventoryService = inject(InventoryService);
  inventoryItems = this.inventoryService.getInventoryItems();

  getStockStatus(stock: number): { text: string; className: string } {
    if (stock > 50) {
      return { text: 'স্টকে আছে', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' };
    } else if (stock > 0 && stock <= 10) {
      return { text: 'স্টক কম', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' };
    } else if (stock > 0) {
       return { text: 'স্টকে আছে', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' };
    } else {
      return { text: 'স্টক আউট', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' };
    }
  }
}
