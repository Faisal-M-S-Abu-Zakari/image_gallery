import { ArrowUpDown, Grid2X2, List } from "lucide-react";
import { GalleryFiltersProps } from "../types";

const GalleryFilters = ({
  handleType,
  handleSize,
  handleSearch,
  setSortBy,
  toggleSortOrder,
  setViewMode,
  typeValue,
  sortBy,
  sortOrder,
  viewMode,
}: GalleryFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center !mb-6 bg-white rounded-xl shadow-sm !p-6 border border-gray-100">
      <div className="flex flex-wrap gap-4 items-center justify-center !w-full !md:w-auto">
        <select
          onChange={handleType}
          value={typeValue}
          className="!px-4 !py-2 !border !border-gray-200 !rounded-lg !bg-white !hover:border-gray-300 !focus:border-purple-500 !focus:ring-2 !focus:ring-purple-200 !transition-all !duration-200 !outline-none min-w-[120px]"
        >
          <option value="all">All Types</option>
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
        </select>

        <select
          onChange={handleSize}
          className="!px-4 !py-2 !border !border-gray-200 !rounded-lg !bg-white !hover:border-gray-300 !focus:border-purple-500 !focus:ring-2 !focus:ring-purple-200 !transition-all !duration-200 !outline-none !min-w-[120px]"
        >
          <option value="all">All Sizes</option>
          <option value="small">Small</option>
          <option value="regular">Medium</option>
          <option value="full">Large</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "created" | "updated")}
          className="!px-4 !py-2 !border !border-gray-200 !rounded-lg !bg-white !hover:border-gray-300 !focus:border-purple-500 !focus:ring-2 !focus:ring-purple-200 !transition-all !duration-200 !outline-none !min-w-[140px]"
        >
          <option value="created">Created Date</option>
          <option value="updated">Updated Date</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-center">
        <button
          onClick={toggleSortOrder}
          className="!px-4 !py-2 bg-gray-50 text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 flex items-center gap-2 min-w-[130px]"
        >
          <ArrowUpDown className="w-4 h-4" />
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>

        <button
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          className="!px-4 !py-2 bg-gray-50 text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 flex items-center gap-2 min-w-[100px]"
        >
          {viewMode === "grid" ? (
            <>
              <Grid2X2 className="w-4 h-4" /> Grid
            </>
          ) : (
            <>
              <List className="w-4 h-4" /> List
            </>
          )}
        </button>

        <input
          type="text"
          placeholder="Search images..."
          className="!px-4 !py-2 !border !border-gray-500 !rounded-lg !bg-white !hover:border-gray-300 !focus:border-purple-500 !focus:ring-2 !focus:ring-purple-200 !transition-all !duration-200 !outline-none !w-full !md:w-auto !md:min-w-[200px]"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default GalleryFilters;
