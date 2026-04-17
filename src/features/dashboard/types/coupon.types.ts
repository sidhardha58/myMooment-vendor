export type CouponType = "percentage" | "flat";

export interface Coupon {
  _id: string;

  code: string;

  type: CouponType;
  value: number;

  min_order_amount?: number;
  max_discount?: number;

  start_date: string;
  end_date: string;

  is_active: boolean;

  usage_limit?: number;
  per_user_limit?: number;

  applicable_service_ids?: string[];
}
