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
    let whereClause = {};
    if (filters) {
      try {
        const filterObj = JSON.parse(filters);
        whereClause = Object.entries(filterObj).reduce((acc, [key, value]) => {
          if (typeof value === "string") {
            acc[key] = { contains: value };
          }
          return acc;
        }, {} as Record<string, any>);
      } catch (error) {
        console.error("Error parsing filters", error);
      }
    }

    // Prepare the orderBy clause for sorting
    let orderByClause = {};
    if (sortBy && sortOrder) {
      orderByClause = {
        [sortBy]: sortOrder,
      };
    } else {
      orderByClause = {
        createdAt: "desc",
      };
    }

    // Fetch data with pagination, filtering, and sorting
    const coupons = await prisma.couponCategory.findMany({
      select: {
        id: true,
        value: true,
        active: true,
        createdAt: true,
      },
      where: whereClause,
      orderBy: orderByClause,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    // Get total count for pagination
    const totalItems = await prisma.couponCategory.count({
      where: whereClause,
    });

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
