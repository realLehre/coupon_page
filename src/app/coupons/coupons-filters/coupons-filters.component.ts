import { Component } from '@angular/core';
import { CategoryComponent } from './category/category.component';

@Component({
  selector: 'app-coupons-filters',
  imports: [CategoryComponent],
  templateUrl: './coupons-filters.component.html',
  styleUrl: './coupons-filters.component.scss',
})
export class CouponsFiltersComponent {}
