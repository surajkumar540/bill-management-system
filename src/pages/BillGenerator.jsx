import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBill } from "../redux/billSlice";

const BillGenerator = () => {
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState({
    name: "",
    mobile: "",
    address: "",
    date: new Date().toISOString().substr(0, 10), // Default to today's date
  });

  const [products, setProducts] = useState([
    { name: "", quantity: "", price: "", total: "" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate total bill amount
  const totalBillAmount = products.reduce(
    (sum, product) => sum + (Number(product.total) || 0),
    0
  );

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
    setIsSubmitting(true);

    // Simulate a small delay for better UX
    setTimeout(() => {
      const billData = {
        customer,
        products,
        totalAmount: totalBillAmount,
        billNumber: `INV-${Math.floor(Math.random() * 10000)}`,
        createdAt: new Date().toISOString(),
      };

      dispatch(addBill(billData));

      setCustomer({
        name: "",
        mobile: "",
        address: "",
        date: new Date().toISOString().substr(0, 10),
      });

      setProducts([{ name: "", quantity: "", price: "", total: "" }]);
      setIsSubmitting(false);
      setIsModalOpen(true);
    }, 600);
  };

  // Form validation
  const isCustomerValid = customer.name && customer.mobile && customer.date;
  const areProductsValid = products.every(
    (p) => p.name && Number(p.quantity) > 0 && Number(p.price) > 0
  );
  const isFormValid = isCustomerValid && areProductsValid;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Bill Generator</h2>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Customer Details Section */}
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

      {/* Products Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4 pb-2 border-b">
          <h3 className="text-lg font-semibold text-gray-700">Products</h3>
          <button
            onClick={addProduct}
            className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium px-4 py-2 rounded-md transition flex items-center"
          >
            <span className="mr-1">+</span> Add Product
          </button>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 mb-2 font-medium text-sm text-gray-600 px-2">
          <div className="col-span-5">Product Name</div>
          <div className="col-span-2">Quantity</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Total</div>
          <div className="col-span-1"></div>
        </div>

        {/* Product List */}
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
      </div>

      {/* Bill Summary */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total Amount:</span>
          <span className="text-xl">₹{totalBillAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* Generate Bill Button */}
      <button
        onClick={generateBill}
        disabled={!isFormValid || isSubmitting}
        className={`w-full py-3 rounded-lg transition-all duration-200 font-medium text-white 
          ${
            isFormValid && !isSubmitting
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
      >
        {isSubmitting ? (
          <span className="inline-flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Generate Bill"
        )}
      </button>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="text-center mb-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-3">
                Bill Generated Successfully!
              </h3>
              <p className="text-gray-500 mt-1">
                Your bill has been created and saved.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillGenerator;
