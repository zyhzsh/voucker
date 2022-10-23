import { useEffect, useState } from 'react';

interface Option {
  id: number;
  name: string;
}

interface TabsProps {
  tabs: Option[];
  selectedTab: Option;
  onSelect: (tab: Option) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, selectedTab, onSelect }) => {
  const [selected, setSelected] = useState({ id: 20, name: 'Activitity' });

  return (
    <div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => {
                onSelect(tab);
              }}
              className={`${
                tab.name.toLowerCase() === selectedTab.name.toLowerCase()
                  ? 'bg-teal-700 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }
                px-3 py-2 font-medium text-sm rounded-md`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
export default Tabs;
// className={classNames(
//   tab.name.toLocaleLowerCase() ===
//     selectedTab.name.toLocaleLowerCase()
//     ? 'bg-teal-700 text-white'
//     : 'text-gray-500 hover:text-gray-700',
//   'px-3 py-2 font-medium text-sm rounded-md'
// )}
