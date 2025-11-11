import styles from './Progressbar.module.css'

interface ProgressProps {
    progress: number;
    total: number;
    segmented: boolean;
}

const ProgressBar = ({ progress, total, segmented }: ProgressProps) => {
    const percentage = total === 0 ? 0 : (progress / total) * 100;
    const segmentItems = () => {
       let segmentNumber = Math.round(percentage / 10);
       if (segmentNumber === 0 && progress > 0) {
           segmentNumber = 1;
       }
       return segmentNumber;
    }
    const segments = segmentItems();
    return (
        <div className={styles.progressBar}>
            {segmented ?
                Array.from({ length: segments }, (_, index) => 
                    index === 9 ? (
                        <div key={index} style={{marginRight: '0px' }} className={`${styles.progress} ${styles.segmented}`} />
                    ) :
                    (
                    <div key={index} className={`${styles.progress} ${styles.segmented}`} />
                ))
                : (
                    <div style={{ width: `${percentage}%` }} className={styles.progress} />
                )}
        </div>
    );
}

export default ProgressBar;