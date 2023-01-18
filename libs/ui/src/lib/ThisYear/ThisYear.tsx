import '../../index.css';

export interface ThisYearProps {
  date?: string | number | Date;
}

export function ThisYear({ date }: ThisYearProps) {
  return (
    <h1>This year is: {(date ? new Date(date) : new Date()).getFullYear()}!</h1>
  );
}

export default ThisYear;
