import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, AbstractControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContentManager, CanPageDeactivate, ProjectService, wmProject } from 'app/core';
import { PopupComponent } from 'app/shared/popup/popup.component';
import { TermsPrivacyPopupComponent } from 'app/pages/terms-privacy/terms-privacy-popup.component';
import { switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'wm-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit, CanPageDeactivate {

  private stepForms: FormGroup[] = new Array();
  private nameForm: FormGroup;
  private progress = false;
  private msgs;

  constructor(private builder: FormBuilder, 
              private router:  Router,
              private route:   ActivatedRoute,
              private content: ContentManager,
              private project: ProjectService,
              private dialog:  MatDialog) { }

  ngOnInit() {

    // Gets the localized user messages from content manager
    this.msgs = this.content.select('apply');

    // Build the stepper forms
    this.buildForm();
  }

  private errorMessage(controlErrors: any, errorMessages: any): string {
    
    // Evaluates the validation reported errors
    let codes = Object.keys(controlErrors);
    
    // Returns the relevant error message
    return errorMessages && codes ? errorMessages[codes[0]] : '';
  }

  // Project Name Validator Factory 
  get projectNameValidator() {
    
    // Returns a validator function async checking if the project name
    // already exists
    return (control: AbstractControl): Promise<{[key: string]: any} | null> => {
      
      return this.project.doesProjectExists(control.value)
        .then( r => r ? { alreadyExist: true } : null , e => e );
    };
  }

  private buildForm() {
    // Creates the form group for the application name with:
    // a sync validator 'required'
    // an async validator to check for projects with the same name
    this.nameForm = this.builder.group({
      name: ['', Validators.required, this.projectNameValidator ]
    });

    // Loops on the application questions to build the relevant form group and controls
    this.msgs.questions.forEach(question => {
      
      let group: any = {};

      // Build the group's controls
      question.fields.forEach( field => {

        let required = field.errors && field.errors.required;

        group[field.name] = new FormControl('', required ? Validators.required : null);
      });

      // Push the form group into the array
      this.stepForms.push( new FormGroup(group) );
    });
  }

  private draftProject() {

    // Proceed only upon proper name validation
    if(this.nameForm.invalid) {

      console.log('Invalid project name, skipping draft');
      return;
    }

    let name = this.nameForm.controls.name.value;

    // Creates the new project with no information but the status 'draft'
    this.project.addProject({ name: name, status: 'draft' } as wmProject)
      .then(result => {

        console.log("project created: ", name);
        
      }).catch(error => {

        console.log("something wrong: ", error.code);

      });
  }

  private updateApplication(step: number) {

    // Check for form validation results
    if(this.stepForms[step].invalid) {

      console.log('Invalid application data, skipping to update');
      return;
    }

    // Update the project's application application 
    let value = this.stepForms[step].value;

    console.log("step: " + JSON.stringify(value));

    this.project.updateApplication(value)
      .then(() => {
        
        console.log("application updated");

      }).catch(error => {

        console.log("something wrong: " + error.code);

      });
  }

  private submitProject() {
    
    console.log('done');

    // Shows the progress
    this.progress = true;

    // At this point submitting a project means simply turn its status into 'submitted'
    // since the relevant project and application data has been saved along the steps
    this.project.updateProject({ status: 'submitted' } as wmProject)
      .then(() => {
        
        console.log("project submitted");
        this.progress = false;

        // Navigate back to the dashboard reporting the creation of a new project
        this.router.navigate(['..', 'dashboard'], {
          relativeTo: this.route,
          queryParams: {
            project: 'new'
          }
        });

      }).catch(error => {

        console.log("something wrong: " + error.code);
        this.progress = false;
      });
  }

  private popupTerms() {

    // Pops up the terms-privacy conditions without leaving the page
    this.dialog.open(TermsPrivacyPopupComponent);
  }

  public canDeactivate() {

    // Gets the project data saved so far...
    return this.project.queryProject().pipe( 
      take(1),
      switchMap( (data: wmProject) => {

        // Checks if already submitted
        if(data && data.status != 'submitted') {
          
          // If not, ask the user ho to proceed
          return this.dialog.open(PopupComponent, { 
            data: this.msgs.canLeave,
            maxWidth: 500,
          })
          .afterClosed();
        }
      
        // Proceeds otherwise
        return of(true);
      })
    );
  }
}

/*
  private loadProject(id: string) {

    this.project.queryProject(id).pipe( 
      take(1),
      tap( (data: wmProject) => {

        // Fill out the project name form
        this.nameForm.patchValue({ name: data.name } );
        
        // Loops on form group steps
        this.msgs.questions.forEach( (question, index) => { 
          this.stepForms[index].patchValue( data.application );
        });
      })
    ).subscribe();
  }
*/
