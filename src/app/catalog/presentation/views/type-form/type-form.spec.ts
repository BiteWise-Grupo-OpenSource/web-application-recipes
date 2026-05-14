import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeForm } from './type-form';

describe('TypeForm', () => {
  let component: TypeForm;
  let fixture: ComponentFixture<TypeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
