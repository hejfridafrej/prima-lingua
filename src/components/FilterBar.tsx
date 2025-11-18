import { useEffect, useState } from 'react';
import { categoryService, type Category, classService, type Class } from '../services/api';
import { useLanguage } from '../LanguageContext';
import CustomSelect from './CustomSelect';
import styles from './FilterBar.module.css';

export interface SelectOption {
    value: string;
    label: string;
}
const FilterBar = () => {
    const { setCategoryFilter, setClassFilter } = useLanguage();
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
    const [currentCategory, setCurrentCategory] = useState<string | null>(null);
    const [classes, setClasses] = useState<Class[]>([]);
    const [classOptions, setClassOptions] = useState<SelectOption[]>([]);
    const [currentClass, setCurrentClass] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const foundCategories = await categoryService.getAllCategories();
                setCategories(foundCategories);
                if (foundCategories.length) {
                    const categoryOptions = foundCategories.map((category) => ({
                        value: category.name,
                        label: category.name
                    }));
                    setCategoryOptions(categoryOptions)
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
                    const classOptions = foundClasses.map((singleClass) => ({
                        value: singleClass.name,
                        label: singleClass.name
                    }));
                    setClassOptions(classOptions)
                }
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchCategories();
        fetchClasses();
    }, []);


    const filterOnCategory = (category: string) => {
        const cat = categories.find(c => c.name === category);
        if (!cat) {
            setCategoryFilter(null);
            return;
        }
        setCategoryFilter(cat);
        setCurrentCategory(cat.name);
    }

    const filterOnClass = (className: string) => {
        const classFilter = classes.find(c => c.name === className);
        if (!classFilter) {
            setClassFilter(null);
            return;
        }
        setClassFilter(classFilter);
        setCurrentClass(classFilter.name);
    }

    const clearFilters = () => {
        setCategoryFilter(null);
        setCurrentCategory('');
        setClassFilter(null);
        setCurrentClass('');
    }

    return (
        <div className={styles.filterBar}>
            <CustomSelect
                options={categoryOptions}
                value={currentCategory}
                onChange={filterOnCategory}
                placeHolder={"Select category"}
            />
            <CustomSelect
                options={classOptions}
                value={currentClass}
                onChange={filterOnClass}
                placeHolder={"Select class"}
            />
            <button onClick={() => clearFilters()}>Clear Filter</button>
        </div>
    )
};
export default FilterBar;