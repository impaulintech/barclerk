import React from "react";
import { useField } from "formik";
import { Eye, EyeOff } from "react-feather";

type Props = {
  name: string
  type: string
  label: string
  className?: string
  placeholder: string
  isPassHidden?: boolean
  defaultValue?:string
  setIsPassHidden?: (value: boolean) => void
}

const CustomForm = ({
  label,
  className,
  isPassHidden,
  defaultValue,
  setIsPassHidden = () => { },
  ...props
}: Props) => {
  const [field, meta] = useField(props);
  const { touched, error } = meta;

  return (
    <div className="w-full">
      <label htmlFor="last_name" className="block text-md font-medium text-dark">
        <small className="text-failed">*</small> {label}
      </label>
      <div>
        <div className="relative">
          <input
            {...field}
            {...props} 
            value={field?.value || defaultValue || ""}
            className={`
              px-2 pb-1
              placeholder-text-failed   
              outline-none focus:ring-1 focus:border-failed
              block w-full h-[36px] rounded-sm border-[2px] border-blue-400 py-0.5 
              ${touched && error && "text-failed !border-failed"}
              ${className}
            `}
          />
          {props.name === "password" && (
            <button
              type="button"
              className="group absolute inset-y-0 right-0 block overflow-hidden rounded-r px-4 outline-none transition duration-75 ease-in-out"
              onClick={() => setIsPassHidden(!isPassHidden)}
            >
              {isPassHidden
                ? <EyeOff className="h-4 w-4 text-slate-600 group-hover:text-slate-500 marker:group-focus:text-slate-900" />
                : <Eye className="h-4 w-4 text-slate-600 group-hover:text-slate-500 group-focus:text-slate-900" />}
            </button>
          )}
        </div>
      </div>
      {touched && error && <span className="text-failed font-medium">{error}</span>}
    </div>
  );
};

export default CustomForm;
