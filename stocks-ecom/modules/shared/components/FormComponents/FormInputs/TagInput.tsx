import React from 'react';
import '@pathofdev/react-tag-input/build/index.css';
import ReactTagInput from '@pathofdev/react-tag-input';

interface ITagProps{
  value: Array<any>,
  onChange: (string)=>void
}
function TagInput({ value = [], onChange }: ITagProps) {
  return (
    <ReactTagInput
      tags={value}
      removeOnBackspace
      onChange={onChange}
    />
  );
}

export default TagInput;
