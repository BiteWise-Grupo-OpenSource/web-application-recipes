import { Injectable } from '@angular/core';
import { computed, Signal, signal } from '@angular/core';

import { Category } from '../domain/model/category.entity';
import { Type } from '../domain/model/type.entity';
import { CatalogApi } from '../infrastructure/catalog-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogStore {
  private readonly categoriesSignal = signal<Category[]>([]);
  private readonly typesSignal = signal<Type[]>([]);

  readonly categories = this.categoriesSignal.asReadonly();
  readonly types = this.typesSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly categoryCount = computed(() => this.categories().length);
  readonly typeCount = computed(() => this.types().length);

  constructor(private catalogApi: CatalogApi) {
    this.loadCategories();
    this.loadTypes();
  }

  /**
   * Retrieves a category by its ID as a signal.
   * @param id - The ID of the category.
   * @returns A Signal containing the Category object or undefined if not found.
   */
  getCategoryById(id: number | null | undefined): Signal<Category | undefined> {
    return computed(() => (id ? this.categories().find((c) => c.id === id) : undefined));
  }

  /**
   * Adds a new category.
   * @param category - The category to add.
   */
  addCategory(category: Category): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .createCategory(category)
      .pipe(retry(2))
      .subscribe({
        next: (createdCategory) => {
          this.categoriesSignal.update((categories) => [...categories, createdCategory]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create category'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Updates an existing category.
   * @param updatedCategory - The category to update.
   */
  updateCategory(updatedCategory: Category): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .updateCategory(updatedCategory)
      .pipe(retry(2))
      .subscribe({
        next: (category) => {
          this.categoriesSignal.update((categories) =>
            categories.map((c) => (c.id === category.id ? category : c)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update category'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Deletes a category by ID.
   * @param id - The ID of the category to delete.
   */
  deleteCategory(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .deleteCategory(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.categoriesSignal.update((categories) => categories.filter((c) => c.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete category'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Loads all types from the API.
   */

  /**
   * Loads all categories from the API.
   */
  private loadCategories(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .getCategories()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (categories) => {
          this.categoriesSignal.set(categories);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load categories'));
          this.loadingSignal.set(false);
        },
      });
  }



  addType(type: Type): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .createType(type)
      .pipe(retry(2))
      .subscribe({
        next: (createdType) => {
          //this.assignCategoryToType(createdType);
          this.typesSignal.update((types) => [...types, createdType]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create type'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Updates an existing type.
   * @param updatedType - The type to update.
   */
  updateType(updatedType: Type): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .updateType(updatedType)
      .pipe(retry(2))
      .subscribe({
        next: (type) => {
          //this.assignCategoryToType(type);
          this.typesSignal.update((types) =>
            types.map((c) => (c.id === type.id ? type : c)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update type'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Deletes a type by ID.
   * @param id - The ID of the type to delete.
   */
  deleteType(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .deleteType(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.typesSignal.update((types) => types.filter((c) => c.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete type'));
          this.loadingSignal.set(false);
        },
      });
  }
  private loadTypes(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .getTypes()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (types) => {
          console.log(types);
          this.typesSignal.set(types);
          this.loadingSignal.set(false);
          //this.assignCategoriesToTypes();
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load types'));
          this.loadingSignal.set(false);
        },
      });
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found')
        ? `${fallback}: Not found`
        : error.message;
    }
    return fallback;
  }
}
