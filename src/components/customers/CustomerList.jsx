import React from "react";

const CustomerList = ({ downloadInvoice, filteredCustomers }) => {
  return (
    <div>
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

export default CustomerList;
