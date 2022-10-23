import React from 'react';
import Divided from './common/Divided';

const CommentOverviewDetail = () => {
  return (
    <div className="px-10 pt-4 flex flex-col gap-4">
      <h1 className="text-center text-4xl font-mono font-bold">Comment...</h1>
      <div className="flex justify-center">
        <Divided />
      </div>
    </div>
  );
};

export default CommentOverviewDetail;
