import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../LanguageContext";
import styles from "./CustomSelect.module.css"

export interface SelectOption {
    value: string;
    label: string;
}

export interface CustomSelectProps {
    options: SelectOption[];
    value: string | null;
    onChange: (value: string) => void;
    placeHolder?: string;
}

const CustomSelect = ({
    options,
    value,
    onChange,
    placeHolder = "Select an option"
}: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const selectedOption = options.find(opt => opt.value === value);
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }

    }, [isOpen]);

    // TODO: Handle keyboard events

    function handleSelect(optionValue: string) {
        onChange(optionValue);
        setIsOpen(false);
    }

    return (
        <div className={styles.customSelectContainer} ref={containerRef}>
            <button
                type="button"
                className={styles.customSelectButton}
                onClick={() => setIsOpen(!isOpen)}
                disabled={false}
                aria-haspopup="listbox"
                aria-expanded={isOpen}>
                <span>{selectedOption ? selectedOption.label : placeHolder}</span>
            </button>
            {isOpen && (
                <ul className={styles.dropDownList}>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={styles.option}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>

    )
}

export default CustomSelect;