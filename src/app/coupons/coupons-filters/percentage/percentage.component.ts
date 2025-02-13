import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../core/filter.service';
import { PercentageService } from './percentage.service';

@Component({
  selector: 'app-percentage',
  imports: [RadioButton, FormsModule],
  templateUrl: './percentage.component.html',
  styleUrl: './percentage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PercentageComponent {
  private filterService = inject(FilterService);
  private percentageService = inject(PercentageService);
  percentageFilters = this.percentageService.percentageFilters;
  selectedPercentage = this.filterService.currentPercentage;

  onSelectPercentage(event: any) {
    this.filterService.currentPercentage.set(
      this.filterService.currentPercentage() === event ? null : event,
    );
    this.filterService.currentPage.set(1);
    this.filterService.setDataAndRoute();
  }
}
