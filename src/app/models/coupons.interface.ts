export interface ICouponRes {
  data: ICoupon[];
}
export interface ICoupon {
  id: string;
  user_id: number;
  offer_type: any;
  title: string;
  company_logo: string | null;
  company_name: string;
  coupon_discount?: number;
  coupon_code?: string;
  currency: string;
  payment_type: string;
  amount: string;
  status: number;
  job_type?: string | null;
  job_style?: string | null;
  banner_image?: string | null;
  offer_url: string;
  redeemable: number;
  experience_level?: string | null;
  description: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
  };
  category: ICouponCategory;
  company_location: string;
  brand?: {
    id: number;
    name: string;
    logo: string | null;
    color: string;
    coupon_off: string;
    deleted_at: string | null;
  };
  days_ago: string;
  applications: any[];
  bookmarked: boolean;
}

export interface ICouponCategory {
  id: number;
  category_name: string;
  category_type: string;
  category_slug: string;
  category_status: number;
  category_image: string | null;
  category_icon: string | null;
  category_description: string | null;
  deleted_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ICouponFilteredRes {
  coupons: ICoupon[];
  totalItems: number;
  totalItemsInPage: number;
  currentPage: number;
  totalPages: number;
}

export interface ICouponsFilter {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page: number;
  category?: ICouponCategory | undefined;
  percentage?: { min: number; max: number };
  location?: string;
  sort?: string;
}
