export default function category() {
  return (
    <section className=" bg-white flex flex-col  justify-center  ">
      <div className="self-center   w-full max-w-[1224px] items-stretch justify-between gap-5  max-md:max-w-full max-md:flex-wrap">
        <div className=" flex flex-col md:flex-row  gap-4 h-[500px]">
          <div className=" w-full md:w-3/5 flex flex-row-reverse bg-[#b1b1b1] border-non rounded-xl">
            <div className=" flex flex-col flec w-2/4 justify-center">
              <p className=" uppercase text-gray">casual collection</p>
              <h1 className=" capitalize text-7xl font-bold">
                street <br /> wear.
              </h1>
              <p className=" text-gray pt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                nec massa a sapien condimentum lacinia.
              </p>
              <button className="  text-black  py-3 px-8 mt-4 capitalize hover:text-white">
                explor more
              </button>
            </div>
          </div>
          <div className="w-full md:w-2/5">
            <div className="h-full flex gap-3 flex-col ">
              <div className="w-full h-2/4 bg-[#b1b1b1] border-non rounded-xl flex justify-center flex-col pl-12">
                <p className=" uppercase text-gray">casual collection</p>
                <h1 className="capitalize text-[36px] font-extrabold ">
                  street wear.
                </h1>

                <a
                  className=" text-black capitalize hover:text-white"
                  href="##"
                >
                  Explor more
                </a>
              </div>
              <div className="w-full h-2/4 bg-[#b1b1b1] border-non rounded-xl flex justify-center flex-col pl-12">
                <p className=" uppercase text-gray">casual collection</p>
                <h1 className="capitalize text-[36px] font-extrabold ">
                  street wear.
                </h1>

                <a
                  className="  text-black   capitalize hover:text-white"
                  href="##"
                >
                  Explor more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
