import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    const carrito = JSON.parse(localStorage.getItem('carrito')!) || [];
    this.carritoService.carritoStorage(carrito);
  }

}
