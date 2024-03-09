import React, { useState, useEffect } from "react";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import swal from "sweetalert";
import axios from "axios";
// import { FaEdit } from "react-icons/fa";

const booking = ({ handleEdit, booking }) => {
  const [isEditing, setIsEditing] = useState(0);
  const [editedbooking, setEditedbooking] = useState(booking);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedbooking({ ...editedbooking, [name]: value });
  };

  const saveChanges = () => {
    console.log("Saving changes:", editedbooking);
    setIsEditing(false);
    handleEdit(editedbooking);
  };

  // console.log(editedbooking);
  const handleSubmit = async () => {
    const data = await axios.put(
      `https://hotel-management-hjzi.onrender.com/bookings/edit/${booking._id}`,
      editedbooking
    );
    // console.log(data)
  };

  useEffect(() => {
    if (isEditing === 2) {
      swal({
        title: "Are you sure?",
        text: "Your Data And price will get   Updated ",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          try {
            handleSubmit();
            swal("Your Data has been Updated ", {
              icon: "success",
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          swal("Your imaginary file is safe!");
        }
        saveChanges();
      });
      setIsEditing(0); // Reset isEditing after confirmation
    }
  }, [isEditing]);

  return (
    <div className="booking relative flex  justify-between px-[20px] py-[10px] bg-inputColor rounded-[8px] border-solid border-[1px] border-[#D7D9DD] after:content[''] after:absolute after:h-2/3 after:w-[2px] after:bg-mainColor after:top-1/2 after:left-2 after:translate-y-[-50%] text-center">
      <div className="number w-[16.667%]">
        <button
          className="bg-[#008000] text-white font-bold py-1 px-2 rounded"
          onClick={() => {
            swal({
              title: `Pay this amount : ${editedbooking.totalPrice}`,
              icon: "info",
              buttons: true,
            }).then((willDelete) => {
              if (willDelete) {
                swal({
                  title: `Amount paid ${editedbooking.totalPrice}`,
                  icon: "success",
                  // buttons: true,
                });
              } else {
                swal({
                  title: `Didnt pay ${editedbooking.totalPrice}`,
                  icon: "error",
                  // buttons: true,
                });
              }
              saveChanges();
            });
          }}
        >
          CheckOut
        </button>
      </div>

      <div className="number w-[16.667%]">{booking.roomNumber}</div>
      <div className="type overflow-hidden w-[16.667%]">
        {booking.roomType}
        {/* {isEditing ? (
          <input
            type="text"
            name="type"
            onChange={(e) =>
              setEditedbooking({ ...editedbooking, type: e.target.value })
            }
            value={editedbooking.type}
            // onChange={handleInputChange}
          />
        ) : (
          
        )} */}
      </div>

      {/* <div className="in-service w-[16.667%] toBeHidden">
        {booking.inService ? "Yes" : "No"}
      </div>
      <div className="cleaned w-[16.667%] toBeHidden">
        {booking.cleaned ? "Yes" : "No"}
      </div> */}
      <div className="available-on text-center w-[16.667%] max-[720px]:text-[12px]">
        {isEditing ? (
          <input
            type="datetime-local"
            name="availableOn"
            className=""
            onChange={(e) =>
              setEditedbooking({
                ...editedbooking,
                startTime: e.target.value,
              })
            }
            value={editedbooking.startTime}
            // onChange={handleInputChange}
          />
        ) : (
          <p className="text-black">
            {new Date(booking.endTime).toDateString()}
          </p>
        )}
      </div>
      <div className="available-on text-center w-[16.667%] max-[720px]:text-[12px]">
        {isEditing ? (
          <input
            type="datetime-local"
            name="endTime"
            className=""
            onChange={(e) =>
              setEditedbooking({
                ...editedbooking,
                endTime: e.target.value,
              })
            }
            value={editedbooking.endTime}
            // onChange={handleInputChange}
          />
        ) : (
          // <p className="text-black">{new Date(booking.endTime).toDateString()}</p>
          <p className="text-black">
            {new Date(booking.startTime).toDateString()}
          </p>
        )}
      </div>
      <button
        title="Edit"
        className="edit-button bg-blue-500 text-white px-2 py-1 rounded flex  justify-center w-[16.667%]"
        onClick={() => {
          setIsEditing(isEditing + 1);
        }}
      >
        {/* {<AiOutlineEdit style={{ color: "black" }} />} */}
        {isEditing ? (
          <AiOutlineSave style={{ color: "black" }} />
        ) : (
          <AiOutlineEdit style={{ color: "black" }} />
        )}
      </button>
    </div>
  );
};

export default booking;
