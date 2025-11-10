import styles from './About.module.css';
const AboutPage = () => {
    return (
        <div className={styles.aboutBox}>
            <h2>Why I Built This</h2>
            <p className={styles.paragraph}>
                I've always loved languages and linguistics – both learning them myself
                and helping friends navigate Swedish, my native tongue. When I started 
                learning Croatian for my partner, I dove deep into the grammar (did you 
                know you can conjugate almost every word 7-8 different ways?).
                I spent months mastering declensions and conjugations, but then I'd try
                to have an actual conversation and realize I was missing something
                fundamental: vocabulary. All that grammar knowledge wasn't much help
                when I couldn't express basic ideas.
            </p>
            <p className={styles.paragraph}>
                That's when I found a blog post about "the first 1000 words" – the core
                vocabulary that forms the foundation of any language. It clicked. Instead of
                trying to learn every word I came across, what if I focused on mastering
                these essentials first? I wanted a tool for exactly that but couldn't
                find one that worked how I envisioned. <span>So I built it.</span> Prima Lingua
                started as a personal database project and evolved into a full learning app
                – the tool I wish I'd had when I started my Croatian journey.
            </p>

            <h2>What's Next</h2>
            <p className={styles.paragraph}>
                Prima Lingua is a work in progress, and here's what's on the roadmap:</p>
            <ul>
                <li><span>Enhanced Practice Modes</span></li>
                    Beyond basic flashcards, I'm developing multiple practice methods including typing exercises and multiple-choice selection to accommodate different learning styles and reinforce retention.
                <li><span>Community Contributions</span></li>
                    Future versions will allow users to add new words and contribute translations for additional languages, creating a collaborative learning resource that grows with the community.
                <li><span>Progress Tracking & Accounts</span></li>
                    User authentication will enable personalized progress tracking, spaced repetition algorithms tailored to individual learning patterns, and synchronized learning across devices.
                <li><span>Mobile Application</span></li>
                    A dedicated mobile app to make vocabulary practice accessible anywhere, with offline mode support for learning on the go.
                    Prima Lingua aims to remain focused on what matters most: building a strong vocabulary foundation in any language through simple, effective practice.
            </ul>
        </div>
    )
};

export default AboutPage;