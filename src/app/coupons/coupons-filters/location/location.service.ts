import { computed, inject, Injectable, signal } from '@angular/core';
import { CouponsService } from '../../coupons.service';
import { ICoupon } from '../../../models/coupons.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private couponService = inject(CouponsService);
  data = this.couponService.couponsResponse;
  locations = computed<string[]>(() =>
    this.data().data.reduce((acc: any, item) => {
      if (!acc.find((location: string) => location === item.company_location)) {
        acc = [...acc, item.company_location];
      }
      return acc;
    }, []),
  );
}
