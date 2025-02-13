import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { NgClass } from '@angular/common';
import { MobileCouponFiltersComponent } from '../mobile-coupon-filters/mobile-coupon-filters.component';
import { CouponCardComponent } from '../coupon-card/coupon-card.component';
import { CouponsService } from '../coupons.service';
import { CouponsDataPagesComponent } from '../coupons-data-pages/coupons-data-pages.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { FilterService } from '../../core/filter.service';
import { ICouponFilteredRes } from '../../models/coupons.interface';

@Component({
  selector: 'app-coupons-view',
  imports: [
    NgClass,
    MobileCouponFiltersComponent,
    CouponCardComponent,
    CouponsDataPagesComponent,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './coupons-view.component.html',
  styleUrl: './coupons-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CouponsViewComponent implements OnInit {
  private layoutService = inject(LayoutService);
  private couponService = inject(CouponsService);
  private filterService = inject(FilterService);
  coupons = toSignal<ICouponFilteredRes>(this.couponService.fetchCoupons());
  numberOfFilters = this.filterService.numberOfFilters;
  isMobileFilterOpened = this.layoutService.mobileFilterOpened;
  config = this.couponService.paginationConfig;
  inputForm: FormControl = new FormControl(null);
  selectedSort = this.filterService.currentSort;

  ngOnInit() {
    // mimicking searching and sending a network request so, debounce to reduce call frequency
    this.inputForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(() => this.inputForm.value.toLowerCase()),
      )
      .subscribe((val) => {
        this.filterService.currentSearch.set(val);
        this.filter();
      });
  }

  onOpenMobileFilter() {
    this.layoutService.mobileFilterOpened.set(
      !this.layoutService.mobileFilterOpened(),
    );
  }

  onSortChanged(event: any) {
    this.filterService.currentSort.set(event);
    this.filter();
  }

  filter() {
    this.filterService.currentPage.set(1);
    this.filterService.setDataAndRoute();
  }
}
