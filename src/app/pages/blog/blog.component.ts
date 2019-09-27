import { ActivatedRoute } from '@angular/router';
import { PostModel } from './../../features/posts/models/post.model';
import { AppState } from 'src/app/app-store/app-store';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  @ViewChild('tabs', {static: false}) tabs: ElementRef;

  posts: PostModel[] = [];
  loading = false;
  selectedCategory: string = null;

  ngOnInit() {
    this.store.select('postsState').subscribe( res => {
      this.posts = res.posts;
      this.loading = res.loading;
    });

    this.route.queryParams.subscribe( params => {
      if (params) {
        this.selectedCategory = params.category;
      }
    });
  }

  switchCategory(category: string) {
    this.selectedCategory = category;
  }
}
