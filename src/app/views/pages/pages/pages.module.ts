import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
	MatInputModule,
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
import { AddPageComponent } from './add-page/add-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FaqComponent } from './faq/faq.component';
import { FaqaddComponent } from './faqadd/faqadd.component';
import { FaqeditComponent } from './faqedit/faqedit.component';


@NgModule({
  declarations: [PagesComponent, AddPageComponent, EditPageComponent, FaqComponent, FaqaddComponent, FaqeditComponent],
  imports: [
    RouterModule.forChild([
			{
				path: '',
				component: PagesComponent
			},
			{
				path: 'add-page',
				component: AddPageComponent
			},
			{
				path: 'edit-page/:id',
				component: EditPageComponent
			},{
				path: 'faq',
				component: FaqComponent
			},
			{
				path: 'faqadd',
				component: FaqaddComponent
			},
			{
				path: 'faqedit/:id',
				component: FaqeditComponent
			}			
		]),
		CommonModule,
        NgbModule,		
		FormsModule,	
		ReactiveFormsModule,
        RichTextEditorAllModule,
		MatButtonModule,
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
		MatDialogModule
  ]
})
export class PagesModule { }
