import { Field, ErrorMessage } from 'formik'
import React from 'react'

export interface Option {
  label: string
  value: string
}

export interface SelectProps {
  className?: string
  disabled?: boolean
  footnote?: string
  label?: string
  name: string
  options: Option[]
}

export const Select: React.FC<SelectProps> = ({ 
  disabled = false,
  footnote,
  label,
  name,
  options
}): JSX.Element => (
  <div className="flex flex-col justify-start items-start py-1 px-4 ">
    {label && <label className="text-gray-200 text-md font-semibold py-2" htmlFor={name}>{label}</label>}
    <Field
      name={name}
      className="bg-gray-700 text-gray-300 py-1 px-2 border-1 rounded-lg shadow-2xl border-gray-900 font-medium outline-none focus:ring-2 focus:ring-greenish-light"
      component="select"
      disabled={disabled}
    >
      {options.map(({ label, value }) => (
        <option className="font-semibold text-sm hover:shadow-none" key={value} value={value}>{label}</option>
      ))}
    </Field>
    <small className="text-gray-400 font-medium">{footnote}</small>
    <ErrorMessage
      name={name}
      className="text-danger-light text-sm font-semibold py-1"
      component="div" />
  </div>
);