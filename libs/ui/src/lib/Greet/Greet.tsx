import '../../index.css';

export interface GreetProps {
  name: string;
}

export function Greet({ name }: GreetProps) {
  return (
    <div className="text-blue-600 text-xl">
      <h1>Hello there, {name}!</h1>
    </div>
  );
}

export default Greet;
