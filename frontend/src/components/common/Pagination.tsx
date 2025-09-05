import { cn, PAGINATION_DATA } from "../../utils/constants";
import Button from "./Button";
import LeftArrow from "../../assets/icons/LeftArrow";
import RightArrow from "../../assets/icons/RightArrow";
import type { PaginationProps } from "../../utils/types";

const Pagination = ({ currentPage, gotoPrev, gotoNext, gotoPage }: PaginationProps) => {
  return (
    <div className="flex justify-end">
      <nav
        aria-label="Pagination"
        className="isolate md:max-w-[594px] w-full inline-flex justify-evenly sm:justify-end gap-[2px]"
      >
        <Button
          leftIcon={<LeftArrow />}
          variant="ghost"
          className="font-semibold text-app-200 mr-2 md:mr-5"
          onClick={gotoPrev}
          disabled={currentPage === 1}
        >
          <span>Previous</span>
        </Button>
        {PAGINATION_DATA.map((item, index) => {
          const isActive = item === currentPage;
          const isEllipsis = item === "...";
          const isMiddleHighlight = isEllipsis && currentPage > 3 && currentPage < 8;
          return (
            <Button
              key={index}
              onClick={() => !isEllipsis && gotoPage(Number(item))}
              className={cn(
                "rounded hidden sm:flex px-2 py-2 text-app-500 font-medium text-sm size-[40px]",
                isActive || isMiddleHighlight ? "bg-app-secondary" : "",
                isEllipsis ? "cursor-default" : ""
              )}
              disabled={isEllipsis}
              variant="ghost"
            >
              <span>{item}</span>
            </Button>
          );
        })}
        <Button
          rightIcon={<RightArrow />}
          variant="ghost"
          onClick={gotoNext}
          className="font-semibold text-app-200  ml-2 md:ml-5 pr-0"
          disabled={currentPage === 10}
        >
          <span>Next</span>
        </Button>
      </nav>
    </div>
  );
};

export default Pagination;
