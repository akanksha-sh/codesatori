import React from "react";

const UserContext = React.createContext({
  userId: 0,
  isTeacher: false,
});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

export default UserContext;
