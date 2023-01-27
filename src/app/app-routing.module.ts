import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SubmissionsPageComponent } from './components/submissions-page/submissions-page.component';

const routes: Routes = [
  {
    path: 'submissions',
    component: SubmissionsPageComponent
  },
  {
    path: '**',
    redirectTo: 'submissions',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
