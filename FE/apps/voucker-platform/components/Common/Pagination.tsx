import React from 'react'

const Pagination = () => {
  return (
    <div className="btn-group w-full flex justify-center mb-10">
      <button className="btn">1</button>
      <button className="btn">2</button>
      <button className="btn btn-disabled">...</button>
      <button className="btn">99</button>
      <button className="btn">100</button>
</div>
  )
}

export default Pagination