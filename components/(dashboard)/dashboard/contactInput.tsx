"use client";

import { FormEvent } from "react";

function UpdateAboutUs({ defaultValue }: { defaultValue?: string }) {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/update-about-us", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      alert("Updated");
    } else {
      alert("Failed");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          name="content"
          className="block border px-3 py-1 w-full"
          defaultValue={defaultValue}
          rows={12}
        />
        <button
          className="block w-full px-3 py-1 rounded text-white bg-green-500 hover:bg-green-400"
          type="submit"
        >
          提交
        </button>
      </form>
    </div>
  );
}

export default UpdateAboutUs;
