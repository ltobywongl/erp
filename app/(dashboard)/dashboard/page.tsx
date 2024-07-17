export default function Home() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 [&>div]:border [&>div]:rounded-md [&>div]:p-2 [&>div]:bg-slate-100">
      <div className="col-span-3">
        <div className="font-bold text-xl">
          <span>會員人數:</span>
          <span>0</span>
        </div>
        <div className="font-bold text-xl">
          <span>新加入會員人數(一個月內):</span>
          <span>0</span>
        </div>
      </div>
      <div className="col-span-1"></div>
      <div className="col-span-2"></div>
      <div className="col-span-2"></div>
      <div className="col-span-1"></div>
    </div>
  );
}
