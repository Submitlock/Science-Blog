import { PostModel } from './../../models/post.model';
import { PostImageElement, PostHeadingElement, PostParagraphElement } from './../../models/post-content-elements.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app-store';
import { FormPostType } from '../../models/post.model';
import { OnAddPost, OnUpdatePost } from '../../store/posts.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})

export class PostFormComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  @Output() emitContent = new EventEmitter<FormPostType>();
  @Input() postID: string;

  selectedPost: PostModel;
  form: FormGroup;
  formPost = new FormPostType();


  ngOnInit() {
    this.initForm();
    this.store.select('postsState').subscribe( res => {
      if (!this.selectedPost && res.posts.length > 0) {
        this.selectedPost = res.posts.filter( v => v.id === this.postID)[0];
        this.patchForm();
      }
    });

    this.store.select('authState').subscribe( authState => {
      this.formPost.user = authState.user.email;
    });

    this.form.valueChanges.subscribe( () => this.updateOutput() );
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl('Title'),
      image: new FormControl('https://good.co/wp-content/uploads/2017/03/science_bg.jpg'),
      category: new FormControl('cat3'),
      formArray: new FormArray([])
    });
    if (!this.postID) {
      this.updateOutput();
    }
  }

  onSubmit() {
    if (this.postID) {
      this.formPost.date = this.selectedPost.created;
      this.formPost.id = this.selectedPost.id;
      this.store.dispatch( new OnUpdatePost(this.formPost) );
    } else {
      this.formPost.date = new Date();
      this.store.dispatch( new OnAddPost(this.formPost) );
    }
  }

  updateOutput() {
    this.formPost.image = this.form.value.image;
    this.formPost.title = this.form.value.title;
    this.formPost.category = this.form.value.category;
    this.formPost.content = [];
    this.formArrayControls.controls.map( item => {
      if ( item.value.hasOwnProperty('heading') ) {
        this.formPost.content.push( new PostHeadingElement(item.value.heading, item.value.size, item.value.align, item.value.color) );
      }
      if ( item.value.hasOwnProperty('paragraph') ) {
        this.formPost.content.push( new PostParagraphElement(item.value.paragraph, item.value.align, item.value.color) );
      }
      if ( item.value.hasOwnProperty('image') ) {
        this.formPost.content.push( new PostImageElement(item.value.image, item.value.size, item.value.align, item.value.radius) );
      }
    });
    this.emitContent.emit(this.formPost);
  }

  get formArrayControls() {
    return this.form.get('formArray') as FormArray;
  }

  addElement(type: string) {
    switch (type) {
      case 'Heading':
          this.formArrayControls.push(
            new FormGroup({
              heading: new FormControl('Heading'),
              size: new FormControl('h2'),
              align: new FormControl('center'),
              color: new FormControl('#000000')
            })
          );
          break;
      case 'Paragraph':
          this.formArrayControls.push(
            new FormGroup({
              paragraph: new FormControl('Paragraph'),
              align: new FormControl('left'),
              color: new FormControl('#000000')
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
    if (this.selectedPost.content.length > 0) {
      this.selectedPost.content.map( item => {
        if ( item.hasOwnProperty('heading') ) {
          this.formArrayControls.push(
            new FormGroup({
              heading: new FormControl(item.heading),
              size: new FormControl(item.size),
              align: new FormControl(item.align),
              color: new FormControl(item.color)
            })
          );
        }
        if ( item.hasOwnProperty('paragraph') ) {
          this.formArrayControls.push(
            new FormGroup({
              paragraph: new FormControl(item.paragraph),
              align: new FormControl(item.align),
              color: new FormControl(item.color)
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
