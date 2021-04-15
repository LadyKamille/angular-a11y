import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RepoDetailsComponent } from './repo-details/repo-details.component';
import { RepoListComponent } from './repo-list/repo-list.component';

const routes: Routes = [
  { path: 'repo/:id', component: RepoDetailsComponent },
  { path: '', component: RepoListComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
