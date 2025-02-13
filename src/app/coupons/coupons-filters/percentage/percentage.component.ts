import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../core/filter.service';

@Component({
  selector: 'app-percentage',
  imports: [RadioButton, FormsModule],
  templateUrl: './percentage.component.html',
  styleUrl: './percentage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PercentageComponent {
  private filterService = inject(FilterService);
  percentageFilters = [
    { id: 1, label: 'Free', value: { min: 0, max: 0 } },
    { id: 2, label: '0 - 10%', value: { min: 0, max: 10 } },
    { id: 3, label: '10 - 25%', value: { min: 10, max: 25 } },
    { id: 4, label: '35 - 50%', value: { min: 35, max: 50 } },
    { id: 5, label: '50 - 65%', value: { min: 50, max: 65 } },
    { id: 6, label: '65% & Above', value: { min: 65, max: 100 } },
  ];
  selectedPercentage = this.filterService.currentPercentage;

  onSelectPercentage(event: any) {
    this.filterService.currentPercentage.set(event);
    this.filterService.currentPage.set(1);
    this.filterService.setDataAndRoute();
  }
}
