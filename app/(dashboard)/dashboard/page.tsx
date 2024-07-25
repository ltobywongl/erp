import SalesChart from "@/components/(dashboard)/dashboard/chart";
import UpdateAboutUs from "@/components/(dashboard)/dashboard/contactInput";
import DropImageBanner from "@/components/(dashboard)/dashboard/dropImageBanner";
import DropImagePopup from "@/components/(dashboard)/dashboard/dropImagePopup";
import prisma from "@/utils/prisma";
export default async function Page() {
  const userCount = await prisma.user.count({
    where: {
      role: "user",
      deletedAt: null,
    },
  });

  const dailySales: any[] =
    await prisma.$queryRawUnsafe(`SELECT DATE(created_at) AS saleDate, SUM(total_price) AS dailySales
FROM orders WHERE created_at >= NOW() - INTERVAL 7 DAY GROUP BY saleDate ORDER BY saleDate ASC`);

  const about = await prisma.websiteContent.findUnique({
    select: {
      content: true,
    },
    where: {
      key: "about-us",
    },
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 [&>div]:border [&>div]:rounded-md [&>div]:p-2 [&>div]:bg-slate-50 overflow-y-scroll custom-scrollbar">
      <div className="col-span-1">
        <div className="font-bold text-xl">
          <span>會員人數:</span>
          <span>{userCount}</span>
        </div>
      </div>
      <div className="col-span-2">
        <div className="font-bold">銷售</div>
        <div>
          <SalesChart
            formatDate={true}
            xAxis={[
              {
                data: dailySales.map((d) => d.saleDate),
                scaleType: "time",
              },
            ]}
            series={[{ data: dailySales.map((d) => parseInt(d.dailySales)) }]}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>
      </div>
      <div className="col-span-1">
        <div className="font-bold">彈出式廣告</div>
        <DropImagePopup />
      </div>
      <div className="col-span-1">
        <div className="font-bold">Banner</div>
        <DropImageBanner />
      </div>
      <div className="col-span-1">
        <div className="font-bold">關於我們</div>
        <UpdateAboutUs defaultValue={about?.content} />
      </div>
      <div className="col-span-3"></div>
    </div>
  );
}
