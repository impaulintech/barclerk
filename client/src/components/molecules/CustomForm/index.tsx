import React, { FC } from 'react'
import { useField } from 'formik'
import { Eye, EyeOff } from 'react-feather'

type Props = {
  name: string
  type: string
  label: string
  className?: string
  placeholder: string
  isPassHidden?: boolean
  defaultValue?: string
  setIsPassHidden?: (value: boolean) => void
}

const CustomForm: FC<Props> = ({
  label,
  className,
  isPassHidden,
  defaultValue,
  setIsPassHidden = () => {},
  ...props
}): JSX.Element => {
  const [field, meta] = useField(props)
  const { touched, error } = meta

  return (
    <div className="w-full space-y-1">
      <label htmlFor="last_name" className="block text-md font-medium text-slate-700 text-sm">
        {label} <small className="text-failed">*</small>
      </label>
      <div>
        <div className="relative">
          <input
            {...field}
            {...props}
            value={field?.value || defaultValue || ''}
            className={`
              placeholder-text-failed   
              outline-none focus:ring-1 focus:border-failed
              block w-full h-[33px] rounded-md border-[2px] border-slate-400 
              ${touched && error && 'text-failed !border-failed'}
              ${className}
            `}
          />
          {props.name === 'password' && (
            <button
              type="button"
              className="group absolute inset-y-0 right-0 block overflow-hidden rounded-r px-4 outline-none transition duration-75 ease-in-out"
              onClick={() => setIsPassHidden(!isPassHidden)}
            >
              {isPassHidden ? (
                <EyeOff className="h-4 w-4 text-slate-600 group-hover:text-slate-500 marker:group-focus:text-slate-900" />
              ) : (
                <Eye className="h-4 w-4 text-slate-600 group-hover:text-slate-500 group-focus:text-slate-900" />
              )}
            </button>
          )}
        </div>
      </div>
      {touched && error && <span className="text-failed font-medium text-xs pl-1">{error}</span>}
    </div>
  )
}

export default CustomForm
