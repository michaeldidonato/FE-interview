type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function MyButton({ children, onClick }: Props) {
  return (
    <>
      <button onClick={onClick}>{children}</button>
    </>
  );
}
