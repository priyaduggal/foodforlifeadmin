import { Component, OnInit , ViewChild ,ChangeDetectorRef} from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../../config';
import { UserService } from '../../../../core/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
 import {  ActivatedRoute } from '@angular/router';
@Component({
  selector: 'kt-faqedit',
  templateUrl: './faqedit.component.html',
  styleUrls: ['./faqedit.component.scss']
})
export class FaqeditComponent implements OnInit {
timestamp:any;
id:any;is_submit:boolean=false;errors=config.errors;
isLoading = true;
description:any;
title:any;
  constructor(private router: Router,public activatedRoute: ActivatedRoute,private modalService: NgbModal,private cdr: ChangeDetectorRef, public userService: UserService,private _snackBar: MatSnackBar ) { 
  this.id = activatedRoute.snapshot.paramMap.get('id');
  this.getData();
this.timestamp = new Date().getTime();  
  }
  getData()
{
 this.isLoading = true;
    this.userService.postData({id: this.id},'getfaqdetails').subscribe((result) => {
      this.isLoading = false;
      this.description=result.data.description;
      this.title=result.data.title;
        this.cdr.markForCheck();
        console.log(this.title);

      });
  
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
    this.userService.postData({id: this.id,description:this.description,title:this.title},'updatefaq').subscribe((result) => {
      this.isLoading = false;
        this.cdr.markForCheck();
        this.showSnackBar('Faq updated successfully'); 
        this.router.navigate(['/demo1/pages/faq']);  
      });
			}
  
       
}

  ngOnInit() {
  }

}
