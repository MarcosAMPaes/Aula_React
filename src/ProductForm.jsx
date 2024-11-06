
import FormInput from "./FormInput"
import FormTextArea from "./FormTextArea"
import CleaveInput from "./CleaveInput"

const ProductForm = ({ handleChange, inputs, errors, isNew}) => {
  return (
    
    <>
        <div className="row">
            <div className="col-12 mb-3">
                <FormInput type="text" field="nome" label="Nome" onChange={handleChange} value={inputs.nome} error={errors?.nome} autofocus={true}/>
            </div>
            <div className="col-12 mb-3">
                <CleaveInput type="text" field="preco" label="Preço" onChange={handleChange} value={inputs.preco} error={errors?.preco} options={{ numeral: true, numeralThousandsGroupStyle: 'thousand', prefix: 'R$ ', rawValueTrimPrefix: true, delimiter:'.', numeralDecimalMark:','}}/>
            </div>
            <div className="col-6 mb-3">
                <FormTextArea field="descricao" label="Descricão" onChange={handleChange} value={inputs.descricao} error={errors?.descricao}/>
            </div>
            <div className="col-6 mb-3">
                <CleaveInput 
                    type="text" 
                    field="estoque" 
                    label="Estoque" 
                    onChange={handleChange} 
                    value={inputs.estoque} 
                    error={errors?.estoque} 
                    options={{ 
                        numeral: true, 
                        numeralPositiveOnly: true,
                        delimiter: '.',
                        numeralDecimalMark: ',',
                    }}
                />
            </div>
        </div>
    </>
  )
}

export default ProductForm