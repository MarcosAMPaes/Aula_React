function handleChange(event, inputs, setInputs) { 
    if (event.target.type === "checkbox") { 
        const value = event.target.checked; 
        const name = event.target.name; 
        setInputs({ ...inputs, [name]: value }); 
    } else { 
        const value = event.target.rawValue ? event.target.rawValue : event.target.value; 
        const name = event.target.name; 
        setInputs({ ...inputs, [name]: value }); 
    } 
} 
 
export default handleChange; 