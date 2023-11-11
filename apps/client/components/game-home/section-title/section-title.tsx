interface PropsType {
  label: string;
}

export default function SectionTitle({ label }: PropsType) {
  return (
    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8">{label}</h1>
  );
}
