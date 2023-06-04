import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackService } from './../services/feedback.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Component, OnInit } from '@angular/core';
import { rating } from '../enums/enum.enum';
import { AuthenticationService } from '../services/authentication.service';
import { loginData } from '../interfaces/interface';

@Component({
  selector: 'sep-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  sliderMin = 0;
  sliderMax = 10;
  rating = 0;
  ratingText = '';
  inputAppearance: MatFormFieldAppearance = 'fill';
  ratingForm = new FormGroup({
    feedback: new FormControl(null, Validators.required),
    rating: new FormControl(null, Validators.required),
  });
  user: loginData = {};

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getUser.subscribe((user) => {
      this.user = user;
    });
  }

  onRatingChange = (rateEvent: any) => {
    this.rating = rateEvent?.value;
    if (this.rating >= 0 && this.rating <= 3) {
      this.ratingText = rating.lowLikely;
    } else if (this.rating >= 4 && this.rating <= 7) {
      this.ratingText = rating.midLikely;
    } else if (this.rating >= 8) {
      this.ratingText = rating.highLikely;
    }
    this.ratingForm.controls['rating'].setValue(this.rating);
  };

  onSubmit = () => {
    const payload = {
      ...this.ratingForm.value,
      userId: this.user._id,
      userType: this.user.categoryType,
    };
    this.feedbackService.postFeedback(payload).subscribe((data) => {
      console.log(data);
      const dialofRef = this.dialog.open(DialogComponent, {
        data: {
          heading: 'Feedback sent',
          content:
            'We’re so happy to hear from you! Thank you for your valuable feedback.',
          button: 3,
          btnText: 'Close',
        },
      });
      this.router.navigate(['startups']);
    });
  };
}
