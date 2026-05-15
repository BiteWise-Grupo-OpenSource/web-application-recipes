import { Injectable } from '@angular/core';
import { computed, Signal, signal } from '@angular/core';

import { Category } from '../domain/model/category.entity';
import { Type } from '../domain/model/type.entity';
import { Nutrient } from '../domain/model/nutrient.entity';
import { Recipe } from '../domain/model/recipe.entity';
import { CatalogApi } from '../infrastructure/catalog-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogStore {
  private readonly categoriesSignal = signal<Category[]>([]);
  private readonly typesSignal = signal<Type[]>([]);
  private readonly nutrientsSignal = signal<Nutrient[]>([]);
  private readonly recipesSignal = signal<Recipe[]>([]);

  readonly categories = this.categoriesSignal.asReadonly();
  readonly types = this.typesSignal.asReadonly();
  readonly nutrients = this.nutrientsSignal.asReadonly();
  readonly recipes = this.recipesSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly categoryCount = computed(() => this.categories().length);
  readonly typeCount = computed(() => this.types().length);
  readonly nutrientCount = computed(() => this.nutrients().length);
  readonly recipeCount = computed(() => this.recipes().length);

  constructor(private catalogApi: CatalogApi) {
    this.loadCategories();
    this.loadTypes();
    this.loadNutrients();
    this.loadRecipes();
  }

  /**
   * Retrieves a category by its ID as a signal.
   * @param id - The ID of the category.
   * @returns A Signal containing the Category object or undefined if not found.
   */
  getCategoryById(id: number | null | undefined): Signal<Category | undefined> {
    return computed(() => (id ? this.categories().find((c) => c.id === id) : undefined));
  }

  getNutrientById(id: number | null | undefined): Signal<Nutrient | undefined> {
    return computed(() => (id ? this.nutrients().find((c) => c.id === id) : undefined));
  }

  getTypeById(id: number | null | undefined): Signal<Type | undefined> {
    return computed(() => (id ? this.types().find((c) => c.id === id) : undefined));
  }

  getRecipeById(id: number | null | undefined): Signal<Recipe | undefined> {
    return computed(() => (id ? this.recipes().find((c) => c.id === id) : undefined));
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
          this.typesSignal.update((types) => types.map((c) => (c.id === type.id ? type : c)));
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

  addNutrient(nutrient: Nutrient): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .createNutrient(nutrient)
      .pipe(retry(2))
      .subscribe({
        next: (createdNutrient) => {
          //this.assignCategoryToNutrient(createdNutrient);
          this.nutrientsSignal.update((nutrients) => [...nutrients, createdNutrient]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create nutrient'));
          this.loadingSignal.set(false);
        },
      });
  }

  addRecipe(recipe: Recipe): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .createRecipe(recipe)
      .pipe(retry(2))
      .subscribe({
        next: (createdRecipe) => {
          this.recipesSignal.update((recipes) => [...recipes, createdRecipe]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create recipe'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Updates an existing nutrient.
   * @param updatedNutrient - The nutrient to update.
   */
  updateNutrient(updatedNutrient: Nutrient): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .updateNutrient(updatedNutrient)
      .pipe(retry(2))
      .subscribe({
        next: (nutrient) => {
          //this.assignCategoryToNutrient(nutrient);
          this.nutrientsSignal.update((nutrients) =>
            nutrients.map((c) => (c.id === nutrient.id ? nutrient : c)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update nutrient'));
          this.loadingSignal.set(false);
        },
      });
  }

  updateRecipe(updatedRecipe: Recipe): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .updateRecipe(updatedRecipe)
      .pipe(retry(2))
      .subscribe({
        next: (recipe) => {
          this.recipesSignal.update((recipes) => recipes.map((c) => (c.id === recipe.id ? recipe : c)));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update recipe'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Deletes a nutrient by ID.
   * @param id - The ID of the nutrient to delete.
   */
  deleteNutrient(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .deleteNutrient(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.nutrientsSignal.update((nutrients) => nutrients.filter((c) => c.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete nutrient'));
          this.loadingSignal.set(false);
        },
      });
  }

  private loadNutrients(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .getNutrients()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (nutrients) => {
          console.log(nutrients);
          this.nutrientsSignal.set(nutrients);
          this.loadingSignal.set(false);
          //this.assignCategoriesToNutrients();
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load nutrients'));
          this.loadingSignal.set(false);
        },
      });
  }

  deleteRecipe(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .deleteRecipe(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.recipesSignal.update((recipes) => recipes.filter((c) => c.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete recipe'));
          this.loadingSignal.set(false);
        },
      });
  }

  private loadRecipes(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .getRecipes()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (recipes) => {
          console.log(recipes);
          this.recipesSignal.set(recipes);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load recipes'));
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
