import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const BookingForm = () => {
  const { register, handleSubmit, reset } = useForm();
  // const [file1Uploaded, setFile1Uploaded] = useState(false);
  // const [file2Uploaded, setFile2Uploaded] = useState(false);
  const date = new Date();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [roomType, setRoomType] = useState("A");
  const [price, setPrice] = useState(0);
  const [email, setEmail] = useState("");
  const [roomNumber, setRoomNumber] = useState(0);

  // const onSubmit = (data) => {
  //   alert("Booked succesfully");
  //   reset();
  // };

  const getPrice = (room) => {
    if (room === "A") {
      return 100;
    } else if (room === "B") {
      return 80;
    } else if (room === "C") {
      return 50;
    } else {
      return 0;
    }
  };

  const onSubmit = async () => {
    const data = {
      userEmail: email,
      roomNumber: roomNumber,
      roomType: roomType,
      startTime: fromDate + "Z",
      endTime: toDate + "Z",
    };
    // const data = {
    //   userEmail: "use222r@example.com",
    //   roomNumber: "101",
    //   startTime: "2024-04-07T11:00:00.000Z",
    //   endTime: "2024-05-07T12:00:00.000Z",
    //   roomType: "A",
    // };
    // console.log(data);
    await axios
      .post("http://localhost:8000/bookings/book", data)
      .then((response) => {
        console.log("Booking Successful:", response.data);
        alert("Booking successful");
        // reset();
        // Handle success, e.g., show a success message to the user
      })
      .catch((error) => {
        alert("Please Change the Date Room Alrwady Booked Or Room not exist  Choosed Room number from 1 to 100");
        console.error("Error:", error);
        // Handle error, e.g., show an error message to the user
      });
    // try {
    //   // Make the POST request to your backend endpoint
    //   const response = await axios.post(
    //     "localhost:8000/bookings/book",
    //     data
    //   );
    //   // Handle success response
    //   if (response.status === 200) {
    //     alert("Booking successful");
    //     reset(); // Reset the form after successful submission
    //   }
    // } catch (error) {
    //   // Handle errors
    //   console.error("Error submitting booking:", error);
    //   alert("Failed to book. Please try again later.");
    // }
  };

  useEffect(() => {
    // console.log(toDate, fromDate);
    const toDateObj = new Date(toDate);
    const fromDateObj = new Date(fromDate);

    // console.log(toDateObj.getTime(), fromDateObj.getTime());

    if (isNaN(toDateObj.getTime()) || isNaN(fromDateObj.getTime())) {
      setPrice(0);
      return;
    }

    // Calculate the time difference in milliseconds
    const timeDifference = toDateObj.getTime() - fromDateObj.getTime();

    // Convert milliseconds to hours
    const totalHours = timeDifference / (1000 * 60 * 60);

    var price = totalHours * getPrice(roomType);

    console.log(price);

    setPrice(price);
  }, [fromDate, toDate, roomType]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action=""
      className="flex flex-col justify-center items-center rounded-[10px] py-10 px-5 bg-white"
    >
      <div className="inputs flex flex-wrap justify-center items-center gap-5">
        <div className="booking-input w-[200px] flex flex-col gap-[10px] justify-center items-start">
          <label htmlFor="email">Email</label>
          <input
            // {...register("first name")}
            id="email"
            type="text"
            placeholder="Enter Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="booking-input w-[200px] flex flex-col gap-[10px] justify-center items-start">
          <label htmlFor="roomNumber">Room Number</label>
          <input
            id="roomNumber"
            type="number"
            placeholder="Enter Room Number"
            onChange={(e) => {
              setRoomNumber(e.target.value);
            }}
          />
        </div>
        {/* <div className="booking-input w-[200px] flex flex-col gap-[10px] justify-center items-start">
          <label htmlFor="phone">Phone Number</label>
          <input
            {...register("phone number")}
            id="phone"
            type="tel"
            placeholder="Enter Phone Number"
          />
        </div> */}
        {/* <div className="booking-input w-[200px] flex flex-col gap-[10px] justify-center items-start relative">
          <label htmlFor="idCard">ID Card</label>
          <label
            htmlFor="idCard"
            className=" photoUpload flex items-center justify-center bg-inputColor px-[50px] py-[10px] border-mainColor border-[1.5px] border-solid rounded-[5px] text-mainColor font-medium active:translate-y-[2px] "
          >
            <i className="bi bi-upload mr-[10px]"></i>Upload
          </label>
          <input
            id="idCard"
            type="file"
            onChange={() => setFile1Uploaded(!file1Uploaded)}
            style={{ display: "none" }}
          />
          {file1Uploaded && (
            <p className="flex gap-1 absolute content-[''] bottom-[-25px] left-0 text-[#999] text-[15px]">
              <i className="bi bi-check text-[#1DDB82] "></i>file uploaded
              succesfully
            </p>
          )}
        </div>
        <div className="booking-input w-[200px] flex flex-col gap-[10px] justify-center items-start relative">
          <label htmlFor="familyNote">Family Note Book</label>
          <label
            htmlFor="familyNote"
            className=" photoUpload flex items-center justify-center bg-inputColor px-[50px] py-[10px] border-mainColor border-[1.5px] border-solid rounded-[5px] text-mainColor font-medium active:translate-y-[2px] "
          >
            <i className="bi bi-upload mr-[10px]"></i>Upload
          </label>
          <input
            id="familyNote"
            type="file"
            className=""
            onChange={() => setFile2Uploaded(!file2Uploaded)}
            style={{ display: "none" }}
          />
          {file2Uploaded && (
            <p className="flex gap-1 absolute content-[''] bottom-[-25px] left-0 text-[#999] text-[15px]">
              <i className="bi bi-check text-[#1DDB82]"></i>file uploaded
              succesfully
            </p>
          )}
        </div> */}

        <div className="booking-input w-[200px] flex flex-col gap-[10px] justify-center items-start">
          <label htmlFor="roomType"> Room Type</label>
          <select
            name="roomType"
            id="roomType"
            className="bg-inputColor px-[15px] py-[10px] pr-[50px]"
            onChange={(e) => setRoomType(e.target.value)}
            value={roomType}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        <div className="booking-input w-[200px] flex flex-col gap-[10px] justify-center items-start mx-8">
          <label htmlFor="from">From</label>
          <input
            type="datetime-local"
            name="from"
            id="from"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="booking-input w-[200px] flex flex-col gap-[10px] justify-center items-start">
          <label htmlFor="to">To</label>
          <input
            type="datetime-local"
            name="to"
            id="to"
            value={toDate}
            min={fromDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>
      <div className="price w-full flex justify-start gap-2">
        <span className="font-bold">Total: </span> {price}
      </div>
      <button
        type="submit"
        className="booking-btn bg-gradient-to-r from-[#608AF5] to-[#1E5EFF] text-white py-[10px] w-[200px] rounded-[10px]"
      >
        Book
      </button>
    </form>
  );
};

export default BookingForm;
