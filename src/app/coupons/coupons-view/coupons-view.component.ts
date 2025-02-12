import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { NgClass } from '@angular/common';
import { MobileCouponFiltersComponent } from '../mobile-coupon-filters/mobile-coupon-filters.component';
import { CouponCardComponent } from '../coupon-card/coupon-card.component';
import { CouponsService } from '../coupons.service';

@Component({
  selector: 'app-coupons-view',
  imports: [NgClass, MobileCouponFiltersComponent, CouponCardComponent],
  templateUrl: './coupons-view.component.html',
  styleUrl: './coupons-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CouponsViewComponent {
  private layoutService = inject(LayoutService);
  private couponService = inject(CouponsService);
  coupons = this.couponService.couponsResponse;
  numberOfFilters = signal(0);
  isMobileFilterOpened = this.layoutService.mobileFilterOpened;

  onOpenMobileFilter() {
    this.layoutService.mobileFilterOpened.set(
      !this.layoutService.mobileFilterOpened(),
    );
  }

  onCloseMenu() {}
}
