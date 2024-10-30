import Cleave from "cleave.js/react"; 
import "cleave.js/dist/addons/cleave-phone.br"; 
 
const CleaveInput = ({ type, field, onChange, options, label, value, error }) => { 
    return ( 
        <> 
            <div className="form-floating mt-3"> 
                <Cleave type={type} className={`form-control ${error ? "is-invalid" : "is-valid"}`} id={field} name={field} placeholder=" " onChange={onChange} options={options} value={value} /> 
                <label htmlFor={field}>{label}</label> 
            </div> 
            {error && <p className="m-0 small text-danger">{error}</p>} 
        </> 
    ); 
}; 
 
export default CleaveInput;