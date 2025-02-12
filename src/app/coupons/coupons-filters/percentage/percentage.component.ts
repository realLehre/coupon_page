import { Component } from '@angular/core';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-percentage',
  imports: [RadioButton, FormsModule],
  templateUrl: './percentage.component.html',
  styleUrl: './percentage.component.scss',
})
export class PercentageComponent {
  percentageFilters = [
    { id: 1, label: 'Free', value: '0' },
    { id: 2, label: '0 - 10%', value: '10' },
    { id: 3, label: '10 - 25%', value: '25' },
    { id: 4, label: '35 - 50%', value: '50' },
    { id: 5, label: '50 - 65%', value: '65' },
    { id: 6, label: '65% & Above', value: '100' },
  ];
  selectedPercentage = 0;

  onSelectPercentage(event: any) {
    this.selectedPercentage = event;
  }
}
