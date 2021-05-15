import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { IUserSettings } from '../data/user-setting.interface';

@Component({
  selector: 'tdf-user-setting-form',
  templateUrl: './user-setting-form.component.html',
  styleUrls: ['./user-setting-form.component.css']
})
export class UserSettingFormComponent implements OnInit {

  originalUserSettings: IUserSettings = {
    name: null,
    emailOffer: null,
    interfaceStyle: null,
    userSubscription: null,
    notes: null
  }

  formError: boolean = false;
  formErrMsg: string = '';

  subscriptionTypes: Observable<string[]>;

  userSettings: IUserSettings = { ...this.originalUserSettings }

  constructor(private postData: DataService) { }

  ngOnInit(): void {
    this. subscriptionTypes = this.postData.getSubscriptions();
  }

  onBlur(val: NgModel):void{
    console.log('On Name Blur = ', val.valid);
  }

  formSubmit(form: NgForm): void {
    console.log('On Form Submit = ', form.valid);
    if(form.valid){
      this.postData.postUserSettings(this.userSettings).subscribe(
        result => console.log('Success', result),
        error => this.showFormError(error)
      )
    }else{
      this.formErrMsg = 'Please check and correct errors above';
    }
    
  }

  showFormError(err: any): void {
    console.log('Error', err);
    this.formError = true;
    this.formErrMsg =  err.error.errorMessage || 'There is Some error Please refresh the Page and Try again later...';    
  }

}
