import Chart from "react-apexcharts";
import { useUserListQuery } from "../../redux/api/userApiSlice.js";
import {
  useFetchTotalSalesDataQuery,
  useFetchTotalSalesByDateDataQuery,
  useFetchTotalOrdersQuery,
} from "../../redux/api/ordeApiSlice.js";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { CiShoppingCart } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
const Dashborard = () => {
  const { data: users, isLoading: userLoading } = useUserListQuery();
  const { data: orders, isLoading: ordersLoading } = useFetchTotalOrdersQuery();
  const { data: sales, isLoading: salesLoading } =
    useFetchTotalSalesDataQuery();
  const { data: salesDetail } = useFetchTotalSalesByDateDataQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <div className="w-full md:w-4/5 text-white py-5 mx-auto">
      <h4 className="text-base md:text-xl font-semibold ">Admin Dashboard</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 mt-5  md:mt-10 items-center justify-between">
        <div className="bg-[#151515]  text-white p-5 rounded-lg">
          {salesLoading && <Loader />}
          {!salesLoading && (
            <div>
              <span className="w-[30px] md:w-[40px] h-[30px] md:h-[40px] mb-3 md:mb-4 flex text-xs md:text-sm justify-center items-center rounded-full bg-pink-500 text-white">
                $
              </span>
              <span className="text-gray-300 text-xs md:text-sm font-medium">
                Sales
              </span>
              <span className=" text-sm md:text-base font-semibold block">
                ${sales?.sales.toFixed(2)}
              </span>
            </div>
          )}
        </div>
        <div className="bg-[#151515]  text-white p-5 rounded-lg">
          {userLoading && <Loader />}
          {!userLoading && (
            <div>
              <span className="w-[30px] md:w-[40px] h-[30px] md:h-[40px] mb-3 md:mb-4 flex text-xs md:text-sm justify-center items-center rounded-full bg-pink-500 text-white">
                $
              </span>
              <span className="text-gray-300 text-xs md:text-sm font-medium">
                Customers
              </span>
              <span className="text-sm md:text-base font-semibold block">
                <FaUser className="text-sm inline" /> {users?.length}
              </span>
            </div>
          )}
        </div>
        <div className="bg-[#151515] text-white p-5 rounded-lg">
          {userLoading && <Loader />}
          {!userLoading && (
            <div>
              <span className="w-[30px] md:w-[40px] h-[30px] md:h-[40px] mb-3 md:mb-4 flex text-xs md:text-sm justify-center items-center rounded-full bg-pink-500 text-white">
                $
              </span>
              <span className="text-gray-300 text-xs md:text-sm font-medium">
                Orders
              </span>
              <span className="text-sm md:text-base font-semibold block">
                <CiShoppingCart className="text-sm inline" />{" "}
                {orders?.totalOrders}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 w-full flex justify-center">
        <Chart
          options={state.options}
          series={state.series}
          type="bar"
          width="70%"
        />
      </div>
    </div>
  );
};

export default Dashborard;
