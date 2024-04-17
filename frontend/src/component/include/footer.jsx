import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faInstagram,
  faLinkedinIn,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

export default function footer() {
  return (
    <footer className=" bg-white flex flex-col  py-[50px]  justify-center ">
      <div className="self-center  flex flex-col w-full 2xl:max-w-[1224px]  justify-between gap-5  ">
        <div className="self-center text-[#F7F7F7]  flex flex-col w-full max-w-[1224px] md:flex-row gap-5">
          <div className=" w-full md:w-[70%] bg-primary p-10 rounded-xl  flex flex-col justify-between ">
            <div className=" text-2xl">
              <p>Before you go, check out this link</p>
            </div>
            <div className=" flex justify-between">
              <div className="">
                <h3 className=" capitalize font-semibold text-xl">company</h3>
                <ul className=" text-[#898989] capitalize pl-2">
                  <li>
                    <a href="##" className="text-white hover:text-primary">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="##" className="text-white hover:text-primary">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="##" className="text-white hover:text-primary">
                      Support
                    </a>
                  </li>
                </ul>
              </div>
              <div className="">
                <h3 className=" capitalize font-semibold text-xl">Legal</h3>
                <ul className=" text-[#ffffff] capitalize pl-2 ">
                  <li>
                    <a href="##" className="text-white hover:text-primary">
                      Terms of service
                    </a>
                  </li>
                  <li>
                    <a href="##" className="text-white hover:text-primary">
                      Privacy policy
                    </a>
                  </li>
                  <li>
                    <a href="##" className="text-white hover:text-primary">
                      Refund policy
                    </a>
                  </li>
                </ul>
              </div>
              <div className="">
                <h3 className=" capitalize font-semibold text-xl">Social</h3>
                <ul className=" text-[#ffffff] capitalize pl-2 ">
                  <li>
                    <a href="##" className="text-white hover:text-primary">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="##" className="text-white hover:text-primary">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="##" className="text-white hover:text-primary">
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className=" w-full md:w-[30%] flex flex-col gap-3">
            <div className=" bg-primary rounded-xl p-9">
              <h3 className=" capitalize text-white text-2xl">
                Subscribe to our newsletter
              </h3>
              <ul className=" capitalize pt-7 text-black">
                <li>
                  <input
                    type="text"
                    placeholder="Your email"
                    className="w-full p-2 rounded-md capitalize"
                  />
                </li>
              </ul>
            </div>
            <div className=" grid grid-cols-4 gap-2 ">
              <div className=" group/Twiter bg-primary flex justify-center flex-col rounded-xl aspect-square">
                <FontAwesomeIcon
                  icon={faXTwitter}
                  className=" text-3xl text-white"
                />
                <span className="hidden bg-slate-500 group-hover/Twiter:block absolute  p-2 rounded-md mt-20 ml-15 ">
                  Twiter
                </span>
              </div>
              <div className="group/facebook bg-primary flex justify-center flex-col rounded-xl aspect-square">
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className=" text-3xl text-white"
                />
                <span className="hidden bg-slate-500 group-hover/facebook:block absolute  p-2 rounded-md mt-20 ml-15 ">
                  Linkedin
                </span>
              </div>
              <div className="group/instagram bg-primary flex justify-center flex-col rounded-xl aspect-square">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className=" text-3xl text-white"
                />
                <span className="hidden bg-slate-500 group-hover/instagram:block absolute  p-2 rounded-md mt-20 ml-15 ">
                  Instagram
                </span>
              </div>
              <div className="group/instagram bg-primary flex justify-center flex-col rounded-xl aspect-square">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className=" text-3xl text-white"
                />
                <span className="hidden bg-black group-hover/instagram:block absolute  p-2 rounded-md mt-20 ml-15 ">
                  Facebook
                </span>
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
