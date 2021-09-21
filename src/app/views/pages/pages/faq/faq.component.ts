import { Component, OnInit , ViewChild ,ChangeDetectorRef} from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../../config';
import { UserService } from '../../../../core/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'kt-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
dataSource:any;
del_id:any=null;
loading = false;
del_index:any=null;
modalRef:any;
displayedColumns = [ 'title', 'description' , 'action'];
  
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
    this.dataSource.paginator = this.paginator;
	    this.dataSource.sort = this.sort;
  }
   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
   isLoading = true;
  constructor(private _snackBar: MatSnackBar,private modalService: NgbModal,private cdr: ChangeDetectorRef, public userService: UserService) {
  this.faq();
   }
   deletefaq()
   {
	    this.loading = true;
       this.userService.postData({id:this.del_id},'deletefaq').subscribe((result) => {
      this.loading = false;
   
      if(result.status == 1){
        this.modalRef.close();
        this.dataSource.data.splice(this.del_index,1);
        this.cdr.markForCheck();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSnackBar('FAQ deleted successfully.');
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
   faq()
  {
   this.isLoading = true;
    this.userService.postData({},'GetAllFaq').subscribe((result) => {
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
  openVerticallyCentered(content,del_id,del_index) {
       this.modalRef = this.modalService.open(content, { centered: true });
     this.del_id = del_id;
    this.del_index = del_index;
  }
open(content) {
        this.modalService.open(content).result.then((result) => {       
        });
    }

}

export interface Element {
  title: string;
  description:string;
}
const ELEMENT_DATA: Element[] = [
 
  ]
