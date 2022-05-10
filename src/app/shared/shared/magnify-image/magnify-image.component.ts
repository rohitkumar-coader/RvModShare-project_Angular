// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-magnify-image',
//   templateUrl: './magnify-image.component.html',
//   styleUrls: ['./magnify-image.component.css']
// })
// export class MagnifyImageComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ChatService } from 'src/app/chat.service';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorService } from 'src/app/shared/behavior.service';

@Component({
  selector: 'app-magnify-image',
  templateUrl: './magnify-image.component.html',
  styleUrls: ['./magnify-image.component.css']
})
export class MagnifyImageComponent implements OnInit {
  chatService:any
  users:any;
  imageurl:any
  type:any;
  user:any
  postId:any;
  _Observable:any;
  loader:any;

_url:any = environment.url;

  constructor(private spinner:NgxSpinnerService,
    private modalService:NgbModal,
    private _activateRouter:ActivatedRoute,
    // private chatService:ChatService,
    private sharedService:SharedService,
    public _bs:BehaviorService,
    private toast:ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
      this.user = JSON.parse(localStorage.getItem('user'))
      _bs.magnifyBadgeData.subscribe(res => {
        console.log(res,"magnify data")
        if (res.url){
          this.imageurl=res.url
        }
      })
    }

  ngOnInit() {
  }

  getParam(p) {
    return localStorage.getItem(p) || ''
    // return this._activateRouter.snapshot.queryParamMap.get(p) || ''
  }


  close(){
    this.modalService.dismissAll();
  }

  ngOnDestroy(): void {
    if (this._Observable) {
      this._Observable.unsubscribe();
    }
  }
}
