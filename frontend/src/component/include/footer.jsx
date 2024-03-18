import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function footer() {
  return (
    <footer className=" bg-white flex flex-col  py-[50px]  justify-center ">
      <div className="self-center  flex flex-col w-full 2xl:max-w-[1224px]  justify-between gap-5  ">
        <div className="self-center text-[#F7F7F7]  flex flex-col w-full max-w-[1224px] md:flex-row gap-5">
          <div className=" w-full md:w-[70%] bg-[#ea580c] p-10 rounded-xl  flex flex-col justify-between ">
            <div className=" text-2xl">
              <p>Before you go, check out this link</p>
            </div>
            <div className=" flex justify-between">
              <div className="">
                <h3 className=" capitalize">company</h3>
                <ul className=" text-[#898989] capitalize">
                  <li>About</li>
                  <li>Contact</li>
                  <li>Blog</li>
                </ul>
              </div>
              <div className="">
                <h3 className=" capitalize">Legal</h3>
                <ul className=" text-[#898989] capitalize">
                  <li>Private policy</li>
                  <li>Refund policy</li>
                  <li>Community rules</li>
                </ul>
              </div>
              <div className="">
                <h3 className=" capitalize">job</h3>
                <ul className=" text-[#898989] capitalize">
                  <li>join the collective</li>
                  <li>suggestion</li>
                  <li>Blog</li>
                </ul>
              </div>
            </div>
          </div>
          <div className=" w-full md:w-[30%] flex flex-col gap-3">
            <div className=" bg-[#171717] rounded-xl p-9">
              <h3 className=" capitalize text-white text-2xl">
                let work togeter
              </h3>
              <ul className=" text-[#898989] capitalize pt-7">
                <li>About</li>
                <li>Contact</li>
                <li>Blog</li>
              </ul>
            </div> 
            <div className=" flex justify-between  ">
              <div className=" group/Twiter bg-[#171717] p-6 md:p-9 rounded-xl ">
                <FontAwesomeIcon
                  icon={faXTwitter}
                  className=" text-3xl text-white"
                />
                  <span className="hidden bg-slate-500 group-hover/Twiter:block absolute  p-2 rounded-md mt-2 ml-10 ">Twiter</span>
              </div>
              <div className="group/facebook bg-[#171717] p-6 md:p-9 rounded-xl">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className=" text-3xl text-white"
                />
                <span className="hidden bg-slate-500 group-hover/facebook:block absolute  p-2 rounded-md mt-2 ml-10 ">Linkedin</span>
              </div>
              <div className="group/instagram bg-[#171717] p-6 md:p-9 rounded-xl">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className=" text-3xl text-white"
                />
                <span className="hidden bg-slate-500 group-hover/instagram:block absolute  p-2 rounded-md mt-2 ml-10 ">instagram</span>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex justify-center">
          <p className="">E-Boutique © 2024. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
