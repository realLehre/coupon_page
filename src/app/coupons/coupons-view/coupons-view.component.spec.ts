import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsViewComponent } from './coupons-view.component';
import { FilterService } from '../../core/filter.service';
import { provideRouter } from '@angular/router';
import { CouponsService } from '../coupons.service';
import { LayoutService } from '../../core/layout.service';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { CategoryService } from '../coupons-filters/category/category.service';
import { LocationService } from '../coupons-filters/location/location.service';
import { By } from '@angular/platform-browser';

describe('CouponsViewComponent', () => {
  let component: CouponsViewComponent;
  let fixture: ComponentFixture<CouponsViewComponent>;
  let filterServiceSpy: jasmine.SpyObj<FilterService>;
  let couponsServiceSpy: jasmine.SpyObj<CouponsService>;
  let layoutServiceSpy: jasmine.SpyObj<LayoutService>;
  let categoryService: jasmine.SpyObj<CategoryService>;
  let locationServiceSpy: jasmine.SpyObj<LocationService>;

  const mockCouponResponse = {
    coupons: [
      {
        id: '9d860471-1c8f-4f4c-861e-44df72d56dff',
        user_id: 1,
        offer_type: 'coupon',
        title: 'Quod sit maiores et.',
        company_logo: null,
        company_name: 'Kling Inc',
        coupon_discount: 20,
        coupon_code: 'TWB794265',
        currency: 'NGN',
        payment_type: 'year',
        amount: '72045.00',
        status: 1,
        job_type: null,
        job_style: null,
        banner_image: null,
        offer_url: '',
        redeemable: 0,
        experience_level: null,
        description:
          'Rerum est vero ex maiores aut suscipit molestiae ut. Nihil culpa beatae iusto accusamus aperiam. Velit aut alias commodi atque. Dolorem recusandae consequatur et omnis laboriosam qui tempora quia. Exercitationem accusamus optio minima dolorem necessitatibus soluta et. Ut et qui est. Qui libero fuga blanditiis. Eligendi omnis natus vel et illo inventore hic.',
        created_at: '2024-11-19T04:07:37.000000Z',
        updated_at: '2024-11-19T04:07:37.000000Z',
        user: {
          id: 1,
          name: 'admin admin',
        },
        category: {
          id: 15,
          category_name: 'Transport',
          category_type: 'job',
          category_slug: 'transport',
          category_status: 1,
          category_image: null,
          category_icon: null,
          category_description: null,
          deleted_at: null,
          created_at: null,
          updated_at: null,
        },
        company_location: 'East',
        brand: {
          id: 3,
          name: 'Amazon',
          logo: null,
          color: '#845600',
          coupon_off: 'up  to  20%  off',
          deleted_at: null,
        },
        days_ago: '2 weeks ago',
        applications: [],
        bookmarked: false,
      },
    ],
    currentPage: 1,
    totalItems: 1,
    totalItemsInPage: 1,
    totalPages: 1,
  };

  const emptyCouponResponse = {
    coupons: [],
    currentPage: 1,
    totalItems: 0,
    totalItemsInPage: 0,
    totalPages: 0,
  };

  let mockPaginationData = {
    currentPage: 1,
    itemsPerPage: 16,
    totalItems: 1,
    id: 'productPagination',
  };

  beforeEach(async () => {
    filterServiceSpy = jasmine.createSpyObj(
      'FilterService',
      ['createRouteQuery'],
      {
        numberOfFilters: signal(0),
        currentSort: signal(null),
        currentPriceFilter: signal(null),
        currentSearch: signal(''),
        currentPercentage: signal(null),
        currentLocation: signal(''),
        currentCategory: signal(null),
        currentPage: signal(1),
      },
    );
    couponsServiceSpy = jasmine.createSpyObj(
      'CouponsService',
      ['filterCoupons', 'fetchCoupons'],
      {
        paginationConfig: signal({
          id: 'productPagination',
          currentPage: 1,
          itemsPerPage: 16,
          totalItems: 1,
        }),
      },
    );
    categoryService = jasmine.createSpyObj('CategoryService', [''], {
      data: signal({ data: [] }),
      categories: signal([]),
    });
    locationServiceSpy = jasmine.createSpyObj('LocationService', [''], {
      data: signal({ data: [] }),
      locations: signal([]),
    });

    couponsServiceSpy.fetchCoupons.and.returnValue(of(mockCouponResponse));
    await TestBed.configureTestingModule({
      imports: [CouponsViewComponent],
      providers: [
        { provide: FilterService, useValue: filterServiceSpy },
        { provide: CouponsService, useValue: couponsServiceSpy },
        { provide: CategoryService, useValue: categoryService },
        { provide: LocationService, useValue: locationServiceSpy },
        LayoutService,
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CouponsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialise with coupons data from couponsService', () => {
    expect(component.coupons()).toEqual(mockCouponResponse);
  });

  it('should initialise pagination config with data from service', () => {
    expect(component.config()).toEqual(mockPaginationData);
  });

  it('should show an empty coupon message when no data is available', () => {
    couponsServiceSpy.fetchCoupons.and.returnValue(of(emptyCouponResponse));

    const message = fixture.debugElement.query(
      By.css('[data-test-id="no-coupons"]'),
    );
    fixture.detectChanges();

    expect(message).toBeFalsy();
  });
});
