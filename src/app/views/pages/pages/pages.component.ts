import { Component, OnInit , ViewChild ,ChangeDetectorRef} from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../config';
import { UserService } from '../../../core/user/user.service';

@Component({
  selector: 'kt-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  displayedColumns = [  'title', 'action'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  isLoading = true;
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
  this.pages();
   }
pages()
{
   this.isLoading = true;
    this.userService.postData({},'pages').subscribe((result) => {
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
  title: string;
  date: string;
}
const ELEMENT_DATA: Element[] = [
 

];