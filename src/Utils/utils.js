import { toast } from "react-toastify";
export const getBooking = () => {
  const bookingList = localStorage.getItem("bookingList");
  if (bookingList) {
    return JSON.parse(bookingList);
  }
  return [];
};

export const addBooking = (doctor) => {
  if (doctor) {
    const doctorList = getBooking();
    const isBooked = doctorList.find(
      (thisDoctor) =>
        doctor.registrationNumber === thisDoctor.registrationNumber
    );
    if (isBooked) {
      toast.error("Doctor Appointment is Already Booked", {
        position: "bottom-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (!isBooked) {
      doctorList.push(doctor);
      localStorage.setItem("bookingList", JSON.stringify(doctorList));
      toast.success("Doctor Appointment is Booked", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return [];
};

export const removeBooking = (registrationNumber) => {
  const doctorList = getBooking();
  const remainingDoctorList = doctorList.filter(
    (thisDoctor) => thisDoctor.registrationNumber !== registrationNumber
  );
  localStorage.setItem("bookingList", JSON.stringify(remainingDoctorList));
};
