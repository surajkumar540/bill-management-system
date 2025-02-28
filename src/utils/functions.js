// this one i used on google
// Download invoice as CSV
export const downloadInvoice = (bill) => {
  try {
    // Create CSV content
    const productRows = bill.products
      .map((p) => `${p.name},${p.quantity},${p.price},${p.total}`)
      .join("\n");

    const csvContent = `
Customer Invoice
Name: ${bill.customer.name}
Date: ${bill.customer.date}
Contact: ${bill.customer.mobile}
Address: ${bill.customer.address}

Product,Quantity,Price,Total
${productRows}

Total,${bill.products.reduce(
      (sum, p) => sum + Number(p.quantity),
      0
    )},,$${bill.products
      .reduce((sum, p) => sum + Number(p.total), 0)
      .toFixed(2)}
    `.trim();

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${bill.customer.name}-${bill.customer.date}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading invoice:", error);
  }
};
