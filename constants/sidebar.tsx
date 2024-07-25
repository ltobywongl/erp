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
    role: ["admin", "staff"],
    subRoutes: [],
  },
  {
    path: "/dashboard/members",
    name: "Members",
    icon: <AvatorIcon />,
    role: ["admin"],
    subRoutes: [],
  },
  {
    path: "/dashboard/products",
    name: "Products",
    icon: <ProductIcon />,
    role: ["admin"],
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
    role: ["admin"],
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
    role: ["admin"],
    subRoutes: [],
  },
  {
    path: "/dashboard/topups",
    name: "Topups",
    icon: <TopupIcon />,
    role: ["admin"],
    subRoutes: [],
  },
  {
    path: "/dashboard/orders",
    name: "Orders",
    icon: <ProductIcon />,
    role: ["admin"],
    subRoutes: [],
  },
  {
    path: "/dashboard/reports",
    name: "Reports",
    icon: <CouponIcon />,
    role: ["admin"],
    subRoutes: [],
  },
  {
    path: "/dashboard/bookings",
    name: "Bookings",
    icon: <TopupIcon />,
    role: ["admin"],
    subRoutes: [],
  },
  {
    path: "/dashboard/activities",
    name: "Activities",
    icon: <EnquiryIcon />,
    role: ["admin", "staff"],
    subRoutes: [],
  },
  {
    path: "/dashboard/tasks",
    name: "Tasks and Cases",
    icon: <ProductIcon />,
    role: ["admin", "staff"],
    subRoutes: [],
  },
  {
    path: "/dashboard/opportunities",
    name: "Opportunities",
    icon: <EnquiryIcon />,
    role: ["admin"],
    subRoutes: [],
  },
  {
    path: "/dashboard/deals",
    name: "Deals",
    icon: <EnquiryIcon />,
    role: ["admin"],
    subRoutes: [],
  },
];

export default SIDE_BAR_ROUTES;
