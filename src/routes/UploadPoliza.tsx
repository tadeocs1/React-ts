import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Poliza {
  id: number;
  name: string;
  url: string;
}

export default function UploadPoliza() {
  const [polizas, setPolizas] = useState<Poliza[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    // Obtener las pólizas desde el archivo JSON a través del servidor local
    axios.get('http://localhost:5000/api/data')
      .then(response => setPolizas((response.data as { polizas: Poliza[] }).polizas))
      .catch(error => console.error('Error al obtener las pólizas:', error));
  }, []);

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

    try {
      const response = await axios.post<{ id: number; name: string; url: string }>('http://localhost:5000/api/polizas', {
        name: file.name,
        url: URL.createObjectURL(file), // Simulación de URL
      });
      setPolizas([...polizas, response.data]);
      setUploadSuccess(true);
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('Error al subir el archivo.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/polizas/${id}`);
      setPolizas(polizas.filter(poliza => poliza.id !== id));
    } catch (error) {
      console.error('Error al borrar la póliza:', error);
      alert('Error al borrar la póliza.');
    }
  };

  return (
    <div>
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
                <button onClick={() => window.open(poliza.url, '_blank')}>Descargar</button>
                <button onClick={() => handleDelete(poliza.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}