import { Component, OnInit , ViewChild } from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {


displayedColumns = [ 'select' , 'username',  'email' , 'subject' ,  'date' , 'action'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
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
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
open(content) {
        this.modalService.open(content).result.then((result) => {       
        });
    }

}export interface Element {
  username: string;
  email: string;
  subject: string;
  date: string;
}
const ELEMENT_DATA: Element[] = [
  { username: 'Adam Jones',    email:'adamjones@gmail.com' , date:'09-09-2020 09:06' , subject:'Assign  OM Guarantee Certification'},
  { username: 'Andrew Philip', email:'andrewphilip@gmail.com' , date:'04-09-2020 11:55' , subject:'Assign  OM Guarantee Certification'},
  { username: 'Jimmy Jones' ,  email:'jimmyjones@gmail.com' , date:'04-09-2020 05:44' , subject:'Assign  OM Guarantee Certification'},
  { username: 'Steve Joe',     email:'stevejoe@gmail.com' , date:'01-09-2020 21:20' , subject:'Assign  OM Guarantee Certification '},
  { username: 'Maria James',  email:'mariajames@gmail.com' , date:'08-08-2020 23:44' , subject:'Assign  OM Guarantee Certification'},
];
