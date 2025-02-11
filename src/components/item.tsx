import clsx from 'clsx';
import { useState } from 'react';
import { useUpdateItemMutation } from '../store';

type ItemProps = {
  item: Item;
};

const Item = ({ item }: ItemProps) => {
  const [editing, setEditing] = useState(false);
  const [updateItem, result] = useUpdateItemMutation();
  if (item.name === 'Sweatshirt') {
    console.log({result})
    console.log({ item })
  }
  return (
    <li className="flex items-center gap-2">
      <input
        type="checkbox"
        className="focus:bg-red-500"
        checked={item.packed}
        id={`toggle-${item.id}`}
        onChange={() => {
          updateItem({ ...item, packed: !item.packed });
        }}
      />
      <label
        htmlFor={`toggle-${item.id}`}
        className={clsx({ hidden: editing })}
      >
        {item.name}
      </label>
      <input
        value={item.name}
        id={`edit-${item.id}`}
        className={clsx('py-0 text-sm', { hidden: !editing })}
        onChange={(e) => {
          updateItem({ ...item, name: e.currentTarget.value });
        }}
      />
      <div className="flex gap-2">
        <button
          className="px-2 py-0 text-xs"
          aria-label={`Edit "${item.name}"`}
          onClick={() => {
            setEditing(!editing);
          }}
        >
          {editing ? '💾 Save' : '✍️ Edit'}
        </button>
        <button
          className="px-2 py-0 text-xs"
          aria-label={`Remove "${item.name}"`}
          onClick={() => {}}
        >
          🗑 Remove
        </button>
      </div>
    </li>
  );
};

export default Item;
