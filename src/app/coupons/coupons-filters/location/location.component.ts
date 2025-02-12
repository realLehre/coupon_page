import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LocationService } from './location.service';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location',
  imports: [RadioButton, FormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent {
  private locationService = inject(LocationService);
  locations = this.locationService.locations;
  selectedLocation!: string;

  ngOnInit() {
    console.log(this.locations());
  }

  onSelectLocation(event: string) {
    this.selectedLocation = event;
  }
}
