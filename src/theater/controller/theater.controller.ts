import { CreateTheaterDto } from '../dto/create-theater.dto';
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
    console.log(id);

    return this.theaterService.deletelOne(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.theaterService.findOne(id);
  }

  @Get('user/:userId')
  async findTheaterOfUser(@Param('userId') userId: string): Promise<any> {
    return this.theaterService.findTheaterOfUser(userId);
  }
}
