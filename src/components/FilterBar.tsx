import { useEffect, useState } from 'react';
import { categoryService, type Category } from '../services/api';
import { useLanguage } from '../LanguageContext';
import styles from './FilterBar.module.css';
const FilterBar = () => {
    const { setFilters } = useLanguage();
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentCategory, setCurrentCategory] = useState<string>('');
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await categoryService.getAllCategories();
                setCategories(categories);

            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const filterOnCategory = (category: string) => {
        const cat = categories.find(c => c.name === category);
        if (!cat) {
            setCurrentCategory('');
            setFilters(null);
            return;
        }
        setCurrentCategory(cat.name);
        setFilters(cat);
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
                        <button onClick={() => filterOnCategory('')}>Clear Filter</button>
                    </div>
        </div>


    )
};
export default FilterBar;