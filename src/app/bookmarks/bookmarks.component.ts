import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bookmarks } from '../models/bookmarks';
import { UrlService } from '../services/url.service';
import { RequiredValidator } from '../validators/required.directive';
import { UrlValidator } from '../validators/url.validator';
import { LocalStorageService } from '../services/local-storage.service';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  form: FormGroup;

  key: string = 'key';
  urlArr: Bookmarks[] = [];
  urlVal: Bookmarks;
  urlToUpdate: Bookmarks;
  storedItems: Bookmarks[];
  checkDuplicates: boolean;
  newVal: Bookmarks;
  checkUpdateDuplicates: boolean;

  constructor(private fb: FormBuilder, private urlService: UrlService,
    private sharedService: SharedService, private localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit(): void {

    this.createForm();

    //testing a random link to be replaced with input value
    //later, unfortunately no time
    // this.urlService.checkUrl('http://2.com').subscribe(res => {
    //   // console.log(res)
    // }
    // )dummy commit trigger pr review
    //trigger with dummy commit the pipeline
    this.getListVal(this.urlToUpdate);
    console.log(this.urlToUpdate)
    if (localStorage.getItem(this.key)) {

      this.storedItems = JSON.parse(this.localStorageService.getItem(this.key) || 'no');
      this.urlArr = this.storedItems;
    }
  }

  createForm() {
    this.form = this.fb.group({
      url: ['', [RequiredValidator, UrlValidator]],
    })
  }

  getNewArr(arr: Bookmarks[]) {
    if (this.localStorageService.getItem('key')) {

      this.localStorageService.setItem('key', JSON.stringify([...arr]))
    }
  }

  get url() {
    return this.form.get('url');
  }

  //get the value of div to update
  getListVal(list: Bookmarks) {
    this.urlToUpdate = list;
    console.log(this.urlToUpdate)
    if (this.localStorageService.getItem(this.key)) {

      let localStorageArray = JSON.parse(this.localStorageService.getItem(this.key) || 'no') as Array<Bookmarks>;
    }
  }

  newValz(val: Bookmarks) {
    console.log(this.urlToUpdate);
    console.log(val);
    let localStorageArray = JSON.parse(this.localStorageService.getItem(this.key) || 'no') as Array<Bookmarks>;
    for (let i = 0; i < localStorageArray.length; i++) {
      if (localStorageArray[i] === this.urlToUpdate) {
        localStorageArray.splice(i, 1);
      }
    }
    localStorageArray.push(val);
    this.getNewArr(localStorageArray);
    this.urlArr = localStorageArray;
  }

  onSubmit() {
    this.urlVal = this.form.get('url')?.value;
    if (this.storedItems && this.storedItems.includes(this.urlVal)) {
      this.checkDuplicates = true;
    }
    else {
      this.urlArr.push(this.urlVal);
      this.localStorageService.setItem(this.key, JSON.stringify(this.urlArr));
      this.sharedService.pushValue(this.urlVal);
      this.router.navigate(['results']);
      this.form.reset();
    }
  }

  updateUrl(updateVal: Bookmarks) {
    console.log(updateVal)
    console.log(this.newVal)
  }

}
