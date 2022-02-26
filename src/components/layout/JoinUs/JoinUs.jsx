import React from 'react';
import './JoinUs.scss';

function HelpSlice() {
  return (
    <div className="join_us">
      <div className="join_us__title">Do you Want to be part of this?</div>
      <div className="join_us__description">
        Write something and send it to us, we will be glad to share your
        knowledge and make this community bigger every day.
      </div>
      <a href="mailto:medeseeds@gmail.com" className="join_us__learn_btn">
        Mail Us
      </a>
    </div>
  );
}

export default HelpSlice;
