import React, { useState } from "react";
// import style from "./Shop.module.css";
import { RiListSettingsLine } from "react-icons/ri";
import Products from "../Products/Products";
import Accordion from "../UI/Accordion/Accordion";
import FloatingInput from "../UI/FloatingInput/FloatingInput";
import useProductsQuery from "../../hooks/useProductsQuery";
import useCategoriesQuery from "../../hooks/useCategoriesQuery";
import Loading from "../Loading/Loading";
export default function Shop() {
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999999999);
  const [sort, setSort] = useState("price");
  const [catFilter, setCatFilter] = useState([]);

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 999999999,
    sort: "price",
    "category[in]": [],
  });
  const { data, isPending } = useProductsQuery({
    queryName: `shop`,
    limit: 20,
    page,
    "price[lte]": filters.maxPrice,
    "price[gte]": filters.minPrice,
    sort: filters.sort,
    "category[in]": filters["category[in]"],
  });
  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoriesQuery();

  const handleApplyFilters = () => {
    setPage(1);
    setFilters({
      minPrice,
      maxPrice,
      sort,
      "category[in]": catFilter,
    });
  };

  return (
    <section className="container py-4 grid grid-cols-12 flex-1">
      <aside className="hidden md:block col-span-3 p-4 bg-primary rounded-lg shadow sticky top-30 h-fit">
        <div className="flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">Filters</h2>
          <RiListSettingsLine />
        </div>

        <Accordion
          title="Price"
          content={
            <PriceFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
            />
          }
        />
        <Accordion
          title="Sort"
          content={<SortFilter sort={sort} setSort={setSort} />}
        />
        <Accordion
          title="Categories"
          content={
            <CategoryFilter
              data={categories}
              isLoading={isCategoriesLoading}
              catFilter={catFilter}
              setCatFilter={setCatFilter}
            />
          }
        />

        <button
          className="btn-primary w-full"
          onClick={() => handleApplyFilters()}
        >
          Apply Filters
        </button>
      </aside>

      <div className="col-span-12 md:col-span-9 p-4">
        <Products data={data} isPending={isPending} />
      </div>
      {data?.metadata?.numberOfPages > data?.metadata?.currentPage && (
        <div className="col-span-12 flex justify-center">
          <button className="btn-primary" onClick={() => setPage(page + 1)}>
            Load More
          </button>
        </div>
      )}
    </section>
  );
}

function PriceFilter({ minPrice, maxPrice, setMinPrice, setMaxPrice }) {
  return (
    <div className="space-y-3">
      {/* MIN SLIDER */}
      <div className="flex flex-col">
        <label>Min</label>
        <input
          type="range"
          min={0}
          max={maxPrice}
          value={minPrice}
          onChange={(e) => {
            const value = Number(e.target.value);

            // prevent min > max
            setMinPrice(Math.min(value, maxPrice));
          }}
        />
      </div>

      {/* MAX SLIDER */}
      <div className="flex flex-col">
        <label>Max</label>
        <input
          type="range"
          min={minPrice}
          max={999999999}
          step={1000}
          value={maxPrice}
          onChange={(e) => {
            const value = Number(e.target.value);

            // prevent max < min
            setMaxPrice(Math.max(value, minPrice));
          }}
        />
      </div>

      {/* INPUTS */}
      <div className="flex gap-4 mt-5">
        <FloatingInput
          label="Min"
          type="number"
          value={minPrice}
          max={maxPrice}
          onChange={(e) => {
            const value = Number(e.target.value);
            setMinPrice(Math.min(value, maxPrice));
          }}
        />

        <FloatingInput
          label="Max"
          type="number"
          value={maxPrice}
          min={minPrice}
          onChange={(e) => {
            const value = Number(e.target.value);
            setMaxPrice(Math.max(value, minPrice));
          }}
        />
      </div>
    </div>
  );
}
function SortFilter({ sort, setSort }) {
  return (
    <div className="flex flex-col  gap-4">
      <div>
        <label
          htmlFor="priceLowToHigh"
          className={`cursor-pointer border px-4 py-2 block rounded-md ${
            sort === "price" && "bg-secondary-2 text-white"
          }`}
        >
          price (Low to High)
        </label>
        <input
          type="radio"
          name="sort"
          id="priceLowToHigh"
          className="hidden"
          value="price"
          checked={sort === "price"}
          onChange={(e) => setSort(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="priceHightToLow"
          className={`cursor-pointer border px-4 py-2 block rounded-md ${
            sort === "-price" && "bg-secondary-2 text-white"
          }`}
        >
          price (Hight to Low)
        </label>
        <input
          type="radio"
          name="sort"
          id="priceHightToLow"
          className="hidden"
          value="-price"
          checked={sort === "-price"}
          onChange={(e) => setSort(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="ratingsAverageHighToLow"
          className={`cursor-pointer border px-4 py-2 block rounded-md ${
            sort === "-ratingsAverage" && "bg-secondary-2 text-white"
          }`}
        >
          ratings (High to Low)
        </label>
        <input
          type="radio"
          name="sort"
          id="ratingsAverageHighToLow"
          className="hidden"
          value="-ratingsAverage"
          checked={sort === "-ratingsAverage"}
          onChange={(e) => setSort(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="ratingsAverageLowToHigh"
          className={`cursor-pointer border px-4 py-2 block rounded-md ${
            sort === "ratingsAverage" && "bg-secondary-2 text-white"
          }`}
        >
          ratings (Low to High)
        </label>
        <input
          type="radio"
          name="sort"
          id="ratingsAverageLowToHigh"
          className="hidden"
          value="ratingsAverage"
          checked={sort === "ratingsAverage"}
          onChange={(e) => setSort(e.target.value)}
        />
      </div>
    </div>
  );
}
function CategoryFilter({ data, isLoading, catFilter, setCatFilter }) {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {isLoading ? (
          <div className="w-full h-40 flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <>
            {data.map((category) => (
              <div
                key={category._id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id={category._id}
                  className="hidden"
                  onChange={(e) =>
                    setCatFilter(
                      e.target.checked
                        ? [...catFilter, category._id]
                        : catFilter.filter((id) => id !== category._id),
                    )
                  }
                />
                <label
                  htmlFor={category._id}
                  className={`border px-4 py-2 block rounded-md cursor-pointer
                    ${catFilter.includes(category._id) && "bg-secondary-2 text-white"}`}
                >
                  {category.name}
                </label>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
