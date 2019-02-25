import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthService} from './../servicios/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';


@Component({
  selector: 'app-mynav',
  templateUrl: './mynav.component.html',
  styleUrls: ['./mynav.component.css']
})
export class MynavComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

   

  constructor(private breakpointObserver: BreakpointObserver, private authService:AuthService, private afsAuth: AngularFireAuth) {}

  public isLogged: boolean=false;
  public islogged2: boolean=true;

  ngOnInit(){
   this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe( auth=>{
      if(auth){
        console.log('user logged');
        this.isLogged=true;
        this.islogged2=false;
      }

      else{
        console.log('Not usser log');
        this.isLogged=false;
        this.islogged2=true;
      }
    });
  }

  onLogout(){
    this.authService.logoutUser();
  }

}