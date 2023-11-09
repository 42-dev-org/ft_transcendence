import ExampleIcon from '../../../components/example/example-icon/example-icon'
import ExampleLinks from '../../../components/example/example-links/example-links'
import styles from './example-header.module.css'

export default function ExampleHeader(): JSX.Element {
  return (
    <div className={styles['header-container']}>
        <ExampleIcon />
        <ExampleLinks />
    </div>
  )
}
