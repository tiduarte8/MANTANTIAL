import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule,MatButtonModule,
        
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatFormFieldModule,} from '@angular/material';
        import {MatTooltipModule} from '@angular/material/tooltip';
        import {MatPaginatorModule} from '@angular/material/paginator';
        import {MatInputModule} from '@angular/material/input';
import { MynavComponent } from './mynav/mynav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './login/login.component';
import {MatTableModule} from '@angular/material/table';
import { ProductoComponent } from './producto/producto.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ReporteComponent,DialogContentExampleDialog } from './reporte/reporte.component';
import { SugerenciasComponent } from './sugerencias/sugerencias.component';
import {AppRoutingModule} from './app-routing.module';
import {MatCardModule} from '@angular/material/card';
import { InicioComponent,Contactanos } from './inicio/inicio.component';
import { RegistrarseComponent } from './clientes/registrarse/registrarse.component';
import { RegistrarproductoComponent } from './producto/registrarproducto/registrarproducto.component';
import { RegistrarpresentacionComponent } from './producto/registrarpresentacion/registrarpresentacion.component';
import { VerpresentacionesComponent } from './producto/verpresentaciones/verpresentaciones.component';
import { CarritoComponent } from './carrito/carrito.component';
import { EnviarsugerenciasComponent } from './sugerencias/enviarsugerencias/enviarsugerencias.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {environment} from './../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {MatDialogModule} from '@angular/material/dialog';






@NgModule({
  declarations: [
    AppComponent,
    MynavComponent,
    LoginComponent,
    ProductoComponent,
    PedidoComponent,
    ClientesComponent,
    DialogContentExampleDialog,
    ReporteComponent,
    SugerenciasComponent,
    InicioComponent,
    Contactanos,
    RegistrarseComponent,
    RegistrarproductoComponent,
    RegistrarpresentacionComponent,
    VerpresentacionesComponent,
    CarritoComponent,
    EnviarsugerenciasComponent,
    
  
    
    
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,MatInputModule,
     LayoutModule, MatToolbarModule,
      MatSidenavModule, MatIconModule,
       MatListModule,MatMenuModule,
       MatFormFieldModule,
       ReactiveFormsModule,
       AppRoutingModule,
       MatCardModule,
       MatSelectModule,
       MatTableModule,
       MatTooltipModule,
       MatPaginatorModule,
       MatGridListModule,
       FormsModule,
       AngularFireModule.initializeApp(environment.firebaseConfig),
       AngularFireDatabaseModule,
       MatDialogModule,
      
       
     
  ],

  entryComponents:[ReporteComponent,DialogContentExampleDialog,InicioComponent,Contactanos],

  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
