import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/models/Carrito';
import { CarritoService } from 'src/app/services/carrito.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  listaCarrito: Carrito[] = [];

  nroItemsCarrito: string= '';

  displayedColumns: string[] = ['cantidad', 'nombre', 'borrar'];

  @ViewChild(MatTable) table! : MatTable<any>;
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  constructor(private carritoService : CarritoService,
              private snackBar: MatSnackBar,
              private route: Router) { }

  ngOnInit(): void {
    this.carritoService.getCarrito().subscribe(data =>{

      this.listaCarrito = data;
      this.table.renderRows();
      if(this.listaCarrito.length === 0){
        this.nroItemsCarrito = ''
      }else{
        this.nroItemsCarrito = this.listaCarrito.length.toString();
      }
    })
  }

  borrarProductoCarrito(id : string) {
    this.carritoService.eliminarProductoCarrito(id);
    this.snackBar.open('Producto eliminado', '', { duration: 550 });

  }

  comprar(){
    this.route.navigate(['/comprar']);
    this.trigger.closeMenu();

  }


}
