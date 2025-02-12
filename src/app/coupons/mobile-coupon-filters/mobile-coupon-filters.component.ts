import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CouponsFiltersComponent } from '../coupons-filters/coupons-filters.component';
import { LayoutService } from '../../core/layout.service';

@Component({
  selector: 'app-mobile-coupon-filters',
  imports: [CouponsFiltersComponent],
  templateUrl: './mobile-coupon-filters.component.html',
  styleUrl: './mobile-coupon-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileCouponFiltersComponent {
  private layoutService = inject(LayoutService);
  onCloseMenu() {
    this.layoutService.mobileFilterOpened.set(false);
  }
}
