import { BaseEntity } from '../../../shared/infrastructure/base-entity';
import { Recipe } from './recipe.entity';
import { Ingredient } from './ingredient.entity';

export class IngredientQuantity implements BaseEntity {
  private _id: number;
  private _recipeId: number;
  private _ingredientId: number;
  private _quantity: number;

  private _recipe: Recipe | null;
  private _ingredient: Ingredient | null;

  constructor(payload: {
    id: number;
    recipeId: number;
    ingredientId: number;
    quantity: number;
    recipe?: Recipe | null;
    ingredient?: Ingredient | null;
  }) {
    this._id = payload.id;
    this._recipeId = payload.recipeId;
    this._ingredientId = payload.ingredientId;
    this._quantity = payload.quantity;
    this._recipe = payload.recipe ?? null;
    this._ingredient = payload.ingredient ?? null;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get recipeId(): number {
    return this._recipeId;
  }
  set recipeId(value: number) {
    this._recipeId = value;
  }

  get ingredientId(): number {
    return this._ingredientId;
  }
  set ingredientId(value: number) {
    this._ingredientId = value;
  }

  get quantity(): number {
    return this._quantity;
  }
  set quantity(value: number) {
    this._quantity = value;
  }

  get recipe(): Recipe | null {
    return this._recipe;
  }
  set recipe(value: Recipe | null) {
    this._recipe = value;
  }

  get ingredient(): Ingredient | null {
    return this._ingredient;
  }
  set ingredient(value: Ingredient | null) {
    this._ingredient = value;
  }
}
