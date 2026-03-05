import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateVideoJobDto } from './dto';
import { VideoJobsService } from './video-jobs.service';

@Controller('video-jobs')
export class VideoJobsController {
  constructor(private readonly videoJobsService: VideoJobsService) {}

  @Post()
  create(@Body() dto: CreateVideoJobDto) {
    return this.videoJobsService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoJobsService.findOne(id);
  }
}
