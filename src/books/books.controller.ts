import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  createBook(@Body() book: any) {
    return this.booksService.createBook(book);
  }

  @Get()
  getBooks() {
    return this.booksService.getBooks();
  }
}
