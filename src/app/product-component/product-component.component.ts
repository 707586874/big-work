import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CJ} from './user';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit {
  title(title: any) {
    throw new Error("Method not implemented.");
  }

  myForm: FormGroup;
  id: AbstractControl;
  userName: AbstractControl;
  fs: AbstractControl;
  users$: Observable<CJ>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentUser: CJ;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'id': [''],
      'userName': [''],
      'fs': ['']
    });``

    this.id = this.myForm.controls['id'];
    this.userName = this.myForm.controls['userName'];
    this.fs = this.myForm.controls['fs'];
  }


  ngOnInit(): void {
    this.users$ = <Observable<CJ>>this.httpClient.get(this.baseUrl + 'cj');
  }

  search() {
    if (this.id.value) {
      this.users$ = <Observable<CJ>>this.httpClient.get(this.baseUrl + 'cj/' + this.id.value);
    } else {
      this.users$ = <Observable<CJ>>this.httpClient.get(this.baseUrl + 'cj');
    }


  }
  add() {
    console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'cj',
      this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('添加成功!');
          }
        });

  }
  delete() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    }
    else {
      this.httpClient.delete(this.baseUrl + 'cj/' + this.currentUser.id).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('删除成功!');
          }
        }
      )
    }

  }

  update() {
    if (!this.currentUser) {
      alert('必须先选择用户');
    } else {
      this.httpClient.put(this.baseUrl + 'cj', this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功!');
          }
        }
      )
    }

  }
  select(u: CJ) {
    this.currentUser = u;
    this.myForm.setValue(this.currentUser);
  }



}