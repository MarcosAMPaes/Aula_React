import api from "./axiosApi";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import login from "./authService";


function Home() {
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        if (login(inputs.email, inputs.senha)) {
            navigate("/products");
        }
        else {
            setErrors({ email: 'Email ou senha inválidos!', senha: 'Email ou senha inválidos!' });
            setLoading(false);
        }
    }

    function handleChange(event, inputs, setInputs) {
        if (event.target.type === 'checkbox') {
            const value = event.target.checked;
            const name = event.target.name;
            setInputs({ ...inputs, [name]: value });
        } else {
            const value = event.target.rawValue ? event.target.rawValue : event.target.value;
            const name = event.target.name;
            setInputs({ ...inputs, [name]: value });
        }
    }

    return (
        <>
            <h1>Página Principal</h1>
            <hr />
            <h2 className="text-center">Login</h2>
            <form method="post" onSubmit={handleSubmit} noValidate autoComplete="off">
                <div className={`form-control ${errors?.email ? "is-invalid" : "is-valid"}`}>
                    <input type="email" className="form-control" id="email" name="email" value={inputs.email || ''} onChange={(event) => handleChange(event, inputs, setInputs)} placeholder=" " />
                    <label htmlFor="email">Email</label>
                </div>
                <div className={`form-control ${errors?.senha ? "is-invalid" : "is-valid"}`}>
                    <input type="password" className="form-control" id="password" name="senha" value={inputs.senha || ''} onChange={(event) => handleChange(event, inputs, setInputs)} placeholder=" " />
                    <label htmlFor="password">Senha</label>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Entrar</button>
                </div>
            </form>
        </>
    );
}

export default Home;