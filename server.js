const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const productos = [
    { id: 1, nombre: "Laptop", precio: 14500, categoria: "Tecnología" },
    { id: 2, nombre: "Mouse Gamer", precio: 650, categoria: "Accesorios" },
    { id: 3, nombre: "Teclado Mecánico", precio: 1200, categoria: "Accesorios" },
    { id: 4, nombre: "Monitor 24 pulgadas", precio: 3200, categoria: "Tecnología" },
    { id: 5, nombre: "Audífonos Bluetooth", precio: 980, categoria: "Audio" }
];

app.get('/api/productos', (req, res) => {
    setTimeout(() => {
        res.json(productos);
    }, 1500);
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});