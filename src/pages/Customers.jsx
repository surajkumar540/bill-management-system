import React from "react";
import { useSelector } from "react-redux";
import { BiRefresh } from "react-icons/bi";
import SearchBar from "../components/customers/SearchBar";
import CustomerList from "../components/customers/CustomerList";

const Customers = () => {
  const customers = useSelector((state) => state?.bill?.customers) || [];
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // Filter by name , mobile and address
  const filteredCustomers = customers.filter(
    (bill) =>
      bill.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.customer.mobile.includes(searchTerm) ||
      bill.customer.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // this one i used on google
  // Download invoice as CSV
  const downloadInvoice = (bill) => {
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Show loading indicator */}
      {isLoading && (
        <div className="flex justify-center my-4">
          <BiRefresh className="animate-spin h-8 w-8 text-blue-500" />
        </div>
      )}

      {/* Show "No List Found" if no customers exist */}
      <CustomerList
        downloadInvoice={downloadInvoice}
        filteredCustomers={filteredCustomers}
      />
    </div>
  );
};

export default Customers;
