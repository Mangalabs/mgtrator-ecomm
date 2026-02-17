import { Breadcrumbs } from "../layout/Breadcrumbs";

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href: string }>;
  height?: string;
}

const PageHero = ({
  title,
  description,
  breadcrumbs,
  height = "320px",
}: PageHeroProps) => {
  return (
    <section
      className="relative bg-gradient-to-br from-[var(--primary)] via-[#1a2d5e] to-[var(--primary)] text-white overflow-hidden"
      style={{ height }}
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary)] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 h-full flex items-center relative z-10">
        <div>
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

          <h1 className="text-white mt-6 mb-4">
            {title}
          </h1>

          {description && (
            <p className="text-xl text-blue-100 max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
