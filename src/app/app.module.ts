import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatModule } from './mat/mat.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListCustumersComponent } from './components/list-custumers/list-custumers.component';
import { CustomerService } from './services/customer.service';


// firebase
import { environment } from './../environments/environment.prod';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ToolbarComponent } from './components/layout/toolbar/toolbar.component';
import { MessageComponent } from './components/message/message.component';
import { SideNavComponent } from './components/layout/side-nav/side-nav.component';
import { HomeComponent } from './components/layout/home/home.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ListCustumersComponent,
    ToolbarComponent,
    MessageComponent,
    SideNavComponent,
    HomeComponent,
    FooterComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent],
  entryComponents: [FormComponent]
})
export class AppModule { }
