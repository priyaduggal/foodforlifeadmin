import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { config } from '../../../../config';
import { UserService } from '../../../../core/user/user.service';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-editbeneficiaries',
  templateUrl: './editbeneficiaries.component.html',
  styleUrls: ['./editbeneficiaries.component.scss']
})
export class EditbeneficiariesComponent implements OnInit {
isLoading = false;loading = false;
id:any;IMAGES_URL=config.IMAGES_URL;
project:any;
is_license_uploaded:boolean=false;
license_file:any;	
allowedMimes:any = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg'];
license_image_url:any;
license_error:boolean=false;
name:any;errors=config.errors;

description:any;
image:any;
is_submit:boolean=false;
  constructor(private _snackBar: MatSnackBar,public activatedRoute: ActivatedRoute,
	private router: Router,public sanitizer:DomSanitizer,
	private cdr: ChangeDetectorRef, public userService: UserService) {
	this.id = activatedRoute.snapshot.paramMap.get('id');
	this.getData();
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
getData()
{           
this.isLoading = true;
			this.userService.postData({'id':this.id},'benedetails').subscribe((result) => {
			this.project=result.data;
			this.name=this.project.name;
			this.description=this.project.description;
			this.image=this.project.image;
			this.cdr.markForCheck();
			},
			err => {
			this.isLoading = false;
			});
	
}
editbene()
{
		this.is_submit=true;
			if(this.errors.indexOf(this.name) >= 0 ||
			this.errors.indexOf(this.description) >= 0){
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
			frmData.append("id",this.id);  

			console.log(frmData);

	      this.userService.postData(frmData,'updatebeneficiaries').subscribe((result) => {
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
  ngOnInit() {
  }

}
