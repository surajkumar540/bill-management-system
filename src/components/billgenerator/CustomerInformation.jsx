import React from "react";

const CustomerInformation = ({customer, handleCustomerChange}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 pb-2 border-b text-gray-700">
        Customer Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={customer.name}
            onChange={handleCustomerChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <input
            type="number"
            name="mobile"
            placeholder="Enter mobile number"
            value={customer.mobile}
            onChange={handleCustomerChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            placeholder="Enter customer address"
            value={customer.address}
            onChange={handleCustomerChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bill Date
          </label>
          <input
            type="date"
            name="date"
            value={customer.date}
            onChange={handleCustomerChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerInformation;
