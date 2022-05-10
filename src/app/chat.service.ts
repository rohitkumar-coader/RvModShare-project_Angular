import { isPlatformBrowser } from "@angular/common";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { SocketService } from "./socket.service";
import { Socket } from "ngx-socket-io";

// const URL = "http://74.208.206.18:4477";
// const URL = "http://198.251.65.146:4777/";
const URL = environment.chat_url;
// const URL = "http://74.208.206.18:477";
@Injectable({
  providedIn: "root",
})
export class ChatService {
  socket: any = null;
  // constructor(private http: HttpClient,private socket: Socket,@Inject(PLATFORM_ID) private platformId: Object) {
  // if(isPlatformBrowser(this.platformId)){
  //   this.socket = this.socketService.connectOrGet();
  // }
  // }
  constructor(
    private http: HttpClient,
    private socketService: SocketService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.socket = this.socketService.connectOrGet();
    }
  }

  public sendMessage(message) {
    if (isPlatformBrowser(this.platformId)) {
    }
  }
  public connectUserOnline(message) {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.emit("connection", message);
    }
  }
  public fetchHistory(data) {
    console.log("fetch-history service");
    if (isPlatformBrowser(this.platformId)) {
      this.socket.emit("fetch-history", data);
    }
  }
  public deleteMessage(data) {
    console.log("deleteMessage service");
    if (isPlatformBrowser(this.platformId)) {
      this.socket.emit("d-status", data);
    }
  }
  public updateDeleteMessage = () => {
    console.log("updateDeleteMessagfe 1");
    if (isPlatformBrowser(this.platformId)) {
      return Observable.create((observer) => {
        this.socket.on("ud-status", (message) => {
          observer.next(message);
        });
      });
    }
  };

  public updateHistory = () => {
    console.log("update-history 1");
    if (isPlatformBrowser(this.platformId)) {
      return Observable.create((observer) => {
        this.socket.on("update-history", (message) => {
          observer.next(message);
        });
      });
    }
  };

  public removeConnection(data) {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.emit("remove-connection", data);
    }
  }

  public updateConnection = () => {
    console.log("updateConnection 1");
    if (isPlatformBrowser(this.platformId)) {
      return Observable.create((observer) => {
        this.socket.on("update-connection", (data) => {
          observer.next(data);
        });
      });
    }
  };

  public getMessages = (converstationId) => {
    // return this.socket.fromEvent(`new-message${converstationId}`).pipe(map((data) => data));

    // return new Observable((observer) => {
    //   this.socket.on(`new-message${converstationId}`, (message) => {
    //     observer.next(message);
    //   });
    // });
    if (isPlatformBrowser(this.platformId)) {
      return Observable.create((observer) => {
        this.socket.on(`new-message${converstationId}`, (message) => {
          observer.next(message);
        });
      });
    }
  };

  public sendOne2OneMessage(message) {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.emit("one-to-one", message);
    }
    // this.getMessages(message.converstationId)
  }
  public testMessages = () => {
    console.log("test event 1");
    if (isPlatformBrowser(this.platformId)) {
      return Observable.create((observer) => {
        this.socket.on("test-event", (message) => {
          observer.next(message);
        });
      });
    }
  };
  public getNotifs = () => {
    if (isPlatformBrowser(this.platformId)) {
      console.log("get notif 1");
      return Observable.create((observer) => {
        this.socket.on("get-notification", (data) => {
          observer.next(data);
        });
      });
    }
  };

  public sendNotif(data) {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.emit("new-notification", data);
    }
  }
  public readMessageStatus(data) {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.emit("read-messageStatus", data);
    }
  }
  public verifyReadStatus = () => {
    if (isPlatformBrowser(this.platformId)) {
      console.log("verify-readStatus 1");
      return Observable.create((observer) => {
        this.socket.on("verify-readStatus", (data) => {
          observer.next(data);
        });
      });
    }
  };
  public showUserOnline = () => {
    console.log("test event 1");
    if (isPlatformBrowser(this.platformId)) {
      return Observable.create((observer) => {
        this.socket.on("show-online", (data) => {
          observer.next(data);
        });
      });
    }
  };
  public showUserOffline = () => {
    if (isPlatformBrowser(this.platformId)) {
      return Observable.create((observer) => {
        this.socket.on("show-offline", (data) => {
          observer.next(data);
        });
      });
    }
  };

  public disconnectSocket = () => {
    if (isPlatformBrowser(this.platformId)) {
      return Observable.create((observer) => {
        this.socket.on("disconnect", (message) => {
          observer.next(message);
        });
      });
    }
  };

  public connect = () => {
    if (isPlatformBrowser(this.platformId)) {
      return Observable.create((observer) => {
        this.socket.on("connect", (message) => {
          console.log("socket connected");
          observer.next(message);
        });
      });
    }
  };

  public addUser(newUser) {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.emit("new-user", newUser);
    }
  }

  public removeUser(newUser) {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.emit("user-offline", newUser);
    }
  }

  public showOnline(newUser) {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.emit("user-online", newUser);
    }
  }

  public sendMessageEvent(eventName, message) {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.emit(eventName, message);
    }
  }
  public fileUploadEvent(message) {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.emit("file-uploaded", message);
    }
  }

  public showOffline(newUser) {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.emit("user-offline", newUser);
    }
  }

  // fetch_history(user){
  //   console.log("in fetch history api",user)
  //   // let params = new HttpParams();
  //   // let headers = new HttpHeaders();
  //   // params.set("email", user.email);
  //   console.log(URL + "chat/fetch_history?email=" + user.email)
  //   return this.http.get(URL + "chat/fetch_history?email=" + user.email);
  // };
  fetch_history = (user) => {
    let headers = new HttpHeaders();
    return this.http.get(URL + "chat/fetch_history_count?email=" + user.email, {
      headers: headers,
    });
  };

  public user_history = (to: string, from: string) => {
    // return this.http.get(environment.config.CHAT_URL + '/admin/user_history?from=' + from + '&to=' + to)
    return this.http.get(URL + "chat/user_history?from=" + from + "&to=" + to);
  };

  put(body, path) {
    let headers = new HttpHeaders();
    // let headers = this.getAuthorizationHeader();
    return this.http.put(URL + path, body, {
      headers: headers,
    });
  }

  get(path) {
    // const headers = this.getAuthorizationHeader();
    return this.http.get(URL + path);
  }

  public user_list = (id: string) => {
    let headers = new HttpHeaders();
    return this.http.get(URL + "chatUser?id=" + id, {
      headers: headers,
    });
  };
  public deleteUserMessage(data) {
    let headers = new HttpHeaders();
    return this.http.post(URL + "chat/delete/message", data, {
      headers: headers,
    });
  }

  postFile(fileToUpload: File, to, from, img) {
    // const endpoint = environment.config.CHAT_URL + '/admin/uploadfile';
    const endpoint = URL + "chat/uploadfile";
    const formData: FormData = new FormData();
    formData.append("attachment", fileToUpload, fileToUpload.name);
    formData.append("to", to), formData.append("from", from);
    formData.append("img", img);
    // formData.append("propertyId", propertyId);
    return this.http
      .post(endpoint, formData, {
        reportProgress: true,
        observe: "events",
      })
      .pipe(catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.log(errorMessage);s
    return throwError(errorMessage);
  }
}
