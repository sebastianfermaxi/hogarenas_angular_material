import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Carrito } from 'src/app/models/Carrito';
import { Producto } from 'src/app/models/Producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})

export class InicioComponent implements OnInit {

  listaProductos: Producto[] = [];

  constructor(private productoService: ProductosService,
              private carritoService: CarritoService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    const carrito = JSON.parse(localStorage.getItem('carrito')!) || [];
    this.carritoService.carritoStorage(carrito);
    this.productoService.obtenerProductos().subscribe(data => {
      this.listaProductos = data;
    })
  }

  addCarrito(producto : any){

    const productoCarrito:Carrito ={
      nombre : producto.nombre,
      _id : producto._id,
      cantidad: 1,
      precio: producto.precio
    }
    this.carritoService.agregarProductoCarrito(productoCarrito);
    this.snackBar.open('Agregado al carrito', '', {duration:700});

  }

}
