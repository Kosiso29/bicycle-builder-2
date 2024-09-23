import { useState } from 'react';
import { CancelOutlined } from '@mui/icons-material';

export default function MultipleInput({ title, name, buttonText, initialItems }: { title: string, name: string, buttonText: any, initialItems: string[] }) {
    const [items, setItems] = useState<string[]>(initialItems || []);
    const [inputValue, setInputValue] = useState('');

    const addItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            setItems((prevItems) => [...prevItems, inputValue]);
            setInputValue('');
        }
    };

    const removeItem = (index: number) => {
        setItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    return (
        <div className="rounded-md mb-4">
            <div className="">
                <label htmlFor={name} className="mb-2 block text-sm font-medium">
                    {title}
                </label>
                <div className="flex items-center w-full">
                    <input
                        id={name}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Add brand"
                        className="p-2 border border-gray-200 rounded-l w-full text-sm focus:outline-none"
                    />
                    <input
                        type="hidden"
                        name={name}
                        value={JSON.stringify(items)}
                    />
                    <button
                        onClick={addItem}
                        className="px-4 py-2 bg-primary text-white text-sm rounded-r hover:bg-primary-hover focus:outline-none"
                    >
                        {buttonText}
                    </button>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                    {items.map((item, index) => (
                        <li key={index} className="inline-flex gap-2 w-fit items-center justify-between p-2 bg-gray-300 rounded">
                            <span>{item}</span>
                            <button
                                type="button"
                                onClick={() => removeItem(index)}
                                className="hover:text-red-700 focus:outline-none"
                            >
                                <CancelOutlined fontSize='small' />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
