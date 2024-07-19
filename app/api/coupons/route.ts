import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!, 10)
    : 1;
  const pageSize = searchParams.get("pageSize")
    ? parseInt(searchParams.get("pageSize")!, 10)
    : 10;
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder") as "asc" | "desc" | undefined;
  const filters = searchParams.get("filters");

  try {
    // Prepare the where clause for filtering
    let whereClause: any = {};
    if (filters) {
      try {
        const filterObj = JSON.parse(filters);
        Object.entries(filterObj).forEach(([key, value]) => {
          if (key === "value") {
            whereClause.couponCategory = {
              value: { equals: Number(value) },
            };
          } else if (key === "username") {
            whereClause.user = {
              username: { contains: value },
            };
          } else {
            whereClause[key] = { contains: value };
          }
        });
      } catch (error) {
        console.error("Error parsing filters", error);
      }
    }

    // Prepare the orderBy clause for sorting
    let orderByClause = {};
    if (sortBy && sortOrder) {
      if (sortBy === "value") {
        orderByClause = {
          couponCategory: { [sortBy]: sortOrder },
        };
      } else if (sortBy === "username") {
        orderByClause = {
          user: { [sortBy]: sortOrder },
        };
      } else {
        orderByClause = {
          [sortBy]: sortOrder,
        };
      }
    } else {
      orderByClause = {
        createdAt: "desc",
      };
    }

    // Fetch data with pagination, filtering, and sorting
    const coupons = await prisma.coupon.findMany({
      select: {
        id: true,
        createdAt: true,
        usedAt: true,
        couponCategory: {
          select: {
            value: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      where: whereClause,
      orderBy: orderByClause,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    // Get total count for pagination
    const totalItems = await prisma.coupon.count({ where: whereClause });

    return NextResponse.json({
      data: coupons,
      totalPages: Math.ceil(totalItems / pageSize),
      totalItems: totalItems,
    });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json(
      { error: "Error fetching coupons" },
      { status: 500 }
    );
  }
}
