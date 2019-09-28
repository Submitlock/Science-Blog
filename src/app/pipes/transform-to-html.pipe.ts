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
    // FIX DATE FORMAT
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const postCreated = formPost.created;
    const formatDate = postCreated.getDate() + '-' + months[postCreated.getMonth()] + '-' + postCreated.getFullYear();
    // GET CATEGORY COLOR
    let color: string;
    switch (formPost.category) {
      case 'Chemistry':
        color = '#fe5e23';
        break;
      case 'Technologies':
        color = '#009ffb';
        break;
      case 'Physics':
        color = '#f59f00';
        break;
      case 'The Brain':
        color = '#b57b16';
        break;
      case 'The Space':
        color = '#8950a8';
        break;
      case 'Environment':
        color = '#43c785';
        break;
    }

    postMetaHTML +=
      `
        <div style="
          width: 100%;
          height: 300px;
          background: url(${formPost.image});
          background-size: cover;
          background-position: center;">
        </div>
        <div class="container">
          <h1 class='text-center my-4'> ${formPost.title} </h1>
          <p class='text-center'>
            <span style="color: #999">
              ${formPost.userEmail} | ${formatDate} | <span style="color: ${color}"><b>${formPost.category}</b></span>
            </span>
          </p>
          <hr>
        </div>
      `;
    if (formPost.content && formPost.content.length > 0) {
      postContentHTML = '';
      formPost.content.map( item => {
        if (item.hasOwnProperty('htmlString')) {
          postContentHTML += `<div class="container">${item.htmlString}</div>`;
        }
        if (item.hasOwnProperty('image')) {
          postContentHTML +=
          `<p style="text-align: ${item.align}">
          <img src="${item.image}" style="width: ${item.size}%; border-radius: ${item.radius}%">
        </p>`;
        }
      });
    }
    return postMetaHTML + postContentHTML + `<div class="container"><hr class="my-5"></div>`;
  }
}
