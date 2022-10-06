import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/models/Carrito';
import { Cliente } from 'src/app/models/Cliente';
import { CarritoService } from 'src/app/services/carrito.service';
import { ComprarService } from 'src/app/services/comprar.service';

@Component({
  selector: 'app-comprar-carrito',
  templateUrl: './comprar-carrito.component.html',
  styleUrls: ['./comprar-carrito.component.scss']
})
export class ComprarCarritoComponent implements OnInit {

  listaCarrito: Carrito[] = [];

  displayedColumns: string[] = ['cantidad', 'nombre', 'precio', 'subtotal','borrar'];

  total: number = 0;

  divComprar: boolean = false;

  form: FormGroup;

  datosCliente!: Cliente;

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private carritoService: CarritoService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private route : Router,
              private comprarService: ComprarService) {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      nota: [''],
    })

  }

  ngOnInit(): void {
    const carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!) || [];
    this.carritoService.carritoStorage(carrito);
    this.listaCarrito= carrito;
    this.carritoService.getCarrito().subscribe(data=>{
      this.listaCarrito = data;
      this.table.renderRows();
      this.total=0;
      this.listaCarrito.forEach(e => {
        this.total += (e.cantidad * e.precio);
      })
    })
    this.total = 0;
    this.listaCarrito.forEach(e => {
      this.total += (e.cantidad * e.precio);
    })
  }

  borrarProductoCarrito(id:string){
    this.carritoService.eliminarProductoCarrito(id);
    this.snackBar.open('Producto eliminado', '', { duration: 550 });
  }

  siguiente(){
    this.divComprar=  true;
    setTimeout(() => {
      window.scroll({
        top: 500,
        left: 0,
        behavior: 'smooth'
      });
    }, 50);
  }

  borrarCarrito(){
    localStorage.setItem('carrito','[]');
    this.snackBar.open('Carrito eliminado','',{duration:1200})
  }

  comprar(){

    this.datosCliente = {
      nombre: this.form.controls['nombre'].value,
      direccion: this.form.controls['direccion'].value,
      telefono: this.form.controls['telefono'].value,
      nota: this.form.controls['nota'].value,
    };

    this.comprarService.comprar(this.datosCliente, this.listaCarrito , this.total).subscribe(data =>{
      localStorage.setItem('carrito', '[]');
      this.listaCarrito = [];
      this.snackBar.open('Pedido completado!', '', { duration: 1500 });
      this.form.reset();
      this.route.navigateByUrl('')
    })

  }

}
