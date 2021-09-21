import { Component, OnInit , ViewChild,ChangeDetectorRef } from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../config';
import { UserService } from '../../../core/user/user.service';
@Component({
  selector: 'kt-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {
displayedColumns = [ 'name' ,'email', 'phoneno',  'location', 'paymentby',  'amount' , 'date' ];
  dataSource :any;
    selection = new SelectionModel<Element>(true, []);
	 IMAGES_URL=config.IMAGES_URL;
		 errors=config.errors;
	isLoading = true;
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
   this.get_donations();
   }

	get_donations()
	{
			this.userService.postData({},'all_donations').subscribe((result) => {
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
  email: string;
  phoneno: string;
  location:string;
  amount:string;
  date:string;
  paymentby: string;
}
const ELEMENT_DATA: Element[] = [
  { name: 'John Doe' , email: 'john@gmail.com' , phoneno:'8887775555'  , location:'Toronoto' , paymentby:'Credit Card',amount:'$150' , date:'09-09-2020 09:06'},
  {  name: 'David Jones' , email: 'david@gmail.com' , phoneno:'8687955566'  , location:'California' , paymentby:'Credit Card',amount:'$130' , date:'04-09-2020 11:55'},
  { name: 'Steve James' , email: 'steve@gmail.com' , phoneno:'987456210'  , location:'Washington DC' , paymentby:'Credit Card',amount:'$240' , date:'04-09-2020 05:44'},
  { name: 'Andrew Philip' , email: 'andrew@gmail.com' , phoneno:'9999789990'  , location:'San Francisco' , paymentby:'Credit Card',amount:'$350' , date:'01-09-2020 21:20'},
  { name: 'Andy Smith', email: 'andy@gmail.com' , phoneno:'7896554120'  , location:'British Columbia' , paymentby:'Credit Card',amount:'$230' , date:'08-08-2020 23:44'},
  {  name: 'Maria James' , email: 'maria@gmail.com' , phoneno:'5632107890'  , location:'California' , paymentby:'Credit Card',amount:'$320' , date:'27-07-2020 23:56'},
];