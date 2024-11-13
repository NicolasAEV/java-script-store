// imports
import { carritos } from './object.js';

export default class Productos {
    constructor(id, cantidad = 1, nombre = '', descripcion = '', precio = 9999999, imagen = '', categoria = '', stock = 0) {
        this.id = id;
        this.cantidad = cantidad;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.categoria = categoria;
        this.stock = stock;
    }

    // Guardar en el localStorage
    static saveToLocalStorage() {
        localStorage.setItem('carritos', JSON.stringify(carritos));
    }

    // Obtener todos los productos
    static getProductos() {
        return carritos;
    }

    // Obtener un solo producto
    static getProductoById(id) {
        return carritos.find(producto => producto.id === id);
    }

    // Agregar un producto
    addProducto() {
        // Validación: Solo agregar si el producto no existe
        const existingProduct = Productos.getProductoById(this.id);
        if (existingProduct) {
            throw new Error('Producto ya existe en el carrito');
        }

        // Agregar el producto
        const newProducto = {
            id: this.id,
            cantidad: this.cantidad,
            nombre: this.nombre,
            descripcion: this.descripcion,
            precio: this.precio,
            imagen: this.imagen,
            categoria: this.categoria,
            stock: this.stock
        };

        carritos.push(newProducto);
        Productos.saveToLocalStorage();
        return newProducto;
    }

    // Actualizar un producto
    updateProducto() {
        const productoIndex = carritos.findIndex(producto => producto.id === this.id);
        if (productoIndex === -1) {
            throw new Error('Producto no encontrado');
        }

        // Actualizar el producto con nuevos valores
        carritos[productoIndex] = {
            ...carritos[productoIndex], // Copiar el objeto anterior
            nombre: this.nombre,
            descripcion: this.descripcion,
            precio: this.precio,
            imagen: this.imagen,
            categoria: this.categoria,
            stock: this.stock
        };

        Productos.saveToLocalStorage();
        return carritos[productoIndex];
    }

    // Eliminar un producto
    deleteProducto() {
        const productoIndex = carritos.findIndex(producto => producto.id === this.id);
        if (productoIndex === -1) {
            throw new Error('Producto no encontrado');
        }

        // Eliminar el producto
        carritos.splice(productoIndex, 1);
        Productos.saveToLocalStorage();
        return carritos;
    }
}
