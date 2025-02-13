import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LocationService } from './location.service';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../core/filter.service';

@Component({
  selector: 'app-location',
  imports: [RadioButton, FormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent {
  private locationService = inject(LocationService);
  private filterService = inject(FilterService);
  locations = this.locationService.locations;
  selectedLocation = this.filterService.currentLocation;

  onSelectLocation(event: string) {
    this.filterService.currentLocation.set(event);
    this.filterService.currentPage.set(1);
    this.filterService.setDataAndRoute();
  }
}
