interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
}

export const SearchBox = ({ value, onChange }: SearchBoxProps) => {
    return (
        <input
            type="text"
            value={value}
            placeholder="Search..."
            onChange={e => onChange(e.target.value)}
        />
    );
};