import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CatalogStore } from '../../../application/catalog-store';
import { MatError } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-recipe-list',
  imports: [MatTableModule, MatButtonModule, MatError, MatProgressSpinner],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  readonly store = inject(CatalogStore);
  protected router = inject(Router);

  displayedColumns: string[] = ['id', 'title', 'description', 'recipeTypeId', 'totalNutrientsId', 'actions'];

  editRecipe(id: number) {
    this.router.navigate(['catalog/recipes/edit', id]).then();
  }

  deleteRecipe(id: number) {
    this.store.deleteRecipe(id);
  }
}
