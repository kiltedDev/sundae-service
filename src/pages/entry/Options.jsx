import React from "react";
import axios from "axios";
import { Row } from "react-bootstrap";
import ScoopOption from "./ScoopOption";

export const Options = ({ optionType }) => {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  }, [optionType]);
  const ItemComponent = optionType === "scoops" ? ScoopOption : null;
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));
  return <Row>{optionItems}</Row>;
};

export default Options;
