import { PostModel } from './../../models/post.model';
import { ElementHtmlString, ImageElement } from './../../models/post-content-elements.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app-store';
import { FormPostType } from '../../models/post.model';
import { OnAddPost, OnUpdatePost } from '../../store/posts.actions';
import { slideInOut, toggleHeight } from 'src/app/animations/animations';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
  animations: [slideInOut, toggleHeight]
})

export class PostFormComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  @Output() emitContent = new EventEmitter<FormPostType>();
  @Input() postID: string;

  selectedPost: PostModel;
  form: FormGroup;
  formPost = new FormPostType();

  openMeta = false;
  openContent = false;


  ngOnInit() {
    this.initForm();
    this.store.select('postsState').subscribe( res => {
      if (!this.selectedPost && res.posts.length > 0) {
        this.selectedPost = res.posts.filter( v => v.id === this.postID)[0];
        if (this.selectedPost) {
          this.patchForm();
          this.formPost.created = this.selectedPost.created;
        }
      }
    });

    this.store.select('authState').subscribe( authState => {
      this.formPost.user = authState.user.email;
      this.formPost.uid = authState.user.userId;
    });

    this.form.valueChanges.subscribe( () => this.updateOutput());
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl('Title'),
      image: new FormControl('https://good.co/wp-content/uploads/2017/03/science_bg.jpg'),
      category: new FormControl('Chemistry'),
      formArray: new FormArray([])
    });
    if (!this.postID) {
      this.formPost.created = new Date();
      this.updateOutput();
    }
  }

  onSubmit() {
    if (this.postID) {
      this.formPost.id = this.selectedPost.id;
      this.store.dispatch( new OnUpdatePost(this.formPost) );
    } else {
      this.formPost.created = new Date();
      this.store.dispatch( new OnAddPost(this.formPost) );
    }
  }

  updateOutput() {
    this.formPost.image = this.form.value.image;
    this.formPost.title = this.form.value.title;
    this.formPost.category = this.form.value.category;
    this.formPost.content = [];
    this.formArrayControls.controls.map( item => {
      if ( item.value.hasOwnProperty('text') ) {
        this.formPost.content.push( new ElementHtmlString(item.value.text) );
      }
      if ( item.value.hasOwnProperty('image') ) {
        this.formPost.content.push( new ImageElement(item.value.image, item.value.size, item.value.align, item.value.radius) );
      }
    });
    this.emitContent.emit(this.formPost);
  }

  get formArrayControls() {
    return this.form.get('formArray') as FormArray;
  }

  addElement(type: string) {
    switch (type) {
      case 'Text':
          this.formArrayControls.push(
            new FormGroup({
              text: new FormControl('Text....'),
            })
          );
          break;
        case 'Image':
          this.formArrayControls.push(
            new FormGroup({
              image: new FormControl('https://i.pinimg.com/originals/e8/a4/b5/e8a4b5fa5645ae15914ec0032a59c1d7.jpg'),
              size: new FormControl('50'),
              align: new FormControl('center'),
              radius: new FormControl('0')
            })
          );
          break;
      default:
        return;
    }
  }

  patchForm() {
    this.form.patchValue({
      title: this.selectedPost.title,
      image: this.selectedPost.image,
      category: this.selectedPost.category,
    });
    this.initPostArrayContent();
    this.updateOutput();
  }

  initPostArrayContent() {
    if (this.selectedPost.content && this.selectedPost.content.length > 0) {
      this.selectedPost.content.map( item => {
        if ( item.hasOwnProperty('htmlString') ) {
          this.formArrayControls.push(
            new FormGroup({
              text: new FormControl(item.htmlString),
            })
          );
        }
        if ( item.hasOwnProperty('image') ) {
          this.formArrayControls.push(
            new FormGroup({
              image: new FormControl(item.image),
              size: new FormControl(item.size),
              align: new FormControl(item.align),
              radius: new FormControl(item.radius)
            })
          );
        }
      });
    }
  }

  deleteControl(index: number) {
    this.formArrayControls.removeAt(index);
  }

}
