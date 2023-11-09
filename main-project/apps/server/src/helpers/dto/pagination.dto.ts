export class PaginationDto {
  page = 1;
  limit: number = MAX_SIZE;

  getSkip() {
    return this.page * this.limit - this.limit;
  }
}
