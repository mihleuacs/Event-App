import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './Pages/about/about.component';
import { HomeComponent } from './Pages/home/home.component';
import { RegisterComponent } from './Users/register/register.component';
import { LoginComponent } from './Users/login/login.component';
import { AdminComponent } from './Users/admin/admin.component';

import { CreateEventComponent } from './Pages/create-event/create-event.component';
import { MyEventsComponent } from './Pages/my-events/my-events.component';
import { EditEventComponent } from './Pages/edit-event/edit-event.component';
import { DesignHomeComponent } from './Pages/design-home/design-home.component';

const routes: Routes = [
  { path: '', component: DesignHomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent , },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'my-events', component: MyEventsComponent },
  { path: 'edit-event/:id', component: EditEventComponent },
  { path: '**', redirectTo: '' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
