import { Component } from '@angular/core';
import { CouponsFiltersComponent } from './coupons-filters/coupons-filters.component';
import { CouponsViewComponent } from './coupons-view/coupons-view.component';

@Component({
  selector: 'app-coupons',
  imports: [CouponsFiltersComponent, CouponsViewComponent],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss',
})
export class CouponsComponent {}
