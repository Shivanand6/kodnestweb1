interface ContextHeaderProps {
  headline: string;
  subtext: string;
}

const ContextHeader = ({ headline, subtext }: ContextHeaderProps) => {
  return (
    <section className="border-b border-border px-s4 py-s4">
      <h1 className="text-balance">{headline}</h1>
      <p className="mt-s1 text-muted-foreground">{subtext}</p>
    </section>
  );
};

export default ContextHeader;
