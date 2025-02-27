import { useSelector } from "react-redux";

const Customers = () => {
  const customers = useSelector((state) => state?.bill?.customers) || []; // Ensure customers is always an array

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Customers List</h2>

      {/* Show "No List Found" if no customers exist */}
      {customers.length === 0 ? (
        <p className="text-center text-gray-500">No List Found</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Total Quantity</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Contact</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((bill, index) => {
              const totalQuantity = bill.products.reduce(
                (sum, p) => sum + Number(p.quantity),
                0
              );
              const totalPrice = bill.products.reduce(
                (sum, p) => sum + Number(p.total),
                0
              );

              return (
                <tr key={index} className="border text-center">
                  <td className="border px-4 py-2">{bill.customer.name}</td>
                  <td className="border px-4 py-2">{totalQuantity}</td>
                  <td className="border px-4 py-2">{bill.customer.date}</td>
                  <td className="border px-4 py-2">{bill.customer.mobile}</td>
                  <td className="border px-4 py-2">{bill.customer.address}</td>
                  <td className="border px-4 py-2">${totalPrice.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Customers;
