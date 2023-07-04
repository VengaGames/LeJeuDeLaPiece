import vengaicon from "../assets/vengaicon.jpeg";

function Banner({ room }) {
  return (
    <div>
      <nav className="p-3 border-gray-700 bg-[#242531]">
        <div className="container flex flex-wrap items-center justify-center mx-auto">
          <div className="flex flex-row justify-center items-center">
            <img
              src={vengaicon}
              className="h-6 mr-3 sm:h-10"
              alt="Venga Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              VengaGAMES
            </span>
            {room !== "" ? (
              <h1 className="bg-[#FDFDFD] rounded-3xl text-center flex flex-row justify-center items-center ml-3 p-1 font-semibold">
                Room : {room}
              </h1>
            ) : null}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Banner;
