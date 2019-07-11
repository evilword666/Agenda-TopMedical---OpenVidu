import { Component, Input } from '@angular/core';
import { StreamManager } from 'openvidu-browser';


@Component({
    selector: 'user-video',
    styles: [
        `
            ov-video {
                width: 100%;
                height: 100%;
            }
            div div {
                position: absolute;
                background: #f8f8f8;
                padding-left: 5px;
                padding-right: 5px;
                color: #777777;
                border-bottom-right-radius: 4px;
                top:0;
                left:0;
                font-weight:400;
                font-size:12px;
            }
            p {
                margin: 0;
            }
        `,
],
    template: `
    <div style="width:100%; height:100%">
         <ov-video [streamManager]="streamManager"></ov-video>
         <div class="tag">{{getNicknameTag()}}</div>
     </div>
     `,
})
export class UserVideoComponent {

    @Input()
    streamManager: StreamManager;

    getNicknameTag() {
        try {
            return JSON.parse(this.streamManager.stream.connection.data).clientData;
        } catch (err) {
            console.error('ClientData is not JSON formatted');
        }
    }
}
