export default function UserDashboard() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);

  // const UserDetails = ({ user }) => {
  //   return (
  //     <div className="">
  //       <p className="capitalize">{user.name}</p>
  //       <p className="text-sm lowercase">{user.email}</p>
  //       <p className="text-sm">{user.phoneNumber}</p>
  //     </div>
  //   );
  // };

  return (
    <>
      <section className=" flex flex-col ">
        <header className=" text-xl  font-bold flot">Manage my account</header>
        <main className="mt-3">
          {/* user  */}
          <section className=" grid grid-cols-3 gap-5">
            {/* personal info */}
            <div className=" col-span-1 bg-whiten flex flex-row py-2 ">
              <div className="flex  flex-col p-3 gap-2">
                <div className=" flex  text-[18px] gap- ">
                  <p className="   font-bold border-r-2 pr-3  border-[#c3c3c3] ">
                    Profile Details
                  </p>
                  <p className="text-primary ml-3">Edit</p>
                </div>
                {/* <UserDetails user={userData} /> */}
              </div>
            </div>

            {/* address info */}
            <div className=" col-span-2 bg-whiten flex flex-row py-2 ">
              <div className="flex w-1/2 flex-col p-3 gap-2">
                <div className=" flex  text-[18px] gap- ">
                  <p className="   font-bold border-r-2 pr-3  border-[#c3c3c3] ">
                    Profile Details
                  </p>
                  <p className="text-primary ml-3">Edit</p>
                </div>
                <div className="">
                  <p className=" uppercase text-gray py-3">
                    DEFAULt DELIVERY ADDRES
                  </p>
                  <p className=" capitalize">ayush gurung </p>
                  <p className=" text-sm">
                    Mustang chok Gandaki Province - Pokhara - Old Airport Area{" "}
                  </p>
                  <p className=" text-sm">(+977) 9819160357</p>
                </div>
              </div>
              <div className="flex w-1/2 flex-col-reverse  border-l-2  pl-5 pb-3 border-[#c3c3c3] ">
                <div className="">
                  <p className=" uppercase text-gray py-3">
                    DEFAULt DELIVERY ADDRES
                  </p>
                  <p className=" capitalize">ayush gurung </p>
                  <p className=" text-sm">
                    Mustang chok Gandaki Province - Pokhara - Old Airport Area{" "}
                  </p>
                  <p className=" text-sm">(+977) 9819160357</p>
                </div>
              </div>
            </div>
          </section>

          {/* recent order */}
          <section className=" mt-5 ">
            <header className=" text-xl  font-bold flot">Recent Orders</header>
            <main className=" ">
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div class="flex flex-col">
                  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full sm:px-6 lg:px-8">
                      <div class="overflow-hidden">
                        <table class="min-w-full text-left text-sm font-light">
                          <thead class="border-b  border-neutral-300 text-base font-medium bg-slate-200 ">
                            <tr>
                              <th scope="col" class="px-6 py-4">
                                Order #
                              </th>
                              <th scope="col" class="px-6 py-4">
                                Date
                              </th>
                              <th scope="col" class="px-6 py-4">
                                item
                              </th>
                              <th scope="col" class="px-6 py-4">
                                Total
                              </th>
                              <th scope="col" class="px-6 py-4">
                                Edit
                              </th>
                            </tr>
                          </thead>
                          <tbody className=" text-base font-medium">
                            <tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 border-neutral-300 ">
                              <td class="whitespace-nowrap px-6 py-4 font-medium">
                                1
                              </td>
                              <td class="whitespace-nowrap px-6 py-4">2024/01/23</td>
                              <td class="whitespace-nowrap px-6 py-4">clothes</td>
                              <td class="whitespace-nowrap px-6 py-4">Rs 500</td>
                              <td class="whitespace-nowrap px-6 py-4">View</td>

                            </tr>
                            <tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 border-neutral-300 ">
                              <td class="whitespace-nowrap px-6 py-4 font-medium">
                                1
                              </td>
                              <td class="whitespace-nowrap px-6 py-4">2024/01/23</td>
                              <td class="whitespace-nowrap px-6 py-4">clothes</td>
                              <td class="whitespace-nowrap px-6 py-4">Rs 500</td>
                              <td class="whitespace-nowrap px-6 py-4">View</td>

                            </tr>
                            <tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 border-neutral-300 ">
                              <td class="whitespace-nowrap px-6 py-4 font-medium">
                                1
                              </td>
                              <td class="whitespace-nowrap px-6 py-4">2024/01/23</td>
                              <td class="whitespace-nowrap px-6 py-4">clothes</td>
                              <td class="whitespace-nowrap px-6 py-4">Rs 500</td>
                              <td class="whitespace-nowrap px-6 py-4">View</td>

                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </section>
        </main>
      </section>
    </>
  );
}
