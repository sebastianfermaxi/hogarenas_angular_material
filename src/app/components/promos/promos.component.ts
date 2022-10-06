import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.scss']
})
export class PromosComponent implements OnInit {

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    const carrito = JSON.parse(localStorage.getItem('carrito')!) || [];
    this.carritoService.carritoStorage(carrito);
  }

}
