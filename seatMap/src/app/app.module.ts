import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';

import { AppComponent } from './app.component';
import { AndersMapComponent } from './anders-map/anders-map.component';
import { BoilerplateComponent } from './boilerplate/boilerplate.component';
import { PlaneModelComponent } from './plane-model/plane-model.component';

const appRoutes: Routes = [
  {path: '', component: PlaneModelComponent},
  {path: 'anders', component: AndersMapComponent},
  { path: 'boilerplate', component: BoilerplateComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AndersMapComponent,
    BoilerplateComponent,
    PlaneModelComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
