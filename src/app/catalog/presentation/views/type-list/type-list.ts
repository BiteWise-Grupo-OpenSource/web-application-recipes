import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CatalogStore } from '../../../application/catalog-store';
import { MatError } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-type-list',
  imports: [MatTableModule, MatButtonModule, MatError, MatProgressSpinner],
  templateUrl: './type-list.html',
  styleUrl: './type-list.css',
})
export class TypeList {
  readonly store = inject(CatalogStore);
  protected router = inject(Router);

  displayedColumns: string[] = ['id', 'name', 'description','actions'];

  editType(id: number) {
    this.router.navigate(['catalog/types/edit', id]).then();
  }

  deleteType(id: number) {
    this.store.deleteType(id);
  }
}
