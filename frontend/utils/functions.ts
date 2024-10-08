/* eslint-disable no-restricted-syntax */
import { jwtDecode } from "jwt-decode";
import { NavigateFunction } from "react-router-dom";
import { Role } from "./constant";
import { TimeStamps } from "./types";

// sets data to local storage
export const setDataToLocalStorage = (key: string, data: string) => {
  return localStorage.setItem(key, data);
};

// gets data from local storage
export const getDataFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

// removes data from local storage
export const removeDataFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

// clears data from local storage
export const clearDataFromLocalStorage = () => {
  localStorage.clear();
};

// returns time between input date and current time
export function fromNow(input: Date) {
  const date = input instanceof Date ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat("en");
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;

  let key: keyof TimeStamps;

  for (key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(Math.round(delta), key);
    }
  }
  return "";
}

export const isAuthenticated = () => {
  const userToken = getDataFromLocalStorage("access_token");

  if (userToken) return true;
  return false;
};

export const getRole = () => {
  const role = getDataFromLocalStorage("role");
  if (role == null) return Role.IDEATION;
  return role;
};

export const setTimerForTokenExpiration = (
  navigate: NavigateFunction,
  onLogoutHandler: () => void
) => {
  const accessToken = getDataFromLocalStorage("access_token");

  // Check if access token exists in local storage
  if (accessToken) {
    // Set timer for access token expiration
    const decodedToken = jwtDecode<any>(accessToken);
    const currentTime = Date.now() / 1000;
    const timeToExpire = decodedToken.exp - currentTime;

    setTimeout(async () => {
      // Access token has expired, log out user
      onLogoutHandler();
      clearDataFromLocalStorage();

      navigate("/home");
    }, timeToExpire * 1000);
  }
};
