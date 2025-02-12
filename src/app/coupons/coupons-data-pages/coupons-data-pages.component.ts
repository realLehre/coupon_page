import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { FilterService } from '../../core/filter.service';

@Component({
  selector: 'app-coupons-data-pages',
  imports: [NgxPaginationModule],
  templateUrl: './coupons-data-pages.component.html',
  styleUrl: './coupons-data-pages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CouponsDataPagesComponent {
  config = input<PaginationInstance>();
  private filterService = inject(FilterService);

  pageChanged(page: number) {
    this.filterService.currentPage.set(page);
    this.filterService.setDataAndRoute();
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 20,
        behavior: 'smooth',
      });
    });
  }
}
