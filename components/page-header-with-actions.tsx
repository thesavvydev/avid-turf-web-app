import { PropsWithChildren, ReactNode } from "react";

type TPageHeaderWithActions = PropsWithChildren & {
  title: string;
  subtitle?: string;
  renderActions?: () => ReactNode;
  renderBreadcrumbs?: () => ReactNode;
};

export default function PageHeaderWithActions({
  children,
  title,
  subtitle,
  renderActions,
  renderBreadcrumbs,
}: TPageHeaderWithActions) {
  return (
    <header className="bg-gray-100 dark:bg-gray-800">
      <div className="container p-8">
        {renderBreadcrumbs && (
          <div className="mb-4 lg:mb-8">{renderBreadcrumbs()}</div>
        )}
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
          <hgroup>
            <h1 className="text-3xl font-semibold">{title}</h1>
            {subtitle && <span className="text-sm font-light">{subtitle}</span>}
          </hgroup>
          {renderActions && renderActions()}
        </div>
      </div>
      {children}
    </header>
  );
}
