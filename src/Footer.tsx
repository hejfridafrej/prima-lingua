import JiraIcon from './assets/jira-icon.svg?react'
import GithubIcon from './assets/github-icon.svg?react'
import LinkedinIcon from './assets/linkedin-icon.svg?react'
import styles from './Footer.module.css'

const Footer = ({ }) => {
    const linkData = [
        {
            name: "Jira",
            link: "https://fridafrej.atlassian.net/jira/software/c/projects/PRIMA/boards/34",
            Icon: <JiraIcon />
        },
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
            <div className={styles.linkContainer}>
            {linkData.map((linkObject) =>
                <a href={linkObject.link} key={linkObject.name}>
                    <div className={styles.icon}>
                        {linkObject.Icon}
                    </div>
                </a>
            )}
            </div>
        </div>
    )
}

export default Footer;