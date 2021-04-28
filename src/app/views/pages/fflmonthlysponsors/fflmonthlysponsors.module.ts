import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FflmonthlysponsorsComponent } from './fflmonthlysponsors.component';
import { AddfflsponsorComponent } from './addfflsponsor/addfflsponsor.component';
import { EditfflsponsorComponent } from './editfflsponsor/editfflsponsor.component';



@NgModule({
  declarations: [FflmonthlysponsorsComponent, AddfflsponsorComponent, EditfflsponsorComponent],
  imports: [
    CommonModule
  ]
})
export class FflmonthlysponsorsModule { }
