import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './Pages/home/home.component';
import { AboutComponent } from './Pages/about/about.component';
import { RegisterComponent } from './Users/register/register.component';
import { LoginComponent } from './Users/login/login.component';
import { CreateEventComponent } from './Pages/create-event/create-event.component';
import { MyEventsComponent } from './Pages/my-events/my-events.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './Users/admin/admin.component';

import { RouterModule } from '@angular/router';
import { EditEventComponent } from './Pages/edit-event/edit-event.component';
import { EventDetailComponent } from './Pages/event-detail/event-detail.component';
import { DesignHomeComponent } from './Pages/design-home/design-home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    CreateEventComponent,
    MyEventsComponent,
    AdminComponent,
    EditEventComponent,
    EventDetailComponent,
    DesignHomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
