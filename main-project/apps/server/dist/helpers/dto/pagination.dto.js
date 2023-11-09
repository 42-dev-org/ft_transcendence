"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationDto = void 0;
class PaginationDto {
    constructor() {
        this.page = 1;
        this.limit = MAX_SIZE;
    }
    getSkip() {
        return this.page * this.limit - this.limit;
    }
}
exports.PaginationDto = PaginationDto;
//# sourceMappingURL=pagination.dto.js.map