import "./SearchBox.scss";
import { useEffect, useState } from "react";
import useDebounce from "./debounce";

import { Form, FormControl } from "react-bootstrap";

function SearchBox({ setValue }) {
  return (
    <div className="SearchBox">
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          onChange={(e) => setValue(e)}
        />
      </Form>
    </div>
  );
}

export default SearchBox;
