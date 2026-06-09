type Props = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

export default function SectionTitle({ title, subtitle, center = true }: Props) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
