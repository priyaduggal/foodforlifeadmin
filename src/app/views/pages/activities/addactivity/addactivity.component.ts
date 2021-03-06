import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { config } from '../../../../config';
import { UserService } from '../../../../core/user/user.service';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'kt-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.scss']
})
export class AddactivityComponent implements OnInit {
title:any;
loading = false;
description:any;
allowedMimes:any = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg'];
amount:any;
reg_exp1:any;
meals:any;	
errors=config.errors;
is_license_uploaded:boolean=false;
is_submit:boolean=false;
license_file:any;
license_image_url:any;
type:any;
license_error:boolean=false;
 public uploader:FileUploader = new FileUploader({url: ''});
  startDate = new Date(1990, 0, 1);
  public imagePath;
  countries=[];
  imgURL: any;
  public message: string;
  constructor(private router: Router,public sanitizer:DomSanitizer,private _snackBar: MatSnackBar,
  private cdr: ChangeDetectorRef, public userService: UserService) {
this.reg_exp1=/^[0-9]+$/;
	  }

  ngOnInit() {
  }
   showSnackBar(message){
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
  
   uploadLicense(event)
  {
	 this.license_error = false;
    var self = this;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      var image_file = event.target.files[0];
      if(self.allowedMimes.indexOf(image_file.type) == -1){
        this.license_error = true;
		this.showSnackBar('This filetype is not supported');  
      }
      else{
      	self.license_file = image_file;
      	self.license_image_url = window.URL.createObjectURL(image_file);
      	self.is_license_uploaded = true;
      }
    } 
  }
  
  
  addactivity()
  {
			this.is_submit=true;
			if(this.errors.indexOf(this.title) >= 0 ||
			this.errors.indexOf(this.description) >= 0 ||
			this.errors.indexOf(this.description) >= 0 ||
			this.errors.indexOf(this.amount) >= 0 ||
			this.errors.indexOf(this.meals) >= 0 ||
			!this.reg_exp1.test(this.amount) ||
			!this.reg_exp1.test(this.meals) ||
			this.errors.indexOf(this.license_image_url) >= 0){
			return;
			}else
			{

			const frmData = new FormData();  
			if(this.errors.indexOf(this.license_file)>=0)
			{
			frmData.append("file", "");
			}else{
			frmData.append("file", this.license_file);	
			}

			frmData.append("title",this.title);  
			frmData.append("description", this.description);  
			frmData.append("amount", this.amount);  
			frmData.append("meals",this.meals);  

			console.log(frmData);

	this.userService.postData(frmData,'addActivity').subscribe((result) => {
		 this.loading = false;
				if(result.status==1)
				{
					this.showSnackBar('Activity added successfully');  
					this.router.navigate(['/demo1/activities']);
				}else
				{
					this.showSnackBar('Error while adding product,Please try after some time');
				}
	  	});
			
		}
  }
  
  

}
