import Image from "next/image";
import Link from "next/link";

import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container pt-0 max-w-[496px]">
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

          <PatientForm />

          <div className="text-14-regular mt-12 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 BookMyDoc
            </p>
            <Link href="/?admin=true" className="text-blue-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img-6.jpg"
        height={700}
        width={700}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Home;
