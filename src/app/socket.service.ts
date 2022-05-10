import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
const URL = environment.chat_url;
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // socket: Socket | null = null;
  constructor(
    private socket: Socket,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    // if(isPlatformBrowser(this.platformId)){
    //     this.socket = Socket;
    //   }
  }

  connectOrGet(): any{
    if(isPlatformBrowser(this.platformId)){
      if(this.socket !== null && this.socket instanceof Socket){
        return this.socket;
      }else{
        const config: SocketIoConfig = { url: URL, options: {}};
        this.socket = new Socket(config);
        return this.socket;
      }
    }
  }
  
}
