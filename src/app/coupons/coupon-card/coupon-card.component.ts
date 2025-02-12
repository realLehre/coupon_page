import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ICoupon } from '../../models/coupons.interface';

@Component({
  selector: 'app-coupon-card',
  imports: [],
  templateUrl: './coupon-card.component.html',
  styleUrl: './coupon-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CouponCardComponent {
  coupon = input.required<ICoupon>();
}
