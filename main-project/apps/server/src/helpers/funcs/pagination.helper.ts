import { PaginationDto } from '../dto/pagination.dto';

import pfg from 'prisma-filter-generator';



export const getPaginationResponse = (
  query: PaginationDto,
  totalAmount: number,
) => {
  return {
    page: query.page,
    totalPages: Math.ceil(totalAmount / query.limit),
    totalAmount,
  };
};

export const getPaginationQuery = (query: PaginationDto) => {
  return {
    take: query.limit,
    skip: query.getSkip(),
  };
};

export default pfg;
