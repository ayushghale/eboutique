export default function Images({add_image}) {
  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => (
        <div key={index} 
        className=" w-full  rounded-sm cursor-pointer"
        onClick={()=>add_image('tshirt.jpeg')}>
          <img src="tshirt.jpeg" alt="" className="h-[150px]" />
        </div>
      ))}
    </div>
  );
}
