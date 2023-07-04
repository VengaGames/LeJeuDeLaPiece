function FlecheRetour(socket, username, room) {

  const leaveRoom = () => {
    console.log("Je quitte")
    socket.emit('leave_room', {username, room})
  }

    return (
      <div className="w-fit absolute left-2 top-20" onClick={leaveRoom}>
        <a className="" href="/">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 20 20"
            aria-hidden="true"
            className="text-white transition min-w-[32px] min-h-[32px] ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    );
  }
  
  export default FlecheRetour;