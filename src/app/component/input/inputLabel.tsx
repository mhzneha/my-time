import React from "react";

type LabelType = {
  label: string;
};
export default function InputLabel({ label = "" }: LabelType) {
  return (
    <div>
      <label className="font-bold text-[20px] p-1 min-w-14 text-gray-700">
        {label}
      </label>
    </div>
  );
}
