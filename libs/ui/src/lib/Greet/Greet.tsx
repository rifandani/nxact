import styles from './Greet.module.css';

export interface GreetProps {
  name: string;
}

export function Greet({ name }: GreetProps) {
  return (
    <div className={styles['container']}>
      <h1>Hello {name}!</h1>
    </div>
  );
}

export default Greet;
