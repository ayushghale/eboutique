export default function Address() {

  return (
    <>
      <section className=" flex flex-col ">
        <header className=" text-xl  font-bold flot">Manage my Address</header>
        <main className="mt-3">
          <section
            className=" w-full h-[500px] overflow-auto "
            style={{
              scrollbarWidth: "thin", 
              scrollbarColor: "#888 transparent", 
              MsOverflowStyle: "none", 
              scrollbarTrackColor: "#f1f1f1", 
              scrollbarFaceColor: "#888", 
            }}
          >
            {/* address info */}
            <div className="  bg-whiten  p-2  ">
              <div class="grid grid-cols-2 gap-4">
                {/* user address data */}
                <div className=" border border-warning p-2 flex gap-1 flex-col">
                    <div className=" capitalize flex justify-between">
                      ayush gurung
                      <button type="button" className="pl-3 text-primary">
                        EDIT
                      </button>
                    </div>
                    <div className="">(+977) 9819160357</div>
                    <div className="">
                      Gandaki Province,Pokhara,Old Airport Area,Mustang chok
                    </div>
                    <div></div>
                    <div className="flex gap-3">
                      <small className=" bg-primary py-1 px-2 text-white rounded-md">
                        Home
                      </small>
                      <small className="bg-primary py-1 px-2 text-white rounded-md">
                        DEFAULT DELIVERY ADDRESS
                      </small>
                      <small className="bg-primary py-1 px-2 text-white rounded-md">
                        DEFAULT BILLING ADDRESS
                      </small>
                    </div>
                  </div>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                  <div className=" border border-warning p-2 flex gap-1 flex-col">
                    <div className=" capitalize flex justify-between">
                      ayush gurung
                      <button type="button" className="pl-3 text-primary">
                        EDIT
                      </button>
                    </div>
                    <div className="">(+977) 9819160357</div>
                    <div className="">
                      Gandaki Province,Pokhara,Old Airport Area,Mustang chok
                    </div>
                    <div></div>
                    <div className="flex gap-3">
                      <small className=" bg-primary py-1 px-2 text-white rounded-md">
                        Home
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </section>
    </>
  );
}
