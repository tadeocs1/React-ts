import { useState } from "react";
import { Navigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToLogin, setRedirectToLogin] = useState(true);
    const auth = useAuth();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await auth.register(email, password);
            setRedirectToLogin(true);
        } catch (error) {
            alert('Error al registrar el usuario');
        }
    };

    if (redirectToLogin) {
        return <Navigate to="/" />;
    }

    return (
        <DefaultLayout>
            <div className="index-body">
                <div className="Welcome d-flex justify-content-between">
                    <div className="texts d-flex align-items-center">
                        <img src="path/to/logo.png" alt="logo ues" className="logo" />
                        <h1>Registro</h1>
                    </div>
                </div>
                <nav></nav>

                <section className="section-login">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center div-form-login">
                            <div className="card shadow-2-strong vh-80 p-5 form-container" style={{ borderRadius: '1rem' }}>
                                <div className="card-body pt-5 pl-5 pr-5 text-center">
                                    <div className="mb-5 title-login">REGISTRO</div>
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
                                            <input type="submit" value="Registrar" className="btn btn-lg btn-block btn-login_submit" />
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