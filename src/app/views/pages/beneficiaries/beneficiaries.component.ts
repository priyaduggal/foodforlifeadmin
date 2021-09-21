import { Component, OnInit , ViewChild ,ChangeDetectorRef} from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../config';
import { UserService } from '../../../core/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'kt-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.scss']
})
export class BeneficiariesComponent implements OnInit {
IMAGES_URL=config.IMAGES_URL;
errors=config.errors;
del_id:any=null;
loading = false;
del_index:any=null;
modalRef:any;
displayedColumns = [ 'imageurl' , 'title', 'description'  ,'action'];
dataSource :any;
isLoading = true;
selection = new SelectionModel<Element>(true, []);
	/** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

openVerticallyCentered(content,del_id,del_index) {
       this.modalRef = this.modalService.open(content, { centered: true });
     this.del_id = del_id;
    this.del_index = del_index;
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
    this.dataSource.paginator = this.paginator;
	    this.dataSource.sort = this.sort;
  }
   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor(private _snackBar: MatSnackBar,private modalService: NgbModal,private cdr: ChangeDetectorRef, public userService: UserService) {
this.getbeneficiaries();	  }

  ngOnInit() {
  }
  deleteben()
  {
	   this.loading = true;
       this.userService.postData({id:this.del_id},'deleteben').subscribe((result) => {
      this.loading = false;
   
      if(result.status == 1){
        this.modalRef.close();
        this.dataSource.data.splice(this.del_index,1);
        this.cdr.markForCheck();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSnackBar('Beneficiaries deleted successfully.');
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
  getbeneficiaries()
  {
	  this.isLoading = true;
	  this.userService.postData({},'tribesbeneficiaries').subscribe((result) => {
		  this.isLoading = false;
				this.cdr.markForCheck();
				this.dataSource = new MatTableDataSource(result.data);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				this.cdr.markForCheck();
	  	});
	  
  }
open(content) {
        this.modalService.open(content).result.then((result) => {       
        });
    }

}export interface Element {
  title: string;
  imageurl:string;
  //result: string;
  description: string;
}
const ELEMENT_DATA: Element[] = [
  { imageurl:'assets/media/project1.jpg', title: 'Andrew Smith',       description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text'},
  { imageurl:'assets/media/project2.jpeg', title: 'David Jones', description:'Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text'},
  { imageurl:'assets/media/project3.jpg', title: 'Stephen Fleming' , description:'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text'},
  { imageurl:'assets/media/project4.jpg', title: 'Philip Andrew', description:'Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text'},
  { imageurl:'assets/media/project5.jpg', title: 'Jimmy Jones', description:'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text'},
];
