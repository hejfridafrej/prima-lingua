import { useEffect, useState } from 'react';
import { categoryService, type Category, classService, type Class } from '../services/api';
import { useLanguage } from '../LanguageContext';
import { useMediaQuery } from '../hooks/useMediaQuery';
import CustomSelect from './CustomSelect';
import type { SelectOption } from './CustomSelect';
import Close from "../assets/close.svg?react"
import styles from './FilterBar.module.css';

const FilterBar = () => {
    const { filterState, setCategoryFilter, clearCategoryFilter, setClassFilter, clearClassFilter } = useLanguage();
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
    const selectedCategoryValues = filterState.categories.map(c => c.name);
    const [classes, setClasses] = useState<Class[]>([]);
    const [classOptions, setClassOptions] = useState<SelectOption[]>([]);
    const selectedClassValues = filterState.classes.map(c => c.name);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const selectSize = isMobile ? 'small' : 'medium';

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const foundCategories = await categoryService.getAllCategories();
                setCategories(foundCategories);
                if (foundCategories.length) {
                    const mappedCategoryOptions = foundCategories.map((category) => ({
                        value: category.name,
                        label: category.name
                    })).sort((a, b) => a.label.localeCompare(b.label));
                    setCategoryOptions(mappedCategoryOptions)
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        const fetchClasses = async () => {
            try {
                const foundClasses = await classService.getAllClasses();
                setClasses(foundClasses);
                if (foundClasses.length) {
                    const mappedClassOptions = foundClasses.map((singleClass) => ({
                        value: singleClass.name,
                        label: singleClass.name
                    })).sort((a, b) => a.label.localeCompare(b.label));
                    setClassOptions(mappedClassOptions)
                }
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchCategories();
        fetchClasses();
    }, []);

    const filterOnCategory = (selectedCategories: SelectOption[]) => {
        const categoryArray: Category[] = categories.filter(category => {
            const categoryMatch = selectedCategories.some(cat => cat.label === category.name);
            return categoryMatch;
        })
        setCategoryFilter(categoryArray);
    }

    const filterOnClass = (selectedClasses: SelectOption[]) => {
        const classArray: Class[] = classes.filter(classItem => {
            const classMatch = selectedClasses.some(cl => cl.label === classItem.name);
            return classMatch;
        })
        setClassFilter(classArray);
    }

    const clearFilters = () => {
        clearCategoryFilter();
        clearClassFilter();
    }

    return (
        <div className={styles.filterBar}>
            <CustomSelect
                options={categoryOptions}
                value={selectedCategoryValues}
                onChange={filterOnCategory}
                placeHolder={"Category"}
                multiSelect
                size={selectSize}
            />
            <CustomSelect
                options={classOptions}
                value={selectedClassValues}
                onChange={filterOnClass}
                placeHolder={"Class"}
                multiSelect
                size={selectSize}
            />
            <button className={styles.clearButton} onClick={() => clearFilters()}><Close /></button> {/* TODO: Add icon button */}
        </div>
    )
};
export default FilterBar;