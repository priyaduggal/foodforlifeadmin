import { Component, OnInit , ViewChild,ChangeDetectorRef } from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../config';
import { UserService } from '../../../core/user/user.service';

@Component({
  selector: 'kt-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
 dataSource :any;
	 IMAGES_URL=config.IMAGES_URL;
		 errors=config.errors;
displayedColumns = ['imageurl' , 'price' , 'duration' ,'action'];
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
    this.dataSource.paginator = this.paginator;
	    this.dataSource.sort = this.sort;
  }
   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor(private modalService: NgbModal,private cdr: ChangeDetectorRef, public userService: UserService) { 
   this.get_subscription();
  }
  get_subscription()
	{
			this.userService.postData({},'subscriptionlist').subscribe((result) => {
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
  imageurl:string;
  price: string;
  duration: string;
}
const ELEMENT_DATA: Element[] = [
  { imageurl:'assets/media/prj11.jpg', duration:'2 months', price:'$180'},
  { imageurl:'assets/media/prj12.jpg', duration:'4 months', price:'$360'},
  { imageurl:'assets/media/prj13.jpg', duration:'3 months', price:'$540'},
  { imageurl:'assets/media/prj4.jpg',  duration:'5 months', price:'$900'},
  { imageurl:'assets/media/prj15.jpg', duration:'1 month', price:'$1800'},
];