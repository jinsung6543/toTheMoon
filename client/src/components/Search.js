import React, { useState } from 'react';
import { Form, Button, InputGroup, Modal } from 'react-bootstrap';

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/quote/${keyword.toUpperCase()}`);
    }
    setKeyword('');
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <InputGroup className="search-bar search-bar-md">
          <Form.Control
            type="text"
            name="q"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by symbol"
            className="searchInput"
          />
          <InputGroup.Append>
            <Button variant="light" type="submit" className="p-2 search">
              <i className="fas fa-search"></i>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>

      <Button variant="primary" onClick={handleShow} className="search-button">
        <i className="fas fa-search"></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Form onSubmit={submitHandler} style={{ width: '100%' }}>
            <Form.Control
              type="text"
              name="q"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by symbol"
              className="searchInput"
              style={{ display: 'block' }}
            />
          </Form>
        </Modal.Header>
      </Modal>
    </>
  );
};

export default Search;
