import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WordpressPageRoutingModule } from './wordpress-routing.module';

import { WordpressPage } from './wordpress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WordpressPageRoutingModule
  ],
  declarations: [WordpressPage]
})
export class WordpressPageModule {}
