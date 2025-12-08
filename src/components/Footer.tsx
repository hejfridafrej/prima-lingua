import GithubIcon from '../assets/github-icon.svg?react'
import LinkedinIcon from '../assets/linkedin-icon.svg?react'
import styles from './Footer.module.css'

const VERSION = import.meta.env.VITE_APP_VERSION;
const Footer = ({ }) => {
    const linkData = [
        {
            name: "Github",
            link: "https://github.com/hejfridafrej/prima-lingua",
            Icon: <GithubIcon />
        }, {
            name: "Linkedin",
            link: "https://www.linkedin.com/in/frida-m-jonsson/",
            Icon: <LinkedinIcon />
        }
    ]
    return (
        <div className={styles.footer}>

            <div className={styles.leftSection}>
            </div>
            <div className={styles.centerSection}>
                <div className={styles.linkContainer}>
                {linkData.map((linkObject) =>
                    <a  key={linkObject.name} href={linkObject.link} target="_blank">
                        <div className={styles.icon}>
                            {linkObject.Icon}
                        </div>
                    </a>
                )}
                </div>
            </div>
            <div className={styles.rightSection}>
            <span className={styles.version}>v{VERSION}</span>
            </div>
        </div>
    )
}

export default Footer;