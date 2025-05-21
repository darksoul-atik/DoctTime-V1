import React, { useEffect, useState } from "react";
import { getBooking, removeBooking } from "../../Utils/utils";
import "../../App.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
  CartesianGrid,
} from "recharts";
import EmptyBooking from "../../UI/EmptyBooking";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bookings = () => {
  // Recharts Section
  const [tickAngle, setTickAngle] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setTickAngle(window.innerWidth < 600 ? -45 : 0);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const getPath = (x, y, width, height) =>
    `M${x},${y + height}
       C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
      x + width / 2
    }, ${y}
       C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
      y + height
    } ${x + width}, ${y + height}
       Z`;
  const colors = [
    "#007bff",
    "#f9a825",
    "#00c853",
    "#00bcd4",
    "#ff7043",
    "#e91e63",
  ];
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="font-pj"
          style={{
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px 14px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            fontSize: "14px",
            color: "#333",
          }}
        >
          <p style={{ margin: 0, fontWeight: 1000 }}>{label}</p>
          <p style={{ margin: 0 }}>Fee: ৳ {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  //Bookings Section

  const [bookedList, setBookedList] = useState([]);

  useEffect(() => {
    const bookedData = getBooking();
    setBookedList(bookedData);
  }, []);

  const handleRemoveBooking = (registrationNumber) => {
    removeBooking(registrationNumber);
    setBookedList(getBooking());
  };

  const handleToastRemove = () => {
    toast.error("Doctor Appointment is Removed", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  if (bookedList.length < 1) {
    return <EmptyBooking></EmptyBooking>;
  }

  return (
    <div className="font-pj max-sm:pb-10 md:mb-20 md:pb-10 lg:mb-15 border-0">
      {/* Chart Section */}
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={bookedList}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              interval={0}
              angle={tickAngle}
              textAnchor="end"
              tick={{ fontSize: 10 }}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="fee" shape={<TriangleBar />}>
              {bookedList.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Appointment Section */}
      <div>
        {/* Appointment Header */}
        <div className="flex mb-6  flex-col gap-3">
          <h1 className="font-extrabold text-center lg:text-3xl md:text-xl max-sm:text-lg">
            My Today's Appointments
          </h1>

          <p className="text-gray-500 max-sm:text-xs text-center">
            Our platform connects you with verified, experienced doctors across
            various specialties — all at your convenience.
          </p>
        </div>

        {/* Appointment Container */}
        <div className="flex gap-4  flex-col">
          {bookedList.map((list, index) => (
            <div key={index}>
              {/* Main Container */}
              <div className="bg-white hover:bg-gray-200 p-5 rounded-2xl w-full">
                <div className="flex justify-between items-center max-sm:flex-col max-sm:items-center max-sm:justify-center">
                  <div className="max-sm:text-center">
                    <h1 className="font-bold">{list.name}</h1>
                    <p className="text-gray-500 font-medium mb-1 text-xs">
                      {list.education}-{list.speciality}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 font-medium text-sm max-sm:text-xs">
                      Appointment Fee: {list.fee} + VAT
                    </p>
                  </div>
                </div>

                <hr className="border-dashed text-gray-200" />

                <div className="flex mt-4 justify-center items-center">
                  <button
                    onClick={() => {
                      handleRemoveBooking(list.registrationNumber);
                      handleToastRemove();
                    }}
                    className="max-sm:text-xs md:text-sm w-full btn rounded-2xl lg:text-sm text-[#FF0000] border-[#FF0000] bg-white"
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
