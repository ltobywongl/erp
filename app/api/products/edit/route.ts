import { authOptions } from "@/utils/authOptions";
import { errorResponse, successResponse } from "@/utils/httpResponse";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await getServerSession(authOptions);

    if (!user?.user.role || user.user.role !== "admin") {
      return errorResponse("Unauthorized", 401);
    }

    const rawFormData = await request.formData();
    const formData = {
      id: rawFormData.get("id"),
      categoryId: rawFormData.get("categoryId"),
      name: rawFormData.get("name"),
      price: rawFormData.get("price"),
      discount: rawFormData.get("discount"),
      couponPoint: rawFormData.get("couponPoint"),
      delete: rawFormData.get("delete"),
    };

    if (
      !formData.id ||
      !formData.categoryId ||
      !formData.name ||
      !formData.price ||
      !formData.discount ||
      !formData.couponPoint ||
      formData.delete === undefined
    ) {
      return errorResponse("Bad Request", 400);
    }

    await prisma.product.update({
      data: {
        categoryId: formData.categoryId as string,
        name: formData.name as string,
        price: parseFloat(formData.price as string),
        discount: parseFloat(formData.discount as string),
        couponPoint: parseInt(formData.couponPoint as string),
        deletedAt: formData.delete ? new Date() : null,
      },
      where: {
        id: rawFormData.get("id") as string,
      },
    });

    return successResponse("Success", "Success", 200);
  } catch (e: any) {
    return errorResponse("Internal Server Error", 500);
  }
}
