import { Component, OnInit , ViewChild ,ChangeDetectorRef} from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../../config';
import { UserService } from '../../../../core/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
  import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
  import {  ActivatedRoute } from '@angular/router';
@Component({
  selector: 'kt-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
timestamp:any;
id:any;
isLoading = true;
description:any;
public tools: object = {
         items: [
                'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
                'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
                'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
                'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
                'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
        }; 
		public tools2: object = {
         items: [
                'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
                'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
                'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
                'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
                'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
        }; 
  constructor(private router: Router,public activatedRoute: ActivatedRoute,private modalService: NgbModal,private cdr: ChangeDetectorRef, public userService: UserService,private _snackBar: MatSnackBar ) { 
  this.id = activatedRoute.snapshot.paramMap.get('id');
  this.getData();
this.timestamp = new Date().getTime();  
  }
getData()
{
 this.isLoading = true;
    this.userService.postData({id: this.id},'getpagedetails').subscribe((result) => {
      this.isLoading = false;
      this.description=result.data.description;
      
        this.cdr.markForCheck();
      });
  
}

submit()
{
  
  this.isLoading = true;
    this.userService.postData({id: this.id,description:this.description},'updatepagedetails').subscribe((result) => {
      this.isLoading = false;
        this.cdr.markForCheck();
        this.showSnackBar('Page updated successfully'); 
        this.router.navigate(['/demo1/pages']);  
      });
  
       
}
showSnackBar(message){
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }


  ngOnInit() {
  }

}
