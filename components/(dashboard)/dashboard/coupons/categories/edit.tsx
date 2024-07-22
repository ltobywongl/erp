"use client";
import LoadingSpinner from "@/components/ui/spinner";
import { CouponCategory } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Form({
  couponCategory,
}: {
  couponCategory?: CouponCategory;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/coupons/categories/edit", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
    } else {
      router.push("/dashboard/coupons/categories");
    }
    setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-center">
      <form
        className="w-2/3 h-2/3 p-6 border border-slate-300 rounded-md flex flex-col gap-4 overflow-y-scroll custom-scrollbar"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-2xl font-bold">Edit Coupon Category</h1>
        <div>
          <label htmlFor="id">Id</label>
          <input
            id="id"
            name="id"
            type="text"
            defaultValue={couponCategory?.id}
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={couponCategory?.name ?? ""}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            defaultValue={couponCategory?.description ?? ""}
          />
        </div>
        <div>
          <label htmlFor="value">Value</label>
          <input
            id="value"
            name="value"
            type="number"
            step="0.01"
            defaultValue={Number(couponCategory?.value) ?? 0}
          />
        </div>
        <div>
          <label htmlFor="point">Point(s) to exchange</label>
          <input
            id="point"
            name="point"
            type="number"
            step="0.01"
            defaultValue={couponCategory?.point}
          />
        </div>
        <div>
          <label htmlFor="active">Active</label>
          <div>
            <input
              id="active"
              name="active"
              type="checkbox"
              defaultChecked={couponCategory?.active === true}
            />
          </div>
        </div>
        <div>
          <label htmlFor="delete">Delete this category</label>
          <div>
            <input
              id="delete"
              name="delete"
              type="checkbox"
              defaultChecked={couponCategory?.deletedAt ? true : false}
            />
          </div>
        </div>
        <p className="text-sm text-red-500">{error}</p>
        <button
          className="w-full bg-blue-500 hover:bg-blue-400 text-white text-center px-3 py-1 rounded-md mt-auto"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : "Submit"}
        </button>
      </form>
    </div>
  );
}
