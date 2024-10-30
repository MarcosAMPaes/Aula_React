import { Form } from "react-router-dom"
import FormInput from "./FormInput"
import FormTextArea from "./FormTextArea"
import CleaveInput from "./CleaveInput"

const ProductForm = ({ handleChange, inputs, errors, isNew}) => {
  return (
    
    <>
        <div className="row">
            <div className="col-12 mb-3">
                <FormInput type="text" field="nome" label="Nome" onChange={handleChange} value={inputs.nome} error={errors?.nome} autofocus={true}/>
                <CleaveInput type="text" field="preco" label="Preço" onChange={handleChange} value={inputs.preco} error={errors?.preco} options={{ numeral: true, numeralThousandsGroupStyle: 'thousand', prefix: 'R$ ',rawValueTrimPrefix: true}}/>
                <FormTextArea field="descricao" label="Descricão" onChange={handleChange} value={inputs.descricao} error={errors?.descricao}/>
                <FormInput type= "number" field={"estoque"} label="Estoque" onChange={handleChange} value={inputs.estoque} error={errors?.estoque}/>
            </div>
        </div>
    </>
  )
}

export default ProductForm