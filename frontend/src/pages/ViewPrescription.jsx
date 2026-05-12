import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ViewPrescription = () => {

  const { backendUrl } = useContext(AppContext);

  const location = useLocation();

  const { appointmentId } = location.state;

  const [prescription, setPrescription] = useState(null);

  const fetchPrescription = async () => {

    try {

      const { data } = await axios.get(
        backendUrl +
        `/api/prescription/appointment/${appointmentId}`
      );

      if (data.success) {
        setPrescription(data.prescription);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPrescription();
  }, []);

  return (

    <div className="p-5">

      <h2 className="text-2xl font-bold mb-4">
        Prescription
      </h2>

      {prescription?.medicines?.map((medicine, index) => (

        <div
          key={index}
          className="border p-3 mb-3 rounded"
        >

          <p>
            <strong>Medicine:</strong>{" "}
            {medicine.medicineName}
          </p>

          <p>
            <strong>Dosage:</strong>{" "}
            {medicine.dosage}
          </p>

          <p>
            <strong>Frequency:</strong>{" "}
            {medicine.frequency}
          </p>

          <p>
            <strong>Duration:</strong>{" "}
            {medicine.duration}
          </p>

        </div>

      ))}

      <div className="mt-4">

        <strong>Notes:</strong>

        <p>{prescription?.notes}</p>

      </div>

    </div>
  );
};

export default ViewPrescription;