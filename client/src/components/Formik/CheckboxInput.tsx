import { Field, ErrorMessage, FieldProps } from 'formik'
import React, { useRef } from 'react'

interface CheckboxProps {
  disabled?: boolean
  footnote?: string
  label?: string
  name: string
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  disabled = false, 
  footnote,
  label,
  name
}): JSX.Element => {
  const checkboxRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  return (
    <div className="w-full md:1/2">
      <div className="flex flex-row items-center justify-center gap-8 py-4 px-4">
        {label && <label htmlFor={name} className="text-gray-200 text-base font-medium w-full">{label}</label>}
        <div className="relative">
          <Field  name={name}>
          {
            (props: FieldProps) => (<input checked={props.field.value} disabled={disabled} {...props.field} ref={checkboxRef} className="hidden" type="checkbox" />)
          }
          </Field>
          <div className="switch-bg"></div>
          <div onClick={() => checkboxRef.current.click()} className="switch-dot"></div>
        </div>
      </div>
      <small className="form-text text-muted">{footnote}</small>

      <ErrorMessage 
        name={name}
        className="invalid-feedback"
        component="div"
      />
    </div>
  )
}