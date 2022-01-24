import { Field, ErrorMessage } from 'formik'
import React from 'react'

interface InputProps {
  disabled?: boolean
  footnote?: string
  label?: string
  name: string
  type?: string
  [x:string]: any;
}

export const Input: React.FC<InputProps> = ({ 
  disabled = false,
  type = 'text',
  footnote,
  label,
  name,
  ...rest
}): JSX.Element => (
  <div className="flex flex-col justify-start items-start py-1 px-4 ">
    {label && <label className="text-gray-200 text-md font-semibold py-2" htmlFor={name}>{label}</label>}
    <Field
      className={`${!disabled ? "bg-gray-700 text-gray-400 py-1 px-2 border-1 rounded-lg shadow-2xl border-gray-900 font-medium outline-none focus:ring-2 focus:ring-greenish-light" : "opacity-30 bg-gray-700 text-gray-400 py-1 px-2 border-1 rounded-lg shadow-2xl border-gray-900 font-medium cursor-not-allowed outline-none focus:ring-2 focus:ring-danger-dark"}`}
      disabled={disabled}
      name={name}
      type={type}
      {...rest} />
    <small className="text-gray-400 font-medium">{footnote}</small>
    <ErrorMessage
      name={name}
      className="text-danger-light text-sm font-semibold py-1"
      component="div" />
  </div>
);