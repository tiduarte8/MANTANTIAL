import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import { ProductoComponent } from './components/producto/producto.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { RegistrarseComponent } from './components/clientes/registrarse/registrarse.component';



import { PedidoComponent } from './components/pedido/pedido.component';
import { SugerenciasComponent } from './components/sugerencias/sugerencias.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { EnviarsugerenciasComponent } from './components/sugerencias/enviarsugerencias/enviarsugerencias.component';
import {InventarioComponent}from './components/inventario/inventario.component';


const routes: Routes =[
    
    {path:'login', component: LoginComponent},
     {path:'producto',component: ProductoComponent},
     {path:'inventario',component:InventarioComponent},
     {path:'cliente',component:ClientesComponent},
     {path:'registrarse',component:RegistrarseComponent},
     
     
     {path:'pedido',component:PedidoComponent},
     {path:'sugerencia',component:SugerenciasComponent},
     {path:'enviarsu',component:EnviarsugerenciasComponent},
     {path:'reporte',component:ReporteComponent},
     {path:'carrito/:id',component:CarritoComponent},
     {path:'',component:InicioComponent,pathMatch:'full'},
     {path:'**',redirectTo:'/',pathMatch:'full'},
     
     
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}