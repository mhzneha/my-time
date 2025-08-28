import React, { ChangeEvent } from "react";
type InputType = {
  type: string;
  name: string;
  value: string;
  id: string;
  placeholder: string;
  onchangeInput: Function;
  ref?: React.Ref<HTMLInputElement>;
};
export default function InputText(props: InputType) {
  return (
    <div>
      <input
        className=" border border-blue-400 px-3 py-1 rounded-[8px] text-[18px]"
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          props.onchangeInput(e);
        }}
        ref={props.ref}
      />
    </div>
  );
}
