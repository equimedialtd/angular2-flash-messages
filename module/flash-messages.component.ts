import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from './flash-messages.service';
import { FlashMessageInterface } from './flash-message.interface';

@Component({
	selector: 'flash-messages',
	template: `
    <div id="flashMessages" class="flash-message-container {{classes}}">
      <div id="greyOut" *ngIf='_grayOut && flashService.messages.length'></div>
      <div *ngFor='let message of flashService.messages' class="flash-message {{message.cssClass}}" [innerHTML]="message.text">
      </div>
    </div>
  `
})
export class FlashMessagesComponent implements OnInit {
	private _flashMessagesElement: any;

	constructor(private flashService: FlashMessagesService) { }

	ngOnInit() {
		this._flashMessagesElement = document.getElementById('flashMessages');
	}
}
