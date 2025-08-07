import { AfterContentInit, AfterViewChecked, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Bookmarks } from '../models/bookmarks';
import { LocalStorageService } from '../services/local-storage.service';
import { SharedService } from '../services/shared.service';
import { RequiredValidator } from '../validators/required.directive';
import { UrlValidator } from '../validators/url.validator';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit, AfterViewChecked {
  $sharedServiceSubscription: Subscription;
  form: FormGroup;
  urlVal: Bookmarks;
  storedItems: Bookmarks[];
  checkDuplicates: boolean;
  urlArr: Bookmarks[] = [];
  urlToUp: Bookmarks;
  show: boolean = false;
  key: string = 'key';
  errorMessage: Bookmarks;
  @Input() listVal: Bookmarks;
  @Output() formVal: EventEmitter<Bookmarks> = new EventEmitter();
  constructor(private fb: FormBuilder, private localStorageService: LocalStorageService, private sharedService: SharedService) { }
  //ngoninit
  ngOnInit(): void {

    this.createForm();

    this.getEditClickEvent();


    if (localStorage.getItem(this.key)) {

      this.storedItems = JSON.parse(this.localStorageService.getItem(this.key) || 'no');
    }

    this.urlArr = this.storedItems;
    console.log(this.listVal);
  }

  ngAfterViewChecked() {
    console.log(this.listVal);
    this.urlToUp = this.listVal;
  }


  createForm() {
    this.form = this.fb.group({
      url: [this.urlToUp, [RequiredValidator, UrlValidator]]
    })
  }



  get url() {
    return this.form.get('url');
  }
  //receive edit icon click event
  getEditClickEvent() {
    this.sharedService.currentDataStream.subscribe(res => {
      if (res === true) {
        this.show = !this.show;
        this.form.reset();
      }
    })
  }


  //check if storedItems is true and if the input value exists
  onSubmit() {
    this.urlVal = this.form.get('url')?.value;
    if (this.storedItems && this.storedItems.includes(this.urlVal)) {
      this.checkDuplicates = true;
    } else {
      // this.urlArr.push(this.urlVal);
      // this.localStorageService.setItem(this.key, JSON.stringify(this.urlArr));
      this.sharedService.pushValue(this.urlVal);
      this.formVal.emit(this.urlVal);
      this.show = false;
    }

  }
  // ngOnDestroy() {
  //   this.$sharedServiceSubscription.unsubscribe()
  // }
}

