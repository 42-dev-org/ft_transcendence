export class PaginationDto {
  page = 1;
  private _limit: number = 30;

  constructor(page: number = 1, limit: number = 30) {
    this.page = page
    this.limit = limit
  }

  get limit() {
    return this._limit;
  }

  set limit(value: number) {
    if (value > MAX_SIZE) {
      this._limit = MAX_SIZE;
    } else {
      this._limit = value;
    }
  }

  getSkip() {
    return this.page * this.limit - this.limit;
  }
}
