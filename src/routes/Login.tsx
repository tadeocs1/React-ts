import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import logoSetues from "../img/logo_setues.png";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);
    const location = useLocation();
    const error = new URLSearchParams(location.search).get('error');
    const auth = useAuth();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        auth.login(email, password);
        setRedirectToDashboard(true);
    };

    if (redirectToDashboard) {
        return <Navigate to="/protected/dashboard" />;
    }

    return (
        <DefaultLayout>
            <div className="index-body">
                <div className="Welcome d-flex justify-content-between">
                    <div className="texts d-flex align-items-center">
                        <img src={logoSetues} alt="logo ues" className="logo" />
                        <h1>Inicio de sesión</h1>
                    </div>
                </div>
                <nav></nav>

                <section className="section-login">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center div-form-login">
                            <div className="card shadow-2-strong vh-80 p-5 form-container" style={{ borderRadius: '1rem' }}>
                                <div className="card-body pt-5 pl-5 pr-5 text-center">
                                    <div className="mb-5 title-login">ACCESO</div>
                                    {error && (
                                        <p className="error">{error}</p>
                                    )}
                                    <form className="formulario" onSubmit={handleSubmit}>
                                        <div className="campo">
                                            <input
                                                className="form-control form-control-lg"
                                                type="email"
                                                placeholder="Tu Email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="campo">
                                            <input
                                                className="form-control form-control-lg input__pass"
                                                type="password"
                                                placeholder="***********"
                                                id="password"
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <hr />
                                        <div className="campo d-flex align-items-center justify-content-between">
                                            <a className="a-login" href="/signup">Registrarse</a>
                                            <input type="submit" value="Entrar" className="btn btn-lg btn-block btn-login_submit" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </DefaultLayout>
    );
}