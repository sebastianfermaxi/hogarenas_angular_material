import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ComprarService {
  urlHogarenas: string = 'https://hogarenas-backend.herokuapp.com/api/producto/pedido';

  constructor(private http: HttpClient) { }

  comprar(datosCliente: Cliente, pedido: any, total: number):Observable<any>{
    const{nombre, direccion, telefono, nota} = datosCliente;

    let elementosPedido = ''
    pedido.forEach( (e: { cantidad: string; nombre: string; }) => {
      elementosPedido += `${e.cantidad} ${e.nombre} ,`;
    })

    const mensaje: string = `Nuevo Pedido:
     Cliente: ${nombre} , con Direccion en ${direccion} y Teléfono ${telefono} . Ha hecho el siguiente pedido:
    ${elementosPedido} nota* ${nota}
    Total: $ ${total}
     `;
     return this.http.post(this.urlHogarenas, {"pedido":mensaje});

  }
}
