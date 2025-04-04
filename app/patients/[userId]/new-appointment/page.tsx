import Image from "next/image";
import Link from "next/link";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <div className=" flex flex-row items-center gap-3 py-1 my-1 text-2xl font-medium ">
            <Image
              src="/assets/icons/BookMyDoc_Icon.png"
              height={20}
              width={60}
              alt="patient"
              className=" cursor-pointer"
              style={{ objectPosition: "center 40%" }}
            />
            <div className=" py-4 my-4 text-2xl font-semibold cursor-pointer">
              <Link href="/">
                Book <span className=" text-blue-500">MyDoc</span>
              </Link>
            </div>
          </div>

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;
