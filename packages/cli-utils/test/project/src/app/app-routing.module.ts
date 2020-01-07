import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent, SelectFirstRootPageGuard } from '@acoustic-content-sdk/ng';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  canActivate: [SelectFirstRootPageGuard],
  component: PageComponent,
},{
  path: '**',
  component: PageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
