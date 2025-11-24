import { useState } from "react";

export default function usePaginationController(){

    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalSize, setTotalSize] = useState(0);

    return {currentPage, setCurrentPage, pageSize, setPageSize, totalSize, setTotalSize};

}