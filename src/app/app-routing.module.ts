import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprarCarritoComponent } from './components/comprar-carrito/comprar-carrito.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PromosComponent } from './components/promos/promos.component';

const routes: Routes = [
  {path:'', component: InicioComponent},
  {path:'contacto', component: ContactoComponent},
  {path:'promos', component: PromosComponent},
  {path:'comprar', component: ComprarCarritoComponent},
  {path:'**', component: InicioComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
