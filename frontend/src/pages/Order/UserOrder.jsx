import Loader from "../../components/Loader.jsx";
import { useFetchOwnOrderQuery } from "../../redux/api/ordeApiSlice.js";
import { Link } from "react-router-dom";

const UserOrder = () => {
  const { data: myOrders, isLoading, error } = useFetchOwnOrderQuery();
  console.log("my order", myOrders);
  return (
    <div className="w-full md:w-[90%] mx-auto py-5 text-white">
      <h4 className="text-xl font-medium">My Orders</h4>
      {isLoading && <Loader />}
      {myOrders?.length == 0 && (
        <span className="text-center text-sm block my-5 text-gray-400">
          You have no{" "}
          <Link to="/shop" className="font-semibold">
            Orders
          </Link>{" "}
        </span>
      )}
      {!isLoading && myOrders && myOrders.length != 0 && (
        <div className="w-full overflow-auto mt-5">
          <div className="max-h-[20rem] w-full min-w-[530px]">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-sm uppercase font-medium text-left ">
                    Order Id
                  </th>
                  <th className="text-sm uppercase font-medium text-left ">
                    Date
                  </th>
                  <th className="text-sm uppercase font-medium text-left ">
                    Total
                  </th>
                  <th className="text-sm uppercase font-medium text-left ">
                    Paid
                  </th>
                  <th className="text-sm uppercase font-medium text-left ">
                    Deliveried
                  </th>
                </tr>
              </thead>
              <tbody>
                {myOrders?.map((order) => (
                  <tr key={order._id} className="bg-[#151515] ">
                    <td className="text-xs uppercase font-normal text-left py-4">
                      {order._id}
                    </td>
                    <td className="text-xs uppercase font-normal text-left py-4">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="text-xs uppercase font-normal text-left py-4">
                      ${order.totalPrice}
                    </td>
                    <td className="text-xs uppercase font-normal text-left py-4">
                      {order.isPaid ? (
                        <span className="bg-green-600 text-white text-xs px-4 py-2 rounded-full">
                          <span className="hidden md:inline">Paid</span>
                          <span className=" md:hidden">Y</span>
                        </span>
                      ) : (
                        <span className="bg-red-400 text-white text-xs px-4 py-2 rounded-full">
                          <span className="hidden md:inline">Unpaid</span>
                          <span className=" md:hidden">N</span>
                        </span>
                      )}
                    </td>
                    <td className="text-sx uppercase font-normal text-left py-4">
                      {order.isDelivered ? (
                        <span className="bg-green-600 text-white text-xs px-4 py-2 rounded-full">
                          <span className="hidden md:inline">Completed</span>
                          <span className="md:hidden">Y</span>
                        </span>
                      ) : (
                        <span className="bg-red-400 text-white text-xs px-4 py-2 rounded-full">
                          <span className="hidden md:inline">Pandding</span>
                          <span className="md:hidden">N</span>
                        </span>
                      )}
                    </td>
                    <td className="text-left">
                      <Link
                        to={`/order/${order._id}`}
                        className="bg-pink-500 text-white text-sm cursor-pointer px-2 py-1 md:px-4 md:py-2 rounded-full"
                      >
                        <span className="md:hidden">...</span>
                        <span className="hidden md:inline">View Details</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrder;
