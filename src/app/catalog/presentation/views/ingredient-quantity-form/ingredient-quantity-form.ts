import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogStore } from '../../../application/catalog-store';
import { IngredientQuantity } from '../../../domain/model/ingredient-quantity.entity';
import { Ingredient } from '../../../domain/model/ingredient.entity';
import { Recipe } from '../../../domain/model/recipe.entity';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-ingredient-quantity-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './ingredient-quantity-form.html',
  styleUrl: './ingredient-quantity-form.css',
})
export class IngredientQuantityForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private store = inject(CatalogStore);

  form = this.fb.group({
    recipeId: new FormControl<number | null>(null, { nonNullable: true, validators: [Validators.required] }),
    ingredientId: new FormControl<number | null>(null, { nonNullable: true, validators: [Validators.required] }),
    quantity: new FormControl<number | null>(null, { nonNullable: true, validators: [Validators.required] }),
  });

  isEdit = false;
  quantityId: number | null = null;

  constructor() {
    this.route.params.subscribe((params) => {
      this.quantityId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.quantityId;
      if (this.isEdit) {
        const item = this.store.getIngredientQuantityById(this.quantityId)();
        if (item) {
          this.form.patchValue({
            recipeId: item.recipe ? item.recipe.id : item.recipeId,
            ingredientId: item.ingredient ? item.ingredient.id : item.ingredientId,
            quantity: item.quantity,
          });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;

    const selectedRecipe = this.store.getRecipeById(this.form.value.recipeId ?? null)();
    const selectedIngredient = this.store.getIngredientById(this.form.value.ingredientId ?? null)();

    const payload: IngredientQuantity = new IngredientQuantity({
      id: this.quantityId ?? 0,
      recipeId: this.form.value.recipeId ?? 0,
      ingredientId: this.form.value.ingredientId ?? 0,
      quantity: this.form.value.quantity ?? 0,
      recipe: selectedRecipe ? new Recipe({ id: selectedRecipe.id, title: selectedRecipe.title, description: selectedRecipe.description, urlInstructions: selectedRecipe.urlInstructions, recipeTypeId: selectedRecipe.recipeTypeId, totalNutrientsId: selectedRecipe.totalNutrientsId }) : null,
      ingredient: selectedIngredient ? new Ingredient({ id: selectedIngredient.id, name: selectedIngredient.name, nutrientsId: selectedIngredient.nutrientsId, categoryId: selectedIngredient.categoryId }) : null,
    });

    if (this.isEdit) {
      this.store.updateIngredientQuantity(payload);
    } else {
      this.store.addIngredientQuantity(payload);
    }

    this.router.navigate(['catalog/ingredient-quantities']).then();
  }
}
