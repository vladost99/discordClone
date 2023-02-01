import React from "react";
import CustomPrimaryButton from "components/CustomPrimaryButton";
import RedirectInfo from "components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () =>
  "Enter correct e-mail address and password should contains 6 and 12 characters";
const getFormValidMessage = () => "Press to log in!";

const Footer = ({ handleLogin, isFormValid, statusLoading }) => {
  const navigate = useNavigate();

  const handlePushToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CustomPrimaryButton
            label="Login"
            statusLoading={statusLoading}
            additionalStyles={{ marginTop: "30px", with: "200px" }}
            disabled={!isFormValid}
            onClick={handleLogin}
          />
        </div>
      </Tooltip>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <RedirectInfo
          text="Need an account?"
          redirectText="Create and account"
          additionalStyles={{ marginTop: "5px" }}
          redirectHandler={handlePushToRegisterPage}
        />
      </div>
    </div>
  );
};

export default Footer;
