"use client";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";

const initialState = {
  message: "",
};

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/coupons/categories/create", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
    } else {
      redirect("/dashboard/coupons/categories");
    }
    setIsLoading(false);
  }

  return (
    <div className="p-2 flex items-center justify-center">
      <form
        className="w-2/3 p-6 border border-slate-300 rounded-md flex flex-col gap-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-2xl font-bold">Create Coupon Category</h1>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input id="description" name="description" type="text" />
        </div>
        <div>
          <label htmlFor="value">Value</label>
          <input id="value" name="value" type="number" step="0.01" />
        </div>
        <p className="text-sm text-red-500">{error}</p>
        <button
          className="w-full bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded-md"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
