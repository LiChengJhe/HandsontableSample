import { Component, OnInit } from '@angular/core';
import { HotTableRegisterer } from '@handsontable/angular';
import * as Handsontable from 'handsontable';
import { GridSettings } from 'handsontable';
@Component({
  providers: [HotTableRegisterer],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Data: any[] = [];
  TableId = 'TableId';
  TableSettings: GridSettings;
  constructor(private tableReg: HotTableRegisterer) {
  }
  ngOnInit() {
    this.TableSettings = this.GetTableSettings();
  }
  ShowData(): void {
    this.Data = this.tableReg.getInstance(this.TableId).getData();
  }
  GetTableSettings(): GridSettings {
    return {
      contextMenu: true,
      allowInsertColumn: true,
      allowRemoveColumn: true,
      rowHeaders: true,
      minRows: 5,
      colHeaders: ['Text', 'Autocomplete', 'Dropdown', 'Checkbox', 'Numeric', 'Password', 'Date', 'Custom'],
      dataSchema: { Text: null, Autocomplete: null, Dropdown: null, Checkbox: null, Numeric: null, Password: null, Date: null, Custom: null },
      columns: [
        { data: 'Text', type: 'text' },
        { data: 'Autocomplete', type: 'autocomplete', source: ['A', 'B', 'C'] },
        { data: 'Dropdown', type: 'dropdown', source: ['A', 'B', 'C'] },
        { data: 'Checkbox', type: 'checkbox' },
        { data: 'Numeric', type: 'numeric' },
        { data: 'Password', type: 'password' },
        { data: 'Date', type: 'date' },
        { data: 'Custom', renderer: this.CustomRenderer, validator: this.EmailValidator },
      ],
      allowEmpty: false,
      manualColumnResize: true,
      manualRowResize: true,
      manualRowMove: true,
      manualColumnMove: true,
      autoColumnSize: true,
      autoRowSize: true,
      stretchH: 'all'
    };
  }
  CustomRenderer(instance: any, td: any, row: any, col: any, prop: any, value: any, cellProperties: any): void {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.backgroundColor = 'yellow';
  }
  EmailValidator(val, callback): void {
    setTimeout(() => {
      if (/.+@.+/.test(val)) {
        callback(true);
      } else {
        callback(false);
      }
    }, 1000);
  }
}
