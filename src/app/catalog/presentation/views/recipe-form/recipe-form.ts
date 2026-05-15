import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogStore } from '../../../application/catalog-store';
import { Recipe } from '../../../domain/model/recipe.entity';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-recipe-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.css',
})
export class RecipeForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(CatalogStore);

  form = this.fb.group({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    urlInstructions: new FormControl<string>('', { nonNullable: true }),
    recipeTypeId: new FormControl<number | null>(null),
    totalNutrientsId: new FormControl<number | null>(null),
  });

  isEdit = false;
  recipeId: number | null = null;

  constructor() {
    this.route.params.subscribe((params) => {
      this.recipeId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.recipeId;
      if (this.isEdit) {
        const recipe = this.store.getRecipeById(this.recipeId)();
        if (recipe) {
          this.form.patchValue({
            title: recipe.title,
            description: recipe.description,
            urlInstructions: recipe.urlInstructions,
            recipeTypeId: recipe.recipeTypeId,
            totalNutrientsId: recipe.totalNutrientsId,
          });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;

    const recipe: Recipe = new Recipe({
      id: this.recipeId ?? 0,
      title: this.form.value.title!,
      description: this.form.value.description!,
      urlInstructions: this.form.value.urlInstructions!,
      recipeTypeId: this.form.value.recipeTypeId ?? 0,
      totalNutrientsId: this.form.value.totalNutrientsId ?? 0,
    });

    if (this.isEdit) {
      this.store.updateRecipe(recipe);
    } else {
      this.store.addRecipe(recipe);
    }

    this.router.navigate(['catalog/recipes']).then();
  }
}
