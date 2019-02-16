import { Component } from '@angular/core';
import {MatFormFieldControl} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent  {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);



}
