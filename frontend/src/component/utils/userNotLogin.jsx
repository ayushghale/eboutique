export function IsUserLogedIn() {
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
        return true;
    
    } else {
        return false;
    }
}

export function UserNotLogin() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white p-5 rounded-md w-[250px]">
        <div className="text-center">Please login First</div>
        <button className="wi">
            <a href="/login"> Login</a>
        </button>
      </div>
    </div>
  );
}
