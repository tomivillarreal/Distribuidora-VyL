import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
})
export class PdfComponent {
  crearPdf() {
    const data: any = {
      content: [
        {
          text: 'holaaaa',
        },
      ],
    };
  }
}
