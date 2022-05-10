import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-community-guidelines',
  templateUrl: './community-guidelines.component.html',
  styleUrls: ['./community-guidelines.component.css']
})
export class CommunityGuidelinesComponent implements OnInit {
  
  _contactObservable: any;
  data:any;

  constructor( 
    private spinner: NgxSpinnerService,
    private pageService: PagesService,
    ) { }

  ngOnInit() {
    this.getData()
  }

  getData() {
		this.spinner.show();
    let filters = {
      slug: 'community-guidlines'
    }
		this._contactObservable = this.pageService.getAll('page', filters).subscribe((response) => {
		  if (response.success) {
			this.data = response.data;
			this.spinner.hide();
		  } else {
			this.spinner.hide();
		  }
		}, error=> {
		  this.spinner.hide();
		});
	}
}
