import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CoupComponent} from './coup/coup.component';
import {HomePageComponent} from './home-page/home-page.component';

const routes: Routes = [
  {path: 'room/:id', component: CoupComponent},
  {path: '**', component: HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
