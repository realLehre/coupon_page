import { computed, inject, Injectable, signal } from '@angular/core';
import {
  ICouponFilteredRes,
  ICouponRes,
  ICouponsFilter,
} from '../models/coupons.interface';
import { PaginationInstance } from 'ngx-pagination';
import { data } from './couponsData';
import { Observable, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { FilterService } from '../core/filter.service';

@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  private filterService = inject(FilterService);
  couponsResponse = signal<ICouponRes>({
    data: data,
  });
  filter = this.filterService.filter;
  getCoupons = computed<any>(() => {
    return this.filterCoupons(this.filter());
  });
  paginationConfig = signal<PaginationInstance | null>(null);

  fetchCoupons(): Observable<ICouponFilteredRes> {
    return toObservable(this.getCoupons).pipe(
      tap((res) => {
        this.paginationConfig.set({
          currentPage: res.currentPage,
          itemsPerPage: Math.max(res.totalItemsInPage, 16),
          totalItems: res.totalItems,
          id: 'productPagination',
        });
      }),
    );
  }

  filterCoupons(filters: ICouponsFilter): ICouponFilteredRes {
    let filteredCoupons = this.couponsResponse().data;

    // Percentage Discount Filter
    if (filters.percentage) {
      if (
        filters.percentage?.value.min == 0 &&
        filters.percentage?.value.max == 0
      ) {
        filteredCoupons = this.couponsResponse().data;
      } else {
        filteredCoupons = filteredCoupons.filter(
          (coupon) =>
            coupon?.coupon_discount! >= +filters?.percentage?.value.min!,
        );
        filteredCoupons = filteredCoupons.filter(
          (coupon) =>
            coupon?.coupon_discount! <= +filters?.percentage?.value.max!,
        );
      }
    }

    if (filters.search) {
      const search = filters.search.trim().toLowerCase();
      filteredCoupons = filteredCoupons.filter((coupon) =>
        coupon.company_name.toLowerCase().includes(search),
      );
      console.log(filteredCoupons);
    }

    // Price Filter
    if (filters.minPrice !== undefined) {
      filteredCoupons = filteredCoupons.filter(
        (coupon) => +coupon.amount >= +filters.minPrice!,
      );
    }
    if (
      filters.maxPrice !== undefined &&
      filters.minPrice !== filters.maxPrice
    ) {
      filteredCoupons = filteredCoupons.filter(
        (coupon) => +coupon.amount <= +filters.maxPrice!,
      );
    }

    // Category Filter (Exact match using ID)
    if (filters.category) {
      filteredCoupons = filteredCoupons.filter(
        (coupon) => coupon.category.id === filters.category?.id,
      );
    }

    // Location Filter
    if (filters.location) {
      filteredCoupons = filteredCoupons.filter(
        (coupon) => coupon.company_location === filters.location,
      );
    }

    // Sorting
    if (filters.sort === 'newest') {
      filteredCoupons.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    } else if (filters.sort === 'oldest') {
      filteredCoupons.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
    }

    const page = filters.page ?? 1;
    const pageSize = 16;
    const totalItems = filteredCoupons.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedCoupons = filteredCoupons.slice(
      startIndex,
      startIndex + pageSize,
    );

    return {
      coupons: paginatedCoupons,
      totalItems,
      totalItemsInPage: paginatedCoupons.length,
      currentPage: page,
      totalPages,
    };
  }
}
