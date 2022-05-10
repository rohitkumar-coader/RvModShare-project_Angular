
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  updateData: any;
  public user = true;
  userDetail: any = {};
  public userID: any;
  fileToUpload: File = null;
  tab=0;
  subtab=0;
  subtabs=0;
  subtabin=0;
  subtabsin =0;
  ispacent = false;
  mainsubtabs =0;
  userId = ""
  // public catType = true;
  // public category = true;
  // public role = true;
  // public product = true;
  // public discount = true;
  // public coupon = true;
  // public Blog = true;
  // public order = true;
  // public payment = true;
  // permissions: any
  userImage :string=""

  _userObservable: any;
  @Input() active: string;
  @Input() tooglebutton: any;
  @Output() Layout = new EventEmitter<any>();
  mainsubtab: any; //updated_by_gi

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
 
  }
  maintabClick(m){
    if(m == this.mainsubtabs){
      this.mainsubtabs = 0
    }
    else{
      this.mainsubtabs = m
    }
  }
  tabClick(p){
    if(p == this.tab){
      this.tab = 0
    }
    else{
      this.tab = p
    }
  }
  subtabClick(s){
    if(s == this.subtab){
      this.subtab = 0
    }
    else{
      this.subtab = s
    }
  }
  subtabsClick(e){
    if(e == this.subtabs){
      this.subtabs = 0
    }
    else{
      this.subtabs = e
    }
  }
  subtabinClick(i){
    if(i == this.subtabin){
      this.subtabin = 0
    }
    else{
      this.subtabin = i
    }
  }
  subtabsinClick(n){
    if(n == this.subtabsin){
      this.subtabsin = 0
    }
    else{
      this.subtabsin = n
    }
  }
  mouseEnter(div : string){
    console.log("mouse enter : " + div);
 }

 mouseLeave(div : string){
   console.log('mouse leave :' + div);
 }

  changeSidebar() {
    this.tooglebutton = !this.tooglebutton;
    this.Layout.emit(this.tooglebutton);

  }
}
