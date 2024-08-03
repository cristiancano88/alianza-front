import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  constructor() {}

  convertToCSV(objArray: any[], headerList: string[]): string {
    let csvData = this.headerToString(headerList) + '\r\n';
    csvData += objArray
      .map((row) => this.rowToString(row, headerList))
      .join('\r\n');
    return csvData;
  }

  private headerToString(headerList: string[]): string {
    return headerList.join(',');
  }

  private rowToString(row: any, headerList: string[]): string {
    return headerList.map((header) => this.formatValue(row[header])).join(',');
  }

  private formatValue(value: any): string {
    if (typeof value === 'string') {
      return `"${value.replace(/"/g, '""')}"`; // Escapa comillas dobles
    }
    return value != null ? value : '';
  }

  downloadCSV(csvData: string, filename: string): void {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
