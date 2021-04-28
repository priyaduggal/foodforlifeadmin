import { Component, OnInit , ViewChild ,ChangeDetectorRef} from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../config';
import { UserService } from '../../../core/user/user.service';
@Component({
  selector: 'kt-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
	dataSource:any;
	dataSource1:any;
	IMAGES_URL=config.IMAGES_URL;
	errors=config.errors;
	isLoading = true;
	displayedColumns = [ 'imageurl' , 'title', 'date'  ,'action'];
	//dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    selection = new SelectionModel<Element>(true, []);
	
	/** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
	
  ngAfterViewInit() {
	  
	  
  }
    
   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
	constructor(private modalService: NgbModal,private cdr: ChangeDetectorRef, public userService: UserService) {
	this.get_ind_projects();
	this.get_company_projects();
	}
	get_ind_projects()
	{
	this.isLoading = true;
	  this.userService.postData({},'tribesProject').subscribe((result) => {
		  this.isLoading = false;
				this.cdr.markForCheck();
				this.dataSource = new MatTableDataSource(result.data);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				this.cdr.markForCheck();
	  	});
	}
	get_company_projects()
	{
	this.isLoading = true;
	  this.userService.postData({},'tribesProjectCompany').subscribe((result) => {
		  this.isLoading = false;
				this.cdr.markForCheck();
				this.dataSource1 = new MatTableDataSource(result.data);
				this.cdr.markForCheck();
				this.dataSource1.paginator = this.paginator;
				this.dataSource1.sort = this.sort;
	  	});
	}

  ngOnInit() {
  }
open(content) {
        this.modalService.open(content).result.then((result) => {       
        });
    }

}
export interface Element {
  title: string;
  imageurl:string;
  //result: string;
  date: string;
}
/* const ELEMENT_DATA: Element[] = [
  { imageurl:'assets/media/prj1.jpg', title: 'Help children in India',       date:'09-09-2020 09:06'},
  { imageurl:'assets/media/prj2.jpg', title: 'Help children in South Africa', date:'04-09-2020 11:55'},
  { imageurl:'assets/media/prj3.jpg', title: 'Feed children around the world' , date:'04-09-2020 05:44'},
  { imageurl:'assets/media/prj4.jpg', title: 'Help children in South America', date:'01-09-2020 21:20'},
  { imageurl:'assets/media/prj5.jpg', title: 'Help victims of war in Ukraine', date:'08-08-2020 23:44'},
]; */