import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { NgClass } from '@angular/common';
import { MobileCouponFiltersComponent } from '../mobile-coupon-filters/mobile-coupon-filters.component';
import { CouponCardComponent } from '../coupon-card/coupon-card.component';
import { CouponsService } from '../coupons.service';
import { CouponsDataPagesComponent } from '../coupons-data-pages/coupons-data-pages.component';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-coupons-view',
  imports: [
    NgClass,
    MobileCouponFiltersComponent,
    CouponCardComponent,
    CouponsDataPagesComponent,
    NgxPaginationModule,
  ],
  templateUrl: './coupons-view.component.html',
  styleUrl: './coupons-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CouponsViewComponent implements OnInit {
  private layoutService = inject(LayoutService);
  private couponService = inject(CouponsService);
  coupons = toSignal(this.couponService.fetchCoupons());
  numberOfFilters = signal(0);
  isMobileFilterOpened = this.layoutService.mobileFilterOpened;
  config = this.couponService.paginationConfig;

  ngOnInit() {
    // console.log(this.couponService.filterCoupons({ page: 13 }));
  }

  onOpenMobileFilter() {
    this.layoutService.mobileFilterOpened.set(
      !this.layoutService.mobileFilterOpened(),
    );
  }

  onCloseMenu() {}
}
