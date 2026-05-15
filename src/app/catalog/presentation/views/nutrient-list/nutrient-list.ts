import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CatalogStore } from '../../../application/catalog-store';
import { MatError } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-nutrient-list',
  imports: [MatTableModule, MatButtonModule, MatError, MatProgressSpinner],
  templateUrl: './nutrient-list.html',
  styleUrl: './nutrient-list.css',
})
export class NutrientList {
  readonly store = inject(CatalogStore);
  protected router = inject(Router);

  displayedColumns: string[] = ['id', 'calories', 'carbs','proteins', 'fats', 'actions'];

  editNutrient(id: number) {
    this.router.navigate(['catalog/nutrients/edit', id]).then();
  }

  deleteNutrient(id: number) {
    this.store.deleteNutrient(id);
  }
}
