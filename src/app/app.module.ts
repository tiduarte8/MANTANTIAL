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
import { ProductoComponent,RegistrarproductoComponent } from './producto/producto.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ReporteComponent,DialogContentExampleDialog } from './reporte/reporte.component';
import { SugerenciasComponent } from './sugerencias/sugerencias.component';
import {AppRoutingModule} from './app-routing.module';
import {MatCardModule} from '@angular/material/card';
import { InicioComponent,Contactanos } from './inicio/inicio.component';
import { RegistrarseComponent } from './clientes/registrarse/registrarse.component';



import { CarritoComponent } from './carrito/carrito.component';
import { EnviarsugerenciasComponent } from './sugerencias/enviarsugerencias/enviarsugerencias.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {environment} from './../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {MatDialogModule} from '@angular/material/dialog';
import {InventarioComponent,NuevoingresoComponent} from './inventario/inventario.component';
import {MatDatepickerModule,MatNativeDateModule} from '@angular/material';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {AngularFirestore} from '@angular/fire/firestore';





@NgModule({
  declarations: [
    NuevoingresoComponent,
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

    CarritoComponent,
    EnviarsugerenciasComponent,
    InventarioComponent,
    
  
    
    
    
    
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
       MatDatepickerModule,
       MatNativeDateModule,
       AngularFireStorageModule,
       MatProgressBarModule,
       
       
     
  ],

  entryComponents:[ReporteComponent,
    DialogContentExampleDialog,
    InicioComponent,
    Contactanos,
    InventarioComponent,
    NuevoingresoComponent,
    RegistrarproductoComponent,
    ProductoComponent,
    RegistrarseComponent,
    LoginComponent
  ],


  providers: [AngularFireAuth,AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
