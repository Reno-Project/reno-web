import React, { forwardRef } from 'react';

const Link = ({ element, children, ...attributes }, ref) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <a href={element.url} {...attributes} ref={ref}>
      {children}
    </a>
  );
};

export default forwardRef(Link);
