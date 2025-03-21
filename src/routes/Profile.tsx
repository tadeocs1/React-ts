import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import logosetues from "../img/Logo_setues.png";

export default function Profile() {
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Aquí puedes hacer una llamada a tu API para obtener la información del usuario
        // Ejemplo:
        // fetch('/api/user')
        //     .then(response => response.json())
        //     .then(data => {
        //         setEmail(data.email);
        //         setPassword(data.password);
        //     });
    }, []);

    if (!auth.isAuthenticated) {
        return <Navigate to="/" />;
    }

    const handleLogout = () => {
        auth.logout();
        navigate('/');
    };

    interface UpdateEvent extends React.FormEvent<HTMLFormElement> {}

    const handleUpdate = async (event: UpdateEvent): Promise<void> => {
        event.preventDefault();

        try {
            // Aquí puedes hacer una llamada a tu API para actualizar la información del usuario
            // Ejemplo:
            // const response = await fetch('/api/user', {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ email, password }),
            // });
            // const data = await response.json();
            // setMessage('Información actualizada con éxito');

            // Simulación de actualización exitosa
            setMessage('Información actualizada con éxito');
        } catch (error) {
            console.error('Error al actualizar la información:', error);
            setMessage('Error al actualizar la información');
        }
    };

    return (
        <div>
            <div className="Welcome d-flex justify-content-between">
                <div className="texts d-flex align-items-center">
                    <img src={logosetues} alt="logo ues" className="logo" />
                    <h1>Portal personal</h1>
                </div>
                <div className="texts t2 d-flex align-items-end flex-column pr-5">
                    <h1>Bienvenid@, {"usuario"}</h1>
                    <div className="links">
                        <a className="text-decoration-none text-white pr-5" href="/protected/profile">Perfil</a>
                        <button className="btn-logout text-decoration-none pr-4" onClick={handleLogout}>Cerrar Sesion</button>
                    </div>
                </div>
            </div>
            <nav>
                <ul className="menu">
                    <li><a href="/protected/dashboard">Home</a></li>
                    <li>
                        <a href="#">Servicios</a>
                        <ul>
                            <li><a className="sublista" href="/protected/poliza-control">Control de polizas</a></li>
                            <li><a className="sublista" href="/registerEmployee">Control de profesores</a></li>
                        </ul>
                    </li>
                    { (
                        <li>
                            <a href="#">Control de usuarios</a>
                            <ul>
                                <li><a className="sublista" href="/user-control/users">Lista de usuarios</a></li>
                                <li><a className="sublista" href="/user-control/create">Alta de usuarios</a></li>
                            </ul>
                        </li>
                    )}
                </ul>
            </nav>
            <h1>Perfil de Usuario</h1>
            <form onSubmit={handleUpdate}>
                <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Actualizar Información</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}