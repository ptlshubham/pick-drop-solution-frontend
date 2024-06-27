import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BasicDetailsService } from './services/basic.service';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    DatePipe,
    BasicDetailsService,
    ApiService
  ],
  exports: [
  ]
})
export class CoreModule {
}
