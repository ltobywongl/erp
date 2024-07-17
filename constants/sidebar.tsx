import AvatorIcon from "@/ui/icons/avatar";
import CouponIcon from "@/ui/icons/coupon";
import DashboardIcon from "@/ui/icons/dashboard";

const SIDE_BAR_ROUTES = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    path: "/dashboard/members",
    name: "Members",
    icon: <AvatorIcon />,
  },
  {
    path: "/dashboard/coupons",
    name: "Coupons",
    icon: <CouponIcon />,
  },
];

export default SIDE_BAR_ROUTES;
