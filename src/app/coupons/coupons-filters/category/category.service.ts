import { computed, inject, Injectable, signal } from '@angular/core';
import { CouponsService } from '../../coupons.service';
import { ICoupon, ICouponCategory } from '../../../models/coupons.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private couponService = inject(CouponsService);
  data = signal<ICoupon[]>(this.couponService.couponsResponse().data);
  categories = computed<ICouponCategory[]>(() =>
    this.data().reduce((acc: any, item) => {
      if (
        !acc.find(
          (cat: ICouponCategory) =>
            cat.category_name == item.category.category_name,
        )
      ) {
        acc.push(item.category);
      }
      return acc;
    }, []),
  );
}
