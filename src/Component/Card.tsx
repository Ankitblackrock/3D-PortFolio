interface CardProps {
  title: string;
}

const Card = ({ title }: CardProps) => {
  return (
    <div className="panel w-screen h-screen bg-purple-600 grid flex-shrink-0">
      {title}
    </div>
  );
};

export default Card;
