"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Appointment } from "@/types/appwrite.types";
import { AppointmentCard } from "@/components/AppointmentCard";
import {
  getAppointmentList,
  updateUserAppointment,
} from "@/lib/actions/appointment.actions";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const UserDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const params = useParams();
  useEffect(() => {
    // Fetch appointments from the server or any other source
    const fetchAppointments = async () => {
      // Simulating an API call
      const fetchedAppointments = await getAppointmentList(
        params.userId as string,
      );
      console.log(fetchedAppointments[0].$id);
      setAppointments(fetchedAppointments);
    };

    fetchAppointments();
    console.log(appointments);
  }, []);
  const handleSaveAppointment = async (updatedAppointment: Appointment) => {
    try {
      const updatedData = await updateUserAppointment({
        documentId: appointments[0].$id,
        appointmentId: updatedAppointment.appointmentId,
        userId: params.userId as string,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        appointment: updatedAppointment,
        type: "schedule",
      });

      if (updatedData) {
        setAppointments(
          appointments.map((apt) =>
            apt.appointmentId === updatedData.id ? updatedData : apt,
          ),
        );
      }
    } catch (error) {
      console.error("Failed to update the appointment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-row items-center gap-3 py-1 my-1 md:text-2xl font-medium">
          <Image
            src="/assets/icons/BookMyDoc_Icon.png"
            height={20}
            width={50}
            alt="patient"
            className="cursor-pointer"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="py-1 my-1 font-semibold cursor-pointer">
            <Link href="/">
              Book <span className="text-blue-500">MyDoc</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between mb-8 mt-3">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-blue-500" />
            <h1 className=" md:text-3xl font-bold">My Appointments</h1>
          </div>
          <Link href={`/patients/${params.userId}/new-appointment`}>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              New Appointment
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.userId}
              appointment={appointment}
              onSave={handleSaveAppointment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
