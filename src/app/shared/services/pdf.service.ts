declare const jsPDF: any;
declare const $: any;

import { Injectable } from '@angular/core';

@Injectable()
export class PdfService {
  print({ columns, rows, options }) {
    if (!options.theme) options.theme = 'striped';
    if (!options.headerStyles) options.headerStyles = { fillColor: [254, 115, 48] };
    if (!options.margin) options.margin = { top: 40 };

    const doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows, {
      ...options,
      addPageContent: data => (doc.text(options.title, 40, 30)),
    });

    doc.setProperties({
      title: options.title,
      subject: `Pdf ${options.title}`,
    });
    const blob = doc.output('blob');

    if (window.navigator.msSaveOrOpenBlob) { // IE 11+
      window.navigator.msSaveOrOpenBlob(blob, `${options.title}.pdf`);
    } else if (navigator.userAgent.match('FxiOS')) { // FF iOS
      alert('Cannot display on FF iOS');
    } else if (navigator.userAgent.match('CriOS')) { // Chrome iOS
      const reader = new FileReader();
      reader.onloadend = function () {
        window.open(reader.result);
      };
      reader.readAsDataURL(blob);
    } else if (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i)) { // Safari & Opera iOS
      window.location.href = window.URL.createObjectURL(blob);
    } else window.open(URL.createObjectURL(blob));
  }
}
