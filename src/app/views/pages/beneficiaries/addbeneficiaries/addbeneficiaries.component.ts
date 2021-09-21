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
  selector: 'kt-addbeneficiaries',
  templateUrl: './addbeneficiaries.component.html',
  styleUrls: ['./addbeneficiaries.component.scss']
})
export class AddbeneficiariesComponent implements OnInit {
title:any;isLoading = false;
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
name:any;
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
   showSnackBar(message){
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
  editbene()
{
		this.is_submit=true;
			if(this.errors.indexOf(this.name) >= 0 ||
			this.errors.indexOf(this.description) >= 0 ||
			this.errors.indexOf(this.license_file)>=0){
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

			frmData.append("name",this.name);  
			frmData.append("description", this.description);  
			

	      this.userService.postData(frmData,'addbeneficiaries').subscribe((result) => {
		  this.loading = false;
				if(result.status==1)
				{
					this.showSnackBar('Beneficiaries updated successfully');  
					this.router.navigate(['/demo1/beneficiaries']);
				}else
				{
					this.showSnackBar('Error while updating product,Please try after some time');
				}
	  	});
			
		}
}

}
