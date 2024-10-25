import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordpressPage } from './wordpress.page';

const routes: Routes = [
  {
    path: '',
    component: WordpressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordpressPageRoutingModule {}
