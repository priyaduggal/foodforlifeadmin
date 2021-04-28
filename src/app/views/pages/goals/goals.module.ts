import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalsComponent } from './goals.component';
import { AddgoalComponent } from './addgoal/addgoal.component';
import { EditgoalComponent } from './editgoal/editgoal.component';



@NgModule({
  declarations: [GoalsComponent, AddgoalComponent, EditgoalComponent],
  imports: [
    CommonModule
  ]
})
export class GoalsModule { }
