import React from "react";

import CoockiesPop from "./CoockiesPop/CoockiesPop";
import ThanksSignup from "./ThanksSignup/ThanksSignup";
import AuthPop from "./AuthPop/AuthPop";

function AllPopups() {
  return (
    <div>
      <CoockiesPop />
      <ThanksSignup />
      <AuthPop />
    </div>
  );
}

export default AllPopups;
