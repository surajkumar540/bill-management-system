import { useSelector } from "react-redux";

const Customers = () => {
  const customers = useSelector((state) => state.bill.customers);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Customers List</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c, index) => (
            <tr key={index}>
              <td>{c.name}</td>
              <td>{c.quantity}</td>
              <td>{c.date}</td>
              <td>{c.contact}</td>
              <td>{c.address}</td>
              <td>{c.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
