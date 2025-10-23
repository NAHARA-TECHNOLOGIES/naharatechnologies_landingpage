"use client";
import Skeleton from "react-loading-skeleton";

const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden shadow-md dark:bg-gray-900 p-3"
          >
            <Skeleton height={180} borderRadius={12} />
            <div className="mt-3 space-y-2">
              <Skeleton width="60%" />
              <Skeleton count={2} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default LoadingSkeleton;
