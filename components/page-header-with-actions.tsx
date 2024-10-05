import { ReactElement, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TPageHeaderWithActions = {
  isAdmin?: boolean;
  title: string | ReactElement;
  sticky?: boolean;
  subtitle?: string | ReactElement;
  renderActions?: () => ReactNode;
  renderBreadcrumbs?: () => ReactNode;
};

export default function PageHeaderWithActions({
  title,
  sticky = false,
  subtitle,
  renderActions,
  renderBreadcrumbs,
}: TPageHeaderWithActions) {
  return (
    <>
      {renderBreadcrumbs && (
        <div className="sm:-mb-4">{renderBreadcrumbs()}</div>
      )}
      <header
        className={twMerge(
          sticky
            ? "sticky top-0 z-0 border-b border-gray-200 bg-gray-50 p-2 text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
            : "",
        )}
      >
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
