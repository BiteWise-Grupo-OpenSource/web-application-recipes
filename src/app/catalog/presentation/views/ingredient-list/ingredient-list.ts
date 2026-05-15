import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CatalogStore } from '../../../application/catalog-store';
import { MatError } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-ingredient-list',
  imports: [MatTableModule, MatButtonModule, MatError, MatProgressSpinner],
  templateUrl: './ingredient-list.html',
  styleUrl: './ingredient-list.css',
})
export class IngredientList {
  readonly store = inject(CatalogStore);
  protected router = inject(Router);

  displayedColumns: string[] = ['id', 'name', 'category', 'nutrient', 'actions'];

  editIngredient(id: number) {
    this.router.navigate(['catalog/ingredients/edit', id]).then();
  }

  deleteIngredient(id: number) {
    this.store.deleteIngredient(id);
  }
}
