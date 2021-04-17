import Card from '@material-ui/core/Card';
import React from 'react';

const PrintJSON = ({ obj, display }: {obj: object, display ?: boolean}) => {
  let printObj = 'Invalid Object';
  try {
    printObj = obj && JSON.stringify(obj, null, 4);
    // console.log(obj);
  } catch (e) {
    // do nothing
  }
  return (
    <Card style={{ maxHeight: 500, overflow: 'auto', margin: 20 }}>
      <pre>
        {display ? printObj : null}
      </pre>
    </Card>
  );
};

PrintJSON.defaultProps = { display: true };

export default PrintJSON;
