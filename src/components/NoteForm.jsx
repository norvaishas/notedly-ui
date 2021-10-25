import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
  height: 90%;
`;

const Form = styled.form`
  height: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 90%;
`;

const NoteForm = props => {

  // set default form state
  const [value, setValue] = useState({ content: props.content || ''}); // just object in state

  // form state update
  const onChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Wrapper>
      <h3>Just write it here:</h3>
      <Form
        onSubmit={e => {
          e.preventDefault();
          props.action({
            variables: {
              ...value
            }
          });
        }}
      >
        <TextArea
          required
          type="text"
          name="content"
          placeholder="Note content"
          value={value.content}
          onChange={onChange}
        />
        <Button type="submit">Save</Button>
      </Form>
    </Wrapper>
  )
};

export default NoteForm;
