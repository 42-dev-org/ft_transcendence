import { PaginationDto } from '../dto/pagination.dto';
import pfg from 'prisma-filter-generator';
export declare const getPaginationResponse: (query: PaginationDto, totalAmount: number) => {
    page: number;
    totalPages: number;
    totalAmount: number;
};
export declare const getPaginationQuery: (query: PaginationDto) => {
    take: number;
    skip: number;
};
export default pfg;
