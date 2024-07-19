import { authOptions } from "@/utils/authOptions";
import { errorResponse, successResponse } from "@/utils/httpResponse";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const user = await getServerSession(authOptions);

    if (!user?.user.role || user.user.role !== "admin") {
      return errorResponse("Unauthorized", 401);
    }

    const rawFormData = await request.formData();
    const formData = {
      id: rawFormData.get("id"),
      name: rawFormData.get("name"),
      description: rawFormData.get("description"),
      value: rawFormData.get("value"),
      active: rawFormData.get("active"),
      point: rawFormData.get("point"),
    };

    if (
      !formData.id ||
      !formData.name ||
      !formData.description ||
      !formData.value ||
      !formData.point ||
      formData.active === undefined
    ) {
      return errorResponse("Bad Request", 400);
    }

    await prisma.couponCategory.update({
      data: {
        name: formData.name as string,
        point: parseInt(formData.point as string),
        description: formData.description as string,
        active: Boolean(formData.active),
        value: parseFloat(formData.value as string),
      },
      where: {
        id: formData.id as string,
      },
    });

    return successResponse("Success", "Success", 200);
  } catch (e: any) {
    return errorResponse("Internal Server Error", 500);
  }
}
