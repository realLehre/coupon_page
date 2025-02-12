import { computed, inject, Injectable, signal } from '@angular/core';
import { CouponsService } from '../../coupons.service';
import { ICoupon, ICouponCategory } from '../../../models/coupons.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private couponService = inject(CouponsService);
  data = signal<ICoupon[]>(this.couponService.couponsResponse().data);
  categories = computed<{ [key: string]: ICouponCategory }>(() =>
    this.data().reduce((acc: any, item) => {
      if (!acc[item.category.category_name]) {
        acc[item.category.category_name] = item.category;
      }
      return acc;
    }, {}),
  );
}
