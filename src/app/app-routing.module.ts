import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import { ProductoComponent } from './components/producto/producto.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { RegistrarseComponent } from './components/clientes/registrarse/registrarse.component';
import {ContactoComponent} from './components/contacto/contacto.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { SugerenciasComponent } from './components/sugerencias/sugerencias.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { EnviarsugerenciasComponent } from './components/sugerencias/enviarsugerencias/enviarsugerencias.component';
import {InventarioComponent}from './components/inventario/inventario.component';
import {MetodopagoComponent} from './components/metodopago/metodopago.component';

import {AuthGuard} from './guards/auth.guard';
import { MispedidosComponent } from './components/mispedidos/mispedidos.component';



const routes: Routes =[

    {path:'',component:InicioComponent,pathMatch:'full'},
     {path:'login', component: LoginComponent},
     {path:'producto',component: ProductoComponent,canActivate:[AuthGuard]},
     {path:'inventario',component:InventarioComponent,canActivate:[AuthGuard]},
     {path:'cliente',component:ClientesComponent,canActivate:[AuthGuard]},
     {path:'registrarse',component:RegistrarseComponent},
     
     
     {path:'pedido',component:PedidoComponent,canActivate:[AuthGuard]},
     {path:'mispedidos',component:MispedidosComponent,canActivate:[AuthGuard]},
     {path:'sugerencia',component:SugerenciasComponent,canActivate:[AuthGuard]},
     {path:'enviarsu',component:EnviarsugerenciasComponent},
     {path:'reporte',component:ReporteComponent,canActivate:[AuthGuard]},
     {path:'carrito',component:CarritoComponent,canActivate:[AuthGuard]},
     {path:'contacto',component:ContactoComponent,canActivate:[AuthGuard]},
     {path:'pago',component:MetodopagoComponent,canActivate:[AuthGuard]},
    
     
     {path:'**',redirectTo:'/',pathMatch:'full'},

     
     
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}