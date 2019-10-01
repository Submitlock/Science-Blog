import { PostModel } from './../../models/post.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts-loop',
  templateUrl: './posts-loop.component.html',
  styleUrls: ['./posts-loop.component.css']
})
export class PostsLoopComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  @Input() posts: PostModel[];
  @Input() error: string;

  ngOnInit() {
  }

  selectPost(id: string) {
    this.router.navigate([id], {relativeTo: this.route});
  }

}
