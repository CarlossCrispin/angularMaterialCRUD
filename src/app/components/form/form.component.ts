import { MessageService } from 'src/app/services/message.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { inject } from '@angular/core/testing';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  buttoShow = false;
  @Input() show;
  @Output() propagar = new EventEmitter<boolean>();

  constructor(
    public customer: CustomerService,
    private mensaje: MessageService,
    private dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit(): void {
    this.showButon();
  }

  onSaveForm() {

    if (this.customer.selected.id === null) {
      // console.log('Guardar');
      const newCustomer = {
        name: this.customer.selected.name,
        city: this.customer.selected.city,
        order: this.customer.selected.order
      };
      // console.log('NEW', newCustomer);

      if (newCustomer.name !== '' && newCustomer.city !== ''  && newCustomer.order !== '') {
        this.customer.addCustomer(newCustomer, 'New Custumer add sucessfully');
      }else{
        this.mensaje.msj('Error!', 'Completa los campos');
      }
      // this.propagarMet();
    } else {
      // console.log('Actualizar');
      this.customer.editCustomer(this.customer.selected, 'Customer updated!');
      // this.propagarMet();
    }
    this.close();
  }

  showButon(){
    if (this.customer.selected.name !== '' && this.customer.selected.city !== ''  && this.customer.selected.order !== '') {
      this.buttoShow = true;
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
