import { useEffect, useState } from 'react';
import { categoryService, type Category, classService, type Class } from '../services/api';
import { useLanguage } from '../LanguageContext';
import styles from './FilterBar.module.css';
const FilterBar = () => {
    const { setCategoryFilter, setClassFilter } = useLanguage();
    const [categories, setCategories] = useState<Category[]>([]);
    const [classes, setClasses] = useState<Class[]>([]);
    const [currentCategory, setCurrentCategory] = useState<string>('');
    const [currentClass, setCurrentClass] = useState<string>('');
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await categoryService.getAllCategories();
                setCategories(categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        const fetchClasses = async () => {
            try {
                const classes = await classService.getAllClasses();
                setClasses(classes);
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
            setCurrentCategory('');
            setCategoryFilter(null);
            return;
        }
        setCurrentCategory(cat.name);
        setCategoryFilter(cat);
    }

    const filterOnClass = (className: string) => {
        const classFilter = classes.find(c => c.name === className);
        if (!classFilter) {
            setCurrentClass('');
            setClassFilter(null);
            return;
        }
        setCurrentClass(classFilter.name);
        setClassFilter(classFilter);
    }

    const clearFilters = () => {
        filterOnCategory("");
        filterOnClass("");
    }

    return (
        <div className={styles.filterBar}>
            <div className={styles.filterDropdown}>
                <select
                    className={styles.hiddenInput}
                    onChange={(e) => filterOnCategory(e.target.value)}
                    name="category" id="category" value={currentCategory || ''}>
                    {categories?.map((category) => (
                        <option key={category._id} className={styles.option} value={category.name}>{category.name}</option>
                    ))}
                </select>
                <select
                    className={styles.hiddenInput}
                    onChange={(e) => filterOnClass(e.target.value)}
                    name="classes" id="classes" value={currentClass || ''}>
                    {classes?.map((singleClass) => (
                        <option key={singleClass._id} className={styles.option} value={singleClass.name}>{singleClass.name}</option>
                    ))}
                </select>
                <button onClick={() => clearFilters()}>Clear Filter</button>
            </div>
        </div>

    )
};
export default FilterBar;