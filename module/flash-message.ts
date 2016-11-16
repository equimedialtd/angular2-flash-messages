import { FlashMessageInterface } from './flash-message.interface';

export class FlashMessage implements FlashMessageInterface {
	text: string = "";
	cssClass: string = "";

	constructor(message: FlashMessageInterface) { }
}
