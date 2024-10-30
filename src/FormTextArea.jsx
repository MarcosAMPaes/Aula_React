import React from 'react'

const FormTextArea = ({  field, onChange, label, value, error, autofocus = false}) => {
  return (
    <>
        <div className="form-floating">
            <textarea
                id={field}
                name={field}
                placeholder=""
                className={`form-control ${error && 'is-invalid'}`}
                onChange={onChange}
                autoFocus={autofocus} style={{height: '6rem'}}>value={value || ''}</textarea>
            <label htmlFor={field}>{label}</label>
        </div>
        {error && <div className="invalid-feedback">{error}</div>}
    </>
  )
}

export default FormTextArea