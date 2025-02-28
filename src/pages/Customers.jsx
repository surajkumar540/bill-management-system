import React from "react";
import { useSelector } from "react-redux";
import { BiRefresh } from "react-icons/bi";
import SearchBar from "../components/customers/SearchBar";
import CustomerList from "../components/customers/CustomerList";
import { downloadInvoice } from "../utils/functions";
const Customers = () => {
  const customers = useSelector((state) => state?.bill?.customers) || [];
  const [searchTerm, setSearchTerm] = React.useState("");

  // Filter by name , mobile and address
  const filteredCustomers = customers.filter(
    (bill) =>
      bill.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.customer.mobile.includes(searchTerm) ||
      bill.customer.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Show "No List Found" if no customers exist */}
      <CustomerList
        downloadInvoice={downloadInvoice}
        filteredCustomers={filteredCustomers}
      />
    </div>
  );
};

export default Customers;
