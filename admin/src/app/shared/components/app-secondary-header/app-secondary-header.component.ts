import {Component, Input} from "@angular/core";

@Component({
  selector: "app-secondary-header",
  styles: [`
    .secondary-header {
      margin-bottom: 20px;
      margin-top: 20px;
    }

    .add-link {
      margin-top: 10px;
    }
  `],
  template: `
    <div class="secondary-header d-flex justify-content-between">
      <h3>{{title}}</h3>
      <a
        class="add-link"
        *ngIf="rightLinkTitle"
        [href]="rightLink">
        {{rightLinkTitle}}
      </a>
    </div>`
})
export class AppSecondaryHeaderComponent {
  @Input() title: string;
  @Input() rightLinkTitle: string;
  @Input() rightLink: string;
}
