import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  _contactObservable:any;
  data:any;

  constructor(private spinner: NgxSpinnerService,
    private pageService: PagesService,
    ) { }

  ngOnInit() {
    this.getData()
  }

  getData() {
		this.spinner.show();
    let filters = {
      slug: 'privacy-policies'
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

  ngOnDestroy(): void {
    if (this._contactObservable) {
      this._contactObservable.unsubscribe();
    }
  }

}
