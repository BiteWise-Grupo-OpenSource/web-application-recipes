import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Type } from '../domain/model/type.entity';
import { Category } from '../domain/model/category.entity';
import { Nutrient } from '../domain/model/nutrient.entity';
import { Recipe } from '../domain/model/recipe.entity';
import { Ingredient } from '../domain/model/ingredient.entity';
import { HttpClient } from '@angular/common/http';
import { TypesApiEndpoint } from './types-api-endpoint';
import { CategoriesApiEndpoint } from './categories-api-endpoint';
import { NutrientsApiEndpoint } from './nutrients-api-endpoint';
import { RecipesApiEndpoint } from './recipes-api-endpoint';
import { IngredientsApiEndpoint } from './ingredients-api-endpoint';
import { IngredientQuantitiesApiEndpoint } from './ingredient-quantities-api-endpoint';
import { IngredientQuantity } from '../domain/model/ingredient-quantity.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogApi extends BaseApi {
  private readonly typesEndpoint: TypesApiEndpoint;
  private readonly categoriesEndpoint: CategoriesApiEndpoint;
  private readonly nutrientsEndpoint: NutrientsApiEndpoint;
  private readonly recipesEndpoint: RecipesApiEndpoint;
  private readonly ingredientsEndpoint: IngredientsApiEndpoint;
  private readonly ingredientQuantitiesEndpoint: IngredientQuantitiesApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.typesEndpoint = new TypesApiEndpoint(http);
    this.categoriesEndpoint = new CategoriesApiEndpoint(http);
    this.nutrientsEndpoint = new NutrientsApiEndpoint(http);
    this.recipesEndpoint = new RecipesApiEndpoint(http);
    this.ingredientsEndpoint = new IngredientsApiEndpoint(http);
    this.ingredientQuantitiesEndpoint = new IngredientQuantitiesApiEndpoint(http);
  }

  /**
   * Retrieves all types from the API.
   * @returns An Observable for an array of Type objects.
   */

  /**
   * Retrieves all types from the API.
   * @returns An Observable for an array of Type objects.
   */

  /**
   * Retrieves a single type by ID.
   * @param id - The ID of the type.
   * @returns An Observable of the Type object.
   */

  /**
   * Creates a new type.
   * @param type - The type to create.
   * @returns An Observable of the created Type object.
   */

  /**
   * Updates an existing type.
   * @param type - The type to update.
   * @returns An Observable of the updated Type object.
   */

  /**
   * Deletes a type by ID.
   * @param id - The ID of the type to delete.
   * @returns An Observable of void.
   */

  /**
   * Retrieves all categories from the API.
   * @returns An Observable for an array of Category objects.
   */
  getCategories(): Observable<Category[]> {
    return this.categoriesEndpoint.getAll();
  }

  /**
   * Retrieves a single category by ID.
   * @param id - The ID of the category.
   * @returns An Observable of the Category object.
   */
  getCategory(id: number): Observable<Category> {
    return this.categoriesEndpoint.getById(id);
  }

  /**
   * Creates a new category.
   * @param category - The category to create.
   * @returns An Observable of the created Category object.
   */
  createCategory(category: Category): Observable<Category> {
    return this.categoriesEndpoint.create(category);
  }

  /**
   * Updates an existing category.
   * @param category - The category to update.
   * @returns An Observable of the updated Category object.
   */
  updateCategory(category: Category): Observable<Category> {
    return this.categoriesEndpoint.update(category, category.id);
  }

  /**
   * Deletes a category by ID.
   * @param id - The ID of the category to delete.
   * @returns An Observable of void.
   */
  deleteCategory(id: number): Observable<void> {
    return this.categoriesEndpoint.delete(id);
  }

  getTypes(): Observable<Type[]> {
    return this.typesEndpoint.getAll();
  }

  /**
   * Retrieves a single type by ID.
   * @param id - The ID of the type.
   * @returns An Observable of the Type object.
   */
  getType(id: number): Observable<Type> {
    return this.typesEndpoint.getById(id);
  }

  /**
   * Creates a new type.
   * @param type - The type to create.
   * @returns An Observable of the created Type object.
   */
  createType(type: Type): Observable<Type> {
    return this.typesEndpoint.create(type);
  }

  /**
   * Updates an existing type.
   * @param type - The type to update.
   * @returns An Observable of the updated Type object.
   */
  updateType(type: Type): Observable<Type> {
    return this.typesEndpoint.update(type, type.id);
  }

  /**
   * Deletes a type by ID.
   * @param id - The ID of the type to delete.
   * @returns An Observable of void.
   */
  deleteType(id: number): Observable<void> {
    return this.typesEndpoint.delete(id);
  }

  getNutrients(): Observable<Nutrient[]> {
    return this.nutrientsEndpoint.getAll();
  }

  /**
   * Retrieves a single nutrient by ID.
   * @param id - The ID of the nutrient.
   * @returns An Observable of the Nutrient object.
   */
  getNutrient(id: number): Observable<Nutrient> {
    return this.nutrientsEndpoint.getById(id);
  }

  /**
   * Creates a new nutrient.
   * @param nutrient - The nutrient to create.
   * @returns An Observable of the created Nutrient object.
   */
  createNutrient(nutrient: Nutrient): Observable<Nutrient> {
    return this.nutrientsEndpoint.create(nutrient);
  }

  /**
   * Updates an existing nutrient.
   * @param nutrient - The nutrient to update.
   * @returns An Observable of the updated Nutrient object.
   */
  updateNutrient(nutrient: Nutrient): Observable<Nutrient> {
    return this.nutrientsEndpoint.update(nutrient, nutrient.id);
  }

  /**
   * Deletes a nutrient by ID.
   * @param id - The ID of the nutrient to delete.
   * @returns An Observable of void.
   */
  deleteNutrient(id: number): Observable<void> {
    return this.nutrientsEndpoint.delete(id);
  }

  /**
   * Recipes endpoints
   */
  getRecipes(): Observable<Recipe[]> {
    return this.recipesEndpoint.getAll();
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.recipesEndpoint.getById(id);
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.recipesEndpoint.create(recipe);
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.recipesEndpoint.update(recipe, recipe.id);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.recipesEndpoint.delete(id);
  }

  /**
   * Ingredients endpoints
   */
  getIngredients(): Observable<Ingredient[]> {
    return this.ingredientsEndpoint.getAll();
  }

  getIngredient(id: number): Observable<Ingredient> {
    return this.ingredientsEndpoint.getById(id);
  }

  createIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.ingredientsEndpoint.create(ingredient);
  }

  updateIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.ingredientsEndpoint.update(ingredient, ingredient.id);
  }

  deleteIngredient(id: number): Observable<void> {
    return this.ingredientsEndpoint.delete(id);
  }

  // IngredientQuantities endpoints
  getIngredientQuantities(): Observable<IngredientQuantity[]> {
    return this.ingredientQuantitiesEndpoint.getAll();
  }

  getIngredientQuantity(id: number): Observable<IngredientQuantity> {
    return this.ingredientQuantitiesEndpoint.getById(id);
  }

  createIngredientQuantity(quantity: IngredientQuantity): Observable<IngredientQuantity> {
    return this.ingredientQuantitiesEndpoint.create(quantity);
  }

  updateIngredientQuantity(quantity: IngredientQuantity): Observable<IngredientQuantity> {
    return this.ingredientQuantitiesEndpoint.update(quantity, quantity.id);
  }

  deleteIngredientQuantity(id: number): Observable<void> {
    return this.ingredientQuantitiesEndpoint.delete(id);
  }
}
