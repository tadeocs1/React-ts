import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import logosetues from "../img/Logo_setues.png";

interface Poliza {
    id: number;
    name: string;
    url: string;
}

export default function PolizaControl() {
    const auth = useAuth();
    const [polizas, setPolizas] = useState<Poliza[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Aquí puedes hacer una llamada a tu API para obtener las pólizas
        // Ejemplo:
        // fetch('/api/polizas')
        //     .then(response => response.json())
        //     .then(data => setPolizas(data));
    }, []);

    if (!auth.isAuthenticated) {
        return <Navigate to="/" />;
    }

    const handleLogout = () => {
        auth.logout();
        navigate('/');
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) {
            alert('Por favor, selecciona un archivo.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Aquí puedes hacer una llamada a tu API para subir el archivo
            // Ejemplo:
            // const response = await fetch('/api/upload', {
            //     method: 'POST',
            //     body: formData,
            // });
            // const data = await response.json();
            // setPolizas([...polizas, data]);

            // Simulación de subida exitosa
            const newPoliza = {
                id: polizas.length + 1,
                name: file.name,
                url: URL.createObjectURL(file),
            };
            setPolizas([...polizas, newPoliza]);
            setUploadSuccess(true);
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            alert('Error al subir el archivo.');
        }
    };

    const handleDownload = (url: string) => {
        // Lógica para descargar la póliza
        window.open(url, '_blank');
    };

    const handleDelete = (id: number) => {
        // Lógica para borrar la póliza
        // Ejemplo:
        // fetch(`/api/polizas/${id}`, { method: 'DELETE' })
        //     .then(() => setPolizas(polizas.filter(poliza => poliza.id !== id)));

        setPolizas(polizas.filter(poliza => poliza.id !== id));
    };

    const handleEdit = (id: number) => {
        // Lógica para editar la póliza
        // Redirigir a una página de edición o mostrar un formulario de edición
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
                        <a className="text-decoration-none text-white pr-5" href="/profile">Perfil</a>
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
                            <li><a className="sublista" href="/protected/upload">Subida de polizas</a></li>
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
            <h1>Control de Pólizas</h1>
            <form onSubmit={handleUpload}>
                <div>
                    <label htmlFor="file">Selecciona un archivo PDF:</label>
                    <input type="file" id="file" accept="application/pdf" onChange={handleFileChange} />
                </div>
                <button type="submit">Subir</button>
            </form>
            {uploadSuccess && <p>Archivo subido con éxito.</p>}
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {polizas.map(poliza => (
                        <tr key={poliza.id}>
                            <td>{poliza.name}</td>
                            <td>
                                <button onClick={() => handleDownload(poliza.url)}>Descargar</button>
                                <button onClick={() => handleDelete(poliza.id)}>Borrar</button>
                                <button onClick={() => handleEdit(poliza.id)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}