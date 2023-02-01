import React from "react";
import CustomPrimaryButton from "components/CustomPrimaryButton";
import AddFriendDialog from "./AddFriendDialog";

const additionalStyles = {
  marginTop: "10px",
  marginLeft: "5px",
  width: "80%",
  height: "30px",
  background: "#3ba55d",
};

const AddFriendButton = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);  
  
 

  return (
    <>
      <CustomPrimaryButton
        additionalStyles={additionalStyles}
        label="Add Friend"
        onClick={() => setIsDialogOpen(true)}
      />
      <AddFriendDialog
        isDialogOpen={isDialogOpen}
        closeDialogHandler={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default AddFriendButton;
