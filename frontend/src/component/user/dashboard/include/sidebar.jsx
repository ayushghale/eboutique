export default function Sidebar() {
  return (
    <div className="flex  flex-col gap-3  ">
      {/* user setting */}
      <div className=" ">
        <a href="/user/dashboard" className=" font-bold text-lg text-primary ">
          Manage my account
        </a>
        <nav className="ml-4 flex flex-col gap-2 mt-2  font-bold">
          <li>
            <a href="/user/profile" className=" text-gray">
              Profile
            </a>
          </li>
          <li>
            <a href="/user/address" className=" text-gray">
              Address Booking
            </a>
          </li>
          <li>
            <a href="/user/dashboard" className=" text-gray">
              Payment option
            </a>
          </li>
        </nav>
      </div>
      {/* uer order setting */}
      <div className=" ">
        <a href="/user/orderHistory" className=" font-bold text-lg text-black capitalize ">
          My Orders
        </a>
        <nav className="ml-4 flex flex-col gap-2 mt-2  font-bold">
          <li>
            <a href="/user/dashboard" className=" text-gray">
              Return Order
            </a>
          </li>
          <li>
            <a href="/user/dashboard/profile" className=" text-gray">
              Cancelled Order
            </a>
          </li>
        </nav>
      </div>
      {/* user review */}
      <div className=" ">
        <a href="/user/Review" className=" font-bold text-lg text-black capitalize ">
          My Reviews
        </a>
      </div>
      {/*  */}
      <div className=" ">
        <a href="##" className=" font-bold text-lg text-black capitalize ">
          My wishlist
        </a>
      </div>
    </div>
  );
}
