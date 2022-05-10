import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ChatService } from 'src/app/chat.service';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';
import { PagesService } from '../pages.service';
import {AppInjector} from '../../app.module';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-like-listing-modal',
  templateUrl: './like-listing-modal.component.html',
  styleUrls: ['./like-listing-modal.component.scss']
})
export class LikeListingModalComponent implements OnInit {
  chatService:any
  users:any;
  type:any;
  user:any
  postId:any;
  _Observable:any;
  loader:any;

_url:any = environment.url;

  constructor(private spinner:NgxSpinnerService,
    private appService:PagesService,
    private modalService:NgbModal,
    private _activateRouter:ActivatedRoute,
    // private chatService:ChatService,
    private sharedService:SharedService,
    private toast:ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
      this.user = JSON.parse(localStorage.getItem('user'))
    }

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      this.chatService = AppInjector.get(ChatService);
    }
    this.getData()
  }

  getParam(p) {
    return localStorage.getItem(p) || ''
    // return this._activateRouter.snapshot.queryParamMap.get(p) || ''
  }


  close(){
    this.modalService.dismissAll();
  }

  // /add/friends

  addFriend(recipientId) {
    let user:any = JSON.parse(localStorage.getItem('user') || '')

      let data = {
        recipientId:recipientId,
        requesterId:user.id
      }

      this.loader = true;
      this._Observable = this.appService.post(data, `add/friends`).subscribe(res => {
        if (res.success) {
          this.chatService.sendNotif({ user_id: recipientId});
          this.toast.success(res.message);
          this.close()
          this.loader = false;
        } else {
         
        }

      },
        error => {
          this.loader = false;
        });
  }

  getImage(url){
    let value = './assets/img/user.png';
    if(url) value = this._url+url;

    return value;
  }
  getUrl(img,detail) {

    let image = '';
    let socialImage=false
    if(img!=undefined){
      socialImage=this.imageIsOfSocialLogin(img)
    }
    if(img && img!=undefined && socialImage && (detail.gId ||  detail.fbId )&& (detail.gId!="" || this.user.fbId!="")){
      image = img;
    }
    else if(img && img!=undefined && img!=""  && !socialImage && (detail.gId ||  detail.fbId ) && (detail.gId!="" || detail.fbId!="")){
      console.log("in else if 1")
      image = this._url + img;
    }
    else if (img && (!detail.gId || detail.gId=="" || !detail.fbId || detail.fbId=="")) {
      image = this._url + img;
    } else {
      image = '/assets/img/user.png';
    }
    return image

  }
  imageIsOfSocialLogin(img){
    let socialImage=false
    if (img.indexOf("http://") == 0 || img.indexOf("https://") == 0) {
      socialImage=true
    }
    else{
      socialImage=false
    }
    return socialImage
  }
  followMod(id) {
    let data = {
      'followFriendID': id,
      "type": "follower"
    }
    this.spinner.show();
    this.sharedService.post(data, 'follow/friend').subscribe(
      (res: any) => {
        if (res.success) {
          this.sendNotif(id)
          // this.toastr.success(res.message)
          this.getData();
        } else {
          this.toast.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();

      }
    );
  }
  sendNotif(id) {
    let data={
      user_id:id
    }
    this.chatService.sendNotif(data);
  }
  getData() {
    let filter = {
     type:this.getParam('type')?this.getParam('type'):'normalPost',
     postId:this.getParam('postId')
    }

    this.loader = true;

    // this.spinner.show();
    this.appService.getAll('liked/userlist', filter).subscribe((res: any) => {
      if (res.success) {
        this.users = res.data;
        console.log(this.users,"liked users")
      }

      this.loader = false;
        
    },error=>{
      this.loader = false;
    });
  }
  cancelRequest(id,index) {
    this.spinner.show();

    this.appService.cancelRequest(id).subscribe(
      (res: any) => {
        console.log(res);
        this.spinner.hide();
        if (res.success) {
          this.sendNotif(id);
          this.toast.success(res.message);
          this.users[index].isPending = res.isPending;
            this.users[index].isFriend = false;
          //  this._router.navigate(['/auth/login-signup']);
        } else {
          //  this._sharedService.loader('hide');
          this.toast.error(res.error.message);
        }
      },
      (error) => {
        this.spinner.hide();
        this.toast.error("There are some error please try after some time.");
      }
    );
  }
  unFriend(id,index) {
    this.spinner.show();

    this.appService.unFriend(id).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.success) {
          this.sendNotif(id);
          this.toast.success(res.message);
          this.users[index].isFriend = false;
        } else {
          //  this._sharedService.loader('hide');
          this.toast.error(res.error.message);
        }
      },
      (error) => {
        this.spinner.hide();
        this.toast.error("There are some error please try after some time.");
      }
    );
  }

  ngOnDestroy(): void {
    if (this._Observable) {
      this._Observable.unsubscribe();
    }
  }
}
