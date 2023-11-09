"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginationQuery = exports.getPaginationResponse = void 0;
const prisma_filter_generator_1 = require("prisma-filter-generator");
console.log(prisma_filter_generator_1.default.generateFilters({ numPagesLessThan: 100 }));
console.log('-----------------------------------------------------------------------------');
const getPaginationResponse = (query, totalAmount) => {
    return {
        page: query.page,
        totalPages: Math.ceil(totalAmount / query.limit),
        totalAmount,
    };
};
exports.getPaginationResponse = getPaginationResponse;
const getPaginationQuery = (query) => {
    return {
        take: query.limit,
        skip: query.getSkip(),
    };
};
exports.getPaginationQuery = getPaginationQuery;
exports.default = prisma_filter_generator_1.default;
//# sourceMappingURL=pagination.helper.js.map