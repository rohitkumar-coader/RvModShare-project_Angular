import {
  Component,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { BehaviorService } from "../../shared/behavior.service";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { PagesService } from "../pages.service";
import {
  NgbCarouselConfig,
  NgbModal,
  ModalDismissReasons,
} from "@ng-bootstrap/ng-bootstrap";
import { HttpEvent, HttpEventType, HttpParams } from "@angular/common/http";
import { SharedService } from "src/app/shared/shared.service";
import { CredentialsService } from "src/app/auth/credentials.service";
import { Location } from "@angular/common";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { FavouriteListingComponent } from "../favourite-listing/favourite-listing.component";
declare var require: any;
var Filter = require("bad-words"),
  filter = new Filter();
declare const tinymce;

@Component({
  selector: "app-share-mods",
  templateUrl: "./share-mods.component.html",
  styleUrls: ["./share-mods.component.scss"],
})
export class ShareModsComponent implements OnInit {
  reloaddraft: boolean = false;
  isPrivate = false;
  fullCls = false;
  smallCls = true;
  isDraftMod: boolean = false;
  slug: any;
  newBadWords = environment.bad_word;
  selectedX: any;
  selectedMod: any;
  editToolIndex: any = -1;
  editProductIndex: any = -1;
  modPostId: any;
  modDetail: any;
  isEmpty = false;
  toolIndex: any;
  productSubmit = false;
  toolSubmit = false;
  productIndex: any;
  modfilters: any = {};
  search: any;
  searchKeyword: any;
  _postObservable: any;
  rvTypeFilter: any = "";
  makeFilter: any = "";
  modelValue: any = "";
  size: any = "";
  moddocuments: any = [];
  modCategoryValue: any = "";
  yearValue: any = "";
  @ViewChild("postInput", { static: true }) postInput;
  @ViewChild("post", { static: true }) post;
  @ViewChild("modDocInput", { static: false }) modDocInput;
  @ViewChild("groupInput", { static: true }) groupInput;
  @ViewChild("toolInput", { static: false }) toolInput;
  @ViewChild("productInput", { static: true }) productInput;
  @ViewChild("toolModal", { static: true }) toolModalContent: TemplateRef<any>;
  @ViewChild("productModal", { static: true })
  productModalContent: TemplateRef<any>;
  imageLoader: boolean = false;
  validUrl = true;
  progress: number = 0;
  closeResult = "";
  productArray: any = [];
  toolArray: any = [];
  toolsFormArray: FormArray;
  productsFormArray: FormArray;
  toolForm: FormGroup;
  productForm: FormGroup;
  modSubmit: Boolean = false;
  mymodposts = [];
  afterImages = [];
  beforeImages = [];
  modCategories = [];
  difficulties = [];
  images = [];
  posterr = "";
  postImage: any;
  poll = false;
  allMakes = [];
  // myForm: FormGroup;
  maxChars = 70;
  allModels = [];
  year = new Date().getFullYear() + 1;
  years = [];
  beforeImageLoader = false;
  afterImageLoader = false;
  modPostForm: FormGroup;
  postimageLoader: boolean = false;
  default_mod = true;
  showBtn = true;
  myDetail: any = {};
  badgeImage: any;
  loaderImage = false;
  badge: object = {
    group_points: 0,
    profile_points: 0,
    social_post_points: 0,
    mod_post_points: 0,
    group_badge: "",
    mod_post_badge: "",
    profile_badge: "",
    social_post_badge: "",
    // "group_image":"",
    // "mod_post_image":"",
    // "profile_image":"",
    // "social_post_image":""
  };
  badgeImages = [];
  favMods: any = [];

  badgesData: Array<any> = [];
  fileToUpload: File = null;
  groupImage: any;
  tagsArray: Array<any> = [];
  today = new Date();
  mygroups: Array<any> = [];
  selectedRvType: any;
  selectedmake: any;
  selectedmodel: any;
  modalReference: any;
  modalReference2: any;
  // hideDefault: boolean = true;
  // hidesDefault: boolean = false;
  submitted: Boolean = false;
  _host = environment.url;
  categories: Array<any> = [];
  skillLevelNeeded: Array<any> = [];
  disabled = false;
  showEmojiPicker = false;
  rvType: any;
  modSubCategories = [];
  filterCategories: any = [];
  filterSize: any = [];
  filterModels: any = [];
  firendsList: any = [];
  timeRanges: any = [];
  contents: Array<any> = [{ id: "a", key: "Test Contest" }];
  rvTypes: Array<any> = [
    {
      description: "Class A",
      detail: { value: "a", key: "Class A" },
    },
    {
      description: "Class B",
      detail: { value: "b", key: "Class B" },
    },
    {
      description: "Class C",
      detail: { value: "c", key: "Class C" },
    },
    {
      description: "Truck Camper",
      detail: { value: "truck-camper", key: "Truck Camper" },
    },
    // {
    //   description: "Camper Van",
    //   detail: { value: "camper-van", key: "Camper Van" },
    // },
    {
      description: "Travel Trailer",
      detail: { value: "trailer", key: "Travel Trailer" },
    },
    // {
    //   description: "Folding Trailer",
    //   detail: { value: "folding-trailer", key: "Folding Trailer" },
    // },
    {
      description: "Fifth-Wheel",
      detail: { value: "fifth-wheel", key: "Fifth-Wheel" },
    },
    {
      description: "Custom",
      detail: { value: "custom", key: "Custom" },
    },
    {
      description: "Ambulance",
      detail: { value: "ambulance", key: "Ambulance" },
    },
    {
      description: "Skoolie",
      detail: { value: "skoolie", key: "Skoolie" },
    },
    // ,
    // {
    //   description: "Other",
    //   detail: { value: "other", key: "Other" },
    // },
    // {
    //   description: "I'm a Wannabe",
    //   detail: { value: "wanna-be", key: "I'm a Wannabe" },
    // },
  ];
  sets = [
    "native",
    "google",
    "twitter",
    "facebook",
    "emojione",
    "apple",
    "messenger",
  ];
  set = "twitter";
  message = "";
  isShown = 1;
  BeforeImageErr: any;
  AfterImageErr: any;
  DocErr: any;
  uploadDocLoader = false;
  Shown: boolean = false;
  postIndex: any;
  drafdid: any;
  // hidesDefault:boolean=false;
  public groupForm: FormGroup;

  createPostModal = false;
  user: any;
  loader = false;
  categoryId: any;
  MakesFilters: any = [];
  registeredRV: boolean = true;
  draftModsCount = 0;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    maxHeight: "auto",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: false,
    showToolbar: true,
    // uploadUrl: this._host + "uploadnormalImages",
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
      { class: "helvetica-neue", name: "Helvetica Neue" },
      { class: "helvetica", name: "Helvetica" },
      { class: "sans-serif", name: "Sans Serif" },
    ],
    // uploadUrl: this._host+'uploadnormalImages',
    // uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: "top",
    toolbarHiddenButtons: [
      [
        "subscript",
        "superscript",
        "justifyLeft",
        "justifyCenter",
        "justifyRight",
        "justifyFull",
        "indent",
        "outdent",
      ],
      ["link", "unlink", "insertVideo", "removeFormat", "toggleEditorMode"],
    ],
  };
  makename: any;
  dmodelname: any;
  classname: any;
  rvtype1: any;
  value: any;
  value1: any;
  constructor(
    private router: Router,
    private _activateRouter: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public _bs: BehaviorService,
    public pageService: PagesService,
    config: NgbCarouselConfig,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private location: Location,
    private modalService: NgbModal,
    public credentials: CredentialsService,
    private fb: FormBuilder
  ) {
    //  _bs.Tabs.subscribe(res =>{
    //   if(res == 'seeMods'){
    //     this.seeModsBtn()
    //   } else {
    //     this.seeModsBtn()
    //   }
    //   // if(res == 'shareMods') this.shareModBtn()
    //   // if(res == 'talkMods') this.talkModBtn()
    //  })
    // this.buildForm();
    let user = localStorage.getItem("credentials");
    this.user = JSON.parse(user);
    this.createModForm();
    this.createToolFormGroup();
    this.createProductFormGroup();
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    this.slug = this._activateRouter.snapshot.paramMap.get("slug");

    // if(this.getParam('modal') == 'seeMods') this.seeModsBtn()
    // if(this.getParam('modal') == 'shareMods') this.shareModBtn()
    // if(this.getParam('modal') == 'talkMods') this.talkModBtn()
  }
  config1 = {
    displayKey: "description", //if objects array passed which key to be displayed defaults to description
    // value: 'selectedDatasource',
    search: true, //true/false for the search functionlity defaults to false,
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Choose RV Type", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 100, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: "more", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search RV Type", // label thats displayed in search input,
    searchOnKey: "description", // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  config2 = {
    displayKey: "description", //if objects array passed which key to be displayed defaults to description
    // value: 'selectedDatasource',
    search: true, //true/false for the search functionlity defaults to false,
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Choose Class", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 100, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: "more", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search Class", // label thats displayed in search input,
    searchOnKey: "description", // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  config3 = {
    displayKey: "description", //if objects array passed which key to be displayed defaults to description
    // value: 'selectedDatasource',
    search: true, //true/false for the search functionlity defaults to false,
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Choose Series", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 100, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: "more", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search Series", // label thats displayed in search input,
    searchOnKey: "description", // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  config4 = {
    displayKey: "description", //if objects array passed which key to be displayed defaults to description
    // value: 'selectedDatasource',
    search: true, //true/false for the search functionlity defaults to false,
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Choose Make", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 100, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: "more", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search Make", // label thats displayed in search input,
    searchOnKey: "description", // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit() {
    // let tab1 = document.getElementById('pills-See-tab')
    // let tab2 = document.getElementById('tab2').click();
    // tab1.classList.remove('active')

    this.setConfigEditor();
    if (this.slug) {
      this.addClss();
      this.getModDetails();
    }
    this.getUserDetail();
    this.getDraftMods();
    this._activateRouter.queryParams.subscribe((param) => {
      if (param) {
        this.getCategories("size");
      }
    });

    this.getModCategories("modpost");
    this.getMakes();
    this.getFiltersMake();
    this.getFilterModels();
    this.getSkillCategories();
    this.getAllTimeRange();
  }

  addClss() {
    //   this.fullCls = true;
    //  this.smallCls = false;

    document.getElementById("pills-home-tab").click();
    this.getModDetails();
  }
  showClss() {
    document.getElementById("pills-profile-tab").click();
    // this.smallCls = true;
    // this.fullCls=false;
  }
  countChangedHandler(count: Number) {
    console.log(count, "my id");
    this.drafdid = count;
    console.log(this.drafdid);
  }
  onEditorChange(e) {
    console.log(e);
  }

  getFiltersMake() {
    let filters = {
      type: "",
      sortBy: -1,
      count: 1000,
    };
    this.pageService.getMainCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          this.MakesFilters = response.data;
          // console.log(this.allMakes, "this.allMakes");
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
      }
    );
  }

  getAllTimeRange() {
    this.pageService.getTimeRanges().subscribe(
      (response) => {
        if (response.success) {
          this.timeRanges = response.data;
          // console.log(this.allMakes, "this.allMakes");
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
      }
    );
  }
  // buildForm() {
  //   this.myForm = this.fb.group({
  //     twoWayControl: [''],
  //   });
  // }
  getModDetails() {
    this.spinner.show();
    let data = {
      slug: this.slug,
      // id: this.modPostId,
    };

    this._postObservable = this.pageService.getModDetail(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.tagsArray = [];
          this.modDetail = res.data;
          this.modPostId = this.modDetail.id;
          this.isDraftMod = this.modDetail.status == "draft" ? true : false;
          this.registeredRV = this.modDetail.registeredRV;
          this.beforeImages =
            this.modDetail.beforeImages != "" ||
            this.modDetail.beforeImages.length > 0
              ? this.modDetail.beforeImages
              : [];
          this.afterImages =
            this.modDetail.afterImages != "" ||
            this.modDetail.afterImages.length > 0
              ? this.modDetail.afterImages
              : [];
          // this.registeredRV = this.modDetail.registeredRV;
          this.moddocuments = this.modDetail["documents"];
          this.modPostForm.patchValue({
            whatIDid: this.modDetail.whatIDid,
            name: this.modDetail.name,
            isCommentDisabled: this.modDetail.isCommentDisabled,
            isFeatured: this.modDetail.isFeatured,
            modCategory: this.modDetail.modCategory
              ? this.modDetail.modCategory.id
              : null,
            size: this.modDetail.size ? this.modDetail.size.id : null,
            skillLevel: this.modDetail.skillLevel
              ? this.modDetail.skillLevel.id
              : null,
            // toolsNeeded: this.modDetail.toolsNeeded
            //   ? this.modDetail.toolsNeeded
            //   : "",
            tags: this.modDetail.tags,
            timerange: this.modDetail.timerange,
            beforeImages:
              this.modDetail.beforeImages != "" ||
              this.modDetail.beforeImages.length > 0
                ? this.modDetail.beforeImages
                : [],
            afterImages:
              this.modDetail.afterImages != "" ||
              this.modDetail.afterImages.length > 0
                ? this.modDetail.afterImages
                : [],
            // make:this.modDetail.make,
            model: this.modDetail.model,
            // series:this.modDetail.series,
            youtubeLink: this.modDetail.youtubeLink,
            documents:
              this.modDetail.documents != "" ||
              this.modDetail.documents.length > 0
                ? this.modDetail.documents
                : [],
            howLongTookMe: this.modDetail.howLongTookMe,
            rvType: this.modDetail.rvType,
            year: this.modDetail.year,
            totalCost: this.modDetail.totalCost,
          });
          this.productArray = this.modDetail.productUsed;
          this.toolArray = this.modDetail.toolsNeeded;
          // this.patchtoolForm(this.toolArray);
          // if (tinymce.get("txtarea"))
          //   tinymce.get("txtarea").setContent(this.modDetail.howLongTookMe);

          if (tinymce.get("txtarea")) {
            tinymce.get("txtarea").setContent(this.modDetail.howLongTookMe);
          }
          // this.tagsArray=this.modDetail["tags"].split(',');
          this.splitByComma(this.modDetail["tags"]);
          setTimeout(() => {
            this.onChangeRvType();
            this.spinner.hide();
          }, 3000);
          // setTimeout(() => {

          // }, 3000);

          // this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
          this.spinner.hide();
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  getFilterModels() {
    // this.spinner.show();
    let filters = {
      type: "",
      categoryId: "",
      count: 1000,
    };
    this.pageService.getSubCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          this.filterModels = response.data;
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
      }
    );
  }

  searchValue() {
    this.searchKeyword = this.search;
    this.rvTypeFilter = this.rvTypeFilter;
    this.makeFilter = this.makeFilter;
    this.modelValue = this.modelValue;
    this.size = this.size;
    this.modCategoryValue = this.modCategoryValue;
    this.yearValue = this.yearValue;

    this.modfilters = {
      search: this.search,
      rvTypeFilter: this.rvTypeFilter,
      makeFilter: this.makeFilter,
      modelValue: this.modelValue,
      size: this.size,
      modCategoryValue: this.modCategoryValue,
      yearValue: this.yearValue,
    };
  }

  // createForm() {
  //   this.groupForm = this.formBuilder.group({
  //     image: [""],
  //     categoryId: ["", Validators.required],
  //     tags: [""],
  //     description: ["", Validators.required],
  //     name: ["", Validators.required],
  //     // password: [""],
  //     // isPrivate: [false],
  //   });
  // }

  route(key, value) {
    if (key == "savedMods") {
      if (value == "all") {
        this.router.navigate(["timeline"], {
          queryParams: { modal: "seeMods" },
        });
      } else {
        this.router.navigate(["mods", value]);
      }
    }
  }

  getParam(p) {
    return this._activateRouter.snapshot.queryParamMap.get(p) || "";
  }

  shareModBtn() {
    console.log("post data..", this.post);
    if (this.post) {
      // this.open(this.post);
      this.isShown = 1;
      this._bs.Tabs.next("seeMods");
    }
  }

  // talkModBtn(){
  //   this.hideDefault=true;
  //   this.hidesDefault=true;
  // }

  createModForm() {
    this.modPostForm = this.formBuilder.group({
      // image: [""],
      beforeImages: [[]],
      afterImages: [[]],
      isFeatured: [false],
      make: ["", Validators.required],
      model: [""],
      series: [""],
      name: ["", Validators.required],
      modCategory: ["", Validators.required],
      // modSubCategory: ["", Validators.required],
      size: ["", Validators.required],
      youtubeLink: [""],
      documents: [[]],
      howLongTookMe: [""],
      isCommentDisabled: [false],
      whatIDid: ["", Validators.required],
      rvType: ["", Validators.required],
      year: ["", Validators.required],
      tags: [""],
      // productUsed: [[]],
      skillLevel: ["", Validators.required],
      // toolsNeeded: [[]],
      // productUsed: this.formBuilder.group({
      //   product: [""],
      //   affiliateLink: [
      //     ""
      //   ],
      // }),
      // toolsNeeded: this.formBuilder.group({
      //   tool: [""],
      //   affiliateLink: [
      //     "",
      //     // Validators.pattern(
      //     //   "^https://www(.+)|www./(.+)|http://www(.+)|http://(.+)|https://(.+)"
      //     // ),
      //   ],
      // }),
      timerange: [""],
      totalCost: [""],
      // toolsFormArray: this.formBuilder.array([this.createToolForm()]),
    });
    this.setConfigEditor();
    // this.addTools();
  }
  createToolFormGroup() {
    this.toolForm = this.formBuilder.group({
      toolsFormArray: this.formBuilder.array([this.createToolForm()]),
    });
    this.addTools();
  }
  addTools() {
    this.toolsFormArray = this.toolForm.get("toolsFormArray") as FormArray;
    // this.affiliateLink.push(this.createAffiliateForm());
    if (this.toolsFormArray.length == 0) {
      this.toolsFormArray.push(this.createToolForm());
      this.toolSubmit = false;
      return;
    } else {
      this.toolSubmit = true;

      if (this.toolSubmit && !this.toolForm.get("toolsFormArray").invalid) {
        this.toolsFormArray.push(this.createToolForm());
        this.toolSubmit = false;
      }
      return;
    }
  }
  clearToolForm() {
    if (this.toolsFormArray && this.toolsFormArray.length > 0) {
      const valueToKeep = this.toolsFormArray.at(0);
      this.toolsFormArray.clear();
      this.toolsFormArray.push(valueToKeep);
    }
  }
  openTool(content) {
    // this.modalReference = this.modalService.open(profilecontent);
    // this.modalService.open(profilecontent, { size: "lg" });
    // this.patchtoolForm(this.toolArray);
    this.modalService.open(content, {
      size: "lg",
      scrollable: true,
      backdrop: "static",
    });
  }
  patchtoolForm(tools) {
    if (tools && tools.length > 0) {
      this.toolsFormArray = this.toolForm.get("toolsFormArray") as FormArray;
      let oldTools = tools;
      let toolsData = [];
      oldTools.forEach((element) => {
        toolsData.push({
          tool: element.tool,
          affiliateLink: element.affiliateLink,
        });
      });
      toolsData.forEach((x) => {
        this.toolsFormArray.push(this.formBuilder.group(x));
      });
      this.toolsFormArray.removeAt(0);
    }
  }
  delete(i) {
    this.toolsFormArray = this.toolForm.get("toolsFormArray") as FormArray;
    this.toolsFormArray.controls[i].get("affiliateLink").clearValidators();
    this.toolsFormArray.controls[i].get("tool").clearValidators();
    this.toolsFormArray.removeAt(i);
    // let array = this.toolForm.value.toolsFormArray;
    this.toolForm.patchValue({ toolsFormArray: this.toolsFormArray });
  }
  edittool(i) {
    this.toolsFormArray = this.toolForm.get("toolsFormArray") as FormArray;
    let valuetobepatch = this.toolArray[i];
    // let array = this.toolForm.value.toolsFormArray;
    this.editToolIndex = i;
    this.toolForm.get("toolsFormArray").patchValue([valuetobepatch]);
    this.openTool(this.toolModalContent);
  }
  submitTool() {
    this.toolSubmit = true;
    if (!this.toolForm.get("toolsFormArray").invalid) {
      if (this.editToolIndex >= 0) {
        this.toolArray[this.editToolIndex] = this.toolsFormArray.value[0];
      }
      if (this.toolArray.length == 0 && this.editToolIndex < 0) {
        this.toolArray = this.toolsFormArray.value;
      } else if (this.toolArray.length > 0 && this.editToolIndex < 0) {
        this.toolArray = this.toolArray.concat(this.toolsFormArray.value);
        // this.toolArray.push(this.toolsFormArray.value);
      }
      this.toolSubmit = false;
      this.toolsFormArray.reset();
      this.editToolIndex = -1;
      this.clearToolForm();
      this.modalService.dismissAll();
    } else {
      return;
    }
  }

  createProductFormGroup() {
    this.productForm = this.formBuilder.group({
      productsFormArray: this.formBuilder.array([this.createProductForm()]),
    });
    this.addProducts();
  }
  addProducts() {
    this.productsFormArray = this.productForm.get(
      "productsFormArray"
    ) as FormArray;
    // this.affiliateLink.push(this.createAffiliateForm());
    if (this.productsFormArray.length == 0) {
      this.productsFormArray.push(this.createToolForm());
      this.productSubmit = false;
      return;
    } else {
      this.productSubmit = true;

      if (
        this.productSubmit &&
        !this.productForm.get("productsFormArray").invalid
      ) {
        this.productsFormArray.push(this.createProductForm());
        this.productSubmit = false;
      }
      return;
    }
  }
  clearProductForm() {
    if (this.productsFormArray && this.productsFormArray.length > 0) {
      const valueToKeep = this.productsFormArray.at(0);
      this.productsFormArray.clear();
      this.productsFormArray.push(valueToKeep);
    }
  }
  // patchProductForm(tools) {
  //   if (tools && tools.length > 0) {
  //     this.productsFormArray = this.productForm.get(
  //       "productsFormArray"
  //     ) as FormArray;
  //     let oldTools = tools;
  //     let toolsData = [];
  //     oldTools.forEach((element) => {
  //       toolsData.push({
  //         tool: element.tool,
  //         affiliateLink: element.affiliateLink,
  //       });
  //     });
  //     toolsData.forEach((x) => {
  //       this.productsFormArray.push(this.formBuilder.group(x));
  //     });
  //     this.productsFormArray.removeAt(0);
  //   }
  // }
  deleteProductFromForm(i) {
    this.productsFormArray = this.productForm.get(
      "productsFormArray"
    ) as FormArray;
    this.productsFormArray.controls[i].get("affiliateLink").clearValidators();
    this.productsFormArray.controls[i].get("product").clearValidators();
    this.productsFormArray.removeAt(i);
    // let array = this.productForm.value.productsFormArray;
    this.productForm.patchValue({ productsFormArray: this.productsFormArray });
  }
  editProduct(i) {
    this.productsFormArray = this.productForm.get(
      "productsFormArray"
    ) as FormArray;
    let valuetobepatch = this.productArray[i];
    // let array = this.productForm.value.productsFormArray;
    this.editProductIndex = i;
    this.productForm.get("productsFormArray").patchValue([valuetobepatch]);
    this.openTool(this.productModalContent);
  }
  submitProduct() {
    this.productSubmit = true;
    if (!this.productForm.get("productsFormArray").invalid) {
      if (this.editProductIndex >= 0) {
        this.productArray[this.editProductIndex] =
          this.productsFormArray.value[0];
      }
      if (this.productArray.length == 0 && this.editProductIndex < 0) {
        this.productArray = this.productsFormArray.value;
      } else if (this.productArray.length > 0 && this.editProductIndex < 0) {
        this.productArray = this.productArray.concat(
          this.productsFormArray.value
        );
      }
      this.productSubmit = false;
      this.productsFormArray.reset();
      this.editProductIndex = -1;
      this.clearProductForm();
      this.modalService.dismissAll();
    } else {
      return;
    }
  }
  createToolForm(): FormGroup {
    return this.formBuilder.group({
      affiliateLink: [
        "",
        Validators.pattern(
          "^https://www(.+)|www./(.+)|http://www(.+)|http://(.+)|https://(.+)"
        ),
      ],
      tool: ["", Validators.required],
    });
  }
  createProductForm(): FormGroup {
    return this.formBuilder.group({
      affiliateLink: [
        "",
        Validators.pattern(
          "^https://www(.+)|www./(.+)|http://www(.+)|http://(.+)|https://(.+)"
        ),
      ],
      product: ["", Validators.required],
    });
  }
  formPatch(p) {
    this.modPostForm.patchValue(p);
  }
  formPatchs(p) {
    this.modPostForm.patchValue(p);
  }
  getSizeValue() {
    let id = this.modPostForm.value.size;
    let value: any = this.difficulties.filter((d) => d.id == id);

    if (value.length) {
      return value[0].name;
    }

    return "Select Mod Size";
  }
  getSizeValues() {
    let id = this.modPostForm.value.size;
    let value: any = this.contents.filter((d) => d.id == id);

    if (value.length) {
      return value[0].Key;
    }

    return "Select Contests";
  }
  posts: any = [
    // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 17, 18, 19, 20,
  ];
  toggleNext() {
    if (this.isShown >= 3) return;
    this.isShown = this.isShown + 1;
  }
  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  toggleBack() {
    if (this.isShown <= 1) return;
    this.isShown = this.isShown - 1;
  }
  toggleShow() {
    this.Shown = !this.Shown;
  }
  get f() {
    return this.groupForm.controls;
  }
  get mf() {
    return this.modPostForm.controls;
  }
  // onSubmit() {
  //   this.submitted = true;
  //   console.log(
  //     this.groupForm.value,
  //     "groupform",
  //     this.groupForm.controls,
  //     "invalid"
  //   );
  //   if (!this.groupForm.invalid) {
  //     let data = this.groupForm.value;
  //     data["tags"] = this.tagsArray.toString();
  //     console.log("in if");
  //     this.pageService.addGroup(data).subscribe(
  //       (res: any) => {
  //         if (res.success) {
  //           this.tagsArray = [];
  //           this.submitted = false;
  //           this.groupForm.reset();
  //           this.modalReference.close();
  //           this.groupImage = [];
  //           this.getMygroups();
  //           // this.categories=res.data
  //           this.spinner.hide();
  //         } else {
  //           this.toastr.error(res.error.message, "Error");
  //         }
  //         this.spinner.hide();
  //       },
  //       (err) => {
  //         this.spinner.hide();
  //       }
  //     );
  //   }
  // }

  uploadImage(files: FileList) {
    if (files && files.length > 5) {
      return;
    }
    if (files && files.length <= 5) {
      const formData: FormData = new FormData();
      let uploadedImageArray: any = [];
      let docData = [];
      // this.fileToUpload = files.item(0)
      for (let index = 0; index < files.length; index++) {
        let element = files[index];
        uploadedImageArray.push(element);
        this.fileToUpload = uploadedImageArray;
        formData.append(
          "data",
          this.fileToUpload[index],
          this.fileToUpload[index].name
        );
      }
      formData.append("modelName", "group");
      let params = new HttpParams().set("?modelName", "group");
      this.imageLoader = true;
      this.sharedService.uploadMultipleImage(params, formData).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              // console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              // console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              // console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log("User successfully created!", event.body);
              if (event.body.success) {
                console.log("event.body.data", event.body.data);
                if (docData.length > 0) {
                  docData.push(...event.body.data.imagePath);
                } else {
                  docData = event.body.data.imagePath;
                }

                this.groupImage = docData;
                this.groupForm.patchValue({ image: this.groupImage });
                this.imageLoader = false;
                this.groupInput.nativeElement.value = "";
              } else {
                window.scrollTo(0, 0);
                this.imageLoader = false;
              }
              setTimeout(() => {
                this.progress = 0;
                this.imageLoader = false;
              }, 100);
          }
        },
        (err) => {
          this.progress = 0;
          this.imageLoader = true;
          // this.toastr.error('There are some errors, please try again after some time !', 'Error');
        }
      );
    }
    // this.fileToUpload = files.item(0);
    // let type: "group";
    // // this.loaderImage =true;
    // this.imageLoader = true;
    // this.pageService.uploadImage(this.fileToUpload, "group").subscribe(
    //   (event: HttpEvent<any>) => {
    //     switch (event.type) {
    //       case HttpEventType.Sent:
    //         // console.log('Request has been made!');
    //         break;
    //       case HttpEventType.ResponseHeader:
    //         // console.log('Response header has been received!');
    //         break;
    //       case HttpEventType.UploadProgress:
    //         this.progress = Math.round((event.loaded / event.total) * 100);
    //         // console.log(`Uploaded! ${this.progress}%`);
    //         break;
    //       case HttpEventType.Response:
    //         // console.log('User successfully created!', event.body);
    //         if (event.body.success) {
    //           this.groupImage = event.body.data.fullpath;
    //           this.groupForm.patchValue({ image: this.groupImage });
    //           this.imageLoader = false;
    //           // this.userForm.patchValue({ image: this.userImage })
    //           this.groupInput.nativeElement.value = "";
    //         } else {
    //           window.scrollTo(0, 0);
    //           this.toastr.error(event.body.error.message, "Error");
    //           this.imageLoader = false;
    //         }
    //         setTimeout(() => {
    //           this.progress = 0;
    //           this.imageLoader = false;
    //         }, 100);
    //     }

    //     // this.imageLoader=false;
    //   },
    //   (err) => {
    //     this.imageLoader = false;
    //     // this.toastr.error('There are some errors, please try again after some time !', 'Error');
    //   }
    // );
  }

  uploadDocument(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadDocLoader = true;
    if (files && files.length > 5) {
      this.DocErr = "You cannot upload more than 5 Docs";
      return;
    }
    if (files && files.length <= 5) {
      this.DocErr = "";
      const formData: FormData = new FormData();
      let uploadedImageArray: any = [];
      let docData = [];
      // this.fileToUpload = files.item(0)
      for (let index = 0; index < files.length; index++) {
        let element = files[index];
        uploadedImageArray.push(element);
        this.fileToUpload = uploadedImageArray;
        formData.append(
          "data",
          this.fileToUpload[index],
          this.fileToUpload[index].name
        );
      }
      formData.append("modelName", "modPost");
      let params = new HttpParams().set("?modelName", "modPost");
      this.uploadDocLoader = true;
      this.sharedService.uploadMultipleDocImage(params, formData).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              // console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              // console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              // console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log("User successfully created!", event.body);
              if (event.body.success) {
                console.log("event.body.data", event.body.data);
                if (docData.length > 0) {
                  docData.push(...event.body.data.imagePath);
                } else {
                  docData = event.body.data.imagePath;
                }
                let newModdocuments = docData.map((cat) => {
                  return {
                    doc: cat.name,
                    fileExt: cat.fileExt,
                    originalName: cat.originalName,
                    type: cat.type,
                  };
                });
                if (this.moddocuments.length > 0) {
                  this.moddocuments = this.moddocuments.concat(newModdocuments);
                  // this.groupdocuments.push(newGroupdocuments)
                } else {
                  this.moddocuments = newModdocuments;
                }
                // let data = {
                //   moddocuments: this.moddocuments,
                // };
                // this.userForm.patchValue({ image: this.userImage })
                this.modPostForm.patchValue({ documents: this.moddocuments });
                this.uploadDocLoader = false;
                this.modDocInput.nativeElement.value = "";
              } else {
                window.scrollTo(0, 0);
                this.uploadDocLoader = false;
              }
              setTimeout(() => {
                this.progress = 0;
                this.uploadDocLoader = false;
              }, 100);
          }
        },
        (err) => {
          this.progress = 0;
          this.uploadDocLoader = true;
          // this.toastr.error('There are some errors, please try again after some time !', 'Error');
        }
      );
    }

    // this.pageService.uploadImage(this.fileToUpload, "modPost").subscribe(
    //   (event: HttpEvent<any>) => {
    //     switch (event.type) {
    //       case HttpEventType.Sent:
    //         // console.log('Request has been made!');
    //         break;
    //       case HttpEventType.ResponseHeader:
    //         // console.log('Response header has been received!');
    //         break;
    //       case HttpEventType.UploadProgress:
    //         this.progress = Math.round((event.loaded / event.total) * 100);

    //         break;
    //       case HttpEventType.Response:
    //         console.log(event);
    //         // console.log('User successfully created!', event.body);
    //         if (event.body.success) {
    //           let doc = event.body.data.fullpath;
    //           this.modPostForm.patchValue({ documents: doc });
    //           this.uploadDocLoader = false;
    //           this.modDocInput.nativeElement.value = "";

    //         } else {
    //           window.scrollTo(0, 0);
    //           this.toastr.error(event.body.error.message, "Error");
    //           this.uploadDocLoader = false;
    //         }
    //         setTimeout(() => {
    //           this.progress = 0;
    //           this.uploadDocLoader = false;
    //         }, 100);
    //     }
    //     console.log(`Uploaded! ${this.progress}%`);
    //     console.log(this.uploadDocLoader)
    //   },
    //   (err) => {
    //     this.uploadDocLoader = false;
    //   }
    // );
  }
  deleteDocument(doc, index) {
    this.moddocuments.splice(index, 1);
    // let data = {
    //   documents: this.moddocuments,
    // };

    let object = {
      imageName: doc,
      modelName: "modPost",
    };
    this.pageService.deleteImage(object).subscribe(
      (res: any) => {
        if (res.success) {
          this.modPostForm.patchValue({ documents: this.moddocuments });
          // this.groupImage = "";
          this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  uploadPostImage(files: FileList) {
    if (files && files.length > 5) {
      return;
    }
    if (files && files.length <= 5) {
      const formData: FormData = new FormData();
      let uploadedImageArray: any = [];
      let docData = [];
      // this.fileToUpload = files.item(0)
      for (let index = 0; index < files.length; index++) {
        let element = files[index];
        uploadedImageArray.push(element);
        this.fileToUpload = uploadedImageArray;
        formData.append(
          "data",
          this.fileToUpload[index],
          this.fileToUpload[index].name
        );
      }
      formData.append("modelName", "posts");
      let params = new HttpParams().set("?modelName", "posts");
      this.postimageLoader = true;
      this.sharedService.uploadMultipleImage(params, formData).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              // console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              // console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              // console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log("User successfully created!", event.body);
              if (event.body.success) {
                console.log("event.body.data", event.body.data);
                if (docData.length > 0) {
                  docData.push(...event.body.data.imagePath);
                } else {
                  docData = event.body.data.imagePath;
                }

                this.postImage = docData;
                this.postimageLoader = false;
                this.postInput.nativeElement.value = "";
              } else {
                window.scrollTo(0, 0);
                this.postimageLoader = false;
              }
              setTimeout(() => {
                this.progress = 0;
                this.postimageLoader = false;
              }, 100);
          }
        },
        (err) => {
          this.progress = 0;
          this.postimageLoader = true;
          // this.toastr.error('There are some errors, please try again after some time !', 'Error');
        }
      );
    }
    // this.fileToUpload = files.item(0);
    // let type: "posts";
    // this.postimageLoader = true;
    // this.pageService.uploadImage(this.fileToUpload, "posts").subscribe(
    //   (event: HttpEvent<any>) => {
    //     switch (event.type) {
    //       case HttpEventType.Sent:
    //         // console.log('Request has been made!');
    //         break;
    //       case HttpEventType.ResponseHeader:
    //         // console.log('Response header has been received!');
    //         break;
    //       case HttpEventType.UploadProgress:
    //         this.progress = Math.round((event.loaded / event.total) * 100);
    //         // console.log(`Uploaded! ${this.progress}%`);
    //         break;
    //       case HttpEventType.Response:
    //         if (event.body.success) {
    //           this.postImage = event.body.data.fullpath;
    //           this.postimageLoader = false;
    //           this.postInput.nativeElement.value = "";
    //         } else {
    //           window.scrollTo(0, 0);
    //           this.toastr.error(event.body.error.message, "Error");
    //           this.postimageLoader = false;
    //         }
    //         setTimeout(() => {
    //           this.progress = 0;
    //           this.postimageLoader = false;
    //         }, 100);
    //     }
    //   },
    //   (err) => {
    //     this.postimageLoader = false;
    //   }
    // );
  }
  // savePost() {
  //   if (this.message == "" && !this.postImage) {
  //     this.posterr = "Content is required";
  //     return;
  //   }

  //   if (this.message != "") {
  //     this.spinner.show();
  //     let data = {
  //       post: this.message,
  //       image: this.postImage,
  //     };
  //     this.pageService.addPost(data).subscribe(
  //       (res: any) => {
  //         if (res.success) {
  //           this.postImage = [];
  //           this.message = "";
  //           this.createPostModal = false;
  //           // this.getallNormalPosts();
  //           // this.groupForm.patchValue({ image: this.groupImage })
  //         } else {
  //           window.scrollTo(0, 0);
  //           this.toastr.error(res.error.message, "Error");
  //         }
  //         this.spinner.hide();
  //       },
  //       (err) => {
  //         this.spinner.hide();
  //         this.toastr.error(
  //           "There are some errors, please try again after some time !",
  //           "Error"
  //         );
  //       }
  //     );
  //   }
  // }
  // closePostModal() {
  //   this.postImage = [];
  //   this.message = "";
  //   this.createPostModal = false;
  // }

  // getFavouriteMods() {
  //   let filters = {
  //     userid: this.credentials.credentials.id,
  //     type: "modPost",
  //   };
  //   this.pageService.getFavouriteMods(filters).subscribe(
  //     (response) => {
  //       if (response.success) {
  //         this.favMods = response.data;
  //         // console.log(  this.modCategories, "this.allMakes");
  //         // this.spinner.hide();
  //       } else {
  //         // this.spinner.hide();
  //       }
  //     },
  //     (error) => {
  //       // this.spinner.hide();
  //     }
  //   );
  // }

  getModCategories(type) {
    // this.spinner.show();
    let filters = {
      type: type,
      count: 1000,
      // sortBy: 'name asc'
      sortBy: -1,
    };
    this.pageService.getMainCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          this.modCategories = response.data;
          // console.log(  this.modCategories, "this.allMakes");
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
      }
    );
  }

  removeImage(image, type, index) {
    console.log(image, type, index, "in remove image");
    if (type == "beforeImages") {
      this.beforeImages.splice(index, 1);
    }
    if (type == "afterImages") {
      this.afterImages.splice(index, 1);
    }
    let object = {
      imageName: image,
      modelName: "modPost",
    };
    this.pageService.deleteImage(object).subscribe(
      (res: any) => {
        if (res.success) {
          this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  getCategories(type) {
    let data = {
      type: "categories",
      cat_type: type,
      count: 10000,
      // sortBy: 'name asc'
    };
    if (type != "size" && type != "skills") {
      data["sortBy"] = "name asc";
    }
    this.pageService.getCategories(data).subscribe(
      (res: any) => {
        if (res.success) {
          // if (type == "modpost") {
          //   this.modCategories = res.data;
          // }
          if (type == "group") {
            this.categories = res.data;
          }
          if (type == "size") {
            this.difficulties = res.data;
          }

          if (type == "skills") {
            this.skillLevelNeeded = res.data;
          }
          // this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        // this.spinner.hide();
      },
      (err) => {
        // this.spinner.hide();
      }
    );
  }

  getSkillCategories() {
    let data = {
      type: "categories",
      cat_type: "difficulty",
      status: "active",
      // sortBy: 'name asc'
    };
    this.pageService.getCategories(data).subscribe(
      (res: any) => {
        if (res.success) {
          // if (type == "modpost") {
          //   this.modCategories = res.data;
          // }

          // if(type=='skills'){
          this.skillLevelNeeded = res.data;
          // }
          // this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        // this.spinner.hide();
      },
      (err) => {
        // this.spinner.hide();
      }
    );
  }

  // getallNormalPosts() {
  //   let data = {
  //     userid: this.user.id,
  //   };
  //   this.pageService.getallNormalPosts(data).subscribe(
  //     (res: any) => {
  //       if (res.success) {
  //         this.posts = [];
  //         this.posts = res.data.map((cat) => {
  //           // console.log(
  //           //   new Date(cat.updatedAt).getTime(),
  //           //   this.today.getTime()
  //           // );
  //           return {
  //             id: cat.id,
  //             image: cat.image,
  //             post: cat.post,
  //             // addedByName: cat.addedBy.displayName
  //             //   ? cat.addedBy.displayName
  //             //   : cat.addedBy.fullName,
  //             // addedByImage: cat.addedBy.image,
  //             status: cat.status,
  //             likes: cat.likesTotal,
  //             comments: cat.commentTotal,
  //             likestatus: cat.likestatus,
  //             time: this.pageService.timeDiffCalc(
  //               new Date(cat.updatedAt).getTime(),
  //               this.today.getTime()
  //             ),
  //             createdAt: cat.createdAt,
  //             updatedAt: cat.updatedAt,
  //           };
  //         });
  //         this.spinner.hide();
  //       } else {
  //         this.toastr.error(res.error.message, "Error");
  //       }
  //       this.spinner.hide();
  //     },
  //     (err) => {
  //       this.spinner.hide();
  //     }
  //   );
  // }

  // deletePost(postId) {
  //   let object = {
  //     id: postId,
  //   };
  //   this.pageService.deleteNormalPost(object).subscribe(
  //     (res: any) => {
  //       if (res.success) {
  //         this.toastr.success(res.message, "Success");
  //         this.getallNormalPosts();
  //         this.spinner.hide();
  //       } else {
  //         this.toastr.error(res.error.message, "Error");
  //       }
  //       this.spinner.hide();
  //     },
  //     (err) => {
  //       this.spinner.hide();
  //     }
  //   );
  // }
  // getMygroups() {
  //   this.mygroups = [];
  //   // this.spinner.show();
  //   this.pageService.getMyGroups().subscribe(
  //     (res: any) => {
  //       if (res.success) {
  //         this.mygroups = res.data.map((cat) => {
  //           // console.log(
  //           //   new Date(cat.updatedAt).getTime(),
  //           //   this.today.getTime()
  //           // );
  //           return {
  //             id: cat.id,
  //             image: cat.image,
  //             name: cat.name,
  //             status: cat.status,
  //             time: this.pageService.timeDiffCalc(
  //               new Date(cat.updatedAt).getTime(),
  //               this.today.getTime()
  //             ),
  //             createdAt: cat.createdAt,
  //             updatedAt: cat.updatedAt,
  //           };
  //         });
  //         this.selectedX = this.mygroups;

  //         this.pageService.setGroupData(this.mygroups);
  //         this.spinner.hide();
  //       } else {
  //         this.toastr.error(res.error.message, "Error");
  //       }
  //       this.spinner.hide();
  //     },
  //     (err) => {
  //       this.spinner.hide();
  //     }
  //   );
  // }

  // likePost(postId) {
  //   let data = {
  //     postId: postId,
  //     likeBy: this.user.id,
  //     postType: "normalPost",
  //   };
  //   // this.spinner.show();
  //   this.pageService.addLike(data).subscribe(
  //     (res: any) => {
  //       if (res.success) {
  //         // this.getallNormalPosts();
  //         // this.toastr.success(res.message, "Success");
  //         // this.groupForm.patchValue({ image: this.groupImage })
  //       } else {
  //         window.scrollTo(0, 0);
  //         this.toastr.error(res.error.message, "Error");
  //       }
  //       // this.spinner.hide();
  //     },
  //     (err) => {
  //       // this.spinner.hide();
  //       this.toastr.error(
  //         "There are some errors, please try again after some time !",
  //         "Error"
  //       );
  //     }
  //   );
  // }
  getMakeCategories() {
    // this.spinner.show();
    let filters = {
      type: this.rvType,
      sortBy: -1,
      count: 1000,
    };
    this.pageService.getMainCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          let makesData = [];
          response.data.forEach((element) => {
            makesData.push({
              id: element["id"],
              description: element["name"],
              detail: element,
              // id: element['parentCategory']['id'],
              // description: element['parentCategory']['name'],
              // detail: element,
            });
          });
          const map = new Map();
          this.allMakes = [];
          for (const item of makesData) {
            if (!map.has(item.id)) {
              map.set(item.id, true); // set any value to Map
              this.allMakes.push({
                id: item.id,
                description: item.description,
                detail: item.detail,
              });
            }
          }
          // this.allMakes.push({
          //   id: null,
          //   description: "I'm a Wannabe",
          // });
          // this.allMakes = [...this.allMakes];
          // this.modPostForm.patchValue({
          //   make:this.filterRVMake(this.myDetail['make']['id'],this.allMakes)
          // })
          console.log(this.allMakes, "this.allMakes", this.registeredRV);
          if (this.registeredRV == true) {
            this.modPostForm.patchValue({
              make: this.filterRVMake(
                this.myDetail["make"]["id"],
                this.allMakes
              ),
            });
          }
          if (this.registeredRV == false && this.modDetail) {
            this.modPostForm.patchValue({
              make: this.filterRVMake(
                this.modDetail["make"]["id"],
                this.allMakes
              ),
            });
          }

          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
      }
    );
  }
  selectedRVType(data) {
    // this.modPostForm.patchValue({
    //   'make':'',
    //   'model':''
    // })
    // this.selectedRvType = data.value.description;
    this.rvtype1 = data.value.description;
    if (
      (data != undefined || data != "" || data != null) &&
      (data.value != undefined || data.value != "" || data.value != null)
    ) {
      if (!data.value) return;
      this.selectedRvType = data.value.detail.value;
      this.rvType = data.value.detail.value;
      this.modPostForm.controls["make"].reset();
      this.modPostForm.controls["series"].reset();
      this.modPostForm.controls["model"].reset();
      this.modPostForm.controls["year"].reset();
      console.log(this.selectedRvType, " this.selectedRvType");
      console.log(this.rvType, "this.rvTypethis.rvTypethis.rvTypethis.rvType");
    }

    // if (this.rvType == "wanna-be") {
    //   this.modPostForm.patchValue({
    //     model: {
    //       id: null,
    //       description: "I'm a Wannabe",
    //     },
    //     make: {
    //       id: null,
    //       description: "I'm a Wannabe",
    //     },
    //     year: "I'm a Wannabe",
    //   });
    //   this.selectedmake = "I'm a Wannabe";
    //   this.selectedmodel = "I'm a Wannabe";
    //   this.modPostForm.get("make").disable();
    //   this.modPostForm.get("model").disable();
    //   this.modPostForm.get("year").disable();
    // } else {
    //   this.modPostForm.get("make").enable();
    //   this.modPostForm.get("model").enable();
    //   this.modPostForm.get("year").enable();
    // }

    this.getMakeCategories();
  }
  selectedMake(data) {
    // this.modPostForm.patchValue({
    //   'make':'',
    //   'model':''
    // })
    console.log(data, "selected make");
    // this.selectedmake = data.value.description;
    this.selectedmake = data.value.id;
    this.makename = data.value.description;
    this.modPostForm.patchValue({
      // 'make': data.value.id
      make: data.value.description,
    });
    console.log(this.makename, " this.makename");
    // if (data.value.description == "I'm a Wannabe") {
    //   this.modPostForm.patchValue({
    //     model: {
    //       id: null,
    //       description: "I'm a Wannabe",
    //     },
    //     rvType: {
    //       description: "I'm a Wannabe",
    //       detail: { value: "wanna-be", key: "I'm a Wannabe" },
    //     },

    //     year: "I'm a Wannabe",
    //   });
    //   this.selectedRvType = "I'm a Wannabe";
    //   this.selectedmodel = "I'm a Wannabe";
    //   this.modPostForm.get("rvType").disable();
    //   this.modPostForm.get("model").disable();
    //   this.modPostForm.get("year").disable();
    // } else {
    //   this.modPostForm.get("rvType").enable();
    //   this.modPostForm.get("model").enable();
    //   this.modPostForm.get("year").enable();
    // }
    this.categoryId = data.value.detail.id;
    this.getModelCategories();
  }
  selectedSeries(data) {
    // this.modPostForm.patchValue({
    //   'model':'',
    //   'series':''
    // })
    console.log(data, this.dmodelname, "selected model");
    this.selectedmodel = data.value.id;
    this.dmodelname = data.value.description;

    // this.selectedmodel = data.value.id;
    this.modPostForm.patchValue({
      series: data.value.description,
    });
    console.log(this.selectedmodel, " this.selectedmodel");

    // if (data.value.description == "I'm a Wannabe") {
    //   this.modPostForm.patchValue({
    //     make: {
    //       id: null,
    //       description: "I'm a Wannabe",
    //     },
    //     rvType: {
    //       description: "I'm a Wannabe",
    //       detail: { value: "wanna-be", key: "I'm a Wannabe" },
    //     },

    //     year: "I'm a Wannabe",
    //   });
    //   this.selectedRvType = "I'm a Wannabe";
    //   this.selectedmake = "I'm a Wannabe";
    //   this.modPostForm.get("rvType").disable();
    //   this.modPostForm.get("make").disable();
    //   this.modPostForm.get("year").disable();
    // } else {
    //   this.modPostForm.get("rvType").enable();
    //   this.modPostForm.get("make").enable();
    //   this.modPostForm.get("year").enable();
    // }
  }

  onChangeRvType() {
    if (this.registeredRV == true) {
      console.log("this.year in rv change if", this.myDetail["year"]);
      this.modPostForm.patchValue({
        model: this.myDetail["model"],
        rvType: this.filterRVClass(this.myDetail["rvType"]),
        year: this.myDetail["year"],
      });
    }
    if (this.registeredRV == false && this.modDetail) {
      console.log("this.registeredRV in rv change else");
      this.modPostForm.patchValue({
        model: this.modDetail["model"],
        rvType: this.filterRVClass(this.modDetail["rvType"]),
        year: this.modDetail["year"],
      });
    }
  }
  getYears() {
    // for (let i = this.year - 25; i < this.year + 1; i++) {
    for (let i = this.year; i >= 1970; i--) {
      // console.log(i);
      this.years.push(i);
    }
    // this.years.push("I'm a Wannabe");
  }

  getUserDetail() {
    this.pageService.getUserDetail2().subscribe(
      (res: any) => {
        if (res.success) {
          this.myDetail = res.data;
          if (!this.modPostId) {
            this.modPostForm.patchValue({
              model: this.myDetail["model"],
              rvType: this.filterRVClass(this.myDetail["rvType"]),
              year: this.myDetail["year"],
            });
          }
          console.log(this.myDetail["year"], "year");
          this.getYears();
          this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  BadgeExists(arr, value, matchkey, setkey) {
    let obj = this.badge;
    let images = this.badgeImages;
    arr.filter(function (el) {
      if (el["badge_for"] == matchkey && el.points <= value) {
        obj[setkey] = el["image"];
        images.push(el["image"]);
      }
    });
    this.badge = obj;
    this.badgeImages = images;
    // return obj
  }
  filterRVClass(rvType) {
    if (!rvType) return;
    console.log("in RV class", rvType);
    let data = {};
    data = this.rvTypes.filter((obj) => {
      if (obj.detail.value == rvType) {
        return obj;
      }
    });
    let newData = {
      value: data[0],
    };
    this.selectedRVType(newData);
    // this.selectedRvType = data[0].detail.value;
    // this.rvType = data[0].detail.value;

    return data[0]["description"]; //added by sheetal
    // return data[0]['detail']['value']; //commented By sheetal
  }
  filterRVMake(rvMake, makesData) {
    let data = {};
    data = makesData.filter((obj) => {
      if (obj["id"] == rvMake) {
        return obj;
      }
    });
    let newData = {
      value: data[0],
    };
    this.selectedMake(newData);
    return data[0];
  }
  filterRVModel(rvmodel, modelData) {
    let data = {};
    data = modelData.filter((obj) => {
      if (obj["id"] == rvmodel) {
        return obj;
      }
    });
    let newData = {
      value: data[0],
    };
    this.selectedSeries(newData);
    return data[0];
  }
  getMakes() {
    // this.spinner.show();
    let filters = {
      type: this.rvType,
      count: 1000,
    };
    this.pageService.getMainCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          this.allMakes = response.data;
          // console.log(this.allMakes, "this.allMakes");
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
      }
    );
  }
  addModPost(ErrorSeriesMake) {
    if (
      (this.selectedmake == "" ||
        this.selectedmake == null ||
        this.selectedmake == undefined ||
        this.dmodelname == "" ||
        this.dmodelname == null ||
        this.dmodelname == undefined) &&
      this.registeredRV
    ) {
      this.modalReference = this.modalService.open(ErrorSeriesMake, {
        ariaLabelledBy: "modal-basic-title",
      });
      this.modalReference.result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    } else {
      this.modSubmit = true;

      this.modPostForm.patchValue({
        howLongTookMe: tinymce.get("txtarea").getContent(),
      });

      // console.log(this.modPostForm.controls,"mod post form",this.modPostForm.value)
      // console.log(this.selectedmake,"this.selectedmake")
      // console.log(this.selectedmodel,"this.selectedmodel")
      // console.log(this.selectedRvType,"this.selectedRvType")
      if (!this.modPostForm.invalid) {
        this.spinner.show();
        let data = this.modPostForm.value;
        data["name"] = this.modPostForm.value.name;
        // data["name"] = filter.clean(this.modPostForm.value.name);
        // data["whatIDid"] = this.value1;
        data["make"] = this.selectedmake
          ? this.selectedmake
          : this.modPostForm.value.make;
        data["series"] = this.selectedmodel
          ? this.selectedmodel
          : this.modPostForm.value.series;
        // data['model']=this.selectedmodel
        data["rvType"] = this.selectedRvType
          ? this.rvType
          : this.modPostForm.value.rvType;
        data["tags"] = this.tagsArray.toString();
        data["productUsed"] = this.productArray;
        data["toolsNeeded"] = this.toolArray;
        data["registeredRV"] = this.registeredRV;
        data["howLongTookMe"] = tinymce.get("txtarea").getContent();
        if (
          this.modPostForm.value.totalCost == "" ||
          this.modPostForm.value.totalCost == undefined ||
          this.modPostForm.value.totalCost == null
        ) {
          delete data.totalCost;
        }
        data["status"] = "active";

        if (!this.modPostId) {
          // return
          this.pageService.addModPost(data).subscribe(
            (res: any) => {
              if (res.success) {
                // this.getMyMods();
                this.tagsArray = [];
                this.productArray = [];
                this.toolArray = [];
                this.afterImages = [];
                this.beforeImages = [];
                // this.modalReference2.close()
                this.modPostForm.reset();
                let url = "mods/" + res.data.slug;
                this.router.navigateByUrl(url);
                this._bs.publishedMod.next(true);
                // this.router.navigateByUrl('page/timeline');
                // this.router.navigateByUrl('page/timeline?modal=seeMods');
                // this.groupForm.patchValue({ image: this.groupImage })
              } else {
                window.scrollTo(0, 0);
                this.toastr.error(res.error.message, "Error");
              }
              this.modSubmit = false;
              this.spinner.hide();
            },
            (err) => {
              this.spinner.hide();
              this.modSubmit = false;
              this.toastr.error(
                "There are some errors, please try again after some time !",
                "Error"
              );
            }
          );
        } else {
          data["id"] = this.modPostId;
          this.pageService.updateModPost(data).subscribe(
            (res: any) => {
              if (res.success) {
                // this.getMyMods()
                this.tagsArray = [];
                this.afterImages = [];
                this.beforeImages = [];
                this.productArray = [];
                this.toolArray = [];
                // this.modalReference2.close()
                this.modPostForm.reset();
                let url = "mods/" + res.data.slug;
                this.router.navigateByUrl(url);
                // this.router.navigateByUrl('page/timeline')
                // this.router.navigateByUrl('page/timeline?modal=seeMods');
                // this.groupForm.patchValue({ image: this.groupImage })
              } else {
                window.scrollTo(0, 0);
                this.toastr.error(res.error.message, "Error");
              }
              this.modSubmit = false;
              this.spinner.hide();
            },
            (err) => {
              this.spinner.hide();
              this.modSubmit = false;
              this.toastr.error(
                "There are some errors, please try again after some time !",
                "Error"
              );
            }
          );
        }
      }
      // else{
      //   this.toastr.warning('Some required fields are missing please check on all steps!')
      // }
    }
  }
  resetdata(){
    this.resetFormData()
    this.createModForm();
    this.getUserDetail()
    console.log(this.modPostForm.controls)
  }
 
  olddraftModPost() {
    // this.spinner.show();
    console.log("click");

    this.modPostForm.patchValue({
      howLongTookMe: tinymce.get("txtarea").getContent(),
    });
    let data = this.modPostForm.value;
    if (!data.name.trim()) {
      this.toastr.error("Please Enter Mode name ");
    } else {
      data["status"] = "draft";
      data["name"] = this.modPostForm.value.name;
      // data["name"] = filter.clean(this.modPostForm.value.name);
      data["make"] = this.selectedmake
        ? this.selectedmake
        : this.modPostForm.value.make;
      data["series"] = this.selectedmodel
        ? this.selectedmodel
        : this.modPostForm.value.series;
      // data['model']=this.selectedmodel
      data["rvType"] = this.selectedRvType
        ? this.rvType
        : this.modPostForm.value.rvType;
      data["tags"] = this.tagsArray.toString();
      data["productUsed"] = this.productArray;
      data["toolsNeeded"] = this.toolArray;
      data["registeredRV"] = this.registeredRV;
      data["howLongTookMe"] = tinymce.get("txtarea").getContent();
      if (
        this.modPostForm.value.totalCost == "" ||
        this.modPostForm.value.totalCost == undefined ||
        this.modPostForm.value.totalCost == null
      ) {
        delete data.totalCost;
      }

      if (!this.modPostId) {
        // return
        data = this.sharedService.clean(data);
        this.pageService.addModPost(data).subscribe(
          (res: any) => {
            if (res.success) {
              // this.getMyMods();
              this.tagsArray = [];
              this.afterImages = [];
              this.beforeImages = [];
              // this.modalReference2.close()
              this.modPostForm.reset();
              // this.router.navigateByUrl("mods");

              this.reloaddraft = !this.reloaddraft;
              this.showClss();
            } else {
              window.scrollTo(0, 0);
              this.toastr.error(res.error.message, "Error");
            }
            this.modSubmit = false;
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
            this.modSubmit = false;
            this.toastr.error(
              "There are some errors, please try again after some time !",
              "Error"
            );
          }
        );
      } else {
        console.log("else part ");
        data["id"] = this.modPostId;
        data = this.sharedService.clean(data);
        console.log("data tes", data);
        this.pageService.updateModPost(data).subscribe(
          (res: any) => {
            if (res.success) {
              // this.getMyMods()
              // edit by rohit
              this.toolArray = [];
              this.productArray = [];
              this.tagsArray = [];
              this.afterImages = [];
              this.beforeImages = [];
              if (tinymce.get("txtarea")) {
                setTimeout(() => {
                  tinymce.get("txtarea").setContent("");
                }, 2000);
              }
              // this.modalReference2.close()
              this.modPostForm.reset();

              this.reloaddraft = !this.reloaddraft;
              this.showClss();
              // this.router.navigateByUrl("mods");
              // this.router.navigateByUrl('page/timeline')
              // this.router.navigateByUrl('page/timeline?modal=seeMods');
              // this.groupForm.patchValue({ image: this.groupImage })
            } else {
              window.scrollTo(0, 0);
              this.toastr.error(res.error.message, "Error");
            }
            this.modSubmit = false;
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
            this.modSubmit = false;
          }
        );
      }
    }

    // else{
    //   this.toastr.warning('Some required fields are missing please check on all steps!')
    // }
  }
  closeEditDraft() {
    this.resetFormData();
    this.reloaddraft = !this.reloaddraft;
    this.showClss();
  }
  resetFormData() {
    delete this.slug;
    delete this.modPostId;
    delete this.modDetail;
    this.modPostForm.reset();
    this.toolArray = [];
    this.productArray = [];
    this.tagsArray = [];
    this.afterImages = [];
    this.beforeImages = [];
    this.registeredRV = true;
    this.isDraftMod = false;
    this.onChangeRvType();
    tinymce.get("txtarea").setContent("");
    window.scrollTo(0, 0);
  }
  draftModPost() {
    // this.spinner.show();
    console.log("click");

    this.modPostForm.patchValue({
      howLongTookMe: tinymce.get("txtarea").getContent(),
    });
    let data = this.modPostForm.value;
    if (data.name == "" || data.name == null || data.name == undefined) {
      this.toastr.error("Please Enter Mode name ");
    } else {
      data["status"] = "draft";
      data["name"] = this.modPostForm.value.name;
      data["make"] = this.selectedmake
        ? this.selectedmake
        : this.modPostForm.value.make;
      data["series"] = this.selectedmodel
        ? this.selectedmodel
        : this.modPostForm.value.series;
      data["rvType"] = this.selectedRvType
        ? this.rvType
        : this.modPostForm.value.rvType;
      data["tags"] = this.tagsArray.toString();
      data["productUsed"] = this.productArray;
      data["toolsNeeded"] = this.toolArray;
      data["registeredRV"] = this.registeredRV;
      data["howLongTookMe"] = tinymce.get("txtarea").getContent();
      if (
        this.modPostForm.value.totalCost == "" ||
        this.modPostForm.value.totalCost == undefined ||
        this.modPostForm.value.totalCost == null
      ) {
        delete data.totalCost;
      }

      if (!this.modPostId) {
        // return
        data = this.sharedService.clean(data);
        this.pageService.addModPost(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.slug = res.data.slug;
              this.modPostId = res.data.id;
              this.isDraftMod = true;
              this.reloaddraft = !this.reloaddraft;
              // this.addClss();
              this.toastr.success("Draft mod added successfully");
            } else {
              window.scrollTo(0, 0);
              this.toastr.error(res.error.message, "Error");
            }
            this.modSubmit = false;
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
            this.modSubmit = false;
            this.toastr.error(
              "There are some errors, please try again after some time !",
              "Error"
            );
          }
        );
      } else {
        console.log("else part ");
        data["id"] = this.modPostId;
        data = this.sharedService.clean(data);
        console.log("data tes", data);
        this.pageService.updateModPost(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.toastr.success("Draft mod updated successfully");
              this.reloaddraft = !this.reloaddraft;
              this.isDraftMod = true;
              // this.addClss();
            } else {
              window.scrollTo(0, 0);
              this.toastr.error(res.error.message, "Error");
            }
            this.modSubmit = false;
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
            this.modSubmit = false;
          }
        );
      }
    }

    // else{
    //   this.toastr.warning('Some required fields are missing please check on all steps!')
    // }
  }
  // getMyMods() {
  //   this.pageService.getMyMods().subscribe(
  //     (res: any) => {
  //       if (res.success) {
  //         console.log("res data", res.data);
  //         this.mymodposts = [];

  //         this.mymodposts = res.data.map((cat) => {
  //           console.log(
  //             new Date(cat.updatedAt).getTime(),
  //             this.today.getTime()
  //           );
  //           return {
  //             id: cat.id,
  //             description: cat.description,
  //             name: cat.name,
  //             beforeImages: cat.beforeImages,
  //             afterImages: cat.afterImages,
  //             status: cat.status,
  //             time: this.pageService.timeDiffCalc(
  //               new Date(cat.updatedAt).getTime(),
  //               this.today.getTime()
  //             ),
  //             createdAt: cat.createdAt,
  //             updatedAt: cat.updatedAt,
  //             // id: cat.id,
  //             // description: cat.description,
  //             // name: cat.name,
  //             // status: cat.status,
  //             // time: this.pageService.timeDiffCalc(
  //             //   new Date(cat.updatedAt).getTime(),
  //             //   this.today.getTime()
  //             // ),
  //             // createdAt: cat.createdAt,
  //             // updatedAt: cat.updatedAt,
  //           };
  //         });
  //         this.selectedMod = this.mymodposts;

  //         this.pageService.setModData(this.mymodposts);
  //         this.spinner.hide();
  //       } else {
  //         this.toastr.error(res.error.message, "Error");
  //       }
  //       this.spinner.hide();
  //     },
  //     (err) => {
  //       this.spinner.hide();
  //     }
  //   );
  // }
  goBack() {
    this.location.back();
  }
  getModels() {
    // this.spinner.show();
    let filters = {
      type: this.rvType,
      categoryId: this.categoryId,
      sortBy: -1,
      count: 1000,
    };
    this.pageService.getSubCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          this.allModels = response.data;
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
      }
    );
  }
  // getBadges() {
  //   this.pageService.getAllBadges().subscribe(
  //     (res: any) => {
  //       if (res.success) {
  //         this.badgesData = res.data;
  //       } else {
  //         this.toastr.error(res.error.message, "Error");
  //       }
  //       this.spinner.hide();
  //     },
  //     (error) => {
  //       this.spinner.hide();
  //     }
  //   );
  // }
  // viewGroup(id) {
  //   this.router.navigate(["/page/manage-group"], { queryParams: { id: id } });
  // }

  splitByComma(thisvalue) {
    if (thisvalue != "") {
      let tagnewarray = [];
      tagnewarray = this.pageService.splitByComma(thisvalue);
      tagnewarray = tagnewarray.filter(function (el) {
        return el != "";
      });
      tagnewarray.forEach((element) => {
        this.tagsArray.push(element);
      });
      this.modPostForm.get("tags").reset();
      this.modPostForm.patchValue({
        tags: "",
      });
      // this.modPostForm.get("tags").markAsUntouched({ onlySelf: true });
    }
  }
  // splitProductByComma(value) {
  //   if (value != "") {
  //     let productnewarray = [];
  //     productnewarray = this.pageService.splitByComma(value);
  //     productnewarray = productnewarray.filter(function (el) {
  //       return el != "";
  //     });
  //     productnewarray.forEach((element) => {
  //       let obj = {
  //         product: element,
  //         affiliateLink: "",
  //       };
  //       this.productArray.push(obj);
  //     });
  //     console.log(this.productArray, "this.productArray");
  //     console.log(productnewarray, "productnewarray");
  //     this.modPostForm.patchValue({
  //       productUsed: [],
  //     });
  //   }
  // }
  splitProductByComma() {
    // this.productSubmit = true;
    this.isEmpty = Object.values(
      this.modPostForm.controls.productUsed.value
    ).every((o) => o == null || o == "");
    if (!this.isEmpty) {
      if (
        this.productIndex &&
        (this.productIndex === 0 || this.productIndex > 0)
      ) {
        this.productArray[this.productIndex - 1] =
          this.modPostForm.controls.productUsed.value;
        delete this.productIndex;
        // this.productSubmit = false;
      } else {
        this.productArray.push(this.modPostForm.controls.productUsed.value);
      }
      this.productInput.nativeElement.focus();
      this.modPostForm.get("productUsed").reset();
      // this.productSubmit = false;
    }
  }
  // splitToolByComma(value) {
  //   console.log(value, "toll");
  //   if (value != "") {
  //     let toolsnewarray = [];
  //     toolsnewarray = this.pageService.splitByComma(value);
  //     toolsnewarray = toolsnewarray.filter(function (el) {
  //       return el != "";
  //     });
  //     toolsnewarray.forEach((element) => {
  //       let obj = {
  //         tool: element,
  //         affiliateLink: "",
  //       };
  //       this.toolArray.push(obj);
  //     });
  //     console.log(this.toolArray, "this.toolArray");
  //     console.log(toolsnewarray, "toolsnewarray");
  //     this.modPostForm.patchValue({
  //       toolsNeeded: [],
  //     });
  //   }
  // }
  splitToolByComma() {
    // this.toolSubmit = true;
    this.isEmpty = Object.values(
      this.modPostForm.controls.toolsNeeded.value
    ).every((o) => o == null || o == "");
    if (!this.isEmpty) {
      console.log(this.toolIndex, "(this.toolIndex");
      if (this.toolIndex && (this.toolIndex === 0 || this.toolIndex > 0)) {
        console.log(this.toolIndex, "(this.toolIndex if");
        this.toolArray[this.toolIndex - 1] =
          this.modPostForm.controls.toolsNeeded.value;
        delete this.toolIndex;
        // this.toolSubmit = false;
      } else {
        console.log(this.toolIndex, "(this.toolIndex else");
        this.toolArray.push(this.modPostForm.controls.toolsNeeded.value);
        console.log(this.toolArray, "toolArray");
        // this.toolSubmit = false;
      }

      this.modPostForm.get("toolsNeeded").reset();
      this.toolInput.nativeElement.focus();
    }
  }
  editTool(item, index) {
    this.toolIndex = index + 1;
    this.toolInput.nativeElement.focus();
    this.modPostForm.patchValue({
      toolsNeeded: item,
    });
  }
  deleteTool(item) {
    let index = this.toolArray.indexOf(item);
    this.toolArray.splice(index, 1);
  }
  deleteTag(item) {
    let index = this.tagsArray.indexOf(item);
    this.tagsArray.splice(index, 1);
  }
  deleteProduct(item) {
    let index = this.productArray.indexOf(item);
    this.productArray.splice(index, 1);
  }

  getModelCategories() {
    // this.spinner.show();
    let filters = {
      type: this.rvType,
      categoryId: this.categoryId,
      count: 1000,
    };
    this.pageService.getSubCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          this.allModels = [];
          response.data.forEach((element) => {
            this.allModels.push({
              id: element["id"],
              description: element["name"],
              detail: element,
            });
          });
          // this.allModels.push({
          //   id: null,
          //   description: "I'm a Wannabe",
          // });
          // this.allModels = [...this.allModels];
          // this.modPostForm.patchValue({
          //   series:this.filterRVModel(this.myDetail['series']['id'],this.allModels)
          // })
          if (this.registeredRV == true) {
            if (this.myDetail["series"] && this.myDetail["series"]["id"])
              this.modPostForm.patchValue({
                series: this.filterRVModel(
                  this.myDetail["series"]["id"],
                  this.allModels
                ),
              });
          }
          if (this.registeredRV == false && this.modDetail) {
            if (this.modDetail["series"] && this.modDetail["series"]["id"])
              this.modPostForm.patchValue({
                series: this.filterRVModel(
                  this.modDetail["series"]["id"],
                  this.allModels
                ),
              });
          }
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
      }
    );
  }

  getModSubCategories(categoryId) {
    // this.spinner.show();
    let filters = {
      type: "modpost",
      categoryId: categoryId,
      count: 1000,
    };
    this.pageService.getSubCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          this.modSubCategories = response.data;
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
      }
    );
  }

  onContentDom(e) {
    console.log(e);
  }

  uploadBeforeImages(files) {
    if (files && files.length > 3) {
      this.BeforeImageErr = "You cannot upload more than 3 images";
      return;
    }
    if (files && files.length <= 3) {
      this.BeforeImageErr = "";
      const formData: FormData = new FormData();
      let uploadedImageArray: any = [];
      let docData = [];
      if (this.beforeImages && this.beforeImages.length > 0) {
        docData = this.beforeImages;
      }
      // this.fileToUpload = files.item(0)
      for (let index = 0; index < files.length; index++) {
        let element = files[index];
        uploadedImageArray.push(element);
        this.fileToUpload = uploadedImageArray;
        formData.append(
          "data",
          this.fileToUpload[index],
          this.fileToUpload[index].name
        );
      }
      formData.append("modelName", "modPost");
      let params = new HttpParams().set("?modelName", "modPost");
      this.beforeImageLoader = true;
      this.sharedService.uploadMultipleImage(params, formData).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              // console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              // console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              // console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log("User successfully created!", event.body);
              if (event.body.success) {
                console.log("event.body.data", event.body.data);
                if (docData.length > 0) {
                  docData.push(...event.body.data.imagePath);
                } else {
                  docData = event.body.data.imagePath;
                }
                setTimeout(() => {
                  this.beforeImages = docData;
                  this.modPostForm.patchValue({ beforeImages: docData });
                  this.beforeImageLoader = false;
                }, 5000);
              } else {
                window.scrollTo(0, 0);
                this.beforeImageLoader = false;
              }
          }
        },
        (error) => {
          this.progress = 0;
          this.beforeImageLoader = false;
          this.toastr.error("Please select valid image to upload");
        }
      );
    }
  }

  getDraftMods() {
    let filters = {
      userid: this.credentials.credentials.id,
      status: "draft",
      class: this.modfilters.rvTypeFilter ? this.modfilters.rvTypeFilter : "",
      make: this.modfilters.makeFilter ? this.modfilters.makeFilter : "",
      series: this.modfilters.modelValue ? this.modfilters.modelValue : "",
      size: this.modfilters.size ? this.modfilters.size : "",
      modCategory: this.modfilters.modCategoryValue
        ? this.modfilters.modCategoryValue
        : "",
      year: this.modfilters.yearValue ? this.modfilters.yearValue : "",
      skillLevel: this.modfilters.skillLevel ? this.modfilters.skillLevel : "",
      timerange: this.modfilters.timerange ? this.modfilters.timerange : "",
      startDate: this.modfilters.startDate ? this.modfilters.startDate : "",
      endDate: this.modfilters.endDate ? this.modfilters.endDate : "",
    };
    console.log("filters ", filters);
    // filters["userid"] = this.credentials.credentials.id;
    filters["modPost"] = "modPost";
    this.pageService.getMyMods(filters).subscribe(
      (response) => {
        if (response.success) {
          if (response.data == 0) {
            this.addClss();
          }
          this.favMods = response.data.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              description: cat.description,
              isCommentDisabled: cat.isCommentDisabled,
              name: cat.name,
              slug: cat.slug,
              registeredRV: cat.registeredRV,
              isFeatured: cat.isFeatured,
              beforeImages: cat.beforeImages,
              afterImages: cat.afterImages,
              status: cat.status,
              skillLevel: cat.skillLevel,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              addedBy: cat.addedBy,
              catName: cat.modCategorydetails
                ? cat.modCategorydetails.name
                : "",
              rvType: this.sharedService.getRvType(cat.rvType),
              year: cat.year,
              series: cat.seriesdetails,
              make: cat.makedetails,
              model: cat.model,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              totalShare: cat.totalShare,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime,
              addedBydetails: cat.addedBydetails,
              timerange: cat.timerange,
              howLongTookMe: cat.howLongTookMe.replace(/<img[^>]*>/g, ""),
              whatIDid: cat.whatIDid,
              isPending: cat.isPending,
              isFollow: cat.isFollow,
              isFriend: cat.isFriend,
              sizedetails: cat.sizedetails,
              // modDetailSharedata: this.setShareData(cat),
            };
          });
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
      }
    );
  }

  uploadAfterImages(files) {
    if (files && files.length > 3) {
      this.AfterImageErr = "You cannot upload more than 3 images";
      return;
    }
    if (files && files.length <= 3) {
      this.AfterImageErr = "";
      const formData: FormData = new FormData();
      let uploadedImageArray: any = [];
      let docData = [];
      if (this.afterImages.length > 0) {
        docData = this.afterImages;
      }
      // this.fileToUpload = files.item(0)
      for (let index = 0; index < files.length; index++) {
        let element = files[index];
        uploadedImageArray.push(element);
        this.fileToUpload = uploadedImageArray;
        formData.append(
          "data",
          this.fileToUpload[index],
          this.fileToUpload[index].name
        );
      }
      formData.append("modelName", "modPost");
      let params = new HttpParams().set("?modelName", "modPost");
      this.afterImageLoader = true;
      this.sharedService.uploadMultipleImage(params, formData).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              // console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              // console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              // console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log("User successfully created!", event.body);
              if (event.body.success) {
                console.log("event.body.data", event.body.data);
                if (docData.length > 0) {
                  docData.push(...event.body.data.imagePath);
                } else {
                  docData = event.body.data.imagePath;
                }

                setTimeout(() => {
                  this.afterImages = docData;
                  this.modPostForm.patchValue({ afterImages: docData });
                  this.afterImageLoader = false;
                }, 5000);
              } else {
                window.scrollTo(0, 0);
                this.afterImageLoader = false;
              }
              setTimeout(() => {
                // this.progress = 0;
                // this.afterImageLoader = false;
              }, 100);
          }
        },
        (err) => {
          this.progress = 0;
          this.afterImageLoader = true;
          // this.toastr.error(event.body.success);
          this.toastr.error("please select valid image to upload");
        }
      );
    }
  }

  // uploadAffiliateImages(files,i) {
  //   let index:any
  //   console.log(i,"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
  //   if (files) {
  //     this.affiliateLink = this.modPostForm.get("affiliateLink") as FormArray;
  //     const formData: FormData = new FormData();
  //     let uploadedImageArray: any = [];
  //     let docData = [];
  //     // docData =  this.affiliateLink[i]['controls'].value
  //     // this.fileToUpload = files.item(0)
  //     for (let index = 0; index < files.length; index++) {
  //       let element = files[index];
  //       uploadedImageArray.push(element);
  //       this.fileToUpload = uploadedImageArray;
  //       formData.append(
  //         "data",
  //         this.fileToUpload[index],
  //         this.fileToUpload[index].name
  //       );
  //     }
  //     formData.append("modelName", "modPost");
  //     let params = new HttpParams().set("?modelName", "modPost");
  //     this.affiliateLink['controls'][i]['controls']['progressBar'].patchValue('true')
  //     console.log(this.affiliateLink);
  //     this.sharedService.uploadMultipleImage(params, formData).subscribe(
  //       (event: HttpEvent<any>) => {
  //         switch (event.type) {
  //           case HttpEventType.Sent:
  //             // console.log('Request has been made!');
  //             break;
  //           case HttpEventType.ResponseHeader:
  //             // console.log('Response header has been received!');
  //             break;
  //           case HttpEventType.UploadProgress:
  //             this.progress = Math.round((event.loaded / event.total) * 100);
  //             // console.log(`Uploaded! ${this.progress}%`);
  //             break;
  //           case HttpEventType.Response:
  //             console.log("User successfully created!", event.body);
  //             if (event.body.success) {
  //               console.log("event.body.data", event.body.data);
  //               if (docData.length > 0) {
  //                 docData.push(...event.body.data.imagePath);
  //               } else {
  //                 docData = event.body.data.imagePath;
  //               }
  //               this.affiliateLink['controls'][i]['controls']['images'].patchValue(docData)
  //               this.affiliateLink['controls'][i]['controls']['progressBar'].patchValue('false')

  //             } else {
  //               window.scrollTo(0, 0);
  //               this.affiliateLink['controls'][i]['controls']['progressBar'].patchValue('false')
  //             }
  //             setTimeout(() => {
  //               this.progress = 0;
  //               this.affiliateLink['controls'][i]['controls']['progressBar'].patchValue('false')
  //             }, 100);
  //         }
  //       },
  //       (err) => {
  //         this.progress = 0;
  //         this.affiliateLink['controls'][i]['controls']['progressBar'].patchValue('false')
  //         // this.toastr.error('There are some errors, please try again after some time !', 'Error');
  //       }
  //     );
  //   }
  // }

  validateYouTubeUrl(urlToParse) {
    if (urlToParse != "") {
      console.log("in if");
      let url = urlToParse;
      var regExp =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (url.match(regExp)) {
        this.validUrl = true;
      } else {
        this.validUrl = false;
      }
    }
  }
  uniqBy(a, key) {
    let seen = new Set();
    return a.filter((item) => {
      let k = key(item);
      return seen.has(k) ? false : seen.add(k);
    });
  }
  goToContest() {
    alert();
    this.router.navigate(["/test-contest"]);
  }
  addNewItem(value: string) {
    console.log(value, "id of mod");
    if (value) {
      this.slug = value;
      this.getModDetails();
      // this.addClss()
      document.getElementById("pills-home-tab").click();
    }
  }
  showShareModForm(value: number) {
    console.log(value, "count of mod", this.slug);
    this.draftModsCount = value;
    if (value == 0 || this.slug) {
      document.getElementById("pills-home-tab").click();

      this.setConfigEditor();
      if (tinymce.get("txtarea")) {
        setTimeout(() => {
          tinymce.get("txtarea").setContent(this.modDetail.howLongTookMe);
        }, 1000);
      }
      if (
        this.modDetail.howLongTookMe != "" ||
        this.modDetail.toolsNeeded.length > 0 ||
        this.modDetail.youtubeLink != "" ||
        this.modDetail.documents.length > 0
      ) {
        console.log("in open collapse 1");
        const elem = (
          document.getElementsByClassName("accor") as HTMLCollection
        )[0] as HTMLObjectElement;
        elem.classList.add("show");
      }
      if (
        this.modDetail.isFeatured == true ||
        this.tagsArray.length > 0 ||
        this.modDetail.isCommentDisabled == true
      ) {
        console.log("in open collapse 2");
        const elem = (
          document.getElementsByClassName("accor1") as HTMLCollection
        )[0] as HTMLObjectElement;
        elem.classList.add("show");
      }
    } else {
      document.getElementById("pills-profile-tab").click();
    }
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    if (this._postObservable) {
      this._postObservable.unsubscribe();
    }
  }
  // onChange(value) {

  //   var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  //   this.value1 = value.replace(urlRegex, function (url) {
  //     return '<a href="' + url + '">' + url + '</a>';
  //   });
  //   console.log(
  //     "This triggers only when t5 ",
  //     this.value1,
  //   );
  // }
  setConfigEditor() {
    console.log("in set config");
    tinymce.remove();

    tinymce.init({
      selector: "#txtarea",
      base_url: "/tinymce",
      suffix: ".min",
      branding: false,
      toolbar_mode: "wrap",
      menubar: false,
      content_style:
        "body { color: #495057;font-size: 14px;font-family: 'Open Sans',sans-serif;}",
      plugins: "link image table lists autoresize emoticons",
      toolbar:
        "h1 h2 | bold italic underline | alignleft aligncenter alignright | table image  bullist numlist link | emoticons ",
      height: 300,
      object_resizing: ":not(table)",
      image_title: false,
      /* enable automatic uploads of images represented by blob or data URIs*/
      automatic_uploads: true,
      file_picker_types: "image",
      default_link_target: "_blank",
      target_list: false,
      link_title: false,
      images_upload_url: this._host + "uploadnormalImages",
      emoticons_append: {
        custom_mind_explode: {
          keywords: ["brain", "mind", "explode", "blown"],
          char: "🤯",
        },
      },
    });
  }
}
