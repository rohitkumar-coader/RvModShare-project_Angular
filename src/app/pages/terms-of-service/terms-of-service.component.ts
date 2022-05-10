import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss']
})
export class TermsOfServiceComponent implements OnInit {

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
      slug: 'terms-conditions'
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
