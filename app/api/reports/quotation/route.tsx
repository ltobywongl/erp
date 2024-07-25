import { renderToBuffer } from "@react-pdf/renderer";
import Quotation from "@/components/pdfs/quotation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { errorResponse } from "@/utils/httpResponse";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return errorResponse("Unauthorized", 401);
  }

  const searchParams = request.nextUrl.searchParams;
  const amount = searchParams.get("amount");
  const date = searchParams.get("date");
  const items = JSON.parse(searchParams.get("items") || "[]");

  console.log(items);

  const pdf = await renderToBuffer(
    <Quotation
      props={{
        amount: Number(amount),
        date: date || "",
        items: items,
      }}
    />
  );

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
