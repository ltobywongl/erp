import NavigationHandler from "@/ui/navigationBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if (session?.user) return <NavigationHandler children={children} />;
  else return redirect("/signin");
}
