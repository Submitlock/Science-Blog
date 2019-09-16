import { Pipe, PipeTransform } from '@angular/core';
import { PostModel } from '../features/posts/models/post.model';

@Pipe({
  name: 'postsLoopByCategory'
})
export class PostsLoopByCategoryPipe implements PipeTransform {

  transform(posts: PostModel[], category: string): PostModel[] {
    if (category) {
      return posts.filter( post => post.category === category);
    }
    return posts;
  }

}
