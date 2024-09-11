import { TimerOutlined } from "@mui/icons-material";

export default function SelectField({ name, defaultValue, label, placeholder, placeholderDisabled = true, value, onChange, children }: { name: string, defaultValue?: string, label?: string, placeholder?: string, placeholderDisabled?: boolean, value?: string, onChange?: any, children: React.ReactNode }) {
    return (
        <div className={`mb-4 w-full`}>
            <div className="mb-2 flex items-center justify-between text-sm font-medium">
                {
                    label &&
                    <label htmlFor={`${name}`}>
                        {label}
                    </label>
                }
            </div>
            <div className="relative">
                <select
                    id={`${name}`}
                    name={`${name}`}
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    aria-describedby={`${name}-error`}
                >
                    {
                        placeholder &&
                        <option value="" disabled={placeholderDisabled}>
                            {placeholder}
                        </option>
                    }
                    { children }
                </select>
                <TimerOutlined className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
        </div>
    )
}