import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  return (
    <>
      <section className=" flex flex-col ">
        <header className=" text-xl  font-bold flot">My Profile</header>
        <main className="mt-3">
          <section className=" w-full h-[500px]">
            <div className="  bg-[#f5f5f5]  p-2  ">
              <div className=" flex  text-[18px] gap- ">
                <p className="   font-bold border-r-2 pr-3  border-[#c3c3c3] ">
                  Profile Details
                </p>
                <p className="text-primary ml-3">Edit</p>
              </div>
              <div class="grid grid-cols-3 gap-4 pb-4"  >
                <div className="col-span-2">
                  <div className="grid grid-cols-2 p-3 gap-2">
                    <div className="flex gap-1 flex-col ">
                      <p className="text-lg font-semibold">Name:</p>
                      <p className="text-md">Ayush Gurung</p>
                    </div>
                    <div className="flex gap-1 flex-col ">
                      <p className="text-lg font-semibold">Email:</p>
                      <p className="text-md">ayush@gmail.com</p>
                    </div>
                    <div className="flex gap-1 flex-col ">
                      <p className="text-lg font-semibold">Phone:</p>
                      <p className="text-md">(+977) 9819160357</p>
                    </div>
                    <div className="flex gap-1 flex-col ">
                      <p className="text-lg font-semibold">Address:</p>
                      <p className="text-md">
                        Gandaki Province,Pokhara,Old Airport Area,Mustang chok
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 p-3 gap-6">
                    <button className=" bg-primary rounded-md">
                      <p className="my-2 font-bold text-white">Edit</p>
                    </button>
                    <button className="bg-primary rounded-md">
                      <p className="my-2 font-bold text-white">Change Password</p>
                    </button>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="w-full h-full overflow-auto flex justify-center items-center bg-slate-100 ">
                    <div className=" bg-white p-5">
                      <FontAwesomeIcon
                        icon={faUser}
                        className=" text-9xl  bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </section>
    </>
  );
}
