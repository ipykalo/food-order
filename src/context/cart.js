import React from "react";

const CratContext = React.createContext({
  items: [],
  total: 0,
  onAdd: item => { },
  onRemove: id => { }
});

export default CratContext;