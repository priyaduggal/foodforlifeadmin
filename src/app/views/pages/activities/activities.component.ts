import { Component, OnInit , ViewChild,ChangeDetectorRef } from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../config';
import { UserService } from '../../../core/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'kt-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
IMAGES_URL=config.IMAGES_URL;
errors=config.errors;
del_id:any=null;
loading = false;
del_index:any=null;
modalRef:any;
dataSource :any;
dataSource1 :any;
isLoading = true;
displayedColumns = [  'imageurl' , 'title' ,'date' ,'amount','meals_t' , 'meals' , 'donation' , 'action'];
displayedColumns1 = [ 'imageurl' , 'title' ,'date' ,  'meals' , 'donation' , 'action'];
//dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
// dataSource1 = new MatTableDataSource<Element1>(ELEMENT_DATA1);
selection = new SelectionModel<Element>(true, []);
	/** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
	showSnackBar(message){
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
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
  constructor(private _snackBar: MatSnackBar,private modalService: NgbModal,private cdr: ChangeDetectorRef, public userService: UserService) { 
  this.get_activities();
  }
  openVerticallyCentered(content,del_id,del_index) {
       this.modalRef = this.modalService.open(content, { centered: true });
     this.del_id = del_id;
    this.del_index = del_index;
  }
  delete()
  {
	  this.loading = true;
       this.userService.postData({id:this.del_id},'deleteActivity').subscribe((result) => {
      this.loading = false;
   
      if(result.status == 1){
        this.modalRef.close();
       	this.get_activities();
        this.showSnackBar('Activity  deleted successfully.');
      }
      else{
        this.showSnackBar('Error while deleting user,Please try after some time');
      }
    },
    err => {
      this.loading = false;
      this.showSnackBar('Technical error,Please try after some time');
    });
  
  }
  get_activities()
  {
	   this.isLoading = true;
	  this.userService.postData({},'tribesactivitiesall').subscribe((result) => {
		  this.isLoading = false;
				this.cdr.markForCheck();
				this.dataSource = new MatTableDataSource(result.data);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				this.cdr.markForCheck();
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
  imageurl:string;
  title: string;
  meals:string;
  donation:string;
  date: string;
}
const ELEMENT_DATA: Element[] = [
  { imageurl:'assets/media/project1.jpg', title: 'Help children in India', meals:'1600' , donation:'$125'      , date:'29-09-2020'},
  { imageurl:'assets/media/project2.jpeg', title: 'Help children in South Africa', meals:'1200' ,  donation:'$130', date:'22-09-2020'},
  { imageurl:'assets/media/project3.jpg', title: 'Feed children around the world', meals:'1100' , donation:'$150', date:'18-09-2020'},
  { imageurl:'assets/media/project4.jpg', title: 'Help children in South America', meals:'1000' , donation:'$140' , date:'15-09-2020'},
  { imageurl:'assets/media/project5.jpg', title: 'Help victims of war in Ukraine', meals:'800' ,  donation:'$70' , date:'10-09-2020'},
];
export interface Element1 {
  imageurl:string;
  title: string;
  meals:string;
  donation:string;
  date: string;
}
const ELEMENT_DATA1: Element1[] = [
  { imageurl:'assets/media/project5.jpg', title: 'Help victims of war in Ukraine', meals:'16000' , donation:'$150000'      , date:'29-09-2020'},
  { imageurl:'assets/media/project4.jpg', title: 'Help children in South America', meals:'12000' ,  donation:'$130000', date:'22-09-2020'},
  { imageurl:'assets/media/project3.jpg', title: 'Help children in India', meals:'11000' , donation:'$120000', date:'18-09-2020'},
 
];