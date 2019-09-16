import { Pipe, PipeTransform } from '@angular/core';
import { FormPostType } from '../features/posts/models/post.model';

@Pipe({
  name: 'transformToHTML',
  pure: false,
})
export class TransformToHTMLPipe implements PipeTransform {

  transform(formPost: FormPostType): string {
    let postMetaHTML = '';
    let postContentHTML = '';

    postMetaHTML +=
      `
        <img src='${formPost.image}' width='100%'>
        <h1 class='text-center'> ${formPost.title} </h1>
        <p class='text-muted'>Category: ${formPost.category}</p>
        <p class='text-muted'>Made by: ${formPost.user}</p>
      `;
    if (formPost.content.length > 0) {
      postContentHTML = '';
      formPost.content.map( item => {
        if (item.hasOwnProperty('heading')) {
          postContentHTML +=
            `
              <${item.size} style='text-align: ${item.align}; color: ${item.color}'>
                ${item.heading}
              </${item.size}>
            `;
        }
        if (item.hasOwnProperty('paragraph')) {
          postContentHTML +=
            `
              <p style='text-align: ${item.align}; color: ${item.color}'>
                ${item.paragraph}
              </p>
            `;
        }
        if (item.hasOwnProperty('image')) {
          postContentHTML +=
            `
              <p style='text-align: ${item.align}'>
                <img src='${item.image}' style='width: ${item.size}%; border-radius: ${item.radius}%'>
              </p>
            `;
        }
      });
    }
    return postMetaHTML + postContentHTML;
  }
}
