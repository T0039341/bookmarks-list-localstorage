import { InjectionToken, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { BookmarkItemComponent } from './bookmark-item/bookmark-item.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResultsComponent } from './results/results.component';

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');
const deactivateGuard = new InjectionToken('deactivateGuard');

const routes: Routes = [
  { path: '', component: BookmarksComponent },
  { path: 'card', component: BookmarkItemComponent },
  { path: 'results', component: ResultsComponent },
  {
    path: 'externalRedirect',
    canActivate: [externalUrlProvider],
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
