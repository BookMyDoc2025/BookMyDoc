import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import Link from "next/link";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
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

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
