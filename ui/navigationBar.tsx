"use client";
import Menu from "@/ui/icons/menu";
import { ReactNode, useState } from "react";
import Link from "next/link";
import SIDE_BAR_ROUTES from "@/constants/sidebar";
import { signOut } from "next-auth/react";

export default function NavigationHandler({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="h-full flex flex-col max-h-dvh">
      <div className="w-full z-50 flex items-center justify-between px-3 md:px-6 py-3 md:py-4 bg-gradient-to-b from-blue-100 to-blue-200">
        <h1 className="text-xl md:text-2xl">
          <Link href={"/"}>Membership</Link>
        </h1>
        <div className="flex items-center gap-4 md:gap-6">
          <div
            className="w-8 p-1 cursor-pointer"
            onClick={() => setOpen((cur) => !cur)}
          >
            <Menu />
          </div>
          <div
            onClick={() => signOut({ callbackUrl: "/signin" })}
            className="cursor-pointer"
          >
            Signout
          </div>
        </div>
      </div>
      <main className="flex flex-1 overflow-auto">
        <nav
          className={`h-full flex-col md:w-1/6 max-w-24 md:max-w-28 border-r custom-scrollbar overflow-y-scroll ${
            open ? "flex" : "hidden"
          }`}
        >
          {SIDE_BAR_ROUTES.map((route, index) => (
            <Link
              key={index}
              href={route.path}
              className="p-4 text-xs md:text-sm hover:text-highlight border-b"
            >
              <div className="p-2">{route.icon}</div>
              <div className="text-center">{route.name}</div>
            </Link>
          ))}
        </nav>
        {children}
      </main>
    </div>
  );
}
