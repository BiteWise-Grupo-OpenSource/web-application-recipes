import { Routes } from '@angular/router';

const typeList = () => import('./type-list/type-list').then((m) => m.TypeList);
const typeForm = () => import('./type-form/type-form').then((m) => m.TypeForm);
const categoryList = () => import('./category-list/category-list').then((m) => m.CategoryList);
const categoryForm = () => import('./category-form/category-form').then((m) => m.CategoryForm);

export const catalogRoutes: Routes = [
  { path: 'categories', loadComponent: categoryList },
  { path: 'categories/new', loadComponent: categoryForm },
  { path: 'categories/edit/:id', loadComponent: categoryForm },

  { path: 'types', loadComponent: typeList },
  { path: 'types/new', loadComponent: typeForm },
  { path: 'types/edit/:id', loadComponent: typeForm },
];
