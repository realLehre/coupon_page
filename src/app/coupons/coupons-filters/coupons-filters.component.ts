import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { PriceComponent } from './price/price.component';
import { PercentageComponent } from './percentage/percentage.component';
import { LocationComponent } from './location/location.component';
import { FilterService } from '../../core/filter.service';
import { LayoutService } from '../../core/layout.service';

@Component({
  selector: 'app-coupons-filters',
  imports: [
    CategoryComponent,
    PriceComponent,
    PercentageComponent,
    LocationComponent,
  ],
  templateUrl: './coupons-filters.component.html',
  styleUrl: './coupons-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CouponsFiltersComponent {
  private filterService = inject(FilterService);
  private layoutService = inject(LayoutService);
  onClearFilters() {
    this.filterService.clearFilter();
    this.layoutService.mobileFilterOpened.set(false);
  }
}
