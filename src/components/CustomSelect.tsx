import { useState, useRef, useEffect } from "react";
import Arrow from "../assets/arrow_forward.svg?react"
import styles from "./CustomSelect.module.css"

export interface SelectOption {
    value: string;
    label: string;
}

type size = "small" | "medium" | "large";

export interface CustomSelectProps {
    options: SelectOption[];
    placeHolder?: string;
    outline?: boolean;
    size?: size;
}

export interface MultiSelectProps extends CustomSelectProps {
    multiSelect: true;
    value: string[];
    onChange: (value: SelectOption[]) => void;
}

export interface SingleSelectProps extends CustomSelectProps {
    multiSelect?: false;
    value: string | null;
    onChange: (value: SelectOption) => void;
}

const CustomSelect = ({
    options,
    value,
    onChange,
    placeHolder = "Select an option",
    multiSelect = false,
    outline = false,
    size = "medium"
    // TODO: search prop, disabled prop, sort prop, theme prop, subtitle prop
}: MultiSelectProps | SingleSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeOptions, setActiveOptions] = useState<SelectOption[]>([]);
    const sortedOptions = multiSelect ? [
        ...options.filter(opt => activeOptions.includes(opt)),
        ...options.filter(opt => !activeOptions.includes(opt))
    ] : [...options.filter(opt => !activeOptions.includes(opt))];
    const containerRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        if (!value) {
            setActiveOptions([]);
        } else if (Array.isArray(value)) {
            const values = options.filter(opt => value.includes(opt.value));
            setActiveOptions(values)
        } else {
            const active = options.filter(opt => opt.value === value);
            setActiveOptions(active);
        }
    }, [value, options])

    // TODO: Accessibility: Handle keyboard events

    function handleSelect(optionValue: SelectOption) {
        if (activeOptions.find((active) => active.value === optionValue.value)) {
            const selectedValues = activeOptions.filter(active => active.value !== optionValue.value); 
            setActiveOptions(selectedValues); 
            (onChange as (value: SelectOption[]) => void)(selectedValues);
        } else if (multiSelect) {
            const selectedValues = [...activeOptions, optionValue];
            setActiveOptions(selectedValues);
            (onChange as (value: SelectOption[]) => void)(selectedValues);
        } else {
            setActiveOptions([optionValue]);
            setIsOpen(false);
            (onChange as (value: SelectOption) => void)(optionValue);
        }
    }

    function placeHolderText() {
        if (multiSelect && activeOptions.length > 1) {
            return `${activeOptions[activeOptions.length - 1].label} + ${activeOptions.length - 1}`;
        } else if (activeOptions.length === 1) {
            return activeOptions[0].label;
        }
        return placeHolder;
    }

    return (
        <div className={`${styles.customSelectContainer} ${size !== "medium" ? (size === "small" ? styles.small : styles.large) : ""}`} ref={containerRef}>
            <button
                type="button"
                className={`${styles.customSelectButton} ${outline ? styles.outlined : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}>
                <span>{placeHolderText()}</span>
                <Arrow className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`} />
            </button>
            {isOpen && (
                <div 
                    className={`${styles.dropDownList} ${outline ? styles.outlined : ""}`}
                    role="listbox"
                >
                    {sortedOptions.map((option) => (
                        <label
                            key={option.value}
                            className={styles.option}
                            role="option"
                            aria-selected={activeOptions.find((active) => active.value === option.value) ? true : false}
                        >
                            {multiSelect ? (
                                <input
                                    type="checkbox"
                                    className={styles.checkBox}
                                    value={option.value}
                                    checked={!!activeOptions.find((active) => active.value === option.value)}
                                    onChange={() => handleSelect(option)}
                                />
                            ) : (
                                <input
                                    type="radio"
                                    name="single-select"
                                    className={styles.radio}
                                    checked={value === option.value}
                                    onChange={() => handleSelect(option)}
                                />

                            )}
                            {option.label}
                        </label>
                    )

                    )}
                </div>
            )}
        </div>
    )
}

export default CustomSelect;