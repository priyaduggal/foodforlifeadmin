import { Component, OnInit , ViewChild ,ChangeDetectorRef} from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../config';
import { UserService } from '../../../core/user/user.service';
@Component({
  selector: 'kt-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
displayedColumns = ['imageurl' , 'name', 'email' , 'phone' , 'status'  ,'action'];
  //dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  dataSource:any;
   IMAGES_URL=config.IMAGES_URL;
		 errors=config.errors;
  isLoading = true;
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
    //this.dataSource.paginator = this.paginator;
	  //  this.dataSource.sort = this.sort;
  }
   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor(private modalService: NgbModal,private cdr: ChangeDetectorRef, public userService: UserService) { 
  this.get_users();
  }
  get_users()
  {
	  this.isLoading = true;
	  this.userService.postData({},'allusers').subscribe((result) => {
		  this.isLoading = false;
				this.cdr.markForCheck();
				this.dataSource = new MatTableDataSource(result.data);
				this.cdr.markForCheck();
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
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
  name: string;
  //result: string;
  email: string;
  phone: string;
  imageurl: string;
  status: string;
}
const ELEMENT_DATA: Element[] = [
  { imageurl:'assets/media/users/100_1.jpg', name: 'Adelmo ',  email: 'adelmo@gmail.com' , status: 'Active', phone: '+1234 567 890'},
  { imageurl:'assets/media/users/100_2.jpg', name: 'John Smith ', email: 'john@gmail.com' , status: 'Inactive', phone: '+1234 567 890'},
  { imageurl:'assets/media/users/100_3.jpg', name: 'David Smith', email: 'david@gmail.com' ,  status: 'Active', phone: '+1234 567 890'},
  { imageurl:'assets/media/users/100_4.jpg', name: 'Steve Smith', email: 'steve@gmail.com' ,  status: 'Active', phone: '+1234 567 890'},
  { imageurl:'assets/media/users/100_5.jpg', name: 'Johnson', email: 'johnson@gmail.com' , status: 'Inactive', phone: '+1234 567 890'},
  { imageurl:'assets/media/users/100_6.jpg', name: 'Andrew', email: 'andrew@gmail.com' ,  status: 'Active ', phone: '+1234 567 890'}
];