import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { Slider } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../core/filter.service';

@Component({
  selector: 'app-price',
  imports: [Slider, FormsModule],
  templateUrl: './price.component.html',
  styleUrl: './price.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceComponent {
  private filterService = inject(FilterService);
  currentPriceFilter: WritableSignal<{ min: number; max: number } | null> =
    this.filterService.currentPriceFilter;
  rangeValues = computed(() => {
    if (this.currentPriceFilter()) {
      return [this.currentPriceFilter()?.min, this.currentPriceFilter()?.max];
    } else {
      return [2000, 10000];
    }
  });

  onRangeValuesChange(event: any) {
    this.currentPriceFilter.set({
      min: event[0],
      max: event[1],
    });
    this.setFilter();
  }

  onMinInputChange(event: any) {
    this.currentPriceFilter.set({
      min: event,
      max: this.currentPriceFilter()?.max!,
    });
    this.setFilter();
  }

  onMaxInputChange(event: any) {
    this.currentPriceFilter.set({
      min: this.currentPriceFilter()?.min!,
      max: event,
    });
    this.setFilter();
  }

  setFilter() {
    this.filterService.currentPriceFilter.set({
      min: this.currentPriceFilter()?.min!,
      max:
        this.currentPriceFilter()?.min! > this.currentPriceFilter()?.max!
          ? this.currentPriceFilter()?.min!
          : this.currentPriceFilter()?.max!,
    });
    this.filterService.setDataAndRoute();
  }
}
