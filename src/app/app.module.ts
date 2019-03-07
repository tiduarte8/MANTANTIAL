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
import { MynavComponent } from './components/mynav/mynav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './components/login/login.component';
import {MatTableModule} from '@angular/material/table';
import { ProductoComponent } from './components/producto/producto.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ReporteComponent,DialogContentExampleDialog } from './components/reporte/reporte.component';
import { SugerenciasComponent } from './components/sugerencias/sugerencias.component';
import {AppRoutingModule} from './app-routing.module';
import {MatCardModule} from '@angular/material/card';
import { InicioComponent,Contactanos } from './components/inicio/inicio.component';
import { RegistrarseComponent } from './components/clientes/registrarse/registrarse.component';



import { CarritoComponent } from './components/carrito/carrito.component';
import { EnviarsugerenciasComponent } from './components/sugerencias/enviarsugerencias/enviarsugerencias.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {environment} from './../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {MatDialogModule} from '@angular/material/dialog';
import {InventarioComponent,NuevoingresoComponent} from './components/inventario/inventario.component';
import {MatDatepickerModule,MatNativeDateModule} from '@angular/material';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {AngularFirestore,FirestoreSettingsToken} from '@angular/fire/firestore';
import { GuardarproductoComponent } from './components/producto/guardarproducto/guardarproducto.component';





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
   
    

    CarritoComponent,
    EnviarsugerenciasComponent,
    InventarioComponent,
    GuardarproductoComponent,
    
  
    
    
    
    
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
   
    ProductoComponent,
    RegistrarseComponent,
    LoginComponent,
    GuardarproductoComponent
  ],


  providers: [AngularFireAuth,AngularFirestore,],
  bootstrap: [AppComponent]
})
export class AppModule { }
