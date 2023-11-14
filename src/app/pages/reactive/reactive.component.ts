import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [],
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  ngOnInit(): void {}


  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }
  

  get nameNoValido() {
    return this.forma.get('name')?.invalid && this.forma.get('name')?.touched;
  }
  get lastnameNoValido() {
    return (
      this.forma.get('lastname')?.invalid && this.forma.get('lastname')?.touched
    );
  }
  get emailNoValido() {
    return this.forma.get('email')?.invalid && this.forma.get('email')?.touched;
  }
  get distritoNoValido() {
    return (
      this.forma.get('direccion.distrito')?.invalid &&
      this.forma.get('direccion.distrito')?.touched
    );
  }
  get ciudadNoValido() {
    return (
      this.forma.get('direccion.ciudad')?.invalid &&
      this.forma.get('direccion.ciudad')?.touched
    );
  }
  createForm(): void {
    this.forma = this.fb.group({
      //nombre:['Valor por defecto', [validaciones Sincronos], [validaciones Asincronos]] ],

      name: ['', [Validators.required, Validators.minLength(5)]],
      lastname: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
    });
  }

  guardar() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }
  }
}
