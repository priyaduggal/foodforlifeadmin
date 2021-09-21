import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { config } from '../../../../config';
import { UserService } from '../../../../core/user/user.service';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'kt-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
	selected = 'option2';
	
	isLoading = false;
	is_submit:boolean=false;
	profile:any;
	id:any;
	addForm: FormGroup;
	first_name:any;
	last_name:any;
	loading = false;
	all_images:any=[];
	countries=[];
	donations=[];
	type:any;
	IMAGES_URL=config.IMAGES_URL;
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
	opassword:any;
	address:any;
	reg_exp:any;
	image:any;
	reg_exp1:any;
	errors=config.errors;
	is_license_uploaded:boolean=false;
	license_file:any;
	license_image_url:any;
	license_error:boolean=false;
	places = new FormControl('Kembali');
	placeList: string[] = ['KATU', 'Kembali', 'La Cabane Bar Marcaipe', 'La Caverna', 'La Creperie' , 'La Rocca' , 'La Ursa'];
	constructor(public activatedRoute: ActivatedRoute,private router: Router,
	public sanitizer:DomSanitizer,private _snackBar: MatSnackBar,private cdr: ChangeDetectorRef, public userService: UserService) {
	this.id = activatedRoute.snapshot.paramMap.get('id');
	this.allcon();
	this.reg_exp1=/^[0-9]+$/;
	this.getData();
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
		 this.showSnackBar('This filetype is not supported');   
      }
      else{
      	self.license_file = image_file;
      	self.license_image_url = window.URL.createObjectURL(image_file);
      	self.is_license_uploaded = true;
      }
    }
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
  states1()
  {
	  this.userService.postData({'country_id':this.country},'get_states').subscribe((result) => {
				this.cdr.markForCheck();
				console.log(result.data);
				this.states=result.data;
	  	});
  }
	getData()
	{
			this.isLoading = true;
			this.userService.postData({'id':this.id},'Userdetails').subscribe((result) => {
            
			this.profile=result.data;
			this.donations=result.donations;
			this.first_name=this.profile.first_name;
			this.last_name=this.profile.last_name;
			this.email=this.profile.email;
			this.address=this.profile.address;
			this.phone=this.profile.phone;
			this.country=this.profile.country;
			this.image=this.profile.image;
			this.states1();
			
			this.state=this.profile.state;
			this.status=this.profile.status;
			this.type=this.profile.type;
			
			console.log(this.profile);
			this.cdr.markForCheck();
			},
			err => {
			this.isLoading = false;
			});
	}


edituser()
{ 
	  this.is_submit = true;
	if(this.errors.indexOf(this.first_name) >= 0 ||
	this.errors.indexOf(this.last_name) >= 0 ||
	!this.reg_exp.test(String(this.email).toLowerCase()) || 
	this.errors.indexOf(this.email) >= 0 ||
	!this.reg_exp1.test(this.phone) ||
	this.phone.length < 10||
	this.errors.indexOf(this.phone) >= 0 ||
	this.errors.indexOf(this.status) >= 0 ||
	this.errors.indexOf(this.address) >= 0 ||
	this.errors.indexOf(this.country) >= 0 ||
	this.errors.indexOf(this.state) >= 0 ||
	this.errors.indexOf(this.type) >= 0 
	){
	return false;
    }
	
	if(this.errors.indexOf(this.password) ==-1  && this.errors.indexOf(this.cpassword) >=0 )
	{
	return false;	
	}
	
	if(this.errors.indexOf(this.password) ==-1  && this.errors.indexOf(this.cpassword)==-1 && 
     this.password!=this.cpassword	)
	{
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
    frmData.append("userid",this.id);  
   
	
	console.log(frmData);
	
	this.userService.postData(frmData,'edituser').subscribe((result) => {
		 this.loading = false;
				if(result.status==1)
				{
					this.showSnackBar('User updated successfully');  
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
