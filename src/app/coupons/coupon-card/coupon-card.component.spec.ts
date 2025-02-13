import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCardComponent } from './coupon-card.component';

describe('CouponCardComponent', () => {
  let component: CouponCardComponent;
  let fixture: ComponentFixture<CouponCardComponent>;

  let mockCoupon = {
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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CouponCardComponent);
    fixture.componentRef.setInput('coupon', mockCoupon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialise coupon with input data from parent', () => {
    expect(component.coupon()).toBe(mockCoupon);
  });
});
