import { Component, OnInit } from '@angular/core';
import { FlashMessage } from './flash-message';
import { FlashMessagesService } from './flash-messages.service';
import { FlashMessageInterface } from './flash-message.interface';

@Component({
  selector: 'flash-messages',
  template: `
      <div id="flashMessages" class="flash-messages {{classes}}">
          <div id="grayOutDiv" *ngIf='_grayOut && messages.length'></div>
          <div *ngFor='let message of messages' class="flash-message {{message.cssClass}}" [innerHTML]="message.text">
          </div>
      </div>
  `
})

export class FlashMessagesComponent implements OnInit {
    private _defaults = {
        text: 'default message',
        cssClass: ''
    };

    text: string;
    messages: FlashMessageInterface[] = [];
    _grayOut: boolean = false;

    private _flashMessagesElement: any;

    constructor(private _flashMessagesService: FlashMessagesService) {
        this._flashMessagesService.show = this.show.bind(this);
        this._flashMessagesService.grayOut = this.grayOut.bind(this);
        this._flashMessagesService.messages = this.messages;
        this._flashMessagesService.add = this.addFlash.bind(this);
        this._flashMessagesService.remove = this.removeFlash.bind(this);
        this._flashMessagesService.clear = this.clearFlash.bind(this);
    }

    ngOnInit() {
      this._flashMessagesElement = document.getElementById('flashMessages');
    }

    clearFlash() { this.messages = []; }

    addFlash(message:FlashMessageInterface) {
      // this.show(flash.text, { cssClass: flash.cssClass })
      this.messages.push(message);
      return this.messages;
    }

    show(text?: string, options = {}): void {
        let defaults = {
          timeout: 2500,
          cssClass: ''
        };

        for (var attrname in options) { defaults[attrname] = options[attrname]; }

        let message = new FlashMessage(text, defaults.cssClass);
        this.addFlash(message);

        if(defaults.timeout > 0) {
          window.setTimeout(() => {
              this.removeFlash(message);
          }, defaults.timeout);
        }
    }

    grayOut(value = false) {
        this._grayOut = value;
    }

    findFlash(message: FlashMessageInterface) {
    	return this.messages.indexOf(message);
    }

    removeFlash(message: FlashMessageInterface) {
  		this.messages.splice( this.findFlash(message), 1 )
    }
}
