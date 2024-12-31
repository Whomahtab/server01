import { Search } from "lucide-react";

import React, { useEffect, useState } from "react";
import Loader from "../../components/components/Loader";
import { NavLink, useNavigate } from "react-router-dom";
import APP from "../../../dataCred.js";
import UserCard from "./Users/UserCard";

const All_Users = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState(null);
  const [err, setErr] = useState(true);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const getToken = localStorage.getItem("AppID");

  const handleSearchUser = (e) => {
    setShowSuggestion(true);
    console.log(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${APP && APP.BACKEND_URL}/api/admin/users/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${getToken}`,
              "Content-Type": "application/json",
              Accept: "application/json, application/xml",
              "Accept-Language": "en_US",
            },
          }
        );
        if (!response.ok) {
          setErr(true);
        }

        const data = await response.json();
        setErr(false);
        setUsers(data);
      } catch (error) {
        setErr(true);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {err ? (
        <Loader />
      ) : (
        <>
          <div
            id="userProfile_wrapper "
            className="bg-neutral-50 border p-12  w-1/2 rounded-md mx-auto relative"
          >
            <form
              action=""
              className=" w-full  flex justify-between items-center  gap-2 p-2"
            >
              <input
                type="search"
                name="userSerach"
                id="userSerach"
                className="bg-white rounded-full border w-full py-3 px-6  focus:outline-none focus:border-orange-200 focus:ring-1 focus:ring-sky-50"
                placeholder="Search users.."
                onKeyDown={(e) => handleSearchUser(e)}
              />
              <button className="text-neutral-400">
                <Search className="size-8" />
              </button>
            </form>
            {showSuggestion && showSuggestion ? (
              <div className="bg-white">
                <p>
                  <UserCard />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis fugiat quas obcaecati nam, animi fugit ad unde quia ut
                  hic cupiditate earum assumenda, quaerat beatae.
                </p>
              </div>
            ) : (
              <ul className="flex lg:flex-col gap-3 lg:mt-4">
                {users &&
                  users.map((user) => {
                    return (
                      <li
                        key={user._id}
                        className="bg-neutral-200 rounded-lg p-4 flex w-full  flex-row justify-between items-center"
                      >
                        <div className="flex flex-row">
                          <img
                            src="https://i.pravatar.cc/300"
                            className="size-16 rounded-full"
                          />
                          <div className="profileListTextContent pl-8 content-center	">
                            <h3 className="font-bold">
                              {user?.fullName
                                ? user.fullName
                                : "Not Available."}
                            </h3>
                            <h4 className="text-neutral-600 font-light">
                              {user?.mobileNum
                                ? user.mobileNum
                                : "Not Available."}
                            </h4>
                          </div>
                        </div>

                        <div className="viewMore">
                          <NavLink
                            to={`${APP && APP.APP_URL}/dashboard/user/${
                              user._id
                            }`}
                            className="text-neutral-500"
                          >
                            View More
                          </NavLink>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default All_Users;
