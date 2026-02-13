interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  return (
    <div className="flex flex-1 items-center justify-center px-s4 py-s5">
      <div className="text-center">
        <h1 className="mb-s2">{title}</h1>
        <p className="text-muted-foreground">
          This section will be built in the next step.
        </p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
