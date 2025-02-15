import { Component } from '@angular/core';
import { CouponsFiltersComponent } from './coupons-filters/coupons-filters.component';
import { CouponsViewComponent } from './coupons-view/coupons-view.component';
import { HeaderComponent } from '../header/header.component';
import { BannerComponent } from '../banner/banner.component';
import { CallToActionComponent } from '../call-to-action/call-to-action.component';

@Component({
  selector: 'app-coupons',
  imports: [
    CouponsFiltersComponent,
    CouponsViewComponent,
    HeaderComponent,
    BannerComponent,
    CallToActionComponent,
  ],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss',
})
export class CouponsComponent {}
