import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { Slider } from 'primeng/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-price',
  imports: [Slider, FormsModule],
  templateUrl: './price.component.html',
  styleUrl: './price.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceComponent {
  currentPriceFilter = signal({ min: 2000, max: 10000 });
  rangeValues = computed(() => {
    if (this.currentPriceFilter()) {
      return [this.currentPriceFilter()?.min, this.currentPriceFilter()?.max];
    } else {
      return [2000, 10000];
    }
  });

  onRangeValuesChange($event: any) {}

  onMinInputChange(event: any) {
    console.log(event);
    const minValue = +event;
    this.currentPriceFilter.set({
      min: minValue,
      max: this.currentPriceFilter().max,
    });
  }

  onMaxInputChange(event: any) {
    const maxValue = +event;
    this.currentPriceFilter.set({
      min: this.currentPriceFilter().min,
      max: maxValue,
    });
  }
}
