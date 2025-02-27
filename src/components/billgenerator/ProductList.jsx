import React from "react";
const ProductList = ({ products, handleProductChange, removeProduct }) => {
  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition bg-white"
        >
          <div className="md:col-span-5">
            <label className="block md:hidden text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={product.name}
              onChange={(e) => handleProductChange(index, e)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block md:hidden text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              placeholder="Qty"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, e)}
              min="1"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block md:hidden text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Unit price"
              value={product.price}
              onChange={(e) => handleProductChange(index, e)}
              min="0"
              step="0.01"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block md:hidden text-sm font-medium text-gray-700 mb-1">
              Total
            </label>
            <input
              type="text"
              name="total"
              placeholder="0.00"
              value={product.total}
              readOnly
              className="w-full p-2 border border-gray-100 bg-gray-50 rounded-md text-gray-700 font-medium"
            />
          </div>
          <div className="md:col-span-1 flex justify-end md:items-center">
            {products.length > 1 && (
              <button
                onClick={() => removeProduct(index)}
                className="text-red-500 hover:text-red-700 transition p-1"
                title="Remove product"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
