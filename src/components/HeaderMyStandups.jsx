import React from "react";
import { NavLink } from "react-router-dom";

export default function HeaderMyStandups(props) {
  return (
    <div className="bg-gray-300 px-8 py-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between border-2 items-center">
          <div>
            <span className="text-gray-700 font-medium text-sm">
              Dashboard / Home
            </span>
            <h1 className="pt-4 text-teal-500 font-bold text-3xl">
              My standups
            </h1>
          </div>
          <NavLink
            to="/dashboard/create"
            className="border-2 px-12 py-1 rounded-full border-teal-500 font-medium hover:bg-teal-500 text-teal-500  hover:text-white"
          >
            New Standup
          </NavLink>
          <div className="flex items-center">
            {props.userProfileInfo ? (
              <>
                <img
                  src={props.userProfileInfo.profile.image_72}
                  alt={props.userProfileInfo.name}
                  className="rounded-full"
                  width="48px"
                />
                <span className="leading-5">
                  <h5 className="mx-2">Welcome,</h5>
                  <h5 className="mx-2"> {props.userProfileInfo.real_name}</h5>
                </span>
                <NavLink to="/">
                  <button
                    onClick={() => localStorage.clear()}
                    className="border-2 px-4 py-1 rounded-full border-teal-500 font-medium hover:bg-teal-500 text-teal-500  hover:text-white"
                  >
                    Logout
                  </button>
                </NavLink>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
