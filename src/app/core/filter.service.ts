import { computed, inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICouponCategory, ICouponsFilter } from '../models/coupons.interface';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  currentSearch = signal<string>('');
  currentPercentage = signal<number>(0);
  currentLocation = signal<string>('');
  currentCategory = signal<ICouponCategory | null>(null);
  currentPage = signal<number>(1);
  currentPriceFilter = signal<{ min: number; max: number } | null>(null);
  currentSort = signal<string | null>(null);
  currentRating = signal<number | null>(null);
  numberOfFilters = computed(() => {
    const priceFilter = this.currentPriceFilter();
    const sortFilter = this.currentSort();
    const ratingFilter = this.currentRating();
    return (
      Object.keys({
        ...(priceFilter && { priceFilter }),
        ...(sortFilter && { sortFilter }),
        ...(ratingFilter && { ratingFilter }),
      }).length ?? 0
    );
  });
  filter = computed<ICouponsFilter>(() => ({
    category: this.currentCategory()!,
    page: this.currentPage(),
    minPrice: this.currentPriceFilter()?.min,
    maxPrice: this.currentPriceFilter()?.max,
    sort: this.currentSort()!,
    search: this.currentSearch(),
    location: this.currentLocation(),
    percentage: this.currentPercentage(),
  }));
  STORAGE_KEY = 'DKdk*djdHDk3wksddld';

  constructor() {
    const savedQuery = JSON.parse(sessionStorage.getItem(this.STORAGE_KEY)!);

    if (savedQuery?.category) {
      this.currentCategory.set(savedQuery.category);
    }

    if (savedQuery?.page) {
      this.currentPage.set(savedQuery.page);
    }
    if (savedQuery?.minPrice) {
      this.currentPriceFilter.set({
        min: savedQuery?.minPrice,
        max: savedQuery?.maxPrice,
      });
    }
    if (savedQuery?.sort) {
      this.currentSort.set(savedQuery?.sort);
    }

    if (savedQuery?.location) {
      this.currentLocation.set(savedQuery?.location);
    }
    if (savedQuery?.search) {
      this.currentLocation.set(savedQuery?.search);
    }

    if (savedQuery?.percentage) {
      this.currentLocation.set(savedQuery?.percentage);
    }

    this.createRouteQuery();
  }

  setDataAndRoute() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.createRouteQuery(),
      },
      queryParamsHandling: 'merge',
    });

    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.filter()));
  }

  createRouteQuery() {
    return {
      category: this.filter()?.category?.category_slug,
      page: this.filter().page,
      minPrice: this.filter().minPrice,
      maxPrice: this.filter().maxPrice,
      sortBy: this.filter().sort,
      location: this.filter()?.location !== '' ? this.filter()?.location : null,
      percentage:
        this.filter()?.percentage !== 0 ? this.filter()?.percentage : null,
      search: this.filter()?.search !== '' ? this.filter().search : null,
    };
  }

  clearFilter() {
    this.currentSort.set(null);
    this.currentRating.set(null);
    this.currentPriceFilter.set(null);
    this.currentPriceFilter.set(null);
    this.setDataAndRoute();
  }
}
