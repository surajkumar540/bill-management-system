import React from "react";

const TableHeader = () => {
  return (
    <div className="hidden md:grid md:grid-cols-12 gap-4 mb-2 font-medium text-sm text-gray-600 px-2">
      <div className="col-span-5">Product Name</div>
      <div className="col-span-2">Quantity</div>
      <div className="col-span-2">Price</div>
      <div className="col-span-2">Total</div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default TableHeader;
