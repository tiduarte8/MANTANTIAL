import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import { ProductoComponent } from './producto/producto.component';
import { InicioComponent } from './inicio/inicio.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RegistrarseComponent } from './clientes/registrarse/registrarse.component';
import {RegistrarproductoComponent} from './producto/registrarproducto/registrarproducto.component';
import { RegistrarpresentacionComponent } from './producto/registrarpresentacion/registrarpresentacion.component';
import { VerpresentacionesComponent } from './producto/verpresentaciones/verpresentaciones.component';
import { PedidoComponent } from './pedido/pedido.component';
import { SugerenciasComponent } from './sugerencias/sugerencias.component';
import { ReporteComponent } from './reporte/reporte.component';
import { CarritoComponent } from './carrito/carrito.component';
import { EnviarsugerenciasComponent } from './sugerencias/enviarsugerencias/enviarsugerencias.component';


const routes: Routes =[
    
    {path:'login', component: LoginComponent},
     {path:'producto',component: ProductoComponent},
     {path:'cliente',component:ClientesComponent},
     {path:'registrarse',component:RegistrarseComponent},
     {path:'producto/registrarproducto',component:RegistrarproductoComponent},
     {path:'producto/registrarpresentacion',component:RegistrarpresentacionComponent},
     {path:'producto/verpresentaciones',component:VerpresentacionesComponent},
     {path:'pedido',component:PedidoComponent},
     {path:'sugerencia',component:SugerenciasComponent},
     {path:'enviarsu',component:EnviarsugerenciasComponent},
     {path:'reporte',component:ReporteComponent},
     {path:'carrito',component:CarritoComponent},
     {path:'',component:InicioComponent,pathMatch:'full'},
     {path:'**',redirectTo:'/',pathMatch:'full'},
     
     
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}