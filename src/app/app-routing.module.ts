import { HomeComponent } from './components/layout/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCustumersComponent } from './components/list-custumers/list-custumers.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'customers', component: ListCustumersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
