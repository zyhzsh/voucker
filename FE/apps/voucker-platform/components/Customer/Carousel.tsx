import React from 'react'

const Carousel = () => {
  return (
    <div className='ml-4 mr-4'>
    <div className="carousel w-full">
      <div id="item1" className="carousel-item w-full h-80 bg-lime-100 flex justify-center items-center rounded-3xl">
          This advertisement place is available.
      </div>
      <div id="item2" className="carousel-item w-full h-80 bg-yellow-200 flex justify-center items-center rounded-3xl">
      This advertisement place is available.
      </div>
      <div id="item3" className="carousel-item w-full h-80 bg-gray-500 flex justify-center items-center rounded-3xl">
      This advertisement place is available.
      </div>
      <div id="item4" className="carousel-item w-full h-80 bg-blue-300 flex justify-center items-center rounded-3xl">
      This advertisement place is available.
      </div>
      </div><div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">1</a>
        <a href="#item2" className="btn btn-xs">2</a>
        <a href="#item3" className="btn btn-xs">3</a>
        <a href="#item4" className="btn btn-xs">4</a>
    </div>
    </div>
  )
}

export default Carousel