import {
  useFetchAllOrdersQuery,
  useUpdateDeliveryMutation,
} from "../../redux/api/ordeApiSlice.js";
import Loader from "./../../components/Loader";
import { IoMdCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";

const OrderList = () => {
  const {
    data: allOrders,
    isLoading,
    error,
    refetch,
  } = useFetchAllOrdersQuery();
  const [deliveryUpdateApiCall] = useUpdateDeliveryMutation();
  const deliveryHandler = async (orderId) => {
    try {
      const res = await deliveryUpdateApiCall(orderId).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
      alert(error.data.message);
    }
  };

  return (
    <div className="w-full md:w-[90%] mx-auto py-5 text-white">
      <h4 className="text-xl text-white font-medium">Orders</h4>
      {allOrders?.length == 0 && (
        <span className="text-center text-sm block my-5 text-gray-400">
          No order Found
        </span>
      )}
      {isLoading && !allOrders && <Loader />}
      {!isLoading && allOrders && allOrders.length !== 0 && (
        <div className="w-full overflow-auto mt-5">
          <div className="w-full max-h-[20rem] min-w-[503px]">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-xs md:text-sm font-medium text-left py-4 uppercase">
                    ID
                  </th>
                  <th className="text-xs md:text-sm font-medium text-left py-4 uppercase">
                    Date
                  </th>
                  <th className="text-xs md:text-sm font-medium text-left py-4 uppercase">
                    Price
                  </th>
                  <th className="text-xs md:text-sm font-medium text-left py-4 uppercase">
                    Paid
                  </th>
                  <th className="text-xs md:text-sm font-medium text-left py-4 uppercase">
                    Deliveried
                  </th>
                </tr>
              </thead>
              <tbody>
                {allOrders?.map((order) => (
                  <tr key={order._id} className="">
                    <td className="text-xs md:text-sm  text-left py-4 uppercase">
                      {order._id}
                    </td>
                    <td className="text-xs md:text-sm  text-left py-4 uppercase">
                      ${order.totalPrice}
                    </td>
                    <td className="text-xs md:text-sm  text-left py-4 uppercase">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="text-xs md:text-sm uppercase text-left py-4">
                      {order.isPaid ? (
                        <>
                          <span className="hidden md:block bg-green-600 text-white text-xs px-4 py-2 rounded-full">
                            Paid
                          </span>
                          <span className="bg-green-600 md:hidden text-white text-xs px-4 py-2 rounded-full">
                            Y
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="hidden md:inline bg-red-400 text-white text-xs px-4 py-2 rounded-full">
                            Unpaid
                          </span>
                          <span className="md:hidden bg-red-400 text-white text-xs px-4 py-2 rounded-full">
                            N
                          </span>
                        </>
                      )}
                    </td>
                    <td className="text-xs md:text-sm uppercase  text-left py-4">
                      {order.isDelivered ? (
                        <>
                          <span className="hidden md:inline bg-green-600 text-white text-xs px-4 py-2 rounded-full">
                            Completed
                          </span>
                          <span className="md:hidden bg-green-600 text-white text-xs px-4 py-2 rounded-full">
                            Y
                          </span>
                        </>
                      ) : (
                        <div className="flex gap-2">
                          <>
                            <span className="hidden md:block bg-red-400 text-white text-xs px-4 py-2 rounded-full">
                              Pandding
                            </span>
                            <span className="md:hidden bg-red-400 text-white text-xs px-4 py-2 rounded-full">
                              N
                            </span>
                          </>
                          <button
                            onClick={() => deliveryHandler(order._id)}
                            className="cursor-pointer bg-blue-600 text-white text-sm rounded-md p-2"
                          >
                            <IoMdCheckmark />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="text-xs text-left">
                      <Link
                        to={`/order/${order._id}`}
                        className="bg-pink-500 text-white text-sm cursor-pointer px-4 py-2 rounded-full"
                      >
                        <span className="hidden md:inline">View Details</span>
                        <span className="md:hidden ">...</span>
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

export default OrderList;
