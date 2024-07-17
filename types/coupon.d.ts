type Coupon = {
  id: string;
  createdAt: string;
  usedAt: string | null;
  coupon_categories: {
    value: number;
  };
  users: {
    id: string;
    username: string;
  };
};
