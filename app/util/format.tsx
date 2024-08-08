  // replace \n tag with <br /> function
  export const formatDescription = (description: string) => () => {
    return description.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };