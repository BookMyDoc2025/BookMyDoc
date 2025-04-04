import React, { useState } from "react";

import { Calendar, Clock, Edit2 } from "lucide-react";

import { Appointment } from "@/types/appwrite.types";

interface AppointmentCardProps {
  appointment: Appointment;
  onSave: (updatedAppointment: Appointment) => void;
}

export function AppointmentCard({ appointment, onSave }: AppointmentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAppointment, setEditedAppointment] = useState(appointment);

  const handleSave = () => {
    onSave(editedAppointment);
    setIsEditing(false);
  };

  const statusColors = {
    pending: "bg-blue-500",
    scheduled: "bg-green-500",
    cancelled: "bg-red-500",
  };

  if (isEditing) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg space-y-4">
        <div className="flex justify-between items-center">
          <input
            type="text"
            aria-label="Appointment Title"
            value={editedAppointment.reason}
            onChange={(e) =>
              setEditedAppointment({
                ...editedAppointment,
                reason: e.target.value,
              })
            }
            className="bg-gray-700 text-white px-3 py-2 rounded-md w-full"
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <input
              type="date"
              aria-label="Appointment Date"
              value={
                new Date(editedAppointment.schedule).toISOString().split("T")[0]
              }
              onChange={(e) =>
                setEditedAppointment({
                  ...editedAppointment,
                  schedule: new Date(e.target.value),
                })
              }
              className="bg-gray-700 text-white px-3 py-2 rounded-md"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <input
              type="time"
              aria-label="Appointment Time"
              value={
                editedAppointment.$updatedAt
                  .toString()
                  .split("T")[1]
                  .split(".")[0]
              }
              onChange={(e) =>
                setEditedAppointment({
                  ...editedAppointment,
                  $updatedAt: new Date(
                    `${editedAppointment.schedule.toISOString().split("T")[0]}T${e.target.value}`
                  ).toISOString(),
                })
              }
              className="bg-gray-700 text-white px-3 py-2 rounded-md"
            />
          </div>
          <textarea
            aria-label="Appointment Note"
            value={editedAppointment.note}
            onChange={(e) =>
              setEditedAppointment({
                ...editedAppointment,
                note: e.target.value,
              })
            }
            className="bg-gray-700 text-white px-3 py-2 rounded-md w-full"
            rows={3}
          />
          <select
            aria-label="Appointment Status"
            value={editedAppointment.status}
            onChange={(e) =>
              setEditedAppointment({
                ...editedAppointment,
                status: e.target.value as Appointment["status"],
              })
            }
            className="bg-gray-700 text-white px-3 py-2 rounded-md w-full"
          >
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">
          {appointment.reason}
        </h3>
        <button
          aria-label="Edit Appointment"
          onClick={() => setIsEditing(true)}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <Edit2 className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300">
            {new Date(appointment.schedule).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300">{appointment.$updatedAt}</span>
        </div>
        <p className="text-gray-400">{appointment.note}</p>
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-sm ${statusColors[appointment.status] || "bg-gray-500"} text-white`}
          >
            {appointment.status.charAt(0).toUpperCase() +
              appointment.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
