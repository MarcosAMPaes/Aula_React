import PropTypes from 'prop-types';
import CleaveInput from "./CleaveInput";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";

const ProductForm = ({ handleChange, handleFileChange, inputs, errors, categories }) => {
    return (
        <>
            <div className="row">
                <div className="col-12 mb-3">
                    <FormInput 
                        type="text" 
                        field="nome" 
                        label="Nome" 
                        value={inputs?.nome || ''} // Garantir que inputs?.nome seja uma string válida
                        onChange={handleChange} 
                        error={errors?.nome} 
                        autofocus={true} 
                    />
                </div>
                <div className="col-12 mb-3">
                    <FormTextarea 
                        field="descricao" 
                        label="Descrição" 
                        value={inputs?.descricao || ''} // Garantir que inputs?.descricao seja uma string válida
                        onChange={handleChange} 
                        error={errors?.descricao} 
                    />
                </div>
                <div className="col-6 mb-3">
                <CleaveInput
                    type="text"
                    field="preco"
                    label="Preço"
                    value={inputs?.preco?.toString() || ''} // Garantir que seja string
                    onChange={handleChange}
                    error={errors?.preco}
                    options={{
                        numeral: true,
                        numeralThousandsGroupStyle: 'thousand',
                        prefix: 'R$ ',
                        rawValueTrimPrefix: true,
                        delimiter: '.',
                        numeralDecimalMark: ',',
                    }}
                />
                </div>
                <div className="col-6 mb-3">
                <CleaveInput
                    type="text"
                    field="estoque"
                    label="Estoque"
                    value={inputs?.estoque?.toString() || ''} // Garantir que seja string
                    onChange={handleChange}
                    error={errors?.estoque}
                    options={{
                        numeral: true,
                        numeralPositiveOnly: true,
                        numeralThousandsGroupStyle: 'thousand',
                        delimiter: '.',
                        numeralDecimalMark: ',',
                    }}
                />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="id_categoria" className="form-label">Categoria</label>
                    <select
                        id="id_categoria"
                        name="id_categoria"
                        className={`form-select ${errors?.id_categoria ? 'is-invalid' : ''}`}
                        value={inputs?.id_categoria || ''} // Garantir que seja um valor válido
                        onChange={handleChange}
                    >
                        <option value="">Selecione uma categoria</option>
                        {Array.isArray(categories) && categories.length > 0 ? (
                            categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.nome}
                                </option>
                            ))
                        ) : (
                            <option disabled>Sem categorias disponíveis</option>
                        )}
                    </select>
                    {errors?.id_categoria && <div className="invalid-feedback">{errors.id_categoria}</div>}
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="imagem" className="form-label">Foto do Produto (Opcional)</label>
                    <input
                        type="file"
                        id="imagem"
                        name="imagem"
                        className={`form-control ${errors?.imagem ? 'is-invalid' : ''}`}
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    {errors?.imagem && <div className="invalid-feedback">{errors.imagem}</div>}
                </div>
            </div>
        </>
    );
}

ProductForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleFileChange: PropTypes.func,
    inputs: PropTypes.object.isRequired,
    errors: PropTypes.object,
    categories: PropTypes.array,
};

export default ProductForm;
