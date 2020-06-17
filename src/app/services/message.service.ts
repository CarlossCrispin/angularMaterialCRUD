import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // tslint:disable-next-line: variable-name
  constructor(private _snackBar: MatSnackBar) { }

  msj(text: string, text1: string) {
    // console.log('MENSAJe <----');

    this._snackBar.open(text, text1, {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }



  message(msg: string){
    /*  Swal.fire({
       title: 'Correcto!',
       text: msg,
       icon: 'success',
       confirmButtonText: 'Ok'
     }); */
     Swal.fire({
       position: 'top-end',
       icon: 'success',
       title: 'Your work has been saved',
       text: msg,
       showConfirmButton: false,
       timer: 1500
     });
   }
}
