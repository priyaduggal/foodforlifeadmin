import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities.component';
import { AddactivityComponent } from './addactivity/addactivity.component';
import { EditactivityComponent } from './editactivity/editactivity.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
	MatInputModule,
	MatSlideToggleModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatSortModule,
	MatTableModule,
	MatSelectModule,
	MatMenuModule,
	MatProgressBarModule,
	MatButtonModule,
	MatCheckboxModule,
	MatDialogModule,
	MatTabsModule,
	MatNativeDateModule,
	MatCardModule,
	MatRadioModule,
	MatIconModule,
	MatDatepickerModule,
	MatExpansionModule,
	MatAutocompleteModule,
	MAT_DIALOG_DEFAULT_OPTIONS,
	MatSnackBarModule,
	MatTooltipModule
	
} from '@angular/material';

@NgModule({
  declarations: [ActivitiesComponent, AddactivityComponent, EditactivityComponent],
  imports: [
    CommonModule,
	NgbModule,
	FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatSlideToggleModule,
		MatMenuModule,
		MatSelectModule,
        MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatExpansionModule,
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule,
	   RouterModule.forChild([
			{
				path: '',
				component: ActivitiesComponent
			},
			{
				path: 'addactivity',
				component: AddactivityComponent
			},
			{
				path: 'editactivity/:id',
				component: EditactivityComponent
			}
		])
  ]
})
export class ActivitiesModule { }
