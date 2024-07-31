import io from "socket.io-client";
import axioKit from "./axioKit";
import locations from "./locations";
import handlePagination from "./pagination";
import fullName from "./fullName";
import calculateDiff from "./calculateDiff";
import Male from "../../assets/male.jpg";
import Female from "../../assets/female.jpg";
import isJpegOrJpgFile from "./isJpegOrJpgFile";
import fullAddress from "./fullAddress";
import bulkPayload from "./bulkPayload";
import globalSearch from "./globalSearch";
import useCountdown from "./useCountdown";

// const ENDPOINT = window.location.origin;
const ENDPOINT = "http://localhost:5000/";
const socket = io.connect(ENDPOINT);

const PresetImage = gender => {
  if (gender) return Male;

  return Female;
};

export {
  PresetImage,
  ENDPOINT,
  axioKit,
  socket,
  locations,
  handlePagination,
  fullName,
  calculateDiff,
  isJpegOrJpgFile,
  fullAddress,
  bulkPayload,
  globalSearch,
  useCountdown,
};
