import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HotTableRegisterer } from '@handsontable/angular';
import * as Handsontable from 'handsontable';
import { GridSettings } from 'handsontable';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {


  FormIsSubmitted = false;
  POs: any[] = [];
  PoTableID = 'PoHotTableID';
  PoTableSettings: GridSettings;
  constructor(private hotRegisterer: HotTableRegisterer) { }

  ngOnInit() {

  }


  ngOnChanges(changes: SimpleChanges): void {


    const data = changes.Data;
    if (data) {

      this.POs = [];
      this.PoTableSettings = this.GetPoTableInitSettings();
      this.UpdatePoTable({ data: this.POs });

    }

  }


  UpdatePoTable(settings: GridSettings): void {
    const hotTable: Handsontable = this.hotRegisterer.getInstance(this.PoTableID);
    if (hotTable) {
      hotTable.updateSettings(settings, false);
    }
  }
  GetPoTableInitSettings(): GridSettings {
    return {

      contextMenu: true,
      allowInsertColumn: true,
      allowRemoveColumn: true,
      rowHeaders: true,
      minRows: 5,
      colHeaders: ['PO_No', 'PN', 'Description', 'Qty', 'Unit'],
      dataSchema: { PO_No: null, PN: null, Description: null, Qty: null, Unit: null },
      columns: [
        { data: 'PO_No', type: 'text' },
        { data: 'PN', type: 'text' },
        { data: 'Description', type: 'text' },
        { data: 'Qty', type: 'numeric' },
        { data: 'Unit', type: 'text' }
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
}
