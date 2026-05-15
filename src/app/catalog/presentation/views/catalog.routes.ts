import { Routes } from '@angular/router';

const typeList = () => import('./type-list/type-list').then((m) => m.TypeList);
const typeForm = () => import('./type-form/type-form').then((m) => m.TypeForm);
const categoryList = () => import('./category-list/category-list').then((m) => m.CategoryList);
const categoryForm = () => import('./category-form/category-form').then((m) => m.CategoryForm);
const nutrientList = () => import('./nutrient-list/nutrient-list').then((m) => m.NutrientList);
const nutrientForm = () => import('./nutrient-form/nutrient-form').then((m) => m.NutrientForm);
const recipeList = () => import('./recipe-list/recipe-list').then((m) => m.RecipeList);
const recipeForm = () => import('./recipe-form/recipe-form').then((m) => m.RecipeForm);
const ingredientList = () => import('./ingredient-list/ingredient-list').then((m) => m.IngredientList);
const ingredientForm = () => import('./ingredient-form/ingredient-form').then((m) => m.IngredientForm);
const ingredientQuantityList = () => import('./ingredient-quantity-list/ingredient-quantity-list').then((m) => m.IngredientQuantityList);
const ingredientQuantityForm = () => import('./ingredient-quantity-form/ingredient-quantity-form').then((m) => m.IngredientQuantityForm);

export const catalogRoutes: Routes = [
  { path: 'categories', loadComponent: categoryList },
  { path: 'categories/new', loadComponent: categoryForm },
  { path: 'categories/edit/:id', loadComponent: categoryForm },

  { path: 'types', loadComponent: typeList },
  { path: 'types/new', loadComponent: typeForm },
  { path: 'types/edit/:id', loadComponent: typeForm },

  { path: 'nutrients', loadComponent: nutrientList },
  { path: 'nutrients/new', loadComponent: nutrientForm },
  { path: 'nutrients/edit/:id', loadComponent: nutrientForm },

  { path: 'recipes', loadComponent: recipeList },
  { path: 'recipes/new', loadComponent: recipeForm },
  { path: 'recipes/edit/:id', loadComponent: recipeForm },

  { path: 'ingredients', loadComponent: ingredientList },
  { path: 'ingredients/new', loadComponent: ingredientForm },
  { path: 'ingredients/edit/:id', loadComponent: ingredientForm },

  { path: 'ingredient-quantities', loadComponent: ingredientQuantityList },
  { path: 'ingredient-quantities/new', loadComponent: ingredientQuantityForm },
  { path: 'ingredient-quantities/edit/:id', loadComponent: ingredientQuantityForm },

];
