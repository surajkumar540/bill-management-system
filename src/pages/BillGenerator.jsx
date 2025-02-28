import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBill } from "../redux/billSlice";
import SuccessModal from "../components/modal/SuccessModal";
import CustomerInformation from "../components/billgenerator/CustomerInformation";
import TableHeader from "../components/billgenerator/TableHeader";
import ProductList from "../components/billgenerator/ProductList";

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
        date: "",
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
      <CustomerInformation
        customer={customer}
        handleCustomerChange={handleCustomerChange}
      />

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
        <TableHeader />

        {/* Product List */}
        <ProductList
          products={products}
          handleProductChange={handleProductChange}
          removeProduct={removeProduct}
        />
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
        {isSubmitting ? "Processing..." : "Generate Bill"}
      </button>
      {/* Success Modal */}
      {isModalOpen && <SuccessModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default BillGenerator;
