import login from "./login";
import validateRefresh from "./validateRefresh";
import destroy from "./destroy";
import update from "./update";
import save from "./save";
import universal from "./universal";
import changePassword from "./changePassword";
import upload from "./upload";
import forgotPassword from "./forgotPassword";
import verification from "./verification";

const axioKit = {
  upload,
  login,
  validateRefresh,
  destroy,
  update,
  save,
  universal,
  changePassword,
  forgotPassword,
  verification,
};

export default axioKit;
