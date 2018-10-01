import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AndersMapComponent } from './anders-map/anders-map.component';

const appRoutes: Routes = [
  {path: 'seatmap', component: AndersMapComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AndersMapComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
