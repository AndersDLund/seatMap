import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AndersMapComponent } from './anders-map/anders-map.component';
import { BoilerplateComponent } from './boilerplate/boilerplate.component';

const appRoutes: Routes = [
  {path: '', component: AndersMapComponent},
  { path: 'boilerplate', component: BoilerplateComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AndersMapComponent,
    BoilerplateComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
