import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { BiX } from 'react-icons/bi';

const ListGridInput = ({ layout, setLayout, isDraggable, onLayoutChange, lists, writing_a, writing_b, setLists }) => {
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
      {layout.map(item => {
        const currentItem = lists[0]?.result_location.find(location => location.i === item.i);

        if (!currentItem) {
          return null;
        }

        const result = lists[0]?.result_content.find(content => content.i === currentItem.i);

        return (
          <div key={currentItem.i} className="bg-[#202026] rounded-lg p-5 flex flex-col" data-grid={currentItem}>
            <input
              id={`writing_a_${currentItem.i}`}
              ref={writing_a}
              className="title text-2xl text-white font-bold bg-[#202026]"
              placeholder="타이틀을 적어주세요!"
              defaultValue={result ? result.title : ''}
            />
            <br />
            <textarea
              id={`writing_b_${currentItem.i}`}
              ref={writing_b}
              rows="1"
              className="content text-xl text-white font-bold bg-[#202026] -mt-3 w-full h-full resize-none"
              placeholder="내용을 적어주세요!"
              defaultValue={result ? result.content : ''}
            />
            {/* x 버튼 */}
            <div className="absolute top-0 right-0">
              <button
                className="text-xl text-gray-500 font-bold"
                onClick={() => {
                  const newLayout = layout.filter(layoutItem => layoutItem.i !== currentItem.i);
                  setLayout(newLayout);

                  // 리스트를 제거한 후 defaultValue를 초기화
                  const newLists = [...lists];
                  newLists[0].result_location = newLists[0].result_location.filter(
                    location => location.i !== currentItem.i,
                  );

                  newLists[0].result_content = newLists[0].result_content.filter(
                    content => content.i !== currentItem.i,
                  );

                  setLists(newLists);
                }}
              >
                <BiX className="fill-gray-500 hover:fill-white transition-all" />
              </button>
            </div>
          </div>
        );
      })}
    </ReactGridLayout>
  );
};

export default ListGridInput;
