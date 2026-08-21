const PDFDocument = require('pdfkit');

const generateFeeReceiptPDF = (payment, student, feeStructure) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40 });
      const buffers = [];
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // Header
      doc.fontSize(22).fillColor('#1E3A8A').text('GREENWOOD INTERNATIONAL SCHOOL', { align: 'center' });
      doc.fontSize(10).fillColor('#4B5563').text('123 Education Lane, Knowledge City | Phone: +1 800 555 0199', { align: 'center' });
      doc.moveDown(0.5);
      doc.strokeColor('#E5E7EB').lineWidth(1).moveTo(40, doc.y).lineTo(570, doc.y).stroke();
      doc.moveDown(1);

      // Receipt Title
      doc.fontSize(16).fillColor('#111827').text('OFFICIAL FEE PAYMENT RECEIPT', { align: 'center', underline: true });
      doc.moveDown(1);

      // Details Grid
      doc.fontSize(11).fillColor('#374151');
      doc.text(`Receipt No: ${payment.receiptNo}`, 40, doc.y);
      doc.text(`Date: ${new Date(payment.paymentDate).toLocaleDateString()}`, 400, doc.y - 12);
      doc.moveDown(0.5);

      doc.text(`Student ID: ${student.studentId}`, 40, doc.y);
      doc.text(`Student Name: ${student.firstName} ${student.lastName}`, 400, doc.y - 12);
      doc.moveDown(0.5);

      doc.text(`Class & Section: Class ${student.classId?.name || ''} - ${student.sectionId?.name || ''}`, 40, doc.y);
      doc.text(`Payment Method: ${payment.paymentMethod.toUpperCase()}`, 400, doc.y - 12);
      doc.moveDown(1.5);

      // Table Header
      const tableTop = doc.y;
      doc.rect(40, tableTop, 530, 24).fill('#F3F4F6');
      doc.fillColor('#111827').fontSize(11).text('Description', 50, tableTop + 6);
      doc.text('Amount ($)', 480, tableTop + 6);

      let itemY = tableTop + 30;
      doc.fillColor('#374151');
      doc.text(feeStructure ? feeStructure.title : 'Tuition & Academic Fees', 50, itemY);
      doc.text(`$${payment.amountPaid.toFixed(2)}`, 480, itemY);

      doc.moveDown(3);
      doc.strokeColor('#E5E7EB').lineWidth(1).moveTo(40, doc.y).lineTo(570, doc.y).stroke();
      doc.moveDown(1);

      doc.fontSize(14).fillColor('#059669').text(`TOTAL PAID: $${payment.amountPaid.toFixed(2)}`, { align: 'right' });
      doc.moveDown(2);

      doc.fontSize(9).fillColor('#9CA3AF').text('This is a computer-generated official receipt. Authorized Signature Not Required.', { align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

const generateReportCardPDF = (result, student, exam) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40 });
      const buffers = [];
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      doc.fontSize(22).fillColor('#1E3A8A').text('GREENWOOD INTERNATIONAL SCHOOL', { align: 'center' });
      doc.fontSize(12).fillColor('#4B5563').text(`ACADEMIC REPORT CARD - ${exam.name}`, { align: 'center' });
      doc.moveDown(1);

      doc.fontSize(10).fillColor('#374151');
      doc.text(`Student Name: ${student.firstName} ${student.lastName}`);
      doc.text(`Roll No: ${student.rollNumber} | Admission No: ${student.admissionNumber}`);
      doc.text(`GPA: ${result.gpa} | Rank: #${result.rank} | Result: ${result.status.toUpperCase()}`);
      doc.moveDown(1);

      const tableTop = doc.y;
      doc.rect(40, tableTop, 530, 20).fill('#E0E7FF');
      doc.fillColor('#1E1B4B').fontSize(10).text('Subject', 50, tableTop + 5);
      doc.text('Marks Obtained', 250, tableTop + 5);
      doc.text('Max Marks', 380, tableTop + 5);
      doc.text('Grade', 490, tableTop + 5);

      let currentY = tableTop + 25;
      result.marks.forEach((m) => {
        doc.fillColor('#374151').fontSize(10);
        doc.text(m.subjectId?.name || 'Subject', 50, currentY);
        doc.text(`${m.marksObtained}`, 250, currentY);
        doc.text(`${m.maxMarks}`, 380, currentY);
        doc.text(`${m.grade}`, 490, currentY);
        currentY += 20;
      });

      doc.moveDown(2);
      doc.fontSize(12).fillColor('#111827').text(`Percentage: ${result.percentage}%`);
      doc.text(`Remarks: ${result.remarks}`);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  generateFeeReceiptPDF,
  generateReportCardPDF,
};
