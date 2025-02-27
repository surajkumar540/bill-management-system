import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadInvoice = () => {
  const invoiceElement = document.getElementById("invoice");
  html2canvas(invoiceElement).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("invoice.pdf");
  });
};
