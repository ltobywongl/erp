import AvatorIcon from "@/ui/icons/avatar";
import CouponIcon from "@/ui/icons/coupon";
import DashboardIcon from "@/ui/icons/dashboard";
import EnquiryIcon from "@/ui/icons/enquiry";
import ProductIcon from "@/ui/icons/product";
import TopupIcon from "@/ui/icons/topup";

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
    path: "/dashboard/products",
    name: "Products",
    icon: <ProductIcon />,
    subRoutes: [
      {
        name: "Categories",
        path: "/dashboard/products/categories",
      },
      {
        name: "Products",
        path: "/dashboard/products",
      },
    ],
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
  {
    path: "/dashboard/enquiries",
    name: "Enquiries",
    icon: <EnquiryIcon />,
    subRoutes: [],
  },
  {
    path: "/dashboard/topups",
    name: "Topups",
    icon: <TopupIcon />,
    subRoutes: [],
  },
  {
    path: "/dashboard/orders",
    name: "Orders",
    icon: <ProductIcon />,
    subRoutes: [],
  },
];

export default SIDE_BAR_ROUTES;
