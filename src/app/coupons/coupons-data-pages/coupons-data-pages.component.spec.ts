import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsDataPagesComponent } from './coupons-data-pages.component';

describe('CouponsDataPagesComponent', () => {
  let component: CouponsDataPagesComponent;
  let fixture: ComponentFixture<CouponsDataPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponsDataPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsDataPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
