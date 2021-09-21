import { Component, ViewChild,OnInit ,ChangeDetectorRef} from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../config';
import { UserService } from '../../../core/user/user.service';
//import $ from "jquery";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'kt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
adminid:any;
errors=config.errors;
first_name:any;
last_name:any;
email:any;
phone:any;
address:any;
country:any;
reg_exp:any;
state:any;
password:any;
reg_exp1:any;
cpassword:any;
is_submit:boolean=false;
loading = false;
constructor(private cdr: ChangeDetectorRef,public userService: UserService,
    private modalService: NgbModal,private _snackBar: MatSnackBar) { 
    this.adminid=localStorage.getItem('apart_admin_auth_token');
     this.reg_exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     this.get_profile();
	 this.reg_exp1=/^[0-9]+$/;
}
get_profile()
{
	this.userService.postData({id:this.adminid},'getAdminDetails').subscribe((result) => {
        this.cdr.markForCheck();
        this.first_name=result.data.first_name;
        this.last_name=result.data.last_name;
        this.email=result.data.email;
        this.address=result.data.address;
        this.phone=result.data.phone;
       
      });
}
showSnackBar(message){
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

updateprofile()
{
	 this.is_submit = true;
        if(this.errors.indexOf(this.first_name) >= 0 ||
        this.errors.indexOf(this.last_name) >= 0 ||
		this.phone.length < 10||
		!this.reg_exp1.test(this.phone) ||
        !this.reg_exp.test(String(this.email).toLowerCase()) || 
        this.errors.indexOf(this.email) >= 0 ||
        this.errors.indexOf(this.phone) >= 0 ||
        this.errors.indexOf(this.address) >= 0 
        ){
        return false;
        }
        if(this.errors.indexOf(this.password) ==-1  && this.errors.indexOf(this.cpassword) >=0 )
        {
        return false; 
        }
        if(this.errors.indexOf(this.password) ==-1  && this.errors.indexOf(this.cpassword)==-1 && 
        this.password!=this.cpassword  )
        {
        return false; 
        }

        this.loading = true;

        let frmData={
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        password: this.password,
        id:this.adminid,
        };
        console.log(frmData);
        this.userService.postData(frmData,'UpdateProfileDetails').subscribe((result) => {
        this.loading = false;
        if(result.status==1)
        {
        this.showSnackBar('Admin updated successfully');  
        
        }else
        {
        this.loading = false;
        this.showSnackBar(result.message);
        }
        });
	

}
  ngOnInit() {
  }

}
