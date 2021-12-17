import React from "react";

const CratContext = React.createContext({
  items: [],
  total: 0,
  addItem: item => { },
  removeItem: id => { }
});

export default CratContext;