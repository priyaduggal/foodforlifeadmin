import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { config } from '../../../../config';
import { UserService } from '../../../../core/user/user.service';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-editactivity',
  templateUrl: './editactivity.component.html',
  styleUrls: ['./editactivity.component.scss']
})
export class EditactivityComponent implements OnInit {
title:any;
description:any;
amount:any;
meals:any;
tags:any;
imagepro:any;
IMAGES_URL=config.IMAGES_URL;
//type:any;
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
	
	product_images:any;
	img_error:boolean = false;
	email:any;
	allowedMimes:any = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg'];
	password:any;
	country:any;
	state:any;
	project:any;
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
	constructor(private _snackBar: MatSnackBar,public activatedRoute: ActivatedRoute,
	private router: Router,public sanitizer:DomSanitizer,
	private cdr: ChangeDetectorRef, public userService: UserService) {
	this.id = activatedRoute.snapshot.paramMap.get('id');
	this.reg_exp1=/^[0-9]+$/;
	this.getData();
	
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
  editactivity()
  {
	  	this.is_submit=true;
			if(this.errors.indexOf(this.title) >= 0 ||
			this.errors.indexOf(this.description) >= 0 ||
			this.errors.indexOf(this.description) >= 0 ||
			this.errors.indexOf(this.amount) >= 0 ||
			this.errors.indexOf(this.meals) >= 0 ||
			!this.reg_exp1.test(this.amount) ||
			!this.reg_exp1.test(this.meals)){
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
			frmData.append("id",this.id);  

			console.log(frmData);

	      this.userService.postData(frmData,'updateactivity').subscribe((result) => {
		  this.loading = false;
				if(result.status==1)
				{
					this.showSnackBar('Activity updated successfully');  
					this.router.navigate(['/demo1/activities']);
				}else
				{
					this.showSnackBar('Error while updating product,Please try after some time');
				}
	  	});
			
		}
  }
	getData()
	{
		this.isLoading = true;
			this.userService.postData({'id':this.id},'activitydetails').subscribe((result) => {
            
			this.project=result.data;
			this.title=this.project.title;
			this.amount=this.project.target_amount;
			this.meals=this.project.target_meals;
			this.description=this.project.description;
			
			this.cdr.markForCheck();
			this.type=this.project.type;
			this.imagepro=this.project.image;
			this.cdr.markForCheck();
			},
			err => {
			this.isLoading = false;
			});
	}

  ngOnInit() {
  }

}
