import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { NgClass } from '@angular/common';
import { MobileCouponFiltersComponent } from '../mobile-coupon-filters/mobile-coupon-filters.component';
import { CouponCardComponent } from '../coupon-card/coupon-card.component';
import { CouponsService } from '../coupons.service';
import { CouponsDataPagesComponent } from '../coupons-data-pages/coupons-data-pages.component';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';
import { FilterService } from '../../core/filter.service';

@Component({
  selector: 'app-coupons-view',
  imports: [
    NgClass,
    MobileCouponFiltersComponent,
    CouponCardComponent,
    CouponsDataPagesComponent,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  templateUrl: './coupons-view.component.html',
  styleUrl: './coupons-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CouponsViewComponent implements OnInit {
  private layoutService = inject(LayoutService);
  private couponService = inject(CouponsService);
  private filterService = inject(FilterService);
  coupons = toSignal(this.couponService.fetchCoupons());
  numberOfFilters = signal(0);
  isMobileFilterOpened = this.layoutService.mobileFilterOpened;
  config = this.couponService.paginationConfig;
  inputForm: FormControl = new FormControl(null);

  ngOnInit() {
    // mimicking searching and sending a network request, do debounce to reduce call frequency
    this.inputForm.valueChanges
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        map(() => this.inputForm.value.toLowerCase()),
      )
      .subscribe((val) => {
        console.log(val);
        this.filterService.currentSearch.set(val);
        this.filterService.currentPage.set(1);
        this.filterService.setDataAndRoute();
      });
  }

  onOpenMobileFilter() {
    this.layoutService.mobileFilterOpened.set(
      !this.layoutService.mobileFilterOpened(),
    );
  }

  onCloseMenu() {}
}
