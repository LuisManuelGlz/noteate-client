import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [NavigationComponent],
})
export class CoreModule {}
