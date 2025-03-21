import { useAuth } from '../auth/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import logosetues from "../img/Logo_setues.png";


export default function Dashboard() {
    const auth = useAuth();
    const navigate = useNavigate();

    if (!auth.isAuthenticated) {
        return <Navigate to="/" />;
    }

    const handleLogout = () => {
        auth.logout();
        navigate('/');
    };

    return (
        <div>
            <title >Inicio</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
            <div className="container_logo"></div>
        </div>
    );
}