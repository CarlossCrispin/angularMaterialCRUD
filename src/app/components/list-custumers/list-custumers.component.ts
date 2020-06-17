import { FormComponent } from './../form/form.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CustomerI } from './../../models/customer.interface';
import { CustomerService } from 'src/app/services/customer.service';

import Swal from 'sweetalert2';
import { MessageService } from 'src/app/services/message.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';


@Component({
  selector: 'app-list-custumers',
  templateUrl: './list-custumers.component.html',
  styleUrls: ['./list-custumers.component.scss'],
})
export class ListCustumersComponent implements OnInit {
  customers: CustomerI[];
  show = false;
  displayedColumns: string[] = ['position', 'name', 'city', 'order', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private customerService: CustomerService, private msgService: MessageService, public dialog: MatDialog) { }
  public msg: string;


  ngOnInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.customerService.getAllCustomers().subscribe(res => {
      // console.log(res);
      this.dataSource.data = res;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(customer?) {
    // console.log('edit', customer);
    this.cleanForm();
    this.openModal();
    if (customer) {
      this.customerService.selected = customer;
    }
  }


  cleanForm(){
    this.customerService.selected = {
      id: null,
      name: '',
      city: '',
      order: ''
    };
  }

  openModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Modal'
    };
    dialogConfig.autoFocus = true;
    this.dialog.open(FormComponent);
    // this.cleanForm();
  }

  onDelete(id: string) {
    // console.log('delete');

    /* OPCION 1 */
    /* const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      position: 'top-end',
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.msg = 'Customer Delete';
        this.customerService.deleteCustomer(id, this.msg);
      } else if (
        //Read more about handling dismissals below
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
 */
    // this.customerService.message();

    /* OPCION 2 */
    this.dialog
      .open(MessageComponent, {
        data: `Are you sure?`
      })
      .afterClosed()
      // tslint:disable-next-line: ban-types
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.msg = 'Customer Delete';
          this.customerService.deleteCustomer(id, this.msg);
        } else {
          // this.msgService.msj('Correct!', 'Customer not Delete !');
        }
      });
    //
  }
}
