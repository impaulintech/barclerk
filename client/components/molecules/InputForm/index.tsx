import React from "react"; 

const InputForm = ({form}: { form: any }) => {
  const { htmlFor, label, type, error, name } = form;

  return (
    <div>
      <label htmlFor={htmlFor} className="block text-md font-medium text-white">
        <small className="text-rose-600">*</small> {label}
      </label>
      <input
        type={type}
        name={name}
        className={` 
          block w-full h-[36px] rounded-sm border-[2px] border-barclerk-light py-0.5 text-slate-900 outline-none focus:ring-1 focus:border-barclerk-30
          ${error && "border-barclerk-10"}
        `}
      />
      {error && <span className="text-barclerk-10">{`error`}</span>}
    </div>
  );
};

export default InputForm;
