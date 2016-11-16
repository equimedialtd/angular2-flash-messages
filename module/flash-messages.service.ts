import { Injectable } from '@angular/core';

import { FlashMessage } from './flash-message';
import { FlashMessageInterface } from './flash-message.interface';

@Injectable()
export class FlashMessagesService {
	private messages: FlashMessageInterface[] = [];
	private overlay: boolean = false;

	clear(): void { this.messages = []; }

	add(message: FlashMessageInterface): FlashMessageInterface[] {
		this.messages.push(message);
		return this.messages;
	}

	grayOut(value = false): void {
		this.overlay = value;
	}

	find(message: FlashMessageInterface): number {
		return this.messages.indexOf(message);
	}

	remove(message: FlashMessageInterface): void {
		this.messages.splice( this.find(message), 1 )
	}

	show(text?: string, args = {}): void {
		let options = {
			timeout: 2500,
			cssClass: ''
		};

		// (<any>Object).assign(options, args);
		for (var attr in args) { options[attr] = args[attr]; }

		const message = new FlashMessage(text, { cssClass: options.cssClass });
		this.add(message);

		if (options.timeout > 0) {
			window.setTimeout(() => { this.remove(message); }, options.timeout);
		}
	}
}
