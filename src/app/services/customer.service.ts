import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerI } from './../models/customer.interface';

import { MessageService } from './message.service';

export interface CustomerID extends CustomerI { id: string; }

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerCollection: AngularFirestoreCollection<CustomerI>;
  customers: Observable<CustomerID[]>;
  private customerDoc: AngularFirestoreDocument<CustomerI>;

  public selected = {
    id: null,
    name: '',
    city: '',
    order: ''
  };

  constructor(private afs: AngularFirestore, private msjService: MessageService) {
    this.customerCollection = this.afs.collection<CustomerI>('customers');
    this.customers = this.customerCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CustomerI;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getAllCustomers() {
    // return all customers
    return this.customers;
  }
  
  async addCustomer(customer: CustomerI, msg: string) {
    try {
      // console.log(customer);
      return await this.customerCollection.add(customer).then(res => {
        this.msjService.msj('Correct!', msg);
      });
    } catch (error) {
      this.msjService.msj('Error!', error);
    }
  }

  async editCustomer(customer: CustomerID, msg: string) {
    try {
      // console.log(customer);
      return await this.customerCollection.doc(customer.id).update(customer).then(res => {
        this.msjService.msj('Correct!', msg);
      });
    } catch (error) {
      this.msjService.msj('Error!', error);
    }
  }

  async deleteCustomer(id: string, msg: string) {
    try {
      return await this.customerCollection.doc(id).delete().then(res => {
        this.msjService.msj('Correct!', msg);
      });
    } catch (error) {
      this.msjService.msj('Error!', 'Not delete');
    }

  }

  /* async deleteCustomer(id: string, msg: string){

    this.customerDoc = this.afs.doc<CustomerI>(`customers/${id}`);
    // console.log(this.customerDoc);
    try {
      await this.customerDoc.delete().then( res => {

        // OPCION 1
        // this.msjService.message(msg);
        //OPCION 2
        this.msjService.msj('Correct!', msg);
      });
    } catch (error) {
      this.msjService.msj('Error!', 'Not delete');
    }
  } */
}
