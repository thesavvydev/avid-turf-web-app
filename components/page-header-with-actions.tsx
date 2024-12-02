import { ReactElement, ReactNode } from "react";

type TPageHeaderWithActions = {
  isAdmin?: boolean;
  title: string | ReactElement;
  subtitle?: string | ReactElement;
  renderActions?: () => ReactNode;
  renderBreadcrumbs?: () => ReactNode;
};

export default function PageHeaderWithActions({
  title,
  subtitle,
  renderActions,
  renderBreadcrumbs,
}: TPageHeaderWithActions) {
  return (
    <>
      {renderBreadcrumbs && (
        <div className="sm:-mb-4">{renderBreadcrumbs()}</div>
      )}
      <header>
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-0">
          <hgroup>
            <h1 className="text-3xl font-semibold">{title}</h1>
            {subtitle && <span className="text-sm font-light">{subtitle}</span>}
          </hgroup>
          {renderActions && renderActions()}
        </div>
      </header>
    </>
  );
}
