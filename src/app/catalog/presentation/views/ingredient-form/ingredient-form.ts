import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogStore } from '../../../application/catalog-store';
import { Ingredient } from '../../../domain/model/ingredient.entity';
import { Category } from '../../../domain/model/category.entity';
import { Nutrient } from '../../../domain/model/nutrient.entity';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-ingredient-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './ingredient-form.html',
  styleUrl: './ingredient-form.css',
})
export class IngredientForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(CatalogStore);

  form = this.fb.group({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    categoryId: new FormControl<number | null>(null),
    nutrientsId: new FormControl<number | null>(null),
  });

  isEdit = false;
  ingredientId: number | null = null;

  constructor() {
    this.route.params.subscribe((params) => {
      this.ingredientId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.ingredientId;
      if (this.isEdit) {
        const item = this.store.getIngredientById(this.ingredientId)();
        if (item) {
          this.form.patchValue({
            name: item.name,
            categoryId: item.category ? item.category.id : null,
            nutrientsId: item.nutrient ? item.nutrient.id : item.nutrientsId,
          });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;

    const selectedCategory = this.store.getCategoryById(this.form.value.categoryId ?? null)();
    const selectedNutrient = this.store.getNutrientById(this.form.value.nutrientsId ?? null)();

    const ingredient: Ingredient = new Ingredient({
      id: this.ingredientId ?? 0,
      name: this.form.value.name!,
      nutrientsId: this.form.value.nutrientsId ?? 0,
      categoryId: this.form.value.categoryId ?? 0,
      category: selectedCategory ? new Category({ id: selectedCategory.id, name: selectedCategory.name }) : null,
      nutrient: selectedNutrient
        ? new Nutrient({ id: selectedNutrient.id, calories: selectedNutrient.calories, carbs: selectedNutrient.carbs, proteins: selectedNutrient.proteins, fats: selectedNutrient.fats })
        : null,
    });

    if (this.isEdit) {
      this.store.updateIngredient(ingredient);
    } else {
      this.store.addIngredient(ingredient);
    }

    this.router.navigate(['catalog/ingredients']).then();
  }
}
