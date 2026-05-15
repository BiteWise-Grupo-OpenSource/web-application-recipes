import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CatalogStore } from '../../../application/catalog-store';
import { MatError } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-ingredient-quantity-list',
  imports: [MatTableModule, MatButtonModule, MatError, MatProgressSpinner],
  templateUrl: './ingredient-quantity-list.html',
  styleUrl: './ingredient-quantity-list.css',
})
export class IngredientQuantityList {
  readonly store = inject(CatalogStore);
  protected router = inject(Router);

  displayedColumns: string[] = ['id', 'recipe', 'ingredient', 'quantity', 'actions'];

  editIngredientQuantity(id: number) {
    this.router.navigate(['catalog/ingredient-quantities/edit', id]).then();
  }

  deleteIngredientQuantity(id: number) {
    this.store.deleteIngredientQuantity(id);
  }
}
