import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Slider } from 'primeng/slider';
import { CouponsComponent } from './coupons/coupons.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Slider, CouponsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'twentiestrybe_task';
}
