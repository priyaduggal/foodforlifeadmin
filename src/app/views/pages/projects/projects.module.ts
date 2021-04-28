import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { EditprojectComponent } from './editproject/editproject.component';
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
  declarations: [ProjectsComponent, AddprojectComponent, EditprojectComponent],
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
				component: ProjectsComponent
			},
			{
				path: 'addproject',
				component: AddprojectComponent
			},
			{
				path: 'editproject',
				component: EditprojectComponent
			}
		])
  ]
})
export class ProjectsModule { }
