import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const AddPrescription = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const {
    appointmentId,
    doctorId,
    patientId,
  } = location.state;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [medicines, setMedicines] = useState([
    {
      medicineName: "",
      dosage: "",
      frequency: "",
      duration: "",
    },
  ]);

  const [notes, setNotes] = useState("");

  const handleMedicineChange = (index, field, value) => {

    const updatedMedicines = [...medicines];

    updatedMedicines[index][field] = value;

    setMedicines(updatedMedicines);
  };

  const addMedicine = () => {

    setMedicines([
      ...medicines,
      {
        medicineName: "",
        dosage: "",
        frequency: "",
        duration: "",
      },
    ]);
  };

  const handleSubmit = async () => {

    try {

      const { data } = await axios.post(
        backendUrl + "/api/prescription/create",
        {
          appointmentId,
          doctorId,
          patientId,
          medicines,
          notes,
        }
      );

      if (data.success) {

        toast.success("Prescription Added");

        navigate("/doctor-appointments");

      } else {

        toast.error(data.message);
      }

    } catch (error) {

      console.log(error);

      toast.error(error.message);
    }
  };

  return (

    <div className="p-5 max-w-3xl mx-auto">

      <h2 className="text-2xl font-bold mb-5">
        Add Prescription
      </h2>

      {medicines.map((medicine, index) => (

        <div
          key={index}
          className="border p-4 mb-4 rounded"
        >

          <input
            type="text"
            placeholder="Medicine Name"
            className="border p-2 w-full mb-2"
            value={medicine.medicineName}
            onChange={(e) =>
              handleMedicineChange(
                index,
                "medicineName",
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Dosage"
            className="border p-2 w-full mb-2"
            value={medicine.dosage}
            onChange={(e) =>
              handleMedicineChange(
                index,
                "dosage",
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Frequency"
            className="border p-2 w-full mb-2"
            value={medicine.frequency}
            onChange={(e) =>
              handleMedicineChange(
                index,
                "frequency",
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Duration"
            className="border p-2 w-full"
            value={medicine.duration}
            onChange={(e) =>
              handleMedicineChange(
                index,
                "duration",
                e.target.value
              )
            }
          />

        </div>

      ))}

      <button
        onClick={addMedicine}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        + Add Medicine
      </button>

      <textarea
        placeholder="Notes"
        className="border p-2 w-full mb-4"
        rows="4"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-5 py-2 rounded"
      >
        Save Prescription
      </button>

    </div>
  );
};

export default AddPrescription;