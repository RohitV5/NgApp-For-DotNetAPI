export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

// Making generic because pagination will be used by multiple components

export class PaginatedResult<T>{
    result: T;
    pagination: Pagination;
}
