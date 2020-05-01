import { UserProfile, UserData } from 'app/auth/user-profile';
import { User } from '@wizdm/connect/auth';
import { DialogRef } from '@wizdm/dialog';
import { Component } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'wm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  private newProfile: UserData;

  constructor(private user: UserProfile) {}

  public get UserId(): string { return this.user.uid; }

  public get profileData(): UserData { return this.user.data; }

  public get profilePhoto(): string { return this.profileData.photo || ''; }

  public get User(): User { return this.user.auth.user || {} as User };

  public get created(): string { return moment(!!this.User ? this.User.metadata.creationTime : null).format('ll'); }

  public get emailVerified(): boolean { return this.User.emailVerified || false; }

  public set profileData(user: UserData) { 
    
    this.newProfile = user;
  }

  public updateProfile() {

    return this.user.update(this.newProfile);
  }

  public updateProfileAndLeave(ref: DialogRef<boolean>) {

    this.updateProfile()
      .then( () => ref.close(true) );
  }

  public updatePhoto(photo: string) {

    this.user.update( { photo } );
  }

  public deletePhoto() {

    this.user.update({ photo: '' });
  }
}