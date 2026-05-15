import { Injectable } from '@angular/core';
import { computed, Signal, signal } from '@angular/core';

import { Category } from '../domain/model/category.entity';
import { Type } from '../domain/model/type.entity';
import { Nutrient } from '../domain/model/nutrient.entity';
import { Recipe } from '../domain/model/recipe.entity';
import { Ingredient } from '../domain/model/ingredient.entity';
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
  private readonly ingredientsSignal = signal<Ingredient[]>([]);
  private readonly ingredientQuantitiesSignal = signal<any[]>([]);

  readonly categories = this.categoriesSignal.asReadonly();
  readonly types = this.typesSignal.asReadonly();
  readonly nutrients = this.nutrientsSignal.asReadonly();
  readonly recipes = this.recipesSignal.asReadonly();
  readonly ingredients = this.ingredientsSignal.asReadonly();
  readonly ingredientQuantities = this.ingredientQuantitiesSignal.asReadonly();

  
  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly categoryCount = computed(() => this.categories().length);
  readonly typeCount = computed(() => this.types().length);
  readonly nutrientCount = computed(() => this.nutrients().length);
  readonly recipeCount = computed(() => this.recipes().length);
  readonly ingredientCount = computed(() => this.ingredients().length);

  constructor(private catalogApi: CatalogApi) {
    this.loadCategories();
    this.loadTypes();
    this.loadNutrients();
    this.loadRecipes();
    this.loadIngredients();
    this.loadIngredientQuantities();
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

  getIngredientById(id: number | null | undefined): Signal<Ingredient | undefined> {
    return computed(() => (id ? this.ingredients().find((c) => c.id === id) : undefined));
  }

  getIngredientQuantityById(id: number | null | undefined): Signal<any | undefined> {
    return computed(() => (id ? this.ingredientQuantities().find((q) => q.id === id) : undefined));
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
            categories.map((categoryItem) => (categoryItem.id === category.id ? category : categoryItem)),
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
          this.assignCategoriesToIngredients();
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
          this.typesSignal.update((types) => types.map((typeItem) => (typeItem.id === type.id ? type : typeItem)));
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

  private loadIngredients(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .getIngredients()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (ingredients) => {
          this.ingredientsSignal.set(ingredients);
          // try to assign category/nutrient links
          this.assignCategoriesToIngredients();
          this.assignNutrientsToIngredients();
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load ingredients'));
          this.loadingSignal.set(false);
        },
      });
  }

  private loadIngredientQuantities(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .getIngredientQuantities()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (quantities) => {
          this.ingredientQuantitiesSignal.set(quantities);
          // try to assign links to ingredient and recipe
          this.assignIngredientsToQuantities();
          this.assignRecipesToQuantities();
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load ingredient quantities'));
          this.loadingSignal.set(false);
        },
      });
  }

  private assignCategoriesToIngredients(): void {
    const categories = this.categories();
    if (!categories || categories.length === 0) return;
    this.ingredientsSignal.update((items) =>
      items.map((it) => {
        if (!it.category) {
          const c = categories.find((cc) => cc.id === it.categoryId) ?? null;
          it.category = c;
        }
        return it;
      }),
    );
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

  addIngredient(ingredient: Ingredient): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .createIngredient(ingredient)
      .pipe(retry(2))
      .subscribe({
        next: (created) => {
          this.ingredientsSignal.update((items) => [...items, created]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create ingredient'));
          this.loadingSignal.set(false);
        },
      });
  }

  addIngredientQuantity(quantity: any): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .createIngredientQuantity(quantity)
      .pipe(retry(2))
      .subscribe({
        next: (created) => {
          this.ingredientQuantitiesSignal.update((items) => [...items, created]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create ingredient quantity'));
          this.loadingSignal.set(false);
        },
      });
  }

  updateIngredientQuantity(updatedQuantity: any): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .updateIngredientQuantity(updatedQuantity)
      .pipe(retry(2))
      .subscribe({
        next: (qty) => {
          this.ingredientQuantitiesSignal.update((items) => items.map((item) => (item.id === qty.id ? qty : item)));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update ingredient quantity'));
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
            nutrients.map((nutrientItem) => (nutrientItem.id === nutrient.id ? nutrient : nutrientItem)),
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
          this.recipesSignal.update((recipes) => recipes.map((recipeItem) => (recipeItem.id === recipe.id ? recipe : recipeItem)));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update recipe'));
          this.loadingSignal.set(false);
        },
      });
  }

  updateIngredient(updatedIngredient: Ingredient): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .updateIngredient(updatedIngredient)
      .pipe(retry(2))
      .subscribe({
        next: (ingredient) => {
          this.ingredientsSignal.update((items) => items.map((ingredientItem) => (ingredientItem.id === ingredient.id ? ingredient : ingredientItem)));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update ingredient'));
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
          this.assignNutrientsToIngredients();
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load nutrients'));
          this.loadingSignal.set(false);
        },
      });
  }

  private assignNutrientsToIngredients(): void {
    const nutrients = this.nutrients();
    if (!nutrients || nutrients.length === 0) return;
    this.ingredientsSignal.update((items) =>
      items.map((it) => {
        if (!it.nutrient) {
          const n = nutrients.find((nn) => nn.id === it.nutrientsId) ?? null;
          it.nutrient = n;
        }
        return it;
      }),
    );
  }

  private assignIngredientsToQuantities(): void {
    const ingredients = this.ingredients();
    if (!ingredients || ingredients.length === 0) return;
    this.ingredientQuantitiesSignal.update((items) =>
      items.map((q) => {
        if (!q.ingredient) {
          const found = ingredients.find((ing) => ing.id === q.ingredientId) ?? null;
          q.ingredient = found;
        }
        return q;
      }),
    );
  }

  private assignRecipesToQuantities(): void {
    const recipes = this.recipes();
    if (!recipes || recipes.length === 0) return;
    this.ingredientQuantitiesSignal.update((items) =>
      items.map((q) => {
        if (!q.recipe) {
          const found = recipes.find((r) => r.id === q.recipeId) ?? null;
          q.recipe = found;
        }
        return q;
      }),
    );
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

  deleteIngredient(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .deleteIngredient(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.ingredientsSignal.update((items) => items.filter((c) => c.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete ingredient'));
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
          this.assignTypesToRecipe();
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load recipes'));
          this.loadingSignal.set(false);
        },
      });
  }

  private assignTypeToRecipe(recipe: Recipe): Recipe {
    const typeId = recipe.recipeTypeId ?? 0;
    recipe.type = typeId ? this.getTypeById(typeId)() ?? null: null;
    return recipe;
  }

  private assignTypesToRecipe(): void {
    this.recipesSignal.update(recipes => recipes.map(recipe => this.assignTypeToRecipe(recipe)));
  }


  deleteIngredientQuantity(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.catalogApi
      .deleteIngredientQuantity(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.ingredientQuantitiesSignal.update((items) => items.filter((q) => q.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete ingredient quantity'));
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
