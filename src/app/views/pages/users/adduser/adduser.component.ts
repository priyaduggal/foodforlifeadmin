import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { config } from '../../../../config';
import { UserService } from '../../../../core/user/user.service';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'kt-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
addForm: FormGroup;
reg_exp1:any;
first_name:any;
last_name:any;
loading = false;
all_images:any=[];
type:any;
product_images:any;
img_error:boolean = false;
email:any;
allowedMimes:any = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg'];
password:any;
country:any;
state:any;
states=[];
phone:any;
status:any;
cpassword:any;
address:any;
reg_exp:any;
errors=config.errors;
is_license_uploaded:boolean=false;
license_file:any;
license_image_url:any;
license_error:boolean=false;
 public uploader:FileUploader = new FileUploader({url: ''});
  startDate = new Date(1990, 0, 1);
  public imagePath;
  countries=[];
  imgURL: any;
  public message: string;
 is_submit:boolean=false;
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  constructor( private router: Router,public sanitizer:DomSanitizer,private _snackBar: MatSnackBar,
  private cdr: ChangeDetectorRef, public userService: UserService) { 
  this.allcon();
   this.reg_exp1=/^[0-9]+$/;
  this.reg_exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }
  showSnackBar(message){
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
  uploadLicense(event){
	 
    this.license_error = false;
    var self = this;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      var image_file = event.target.files[0];
      if(self.allowedMimes.indexOf(image_file.type) == -1){
        this.license_error = true;
      }
      else{
      	self.license_file = image_file;
      	self.license_image_url = window.URL.createObjectURL(image_file);
      	self.is_license_uploaded = true;
      }
    }
  }
   images(){
    this.img_error = false;
    this.product_images = [];
    var files = this.uploader.queue;
    console.log(files)
    var inc = files.length;
    for(var i=1;i<=inc;i++){
      if(this.product_images.length == 0){
        if(config.IMAGE_EXTENSIONS.indexOf(files[i-1]._file.type) >= 0){
          this.product_images.push(files[i-1]._file);
          this.product_images[i-1]['url'] = window.URL.createObjectURL(this.product_images[i-1]);
        }
        else{
          this.img_error = true;
        }
      }
      else{
        if(config.IMAGE_EXTENSIONS.indexOf(files[i-1]._file.type) >= 0){
          this.product_images.push(files[i-1]._file);
          this.product_images[this.product_images.length - 1]['url'] = window.URL.createObjectURL(this.product_images[i-1]);

        }
        else{
          this.img_error = true;
        }
      }
    }
    this.all_images = this.all_images.concat(this.product_images);
    this.uploader.queue = [];
   }
  allcon()
  {
	  	this.userService.postData({},'allcountries').subscribe((result) => {
			this.countries = result.data;
			this.cdr.markForCheck();
				
	  	});
  }
  onChange(event,val)
  {
	  this.userService.postData({'country_id':val},'get_states').subscribe((result) => {
				this.cdr.markForCheck();
				console.log(result.data);
				this.states=result.data;
	  	});
  }
  adduser()
  { 
  
	  this.is_submit = true;
	if(this.errors.indexOf(this.first_name) >= 0 ||
	this.errors.indexOf(this.last_name) >= 0 ||
	this.phone.length < 10||
	!this.reg_exp.test(String(this.email).toLowerCase()) || 
	!this.reg_exp1.test(this.phone) ||
	this.errors.indexOf(this.email) >= 0 ||
	this.errors.indexOf(this.phone) >= 0 ||
	this.errors.indexOf(this.status) >= 0 ||
	this.errors.indexOf(this.address) >= 0 ||
	this.errors.indexOf(this.country) >= 0 ||
	this.errors.indexOf(this.state) >= 0 ||
	this.errors.indexOf(this.type) >= 0 ||
	this.errors.indexOf(this.cpassword) >= 0 ||
	this.errors.indexOf(this.password) >= 0
	||  this.password!=this.cpassword){
	return false;
    }
	this.loading = true;
	const frmData = new FormData();  
    if(this.errors.indexOf(this.license_file)>=0)
	{
    frmData.append("file", "");
	}else{
	frmData.append("file", this.license_file);	
	}
  
    frmData.append("first_name",this.first_name);  
    frmData.append("last_name", this.last_name);  
    frmData.append("email", this.email);  
    frmData.append("phone", this.phone);  
    frmData.append("status",this.status);  
    frmData.append("address",this.address);  
    frmData.append("country",this.country);  
    frmData.append("state",this.state);  
    frmData.append("password",this.password);  
    frmData.append("type",this.type);  
   
	
	console.log(frmData);
	
	this.userService.postData(frmData,'adduser').subscribe((result) => {
		 this.loading = false;
				if(result.status==1)
				{
					this.showSnackBar('User added successfully');  
					this.router.navigate(['/demo1/users']);
				}else
				{
					this.showSnackBar('Error while adding product,Please try after some time');
				}
	  	});
	
	
  }

  ngOnInit() {
  }

}
