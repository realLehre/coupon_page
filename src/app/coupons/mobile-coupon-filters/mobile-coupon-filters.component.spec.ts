import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCouponFiltersComponent } from './mobile-coupon-filters.component';

describe('MobileCouponFiltersComponent', () => {
  let component: MobileCouponFiltersComponent;
  let fixture: ComponentFixture<MobileCouponFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileCouponFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileCouponFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
