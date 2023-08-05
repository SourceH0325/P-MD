import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { BiX } from 'react-icons/bi';

const ListGridInput = ({ layout, setLayout, isDraggable, onLayoutChange, writing_a, writing_b }) => {

  return (
    <ReactGridLayout
      className="layout select-none"
      layout={layout}
      cols={5}
      onLayoutChange={onLayoutChange}
      containerPadding={[0, 10]}
      isDraggable={isDraggable}
      isResizable={isDraggable}
      rowHeight={30}
      width={1140}
    >
      {layout.map(item => (
        <div key={item.i} className="bg-[#202026] rounded-lg p-5 flex flex-col">
          <input
            id={`writing_a_${item.i}`}
            ref={writing_a}
            className="title text-2xl text-white font-bold bg-[#202026]"
            placeholder="타이틀을 적어주세요!"
          />
          <br />
          <textarea
            id={`writing_b_${item.i}`}
            ref={writing_b}
            rows="1"
            className="content text-xl text-white font-bold bg-[#202026] -mt-3 w-full h-full resize-none"
            placeholder="내용을 적어주세요!"
          />
          {/* x 버튼 */}
          <div className="absolute top-0 right-0">
            <button
              className="text-xl text-gray-500 font-bold"
              onClick={() => {
                const newLayout = layout.filter(i => i.i !== item.i);
                setLayout(newLayout);
              }}
            >
              <BiX className="fill-gray-500 hover:fill-white transition-all" />
            </button>
          </div>
        </div>
      ))}
    </ReactGridLayout>
  );
};

export default ListGridInput;
