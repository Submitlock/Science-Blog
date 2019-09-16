import { EditPostComponent } from './../pages/blog/edit-post/edit-post.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './../pages/blog/blog.component';
import { HomeComponent } from './../pages/home/home.component';
import { NewPostComponent } from '../pages/blog/new-post/new-post.component';
import { LoggedInProtectionService } from './logged-in-protection.service';
import { SinglePostComponent } from '../pages/blog/single-post/single-post.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'blog', component: BlogComponent},
    {path: 'blog/new', component: NewPostComponent, canActivate: [LoggedInProtectionService]},
    { path: 'blog/:id/edit', component: EditPostComponent },
    { path: 'blog/:id', component: SinglePostComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRouting { }
