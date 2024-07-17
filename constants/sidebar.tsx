import AvatorIcon from "@/ui/icons/avatar";
import CouponIcon from "@/ui/icons/coupon";
import DashboardIcon from "@/ui/icons/dashboard";

const SIDE_BAR_ROUTES = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <DashboardIcon />,
    subRoutes: [],
  },
  {
    path: "/dashboard/members",
    name: "Members",
    icon: <AvatorIcon />,
    subRoutes: [],
  },
  {
    path: "/dashboard/coupons/associated",
    name: "Coupons",
    icon: <CouponIcon />,
    subRoutes: [
      {
        name: "Categories",
        path: "/dashboard/coupons/categories",
      },
      {
        name: "Associated",
        path: "/dashboard/coupons/associated",
      },
    ],
  },
];

export default SIDE_BAR_ROUTES;
