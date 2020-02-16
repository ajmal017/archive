import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectmanagerAppComponent } from './projectmanager-app.component';

const routes: Routes = [
  { path: '', component: ProjectmanagerAppComponent, },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProjectmanagerAppComponent]
})
export class ProjectmanagerModule { }
