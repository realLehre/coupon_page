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
  currentPercentage = signal<any>(null);
  currentLocation = signal<string>('');
  currentCategory = signal<ICouponCategory | null>(null);
  currentPage = signal<number>(1);
  currentPriceFilter = signal<{ min: number; max: number } | null>(null);
  currentSort = signal<string>('newest');
  numberOfFilters = computed(() => {
    const price = this.currentPriceFilter();
    const location = this.currentLocation();
    const category = this.currentCategory();
    const percentage = this.currentPercentage();
    return (
      Object.keys({
        ...(price && { price }),
        ...(location && { location }),
        ...(category && { category }),
        ...(percentage && { percentage }),
      }).length ?? 0
    );
  });
  filter = computed<ICouponsFilter>(() => ({
    category: this.currentCategory()!,
    page: this.currentPage(),
    minPrice: this.currentPriceFilter()?.min,
    maxPrice: this.currentPriceFilter()?.max,
    sort: this.currentSort(),
    search: this.currentSearch(),
    location: this.currentLocation(),
    percentage: this.currentPercentage()!,
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
      this.currentSearch.set(savedQuery?.search);
    }

    if (savedQuery?.percentage) {
      this.currentPercentage.set(savedQuery?.percentage);
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

    // scroll to top after every filter or page change
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 400,
        behavior: 'smooth',
      });
    });
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
        this.filter()?.percentage?.value.min === 0 &&
        this.filter()?.percentage?.value.max === 0
          ? null
          : JSON.stringify(this.filter()?.percentage?.value),
      search: this.filter()?.search !== '' ? this.filter().search : null,
    };
  }

  clearFilter() {
    this.currentSort.set('newest');
    this.currentPriceFilter.set(null);
    this.currentPercentage.set(null);
    this.currentPage.set(1);
    this.currentSearch.set('');
    this.currentCategory.set(null);
    this.currentLocation.set('');
    this.setDataAndRoute();
  }
}
