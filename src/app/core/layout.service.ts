import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  mobileFilterOpened = signal<boolean>(false);

  constructor() {}
}
