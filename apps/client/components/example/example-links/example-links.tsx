import ExampleLink from '../example-link/example-link';
import styles from './example-link.module.css'

export default function ExampleLinks(): JSX.Element {
    const links = ["link1", "link2"];
  return (
    <div className={styles['links-container']}>
        {links.map(link => <ExampleLink text={link} key={link}/>)}
    </div>
  )
}
