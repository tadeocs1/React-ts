const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 5001;

// Middleware
app.use(bodyParser.json());

// Ruta para obtener usuarios
app.get('/api/users', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  res.json(data.users);
});

// Ruta para agregar un usuario
app.post('/api/users', (req, res) => {
  const { username, password } = req.body;
  const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

  // Verificar si el usuario ya existe
  const userExists = data.users.some(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Agregar el nuevo usuario
  data.users.push({ username, password });
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json({ message: 'Usuario agregado con éxito' });
});

// Ruta para obtener pólizas
app.get('/api/polizas', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  res.json(data.polizas);
});

// Ruta para agregar una póliza
app.post('/api/polizas', (req, res) => {
  const { name, url } = req.body;
  const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

  // Agregar la nueva póliza
  const newPoliza = { id: data.polizas.length + 1, name, url };
  data.polizas.push(newPoliza);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json(newPoliza);
});

// Ruta para eliminar una póliza
app.delete('/api/polizas/:id', (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

  // Filtrar las pólizas
  data.polizas = data.polizas.filter(poliza => poliza.id !== parseInt(id));
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json({ message: 'Póliza eliminada con éxito' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});