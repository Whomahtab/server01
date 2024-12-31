import React from "react";

const UserCard = ({ id }) => {
  return (
    <div>
      <li
        key={id}
        className="bg-neutral-200 rounded-lg p-4 flex w-full  flex-row justify-between items-center"
      >
        <div className="flex flex-row">
          <img
            src="https://i.pravatar.cc/300"
            className="size-16 rounded-full"
          />
          <div className="profileListTextContent pl-8 content-center	">
            <h3 className="font-bold">
              {/* {user?.fullName ? user.fullName : "Not Available."} */}
              John Doe
            </h3>
            <h4 className="text-neutral-600 font-light">
              {/* {user?.mobileNum ? user.mobileNum : "Not Available."} */}
              hh
            </h4>
          </div>
        </div>

        <div className="viewMore">
          <a
            to={`${APP && APP.APP_URL}/dashboard/user/${user._id}`}
            className="text-neutral-500"
          >
            View More
          </a>
        </div>
      </li>
    </div>
  );
};

export default UserCard;
