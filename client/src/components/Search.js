import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/quote/${keyword.toUpperCase()}`);
    }
    setKeyword('');
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search by symbol"
        className="searchInput"
      ></Form.Control>
      <Button type="submit" className="p-2 search" variant="success">
        <i class="fas fa-search"></i>
      </Button>
    </Form>
  );
};

export default Search;
