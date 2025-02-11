import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsFiltersComponent } from './coupons-filters.component';

describe('CouponsFiltersComponent', () => {
  let component: CouponsFiltersComponent;
  let fixture: ComponentFixture<CouponsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponsFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
