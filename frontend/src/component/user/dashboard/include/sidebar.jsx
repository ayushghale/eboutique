import { useLocation } from "react-router-dom";

export default function Sidebar() {
   const router = useLocation();
  return (
    <div className="flex  flex-col gap-3  ">
      {/* user setting */}
      <div className=" ">
        <a href="/user/dashboard" className={router.pathname==='/user/dashboard' ? 'font-bold text-primary text-lg ': 'font-bold text-lg'}>
          Manage my account
        </a>
        <nav className="ml-4 flex flex-col gap-2 mt-2  font-bold">
          <li>
            <a href="/user/profile"  className={router.pathname==='/user/profile' ? 'font-bold text-primary':"  text-gray  "}>
              Profile
            </a>
          </li>
          <li>
            <a href="/user/address"  className={router.pathname==='/user/address' ? 'font-bold text-primary':"  text-gray *:  "}>
              Address Booking
            </a>
          </li>
          
        </nav>
      </div>
      {/* uer order setting */}
      <div className=" ">
        <a href="/user/orderHistory" className={router.pathname==='/user/orderHistory' ? 'font-bold text-primary text-lg ': 'font-bold text-lg'}>
          My order
        </a>
      </div>
      {/* user review */}
      <div className=" ">
        <a href="/user/Review" className={router.pathname==='/user/Review' ? 'font-bold text-primary text-lg ': 'font-bold text-lg'}>
          My Reviews
        </a>
      </div>
      {/*  */}
      <div className=" ">
        <a href="/user/wishlist" className={router.pathname==='/user/wishlist' ? 'font-bold text-primary text-lg ': 'font-bold text-lg'}>
          My wishlist
        </a>
      </div>
    </div>
  );
}
