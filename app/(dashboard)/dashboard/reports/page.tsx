import NotFound from "@/app/not-found";
import TaskList from "@/components/(dashboard)/dashboard/tasks/list";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";

async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <NotFound />;
  }

  return (
    <div className="p-2 h-full flex flex-col gap-1">
      <div className="flex gap-2">
        <Link
          href={"/dashboard/tasks/create"}
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg"
        >
          Purchase Order
        </Link>
        <Link
          href={"/dashboard/tasks/create"}
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg"
        >
          Quotation
        </Link>
        <Link
          href={"/dashboard/tasks/create"}
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg"
        >
          Invoice
        </Link>
      </div>
    </div>
  );
}

export default Page;
