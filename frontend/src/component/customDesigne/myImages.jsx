import Image from "./images";
export default function Images() {
    return (
      <div className="">
        <div className=" w-full  h-[40px] flex justify-center items-center bg-red-300  rounded-sm  mb-3 text-white">
          <label htmlFor="image" className=" text-center cursor-pointer">
            Upload Image
          </label>
          <input type="file" id="image" className="hidden" />
        </div>
        <div className="h-[85vh] overflow-auto ">
          <Image />
        </div>
      </div>
    );
  }
  