import { Component } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { PriceComponent } from './price/price.component';
import { PercentageComponent } from './percentage/percentage.component';
import { LocationComponent } from './location/location.component';

@Component({
  selector: 'app-coupons-filters',
  imports: [
    CategoryComponent,
    PriceComponent,
    PercentageComponent,
    LocationComponent,
  ],
  templateUrl: './coupons-filters.component.html',
  styleUrl: './coupons-filters.component.scss',
})
export class CouponsFiltersComponent {}
