import React from "react";
import { useSelector } from "react-redux";
import { BiDownload, BiSearch, BiRefresh } from "react-icons/bi";

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
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          Customers List
        </h1>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <BiSearch className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
        </div>
      </div>

      {/* Show loading indicator */}
      {isLoading && (
        <div className="flex justify-center my-4">
          <BiRefresh className="animate-spin h-8 w-8 text-blue-500" />
        </div>
      )}

      {/* Show "No List Found" if no customers exist */}
      {filteredCustomers.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500 text-lg">No customers found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((bill, index) => {
                const totalQuantity = bill.products.reduce(
                  (sum, p) => sum + Number(p.quantity),
                  0
                );
                const totalPrice = bill.products.reduce(
                  (sum, p) => sum + Number(p.total),
                  0
                );

                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {bill.customer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {totalQuantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {bill.customer.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {bill.customer.mobile}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {bill.customer.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      ${totalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => downloadInvoice(bill)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <BiDownload className="h-4 w-4 mr-1" />
                        Invoice
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Customers;
