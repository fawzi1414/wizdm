import { StripeElements, StripeElement, StripeElementsConfig, STRIPE_ELEMENTS_CONFIG } from '@wizdm/stripe/elements';
import { Component, Inject, forwardRef, Input, ElementRef } from '@angular/core';
import type { StripeCardNumberElementOptions } from '@stripe/stripe-js';

/** Stripe CardNumber Element for Angular */
@Component({
  selector: 'wm-stripe-card-number',
  template: '',
  providers: [
    { provide: StripeElement, useExisting: forwardRef(() => StripeCardNumber) }
  ]
})
export class StripeCardNumber extends StripeElement<'cardNumber'> {

  constructor(elements: StripeElements, @Inject(STRIPE_ELEMENTS_CONFIG) config: StripeElementsConfig, ref: ElementRef<HTMLElement>) {
    super('cardNumber', elements, config, ref);
  }

  /** CardNumber specific options */
  protected get options(): StripeCardNumberElementOptions {
    return { 
     disabled: this.disabled,
     placeholder: this.placeholder
    };
  };
  
  /** A placeholder text */
  @Input() placeholder: string;
}