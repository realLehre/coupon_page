import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PercentageService {
  percentageFilters = signal([
    { id: 1, label: 'Free', value: { min: 0, max: 0 } },
    { id: 2, label: '0 - 10%', value: { min: 0, max: 10 } },
    { id: 3, label: '10 - 25%', value: { min: 10, max: 25 } },
    { id: 4, label: '25 - 50%', value: { min: 25, max: 50 } },
    { id: 5, label: '50 - 65%', value: { min: 50, max: 65 } },
    { id: 6, label: '65% & Above', value: { min: 65, max: 100 } },
  ]);
  constructor() {}
}
