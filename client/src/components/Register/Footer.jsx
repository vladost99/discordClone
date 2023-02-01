import React from "react";
import CustomPrimaryButton from "components/CustomPrimaryButton";
import RedirectInfo from "components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () =>
  "Username should contains between 3 and 12 characters and password should contains between 6 and 12 characters. Also correct e-mail address should provided";
const getFormValidMessage = () => "Press to register!";

const Footer = ({ handleRegister, isFormValid, statusLoading }) => {
  const navigate = useNavigate();

  const handlePushToLoginPage = () => {
    navigate("/login");
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
            label="Register"
            additionalStyles={{ marginTop: "30px", with: "200px" }}
            disabled={!isFormValid}
            onClick={handleRegister}
            statusLoading={statusLoading}
          />
        </div>
      </Tooltip>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <RedirectInfo
          text=""
          redirectText="Already have an account?"
          additionalStyles={{ marginTop: "5px" }}
          redirectHandler={handlePushToLoginPage}
        />
      </div>
    </div>
  );
};

export default Footer;
