import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkItemComponent } from './bookmark-item/bookmark-item.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: '', component: BookmarksComponent },
  { path: 'card', component: BookmarkItemComponent },
  { path: 'results', component: ResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
