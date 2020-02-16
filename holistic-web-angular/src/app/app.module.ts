import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingHomeComponent } from './components/landing-home/landing-home.component'

const routes: Routes = [
  { path: '', component: LandingHomeComponent },
  { path: 'projects', loadChildren: './apps/projectmanager/projectmanager.module#ProjectmanagerModule' },  
  { path: '**', redirectTo: '' }   
];

@NgModule({
  declarations: [
    AppComponent,
    LandingHomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
