import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];


  ngOnInit(){
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    })

    //值的變化
    // this.signupForm.valueChanges.subscribe((value) =>{
    //   console.log(value);
    // })

    //狀態的變化
    this.signupForm.statusChanges.subscribe((status) =>{
      console.log(status);
    })
  }

  onSubmit(){
    console.log(this.signupForm);
  }

  //加入個表單控制元件，並新增至FormGroup
  onAddHobbies(){
    const control = new FormControl(null, Validators.required);
    this.getHobbies.push(control);
  }

  // 取得signupForm物件(FormArray)
  get getHobbies(){
    return this.signupForm.get('hobbies') as FormArray;
  }

  // 同步驗證
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIfForbidden': true};
    }
    return null;
  }

  // 非同步驗證
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() =>{
        if(control.value === 'kenny@ktgh.com.tw'){
          resolve({'emailIfForbidden': true});
        }else{
          resolve(null);
        }
      }, 1500)
    });

    return promise;
  }
}
