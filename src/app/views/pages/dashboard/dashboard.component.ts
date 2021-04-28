// Angular
//import { Component, OnInit } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';
import { Component,ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
// Services
// Widgets model
import { LayoutConfigService, SparklineChartOptions } from '../../../core/_base/layout';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../config';
import { UserService } from '../../../core/user/user.service';

@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	  displayedColumns = ['position' , 'name' ,'email', 'phoneno',  'location', 'paymentby',  'amount' , 'date' ,  'action'];
	  displayedColumns1 = ['position' , 'imageurl' , 'name' ,'email', 'phoneno','status' , 'action']; 
	     dataSource: any;
		 dashboard_data:any;
		 IMAGES_URL=config.IMAGES_URL;
		 errors=config.errors;
	isLoading = true;
	users=[];
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
	loading = false;
		     dataSource1:any;
	chartOptions1: SparklineChartOptions;
	chartOptions2: SparklineChartOptions;
	chartOptions3: SparklineChartOptions;
	chartOptions4: SparklineChartOptions;
	// widget4_1: Widget4Data;
	// widget4_2: Widget4Data;
	// widget4_3: Widget4Data;
	// widget4_4: Widget4Data;

	constructor(private cdr: ChangeDetectorRef, public userService: UserService,private layoutConfigService: LayoutConfigService , private modalService: NgbModal) {
		
		this.get_dashboard();
		this.get_recent_users();
		this.get_recent_donations();
		
		
	}
	get_recent_donations()
	{
				this.userService.postData({},'recent_donations').subscribe((result) => {
				this.cdr.markForCheck();
				this.dataSource1 = new MatTableDataSource(result.data);
				this.cdr.markForCheck();
				this.dataSource1.paginator = this.paginator;
				this.dataSource1.sort = this.sort;
	  	});
	}
	get_recent_users()
	{
		this.userService.postData({},'recent_users').subscribe((result) => {
				this.cdr.markForCheck();
				this.dataSource = new MatTableDataSource(result.data);
				this.cdr.markForCheck();
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
	  	});
		
	}
	get_dashboard(){
	  	this.userService.postData({},'admin_dashboard').subscribe((result) => {
	  		this.dashboard_data = result;
	  		this.cdr.markForCheck();
	  	});
	}
open(content) {
        this.modalService.open(content).result.then((result) => {       
        });
    }
	ngOnInit(): void {
		this.chartOptions1 = {
			data: [10, 14, 18, 11, 9, 12, 14, 17, 18, 14],
			color: this.layoutConfigService.getConfig('colors.state.brand'),
			border: 3
		};
		this.chartOptions2 = {
			data: [11, 12, 18, 13, 11, 12, 15, 13, 19, 15],
			color: this.layoutConfigService.getConfig('colors.state.danger'),
			border: 3
		};
		this.chartOptions3 = {
			data: [12, 12, 18, 11, 15, 12, 13, 16, 11, 18],
			color: this.layoutConfigService.getConfig('colors.state.success'),
			border: 3
		};
		this.chartOptions4 = {
			data: [11, 9, 13, 18, 13, 15, 14, 13, 18, 15],
			color: this.layoutConfigService.getConfig('colors.state.primary'),
			border: 3
		};

		
	}
}
export interface Element {
  name: string;
  email: string;
  position: number;
  phoneno: string;
  location:string;
  amount:string;
  date:string;
  paymentby: string;
}
const ELEMENT_DATA: Element[] = [
  {position: 1 ,  name: 'John Doe' , email: 'john@gmail.com' , phoneno:'8887775555'  , location:'Toronoto' , paymentby:'Credit Card',amount:'$150' , date:'09-09-2020 09:06'},
  {position: 2 ,  name: 'David Jones' , email: 'david@gmail.com' , phoneno:'8687955566'  , location:'California' , paymentby:'Credit Card',amount:'$130' , date:'04-09-2020 11:55'},
  {position: 3 ,  name: 'Steve James' , email: 'steve@gmail.com' , phoneno:'987456210'  , location:'Washington DC' , paymentby:'Credit Card',amount:'$240' , date:'04-09-2020 05:44'},
  {position: 4 ,  name: 'Andrew Philip' , email: 'andrew@gmail.com' , phoneno:'9999789990'  , location:'San Francisco' , paymentby:'Credit Card',amount:'$350' , date:'01-09-2020 21:20'},
  {position: 5 ,  name: 'Andy Smith', email: 'andy@gmail.com' , phoneno:'7896554120'  , location:'British Columbia' , paymentby:'Credit Card',amount:'$230' , date:'08-08-2020 23:44'},
  {position: 6 ,  name: 'Maria James' , email: 'maria@gmail.com' , phoneno:'5632107890'  , location:'California' , paymentby:'Credit Card',amount:'$320' , date:'27-07-2020 23:56'},
];
export interface Element1 {
  imageurl: string;
  name: string;
  email: string;
  position: number;
  phoneno: string;
  status:string; 
}
const ELEMENT_DATA1: Element1[] = [
  {position: 1 ,   imageurl:'assets/media/users/100_6.jpg'  , name: 'Andrew Smith' , email: 'andrew@gmail.com'  , phoneno:'8887775555',  status:'Active' },
    {position: 2 ,  imageurl:'assets/media/users/100_7.jpg'  , name: 'John Doe' , email: 'johndoe@gmail.com'  , phoneno:'8687955566' ,  status:'Inactive'},
      {position: 3 ,  imageurl:'assets/media/users/100_8.jpg'  , name: 'Marry James' , email: 'marry@gmail.com'  , phoneno:'987456210' ,  status:'Active' },
        {position: 4 ,  imageurl:'assets/media/users/100_9.jpg'  , name: 'David Jones ' , email: 'david@gmail.com'  , phoneno:'9999789990' ,  status:'Active'},
          {position: 5 , imageurl:'assets/media/users/100_5.jpg'  ,  name: 'Steve John' , email: 'steve@gmail.com'  , phoneno:'5632107890' ,  status:'Inactive'},
];