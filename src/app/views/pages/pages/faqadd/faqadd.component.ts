import { Component, OnInit , ViewChild ,ChangeDetectorRef} from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../../config';
import { UserService } from '../../../../core/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-faqadd',
  templateUrl: './faqadd.component.html',
  styleUrls: ['./faqadd.component.scss']
})
export class FaqaddComponent implements OnInit {
title:any;is_submit:boolean=false;
description:any;errors=config.errors;
isLoading = true;
  constructor(private router: Router,private modalService: NgbModal,private cdr: ChangeDetectorRef, public userService: UserService,private _snackBar: MatSnackBar ) { }

  ngOnInit() {
  }
  showSnackBar(message){
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  submit()
  {
			this.is_submit=true;
			if(this.errors.indexOf(this.title) >= 0 ||
			this.errors.indexOf(this.description) >= 0){
			return;
			}else
			{
			this.isLoading = true;
			this.userService.postData({title: this.title,description:this.description},'addfaq').subscribe((result) => {
			this.isLoading = false;
			this.cdr.markForCheck();
			this.showSnackBar('Faq added successfully'); 
			this.router.navigate(['/demo1/pages/faq']);  
			});
	  
			}
       
  }

}
