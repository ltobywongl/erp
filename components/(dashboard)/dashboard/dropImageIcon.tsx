"use client";

import LoadingSpinner from "@/components/ui/spinner";
import { FormEvent, ChangeEvent, useState } from "react";

function DropImageIcon() {
  const [isLoading, setIsLoading] = useState(false);
  const [previewFile, setPreviewFile] = useState<string>(
    "https://erp-shop-public.s3.ap-northeast-1.amazonaws.com/images/icon.jpg"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append("path", `images/icon.jpg`);
    formData.append("bucket", "erp-shop-public");
    const res = await fetch("/api/upload-file", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      alert("Uploaded");
    } else {
      alert("Failed");
    }
    setIsLoading(false);
  }

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setPreviewFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <div>
      <div>
        <img
          src={previewFile}
          className="aspect-square h-72 w-72 object-contain border"
          alt="Icon"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          accept="image/jpeg"
          className="block border px-3 py-1 w-full"
          onChange={(e) => changeHandler(e)}
        />
        <button
          className="block w-full px-3 py-1 rounded text-white bg-green-500 hover:bg-green-400"
          type="submit"
        >
          {isLoading ? <LoadingSpinner /> : "提交"}
        </button>
      </form>
    </div>
  );
}

export default DropImageIcon;
