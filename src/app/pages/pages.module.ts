import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatStepperModule,
  MatExpansionModule,
  MatListModule,
  MatGridListModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatProgressBarModule
} from '@angular/material';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TermsPrivacyComponent } from './terms-privacy/terms-privacy.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './dashboard/user-profile/user-profile.component';
import { ProjectListComponent } from './dashboard/project-list/project-list.component';
import { ApplyComponent } from './apply/apply.component';
import { BrowserComponent } from './browser/browser.component';
import { ProjectComponent } from './project/project.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DisclaimerComponent } from './common/disclaimer/disclaimer.component';
import { HandlerComponent } from './handler/handler.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatExpansionModule,
    MatListModule,
    MatGridListModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  declarations: [
    HomeComponent,
    AboutComponent,
    TermsPrivacyComponent,
    LoginComponent,
    DashboardComponent,
    UserProfileComponent,
    ProjectListComponent,
    ApplyComponent,
    BrowserComponent,
    ProjectComponent,
    NotFoundComponent,
    DisclaimerComponent,
    HandlerComponent
  ]
})
export class PagesModule { }