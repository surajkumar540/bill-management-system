import { useState } from "react";

const BillGenerator = () => {
  const [customer, setCustomer] = useState({
    name: "",
    mobile: "",
    address: "",
    date: "",
  });

  const [products, setProducts] = useState([
    { name: "", quantity: "", price: "", total: "" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle input changes
  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleProductChange = (index, e) => {
    const updatedProducts = [...products];
    updatedProducts[index][e.target.name] = e.target.value;

    // Auto-calculate total price
    if (updatedProducts[index].quantity && updatedProducts[index].price) {
      updatedProducts[index].total =
        updatedProducts[index].quantity * updatedProducts[index].price;
    } else {
      updatedProducts[index].total = "";
    }

    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      { name: "", quantity: "", price: "", total: "" },
    ]);
  };

  const removeProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const generateBill = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Bill Generator</h2>

      {/* Customer Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={customer.name}
          onChange={handleCustomerChange}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={customer.mobile}
          onChange={handleCustomerChange}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="address"
          placeholder="Customer Address"
          value={customer.address}
          onChange={handleCustomerChange}
          className="p-2 border rounded-md"
        />
        <input
          type="date"
          name="date"
          value={customer.date}
          onChange={handleCustomerChange}
          className="p-2 border rounded-md"
        />
      </div>

      {/* Product List */}
      <h3 className="text-lg font-semibold mb-2">Products</h3>
      {products.map((product, index) => (
        <div key={index} className="grid grid-cols-4 gap-4 mb-3">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => handleProductChange(index, e)}
            className="p-2 border rounded-md"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={product.quantity}
            onChange={(e) => handleProductChange(index, e)}
            className="p-2 border rounded-md"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={(e) => handleProductChange(index, e)}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="total"
            placeholder="Total"
            value={product.total}
            readOnly
            className="p-2 border bg-gray-200 rounded-md"
          />
          {index > 0 && (
            <button
              onClick={() => removeProduct(index)}
              className="col-span-4 text-red-500 hover:underline"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      {/* Add Product Button */}
      <button
        onClick={addProduct}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        + Add Product
      </button>

      {/* Generate Bill Button */}
      <button
        onClick={generateBill}
        className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md w-full"
      >
        Generate Bill
      </button>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">Success</h3>
            <p className="mb-4">Bill has been successfully generated!</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillGenerator;
