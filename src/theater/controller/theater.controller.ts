import { CreateTheaterDto } from './../dto/create-theater';
import { TheaterService } from './../service/theater.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('theater')
export class TheaterController {
  constructor(private theaterService: TheaterService) {}

  @Post()
  async createTheater(
    @Body() createTheaterDto: CreateTheaterDto,
  ): Promise<any> {
    return this.theaterService.createTheater(createTheaterDto);
  }

  @Get()
  async findAll(): Promise<any> {
    return this.theaterService.findAll();
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<any> {
    return this.theaterService.deletelOne(id);
  }
}
