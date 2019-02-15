import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule,MatButtonModule,
        MatInputModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatFormFieldModule} from '@angular/material';
        import {MatTooltipModule} from '@angular/material/tooltip';
import { MynavComponent } from './mynav/mynav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './login/login.component';
import {MatTableModule} from '@angular/material/table';
import { ProductoComponent } from './producto/producto.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ReporteComponent } from './reporte/reporte.component';
import { SugerenciasComponent } from './sugerencias/sugerencias.component';
import {AppRoutingModule} from './app-routing.module';
import {MatCardModule} from '@angular/material/card';
import { InicioComponent } from './inicio/inicio.component';
import { RegistrarseComponent } from './clientes/registrarse/registrarse.component';
import { RegistrarproductoComponent } from './producto/registrarproducto/registrarproducto.component';
import { RegistrarpresentacionComponent } from './producto/registrarpresentacion/registrarpresentacion.component';
import { VerpresentacionesComponent } from './producto/verpresentaciones/verpresentaciones.component';
import { CarritoComponent } from './carrito/carrito.component';
import { EnviarsugerenciasComponent } from './sugerencias/enviarsugerencias/enviarsugerencias.component';





@NgModule({
  declarations: [
    AppComponent,
    MynavComponent,
    LoginComponent,
    ProductoComponent,
    PedidoComponent,
    ClientesComponent,
    ReporteComponent,
    SugerenciasComponent,
    InicioComponent,
    RegistrarseComponent,
    RegistrarproductoComponent,
    RegistrarpresentacionComponent,
    VerpresentacionesComponent,
    CarritoComponent,
    EnviarsugerenciasComponent
    
  
    
    
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,MatInputModule,
     LayoutModule, MatToolbarModule,
      MatSidenavModule, MatIconModule,
       MatListModule,MatMenuModule,
       MatFormFieldModule,
       AppRoutingModule,
       MatCardModule,
       MatSelectModule,
       MatTableModule,
       MatTooltipModule
       
      
   
       
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
