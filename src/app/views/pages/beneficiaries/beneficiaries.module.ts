import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiariesComponent } from './beneficiaries.component';
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
import { EditbeneficiariesComponent } from './editbeneficiaries/editbeneficiaries.component';
import { AddbeneficiariesComponent } from './addbeneficiaries/addbeneficiaries.component';

@NgModule({
  declarations: [BeneficiariesComponent, EditbeneficiariesComponent, AddbeneficiariesComponent],
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
				component: BeneficiariesComponent
			},
			{
				path: 'editbeneficiaries/:id',
				component: EditbeneficiariesComponent
			},{
				path: 'addbeneficiaries',
				component: AddbeneficiariesComponent
			}
		])
  ]
})
export class BeneficiariesModule { }
